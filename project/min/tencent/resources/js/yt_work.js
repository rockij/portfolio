var adver = document.querySelector('.adverWrap');
var adverTop = adver.offsetTop;
// scorll 밑줄
$(document).on('scroll', function() {
    var now = document.querySelector("html").scrollTop;

    if(now > adverTop - 50) {   // 50만큼 여유
        $(adver).addClass('now');
    }
})

//youtube api 불러오기
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player; // 플레이어 변수 선언
var popPlayer; // 팝업 플레이어
var now = 0; // now 0,1로 popup on일때 메인 동영상 loop break

var videoId = 'YASZw51WMe4';

var playerConfig = { // 기본 영상
  height: '360',
  width: '640',
  videoId: videoId,
  playerVars: {
    autoplay: 1, // Auto-play the video on load
    controls: 0, // Show pause/play buttons in player
    showinfo: 0, // Hide the video title
    modestbranding: 1, // Hide the Youtube Logo
    fs: 1, // Hide the full screen button
    cc_load_policy: 0, // Hide closed captions
    iv_load_policy: 3, // Hide the Video Annotations
    autohide: 0, // Hide video controls when playing
    mute: 1 // for firefox autoplay
  },
  events: {
    'onReady': onPlayerReady,
    'onStateChange': onStateChange
  }
};
var lyplayerConfig = { // 팝업 영상
    height: '315',
    width:'560',
    videoId: 'UQELq6nyKsU',
    playerVars: {
        autoplay: 1, // Auto-play the video on load
    },
    events: {
        'onStateChange': onStateChange
    }
}
function onPlayerReady(event) {
    event.target.playVideo(); // 자동재생
}
function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', playerConfig);
    popPlayer = new YT.Player('lyPlayer', lyplayerConfig);    
}

function onStateChange(state) {
    if (state.data === YT.PlayerState.ENDED && now == 0) {
        player.loadVideoById({
            videoId: videoId, // 영상 무한루프
        });
    }
}

$('.popBtn').on('click', function() {
    player.stopVideo();
    $('.popBtn').css('display', 'none');
    $('.popOverlay').addClass('on');
    $('.ytPop').addClass('on');
    now = 1;
    popPlayer.playVideo();
})
$('.popClose').on('click', function() {
    popPlayer.stopVideo();
    $('.popBtn').css('display', 'block');
    $('.popOverlay').removeClass('on');
    $('.ytPop').removeClass('on');
    now = 0;
    player.playVideo();
})
