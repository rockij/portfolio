//form setting
$(function(){	
	//input focus 효과
	var $obj = $('input[type="text"],input[type="password"],input[type="tel"],input[type="number"]');
	$obj.on('focus', function(){
		$(this).parent().addClass('fcs');		
	});	
	$obj.on('blur', function(){
		$(this).parent().removeClass('fcs');
	});
	$obj.on('keyup', function(){
		var input = $(this);
		if (!input.val() == 0) {
			input.parent().find('.btn_del').show();
		}else{
			$('.btn_del').hide();
		}
	});
	var del = $('.btn_del ');
	del.on('click', function(){
		$(this).hide();
		$(this).parent().find('input').val('');
	});
	//input 수정
	var chg = $('.btn_chg');
	var skip = $('.btn_skip');
	chg.on('click', function(){
		$(this).hide();
		$(this).parent().addClass('show');
		$(this).parent().removeClass('dis');
		$(this).parent().find('input').attr('disabled',false).focus();
		$(this).parent().find('li:first-child input').focus();
		$(this).parent().find('.btn_skip').show();
		$(this).parent().css('padding-right', '55px');
	});
	skip.on('click', function(){
		$(this).hide();
		$(this).parent().removeClass('show');
		$(this).parent().addClass('dis');
		$(this).parent().find('input').attr('disabled',true);
		$(this).parent().find('.btn_chg').show();
		$(this).parent().css('padding-right', '36px');
	});
	
	$('.logo .img_logo').css('padding-top', ($('.logo').height()-$('.logo .img_logo').height())/2 );
	
});

//주소찾기
$(function(){
	//결과 리스트 height
	//console.log($(window).height());
	var $doc = $(window).height();
	var scroll = $('.addrRsult .scroll');
	$(document).ready(function(){
		scroll.css('height', $doc-220+'px');
	});
	//탭구분
	var $obj = $('.addrtab');
	$obj.on('click', function(e){
		$('.addrbox').removeClass('on');
		$(this).parent().addClass('on');
		$('.form').hide();
		$(this).parent().find('.form').show();
		e.preventDefault();
	});
});

//device check
$(function(){
	if($(document).height() <= 480){ //ios4
		$('body').addClass('ios4');
	}
});

//main
function mainsend() {
	$('.btn_cancel').animate({'top' : '60'}, 2000);
	$('.btn_cancel').animate({'top' : '66'}, "slow");
	$('.btn_cancel').animate({'top' : '60'}, "slow");
	$('.btn_cancel').animate({'top' : '66'}, "slow");
	$('.btn_cancel').animate({'top' : '60'}, "slow");
}

//Layer Popup
function layer_open(obj) {
    var temp = $('#' + obj);
    var bg = temp.parent().parent().find('.bg').hasClass('bg');
    if(bg) {
        $('html, body').css('overflow-y','hidden');
        temp.parent().parent().show();
        temp.parent().css('overflow-y','auto');
    }
    temp.find('.popcls').on('click', function(e){
        if(bg) {
            $('html, body, .ly_pop, .ly_pop .cont').removeAttr('style');
        }
        e.preventDefault();
    });
};