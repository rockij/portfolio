// main visual
$(function(){	
	var curLnb = false;
	var isMove = false;
	var rollNum = 0;
	var rollMax;
	var playStop = false;	
	rollMax = $("#mainSlide .swiper-slide").size()-1; //default
	//자동 슬라이딩
	var iInterval = 3; //초 설정
	var iInterval = iInterval * 1000; //초단위로 맞춰줌
	function setTimer(){
		// i = setInterval(function(){
		// 		$("#mainSlide .contBt").eq(1).trigger("click");
		// 	}, iInterval);
		//  return i;
	}
	function stopSlider() {
		clearInterval(IntID);
	}
	var IntID = setTimer();
	$("#mainSlide .swiper-slide").hide().css('left','-100%');
	$("#mainSlide .swiper-slide:eq(0)").show().css('left','0');
	setTimeout(function(){ $("#mainSlide .swiper-slide").show(); }, 100);
	$("#mainSlide .ie-page .contNum").each(function(w){		
		$(this).click(function(){
			if(!isMove){
				isMove = true;
				if(rollNum != w) {
					if(rollNum < w){
						$("#mainSlide .ie-page .contNum").removeClass("on");
						$("#mainSlide .swiper-slide").eq(rollNum).stop().animate({left : '-100%'}, 450, "easeOutCubic");
						rollNum = w;
						$("#mainSlide .ie-page .contNum").eq(rollNum).addClass("on");
						$("#mainSlide .swiper-slide").eq(rollNum).stop().animate({left : '100%'}, 0, "easeOutCubic");
						$("#mainSlide .swiper-slide").eq(rollNum).stop().animate({left : 0}, 150, "easeOutCubic", function(){
							isMove = false;
						});							
					}else if(rollNum > w){
						$("#mainSlide .ie-page .contNum").removeClass("on");
						$("#mainSlide .swiper-slide").eq(rollNum).stop().animate({left : '100%'}, 450, "easeOutCubic");
						rollNum = w;
						$("#mainSlide .ie-page .contNum").eq(rollNum).addClass("on");
						$("#mainSlide .swiper-slide").eq(rollNum).stop().animate({left : '-100%'}, 0, "easeOutCubic");
						$("#mainSlide .swiper-slide").eq(rollNum).stop().animate({left : 0}, 150, "easeOutCubic", function(){
							isMove = false;
						});
					}
				}
			}
		}).hover(function(){
				stopSlider();
			}, function(){
				stopSlider();
				if(!playStop) IntID = setTimer();
				isMove = false;
		})
	});

	//prev&next
	$("#mainSlide .contBt").each(function(q){
		$(this).click(function(){
			if(!isMove){
				isMove = false;
				if(q == 1){	// >
					$("#mainSlide .ie-page .contNum").removeClass("on");
					$("#mainSlide .swiper-slide").eq(rollNum).stop().animate({left : '-100%'}, 450, "easeOutCubic");
					rollNum ++;
					if(rollNum > rollMax) rollNum = 0;
					$("#mainSlide .ie-page .contNum").eq(rollNum).addClass("on");
					$("#mainSlide .swiper-slide").eq(rollNum).stop().animate({left : '100%'}, 0, "easeOutCubic");
					$("#mainSlide .swiper-slide").eq(rollNum).stop().animate({left : 0}, 450, "easeOutCubic", function(){
						isMove = false;
					});
				}else if(q == 0){	// <
					$("#mainSlide .ie-page .contNum").removeClass("on");
					$("#mainSlide .swiper-slide").eq(rollNum).stop().animate({left : '100%'}, 450, "easeOutCubic");
					rollNum --;
					if(rollNum < 0) rollNum = rollMax;
					$("#mainSlide .ie-page .contNum").eq(rollNum).addClass("on");
					$("#mainSlide .swiper-slide").eq(rollNum).stop().animate({left : '-100%'}, 0, "easeOutCubic");
					$("#mainSlide .swiper-slide").eq(rollNum).stop().animate({left : 0}, 450, "easeOutCubic", function(){
						isMove = false;
					});
				}
			}
		})
	});
});

// main service
$(function(){
	var curLnb = false;
	var isMove = false;
	var rollNum = 0;
	var rollMax;
	var playStop = false;	
	rollMax = $("#mainSrv .swiper-slide").size()-1; //default
	//자동 슬라이딩
	var iInterval = 5; //초 설정
	var iInterval = iInterval * 1000; //초단위로 맞춰줌
	function setTimer(){
		i = setInterval(function(){
				$("#mainSrv .contBt").eq(1).trigger("click");
			}, iInterval);
		 return i;
	}
	function stopSlider() {
		clearInterval(IntID);
	}
	var IntID = setTimer();
	$("#mainSrv .swiper-slide").hide().css('left','-100%');
	$("#mainSrv .swiper-slide:eq(0)").show().css('left','0');
	setTimeout(function(){ $("#mainSrv .swiper-slide").show(); }, 100);
	$("#mainSrv .ie-page .contNum").each(function(w){
		$(this).click(function(){
			if(!isMove){
				isMove = true;
				if(rollNum != w) {
					if(rollNum < w){
						$("#mainSrv .ie-page .contNum").removeClass("on");
						$("#mainSrv .swiper-slide").eq(rollNum).stop().animate({left : '-100%'}, 450, "easeOutCubic");
						rollNum = w;
						$("#mainSrv .ie-page .contNum").eq(rollNum).addClass("on");
						$("#mainSrv .swiper-slide").eq(rollNum).stop().animate({left : '100%'}, 0, "easeOutCubic");
						$("#mainSrv .swiper-slide").eq(rollNum).stop().animate({left : 0}, 150, "easeOutCubic", function(){
							isMove = false;
						});							
					}
					else if(rollNum > w){
						$("#mainSrv .ie-page .contNum").removeClass("on");
						$("#mainSrv .swiper-slide").eq(rollNum).stop().animate({left : '100%'}, 450, "easeOutCubic");
						rollNum = w;
						$("#mainSrv .ie-page .contNum").eq(rollNum).addClass("on");
						$("#mainSrv .swiper-slide").eq(rollNum).stop().animate({left : '-100%'}, 0, "easeOutCubic");
						$("#mainSrv .swiper-slide").eq(rollNum).stop().animate({left : 0}, 150, "easeOutCubic", function(){
							isMove = false;
						});
					}
				}
			}
		}).hover(function(){
				stopSlider();
			}, function(){
				stopSlider();
				if(!playStop) IntID = setTimer();
				isMove = false;
		})
	});

	//prev&next
	$("#mainSrv .contBt").each(function(q){
		$(this).click(function(){
			if(!isMove){
				isMove = false;
				if(q == 1){	// >
					$("#mainSrv .ie-page .contNum").removeClass("on");
					$("#mainSrv .swiper-slide").eq(rollNum).stop().animate({left : '-100%'}, 450, "easeOutCubic");
					rollNum ++;
					if(rollNum > rollMax) rollNum = 0;
					$("#mainSrv .ie-page .contNum").eq(rollNum).addClass("on");
					$("#mainSrv .swiper-slide").eq(rollNum).stop().animate({left : '100%'}, 0, "easeOutCubic");
					$("#mainSrv .swiper-slide").eq(rollNum).stop().animate({left : 0}, 450, "easeOutCubic", function(){
						isMove = false;
					});
				}else if(q == 0){	// <
					$("#mainSrv .ie-page .contNum").removeClass("on");
					$("#mainSrv .swiper-slide").eq(rollNum).stop().animate({left : '100%'}, 450, "easeOutCubic");
					rollNum --;
					if(rollNum < 0) rollNum = rollMax;
					$("#mainSrv .ie-page .contNum").eq(rollNum).addClass("on");
					$("#mainSrv .swiper-slide").eq(rollNum).stop().animate({left : '-100%'}, 0, "easeOutCubic");
					$("#mainSrv .swiper-slide").eq(rollNum).stop().animate({left : 0}, 450, "easeOutCubic", function(){
						isMove = false;
					});
				}
			}
		})
	});
});