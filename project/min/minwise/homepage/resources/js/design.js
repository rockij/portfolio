//Layer Popup
function layer_open(obj, url) {
    var temp = $('#' + obj);
	var bg = temp.parent().parent().find('.bg').hasClass('bg');
    if(bg) {
        temp.parent().parent().show();
        temp.parent().css('overflow-y','auto');
		if(url) {
			$("#patent_img").attr("src",url);
		}
        $('body').bind('touchmove', function(e){e.preventDefault()});
    }
    temp.find('.popcls').on('click', function(e){
        if(bg) {
            $('.ly_pop, .ly_pop .cont').removeAttr('style');
            $('body').unbind('touchmove');
        }
        e.preventDefault();
    });
    return false;
};

//table
$(function(){
	$('.bbs_list td:first-child').addClass('first');
	$.ellipsisM = function(){
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if(width < 1000){
			$('.bbs_list .sbj strong, .bbs_list2 .sbj').removeClass('ellipsis single');
		}else{
			$('.bbs_list .sbj strong, .bbs_list2 .sbj').addClass('ellipsis single');
		}
	}
	$.ellipsisM();
	$(window).resize(function(){
		$.ellipsisM();
	});
});

// top
$(function(){
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	$('.btn_top').on('click', function(){
		$('html,body').stop().animate({ 'scrollTop': $('html,body').offset().top }, 350);
	});
	if(width < 1000){
		$(window).scroll(function(){
			 if  ($(window).scrollTop() == $(document).height() - $(window).height()){
				$('.btn_top').show();
			}else{
				$('.btn_top').hide();
			}
		});
	}
});

//header
$(function(){
	var body = $('html, body')
	var gnb = $('#gnb');
	var film = $('#gnb > .bgb');
	var menu = $('.btn_menu');
	layer_open('covid');
	$.gnbSub = function(){
		var _height = $('#gnb ul ul').height();
        $('#gnb ul ul').css('height',_height);
        console.log(_height);
	};
	$(document).ready(function(){
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		$.gnbSub();
		if(width < 1000){
			$('#header, #gnb ul ul').removeAttr('style');
			gnb.css('left',-gnb.width());
		}
	});
	$('#gnb').hover(
		function(){
			var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			var _height = $('#header .inner').height();
			if(width > 1023){ $('#header').addClass('open').stop().animate({ height:_height }, 500, 'easeOutCubic') }
		},
		function(){
			var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			if(width > 1023){ $('#header').removeClass('open').stop().animate({ height:102 }, 500, 'easeOutCubic') }
		}
	);
	$(window).resize(function(){
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		$('#header, #gnb ul ul').removeAttr('style');
		$.gnbSub();
		if(width < 1000){
			$('#header, #gnb ul ul').removeAttr('style');
			if(film.css('display') == 'none'){
				gnb.css('left',-gnb.width());
			}
		}else{
			gnb.removeAttr('style');
			film.removeAttr('style');
			menu.removeClass('open');
		}
	});
	$('.btn_menu').on('click', function(e){
		//iScroll 개체 중복 출력으로 인한 에러 제거위해 추가
		var scrollCheck = $(".iScrollVerticalScrollbar.iScrollLoneScrollbar").html();
		if (scrollCheck != "" && scrollCheck != "undefined" ) {
			$('.iScrollVerticalScrollbar.iScrollLoneScrollbar').remove();
		}
		myScroll = new IScroll('#gnb .iscroll', {
			scrollbars: true,
			fadeScrollbars: false,
			mouseWheel: true,
			click: true
		});
		$('body').bind('touchmove', function(e){e.preventDefault()});
		if(!$(this).hasClass('open')){
			$(this).addClass('open');
			film.show();
			gnb.stop().animate({left:0});
		}else{
			$(this).removeClass('open');
			body.removeAttr('style');
			film.hide();
			gnb.stop().animate({left:-gnb.width()});
			e.preventDefault();
			$('body').unbind('touchmove');
		}
	});
	film.on('click', function(e){
		body.removeAttr('style');
		menu.removeClass('open');
		film.hide();
		gnb.stop().animate({left:-gnb.width()});
		e.preventDefault();
		$('body').unbind('touchmove');
	});
});

//family
$(function(){
	var family = $('.familybox'), familyList = $('.familybox ul'), familyBtn = $('.familybox button');
	familyBtn.on('click', function(){
		$(this).next('ul').stop().slideToggle(450, 'easeInOutExpo');
		return false;
	});
	family.on('mouseleave', function(){
		familyList.stop().slideUp(450, 'easeInOutExpo');
		return false;
	});
});

// 모바일 버전시 br 태그 hidden
$(function(){
	$.br = function(){
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if(width < 1000){
			$('br').css('display','none');
		}else{
			$('br').removeAttr('style');
		}
	}
	$.br();
	$(window).resize(function(){
		$.br();
	});
});

//main
function mainSrvset(){
	$('.mainSrv .swiper-wrapper').clone().appendTo('.mainSrv.grid');
	$('.mainSrv.grid *').removeAttr('style');
	$('.mainSrv.grid').find('>div').not(':first-child').remove();
}