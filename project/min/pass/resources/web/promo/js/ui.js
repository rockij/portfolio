function layer_open(obj) {
    var temp = $("#" + obj);
    $('body').css("overflow", "hidden");
    temp.show();
    var x=window.scrollX, y=window.scrollY;
	window.onscroll=function(){window.scrollTo(x, y)};
}
function layer_close(obj) {
    $('body').css("overflow", "");
    $("#"+obj).hide();
    window.onscroll=function(){};
}

/* 배너 슬라이드 */
var bannerSwiper;
bannerSwiper = new Swiper('.bannerSwiper', {
    loop: true,
    pagination: {
        el: $('.bannerSwiper').find(".swiper-pagination").get(0),
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction:false,
    },
    on:{
        slideChange: function () {
            console.log(bannerSwiper)
            //.autoplay.start();
        }
    }
});


/* 탭 */
$(".tab_wrap button").each(function(idx){
    $(".tab_wrap button").eq(idx).on("click",function(){
        var marker = $('.tab_wrap .bg');
        var item = $('.tab_wrap button');
        var interval = 14;
        marker.css('left', $(".tab_wrap button").eq(idx).position().left+"px" );

        $(".tab_wrap button").removeClass("on").eq(idx).addClass("on");
        $(".tab_con > div").eq(idx).show().siblings().hide();
    })
    $(".tab_wrap button").eq(0).trigger('click');
});
