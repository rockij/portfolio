// webfont load
WebFont.load({
	google: {
		families: ['Roboto']
	}
});

// 안드로이드 버전체크
$(function(){
	var x = navigator.userAgent;
	if(x.match(/Android/)){
		var index = x.indexOf('Android');
		var and_v = eval(x.substr(index+8,1));
		// alert(and_v);
		if(and_v < 5){
			// 안드로이드 버전 5.0 이하
			// alert(x);
			$('body').addClass('and5-below');
		}else{
			// 안드로이드 버전 5.0 이상
		}
	}
});

// 팝업
function layer_open(obj,scrl){
	var $body = $("html, body"), temp = $("#"+obj);
	temp.addClass("show");
	if(scrl == "no"){
		$body.css("overflow","hidden");
	}
	if($(temp).hasClass('event')) {
		$('body').addClass('noScroll');
	}
	 // 영역 외 클릭 닫기
	$('.ly_pop').click(function(e){
		if(!$('.ly_pop .cont').has(e.target).length) {
			layer_close();
		}
	});
	//  댓글 리스트 영역 팝업 선택시 배경 자동 선택 방지
	// if(obj == "cmtDel"){
	// 	$('.ly_pop').unbind();
	// }
}
function layer_close(){
	var $body = $("html, body");
	if($body.css("overflow") == "hidden"){
		$body.css("overflow","");
	}
	if($("#gnb").css("right") == "0px"){
		$body.css("overflow","hidden");
	}
	$(".ly_pop").removeClass("show");

	if($('body').hasClass('noScroll')) {
		$('body').removeClass('noScroll');
		$(".lyPop").removeClass("show");
	}
}
$(function(){
	$(".ly_pop").blur(function(){
		var $obj = $(this).find(".elm"), $height = $obj.outerHeight();
		$obj.css({bottom:-$height});
	}).blur();
	$('.ly_cls').click(function(e){
		layer_close();
	});
});

// gnb
$(function(){
	var body = $("html, body"), $film = $(".bgb");
	var $gnb = $("#gnb"), $gnbt = $("#header .btn_gnb"), $gncls = $("#gnb .btn_cls");
	var spd = 350;
	$gnbt.on("click", function(){
		body.css("overflow","hidden");
		$film.show();
		$gnb.stop().animate({right:0}, spd);
	});
	$gncls.on("click", function(){
		body.css("overflow","");
		$film.hide();
		$gnb.stop().animate({right:"-15.5rem"}, spd);
	});
	$film.on("click", function(){
		body.css("overflow","");
		$film.hide();
		$gnb.stop().animate({right:"-15.5rem"}, spd);
	});
});

// fix 영역만큼 공간
function fixValue(){
	var $tops = $(".fix_top").outerHeight(), $btms = $(".fix_btm").outerHeight();
	if($(".fix_top").length > 0) $("#wrap").css("padding-top",$tops);
	if($(".fix_btm").length > 0){
		if($(".caution_box").length > 0){
			$(".caution_box").css("padding-bottom",$btms);
			$("#wrap").css("padding-bottom","");
		}else{
			$("#wrap").css("padding-bottom",$btms);
		}
	}
}

// 맨위로
$(function(){
	$(".btn_top").on("click", function(){
		var $body = $("html, body");
		$body.stop().animate({ 'scrollTop': $body.offset().top }, 350);
	});
});

// 약관선택
$(function(){
	$(".form_agree .one .check").on("change", function() {
		var count = $(".form_agree .one input:checkbox:checked").length;
		if(count == $(".form_agree .one li").length){
			//$(".btn_skip").addClass("on");
			$(".all input").prop("checked", true);
		} else {
			//$(".btn_skip").removeClass("on");
			$(".all input").prop("checked", false);
		}
	});
	$(".form_agree .all .check").on("change", function() {
		if($(this).find("input").prop("checked")){
			$(".check input").prop("checked", true);
			//$(".btn_skip").addClass("on");
		}else{
			$(".check input").prop("checked", false);
			//$(".btn_skip").removeClass("on");
		}
	});
});

// 댓글 리스트
// $(function(){
// 	var $tab = $(".detail_type2 .cmt_list>li");
// 	$tab.bind("taphold", function(){
// 		layer_open("cmtDel");
// 	});
// });

// 이용방법 스텝
$(function(){
	$(".useway_visual button").on("click", function(){
		var idx = $(this).parent().index()+1;
		$(".useway_visual").hide();
		$(".useway_visual.s"+idx).show();
		$(".useway_path li").removeClass("on");
		$(".useway_path li:nth-child("+idx+")").addClass("on");
	});
});

// setting fn
$(function(){
	$.fn.extend({
		inputFocus: function () {
			var input = $(".input input, .textarea textarea");
			input.focus(function(){
				$(this).parent().addClass("focus");
				//$(this).parent().find(".rtbx.cfm").addClass("on");
			}).blur(function(){
				var right = $(this).parent().find(".rtbx").width();
				var left = $(this).parent().find(".ltbx").outerWidth();
				$(this).parent().removeClass("focus");
				//$(this).parent().find(".rtbx.cfm").removeClass("on");
				$(this).parent().css("padding-right",right);
				$(this).parent().css("padding-left",left);
				$(this).parent().find(".lbl").css("left",left);
			}).change(function(){
				$(this).parent().removeClass("focus");
			}).blur();
		},
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
			$(".input_del .btn_del").on("click", function(e){
				e.preventDefault();
				$(this).hide().parent().find('input').val('').focus();
			});
		},
		placeholder: function () {
			var i_text = $(".placeholder>label").next(".i_text");
			$(".placeholder>label").css("position","absolute");
			i_text.focus(function(){
				$(this).prev("label").css("visibility","hidden");
			}).blur(function(){
				if($(this).val() == ""){
					$(this).prev("label").css("visibility","visible");
				} else {
					$(this).prev("label").css("visibility","hidden");
					$(this).parent().addClass("active");
				}
			}).blur();
		},
		select: function () {
			$("select").change(function() {
				if ($(this).val() == "") {
					$(this).removeClass("selected");
				} else {
					$(this).addClass("selected");
				}
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
				$("html, body").animate({scrollTop : $(this).offset().top}, 350);
			});
		},
	});
	$(".input").inputFocus();
	$(".placeholder").placeholder();
	$("select").select();
	$(".list_toggle").bbsToggle();
    $(".input_del input").inputDel();
    setInterval(function(){ $(".login_ct .st").toggleClass("r") }, 1000);
});

// page load
$(window).load(function(){
	fixValue();
});

function gpToggle() { // 포인트 상세내역 게임별 토글
	var target = event.target;
	var tApp = $(target).parents('.app');
	var tList = tApp.find('.toggle_list');
	
	if($(tList).hasClass('toggle')) {
		$(tList).removeClass('toggle');
	} else {
		$('.toggle_list').removeClass('toggle');
		$(tList).addClass('toggle');
	}
}
function todaySet() { // 오늘 셋팅
	var today = todayChk();
	function todayChk() {
		var date = new Date();
		return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
	}
	// console.log(today);
	$('.target_year').text(today.slice(0,4));
	$('.target_month').text(today.slice(5,7));
	
	$('.date_game').each(function (index, item) { // 오늘 포인트 있을 때 상세내역 활성화
		if ($(item).attr('play-day') === today) {
			// console.log(item, $(item).attr('play-day'));
			$(item).addClass('selectDay');
		}
	});
}

function datepicker() { // 달력
	
	var playDay = [];
	$('.date_game').each(function (index, item) {
		playDay.push($(item).attr('play-day'));
	});
	function ymChg(year, month, inst) { // 년,월 chg
		// console.log(year, month, inst);
		$('.target_year').text(year);
		$('.target_month').text(month);
	}
	function playDate(date) { // 플레이 일자 비교해서 클래스 및 버튼 활성화
		var m = date.getMonth(),
			d = date.getDate(),
			y = date.getFullYear();
		if (m < 10) {
			m = '0' + m;
		}
		if (d < 10) {
			d = '0' + d;
		}
		// console.log(y + '-' + m + '-' + d);
		for (var i = 0; i < playDay.length; i++) {
			if ($.inArray(y + '-' + (m + 1) + '-' + d, playDay) != -1) {
				return [true, "playDay"];
			} else {
				return [false]; // 플레이 안한 날은 버튼 disable
			}
		}
	}

	function selectDate(dateText, inst) { // 날짜 선택 시 하단 상세내역 활성화
		$('.date_game').removeClass('selectDay'); // 기본적으로 다지움
		// console.log(dateText, inst);
		var m = inst.selectedMonth + 1,
			d = inst.selectedDay,
			y = inst.selectedYear;
		if (m < 10) {
			m = '0' + m;
		}
		if (d < 10) {
			d = '0' + d;
		}
		var selectDay = y + '-' + m + '-' + d;
		// console.log(selectDay);
		$('.date_game').each(function (index, item) {
			// console.log(index, item);
			if (selectDay === $(item).attr('play-day')) { // 해당하는 날짜만 addClass
				$(item).addClass('selectDay');
			};
		});

		var gameBtm = $('.date_game').offset().top + $('.date_game').height(); // 상세내역 bottom
		$('html,body').animate({scrollTop: gameBtm}, 300); // 스크롤 이동
	}

	$('#datepicker').datepicker({
		inline: true, // 달력활성화
		showMonthAfterYear: true, //년도 먼저 나오고, 뒤에 월 표시
		yearSuffix: "년", //달력의 년도 부분 뒤에 붙는 텍스트
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], //달력의 요일 부분 텍스트
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], //달력의 월 부분 Tooltip 텍스트
		onSelect: selectDate,
		beforeShowDay: playDate,
		onChangeMonthYear: ymChg,
	});
	$('#datepicker').datepicker('setDate', 'today');
}