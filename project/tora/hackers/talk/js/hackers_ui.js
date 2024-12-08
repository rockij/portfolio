//common
$(function(){
	$(".tbl_type3 tr:first-child").addClass("first");
	$(".list_srch_class .cnt .row:first-child").addClass("first");
	$(".tbl_type13 tr:first-child").addClass("brt0");
	$(".tbl_type13 th:first-child").addClass("brl0");
});

//메인하단
$(function(){	
	$(".main_rank .btn_ctl").click(function(e){
		$(this).toggleClass("open");
		$(".more").toggle();
		e.preventDefault();
	});
});

//전체카테고리
$(function(){	
	$(".gnb .btn_cat").click(function(e){
		$('.catmenu').toggle();
		e.preventDefault();
	});
});

//빠른수강신청
$(function(){	
	$(".gnb_comm.btn_gnb2, .sub_spdcls").hover(
		function(){
			$(".sub_spdcls").show();
		}, function(){
			$(".sub_spdcls").hide();
		}
	);
	//왼쪽메뉴
	$(".sub_spdcls .menu li a").click(function(){
		$(".sub_spdcls .menu li a").removeClass();
		$(this).addClass("on");
	});
	//강의
	$(".sub_spdcls .menu a#btn_spdcls").click(function(){
		$("#bookmp3").hide();
		$("#spdcls").show();
	});
	//교재/mp3
	$(".sub_spdcls .menu a#btn_bookmp3").click(function(){
		$("#bookmp3").show();
		$("#spdcls").hide();
	});
});

//스타강사
$(function(){	
	$(".gnb_comm.btn_gnb4, .sub_starth").hover(
		function(){
			$(".sub_starth").show();
		}, function(){
			$(".sub_starth").hide();
		}
	);
});

//MP3/자료
$(function(){	
	$(".gnb_comm.btn_gnb5, .sub_mp3").hover(
		function(){
			$(".sub_mp3").show();
		}, function(){
			$(".sub_mp3").hide();
		}
	);
});

//무료강의
$(function(){	
	$(".gnb_comm.btn_gnb6, .sub_free").hover(
		function(){
			$(".sub_free").show();
		}, function(){
			$(".sub_free").hide();
		}
	);
});

//input체크이미지 전환
$(function(){
	$(".bg_inp_chk").click(function(){
		if ($(".bg_inp_chk").children("input").length) {
			$("label").each(function(){ 
				$(this).removeClass("on");
			});
			$("input:checked").each(function(){ 
				$(this).next("label").addClass("on");
			});
		}
	});
});

//가입입력 성별 체크 박스 색 전환
$(function(){
	$(".join_group .jender input").click(function(){
		if($(".join_group .jender").children("input").length){
			$("label").each(function(){ 
				$(this).removeClass("on");
			});
			$("input:checked").each(function(){ 
				$(this).next("label").addClass("on");
			});
		}
	});
});

//찾기 영역 확장
$(function(){	
	$(".srchbxctl").click(function() {
		var control = $(this).parent().parent().parent();
		control.toggleClass("hidden");
	});
});

//input label hide
$(function(){
	var i_text = $('.inp_box>label').next('.i_text');
	$('.inp_box>label').css('position','absolute');
		i_text
		.focus(function(){
			$(this).prev('label').css('visibility','hidden');
		})
	.blur(function(){
		if($(this).val() == ''){
			$(this).prev('label').css('visibility','visible');
		} else {
			$(this).prev('label').css('visibility','hidden');
		}
	})
	.change(function(){
		if($(this).val() == ''){
			$(this).prev('label').css('visibility','visible');
		} else {
			$(this).prev('label').css('visibility','hidden');
		}
	})
	.blur();
});

//셀렉트박스 선택시 텍스트 컬러 변경
$(function(){
	$(".sel, .select-row select").change(function() {
		if ($(this).val() == '') {
			$(this).removeClass('selected');
		} else {
			$(this).addClass('selected');
		}
	});
});

//수강신청
$(function(){
	//메뉴
	$(".gnb_comm.btn_gnb3, .sub_clsask").hover(
		function(){
			$(".sub_clsask").show();
		}, function(){
			$(".sub_clsask").hide();
		}
	);
	//강의 검색 결과 리스트 보기
	$(".list_srch_class .btn_bxctrl").click(function() {
		$(this).toggleClass("open");
		$(this).next(".list_srch_class .cnt").toggle();
		return false;
	});
	//수강신청 툴팁
	$(".list_srch_class .sbj .tip a.tiper").hover(function() {
		$(this).next(".ly_tip").show();
	}, function() {
		$(this).next(".ly_tip").hide();
	});
	//상세 상단 강좌이름 열림
	$(".list_class_nm a.btn_control").click(function() {
		$(this).parent().toggleClass("open");
		return false;
	});
	//상세 상단 할인가 보기
	$(".detail_top .btn_caution").hover(function() {
		$(this).parent().parent().parent().css("zIndex","10");
		$(this).next(".ly_tip").show();
	});	
	//상세 상단 할인가 닫기
	$(".detail_top .ly_tip a.cls").click(function() {
		$(this).parent().hide();
		return false;
	});
	//상세 구매bar
	$(".buybar .btn_control").click(function() {
		$(this).toggleClass("open");
		$(this).next(".form").toggleClass("open");
		return false;
	});
});

//마이클래스 프리패스 리스트
$(function(){	
	$(".freepass_bbs .btn_bxctrl").click(function() {
		$(this).toggleClass("open");
		$(this).next(".freepass_bbs .cnt").toggle();
		return false;
	});
});

//스타선생님 리스트 over
$(function(){
	$(".star_list li").hover(
		function(){
			$(this).find('.over').show();
		}, function(){
			$(this).find('.over').hide();
		}
	);
});

//family site
$(function(){
	$(".family_site_box .family_site_close_btn").click(function(){
		$("#wrap").animate({
			"padding-left":"0"
		},500)

		$(".family_site_box").animate({
			"margin-left":"-120px"
		},500,function(){
			$(".family_site_box").addClass("close");
		});
	});
	$(".family_site_open_btn").click(function(){
		$(".family_site_box").removeClass("close");

		$("#wrap").animate({
			"padding-left":"45px"
		},500);

		$(".family_site_box").animate({
			"margin-left":"0px"
		},500);
	});

	$(".family_list li strong a").click(function(){
		var li = $(this).parent().parent();
		
		if(li.hasClass("active") == 1){
			li.find(".family_site_sub").slideUp();
			li.removeClass("active");
		}else{
			$(".family_list > li").find(".family_site_sub").slideUp();
			$(".family_list > li").removeClass("active");

			li.addClass("active");
			li.find(".family_site_sub").slideDown();
		}
	});

	//Family Site 
	$(".js-show-area").mouseleave(function(){
		var btn = $(this).find(">.js-show-btn");
		var list = $(this).find(">.js-show-box");
		if(!btn.hasClass("on")){
			list.hide();
		}
	});

	//레이어 show
	$(".js-show-btn").mouseenter(function(){
		var btn = $(this);
		var list = $(this).parent().find(">.js-show-box");
		if( !$(this).hasClass("on")){
			list.show();
			btn.show();
		}else{
			list.hide();
			btn.hide();
		}
	});
});

//toggle set
$(function(){
	//toggle
	$('.btn_toggle').click(function(e){
		e.preventDefault();
		$(this).html(function(o,c){
			return ($('.btn_toggle_cont').is(':visible') ? '<span class="btn_tbl_type2">펼치기</span> ▼' : '<span class="btn_tbl_type2">접기</span> ▲');
		});
		$(this).parent().parent().parent().find('.btn_toggle_cont').toggle();
	});

	//toggle2
	$('.btn_toggle2').click(function(e){
		e.preventDefault();
		$(this).html(function(o,c){
			return ($('.btn_toggle2_cont').is(':visible') ? '<span class="btn_tbl_type2">정보열기</span> ▼' : '<span class="btn_tbl_type2">정보닫기</span> ▲');
		});
		$(this).parent().parent().next('.btn_toggle2_cont').toggle();
	});

	//toggle3
	$('.btn_toggle3').click(function(e){
		e.preventDefault();
		$(this).html(function(o,c){
			return ($('.btn_toggle3_cont').is(':visible') ? '<span class="btn_tbl_type1">지원기기 보기 ▼</span>' : '<span class="btn_tbl_type1">지원기기 닫기 ▲</span>');
		});
		$(this).parent().parent().next('.btn_toggle3_cont').toggle();
	});

	//toggle4
	$('.btn_toggle4').click(function(e){
		e.preventDefault();
		$(this).html(function(o,c){
			return ($('.btn_toggle4_cont').is(':visible') ? '<a href="#" class="btn_toggle6 fwb">사전평가 ▼</a>' : '<a href="#" class="btn_toggle6 fwb">사전평가 ▲</a>');
		});
		$(this).parent().parent().next('.btn_toggle4_cont').toggle();
	});

	//toggle5
	$('.btn_toggle5').click(function(e){
		e.preventDefault();
		$(this).html(function(o,c){
			return ($('.btn_toggle5_cont').is(':visible') ? '<a href="#" class="btn_toggle6 fwb">중간평가 ▼</a>' : '<a href="#" class="btn_toggle6 fwb">중간평가 ▲</a>');
		});
		$(this).parent().parent().next('.btn_toggle5_cont').toggle();
	});

	//toggle6
	$('.btn_toggle6').click(function(e){
		e.preventDefault();
		$(this).html(function(o,c){
			return ($('.btn_toggle6_cont').is(':visible') ? '<a href="#" class="btn_toggle6 fwb">최종평가 ▼</a>' : '<a href="#" class="btn_toggle6 fwb">최종평가 ▲</a>');
		});
		$(this).parent().parent().next('.btn_toggle6_cont').toggle();
	});
});

//Placeholder
$(function(){
	$('[placeholder]').focus(function() {
		var input = $(this);
		if (input.val() == input.attr('placeholder')) {
			input.val('');
			input.removeClass('placeholder');
		}
		}).blur(function() {
		var input = $(this);
		if (input.val() == '' || input.val() == input.attr('placeholder')) {
			input.addClass('placeholder');
			input.val(input.attr('placeholder'));
		}
	}).blur();
});

//Methods of Payment
$(function(){
	$('input[type=radio][name=MethodPay]').on('change', function(){
		switch($(this).val()){
			case 'creditcard' :
				$('#BankbookCont').hide();
				break;
			case 'bankbook' :
				$('#BankbookCont').show();
				break;
		}            
	});
});

//add file
$(function(){
	var fileTarget = $('.filebox .upload_hidden');
	fileTarget.on('change', function(){
		if(window.FileReader){
			var filename = $(this)[0].files[0].name;
		} else {
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}
		$(this).siblings('.upload_name').val(filename);
	});
});

//mp3 books hover
$(function(){
	$('.tooltip_btn').hover(
		function(){
			$(this).parent().css('z-index','10').parent().parent().css('z-index','10');
		}, function(){
			$(this).parent().removeAttr('style').parent().parent().removeAttr('style');
		}
	);
});

//수강신청 상세 강의소개 탭 fix
function detailTab(){
	$.tabScroll = function(obj, num) { //탭스크롤 실행 설정
		var posY = $("#" + obj);
		$("html, body").stop().animate({ 'scrollTop': posY.offset().top - num }, 750);
	}
	$(document).ready(function() {
		var screenHalf = $(window).height() / 2;
		var fixStap1 = $("#tab01").position().top - 60; //강의소개
		var fixStap2 = $("#tab02").position().top - 120; //선생님질문
		var fixStap3 = $("#tab03").position().top - 120; //수강후기
		var fixTap = $(".class_local_link");
		var fixTapLink = $(".class_local_link a");
		$(window).scroll(function(){
			var scrollTop = $(window).scrollTop();
			if(fixStap1 <= scrollTop && screenHalf){ //커리큘럼 시작
				fixTap.addClass("fix");
				fixTapLink.removeClass("active");
				$(".tab01").addClass("active");
			}else{
				fixTapLink.removeClass("active");
				fixTap.removeClass("fix");
			}
			if(fixStap2 <= scrollTop && screenHalf){ //선생님질문
				fixTapLink.removeClass("active");
				$(".tab02").addClass("active");
			}
			if(fixStap3 <= scrollTop && screenHalf){ //수강후기
				fixTapLink.removeClass("active");
				$(".tab03").addClass("active");
			}
		});
	});
	$("a.tab01").click(function() { //강의소개
		$.tabScroll("tab01",0);
		return false;
	});
	$("a.tab02").click(function() { //선생님질문
		$.tabScroll("tab02",70);
		return false;
	});
	$("a.tab03").click(function() { //수강후기
		$.tabScroll("tab03",70);
		return false;
	});
}

//모바일 수강 서비스 입체 슬라이드
function FigureMove(){
	var totalPanels			= $(".scrollContainer").children().size();
	var regWidth			= $(".panel").css("width");
	var regImgWidth		= $(".panel .inside img").css("width");
	var movingDistance	= 277;
	var curWidth			= 300;
	var curImgWidth		= 277; 
	var $panels				= $('#figureSlider .scrollContainer > div');
	var $container			= $('#figureSlider .scrollContainer');
	$panels.css({'float' : 'left','position' : 'relative'});
	$("#figureSlider").data("currentlyMoving", false);
	$container
		.css('width', ($panels[0].offsetWidth * $panels.length) + 1000 )
		.css('left', "-345px"); /* for middle image */
	var scroll = $('#figureSlider .scroll').css('overflow', 'hidden');

	function returnToNormal(element) {
		$(element)
			.animate({ width: regWidth })
			.css('z-index', '1')
			.find(".inside img")
			.animate({ width: regImgWidth })
			.css('margin-top', '120px')
			.end();
	};
	
	function growBigger(element) {
		$(element)
			.animate({ width: curWidth })
			.css('z-index', '10')
			.find(".inside img")
			.animate({ width: curImgWidth })
			.css('margin-top', '0px')
			.end();
	}
	
	//direction true = right, false = left
	function change(direction) {
	    //if not at the first or last panel
		if((direction && !(curPanel < totalPanels)) || (!direction && (curPanel <= 1))) { return false; }	
        //if not currently moving
        if (($("#figureSlider").data("currentlyMoving") == false)) {
			$("#figureSlider").data("currentlyMoving", true);
			var next         = direction ? curPanel + 1 : curPanel - 1;
			var leftValue    = $(".scrollContainer").css("left");
			var movement	 = direction ? parseFloat(leftValue, 10) - movingDistance : parseFloat(leftValue, 10) + movingDistance;
			$(".scrollContainer")
				.stop()
				.animate({
					"left": movement
				}, function() {
					$("#figureSlider").data("currentlyMoving", false);
				});
			returnToNormal("#panel_"+curPanel);
			growBigger("#panel_"+next);
			curPanel = next;
			//remove all previous bound functions
			$("#panel_"+(curPanel+1)).unbind();	
			//go forward
			$("#panel_"+(curPanel+1)).click(function(){ change(true); });
            //remove all previous bound functions															
			$("#panel_"+(curPanel-1)).unbind();
			//go back
			$("#panel_"+(curPanel-1)).click(function(){ change(false); }); 
			//remove all previous bound functions
			$("#panel_"+curPanel).unbind();
		}
	}
	
	// Set up "Current" panel and next and prev
	growBigger("#panel_3");	
	var curPanel = 3;
	
	$("#panel_"+(curPanel+1)).click(function(){ change(true); });
	$("#panel_"+(curPanel-1)).click(function(){ change(false); });
	
	//when the left/right arrows are clicked
	$(".right").click(function(){ change(true); });	
	$(".left").click(function(){ change(false); });

	$(window).keydown(function(event){
	  switch (event.keyCode) {
			case 13: //enter
				$(".right").click();
				break;
			case 32: //space
				$(".right").click();
				break;
			case 37: //left arrow
				$(".left").click();
				break;
			case 39: //right arrow
				$(".right").click();
				break;
			}
	});
}

// 쿠키 읽기
function BsJs_getCookie( name ){
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length ){
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie ){
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
			endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 ) break;
	}
	return "";
}
function BsJs_setCookie( name, value, expiredays ){
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}
function BsJs_setCookie_Time( name, value, expiretimes ){
	var todayDate = new Date();
	todayDate.setTime( todayDate.getTime() + expiretimes*60*60*1000 );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

//Layer Popup
function layer_open(obj){
	var temp = $('#'+obj);
	var bg = temp.parent().find(".bg").hasClass('bg');
	if(bg){
		temp.parent().fadeIn();
	}
	if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
	else temp.css('top', '0');
	if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
	else temp.css('left', '0');
	temp.find('a#LypopClose').click(function(e){
		if(bg){
			$('.lypop').fadeOut();
		}
		e.preventDefault();
	});
	temp.find('.lypop_close,.lypop_close2').click(function(e){
		if(bg){
			$('.lypop').fadeOut();
		}
		e.preventDefault();
	});
	$('.lypop .bg').click(function(e){
		$('.lypop').fadeOut();
		e.preventDefault();
	});
}

//footer best_seller
$(function(){
	$('.text_box_btn').click(function(e){
		var _this = $(this);
		if(_this.hasClass('open')){
			$(this).text('열기 ▼');
			$(this).removeClass('open');
		}else{
			$(this).text('닫기 ▲');
			$(this).addClass('open');
		}		
		$('.best_seller dd').toggle();
		e.preventDefault();
	});
});