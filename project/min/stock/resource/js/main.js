$(function(){
	$.motionReset = function(){ //처음으로 재설정
		$('.scene.one .bg').stop(true, true).animate({ opacity:0 }, 0);
		$('.scene.one .title').stop(true, true).animate({ top:-30, opacity:0 }, 0);
		$('.scene.one .text').stop(true, true).animate({ top:130, opacity:0 }, 0);
		$('.scene.one .btn').stop(true, true).animate({ top:230, opacity:0 }, 0);
		$('.scene.two .bg').stop(true, true).animate({ opacity:0 }, 0);
		$('.scene.two .title').stop(true, true).animate({ top:-30, opacity:0 }, 0);
		$('.scene.two .text').stop(true, true).animate({ top:130, opacity:0 }, 0);
		$('.scene.two .btn').stop(true, true).animate({ top:230, opacity:0 }, 0);
		$('.scene.three .bg').stop(true, true).animate({ opacity:0 }, 0);
		$('.scene.three .logo').stop(true, true).animate({ opacity:0 }, 0);
		$('.scene.three .title').stop(true, true).animate({ top:-30, opacity:0 }, 0);
		$('.scene.three .text').stop(true, true).animate({ top:130, opacity:0 }, 0);
		$('.scene.three .btn').stop(true, true).animate({ top:230, opacity:0 }, 0);
	},
	$.section1_mov = function(){
		//scene1
		$('.scene.one .bg').stop().delay(0).animate({ opacity:1 }, 550, 'easeOutCubic');
		$('.scene.one .title').stop().delay(300).animate({ top:0, opacity:1 }, 1500, 'easeOutExpo');
		$('.scene.one .text').stop().delay(650).animate({ top:160, opacity:1 }, 1500, 'easeOutExpo');
		$('.scene.one .btn').stop().delay(950).animate({ top:260, opacity:1 }, 1500, 'easeOutExpo');
		//scene2
		$('.scene.two .bg').stop().delay(0).animate({ opacity:1 }, 550, 'easeOutCubic');
		$('.scene.two .title').stop().delay(300).animate({ top:0, opacity:1 }, 1500, 'easeOutExpo');
		$('.scene.two .text').stop().delay(350).animate({ top:160, opacity:1 }, 1500, 'easeOutExpo');
		$('.scene.two .btn').stop().delay(950).animate({ top:260, opacity:1 }, 1500, 'easeOutExpo');
		//interpark		
		$('.scene.three .bg').stop().delay(0).animate({ opacity:1 }, 550, 'easeOutCubic');
		$('.scene.three .logo').stop().delay(0).animate({ top:0, opacity:1 }, 550, 'easeOutCubic');
		$('.scene.three .text2').stop().delay(350).animate({ top:42, opacity:1 }, 1000, 'easeOutExpo');
		$('.scene.three .title').stop().delay(500).animate({ top:86, opacity:1 }, 1500, 'easeOutExpo');
		$('.scene.three .text').stop().delay(750).animate({ top:162, opacity:1 }, 1500, 'easeOutExpo');		
		$('.scene.three .coupon').stop().delay(1350).animate({ left:540, opacity:1 }, 1500, 'easeOutElastic');
		$('.scene.three .caution_list').stop().delay(1750).animate({ top:300, opacity:1 }, 750, 'easeOutExpo');
	},
	$.section2_mov = function(){	
		$('.about_section .logo').stop().delay(550).animate({ opacity:1, top:-244 }, 550, 'easeOutCubic');
		$('.about_section h2').stop().delay(850).animate({ opacity:1, top:-191 }, 550, 'easeOutCubic');
		$('.about_section .point .p1').stop().delay(1250).animate({ opacity:1, top:0 }, 850, 'easeInOutBack');
		$('.about_section .point .p2').stop().delay(1250).animate({ opacity:1, top:0 }, 850, 'easeInOutBack');
		$('.about_section .point .p3').stop().delay(1250).animate({ opacity:1, top:0 }, 850, 'easeInOutBack');
	},
	$.section3_mov = function(){
		$('.epilogue .e1').stop().delay(150).animate({ opacity:1, left:0 }, 550, 'easeOutBack');
		$('.epilogue .e2').stop().delay(150).animate({ opacity:1, right:0 }, 550, 'easeOutBack');
		$('.epilogue .e3').stop().delay(550).animate({ opacity:1, left:0 }, 550, 'easeOutBack');
		$('.epilogue .e4').stop().delay(550).animate({ opacity:1, right:0 }, 550, 'easeOutBack');
		$('.epilogue .title').stop().delay(1250).animate({ opacity:1, top:246 }, 750, 'easeOutExpo');
	},
	//카운트 설정
	$.counter = function(){
		$('.counter').each(function() {
			var $this = $(this),
			countTo = $this.attr('data-count');
			$({ countNum: $this.text()}).animate({
				countNum: countTo
			},{
				duration: 2000,
				easing:'linear',
				step: function() {
					$this.text(Math.floor(this.countNum));
				}, complete: function() {
					$this.text(this.countNum);
				}
		  }); 
		});	
	},
	$.initialization = function() {
		var isMove = false;
		var rollNum = 0;
		var rollMax;
		var playStop = false;
		var iInterval = 7000;//timer
		function setTimer(){
			/*i = setInterval(function(){
					$("#section1 .contBt").eq(1).trigger("click");
				}, iInterval);
			 return i;*/
		}
		IntID = setTimer();
		rollMax = $("#section1 .scene").size()-1;
		$.stopSlider = function(){
			clearInterval(IntID);
		}
		if ($.browser.msie  && parseInt($.browser.version) == 8 || window.navigator.userAgent.indexOf('Trident/4.0') >= 0) {
			$('#fullpage').fullpage({
				autoScrolling: false
			});
			$("#section1 .paging .contNum").each(function(w){
				$(this).click(function(){
					if(!isMove){
						isMove = true;
						if(rollNum != w) {
							if(rollNum < w){
								$("#section1 .paging .contNum").removeClass("on");
								$("#section1 .scene").eq(rollNum).stop().animate({left : '-100%'}, 0, "easeOutCubic");
								rollNum = w;
								$("#section1 .paging .contNum").eq(rollNum).addClass("on");
								$("#section1 .scene").eq(rollNum).stop().animate({left : '100%'}, 0, "easeOutCubic");
								$("#section1 .scene").eq(rollNum).stop().animate({left : 0}, 0, "easeOutCubic", function(){
									isMove = false;
								});							
							}
							else if(rollNum > w){
								$("#section1 .paging .contNum").removeClass("on");
								$("#section1 .scene").eq(rollNum).stop().animate({left : '100%'}, 0, "easeOutCubic");
								rollNum = w;
								$("#section1 .paging .contNum").eq(rollNum).addClass("on");
								$("#section1 .scene").eq(rollNum).stop().animate({left : '-100%'}, 0, "easeOutCubic");
								$("#section1 .scene").eq(rollNum).stop().animate({left : 0}, 0, "easeOutCubic", function(){
									isMove = false;
								});
							}
						}
					}
				});
			});
		}else{
			$('#fullpage').fullpage({
				loopTop: false,
				loopBottom: false,
				scrollOverflow: true,
				scrollOverflowOptions: {
					scrollbars: true,
					mouseWheel: true,
					hideScrollbars: false,
					fadeScrollbars: false,
					disableMouse: true
				},
				'afterLoad': function(anchorLink, index){
					if(index == 1){
						//page
						$("#section1 .paging .contNum").each(function(w){
							$(this).click(function(){
								if(!isMove){
									isMove = true;
									if(rollNum != w) {
										if(rollNum < w){
											$("#section1 .paging .contNum").removeClass("on");
											$("#section1 .scene").eq(rollNum).stop().animate({left : '-100%'}, 0, "easeOutCubic");
											$.motionReset();
											rollNum = w;
											$("#section1 .paging .contNum").eq(rollNum).addClass("on");
											$("#section1 .scene").eq(rollNum).stop().animate({left : '100%'}, 0, "easeOutCubic");
											$("#section1 .scene").eq(rollNum).stop().animate({left : 0}, 150, "easeOutCubic", function(){
												$.section1_mov();
												isMove = false;
											});							
										}
										else if(rollNum > w){
											$("#section1 .paging .contNum").removeClass("on");
											$("#section1 .scene").eq(rollNum).stop().animate({left : '100%'}, 0, "easeOutCubic");
											$.motionReset();
											rollNum = w;
											$("#section1 .paging .contNum").eq(rollNum).addClass("on");
											$("#section1 .scene").eq(rollNum).stop().animate({left : '-100%'}, 0, "easeOutCubic");
											$("#section1 .scene").eq(rollNum).stop().animate({left : 0}, 150, "easeOutCubic", function(){
												$.section1_mov();
												isMove = false;
											});
										}

									}
								}
							}).hover(function(){
									$.stopSlider();
								}, function(){
									$.stopSlider();
									if(!playStop) IntID = setTimer();
									isMove = false;
							})
						});
						//prev&next
						$("#section1 .contBt").each(function(q){
							$(this).click(function(){
								if(!isMove){
									isMove = false;
									if(q == 1){	// >
										$("#section1 .paging .contNum").removeClass("on");
										$("#section1 .scene").eq(rollNum).stop().animate({left : '-100%'}, 450, "easeOutCubic");					
										$.motionReset();
										rollNum ++;
										if(rollNum > rollMax) rollNum = 0;
										$("#section1 .paging .contNum").eq(rollNum).addClass("on");
										$("#section1 .scene").eq(rollNum).stop().animate({left : '100%'}, 0, "easeOutCubic");
										$("#section1 .scene").eq(rollNum).stop().animate({left : 0}, 150, "easeOutCubic", function(){
											$.section1_mov();
											isMove = false;
										});
									}else if(q == 0){	// <
										$("#section1 .paging .contNum").removeClass("on");
										$("#section1 .scene").eq(rollNum).stop().animate({left : '100%'}, 450, "easeOutCubic");
										$.motionReset();
										rollNum --;
										if(rollNum < 0) rollNum = rollMax;
										$("#section1 .paging .contNum").eq(rollNum).addClass("on");
										$("#section1 .scene").eq(rollNum).stop().animate({left : '-100%'}, 0, "easeOutCubic");
										$("#section1 .scene").eq(rollNum).stop().animate({left : 0}, 150, "easeOutCubic", function(){
											$.section1_mov();
											isMove = false;
										});							
									}
								}
							})
						});
						//hover
						$("#section1 .contBt").hover(function(){
							$.stopSlider();
						}, function(){
							$.stopSlider();
							if(!playStop) IntID = setTimer();
							isMove = false;
						});
					}
					if(index == 2){
						$.stopSlider();
						$("#section1 .paging .contNum").eq(0).trigger("click");
						$('#section2 .title').delay(100).animate({ top:50, opacity:1 }, 1500, 'easeOutExpo');
					}
				},
				'onLeave': function(index, nextIndex, direction){
					if (index == 1 && direction == 'down'){
						$.section2_mov();
					}else if (index == 2 && direction == 'down'){
						$.counter();
						$.section3_mov();
						$('.scroll_seq').fadeOut();
					}else if (index == 3 && direction == 'up'){
						$('.scroll_seq').fadeIn();
					}
				}
			});
		}
		var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		if(height > 781){
			$('#section1').addClass('norSrcoll');
		}else{
			$('#section1').removeClass('norSrcoll');
		}
	}
	$(document).ready(function(){
		$.section1_mov();
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if(width > 1023){
			$.initialization();
		}		
	});
	$(window).resize(function(){
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;		
		var addEvent = window.attachEvent || window.addEventListener;
		if(width < 1023){
			if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
				$.initialization();
				$.fn.fullpage.setAutoScrolling(false);
				$.fn.fullpage.destroy('all');
			}
		}else{
			$.initialization();
			if ($.browser.msie  && parseInt($.browser.version) == 8 || window.navigator.userAgent.indexOf('Trident/4.0') >= 0) {
				$.fn.fullpage.setAutoScrolling(false);
			}else{
				$.fn.fullpage.setAutoScrolling(true);
			}
		}		
	});
	//top
	var $top = $('.btn_top');
	var body = $('html, body');
	$top.on('click', function(e){
		if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
			$.fn.fullpage.moveTo(1);
			setTimeout(function(){
				$.section1_mov();
			}, 550);
		}
		body.stop().animate({ 'scrollTop': body.offset().top }, 550);
		$('#section3 .fp-scroller').css('transform','translate(0, 0) translateZ(0)');
		e.preventDefault();
	});
	//이용자현황 카운트
	if ($.browser.msie  && parseInt($.browser.version) == 8 || window.navigator.userAgent.indexOf('Trident/4.0') >= 0) {
		$('.counter').each(function() {
			var $this = $(this),
			countTo = $this.attr('data-count');
			$({ countNum: $this.text()}).animate({
				countNum: countTo
			},{
				duration: 0,
				easing:'linear',
				step: function() {
					$this.text(Math.floor(this.countNum));
				}, complete: function() {
					$this.text(this.countNum);
				}
		  }); 
		});	
	}else{
		$(window).scroll(function(){
			var start = $('#section3').offset().top - 300;
			if ($(document).scrollTop() > start){
				$.counter();
			}
		});
	}	
	//scroll info
	var sgBottom = function () {
		$('.scrollinfo > img').animate({
			'margin-top' : 20
		}, 800, function () {
			sgTop();
		});
	};	
	var sgTop = function () {
		$('.scrollinfo > img').animate({
			'margin-top' : 0
		}, 800, function () {
			sgBottom();
		});
	} 
	sgBottom();
});