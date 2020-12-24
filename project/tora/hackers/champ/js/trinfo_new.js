

var	firstClass = 'header', // classname of the first element in your page content
	fullSlideContainer = 'full', // full page elements container for 
	singleSlideClass = '.js_trinfo', // class for each individual slide
	//nextElement : 'div', // set the first element in the first page series.
	//previousClass : null, // null when starting at the top. Will be updated based on current postion
	lastClass = 'footer' // last block to scroll to
	//slideNumbersContainer: 'slide-numbers', // ID of Slide Numbers
	//bodyContainer: 'pageWrapper', // ID of content container
	//scrollMode: 'featuredScroll', // Choose scroll mode
	//useSlideNumbers: false, // Enable or disable slider
	//slideNumbersBorderColor: '#fff', // outside color for slide numbers
	//slideNumbersColor: '#000', // interior color when slide numbers inactive
	//animationType: 'slow' // animation type: currently doesn't do anything

$.fn.scrollTo = function(el) {
	$("body,html").clearQueue().stop(true, true).animate({scrollTop: $(el).offset().top,easing:"slow"});
}

/*if (element !== last) {
$("body,html").stop(true, true).animate({scrollTop: $(element).offset().top,easing: settings.animationType});
} else {
$("body,html").stop(true, true).animate({scrollTop: $(document).outerHeight() - windowHeight,easing: settings.animationType});
}*/

$.fn.window_h = function(el){
	$(el).each(function() {
		if($(window).outerHeight() > 690){
			$(this).css('height', $(window).outerHeight() + 50);
			$(this).outerHeight($(window).outerHeight() + 50);
			$(this).removeClass("active");
		}else{
			$(this).css('height', 690);
			$(this).addClass("active");
		}
	});
}

$(document).ready(function(){
	//tab 
	$(".js-tab-type1 li a").click(function(){ 
		if($(this).attr("target") != "_blank"){
			var $li = $(this).parent(); 
			var $div = $(this).parent().parent().parent(); 
			var nm = $li.parent().find("li").index($li); 
			$li.siblings("li").removeClass("on"); 
			$li.addClass("on"); 

			$("> .js-tab-type1-con",$div).hide(); 
			$("> .js-tab-type1-con",$div).eq(nm).show(); 
			//return false; 
		}
	});

	$(".trinfo_roll").slidesjs({
		start: 1,
		height: 504,
		play: {
			active: false,
			effect: "slide",			 
			interval: 5000,
			auto: true,
			swap: true,
			pauseOnHover: false,
			restartDelay: 1
		}, 
		effect: {
			slide: {
			  speed: 500
			},
			fade: {
			  speed: 1,
			  crossfade: true
			}
	  },navigation: {
			active: true,
			effect: "slide"
		}		
	});

	$(".trinfo_roll2").slidesjs({
		start: 1,
		height: 504,
		play: {
			active: false,
			effect: "slide",			 
			interval: 5500,
			auto: true,
			swap: true,
			pauseOnHover: false,
			restartDelay: 1
		}, 
		effect: {
			slide: {
			  speed: 500
			},
			fade: {
			  speed: 1,
			  crossfade: true
			}
	  },navigation: {
			active: true,
			effect: "slide"
		}		
	});
	//navi
	$('.btn_navi').click(function () {
		if($('.navi_menu_area').css("display") == "none"){
			$('.navi_menu_area').show(); //.slideDown(500);
		} else {
			$('.navi_menu_area').hide();
		}
	});

	$('.btn_close').click(function () {
		if($('.navi_menu_area').css("display") == "block"){
			$('.navi_menu_area').hide();
		} else {
			$('.navi_menu_area').show();
		}
	});
	
	
	//navi fixed
	var nav = $('.nav');
	var navTop = nav.offset().top;
	$(window).scroll(function () {
		var winTop = $(this).scrollTop();
		//alert(winTop);
		if (winTop >= 859) {
			nav.addClass('fixed')
			nav.removeClass('absoluted');
		} else if (winTop <= navTop) {
			nav.addClass('absoluted');
			nav.removeClass('fixed');
			$(".top_navi ul li a").removeClass("active");
		}
	});

	$(".clearfix li a").each(function(){
		$(this).attr("id");
		$("#"+$(this).attr("id")).scrollTo();
	});

	$("#go_board").addClass("js-active");
	var next = $(".js-active").next();
	var specialChars = /[~!#$^&*=+|:;?"<,.>']/;

	//높이값 설정
	/*$(document).window_h(singleSlideClass);
	$(window).resize(function() {
		$(document).window_h(singleSlideClass);
	});*/

	$(".slide-numbers li a").click(function(e){
		var e_id = $(this).attr("href");
		var e_class = e_id.split(specialChars).join("");
		$(document).scrollTo(e_id);
		e.stopPropagation();
		e.preventDefault();

		$(".slide-numbers li a").removeClass("active");
		$(this).addClass("active");
		
		$(singleSlideClass).removeClass("js-active");
		$(e_id).addClass("js-active");
	});

	$(window).bind('mousewheel', function(event) {
		if (event.originalEvent.wheelDelta >= 0) {
			getCurrentPosition();
		}
		else { //Scroll Down
			getCurrentPosition();
		}
	});

	function getCurrentPosition() {
		if ($(window).scrollTop() >= next.offset().top && $(window).scrollTop()+$(window).outerHeight() !== $(document).outerHeight()) {
			var offsetTest;
			$(singleSlideClass).each(function () {
				offsetTest = $(this).offset().top;

				//console.log(offsetTest , $(window).scrollTop());

				if (offsetTest <= $(window).scrollTop()) {
					if ($(this).prev().hasClass(singleSlideClass)) {
						previous = $(this).prev();
					} else {
						previous = $('.' + firstClass);
					}
					current = $(this);
					/*if (current.next().hasClass(singleSlideClass)) {
						next = $(this).next();
					} else {
						next = $('.' + lastClass);
					}*
					top = false;*/
				}
			});
			//console.log("#"+current.attr("id"));
			//slideIndex(current, false);
		} else {
			//if (last !== $(singleSlideClass + ':last-child')[0]) {
				//slideNumbersFade(false);
			//} else {
				//slideNumbersFade(true);
				//slideIndex(current, false);
			//}
			//$(document).scrollTo("#"+current.attr("id"));
		}

		$(".slide-numbers li a").removeClass("active");
		$("."+current.attr("id")).addClass("active");

		$(singleSlideClass).removeClass("js-active");
		$("#"+current.attr("id")).addClass("js-active");
	}

});

//레이어 닫을경우 영상재생 정지 스크립트 추가로 인하여 분리
// 레이어 닫기
function layer_close2(el){
	$(document).ready(function(){
		$("#"+el).hide();
		stopmovie();
	});

}

// 레이어팝업
function layer_open2(el) {
	$(document).ready(function(){
		var temp = $('#' + el);
		var bg = temp.prev().hasClass('layer_bg');	//dimmed 레이어를 감지하기 위한 boolean 변수
		var id = temp.attr("id");
		//$("#"+id);

		if(bg){
			$("#"+id).parent().fadeIn()
			//$('.layer').fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
		}else{
			temp.fadeIn();
		}

		// 화면의 중앙에 레이어를 띄운다.
		if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
		else temp.css('top', '0px');
		if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
		else temp.css('left', '0px');

		temp.find('.close').click(function(e){
			if(bg){
				$('.layer_n').fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
			}else{
				temp.fadeOut();
			}
			
			stopmovie();
			//e.preventDefault();
		});

		$('.layer_n .layer_bg').click(function(e){	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
			stopmovie();
			$('.layer_n').fadeOut();
			//e.preventDefault();
		});
	});
}