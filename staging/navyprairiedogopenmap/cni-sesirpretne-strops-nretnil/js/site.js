$('.js-trigger').click(function(event){
  event.preventDefault();
});

// YOUTUBE

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    playerVars: {
      listType: 'playlist',
      list: 'PLZ1f3amS4y1ffYEhGZDtawaEyRQQu69Bw'
    },
    // videoId: 'M7lc1UVf-VE'
  });
}
