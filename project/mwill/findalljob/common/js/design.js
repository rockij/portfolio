//Gnb
$(function () {
	$(document).ready(function(){
		var bodyClass = $("body").attr("class"); //body에 따른 클레스 반환

		var subMenuGroup = $(".gnb ul li." + bodyClass + " .submenu ul");
		var subMenuEach = $(".gnb ul li." + bodyClass + " .submenu ul li");
		var subMenuEachWidth = 90;
		var subViewCnt = subMenuEach.length;
		var prevBtnHtml = "<div class='prevBtn'><span class='bg_cm arrow'><span>이전</span></span></div>";
		var nextBtnHtml = "<div class='nextBtn'><span class='bg_cm arrow'><span>다음</span></span></div>";
		var subMenuLeft;

		function overAction() {
			subMenuLeft = parseInt(subMenuGroup.css("left").replace("px",""));

			if ($(window).width() - (subMenuEachWidth * subViewCnt) < subMenuLeft) {
				$(".gnb ul li." + bodyClass + " .submenuwrap").addClass("overRight");
				if ($(".gnb ul li." + bodyClass + " .submenu .nextBtn").length < 1) {	//nextBtn 존재 유무 체크 후 nextBtn 노출
					$(".gnb ul li." + bodyClass + " .submenuwrap").after(nextBtnHtml);
				}
				var subMenuLeftMod = subMenuLeft % subMenuEachWidth;
				if (Math.abs(subMenuLeftMod) >= subMenuEachWidth / 2) {
					subMenuLeft = subMenuLeft - (subMenuEachWidth + subMenuLeftMod);
				} else {
					subMenuLeft = subMenuLeft - subMenuLeftMod;
				}
				subMenuGroup.css("left", subMenuLeft + "px");
			} else if ($(window).width() - (subMenuEachWidth * subViewCnt) - 0 >= subMenuLeft) {
				subMenuGroup.css("left",$(window).width() - (subMenuEachWidth * subViewCnt) - 0 + "px");
				$(".gnb ul li." + bodyClass + " .submenuwrap").removeClass("overRight");
				$(".gnb ul li." + bodyClass + " .submenu .nextBtn").remove();
			}

			if (subMenuLeft < 0) {
				$(".gnb ul li." + bodyClass + " .submenuwrap").addClass("overLeft");
				if ($(".gnb ul li." + bodyClass + " .submenu .prevBtn").length < 1) {	//prevBtn 존재 유무 체크 후 prevBtn 노출
					$(".gnb ul li." + bodyClass + " .submenuwrap").before(prevBtnHtml);
				}
			} else if (subMenuLeft >= 0) {
				subMenuGroup.css("left","0");
				$(".gnb ul li." + bodyClass + " .submenuwrap").removeClass("overLeft");
				$(".gnb ul li." + bodyClass + " .submenu .prevBtn").remove();
			}
		}

		function subMenuJudge() {
			if (subViewCnt <= "4") {
				subMenuEach.css("width",100/subViewCnt + "%");
			} else {
				subMenuGroup.css("width",(subMenuEachWidth * subViewCnt) + "px");
				if (subMenuGroup.width() <= $(window).width()) {
					subMenuGroup.css("width","100%");
					subMenuEach.css("width",100/subViewCnt + "%");
					subMenuGroup.css("left","0");
				} else {
					subMenuEach.css("width",subMenuEachWidth + "px");
					$(".gnb ul li." + bodyClass + " .submenuwrap").addClass("overRight");
				}
				overAction();
			}

			//submenu 이전 버튼
			$("#Gnb").delegate(".submenu .prevBtn", "click", function(e) {
				subMenuLeft = parseInt(subMenuGroup.css("left").replace("px",""));
				subMenuGroup.css("left", (subMenuLeft + subMenuEachWidth) + "px");
				subMenuLeft = subMenuLeft + subMenuEachWidth;
				overAction();
			});
			//submenu 다음 버튼
			$("#Gnb").delegate(".submenu .nextBtn", "click", function(e) {
				subMenuLeft = parseInt(subMenuGroup.css("left").replace("px",""));
				subMenuGroup.css("left", (subMenuLeft - subMenuEachWidth) + "px");
				overAction();
			});

			//서브메뉴 스와이프
			var touchX = null;
			var touchY = null;

			$(".gnb .submenu ul").bind("touchstart",function(e){
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				touchX = touch.pageX;
				touchY = touch.pageY;

				subMenuLeft = parseInt(subMenuGroup.css("left").replace("px",""));

				if (subMenuLeft >= 0) {
					subMenuLeft = 0;
				} else if (subMenuLeft <= $(window).width() - (subMenuEachWidth * subViewCnt)) {
					subMenuLeft = $(window).width() - (subMenuEachWidth * subViewCnt);
				}

			}).bind("touchmove",function(e){
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				var chX = Math.abs(touchX - touch.pageX); //좌우로 움직인 거리
				var chY = Math.abs(touchY - touch.pageY); //상하로 움직인 거리
				var gapX = touch.pageX - touchX;

				if (chX > chY) {	//좌우로 움직이면 액션
					e.preventDefault();
					subMenuGroup.css("left", subMenuLeft + gapX);
				}

			}).bind("touchend",function(e){
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				var moveX = touch.pageX;
				var gapX = moveX - touchX;

				subMenuLeft = subMenuLeft + gapX;
				overAction();
			});
		}
		subMenuJudge();

		$(window).resize(function(){
			subMenuJudge();
		});

		if ($("body").hasClass("adup") || $("body").hasClass("job") || $("body").hasClass("alba") || $("body").hasClass("pro")) {
			var idx = $(".submenu li.selected").index();
			var clickcnt = parseInt(idx);
			for (var i = 0; i < clickcnt; i++) {
				$(".gnb ul li." + bodyClass + " .submenu .nextBtn").click();
			}
		}
	});
});

//글씨크게 변경
$(function(){
	$('.btn_txsize').on('click', function(){
		$('.bbsView2').toggleClass('big');
		if($('.bbsView2').hasClass('big')){
			$('.bbsView2 .btn_txsize b').text('작게');
			$('.bbsView2 .btn_txsize .imsc').removeClass('imsc_plus');
			$('.bbsView2 .btn_txsize .imsc').addClass('imsc_minus');
		}else{
			$('.bbsView2 .btn_txsize b').text('크게');
			$('.bbsView2 .btn_txsize .imsc').removeClass('imsc_minus');
			$('.bbsView2 .btn_txsize .imsc').addClass('imsc_plus');
		}
		return false;
	});
});

//검색 확장 영역
$(function(){
    var DistBt = $('.sort_fm .dist .bt_dist');   
    DistBt.on('click', function(e){
        var tg = $(this);
        tg.find('span').toggleClass('minus');
        tg.parent().next().toggle();
    });
});

//IScroll
function loaded() {
	//iScroll 개체 중복 출력으로 인한 에러 제거위해 추가
	var scrollCheck = $(".iScrollVerticalScrollbar.iScrollLoneScrollbar").html();
	if (scrollCheck != "" && scrollCheck != "undefined" ) {
		$('.iScrollVerticalScrollbar.iScrollLoneScrollbar').remove();
	}

    myScroll = new IScroll('.cho_wrap', {
        scrollbars: true,
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true
    });
}

//Layer Popup
function layer_open(obj) {
    var temp = $('#' + obj);
    var bg = temp.parent().parent().find(".bg").hasClass('bg');

    if(bg) {
        $('html, body').css('overflow-y','hidden');
        temp.parent().parent().show();
        temp.parent().css('overflow-y','auto');
    }

    temp.find('.ly_pop_cls').click(function(e){
        if(bg) {
            $('html, body, .ly_pop, .cont').removeAttr('style');
        }
        e.preventDefault();
    });

    temp.find('.bt_grey, .bt_grey2').click(function (e) {
        if(bg) {
            $('html, body, .ly_pop, .cont').removeAttr('style');
        }
        e.preventDefault();
    });
};

//라디오, 체크박스 이미지화
function setupLabel() {
    if ($(".label_check input").length) {
        $(".label_check").each(function(){
            $(this).removeClass("c_on");
            $(this).removeClass("c_dsb");
        });
        $(".label_check input:checked").each(function(){
            $(this).parent("label").addClass("c_on");
        });
        $(".label_check input:disabled").each(function(){
            $(this).parent("label").addClass("c_dsb");
        });
    };
    if ($(".label_radio input").length) {
            $(".label_radio").each(function(){
            $(this).removeClass("r_on");
        });
        $(".label_radio input:checked").each(function(){
            $(this).parent("label").addClass("r_on");
        });
        $(".label_radio input:disabled").each(function(){
            $(this).parent("label").addClass("r_dsb");
        });
    };
};

function setupLabel2(vObj) {
    if ($(vObj).is(":checked")) {
        $(vObj).prop("checked", true);
        $($(vObj).parent("label")).addClass("c_on");
    }
    else {
        $($(vObj)).removeAttr("checked");
        $($(vObj).parent("label")).removeClass("c_on");
    }
};

function setupLabelTouch() {
    $(".label_check input").bind("click", function(){
        setupLabel2($(this));
    });
    $(".label_check input").bind("click", function(){
        setupLabel();
    });
    $(".label_radio input").bind("click", function(){
        setupLabel2($(this));
    });
    $(".label_radio input").bind("click", function(){
        setupLabel();
    });
    setupLabel();
};

$(function(){
    setupLabelTouch();
});

//인재정보 - 자기소개서 더보기
$(function(){
    var LetterBt = $('.dt_cont .bt_letter');
   
    LetterBt.on('click', function(e){
        var tg = $(this);
        tg.prev().animate({height: $('.letter').get(0).scrollHeight}, 1000);
    });
});

//검색하기 Layer
$(function(){
    var SearchBt = $('.search_bt');
    var SearchCont = $('#Search');
    var SearchFilm = $('#Search .bg');
    var SearchClose = $('#Search .close_bt');

    SearchBt.on('click', function(e){
        var tg = $(this);
        SearchFilm.fadeIn();
        SearchCont.stop().animate({ right:0 }).show();
        $('html, body').css('overflow','hidden');
    });

    SearchFilm.on('click', function(e){
        var tg = $(this);
        SearchFilm.fadeOut();
        SearchCont.stop().animate({ right:-320 });
        setTimeout(function(){ SearchCont.hide() }, 500);
        $('html, body').removeAttr('style');
    });

    SearchClose.on('click', function(e){
        var tg = $(this);
        SearchFilm.fadeOut();
        SearchCont.stop().animate({ right:-320 });
        setTimeout(function(){ SearchCont.hide() }, 500);
        $('html, body').removeAttr('style');
    });
});

//메뉴 Layer
$(function(){
	var Width = $('#Menu').width();
    var MenuBt = $('.menu_bt');
    var MenuCont = $('#Menu');
    var MenuFilm = $('#Menu .bg');
    var MenuClose = $('#Menu .close_bt');		
	var MenuWelcome = $('#slide_welcome .touchSliderCnt > ul > li');
	var MenuWelcomeHeight = $('#slide_welcome').height();
	var MenuTop = $('.menu .cont .tit').height();
	var MenuListMgTop = MenuWelcomeHeight+MenuTop;

    MenuBt.on('click', function(e){
        var tg = $(this);
        MenuFilm.fadeIn();
        MenuCont.stop().animate({ left:0 }).show();
        $('html, body').css('overflow','hidden');
    });

    MenuFilm.on('click', function(e){
        var tg = $(this);
        MenuFilm.fadeOut();
        MenuCont.stop().animate({ left:-351 });
        setTimeout(function(){ MenuCont.hide() }, 500);
        $('html, body').removeAttr('style');
    });

    MenuClose.on('click', function(e){
        var tg = $(this);
        MenuFilm.fadeOut();
        MenuCont.stop().animate({ left:-351 });
        setTimeout(function(){ MenuCont.hide() }, 500);
        $('html, body').removeAttr('style');
    });

	MenuWelcome.css('width',''+Width+'px');
	$('.menu .cont .list').css('paddingTop',''+MenuListMgTop+'px');
});

//구인정보 > 브랜드별 슬라이드
$(function(){
    $(".pgaSt").find(".tx_num").text(1);
    $("#pg_platinumPlus").find(".tx_count").text($("#slide_platinumPlus > ul > li").length);
    $("#pg_platinum").find(".tx_count").text($("#slide_platinum > ul > li").length);
    $("#pg_specialPlus").find(".tx_count").text($("#slide_specialPlus > ul > li").length);
    $("#pg_special").find(".tx_count").text($("#slide_special > ul > li").length);
    $("#pg_brandRm").find(".tx_count").text($("#slide_brandRm > ul > li").length);
});

//배경 스크롤 보이게
function bodyScrollShow(){
	$('html, body').removeAttr('style');
}


//textarea에 포커스시 텍스트 컬러 변경
$(function(){
	var adupCnt = $('textarea');
	adupCnt.on('focus', function(e){
		$(this).css('color','#333');
	});
	adupCnt.on('blur', function(e){
		$(this).css('color','#999');
	});
});

//셀렉트박스 선택시 텍스트 컬러 변경
$(function(){
	$("select").change(function() {
		if ($(this).val() == '') {
			$(this).removeClass('selected');
		} else {
			$(this).addClass('selected');
		}
	});
});

//입력항목 협의안내 스위치
$(function(){
	var BtAtive = $(".bt_active");
	BtAtive.on('click', function(e){
		$(this).toggleClass('on');
	});
});

//근무지역 주소 입력 추가
$(function(){
	var BtaddArea = $(".addArea .bt_grey2.plus");	
	var BtaddAreaDel = $(".addArea .bt_grey2.del");	
	var addAreaSec = $(".addArea .addSec");
	BtaddArea.on('click', function(e){
		var Count = $("#hidaddArea").val();
		if(Count <= 3){
			switch (Count){
			case "2" :
				$("#addArea1 .bt_grey2.del").css("zIndex","9");
				break;
			case "3" :
				$("#addArea2 .bt_grey2.del").css("zIndex","9");
				break;
			}
			$("#hidaddArea").val(parseInt($("#hidaddArea").val()) + 1);
			$("#addArea"+Count).css("display","block");
		} else {
			alert("주소 설정은 3개까지 가능합니다");
			return;
		}
	});
	BtaddAreaDel.on('click', function(e){		
		var Count = "" + (parseInt($("#hidaddArea").val()) - 1);
		switch(Count){
		case "2" :
			$("#addArea1 .bt_grey2.del").css("zIndex","0");
			break;
		case "3" :
			$("#addArea2 .bt_grey2.del").css("zIndex","0");
			break;
		}
		$("#addArea" + Count).css("display", "none");
		$("#hidaddArea").val(parseInt($("#hidaddArea").val()) - 1);
	});
});

//공고등록 > 항목입력
$(function(){
	var BtSptl = $(".areaList a");
	var BtSptlCtl = $(".areaList-ctl");
	BtSptl.on('click', function(e){
		$(this).toggleClass("selected");
		e.preventDefault();
	});
	BtSptlCtl.on('click', function(e){
		$(this).toggleClass("selected");
		$(this).next(".areaList").toggle();
	});
});