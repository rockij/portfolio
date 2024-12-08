//gnb
$(function(){
	var body = $('html, body');
	var obj = $('#gnb');
	var menu = $('.btn_menu');
	var film = $('#gnb > .bgb');
	var list = $('#gnb li li a');
	var head = $('#header');
	var area = $('#gnb h2 a, #gnb .list ul ul');
	var dep2 = $('#gnb .list ul ul');
	$.gnbCls = function(){
		body.removeAttr('style');
		menu.removeClass('open');
		menu.find('.spin').removeClass('on');
		film.hide();
		obj.css('right','-301px');
	}
	film.on('click', function(){
		body.removeAttr('style');
		menu.removeClass('open');
		menu.find('.spin').removeClass('on');
		film.hide();
		obj.stop().animate({right:-301});
	});
	menu.on('click', function(){
		if(!$(this).hasClass('open')){
			$(this).addClass('open');
			$(this).find('.spin').addClass('on');
			body.css('overflow','hidden');
			body.css('height','100%');
			film.show();
			obj.stop().animate({right:0});
		}else{
			$(this).removeClass('open');
			$(this).find('.spin').removeClass('on');
			body.removeAttr('style');
			film.hide();
			obj.stop().animate({right:-301});
		}
	});
	$.gnbOver = function(){
		$('#gnb h2 a').on('click', function(e){
			e.preventDefault();
		});
		$('#gnb .list ul > li').on('mouseover', function(){
			head.addClass('open motion');
			$('#gnb .list ul > li').removeClass('open');
			$(this).addClass('open');
		});
		head.on('mouseleave', function(){
			head.removeClass('open');
			$('#gnb .list ul > li').removeClass('open');
		});
	}
	$.gnbClick = function(){
		area.off('hover');
		dep2.css('display', 'block');
	}
	$(document).ready(function(){
		var width = $(window).width();
		if(width < 1023){
			$.gnbClick();
		}else{
			$.gnbOver();
		}
	});
	$(window).resize(function(){
		var width = $(window).width();
		if(width < 1023){
			$.gnbClick();
		}else{
			$.gnbCls();
			$.gnbOver();
		}
	});
});

//checkbox image
$(function($){
	$(".checkbox").click(function(){
		if ($(".checkbox").children("input").length) {
			$("label").each(function(){
				$(this).removeClass("on");
			});
			$("input:checked").each(function(){
				$(this).next("label").addClass("on");
			});
		}
	});
});

//family
$(function($){
	var family = $('.familybox'),
	familyList = $('.familybox ul'),
	familyBtn = $('.familybox button');
	familyBtn.on('click', function(){
		familyList.stop().slideToggle(450, 'easeInOutExpo');
		return false;
	});
	family.on('mouseleave', function(){
		familyList.stop().slideUp(450, 'easeInOutExpo');
		return false;
	});
});

//top
$(function($){
	var $top = $('.btn_top');
	var body = $('html, body');
	$top.on('click', function(e){
		body.stop().animate({ 'scrollTop': body.offset().top }, 550);
		e.preventDefault();
	});
});

//toggle bbs
$(function(){
	var obj = $('.bbs_toggle li.q');
	var ans = $('.bbs_toggle li.a');
	obj.bind({
		click : function(){
			if(!$(this).hasClass('active')){
				obj.removeClass('active');
				ans.removeClass('open');
				ans.filter(':visible').css('display', 'none');
				$(this).addClass('active').next('li.a').css('display', 'block');
			}else{
				$(this).removeClass('active');
				$(this).next('li.a').css('display', 'none');
			}
			//$(window).scrollTop($(this).offset().top);
		},
		mouseover : function(){
			$('.edge').remove();
			$(this).append('<span class="edge"></span>');
		},
		mouseleave : function(){
			$('.edge').remove();
		}
	});
	if($('.bbs_toggle .list.not').length > 0){
		obj.on('click', function(){
			$(this).removeClass('active');
			$(this).next('li.a').css('display', 'none');
		});
	}
});

//daily report tab
function drTab(){
	var cTab = $('.daily_report .tab li a');
	cTab.click(function(e){
		cTab.parent().removeClass('active');
		$(this).parent().addClass('active');
		e.preventDefault();
	});
}
$(function($){
	drTab();
	if ($.browser.msie  && parseInt($.browser.version) == 9 || window.navigator.userAgent.indexOf('Trident/4.0') >= 0) {
		$('.ly_loading').addClass('ie9');
	}
});

$(function($){
	$('.bbs_toggle .tab li').on('click', function(){
		var idx = $(this).index()+1;
		$('.bbs_toggle .tab li button').removeClass('on');
		$(this).find('button').addClass('on');
		$('.bbs_toggle .list').hide();
		$('.bbs_toggle #bbs'+idx).show();
	});
});