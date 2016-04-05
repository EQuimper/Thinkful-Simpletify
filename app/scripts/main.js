/* global $:false*/

$(function() {
  'use strict';
  $('form#getTrack').submit(function(e) {
    e.preventDefault();
    var value = $('input#trackName').val();
    $('.artists ul>li').remove('*');
    getArtistInfo(value);
    $('input#trackName').val('');
  });
});

function getArtistInfo(value) {
  'use strict';

  var request = {
    q: value,
    type: 'track,artist',
    limit: 7,
    Market: 'US',
    Authorization: API
  };

  $.ajax({
      url: 'https://api.spotify.com/v1/search',
      data: request,
      datatype: 'json',
      type: 'GET'
    })
    .done(function(result) {
      // console.log(result);
      result.artists.items = result.artists.items.slice(0, 5);
      $.each(result.artists.items, function(i, item) {
        var name = item.name;
        var artistId = item.id;
        var imageSm = item.images.length >= 1 ? item.images[0].url : '';
        showResultArtist(name, imageSm, artistId);
      });

      $('.listArtistItem').on('click', function(e) {
        e.preventDefault();

        var idArtist = $(this).data('artist');

        var request = {
          country: 'US',
          limit: 5,
          Authorization: API
        };

        $.ajax({
            url: 'https://api.spotify.com/v1/artists/' + idArtist + '/top-tracks',
            data: request,
            datatype: 'json',
            type: 'GET'
          })
          .done(function(result) {
            $('.songs ul>li').remove('*');
            result.tracks = result.tracks.slice(0, 10);
            $.each(result.tracks, function(i, item) {
              var preview = item.preview_url;
              var trackId = item.id;
              var trackImg = item.album.images[0].url;
              var title = item.name;
              showResultTrack(preview, trackImg, title);
            });
            $('.tracksItem').mouseover(function() {
              $(this).find('.album').attr('src', './images/play.png').addClass('buttonPlay');
            }).mouseout(function() {
              var imgDefault = $(this).find('.album').data('image');
              $(this).find('.album').attr('src', imgDefault);
            }).mouseover(function() {
              var oneTrack = $(this).data('preview');
              $(this).on('click', function() {
                $(this).find('a').attr('href', oneTrack);
              });


            });
          });
      });
    });

}

function showResultArtist(name, imageSm, artistId) {
  'use strict';
  // console.log(name);
  $('.artists ul').append('<li data-artist="' + artistId + '" class="listArtistItem"><img class="img-circle" src="' + imageSm + '" alt="" /><h5 class="name">' + name + '</h5></li>');

}

function showResultTrack(preview, trackImg, title) {
  'use strict';

  $('.songs ul').append('<li data-preview="' + preview + '" class="tracksItem"><a target="_blank"><img data-image="' + trackImg + '" class="album img-circle" src="' + trackImg + '" alt="" /><h6 class="title">' + title + '</h6></a></li>');

}
