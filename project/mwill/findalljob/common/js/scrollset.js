$(function(){

	//터치슬라이드
	window.onload = function () { //테마영역
		sliderMC = $("#slide_platinumPlus").touchSlider({ //플래티넘 플러스
			roll : ($("#slide_platinumPlus > ul > li").length > 1),
			flexible : true,
			btn_prev : $("#pg_platinumPlus").find(".btPrev"),
			btn_next : $("#pg_platinumPlus").find(".btNext"),
			counter : function (e) {
				$("#pg_platinumPlus").find(".tx_num").text(e.current);
			}
		});
		sliderMC = $("#slide_theme").touchSlider({
			roll : ($("#slide_theme > ul > li").length > 1),
			flexible : true,
			paging : $("#pg_theme .area").children(".num"),
			speed: 700,
			counter : function (e) {
				$("#pg_theme .area").children(".num").removeClass("on").eq(e.current-1).addClass("on");
			}
		});
		sliderMC = $("#slide_platinum").touchSlider({ //플래티넘
			roll : ($("#slide_platinum > ul > li").length > 1),
			flexible : true,
			btn_prev : $("#pg_platinum").find(".btPrev"),
			btn_next : $("#pg_platinum").find(".btNext"),
			counter : function (e) {
				$("#pg_platinum").find(".tx_num").text(e.current);
			}
		});
		sliderMC = $("#slide_specialPlus").touchSlider({ //스페셜 플러스
			roll : ($("#slide_specialPlus > ul > li").length > 1),
			flexible : true,
			btn_prev : $("#pg_specialPlus").find(".btPrev"),
			btn_next : $("#pg_specialPlus").find(".btNext"),
			counter : function (e) {
				$("#pg_specialPlus").find(".tx_num").text(e.current);
			}
		});
		sliderMC = $("#slide_special").touchSlider({ //스페셜
			roll : ($("#slide_special > ul > li").length > 1),
			flexible : true,
			btn_prev : $("#pg_special").find(".btPrev"),
			btn_next : $("#pg_special").find(".btNext"),
			counter : function (e) {
				$("#pg_special").find(".tx_num").text(e.current);
			}
		});
		sliderMC = $("#slide_brandRm").touchSlider({ //브랜드채용관
			roll : ($("#slide_brandRm > ul > li").length > 1),
			flexible : true,
			btn_prev : $("#pg_brandRm").find(".btPrev"),
			btn_next : $("#pg_brandRm").find(".btNext"),
			counter : function (e) {
				$("#pg_brandRm").find(".tx_num").text(e.current);
			}
		});
		sliderMC = $("#slide_welcome .touchSliderCnt").touchSlider({ //기업회원 로그인 > 왼쪽메뉴 > 웰컴영역
			roll : ($("#slide_welcome > ul > li").length > 1),
			flexible : false
		});
	}

});