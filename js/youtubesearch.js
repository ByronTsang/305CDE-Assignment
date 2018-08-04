$(document).ready(function () {
  $('#search-term').submit(function (event) {
    event.preventDefault();
    var searchTerm = $('#query').val();
    getRequest(searchTerm);
  });
});

function getRequest(searchTerm) {
  url = 'https://www.googleapis.com/youtube/v3/search';
  var params = {
      part: 'snippet',
      key: 'AIzaSyB0jEq7U-DaxnPbBhwrlx_o-GuommYPHII',
      q: searchTerm
  };

  $.getJSON(url, params, function (searchTerm) {
      showResults(searchTerm);
  });
}

function showResults(results) {
  var youtubehtml = "";
  var entries = results.items;

  $.each(entries, function (index, value) {
    var title = value.snippet.title;
    var videoid = value.id.videoId;
    var thumbnail = value.snippet.thumbnails.default.url;
    youtubehtml += '<div class="col-md-6 col-sm-12">';
    youtubehtml += '<div class="service-widget">';
    youtubehtml += '<div class="post-media wow fadeIn">';
    youtubehtml += '<a id="linkto' + videoid + '" target="_blank" href="https://youtu.be/' + videoid + '">' + title + '</a>';
    youtubehtml += '</div>';
    //youtubehtml += '<div class="post-media wow fadeIn"><img src="' + thumbnail + '" alt="" class="img-responsive">';
    //youtubehtml += '<a href="http://youtu.be/' + videoid + '" data-rel="prettyPhoto[gal]" class="playbutton"><i class="flaticon-play-button"></i></a></div>';
    youtubehtml += '<center><iframe width="420" height="315"src="https://www.youtube.com/embed/' + videoid + '"></iframe></center>';
    //youtubehtml += '<div id="' + videoid + '" class="youtubeVideoLoader" style="background-image: url(&quot;https://i.ytimg.com/vi/' + videoid + '/hqdefault.jpg&quot;);">';
    //youtubehtml += '</div>';
      if (localStorage.getItem("username")){
      youtubehtml += '</div>';
      youtubehtml += '<div class="footer-social">';
      youtubehtml += '<center><button id="' + videoid + '" class="btn grd1" onclick="addtofav(this.id)">Add to Favourite</button></center>';
    }
    youtubehtml += '</div>';
    youtubehtml += '</div>';
    youtubehtml += '</div>';
  }); 
  $('#videoresult').html(youtubehtml);
}
