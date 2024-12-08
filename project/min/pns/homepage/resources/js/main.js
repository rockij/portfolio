$(function() {
    var fullpage = $('#fullpage');
    var vw = window.innerWidth;
    var flag = true;
    var noticeSlide = $('.noticeSlide .slick-wrapper');

    noticeSlide.slick({ // 공지사항슬라이드
        vertical: true,
        infinite: true,
        dots: false,
        arrows: false,
        autoplay: false,
        touchMove: false,
        autoplaySpeed: 2000,
    })

    pcMbfullSet(vw, noticeSlide);
    $(window).on('resize', function () {
        vw = window.innerWidth;
        pcMbfullSet(vw, noticeSlide);
    });

    function pcMbfullSet(vw, slide) {
        // console.log(vw, slide);
        if (vw < 999) {
            if (!flag) {
                $.fn.fullpage.destroy('all');
            }
            mainMbScroll(slide);
            flag = true;
        } else {
            if (flag) {
                $('.section').removeClass('active');
                fullpageSet(fullpage, slide, vw);
            }
            flag = false;
        }
    };
})

function fullpageSet(fullpage, slide, vw) { // main fullpage set
    // console.log(fullpage, slide ,vw);
    $(fullpage).fullpage({
        autoScrolling: true,
        fitToSection: false,
        scrollOverflow: true,
        navigation: true,
        fitToSection: true,
        onLeave: function (index, next, direction) {
            // console.log(index, next, direction);
            if (next != 1) {
                $('.goTop').addClass('show');
                if (next === 4) {
                    $('.goTop').removeClass('show');
                    $('.sec3TopBtn').addClass('show');
                } else {
                    $('.sec3TopBtn').removeClass('show');
                }
            } else {
                $('.goTop').removeClass('show');
            }
            if (next === 3) {
                $('#fp-nav').addClass('act3');
            } else {
                $('#fp-nav').removeClass('act3');
            }
        },
        afterLoad: function (origin, destination, direction) {
            // console.log(origin, destination, direction);
            if (destination === 2) {
                pwAni();
            } else {
                $('.pwWrap .pw').removeClass('insert');
            }
            if (destination === 4) {
                slide.slick('slickPlay');
            }
        },
        afterResize: function () {
            vw = window.innerWidth;
            if (vw > 998) {
                $('.gnb').removeClass('navOn');
            }
        }
    });
    $.fn.fullpage.reBuild();
    // console.log('rebuild');
}

function mainMbScroll(slide) {
    $('.goTop').removeClass('show');
    var secArray = ['sec0', 'sec1', 'sec2', 'sec3'];
    var arrayTop = [];
    secArray.forEach(function (sec ,index) {
        arrayTop.push($('.' + sec).offset().top);
    })
    
    $('.' + secArray[0]).addClass('active');
    $(window).on('scroll', function () {
        $('.sec3TopBtn').addClass('show');
        var hTop = $(this).scrollTop();
        if (hTop > arrayTop[1]) {
            $('.' + secArray[1]).addClass('active');
            pwAni();
        }
        if (hTop > arrayTop[2]) {
            $('.' + secArray[2]).addClass('active');
            slide.slick('slickPlay');
        }
        if (hTop > arrayTop[3]) {
            $('.' + secArray[3]).addClass('active');
        }
    })
}

function mainTopHov() {
    vw = window.innerWidth;
    if (vw < 999) {
        subTopWork();
    } else {
        $.fn.fullpage.moveTo(1);
    }
}

function pwAni() { // main password animation
    var pwIcon = $('.pwWrap .pw');
    pwIcon.each(function (index, item) {
        setTimeout(function () {
            $(item).addClass('insert');
        }, index * 200);
    })
}

function familyToggle(obj) { // main 가족사 토글 버튼
    if ($('.' + obj).hasClass('toggle')) {
        $('.' + obj).removeClass('toggle');
    } else {
        $('.' + obj).addClass('toggle');
    }
    $('.' + obj + ' .list').slideToggle();
}