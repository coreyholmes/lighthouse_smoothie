$(function() {

  SC.initialize({
    client_id: '7e5a97e24ce1ec01f2c607250694095a',
    redirect_uri: '#'
  });

  $('#load').on('click', function() {
    SC.get('/users', { q: 'tiesto', license: 'cc-by-sa' }).then(function(data) {
    artist(data);
    });
  });

  function artist(data) {
    var artist_id = data[0].id;
    var artist = data[0].permalink;
    console.log("Artist Name: " + artist);
    console.log("Artist ID: " + artist_id);
    getTracks(artist, artist_id);
  }


  function getTracks(artist, artist_id) {
    var index = $("#artists_songs").empty();
    SC.get("/tracks", {
        user_id: artist_id,
        limit: 100 }).then(function(tracks) {
          for ( var i in tracks ) {
             var track = tracks[i].permalink;
             var title = tracks[i].title;
             $('<button>').html(title).addClass('play').data('artist', artist).data('track', track).appendTo(index);
          } 

          $('.play').on('click', function () {
          var track_number = $(this).data('track');
          var artist = $(this).data('artist');
          console.log(artist);
          console.log(track_number);

          $.stratus({
            key: "7e5a97e24ce1ec01f2c607250694095a",
            links: "https://soundcloud.com/" + artist + "/" + track_number,
            // theme: "https://dl.dropboxusercontent.com/s/2qga0oizefk47xn/audio_player.css?dl=0",
            auto_play: false,
            download: false,
            animate: 'slide',
            color: '0063e2',
            random: true,
            buying: false,
            user: false,
            position: 'fixed',
            stats: false,
            offset: 50
          });
        });
      });
  }

});
