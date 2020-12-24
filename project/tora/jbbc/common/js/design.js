$(function($){

	//Selectbox Design
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
    select_value.bind('focusout',function(){$(this).removeClass('outLine')});
    select_input.bind('focusin',function(){$(this).parents('div.select').children('div.my_value').addClass('outLine')});
    select_input.bind('focusout',function(){$(this).parents('div.select').children('div.my_value').removeClass('outLine')});
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
	$(select_a).click(function(){
        $('.subway .tab_s a').removeClass('active');
		$('.subway .cont').hide();
    });
    select_value.click(show_option);
    select_root.removeClass('open');
    select_root.mouseleave(function(){$(this).removeClass('open')});
    select_a.click(set_anchor).click(hide_option).focus(i_hover).hover(i_hover);
    select_input.change(set_label).focus(set_label);
    select_label.hover(i_hover).click(hide_option);

	$('.nav_tree ul li button,.nav_tree .nav_tree_label').click(function(){ //tree menu
		$(this).parent().toggleClass('nav_tree_on');
		return false;
	});
	
	//Snb
	var menu_v = $('div.menu_v');
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
	ssItem.find('>a').click(subMenuActive).focus(subMenuActive);

});

function viewPopup(v, n){ //ÆË¾÷Ãâ·Â
	$('html').addClass('fixed');
	var obj=$("#"+v.split("#")[1]);
	obj.show();
	return false;
}
function viewPopupCls(){ //ÆË¾÷´Ý±â
	$('.mw').hide();
	$('html').removeClass('fixed');
}