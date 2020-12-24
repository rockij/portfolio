$(function($){

	$('.gnb .btDep2').click(function() {
		$('.gnb_depth').slideToggle('fast', function() {});
		return false;
	});
	//gnb depth2


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

	$('.bbsFaq .que').click(function() { //FAQ
		$(this).parent().toggleClass('active');
	});

});

function viewPopup(v, n){ //팝업출력
	$('#wrap').addClass('fixed');
	var obj=$("#"+v.split("#")[1]);
	obj.show();	
	return false;
}