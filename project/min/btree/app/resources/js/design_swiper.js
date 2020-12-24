// 팝업 슬라이드
function lypopSlide() {
	var swiper = new Swiper('.lyPop .popSlide', {
		pagination: {
			el: '.swiper-pagination',
		},
	})
}

// 메인 홈 > 제일 상단 배너
function mainBigbn(){
	var swiper = new Swiper('#bigbn', {
    pagination: {
      el: '.swiper-pagination',
	},
  });
}

// 메인 홈 > 추천게임
function mainRcmgame(){
	var swiper = new Swiper('#rcmgame', {
		slidesPerView: 'auto',
		centeredSlides: false,
		freeMode: true,
		grabCursor: true
  });
}

// faq
function faqTab(){
	$(window).load(function(){
		//if($("#faqTab li").length > 4){
			$("#faqTab li").removeClass("active");
			var swiper = new Swiper('#faqTab', {
		    slidesPerView: 'auto',
		    centeredSlides: false,
		    freeMode: false,
		    grabCursor: true,
		    // loop: true,
		    slideToClickedSlide: true,
		    simulateTouch: true
		  });
		//}
		$("#faqTab button").on("click", function(){
			var $name = $(this).attr("data-role");
			$("#faqTab li").removeClass("active");
			$(this).parent().addClass("active");
			$("#ct.faq section").hide();
			$("#ct.faq #"+$name).show();
		});
		$("#faqTab li:first-child").addClass("active");
	});
}

// 게임 메인 홈 > 제일 상단 카드배너
function aniNext(alpha){
	setTimeout(function(){ $( ".aninext i:first-child" ).animate({ "opacity": alpha }, 100 ); }, 100);
	setTimeout(function(){ $( ".aninext i:nth-child(2)" ).animate({ "opacity": alpha }, 100 ); }, 200);
	setTimeout(function(){ $( ".aninext i:nth-child(3)" ).animate({ "opacity": alpha }, 100 ); }, 300);
}
function gmainCard(){
	// play >>> animation set
//  setInterval(function(){
//  	setTimeout(function(){ aniNext(1) }, 0);
//  	setTimeout(function(){ aniNext(0) }, 300);
//	}, 600);
	var swiper = new Swiper('#cardBn', {
		effect: 'coverflow',
		initialSlide: 0,
		grabCursor: true,
		centeredSlides: true,
		slideToClickedSlide: false,
		loop: false,
		slidesPerView: 'auto',
		spaceBetween: 25,
		init: false,
		coverflow: {
			rotate: 0,
			stretch: 0,
			depth: 500,
			modifier: 1,
			slideShadows : false
		},
		 pagination: {
      el: '.swiper-pagination',
    }
  });
  swiper.on('init', function () {
  	$(".swir_cardbn .bg img").addClass("on");
  });
  swiper.init();
  swiper.on('slideChange', function () {
		//var $imgSrc = $(".swir_cardbn .swiper-slide[data-swiper-slide-index="+swiper.realIndex+"] img.blind").attr("src");
		var $imgSrc = $('.swiper-wrapper .swiper-slide').eq(swiper.realIndex).find('img.blind').attr("src");
		// $(".swir_cardbn .bg img").removeClass("on");
		$(".swir_cardbn .bg img:first").clone().appendTo($(".swir_cardbn .bg"));
		$(".swir_cardbn .bg img:last").attr("src", $imgSrc);
		$(".swir_cardbn .bg img:last").removeClass("on");
		setTimeout(function(){
			$(".swir_cardbn .bg img:last").addClass("on");
			$(".swir_cardbn .bg img:first").remove();
		}, 350);
	});
}