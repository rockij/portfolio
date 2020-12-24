// webfont load
WebFont.load({
	google: {
		families: ['Prompt']
	}
});

// 약관동의
$(function(){
	var $tip = $("#ct.pwset .tooltip");
	$(".form_agree .check2").on("click", function() {
		var count = $(".form_agree input:checked").length;
		if(count == $(".form_agree>li").length - 1){
			$(".btn_skip").addClass('on');
			$("li.all input").prop("checked", true);
			$tip.show();
		} else {
			$(".btn_skip").removeClass("on");
			$("li.all input").prop("checked", false);
			$tip.hide();
		}
	});
	$(".form_agree li.all").on("click", function() {
		if($(".form_agree li.all input").prop("checked")){
			$(".check2 input").prop("checked", true);
			$(".btn_skip").addClass("on");
			$tip.show();
		}else{
			$(".check2 input").prop("checked", false);
			$(".btn_skip").removeClass('on');
			$tip.hide();
		}
	});
	$(".form_agree li.need").on("click", function() {
		if($(".form_agree li.need input").prop("checked")){
			$(".btn_skip").addClass("on");
			$tip.show();
		}else{
			$(".btn_skip").removeClass('on');
			$tip.hide();
		}
	});
});

// fixed 영역만큼 간겨주기
function fixValue(target){
	var $topSpe = $("#"+target+" .fix_top").outerHeight(), $btmSpe = $("#"+target+" .fix_btm").outerHeight();
	if(target == "ct"){
		$("#wrap").css("padding-top",$topSpe);
		$("#wrap").css("padding-bottom",$btmSpe);
	}else if(target == "wrap"){
        $("#wrap").css("padding-top",$topSpe);
        if($("#ct.bankSlct").length > 0){
            $("#wrap").css("padding-top","");
        }
	}
	if($("#"+target).hasClass("ly_full")){
		var $height = $(window).height() - $topSpe - $btmSpe;
		$("#"+target+" .cont").css("top",$topSpe);
		$("#"+target+" .scroll").css("height",$height);
	}
}

// 팝업
function layer_open(obj){
	var $body = $("html, body"), temp = $("#"+obj);
	$body.addClass('noScroll');
	temp.show();
	fixValue(obj);
	// 추소찾기 팝업 입력 활성화
	if(obj == "addrStep1" || obj == "addrStep2"){
		$("#addrStep1 .input input").focus();
		$("#addrStep2 .input input").focus();
	}
}
function layer_close(){
	var $body = $("html, body");
	$body.removeClass('noScroll');
	$(".ly_pop").hide();
}

// setting fn
$(function(){
	$.fn.extend({
		// input focus
		inputFocus: function () {
			var $input = $('.input input, .input textarea');
			$input.focus(function(){
				$(".input").removeClass('focus');
				$(this).parent().addClass('focus');
			}).blur(function(){
				$(this).parent().removeClass('focus');
				if($('.input').children('textarea').length){
					$('.input textarea').parent().addClass('textarea');
				}
			}).blur();
		},
		// input 삭제
		inputDel: function () {
			$(".input_del input").on("focus keyup", function(e){
				if ($.trim($(this).val()) == "" ) {
					$(this).parent().find(".btn_del").hide();
				}else{
					$(this).parent().find(".btn_del").show();
				}
			});
			$(".input_del input").on("focusout", function(e){
				setTimeout(function(){ $(e.target).parent().find(".btn_del").hide(); }, 250);
			});
			$(".input_mynum input").on("focus keyup", function(e){
				if ($.trim($(this).val()) == "" ) {
					$(this).parent().parent().parent().next(".btn_del").hide();
				}else{
					setTimeout(function(){ $(e.target).parent().parent().parent().next(".btn_del").show(); }, 250);
				}
			});
			$(".btn_del").on("click", function(e){
				e.preventDefault();
				$(this).hide().parent().find('input').val('').focusout();
			});
		},
		// 숫자 입력 체크
		numChk: function () {
			$(".input input, .input .text").blur(function(){
				if($(this).val().replace(/[^0-9]/gi,'') ){
					$(this).addClass("num");
				}
				if($(this).text().replace(/[^0-9]/gi,'') ){
					$(this).addClass("num");
				}
			}).blur();
		},
		slowDis: function () {
			setTimeout(function(){ $(".slowdis").fadeOut(); }, 3000);
		},
	});
	$(".input").inputFocus();
	$(".input").numChk();
	$(".input_del input").inputDel();
	$(".slowdis").slowDis();
	$("input:eq(0)").parent().addClass("focus"); //first input 활성화
});

// page load
$(window).load(function(){
	fixValue("ct");
	if($("#header").hasClass("fix_top")){
		fixValue("wrap");
	}
});