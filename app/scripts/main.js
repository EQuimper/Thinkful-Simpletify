/* global $:false*/

$(function(){
  $('form#getTrack').submit(function(e){
    e.preventDefault();
    var value = $('input#trackName').val();
    console.log(value);
    $('input#trackName').val('');
  });
});
