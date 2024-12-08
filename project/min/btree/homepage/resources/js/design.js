function gnbHov(sec, n) {
    var t = event.target || event.srcElement;
    if(sec == 'servWrap' || sec == 'partnerWrap') {
        $('#header').addClass('under'); 
    }
    var secTop = $('.' + sec).offset().top - n;
    $('html,body').animate({ scrollTop: secTop }, 500);
}
function pageScroll(mbSlide, pcSlide, pcSlideTx) {
    // console.log(mbSlide);
    // console.log(pcSlide);
    var gnbList = $('.gnb a');
    var secArray = ['aboutWrap', 'servWrap', 'faqWrap', 'partnerWrap'];
    var secTop = [];
    secArray.forEach(function(sec) {
        secTop.push($('.' + sec).offset().top - 80);
    });
    $(window).on('scroll', function() {
        var hTop = $(this).scrollTop();
        // console.log(hTop);
        $(gnbList).removeClass('now');
        if(hTop < secTop[1]) {
            $('#header').removeClass('under');
            $('.servWrap').removeClass('start');
            $(gnbList[0]).addClass('now');
        } else if (hTop > secTop[1] && hTop < secTop[2]) {
            $('#header').addClass('under');
            $('.servWrap').addClass('start');
            $(gnbList[1]).addClass('now');
            $(gnbList[2]).addClass('now');
        } else if (hTop > secTop[2] && hTop < secTop[3]) {
            $('#header').removeClass('under');
            $('.servWrap').removeClass('start');
            $(gnbList[3]).addClass('now');
        } else if(hTop > secTop[3]) {
            $('#header').addClass('under');
            $(gnbList[4]).addClass('now');
        }
        pServSlide(pcSlide, pcSlideTx);
        mServSlide(mbSlide);
    }).trigger('scroll');
}

// faq
function slideMade(vw) {
    var tab = undefined;
    faqSlide(tab, vw);
}
function faqHov(tab) {
    // console.log(tab);
    var t = event.target || event.srcElement;
    $('.tabOn .qaDesc').removeClass('toggle');
    $('.faqMenu a').removeClass('now');
    $('.tabDesc').removeClass('tabOn');
    $(t).addClass('now');
    $('.' + tab).addClass('tabOn');
    var vw = window.innerWidth;
    faqSlide(tab, vw);
}
function faqToggle() {
    var t = event.target || event.srcElement;
    var qaTarget;
    if(t.nodeName == 'SPAN') {
        qaTarget = t.parentNode.parentNode.parentNode;
    } else {
        qaTarget = t.parentNode.parentNode;
    }
    // console.log(qaTarget);
    if($(qaTarget).hasClass('toggle')) {
        $(qaTarget).removeClass('toggle');    
    } else {
        $('.tabOn .qaDesc').removeClass('toggle');
        $(qaTarget).addClass('toggle');
    }
}
function faqSlide(tab, vw) {
    // console.log(vw);
    var tabNum;
    if (tab != undefined) { // swiper initalSlide number set
        var idx = tab.split('b')[1];
        tabNum = Number(idx - 1);
    } else {
        tabNum = 0;
    }
    // console.log(tabNum);
    if (vw > 769) {
        return false;
    } else {
        var faqSlide = new Swiper('.faqMenu', { // load slide set in mobile
            slidesPerView: 'auto',
            freeMode: false,
            grabCursor: true,
            initialSlide: tabNum,
        });
    }
    faqSlide.on('resize', function () { // resize slide hover
        var vw = window.innerWidth;
        if (vw > 769) {
            faqSlide.destroy();
        } else {
            faqSlide.init();
        }
    })
}

function mServSlide(mbSlide) { // 모바일 서비스 소개 슬라이드
    // console.log(vw);    
    if ($('.servWrap').hasClass('start')) {
        mbSlide.autoplay.start();
    } else {
        mbSlide.autoplay.stop();
        mbSlide.slideTo(0, 0);
    }
    mbSlide.on('resize', function () { // resize slide hover
        vw = window.innerWidth;
        // console.log(vw);
        if (vw > 769) {
            $('.servWrap').removeClass('start');
            mbSlide.autoplay.stop();
        } else {
            if ($('.servWrap').hasClass('start')) {
                mbSlide.autoplay.start();
            } else {
                mbSlide.autoplay.stop();
            }
        }
    })
    mbSlide.on('slideChange', function () {
        var slideIdx = mbSlide.realIndex;
        // console.log(slideIdx);
        $('.mFrame .cont').removeClass('now');
        $('.mFrame .cont' + slideIdx).addClass('now');
    })
}
function pServSlide(pcSlide, pcSlideTx) {
    var servConts = $('.servSlide .frame .cont');
    
    if ($('.servWrap').hasClass('start')) {
        $(pcSlide).slick('slickPlay');
    } else {
        $(pcSlide).slick('slickGoTo', 0);
        $(pcSlideTx).slick('slickGoTo', 0);
        $(pcSlide).slick('slickPause');
    }
    $(pcSlide).on('afterChange', function (event, slick, currentSlide) {
        // console.log(slick, currentSlide);
        if (currentSlide === 0) {
            $(pcSlideTx).slick('slickNext');
        } else {
            $(pcSlideTx).slick('slickGoTo', currentSlide);
        }
        $(servConts).removeClass('now');
        $(servConts[currentSlide]).addClass('now');
    });
    $('.servSlide .slick-arrow').on('click', function(event) {
        var target = event.target;
        if($(target).hasClass('slick-next')) {
            $(pcSlideTx).slick('slickNext');
        } else {
            $(pcSlideTx).slick('slickPrev');
        }
    })
}

$(document).ready(function() {
    var vw = window.innerWidth;
    $(window).on('resize', function() {
        vw = window.innerWidth;
        slideMade(vw);
    });
    slideMade(vw);
    var pcSlide = $('.servSlide .slick-wrapper').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToScroll: 1,
        variableWidth: true,
        centerMode: true,
        autoplay: false,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        pauseOnFocus: false,
    });
    var pcSlideTx = $('.servSlide .titList').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        autoplay: false,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        variableWidth: true
    });

    var mbSlideTx = new Swiper('.mbSlide.text .swiper-container', {
        slidesPerView: 'auto',
        centeredSlides: true,
        loop:true,
        loopedSlides:4,
    });
    var mbSlide = new Swiper('.mbSlide.img .swiper-container', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        speed: 1000,
        effect: 'coverflow',
        initialSlide: 0,
        grabCursor: true,
        centeredSlides: true,
        slideToClickedSlide: false,
        loop: true,
        loopedSlides:4,
        slidesPerView: 'auto',
        spaceBetween: 0,
        coverflowEffect: {
            slideShadows: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    });
    mbSlideTx.controller.control = mbSlide;
    mbSlide.controller.control = mbSlideTx;    
    
    setTimeout(function() {
        pageScroll(mbSlide, pcSlide, pcSlideTx);
    },600);

    $('html,body').animate({ scrollTop: 0 }, 350);
    
});





// 안쓰는 거
// function langHov(lang) {
//     var t = event.target || event.srcElement;
//     $('.langTab button').removeClass('now');
//     $(t).addClass('now');
//     // console.log(lang);
//     $('.langTab .img button').removeClass('show');
//     $('.langTab .img ' + '.' + lang).addClass('show');
//     $('.langTab').removeClass('tabOn');
// }
// function tabHov() {
//     if ($('.langTab').hasClass('tabOn')) {
//         $('.langTab').removeClass('tabOn');
//     } else {
//         $('.langTab').addClass('tabOn');
//     }
// }
// function ipChg() {
//     if ($('.email .arrow').hasClass('now')) {
//         $('.email .arrow').removeClass('now');
//         $('.email input').addClass('now');
//     } else {
//         $('.email input').removeClass('now');
//         $('.email .arrow').addClass('now');
//     }
// }
// $(function () {
//     var tSelect = $('.ipWrap select');
//     tSelect.on({
//         'focus': function () {
//             // console.log('focus');
//             $(this).closest('.ipWrap').addClass('selected');
//         },
//         'blur': function () {
//             // console.log('blur');
//             $(this).closest('.ipWrap').removeClass('selected');
//         }
//     })
// })
// function dotHov(serv) { // 서비스 소개 dots
//     // console.log('dots');
//     var t = event.target || event.srcElement;
//     var tDot = t.parentNode;
//     $('.servSlide .dots li').removeClass('active');
//     $(tDot).addClass('active');
//     $('.servSlide').attr('class', 'servSlide ' + serv);
//     idxChg(serv);
// }
// function idxChg(serv) {
//     var idx = serv.split('v')[1];
//     idx = Number(idx); // 문자열 숫자 변환
//     // console.log(typeof idx, idx);
//     console.log(idx);
//     rollingBanner(idx);
// }
// 서비스 소개
// function arrowHov(index, slide, dots) {
//     $(slide).find('.arrows').on('click', function () {
//         console.log('arrow', index); // 바뀌기전 index
//         var t = event.target || event.srcElement;
//         $(dots).removeClass('active');
//         if ($(t).hasClass('next')) {
//             // console.log('next');
//             if (index < 3) {
//                 index = index + 1;
//             } else {
//                 index = 0;
//             }
//         } else if ($(t).hasClass('prev')) {
//             // console.log('prev');
//             if (index > 0) {
//                 index = index - 1;
//             } else {
//                 index = 3;
//             }
//         }
//         $(dots[index]).addClass('active');
//         $(slide).attr('class', 'servSlide serv' + index);
//         console.log(index, slide, dots); //바뀐 index
//     })
// }
// function rollingBanner(index, slide, dots) {
//     // console.log('rolling');
//     setInterval(function () {
//         $(dots).removeClass('active');
//         if (index < 3) {
//             index = index + 1;
//         } else {
//             index = 0;
//         }
//         $(dots[index]).addClass('active');
//         $(slide).attr('class', 'servSlide serv' + index);
//         // console.log(index, slide, dots);
//     }, 3000);
//     console.log(index);

// }
// function servHov(index) { // 서비스 소개 prev, next
//     var slide = $('.servSlide');
//     var dots = $('.servSlide .dots li');
//     $(slide).attr('class', 'servSlide serv' + index);

//     arrowHov(index, slide, dots);
//     rollingBanner(index, slide, dots);
// }