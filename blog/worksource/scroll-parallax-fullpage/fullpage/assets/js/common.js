
$(function(){
	var transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend',
			FullSlide;
	
	FullSlide ={
		idx : 0,
		isAnimation : false,
		isPlay : false,
		play : null,
		init : function(){
			FullSlide.set();
			FullSlide.evtBinding();
			FullSlide.indicator();
			FullSlide.scroll();
		},
		set : function(){ // 변수세팅
			FullSlide.$slide = $("#fullpage .f_slide");
			FullSlide.$length = FullSlide.$slide.length;
			FullSlide.$next = $("#fullpage .btn_arrow .next");
			FullSlide.$prev = $("#fullpage .btn_arrow .prev");
			FullSlide.$play = $("#fullpage .btn_play .play");
			FullSlide.$stop = $("#fullpage .btn_play .stop");
			FullSlide.$indx = 0;
		},
		evtBinding : function(){
			$(FullSlide.$next).on('click', FullSlide.next);
			$(FullSlide.$prev).on('click', FullSlide.prev);
			$(FullSlide.$play).on('click', FullSlide.auto);
			$(FullSlide.$stop).on('click', FullSlide.stop);
			FullSlide.$slide.on(transitionEnd, FullSlide.check);
		},
		next : function(){ // 다음버튼
			if (FullSlide.isAnimation == false && FullSlide.idx < FullSlide.$length - 1) {
				FullSlide.idx++;
				FullSlide.nextMov();
			} else if (FullSlide.isAnimation == false && FullSlide.idx == FullSlide.$length - 1){
				FullSlide.lastSlide();
			}
		},
		prev : function(){ // 이전버튼
			if (FullSlide.isAnimation == false && FullSlide.idx > 0) {
				FullSlide.idx--;
				FullSlide.prevMov();
			}	else if (FullSlide.isAnimation == false && FullSlide.idx == 0){
				FullSlide.firstSlide();
			}
		},
		indicator : function(){ // 인디케이터 생성 및 클릭이벤트
			for (var i = 1; i < FullSlide.$length+1; i++){
				$('.indicator').append('<button class="btn_indi">'+ i +'</button>');
			}
			
			$(".indicator .btn_indi").eq(0).addClass('active');
			
			$(".indicator .btn_indi").on('click', function(){
				if (FullSlide.isAnimation == false) {			
					FullSlide.$indx = $(".indicator .btn_indi.active").index();
					FullSlide.idx = $(this).index();
					FullSlide.class();
					console.log((FullSlide.$indx+1)+"에서" + (FullSlide.idx+1)+"로");
					if (FullSlide.$indx < FullSlide.idx) {
						FullSlide.nextZump();
					} else {
						FullSlide.prevZump();
					}
				}
			});
		},
		scroll : function(){ // 스크롤액션
			FullSlide.$slide.on('DOMMouseScroll mousewheel', function (e) {
					if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
						if(FullSlide.isAnimation == false && FullSlide.idx < FullSlide.$length - 1) {
							FullSlide.idx++;
							FullSlide.nextMov();
						} else if (FullSlide.isAnimation == false && FullSlide.idx == FullSlide.$length - 1){
							FullSlide.lastSlide();
						}
					} else if (FullSlide.isAnimation == false && FullSlide.idx == 0){
							FullSlide.firstSlide();
					} else {
						if(FullSlide.isAnimation == false && FullSlide.idx > 0) {
							FullSlide.idx--;
							FullSlide.prevMov();
						}
					}
				console.log("슬라이드" + (FullSlide.idx+1))
			});
		},
		nextMov : function(){ // 다음슬라이드로
			FullSlide.isAnimation = true;
			FullSlide.class();
			FullSlide.$slide.eq(FullSlide.idx).css("top",0);
			FullSlide.$slide.eq(FullSlide.idx-1).css("top",'-100%');
			console.log("슬라이드" + (FullSlide.idx+1))
		},
		prevMov : function(){ // 이전슬라이드로
			FullSlide.isAnimation = true;
			FullSlide.class();
			FullSlide.$slide.eq(FullSlide.idx).css("top",0);
			FullSlide.$slide.eq(FullSlide.idx+1).css("top",'-100%');
			console.log("슬라이드" + (FullSlide.idx+1))
		},
		nextZump : function(){
			FullSlide.$slide.eq(FullSlide.$indx).nextUntil(FullSlide.$slide.eq(FullSlide.idx)).css("top",'100%');
			FullSlide.$slide.eq(FullSlide.$indx).css("top",'-100%');
			FullSlide.$slide.eq(FullSlide.idx).css("top",0);
			FullSlide.isAnimation = true;
			FullSlide.$indx = FullSlide.idx;			
		},
		prevZump : function(){
			FullSlide.$slide.eq(FullSlide.$indx).prevUntil(FullSlide.$slide.eq(FullSlide.idx)).css("top",'100%');
			FullSlide.$slide.eq(FullSlide.idx).css("top",0);
			FullSlide.$slide.eq(FullSlide.$indx).css("top",'-100%');
			FullSlide.isAnimation = true;
			FullSlide.$indx = FullSlide.idx;			
		},
		firstSlide : function(){
			console.log("처음")
			FullSlide.idx = FullSlide.$length - 1;
			FullSlide.$slide.eq(0).addClass('active');
			FullSlide.$slide.eq(0).css("top",'-100%');
			FullSlide.prevMov();
		},
		lastSlide : function(){
			console.log("끝")
			FullSlide.idx = 0;
			FullSlide.nextMov();
		},
		class : function(){ // 클래스 추가
			FullSlide.$slide.eq(FullSlide.idx).addClass('active');
			FullSlide.$slide.on(transitionEnd, function() {
				FullSlide.$slide.eq(FullSlide.idx).siblings().removeClass('active');
				FullSlide.$slide.eq(FullSlide.idx).siblings().css("top","100%");
			});
			$(".indicator .btn_indi").eq(FullSlide.idx).addClass('active');
			$(".indicator .btn_indi").eq(FullSlide.idx).siblings().removeClass('active');
		},
		check : function(){ // 애니메이션 중인지 체크
			FullSlide.isAnimation = false;
		},
		auto : function(){
			if(FullSlide.isPlay == false){
				FullSlide.play = setInterval(function() {
					FullSlide.next();
				}, 3000);
				FullSlide.isPlay = true;
			}
		},
		stop : function() {
			clearInterval(FullSlide.play);
			FullSlide.isPlay = false;
		}
	};
	FullSlide.init();
})