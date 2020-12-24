// webfont load
WebFont.load({
	google: {
		families: ['Open Sans','Roboto']
	}
});

// 브라우저 확인
$(function(){
	var agent = navigator.userAgent, match;
	var app, version;
	if((match = agent.match(/MSIE ([0-9]+)/)) || (match = agent.match(/Trident.*rv:([0-9]+)/))) app = 'Internet Explorer';
	else if(match = agent.match(/Chrome\/([0-9]+)/)) app = 'Chrome';
	else if(match = agent.match(/Firefox\/([0-9]+)/)) app = 'Firefox';
	else if(match = agent.match(/Safari\/([0-9]+)/)) app = 'Safari';
	else if((match = agent.match(/OPR\/([0-9]+)/)) || (match = agent.match(/Opera\/([0-9]+)/))) app = 'Opera';
	else app = 'Unknown';
	if(app !== 'Unknown') version = match[1];
	if( app == 'Internet Explorer' && version == 9 ){
		$('body').addClass('ie9');
  }
  // alert($(window).width());
});

// setting fn
$(function(){
	$.fn.extend({
		inputFocus: function () {
			var input = $('.input input, .input textarea');
			input.focus(function(){
				$(this).parent().addClass('focus');
			}).blur(function(){
				$(this).parent().removeClass('focus');
				if($('.input').children('textarea').length){
					$('.input textarea').parent().addClass('textarea');
				}
			}).change(function(){
				$(this).parent().removeClass('focus');
			}).blur();
		}
	});
});

// animation counting
function counting(name,speed){
	$('.count_'+name).each(function() {
		var $this = $(this), countTo = $this.attr('data-count');
		var comma = $.animateNumber.numberStepFactories.separator(',');
		$('.count_'+name).stop().animateNumber({
			number: countTo,
			numberStep: comma,
			easing: 'easeInQuad'
		}, speed );
	});
};
function countingReset(){
	$('.count').animateNumber({
		number: 0
	}, 0);
};
function countPlay(){
	counting('balance', 1000);
	counting('hit', 1000);
	counting('bank', 1000);
	counting('bank2', 1000);
}

// popup
function layer_open(obj) {
	var $body = $("html, body"), temp = $("#" + obj), win = $(window).width();
	$body.css("overflow", "hidden");
  temp.show();
  if(win > 768){
    fullpageStop();
  }
}
function layer_close() {
	var $body = $("html, body"), win = $(window).width();
	$body.css("overflow", "");
  $(".ly_pop").hide();
  if(win > 768){
    $.fn.fullpage.setAllowScrolling(true);
  }
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
	$.fn.fullpage.setAllowScrolling(false);
}

function fullPage(){
	$('#fullpage').fullpage({
        // verticalCentered: false,
		autoScrolling: true,
		fitToSection: false,
		navigation: true,
        scrollOverflow: true,
        // responsiveWidth: 768,
		onLeave: function(index,slideIndex,nextIndex,direction){
			// alert(slideIndex);
			$(".gnb li").removeClass("selected");
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
			}
			if(slideIndex == 5){
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
            // $.fn.fullpage.silentMoveTo(1);
            $(".gnb li").removeClass("selected");
            }
        },
  });
  countPlay();
}

function moScroll() {
  $(window).on('scroll', function(){
    var sTop = $(this).scrollTop();
    $(".appdown_fix").addClass("on");
    $("header, #fp-nav").removeClass('chg');
    $(".btn_top").removeClass("act1");
    if(sTop > $("#section1").offset().top - 50){
      $("#section1").addClass("active");
      $("header, #fp-nav").addClass('chg');
      $(".btn_top").addClass("act1");
      $(".appdown_fix").addClass("on");
      $(".btn_top").removeClass('btm');
    }if(sTop > $("#section2").offset().top - 50){
      $("#section2").addClass("active");
      $(".appdown_fix").addClass("on");
      $(".btn_top").removeClass('btm');
    }if(sTop > $("#section3").offset().top - $("#section3").height()/2){
      $(".appdown_fix").removeClass("on");
      $(".btn_top").addClass('btm');
    }
  }).trigger("scroll");
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
		$.fn.fullpage.moveTo(5);
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