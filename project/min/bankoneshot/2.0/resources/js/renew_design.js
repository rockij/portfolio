$(document).ready(function () {
	// 모두 선택하기
	$.fn.allCheck = function () {
		var defaults = {
			all: '.allChk',
			child: '.ipChk'
		};
		var options = $.extend({}, defaults);
		var chkLength;
		
		$(this).each(function (index) {
			var thisObj = $(this);
			var $all = thisObj.find($(options.all));
			var $child = thisObj.find($(options.child));
			var size = $child.length; //chkbox 갯수

			$all.on('click', function (e) { // 전체동의 chkbox 체크여부
				if ($all.prop('checked')) {
					$child.prop({'checked': true});
					$child.addClass('wasChk');
					$('.ly_citation .btn_type8').addClass('on');
				} else {
					$child.removeClass('wasChk');
					$child.prop({'checked': false});
					$('.ly_citation .btn_type8').removeClass('on');
				}
				chkLength = $('.wasChk').length;
			});

			$child.on('click', function (e) { // 약관1개 chkbox 체크여부
				var target = e.target;
				setting(target);
			});

			function setting(t) { // 일반 chkbox 체크 했을때 체크된 갯수확인
				var $t = $(t);
				if($t.hasClass('wasChk')) {
					$t.removeClass('wasChk');
					$t.prop({'checked': false});
				} else {
					$t.prop({'checked': true});
					$t.addClass('wasChk');
				}
				chkLength = $('.wasChk').length;
				if (chkLength === 0) {
					$all.prop({'checked': false});
				}
				else if (chkLength >= size) {
					$all.prop({'checked': true});
					$('.btn_type8').addClass('on');
				}
				else {
					$all.prop({'checked': false});
					$('.btn_type8').removeClass('on');
				}
			}
		});
  	}
	$('.agreeList').allCheck();

	// footer 영역만큼 container padding-bottom
	containBtm();
	function containBtm() {
		if($('#footer .footWrap ul').hasClass('submitList')) {
			var footH = $('#footer').outerHeight();
			$('#container').css('padding-bottom', footH + 12);
		} else {
			return;
		}
	}
	
	var posHov = $('.chgPos');
	if(posHov.length > 0) { // header, footer position relative, 작은단말 대응
		var tHead = $('#header');
		var tFoot = $('#footer');
		var cont = $('#container');
		setTimeout(function() {
			calcH(tHead, tFoot, cont);
		},40);
	}

	/* 나의 투자현황 숫자 세기 */
	investChk();
	function investChk() {
		var invNum = document.querySelector('.investState .num');
		if(invNum != null) {
			var invSplit = invNum.innerHTML.split(',');
			if(invSplit.length > 3) {
				$('.investState .right').addClass('smaller');
			}
		} else {
			return;
		}
	}

	$('.chkFoot').on('focus', function() {// footer position change, 작은단말에서 입력 시 키보드 영역때문에 가림
		$('#footer').css('position','static');
	});
	$('.chkFoot').on('focusout', function() {// footer position change, 작은단말에서 입력 시 키보드 영역때문에 가림
		// $('#footer').css('position','fixed');
		if($('#wrap').hasClass('chgPos')) {
			$('#footer').css('position','relative');
		} else {
			$('#footer').css('position','fixed');
		}
	});

	function fixValue(v){
		var t = $(".fix.top").innerHeight(),
			b = $(".fix.btm").outerHeight(),
			w = $("#wrap");
		if($(".fix.top").length > 0) {
			w.css("padding-top", t);
		}
		if($(".fix.btm").length > 0){
			w.css("padding-bottom", b);
		}
		if($(".fix.btm").hasClass("goOut")){
			$(".goOut").css("bottom",-b);
		}
	}
	fixValue();
	
})
function deviceChk() { // 안드로이드 ios 확인
	var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
	// console.log('deviceChk', varUA);
	if (varUA.match('android') != null) {
		//안드로이드 일때 처리
		$('body').addClass('android');
	} else {
		$('html, body, #wrap').addClass('chgPos');
		var tHead = $('#header');
		var tFoot = $('#footer');
		var cont = $('#container');
		setTimeout(function () {
			calcH(tHead, tFoot, cont);
		}, 40);
	}
	// alert(document.querySelector('body').getAttribute('class'));
}
// 팝업 이벤트 on, off
function popupOn(popId) {
	$('html, body').addClass('noscroll');
	$('#'+ popId).show();
}
function popupOff(popId) {
	$('#'+ popId).hide();
	$('html, body').removeClass('noscroll')
}

// 은행 선택팝업 on, off
function bankOn(popId) { // 은행선택 팝업 활성화
	$('#' + popId).addClass('selectOn');
	$('.ipBox button.ipBox_ip').addClass('btnFocus');
	winodwOff(popId);
}
function winodwOff(popId) { // 은행선택 팝업 끄기
	$('#' + popId).on('click', function() {
		bankOff(popId);
	})
}
function bankOff(popId) { // 은행선택 팝업 끄기(x버튼)
	if(!$('.ipBox button.ipBox_ip').hasClass('chg')) {
		$('.ipBox button.ipBox_ip').removeClass('btnFocus');
	}
	$('#' + popId).removeClass('selectOn');
}
// 은행 선택하기
function bankSelect(name) { 
	var chgName = $('.ipBox .bankWrap');
	$(chgName).html(name);
	$('.ipBox button.ipBox_ip').addClass('chg');
}

//투자 swiper
function slideStock(name) { // sec1 메인해외주식
	var slide = new Swiper('.' + name, {
		// autoplay: {
		// 	delay: 5000,
		// 	disableOnInteraction: false,
		// },
		loop: true,
		pagination: {
		  el: '.swiper-pagination',
		},
	})
}
function slideBanner(name) { // sec2 메인배너
	var slide = new Swiper('.' + name, {
		pagination: {
		  el: '.swiper-pagination',
		},
	})
}
function swirHoriz(name) { //sec3 메인테마토픽, 상세관련 페이지
	var slide = new Swiper('.' + name, {
		slidesPerView: 'auto',
		centeredSlides: false,
		freeMode: true,
		grabCursor: true
	})
	slide.setGrabCursor(); // 커서모양
}
function swirVertical(name){ //sec4 메인투자인사이트
	var slide = new Swiper('.'+name, {
		direction: 'vertical',
		slidesPerView: 3,
		speed: 500,
		loop: true,
	  });
	  slide.on('slideChange', function() {
		  var useIndex = slide.realIndex + 1;
		  imgChg(useIndex);
	  })
}
function imgChg(index) { // 해외주식 메인 투자인사이트 슬라이드 바뀔때 이미지 바꾸기
	// console.log(index);
	$('.imgSlide .img').removeClass('now');
    $('.imgSlide .img' + index).addClass('now');
}
function slideRec(name) { // 해외주식 추천종목 슬라이드
	var slide = new Swiper('.'+ name, {
		autoplay: {
			delay: 2000,
			disableOnInteraction: false,
		},
		setWrapperSize: true,
		speed: 1000,
		loop: true,
		slidesPerView: 'auto',
		centeredSlides: true,
		autoHeight: true,
		pagination: {
				el: '.swiper-pagination',
				clickable: true,
		},
	})
}
function v4Slide(name) { // 효율화로 인한 메인 테마토픽, 투자인사이트 슬라이드
	var swiper = new Swiper('.'+name, {
		autoplay: {
			delay: 1500,
			disableOnInteraction: false
		},
		slidesPerView: 1,
		spaceBetween: 20,
		speed: 1000,
	  	loop: true
	})
}

function earnSlide(name) {
	var swiper = new Swiper('.' + name, {
		autoplay: {
			delay: 1500,
			disableOnInteraction: false
		},
		speed: 1000,
		loop: true,
		slidesPerView: 1,
		grabCursor: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})
}

// 채우기, 옮기기 버튼 활성화
function btnAct() {
	var footBtn = $('#footer .submitBtn');
	// console.log(footBtn)
	var inputVal = document.querySelector('.ipBox #cash.ipBox_ip').value;
	// console.log(inputVal);
	if(inputVal) { // 버튼 2개 있는 경우 때문에 footBtn[0]
		$(footBtn[0]).removeClass('sbType3');
		$(footBtn[0]).addClass('sbType2');
	} else {
		$(footBtn[0]).removeClass('sbType2');
		$(footBtn[0]).addClass('sbType3');
	}
	comma(inputVal);
}
// 채우기, 옮기기 천단위마다 콤마
function comma(number){
	// console.log(number);
	var string = "" + number;  // 문자로 바꾸기. 

	string = string.replace( /[^-+\.\d]/g, "" )  // ±기호와 소수점, 숫자들만 남기고 전부 지우기. 
	var regExp = /^([-+]?\d+)(\d{3})(\.\d+)?/;  // 필요한 정규식. 

	while ( regExp.test( string ) ) string = string.replace( regExp, "$1" + "," + "$2" + "$3" );  // 쉼표 삽입. 
	// console.log(number, string);
	$('.ipBox #cash.ipBox_ip').val(string)
}

// 계좌개설 말풍선 off
function ballOff(obj) {
	setTimeout(function() {
		$('.' + obj).fadeOut();
	}, 10000);
}
// 해외주식 메인 하단 fix 버튼
function footFix() {
	$(window).on('scroll', function() {
		var hTop = $(this).scrollTop();
		if(hTop > 1) {
			$('.footFix').addClass('on');
		} else {
			$('.footFix').removeClass('on');
		}
	})
}
// header, footer relative일때 container 높이값
function calcH(h, f, c) {
	console.log('calcH');
	var headHeight = h.outerHeight();
	var footHeight = f.outerHeight();
	var contHeight = $(window).innerHeight() - (headHeight + footHeight); 
	c.css('padding-bottom', 17);
	c.css('height', contHeight);	  
}

function allChkPop() { //약관동의 유도 팝업에서 전체동의 유도
	$('.allChk').prop('checked', true);
	$('.ipChk').prop('checked', true);
	$('.ipChk').addClass('wasChk');
}