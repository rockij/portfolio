$(function(){

	var curLnb = false;
	var isMove = false;
	var rollNum = 0;
	var rollMax;
	var playStop =false;

	//default
	rollMax = $(".main_sequence .scene").size()-1;

	//자동 슬라이딩
	var iInterval = 5; //초 설정
	var iInterval = iInterval * 1000;	//초단위로 맞춰줌

	function setTimer(){
		i = setInterval(function(){
				$(".main_sequence .contBt").eq(1).trigger("click");
			}, iInterval);
		 return i;
	}

	function stopSlider() {
		clearInterval(IntID);
	}

	var IntID = setTimer();

	if ($.browser.msie  && parseInt($.browser.version) === 8) {

		$(".main_sequence").addClass("ie8");

		//좌우 롤링 click
		$(".main_sequence .contBt").each(function(q){
			$(this).click(function(){
				if(!isMove){
					isMove = false;
					if(q == 1){	// >
						$(".main_sequence .scene").eq(rollNum).stop().animate({left : '-100%'}, 450, "easeOutCubic");
						rollNum ++;
						if(rollNum > rollMax) rollNum = 0;
						$(".main_sequence .scene").eq(rollNum).stop().animate({left : '100%'}, 0, "easeOutCubic");
						$(".main_sequence .scene").eq(rollNum).stop().animate({left : 0}, 450, "easeOutCubic", function(){
							isMove = false;
						});
					}else if(q == 0){	// <
						$(".main_sequence .scene").eq(rollNum).stop().animate({left : '100%'}, 450, "easeOutCubic");
						rollNum --;
						if(rollNum < 0) rollNum = rollMax;
						$(".main_sequence .scene").eq(rollNum).stop().animate({left : '-100%'}, 0, "easeOutCubic");
						$(".main_sequence .scene").eq(rollNum).stop().animate({left : 0}, 450, "easeOutCubic", function(){
							isMove = false;
						});
					}
				}
			})
		});

		//좌우 롤링 hover
		$(".main_sequence .contBt").hover(function(){
			stopSlider();
		}, function(){
			stopSlider();
			if(!playStop) IntID = setTimer();
			isMove = false;
		});

	}else{
		
		//start
		$(".main_sequence .scene.one .tit").animate({opacity : 0, left : 20}, 0);
		$(".main_sequence .scene.one .img1").animate({opacity : 0, top : 560}, 0);
		$(".main_sequence .scene.one .img2").animate({opacity : 0, right : 'auto', left : 536}, 0);
		$(".main_sequence .scene.one .img3").animate({opacity : 0, right : 'auto', left : 340}, 0);
		$(".main_sequence .scene.one .txt1").animate({opacity : 0, left : 602}, 0);
		$(".main_sequence .scene.one .txt2").animate({opacity : 0, right : 604}, 0);
		$(".main_sequence .scene.one .txt3").animate({opacity : 0, top : 297}, 0);
		$(".main_sequence .scene.one .txt4").animate({opacity : 0, top: 400}, 0);
		$(".main_sequence .scene.one .btn").animate({opacity : 0}, 0);

		$(".main_sequence .scene.one .tit").stop().delay(200).animate({opacity : 1, left : 0}, 550, "easeOutCubic");
		$(".main_sequence .scene.one .img1").stop().delay(50).animate({opacity : 1, top : 64}, 550, "easeOutCubic");
		$(".main_sequence .scene.one .img2").stop().delay(350).animate({opacity : 1, right : 'auto', left : 556}, 850, "easeInOutElastic");
		$(".main_sequence .scene.one .img3").stop().delay(550).animate({opacity : 1, right : 'auto', left : 320}, 850, "easeInOutElastic");
		$(".main_sequence .scene.one .txt1").stop().delay(950).animate({opacity : 1, left : 612}, 350, "easeOutCubic");
		$(".main_sequence .scene.one .txt2").stop().delay(1150).animate({opacity : 1, right : 614}, 350, "easeOutCubic");
		$(".main_sequence .scene.one .txt3").stop().delay(1350).animate({opacity : 1, top : 277}, 550, "easeOutCubic");
		$(".main_sequence .scene.one .txt4").stop().delay(1550).animate({opacity : 1, top : 380}, 550, "easeOutCubic");
		$(".main_sequence .scene.one .btn").stop().delay(1750).animate({opacity : 1}, 750);

		$.sliderEleClose = function(){
			$(".main_sequence .scene.one .tit").stop(true, true).animate({opacity : 0, left : 20}, 0);
			$(".main_sequence .scene.one .img1").stop(true, true).animate({opacity : 0, top : 560}, 0);
			$(".main_sequence .scene.one .img2").stop(true, true).animate({opacity : 0, right : 'auto', left : 536}, 0);
			$(".main_sequence .scene.one .img3").stop(true, true).animate({opacity : 0, right : 'auto', left : 340}, 0);
			$(".main_sequence .scene.one .txt1").stop(true, true).animate({opacity : 0, left : 602}, 0);
			$(".main_sequence .scene.one .txt2").stop(true, true).animate({opacity : 0, right : 604}, 0);
			$(".main_sequence .scene.one .txt3").stop(true, true).animate({opacity : 0, top : 297}, 0);
			$(".main_sequence .scene.one .txt4").stop(true, true).animate({opacity : 0, top: 400}, 0);
			$(".main_sequence .scene.one .btn").stop(true, true).animate({opacity : 0}, 0);

			//scene2
			$(".main_sequence .scene.two .tit").stop(true, true).animate({opacity : 0, left : 60}, 0);
			$(".main_sequence .scene.two .img1").stop(true, true).animate({opacity : 0, top : 160}, 0);
			$(".main_sequence .scene.two .img2").stop(true, true).animate({opacity : 0, top : -160}, 0);
			$(".main_sequence .scene.two .shw").stop(true, true).animate({opacity : 0}, 0);
			$(".main_sequence .scene.two .light").stop(true, true).animate({opacity : 0, width : 0}, 0);
			$(".main_sequence .scene.two .box").stop(true, true).animate({opacity : 0, left : 57}, 0);
			$(".main_sequence .scene.two .icon").stop(true, true).animate({opacity : 0, right : 'auto', left : 31}, 0);
			$(".main_sequence .scene.two .txt").stop(true, true).animate({opacity : 0, right : 'auto', left : 61}, 0);

			//scene3
			$(".main_sequence .scene.three .img1").stop(true, true).animate({opacity : 0, top : 108}, 0);
			$(".main_sequence .scene.three .light").stop(true, true).animate({opacity : 0}, 0);
			$(".main_sequence .scene.three .txt").stop(true, true).animate({opacity : 0, left : 'auto', right : 306}, 0);
			$(".main_sequence .scene.three .tit").stop(true, true).animate({opacity : 0, left : 20}, 0);
		}

		$.sliderEleOpen = function(){
			$(".main_sequence .scene.one .tit").stop().delay(200).animate({opacity : 1, left : 0}, 550, "easeOutCubic");
			$(".main_sequence .scene.one .img1").stop().delay(50).animate({opacity : 1, top : 64}, 550, "easeOutCubic");
			$(".main_sequence .scene.one .img2").stop().delay(350).animate({opacity : 1, right : 'auto', left : 556}, 850, "easeInOutElastic");
			$(".main_sequence .scene.one .img3").stop().delay(550).animate({opacity : 1, right : 'auto', left : 320}, 850, "easeInOutElastic");
			$(".main_sequence .scene.one .txt1").stop().delay(950).animate({opacity : 1, left : 612}, 350, "easeOutCubic");
			$(".main_sequence .scene.one .txt2").stop().delay(1150).animate({opacity : 1, right : 614}, 350, "easeOutCubic");
			$(".main_sequence .scene.one .txt3").stop().delay(1350).animate({opacity : 1, top : 277}, 550, "easeOutCubic");
			$(".main_sequence .scene.one .txt4").stop().delay(1550).animate({opacity : 1, top : 380}, 550, "easeOutCubic");
			$(".main_sequence .scene.one .btn").stop().delay(1750).animate({opacity : 1}, 750);
			
			//scene2
			$(".main_sequence .scene.two .tit").stop().delay(650).animate({opacity : 1, left : 0}, 550, "easeOutExpo");
			$(".main_sequence .scene.two .img1").stop().delay(50).animate({opacity : 1, top : 140}, 550, "easeOutCubic");
			$(".main_sequence .scene.two .img2").stop().delay(250).animate({opacity : 1, top : 295}, 550, "easeOutBounce");
			$(".main_sequence .scene.two .shw").stop().delay(350).animate({opacity : 1}, 350);
			$(".main_sequence .scene.two .light").stop().delay(250).animate({opacity : 1, width : 502}, 250, "easeOutCubic");
			$(".main_sequence .scene.two .box").stop().delay(550).animate({opacity : 1, left : 37}, 350, "easeOutCubic");
			$(".main_sequence .scene.two .icon").stop().delay(650).animate({opacity : 1, right : 'auto', left : 11}, 850, "easeInOutElastic");
			$(".main_sequence .scene.two .txt").stop().delay(650).animate({opacity : 1, right : 'auto', left : 81}, 850, "easeInOutElastic");

			//scene3
			$(".main_sequence .scene.three .img1").stop().delay(50).animate({opacity : 1, top : 85}, 550, "easeOutCubic");
			$(".main_sequence .scene.three .light").stop().delay(150).animate({opacity : 1}, 850, "easeOutExpo");		
			$(".main_sequence .scene.three .tit").stop().delay(250).animate({opacity : 1, left : 0}, 850, "easeOutCubic");		
			$(".main_sequence .scene.three .txt").stop().delay(450).animate({opacity : 1, left : 'auto', right : 326}, 850, "easeInOutElastic");		
		}

		//좌우 롤링 click
		$(".main_sequence .contBt").each(function(q){
			$(this).click(function(){
				if(!isMove){
					isMove = false;
					if(q == 1){	// >
						$(".main_sequence .scene").eq(rollNum).stop().animate({left : '-100%'}, 450, "easeOutCubic");					
						$.sliderEleClose();
						rollNum ++;
						if(rollNum > rollMax) rollNum = 0;
						$(".main_sequence .scene").eq(rollNum).stop().animate({left : '100%'}, 0, "easeOutCubic");
						$(".main_sequence .scene").eq(rollNum).stop().animate({left : 0}, 150, "easeOutCubic", function(){
							$.sliderEleOpen();
							isMove = false;
						});
					}else if(q == 0){	// <
						$(".main_sequence .scene").eq(rollNum).stop().animate({left : '100%'}, 450, "easeOutCubic");
						$.sliderEleClose();
						rollNum --;
						if(rollNum < 0) rollNum = rollMax;
						$(".main_sequence .scene").eq(rollNum).stop().animate({left : '-100%'}, 0, "easeOutCubic");
						$(".main_sequence .scene").eq(rollNum).stop().animate({left : 0}, 150, "easeOutCubic", function(){
							$.sliderEleOpen();
							isMove = false;
						});							
					}
				}
			})
		});

		//좌우 롤링 hover
		$(".main_sequence .contBt").hover(function(){
			stopSlider();
		}, function(){
			stopSlider();
			if(!playStop) IntID = setTimer();
			isMove = false;
		});
	}

}); 