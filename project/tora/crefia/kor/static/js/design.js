function bodyfix(){ //body 스크롤삭제
	$("body").addClass("fixed");
}
$(function($){
	//common
	$(document).ready(function(){
		$(".formbox tr.vt:last-child").addClass("last");
	});
	$("input[type=text], input[type=password], textarea").focus(function(){ //입력박스 포커스시
		$(this).addClass("active");
	});
	$("input[type=text], input[type=password], textarea").blur(function(){ //입력박스 아웃시
		$(this).removeClass("active");
	});
	//gnb submenu
	$("#gnb a").hover( function() { $("#header .submenu").show(); } );
	$("#header").mouseleave( function() { $("#header .submenu").hide(); } );
	//quickmenu allmenu
	$("nav.quick .totalmenu-ctl").click(function() {
		$("nav.quick .dashboard-ctl").removeClass("active");
		$(".dashbdmenu").hide();
		$(this).toggleClass("active");
		$(".totalmenu").toggle();
		return false;
	});
	//dashboard
	$("nav.quick .dashboard-ctl").click(function() {
		$("nav.quick .totalmenu-ctl").removeClass("active");
		$(".totalmenu").hide();
		$(this).toggleClass("active");
		$(".dashbdmenu").toggle();
		return false;
	});
	//snb
	var menu_v = $('.snb');
	var sItem = menu_v.find('>menu>li');
	$(document).ready(function(){ //서브메뉴있을시 li 아이콘 표시
		sItem.has(">ul").addClass("dep");
	});

	/*
	var ssItem = menu_v.find('>menu>li>ul>li');
	var ssItem = menu_v.find('>menu>li>ul>li');
	var lastEvent = null;
	
	sItem.find('>menu').css('display','none');
	menu_v.find('>menu>li>ul>li[class=selected]').parents('li').attr('class','selected');
	menu_v.find('>menu>li[class=selected]').find('>ul').css('display','block');

	function menu_vToggle(event){
		var t = $(this);
		
		if (this == lastEvent);
		lastEvent = this;
		setTimeout(function(){ lastEvent=null }, 200);
		
		if (t.next('ul').is(':hidden')) {
			sItem.find('>ul').slideUp(100);
			t.next('ul').slideDown(100);
			return false;
		}
		//하위메뉴 없을시 바로 링크 연결을 위한 삭제
		else if(!t.next('ul').length) {
			sItem.find('>ul').slideUp(100);
		} else {
			t.next('ul').slideUp(100);
		}
		if (t.parent('li').hasClass('selected')){
			t.parent('li').removeClass('selected');
		} else {
			sItem.removeClass('selected');
			t.parent('li').addClass('selected');
			return false;
		}
	}
	sItem.find('>a').click(menu_vToggle).focus(menu_vToggle);
	function subMenuActive(){
		ssItem.removeClass('selected');
		$(this).parent(ssItem).addClass('selected');
	}; 
	ssItem.find('>a').click(subMenuActive).focus(subMenuActive);*/
	// mw hide window
	$(document).keydown(function(event){
		if(event.keyCode != 27) return true;
		if ($('.mw').show()) {
			$('.mw').hide();
			$("body").removeClass("fixed");
		}
		return false;
	});
	$('.mw').find('>.bg').mousedown(function(event){
		$('.mw').hide();
		$("body").removeClass("fixed");
		return false;
	});
	$('.mw .btCls').click(function(){
		$('.mw').hide();
		$("body").removeClass("fixed");
		return false;
	});
	//input label hide
	var i_text = $('.item>label').next('.i_text');
	$('.item>label').css('position','absolute');
		i_text
		.focus(function(){
			$(this).prev('label').css('visibility','hidden');
		})
	.blur(function(){
		if($(this).val() == ''){
			$(this).prev('label').css('visibility','visible');
		} else {
			$(this).prev('label').css('visibility','hidden');
		}
	})
	.change(function(){
		if($(this).val() == ''){
			$(this).prev('label').css('visibility','visible');
		} else {
			$(this).prev('label').css('visibility','hidden');
		}
	})
	.blur();
});
