// webfont load
WebFont.load({
	google: {
		families: ['Roboto']
	}
});

// 세로&가로 모드 대응
$(window).on("orientationchange", function(event){
	$("html").removeClass("horiz");
	if(window.matchMedia("(orientation: portrait)").matches){
		// 세로 모드 (평소 사용하는 각도)
	}else if(window.matchMedia("(orientation: landscape)").matches){
		// 가로 모드 (동영상 볼때 사용하는 각도)
		$("html").addClass("horiz");
	}
});

// fix 영역만큼 공간
function fixValue(){
	var $tops = $(".fix_top").outerHeight(), $btms = $(".fix_btm").outerHeight();
	if($(".fix_top").length > 0) $("#wrap").css("padding-top",$tops);
	if($(".fix_btm").length > 0) $("#wrap").css("padding-bottom",$btms);
}
$(document).ready(function(){ fixValue() });
$(window).load(function(){ fixValue() });

// 팝업
function layer_open(obj){
	var $body = $("html, body"), temp = $("#"+obj);
	$body.css("overflow","hidden");
	temp.show();
}
function layer_close(){
	var $body = $("html, body");
	$body.css("overflow","");
	$(".ly_pop").hide();
}

// 맨위로
$(function(){
	$(".btn_top").on("click", function(){
		var $body = $("html, body");
		$body.stop().animate({ 'scrollTop': $body.offset().top }, 350);
	});
	$(window).scroll(function(){
		if($(document).scrollTop() > 0){
			$(".btn_top").fadeIn();
			$("#header").addClass("shw");
		}else{
			$(".btn_top").fadeOut();
			$("#header").removeClass("shw");
		}
		if($(".fix_btm").length > 0){
			var $btms = $(".fix_btm").outerHeight()-1;
			$(".btn_top").css("bottom",$btms);
		}
		if ($(window).scrollTop() >= $(document).height()-$(window).height()-$(".cs_center").outerHeight()+$(".btn_top").outerHeight()/6) {
			$('.btn_top').addClass('nofix');
		}else{
			$('.btn_top').removeClass('nofix');
		}
	});
});

// 메인
$(function(){
	// 투자현황 클릭
	$(".myinvest_status h2 button").on("click", function(){
		var $body = $("html, body");
		$body.stop().animate({ 'scrollTop': $body.offset().top }, 0);
		if($(".myinvest_status").hasClass("open")){
			// 투자현황 닫기
			$(".myinvest_status").removeClass("open");
			$("#header .top").removeClass("fix_top");
			$("#header").addClass("fix_top");
			$(".swir_gstock_bg").removeClass("open");
			$(".myinvest_add").removeClass("open");
		}else{
			// 투자현황 열기
			$(".myinvest_status").addClass("open");
			$("#header").removeClass("fix_top");
			$("#header .top").addClass("fix_top");
			$(".swir_gstock_bg").addClass("open");
			$(".myinvest_add").addClass("open");
		}
		fixValue();
	});
	// 스크롤시 변화
	$(window).scroll(function(){
		if($("#wrap.main").length > 0){
			if($(document).scrollTop() > 0){
				$(".myinvest_status").addClass("bar");
			}else{
				$(".myinvest_status").removeClass("bar");
				fixValue();
			}
		}
		if($(".myinvest_status").hasClass("open")){
			$(".myinvest_status").removeClass("bar");
		}
	});
	//
	$(".list_muli .chgtab button").on("click", function(){
		var $name = $(this).attr("data-role");
		$(".list_muli .chgtab button").removeClass();
		$(this).addClass("on");
		$(".list_muli").removeClass("list thum box");
		$(".list_muli").addClass($name);
	});
});

// 매수&매도 수량선택시
$(function(){
	var $tar = $(".buysell li:first-child input");
	var $obj = $(".buysell li:last-child input");
	$obj.focus(function(){
		$(this).parent().find(".blind").text($tar.attr("placeholder"));
		$tar.attr("placeholder", "");
	}).blur(function(){
		if($tar.attr("placeholder") == ""){
			$tar.attr("placeholder", $(this).parent().find(".blind").text())
		}
	}).blur();
});

// 비밀번호 이미지화
function pwImg(){
	$(".input_pwimg input").bind("keyup", function(e) {
		var keyCode = e.keyCode || e.which;
		var byte = $(this).val();
		var del = $(this).val()+1;
		var _this = $(this).parent();
		_this.find('.mark i').removeClass();
		if(byte.length == 1){
			_this.find('.mark i:eq(0)').addClass('on');
		}else if(byte.length == 2){
			_this.find('.mark i:eq(0)').addClass('on');
			_this.find('.mark i:eq(1)').addClass('on');
		}else if(byte.length == 3){
			_this.find('.mark i:eq(0)').addClass('on');
			_this.find('.mark i:eq(1)').addClass('on');
			_this.find('.mark i:eq(2)').addClass('on');
		}else if(byte.length == 4){
			_this.find('.mark i:eq(0)').addClass('on');
			_this.find('.mark i:eq(1)').addClass('on');
			_this.find('.mark i:eq(2)').addClass('on');
			_this.find('.mark i:eq(3)').addClass('on');
		}else if(byte.length == 5){
			_this.find('.mark i:eq(0)').addClass('on');
			_this.find('.mark i:eq(1)').addClass('on');
			_this.find('.mark i:eq(2)').addClass('on');
			_this.find('.mark i:eq(3)').addClass('on');
			_this.find('.mark i:eq(4)').addClass('on');
		}else if(byte.length == 6){
			_this.find('.mark i:eq(0)').addClass('on');
			_this.find('.mark i:eq(1)').addClass('on');
			_this.find('.mark i:eq(2)').addClass('on');
			_this.find('.mark i:eq(3)').addClass('on');
			_this.find('.mark i:eq(4)').addClass('on');
			_this.find('.mark i:eq(5)').addClass('on');
		}else{
			_this.find('.mark i').removeClass();
		}
	});
	// 다음 입력칸으로 이동
	$(".input_pwimg input:first-child").keyup(function(){
    var charLimit = $(this).attr("maxlength");
    if (this.value.length >= charLimit) {
        $(this).parents().find(".input_pwimg input:first-child").focus();
        return false;
    }
  });
}

// 로딩바 X
function loading_hide(){
	$(".ly_loading").hide();
}

$(function(){
	// fn
	$.fn.extend({
		// input focus
		inputFocus: function () {
			var $body = $("html, body");
			var $input = $('.input input, .input textarea');
			$spce = $(this).parent().find(".posr").width();
			$input.focus(function(){
				$(".input").removeClass('focus');
				$(this).parent().addClass('focus');
				$(this).parent().find(".posr").show();
				$(this).parent().css("padding-right",$spce);
				pwImg();
			}).blur(function(){
				$(this).parent().removeClass('focus');
				$(this).parent().find(".posr").hide();
				$(this).parent().css("padding-right","");
				if($('.input').children('textarea').length)
					$('.input textarea').parent().addClass('textarea');
				if($('.input').children('textarea').length)
					$('.input textarea').parent().addClass('textarea');
				if(!$.trim($(this).val()) == "" ) {
					$(this).parent().find(".posr").show();
					if($(".posr").length > 0) $(this).parent().css("padding-right",$spce);
				}
				if($(".input_pwimg").length > 0){
					$body.stop().animate({ 'scrollTop': $body.offset().top }, 0);
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
			$(".input_pwimg input").on("focus keyup", function(e){
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
		toggleArea: function () {
			$(".toggle_area .btn_tgle").on("click", function(){
				$(this).toggleClass("open");
				$(this).parent().parent().toggleClass("open");
			});
		},
		bbsToggle: function () {
			var obj = $(".list_toggle li.q");
			var ans = $(".list_toggle li.a");
			obj.on("click", function(){
				if(!$(this).hasClass("active")){
					obj.removeClass("active");
					ans.removeClass("open");
					ans.filter(":visible").css("display", "none");
					$(this).addClass("active").next("li.a").css("display", "block");
				}else{
					$(this).removeClass("active");
					$(this).next("li.a").css("display", "none");
				}
				// $("html, body").animate({scrollTop : $(this).offset().top}, 350);
			});
		},
	});
	$(".input").inputFocus();
	$(".input_del input").inputDel();
	$(".toggle_area").toggleArea();
	$(".list_toggle").bbsToggle();
	// 종목투자
	$(".buyfrm_area input:eq(0)").parent().addClass("focus");
	$(".buyfrm_area input").on("focusout", function(){
		$("html,body").stop().animate({ 'scrollTop': $("html,body").offset().top }, 0);
	});
});