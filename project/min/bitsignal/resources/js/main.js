// fullpage
function fullpageSet(){
	var $width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if($(window).height() <= 860){
		$("#section4 .ui_align_center").css("height", 900);
	}else{
		$("#section4 .ui_align_center").css("height", $(window).height());
	}
	$("#fullpage").fullpage({
		// verticalCentered: false,
		autoScrolling: true,
		fitToSection: false,
		navigation: true,
		scrollOverflow: true,
		onLeave: function(index,slideIndex,nextIndex,direction){
			// console.log(slideIndex);
			$(".section").removeClass("active, play");
			$(".head_main, #fp-nav").removeClass("chg");
			$(".head_main").removeClass("chg2");
			if(slideIndex == 1){
				$("#section1").addClass("play");
				$(".head_main, #fp-nav").removeClass("chg");
			}else if(slideIndex == 2){
				$(".head_main, #fp-nav").addClass("chg");
			}else if(slideIndex == 4){
				$(".head_main").addClass("chg2");
			}
		},
		afterRender: function(){
			$("#section1").addClass("play");
			$(".ly_loading").hide();
			$(".section").css("display","table");
			$.fn.fullpage.reBuild();
			// $.fn.fullpage.silentMoveTo(4);
		},
	});
	if($width <= 768){
		$(".head_main").removeClass("chg2");
		$("#section4 .ui_align_center").removeAttr("style");
		$.fn.fullpage.setAutoScrolling(false);
		$.fn.fullpage.destroy('all');
	}else{
		$("#wrap").css("padding-top","0");
		setTimeout(function(){
			$("#section4 .swiper-wrapper, #section4 .elm").removeAttr("style");
		}, 100);
	}
};
$(function(){
	var $width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	$(window).load(function(){
		if($width >= 768){ $("#wrap").css("padding-top","0") }
	});
	fullpageSet();
	$(window).resize(function(){
		if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
			fullpageSet();
		}
	});
	// top
	$(".btn_top").on("click", function(){
		$.fn.fullpage.moveTo(1);
	});
});

// 뒤 스크를 안되게
function fullpageStop(){
	$.fn.fullpage.setMouseWheelScrolling(false);
}
function fullpagePlay(){
	$.fn.fullpage.setMouseWheelScrolling(true);
}