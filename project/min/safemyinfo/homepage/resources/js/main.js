// main pc set fullpage
function fullpageSet() {
    var gnbLink = $('#gnb a');
    var bakSlide = $('#bakSlide .slick-wrapper');
    var usedSlide = $('#usedSlide .slick-wrapper');

    $("#fullpage").fullpage({
        autoScrolling: true,
        fitToSection: false,
        navigation: false,
        responsive: true,
        resize: true,
        scrollOverflow: true,
        onLeave: function (index, slideIndex, nextIndex, direction) {
            // console.log(slideIndex);
            if (slideIndex == 2 || slideIndex == 4) {
                $('#header').removeClass('w');
            }
            if (slideIndex == 1 || slideIndex == 3) {
                $('#header').addClass('w');
            }
            if (slideIndex == 5) {
                $('#header').removeClass('w');
                $('#header').addClass('bgGray');
            } else {
                $('#header').removeClass('bgGray');
            }
            // header
            if (slideIndex > 2) {
                $(gnbLink).removeClass('now');
                $(gnbLink[slideIndex - 2]).addClass('now');
                // console.log(gnbLink);
            } else {
                $(gnbLink).removeClass('now');
                $(gnbLink[0]).addClass('now');
            }
            // gnb
            if (slideIndex != 1) {
                $('.toTop').addClass('visible');
                $('.intro').removeClass('ani');
            } else {
                $('.toTop').removeClass('visible');
                $('.intro').addClass('ani');
            }
            // to top
            if (slideIndex == 2) {
                $(usedSlide).slick('slickPlay');
            } else {
                $(usedSlide).slick('slickPause');
            }
            // slick on, off
        },
    });
    $.fn.fullpage.reBuild();

    $(bakSlide).slick({
        infinite: true,
        arrows: false,
        speed: 500,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        slidesToScroll: 1,
        slidesToShow: 1,
        fade: true,
        draggable: false,
    });
    $(usedSlide).slick({
        infinite: true,
        // dots: true,
        arrows: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        pauseOnFocus: false,
        slidesToScroll: 1,
        slidesToShow: 1,
        fade: true,
    });
    $(usedSlide).on('beforeChange', function (evemt, slick, currentSlide, nextSlide) {
        // console.log(currentSlide, nextSlide);
        if (currentSlide < nextSlide) {
            if (currentSlide == 0 && nextSlide == 4) {
                $(bakSlide).slick('slickPrev');
            } else {
                $(bakSlide).slick('slickNext');
            }
        } else {
            if (currentSlide == 4 && nextSlide == 0) {
                $(bakSlide).slick('slickNext');
            } else {
                $(bakSlide).slick('slickPrev');
            }
        }
    });
}

// x-scroll header position
function headScroll() {
    $('html,body').on('scroll', function () {
        var left = $(this).scrollLeft() * -1;
        $('#header').css('left', left);
    })
}

// main mobile set
function mainMbSet() {
    console.log('main mobile set');
    var bakSlide = $('#bakSlide .slick-wrapper');
    var usedSlide = $('#usedSlide .slick-wrapper');

    $(bakSlide).slick({
        infinite: true,
        arrows: false,
        speed: 500,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        slidesToScroll: 1,
        slidesToShow: 1,
        fade: true,
        draggable: false,
    });
    $(usedSlide).slick({
        infinite: true,
        // dots: true,
        arrows: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        pauseOnFocus: false,
        slidesToScroll: 1,
        slidesToShow: 1,
        fade: true,
    });
    $(usedSlide).on('beforeChange', function (evemt, slick, currentSlide, nextSlide) {
        // console.log(currentSlide, nextSlide);
        if (currentSlide < nextSlide) {
            if (currentSlide == 0 && nextSlide == 4) {
                $(bakSlide).slick('slickPrev');
            } else {
                $(bakSlide).slick('slickNext');
            }
        } else {
            if (currentSlide == 4 && nextSlide == 0) {
                $(bakSlide).slick('slickNext');
            } else {
                $(bakSlide).slick('slickPrev');
            }
        }
    });
    mainMbScroll();
}

// main mobile scroll
function mainMbScroll() {
    var secArray = ['sec0', 'sec1', 'sec2', 'sec3', 'sec4'];
    var arrayTop = [];
    var headerH = $('#header').innerHeight();

    secArray.forEach(function (sec, index) {
        if (index > 0) {
            arrayTop.push($('#' + sec).offset().top - (headerH * 4));
        } else {
            arrayTop.push($('#' + sec).offset().top);
        }
    });

    $(window).on('scroll', function () {
        var wTop = $(this).scrollTop();
        // console.log(wTop);
        if (wTop > arrayTop[1] && wTop < arrayTop[2] ||
            wTop > arrayTop[3] && wTop < arrayTop[4]) {
            $('#header').removeClass('bgGray');
            $('#header').removeClass('w');
        } else if (wTop > arrayTop[4]) {
            $('#header').removeClass('w');
            $('#header').addClass('bgGray');
        } else {
            $('#header').removeClass('bgGray');
            $('#header').addClass('w');
        }
        // header
        if (wTop > arrayTop[1]) {
            $('.toTop').addClass('visible');
            $('.intro').removeClass('aniMo');
        } else {
            $('.toTop').removeClass('visible');
            $('.intro').addClass('aniMo');
        }
        // to top
        $(arrayTop).each(function (index, item) {
            // console.log(index, item);
            if (wTop > arrayTop[index] && wTop < arrayTop[index + 1]) {
                $('#sec' + index).addClass('active');
            } else if (wTop < 1) {
                $('.section').removeClass('active');
            }
            // } else {
            //     $('#sec' + index).removeClass('active');
            // }
            if (wTop > arrayTop[1] && wTop < arrayTop[2]) {
                $('#usedSlide .slick-wrapper').slick('slickPlay');
            } else {
                $('#usedSlide .slick-wrapper').slick('slickPause');
            }
            // slick on,off
        });
        // section active on, off
    });
}

$(function() {
    var clear;
    var fullpage = $('#fullpage');
    if ($('html').hasClass('pc')) {
        fullpageSet();
        headScroll();
        setTimeout(function () {
            $('.intro').addClass('ani');
        }, 100);
    }
    if ($('html').hasClass('mobile')) {
        mainMbSet();
        setTimeout(function () {
            $('.intro').addClass('aniMo');
        }, 100);
    }
})






