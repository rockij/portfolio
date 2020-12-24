// fullpage
function fullPage(){
    $('#fullpage').fullpage({
        autoScrolling: true,
        fitToSection: false,
        navigation: true,
        responsive: true,
        resize: true,
        scrollOverflow: true,
        onLeave: function(index,slideIndex,nextIndex,direction){
            // console.log(slideIndex);
            // alert(slideIndex);
            $(".gnb li").removeClass("selected");
            $(".btn_top").addClass("act1");
            if(slideIndex == 1){
                $("header, #fp-nav").removeClass('chg');
                $(".btn_top").removeClass("btm act1");
                $(".appdown_fix").addClass("on");
            }else if(slideIndex == 2){
                $("header, #fp-nav").addClass('chg');
                $(".gnb li:eq(0)").addClass("selected");
                $(".btn_top").removeClass('btm').addClass("act1");
                $(".appdown_fix").addClass("on");
            }else if(slideIndex == 3){
                $(".gnb li:eq(1)").addClass("selected");
                $(".appdown_fix").addClass("on");
                $(".btn_top").removeClass('btm');
            }else if(slideIndex == 4){
                $(".gnb li:eq(2)").addClass("selected");
                $(".appdown_fix").removeClass("on");
                $(".btn_top").addClass('btm');
            }else if(slideIndex == 5){
                $(".gnb li:eq(2)").addClass("selected");
                $("header, #fp-nav").addClass('chg');
                $(".appdown_fix").addClass("on");
                $(".btn_top").removeClass('btm');
            }else if(slideIndex == 6){
                $("header, #fp-nav").addClass('chg');
            }
            if(slideIndex == 6){
				$(".btn_top").addClass('sec5')
			} else {
				$(".btn_top").removeClass('sec5')
			}
        },
        afterRender: function(){
            $(".appdown_fix").addClass("on");
        },
        afterResize: function() {
            var win = $(window).width();
            if(win > 768) {
                $(".gnb li").removeClass("selected");
            }
            $.fn.fullpage.setAllowScrolling(true);
        },
    });
    $('#fullpage').addClass('on');
    // $.fn.fullpage.silentMoveTo(4);
    countPlay();
}

// lnb
function lnbClose(){
    $("header").removeClass("open");
  }
  function lnbClick(){
    if($("header").hasClass("open")){
      $("header").removeClass("open");
    }else{
      $("header").addClass("open");
    }
  }
  function lnbMv(sec) {
    var secTop = $('#' + sec).offset().top;
    if(sec == 'section1') {
        $('header').addClass('chg');
    } else {
        $('header').removeClass('chg');
    }
    $('html,body').animate({ scrollTop: secTop }, 500);
  }

// fullpage Setting
function fullpageStop(){
    fullPage();
    var win = $(window).width();
    if(win > 768){
        $.fn.fullpage.setAllowScrolling(false);
    }
}

function moScroll() {
    // var vw = window.innerWidth;

    if($('.win').length === 0) {
        $(window).on('scroll', function () {
            var sTop = $(this).scrollTop();
            $(".appdown_fix").addClass("on");
            $("header, #fp-nav").removeClass('chg');
            $(".btn_top").removeClass("act1");
            if (sTop > $("#section1").offset().top - 50) {
                $("#section1").addClass("active");
                $("header, #fp-nav").addClass('chg');
                $(".btn_top").removeClass('btm').addClass("act1");
                $(".appdown_fix").addClass("on");
            } if (sTop > $("#section2").offset().top - 50) {
                $("#section2").addClass("active");
                $(".appdown_fix").addClass("on");
                $(".btn_top").removeClass('btm');
            } if (sTop > $("#section5").offset().top - 50) {
                $("#section5").addClass("active");
                $(".appdown_fix").addClass("on");
                $(".btn_top").removeClass('btm');
            } if (sTop > $("#section3").offset().top - $("#section3").height() / 2) {
                $(".appdown_fix").removeClass("on");
                $(".btn_top").addClass('btm');
            }
        }).trigger("scroll");
    }
}

$(function(){
	$(".input").inputFocus();
	var win = $(window).width();
    var clear;
    var device = 'pc';
    fpageSet(win);
    function fpageSet(win){
        if(win < 768) {
            countPlay();
            if(device == 'mo') {
                $.fn.fullpage.destroy('all');
            }
            setTimeout(function() {
                moScroll();
            },100);
            device = 'pc';
        }else{
            if(device == 'pc') {
                clearTimeout(clear);
                device = 'mo';
                fullPage();
                clear = setTimeout(function() {
                    $.fn.fullpage.moveTo(1);
                },10);
                $(".section").removeClass("active");
            }
        }
    }
    $(window).on('resize', function(){
        var win = $(window).width();
        fpageSet(win);
    });

    $(".btn_top").on('click', function(){
        if(device == 'mo') {
            $.fn.fullpage.moveTo(1);
        } else {
            $('html,body').animate({ scrollTop: 0 }, 500);
        }
    });

    // 공인인증서 복사
    $(".btn_copy button").on('click', function(e){
        $(".btn_top").addClass("act1");
        $.fn.fullpage.moveTo(6);
    });
});

// x scroll 만들기
windowResize();
function windowResize() {
	var bodyWidth = window.innerWidth;
	window.onresize = function() {
		bodyWidth = window.innerWidth;
		if(bodyWidth <= 1280) {
			setTimeout(function() {
				$('body').css('overflow-x', 'visible');
			}, 100)
		}
	}
	if(bodyWidth <= 1280) {
		setTimeout(function() {
			$('body').css('overflow-x', 'visible');
		}, 100)
	}
}