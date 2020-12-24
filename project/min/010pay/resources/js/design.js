// form
$(function(){
	var input = $("input[type=text], input[type=password], input[type=tel], input[type=email], input[type=number], select, textarea, .input");
	var row = $(".input input, .input select");

	// input Focus
	input.focus(function(){
		$(this).addClass("focus");
		$(".bottom-banner-area.fixed").addClass("hidden-mobile"); //키패드 노출 시 하단 배너 영역 숨김 - 2020-03-09 추가
	}).blur(function(){
		$(this).removeClass("focus");
		$(".bottom-banner-area.fixed").removeClass("hidden-mobile"); //키패드 미노출 시 하단 배너 영역 보임 - 2020-03-09 추가
	}).blur();

	row.focus(function(){
		$(this).parents(".input").addClass("focus");
		$(this).removeClass("focus");
	}).blur(function(){
		$(this).parents(".input").removeClass("focus");
	}).blur();

	// input value 삭제 버튼
	$(".form-type li input").on("input change", function() {
		var $this = $(this);
		var visible = Boolean($this.val());
		$this.next(".form-control-clear").toggleClass("hidden", !visible);
	}).trigger("propertychange");
	$(".form-control-clear").on("click", function() {
		$(this).prev("input").val("").trigger("change").focus();
		$(this).toggleClass("hidden", true);
	});

	// 비밀번호 설정 입력상태 표시
	$('.input-mark input').bind("keyup input", function(e) {
		var keyCode = e.keyCode || e.which;
		var byte = $(this).val();
		var del = $(this).val() + 1;
		$('.input-mark .mark i').removeClass();
		if (byte.length == 1) {
			$('.input-mark .mark i:eq(0)').addClass('on');
		} else if (byte.length == 2) {
			$('.input-mark .mark i:eq(0), .input-mark .mark i:eq(1)').addClass('on');
		} else if (byte.length == 3) {
			$('.input-mark .mark i:eq(0), .input-mark .mark i:eq(1), .input-mark .mark i:eq(2)').addClass('on');
		} else if (byte.length == 4) {
			$('.input-mark .mark i:eq(0), .input-mark .mark i:eq(1), .input-mark .mark i:eq(2), .input-mark .mark i:eq(3)').addClass('on');
		} else if (byte.length == 5) {
			$('.input-mark .mark i:eq(0), .input-mark .mark i:eq(1), .input-mark .mark i:eq(2), .input-mark .mark i:eq(3), .input-mark .mark i:eq(4)').addClass('on');
		} else if (byte.length == 6) {
			$('.input-mark .mark i:eq(0), .input-mark .mark i:eq(1), .input-mark .mark i:eq(2), .input-mark .mark i:eq(3), .input-mark .mark i:eq(4), .input-mark .mark i:eq(5)').addClass('on');
		} else {
			$('.input-mark .mark i').removeClass();
		}
		// console.log(byte.length);
	});

	// IE9 이하 jquery.placeholder.js 적용
	$("input, textarea").placeholder();
});

// 바디 스크롤 제거/해제
var scrollHeight = 0;
function scrollOff(){
	scrollHeight = $(document).scrollTop();
	$("body").addClass("modal-open");
	$("#wrap").css("position", "fixed");
	$("#wrap").css("top", - scrollHeight);
}
function scrollOn(){
	$("body").removeClass("modal-open");
	$("#wrap").css("top", 0);
	$("#wrap").css("position", "relative");
    $(document).scrollTop(scrollHeight);
    console.log(scrollHeight);
}

// 레이어 팝업(모달)
function modalOpen(obj){
	var temp = $("#" + obj);
	temp.show();
	scrollOff(); // 바디 스크롤 제거

	// 위치
	var thisDialog = temp.children(".modal-dialog");
	var marginValue = thisDialog.outerHeight() / 2;
	$(thisDialog).css("margin-top", "-"+marginValue+"px");
}

// 레이어 팝업(모달) 닫기
function modalClose(){
	$('.modal').hide();
	scrollOn(); // 바디 스크롤 제거 해제
}

// 레이어 애니메이션 외
$(function(){
	// 약관 네비 슬라이드
	$(".modal-terms .nav").owlCarousel({
		items: 1,
		nav: true,
		dots: false,
		smartSpeed: 300
	});

	// 셀렉트 옵션 레이어 열기(통신사, 머니 충전 계좌, 이용내역 필터)
	$(".select-modal").click(function(){
		var selectId = $(this).attr("id");
		var optionLayer = "modal-" + selectId;
		var temp = $("#" + optionLayer);
		temp.show();
		temp.find(".modal-content").animate({bottom: 0}, 300);
		scrollOff(); // 바디 스크롤 제거

		// 셀렉트 옵션 선택, 레이어 닫기(텍스트 전달)
		$("#" + optionLayer).find(".btn-list .btn").click(function(){
			var thisOption = $(this).find("em").text();
			$("#" + selectId).text(thisOption);
		});
	});

	// 셀렉트 옵션 선택(통신사, 머니 충전 계좌, 이용내역 필터 등)
	$(".modal-slide .btn-list .btn").click(function(){
		$(this).parents(".btn-list").find(".btn").removeClass("on");
		$(this).addClass("on");
		$(this).parents(".modal").fadeOut();
		$(this).parents(".modal-content").animate({bottom: -450}, 300);
		scrollOn(); // 바디 스크롤 제거 해제
	});

	// 은행 선택 레이어 열기
	$(".bank-select").click(function(){
		$(".modal-banklist").show();
		$(".modal-banklist .modal-content").animate({bottom: 0}, 300);
		$("body").addClass("modal-open"); // 바디 스크롤 제거
	});

	// 은행 선택 레이어 닫기
	$(".modal-banklist button").click(function(){
		$(".modal-banklist .modal-content").animate({bottom: -450}, 300);
		$(".modal-banklist").fadeOut();
		$(".bank-list").scrollTop(0);
		$("body").removeClass("modal-open"); // 바디 스크롤 제거 해제

		// 은행 선택 버튼에 은행명 전달
		var bankCd = $(this).html();
		$('.bank-select').html(bankCd);
	});

	// 이중 모달 닫기
	$(".modal-banklist.depth2 button, .modal.depth2 .btn-list .btn").click(function(){
		$("body").addClass("modal-open"); // 바디 스크롤 제거
	});

	// 배너 슬라이드 (내통장관리 하단) -> 2020-03-09 추가
	$(".banner-slide").owlCarousel({
		items: 1,
		smartSpeed: 300,
		autoplay: true,
		loop: true,
	});
});

// 레이아웃, 토글
$(function(){
	// 짧은 화면 버튼 하단 고정
	function fixFootBtn(){
		var winHeight = $(window).innerHeight();
		var headerHeight = $("#header").innerHeight();
		var contentHeight = $("#content").innerHeight();
		if($('.fix-layer.top').length > 0) {
			headerHeight = $(".fix-layer.top").innerHeight();
		}
		var mainHeight = headerHeight + contentHeight;
		var gap = winHeight - mainHeight; 			// 콘텐츠가 짧은 경우
		
		var agreeList = $(".agree-list").length; 	// 약관 목록 있는 경우
		if(gap >= 0 && agreeList == 0) {
			$(".bottom-area").addClass("fixed");
		} else {
			$(".bottom-area").removeClass("fixed");
		}
	}
	fixFootBtn();

	// 하단 고정 영역 여백 확보
	function wrapPadding(){
		var fixFoot = $(".bottom-area.fixed");
		if(fixFoot.length > 0){
			var fixFootHeight = $(fixFoot).innerHeight();
			$("#content").css("padding-bottom", fixFootHeight);
		} else {
			$("#content").css("padding-bottom", 24);
		}
	}
	wrapPadding();

	// 하단 고정 영역 여백 확보 - 배너 영역 -> 2020-03-09 추가
	function wrapPaddingBtm(){
		var footBtm = $(".bottom-banner-area");
		var fixFootBtm = $(".bottom-banner-area.fixed");
		if(fixFootBtm.length > 0){
			var fixFootBtmHeight = $(fixFootBtm).innerHeight();
			$("#content").css("padding-bottom", fixFootBtmHeight);
		} else if(footBtm.length > 0){
			// $("#content").css("padding-bottom", 0);
		}
	}
	wrapPaddingBtm();

	// 보안 키패드 상단 링크 위치
	function keypadOffset(){
		if($(".kpd-wrap").length) {
			var keypadOffsetT = $(".kpd-wrap").offset().top-40; //40 = 상단 링크 높이 30 + 여백 10
			$(".link-keypad-top").css("top", keypadOffsetT);
		}
	}
	keypadOffset();

	// 리사이즈
	$(window).resize(function(){
		fixFootBtn();
		wrapPadding();
		wrapPaddingBtm(); // 2020-03-09 추가
		keypadOffset();
	});

	// popover
	$(".open-popover").click(function() {
		$(".open-popover").not(this).removeClass("active");
		$(this).toggleClass("active");
	});

	// 약관 펼치기/접기
	$(".agree-all .btn").click(function(){
		$(this).parents(".agree-all").find(".btn").toggleClass("hidden");
		$(this).parents(".agree-all").next(".agree-list").slideToggle(200);
	});

	// 결제 완료 내역 상세 펼치기/접기
	$(".pay-success .toggle-detail").click(function(){
		$(".pay-success .toggle-detail").toggleClass("hidden");
		$(".pay-success .detail").slideToggle(200);
	});

	// 계좌 관리 주거래 계좌 별
	$(".account-list li").eq(0).children(".btn-star").addClass("on"); //첫번째 버튼 활성
	$(".account-list .btn-star").click(function(){
		$(this).addClass("on");
		$(this).parent("li").siblings("li").children(".btn-star").removeClass("on");
	});
});

// 뒤로가기
// $(function(){
// 	$("#btnBack").click(function(){
// 		window.history.back();
// 	});
// });
