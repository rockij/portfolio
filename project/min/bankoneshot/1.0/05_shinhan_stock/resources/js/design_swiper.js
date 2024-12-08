// 메인 > 해외주식배너
function mainGstock(){
	var swiper = new Swiper('#global_stock', {
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  swiper.on('slideChange', function () {
  	// console.log(swiper.realIndex);
  	if(swiper.realIndex == 1){
  		$(".swir_gstock_bg").removeClass("s1 s3").addClass("s2");
  	}else if(swiper.realIndex == 2){
  		$(".swir_gstock_bg").removeClass("s1 s2").addClass("s3");
  	}else{
  		$(".swir_gstock_bg").removeClass("s2 s3").addClass("s1");
  	}
  });
}

function boardSlide(){
  $(window).load(function(){
    var swiper = new Swiper('#board_slide', {
      autoHeight: true,
      pagination: {
        el: '.swiper-pagination',
      }
    });
  });
}