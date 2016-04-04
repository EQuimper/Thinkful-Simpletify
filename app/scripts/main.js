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
    limit: 5,
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
      showResult(name, imageSm, artistId);
    });
  });
}

function showResult(name, imageSm, artistId){
  // console.log(name);
  $('.artists ul').append('<li data-artist="'+artistId+'" class="listArtistItem"><img class="img-circle" src="'+imageSm+'" alt="" /><h5 class="name">'+name+'</h5></li>');

  $('.listArtistItem').on('click', function(e, artistId){
    e.preventDefault();
    console.log($(this).data('artist'));
  });
}
