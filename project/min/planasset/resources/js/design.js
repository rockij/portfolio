function fullpageSet() { // fullpage set
    $('#fullpage').fullpage({
        autoScrolling: true,
        fitToSection: false,
        responsive: true,
        resize: true,
        scrollOverflow: false,
        onLeave: function(index, next, direction) {
            if(next == 2) {
                $('#header .btn').removeClass('now');
                $('#header .headWrap').addClass('black');
                $('#header').addClass('chgLine');
                $('#header .btn'+ next).addClass('now');
            } else {
                $('#header .btn').removeClass('now');
                $('#header .headWrap').removeClass('black');
                $('#header').removeClass('chgLine');
                $('#header .btn'+ next).addClass('now');
            }
            if(next != 1) {
                $('.goTop').addClass('on');
            } else {
                $('.goTop').removeClass('on');
            }
            if(next == 2) {
                hovFull();
            }
            if(index == 3 || index == 4) {
                hovArrow(index);
            }
            
        },
    });
}

function hovFull(count, flag) { // to block fullpage.js in comslide
    if(count == 1 && flag === true) {
        $.fn.fullpage.setAllowScrolling(false);
    } else {
        $.fn.fullpage.setAllowScrolling(true);
    }
}
function hovArrow(index) {
    if(index == 3) {
        setTimeout(function() {
            $('#section3 .arrow').removeClass('mv');
            $('#section3 .arrow').addClass('bounce');
        },2100)
    } else {
        $('#section3 .arrow').removeClass('bounce');
        $('#section3 .arrow').addClass('mv');
    }
}

function fnMove(n,e) { // gnb click css
    var tg = e.target;
    $('#gnb .btn').removeClass('now');
    $(tg).addClass('now');
    $.fn.fullpage.moveTo(n);
}

// lnb on, off
function lnbOn(head) {
    $('#' + head).addClass('lnbOn')
}
function lnbOff(head) {
    $('#' + head).removeClass('lnbOn')
}

$(document).ready(function() {
    
    var bnslide = $('.bnSlide .slick-wrapper').slick({ //배너 슬라이드
        infinite: true,
        dots: true,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 3000,
    });
    var cooperslide = $('.cooperSlide .slick-wrapper').slick({ // 협력사 슬라이드
        vertical: false,
        infinite: true,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    })

    var comslide = $('.comSlide .slick-wrapper');  //회사소개,CI 슬라이드

    $(comslide).slick({
        infinite: false,
        dots: true,
        arrows: false,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    infinite: true,
                    autoplay: false,
                    autoplaySpeed: 3000,
                }
            }
        ]
    });

    $(comslide).on('beforeChange', function(event, slick, currentSlide, nextSlide) { // comslide dot position
        if(nextSlide == 1) {
            $('.comSlide .slick-dots').addClass('up');
        } else {
            $('.comSlide .slick-dots').removeClass('up');
        }
    })
    
    function mouseWheel(comslide) { // wheel slick chg in pc
        var count = 0;
        $(comslide).on('mousewheel DOMMouseScroll', function(event) {
            var E = event.originalEvent;
            var delta = 0;
            if(E.detail) {
                delta = E.detail * -40;
                frame(delta)
            } else {
                delta = E.wheelDelta;
                frame(delta)
            }
            function frame(delta) {
                if(!flag && delta < 1 && count < 1) {
                    flag = true;
                    count = count + 1;
                    setTimeout(wheelDown, 150);
                    
                } else if(!flag && delta > 1 && count >= 1) {
                    flag = true;
                    setTimeout(wheelUp, 150);
                }
                function wheelDown() {
                    comslide.slick('slickNext');
                    flag = false;
                }
                function wheelUp() {
                    comslide.slick('slickPrev')
                    count = count - 1;
                    flag = false;
                }
                if(count == 0 || count == 1) {
                    hovFull(count, flag)
                }
            }
        })
    };

    var w = window.innerWidth;
    var flag; // on, off wheel event to use true, false

    autoScrollSet(w);
    function autoScrollSet(w) { // to chg auto scroll
        if(w < 1000) {
            $('body').removeClass('pc');
            flag = true;
        } else {
            $('body').addClass('pc');
            flag = false;
        }
    }
    if(w >= 1000) {
        fullReset()
    }
    
    var clear;
    function fullReset() {
        console.log('reset');
        fullpageSet();
        mouseWheel(comslide);
    }
    function destroy() {
        console.log('destroy');
        $.fn.fullpage.destroy('all');
    }
    
    $(window).on('resize', function(w) {
        clearTimeout(clear);
        w = window.innerWidth; // rechk width
        autoScrollSet(w);
        if($('body').hasClass('pc')) {
            clear = setTimeout(fullReset,200);
        } else {
            clear = setTimeout(destroy,200);
        }
        
        
        
    })
    
    // function sum() {
    //     var n = 0;
    //     n = n + 1;
    //     console.log(n)
    // }
})




