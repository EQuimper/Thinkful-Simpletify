/* global $:false*/

$(function(){
  'use strict';
  $('form#getTrack').submit(function(e){
    e.preventDefault();
    var value = $('input#trackName').val();
    getArtistInfo(value)
    $('input#trackName').val('');
  });
});

function getArtistInfo(value){
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
  .done(function(result){
    // console.log(result);
    $.each(result.artists.items, function(i, item){
      var name = item.name;
      var artistId = item.id;
      var imageSm = item.images[0].url;
      showResultArtist(name, imageSm, artistId);
    });
  });
}

function showResultArtist(name, imageSm, artistId){
  // console.log(name);
  $('.artists ul').append('<li data-artist="'+artistId+'" class="listArtistItem"><img class="img-circle" src="'+imageSm+'" alt="" /><h5 class="name">'+name+'</h5></li>');

  $('.listArtistItem').on('click', function(e){
    e.preventDefault();
    var idArtist = $(this).data('artist');

    var request = {
      country: 'US',
      limit: 5,
      Authorization: API
    };

    $.ajax({
      url: 'https://api.spotify.com/v1/artists/'+idArtist+'/top-tracks',
      data: request,
      datatype: 'json',
      type: 'GET'
    })
    .done(function(result){
      // console.log(result);
      $.each(result.tracks, function(i, item){
        var preview = item.preview_url;
        var trackImg = item.album.images[0].url;
        var title = item.name;
        showResultTrack(preview, trackImg, title);
      });
    });
  });
}

function showResultTrack(preview, trackImg, title){
  console.log(trackImg);
  'use strict';

  $('.songs ul').append('<li class="tracksItem"><img class="img-circle" src="'+trackImg+'" alt="" /><h6 class="title">'+title+'</h6></li>');

}

$('.tracksItem').mouseover().text('<i class="glyphicon glyphicon-play-circle"></i>');
