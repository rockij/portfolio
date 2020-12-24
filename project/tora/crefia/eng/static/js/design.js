//scroll move check header fix
/*$(window).scroll(function() {
	var position = $(window).scrollTop();
	if(position > 100) {
		$('#header').addClass("fixed").animate({ "top": "0" }, "slow" );
	} else {
		$('#header').removeClass("fixed").removeAttr("style");
	}
});*/
function bodyfix(){ //mw open check body scroll hidden
	$("body").addClass("fixed");
}
$(function($){

	//gnb submenu
	$("#gnb a").hover( function() { $("#header .submenu").show(); } );
	$("#header").mouseleave( function() { $("#header .submenu").hide(); } );

	//quickmenu allmenu
	$("nav.quick .totalmenu-ctl").click(function() {
		$(this).toggleClass("active");
		$(".totalmenu").toggle();
		return false;
	});

	var menu_v = $('.snb');
	var sItem = menu_v.find('>menu>li');
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
	ssItem.find('>a').click(subMenuActive).focus(subMenuActive);

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

});