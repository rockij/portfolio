$(function($){

	//셀렉트박스 디자인 입히기
    var select_root = $('div.select');
    var select_value = $('.my_value');
    var select_a = $('div.select>ul>li>a');
    var select_input = $('div.select>ul>li>input[type=radio]');
    var select_label = $('div.select>ul>li>label');
    $('div.my_value').each(function(){		
        var default_value = $(this).next('.i_list').find('input[checked]').next('label').text();
        $(this).append(default_value);
    });
    select_value.bind('focusin',function(){$(this).addClass('outLine')});
    select_value.bind('focusout',function(){
		$(this).removeClass('outLine');
		$(this).parent().css('zIndex','30');
	});
    select_input.bind('focusin',function(){$(this).parents('div.select').children('div.my_value').addClass('outLine')});
    select_input.bind('focusout',function(){$(this).parents('div.select').children('div.my_value').removeClass('outLine')});
	$(select_value).click(function(){
        $(this).parent().css('zIndex','40');
    });
    function show_option(){
        $(this).parents('div.select:first').toggleClass('open');
    }
    function i_hover(){
        $(this).parents('ul:first').children('li').removeClass('hover');
        $(this).parents('li:first').toggleClass('hover');
    }
    function hide_option(){
        var t = $(this);
        setTimeout(function(){
            t.parents('div.select:first').removeClass('open');
        }, 1);
    }
    function set_label(){
        var v = $(this).next('label').text();
        $(this).parents('ul:first').prev('.my_value').text('').append(v);
        $(this).parents('ul:first').prev('.my_value').addClass('selected');
    }
    function set_anchor(){
        var v = $(this).text();
        $(this).parents('ul:first').prev('.my_value').text('').append(v);
        $(this).parents('ul:first').prev('.my_value').addClass('selected');
    }
    $('*:not("div.select a")').focus(function(){
        $('.a_list').parent('.select').removeClass('open');		
    });	
    select_value.click(show_option);
    select_root.removeClass('open');
    select_root.mouseleave(function(){$(this).removeClass('open')});
    select_a.click(set_anchor).click(hide_option).focus(i_hover).hover(i_hover);
    select_input.change(set_label).focus(set_label);
    select_label.hover(i_hover).click(hide_option);

	//Snb
	/*var menu_v = $('div.menu_v');
	var sItem = menu_v.find('>ul>li');
	var ssItem = menu_v.find('>ul>li>ul>li');
	var lastEvent = null;
	
	sItem.find('>ul').css('display','none');
	menu_v.find('>ul>li>ul>li[class=active]').parents('li').attr('class','active');
	menu_v.find('>ul>li[class=active]').find('>ul').css('display','block');

	function menu_vToggle(event){
		var t = $(this);
		
		if (this == lastEvent) return false;
		lastEvent = this;
		setTimeout(function(){ lastEvent=null }, 200);
		
		if (t.next('ul').is(':hidden')) {
			sItem.find('>ul').slideUp(100);
			t.next('ul').slideDown(100);
		} else if(!t.next('ul').length) {
			sItem.find('>ul').slideUp(100);
		} else {
			t.next('ul').slideUp(100);
		}
		
		if (t.parent('li').hasClass('active')){
			t.parent('li').removeClass('active');
		} else {
			sItem.removeClass('active');
			t.parent('li').addClass('active');
		}
	}
	sItem.find('>a').click(menu_vToggle).focus(menu_vToggle);
	
	function subMenuActive(){
		ssItem.removeClass('active');
		$(this).parent(ssItem).addClass('active');
	}; 
	ssItem.find('>a').click(subMenuActive).focus(subMenuActive);*/
	
	$(document).ready(function(){ //common
		$('.main_ct .notice table tr:first-child').addClass('first');
		$('.chart_form .chkLst2 li:first-child').addClass('mt0');
		$('.tblSt tr:first-child').addClass('first');
	});

});

function blurInputTxt(obj) { //input text bg
	if (obj.value == "") {
		if (obj.name == "srchInp") { //검색어를 입력하세요.
			obj.style.backgroundImage = "url(../../img/common/txt_input_bg.gif)";
		}
	}
}

function totalMenuOpen(){ //전체메뉴 열기
	$('.gnb .submenu').show();
	$('.gnb .submenu ul').animate({height:"220", opacity:"1"}, 350);
}
function totalMenuClose(){ //전체메뉴 닫기
	$('.gnb .submenu ul').animate({height:"0", opacity:"0"}, 350);
	$('.gnb .submenu').hide();
}

function mainBBSControl(name,num){ //메인> 통합공고&공지사항
	$('.main_ct .notice .hide').hide();
	$('.main_ct .notice #'+name).show();
	$('.main_ct .notice .tab a').removeClass('selected');
	$('.main_ct .notice .tab li:nth-child('+num+') a').addClass('selected');
}