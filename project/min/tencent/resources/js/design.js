// popup
function layer_open(obj) {
    var $body = $("html, body"), temp = $("#" + obj);
    $body.css("overflow", "hidden");
    temp.show();
}
function layer_close() {
    var $body = $("html, body");
    $body.css("overflow", "");
    $(".ly_pop").hide();
}

$(function () {

    // 브라우저 확인
    var agent = navigator.userAgent, match;
	var app, version;

	if((match = agent.match(/MSIE ([0-9]+)/)) || (match = agent.match(/Trident.*rv:([0-9]+)/))) app = 'Internet Explorer';
	else if(match = agent.match(/Chrome\/([0-9]+)/)) app = 'Chrome';
	else if(match = agent.match(/Firefox\/([0-9]+)/)) app = 'Firefox';
	else if(match = agent.match(/Safari\/([0-9]+)/)) app = 'Safari';
	else if((match = agent.match(/OPR\/([0-9]+)/)) || (match = agent.match(/Opera\/([0-9]+)/))) app = 'Opera';
	else app = 'Unknown';

	if(app !== 'Unknown') version = match[1];

	// alert('Browser: ' + app);
	// alert('Version: ' + version);

	if( app == 'Internet Explorer' && version == 9 ){
		$('body').addClass('ie9');
    }
    
    // image preload
    var cache = [];
    $.preLoadImages = function () {
        var args_len = arguments.length;
        for (var i = args_len; i--;) {
            var cacheImage = document.createElement('img');
            cacheImage.src = arguments[i];
            cache.push(cacheImage);
        }
    }
    $.preLoadImages(
        "resources/image/baner_top.jpg",
        "resources/image/baner_top_doll_s1.png",
        "resources/image/baner_top_doll_s2.png",
        "resources/image/baner_top_doll_s3.png",
        "resources/image/baner_top_doll_s4.png",
        "resources/image/baner_top_doll_s5.png",
        "resources/image/baner_top_doll_s6.png",
        "resources/image/baner_top_doll_s7.png",
        "resources/image/baner_top_doll_s8.png",
        "resources/image/baner_top_doll_s9.png",
        "resources/image/baner_top_doll.png"
    );
    setTimeout(function () {
        $('.doll').addClass("doll-m");
    }, 8000);

    $('.sy-navi a').on('hover', function () {
        var $left = $(this).position().left;
        $('.sy-navi a').removeClass("on");
        $(".sd").animate({ left: $left }, 150);
    });
    $('.sy-navi').mouseleave(function () {
        $(this).find('a:eq(0)').trigger('mouseenter');
        setTimeout(function () {
            $('.sy-navi a:eq(0)').addClass("on");
        }, 150);
    });

    $("#notice").slick({
        vertical: true,
        arrows: false,
        // dots: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000
    });

    $('#banner').slick({
        dots: false,
        arrows: false,
        speed: 500,
        fade: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        pauseOnHover: false
    });

    $('#news').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        // autoplay: true,
        // autoplaySpeed: 3000,
        asNavFor: '.news-tabs',
    });

    $('.news-tabs').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '#news',
        dots: true,
        focusOnSelect: true
    });

    $('.news-tabs .slick-slide').removeClass('on');
    $('.news-tabs .slick-slide').eq(0).addClass('on');
    $('#news').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var mySlideNumber = nextSlide;
        $('.news-tabs .slick-slide').removeClass('on');
        $('.news-tabs .slick-slide').eq(mySlideNumber).addClass('on');
        console.log(1);
    });
    
    $(".content-wrapper").on("hover", function(){
        $(".content-wrapper").removeClass("wide");
        $(this).addClass("wide");
    });

});
