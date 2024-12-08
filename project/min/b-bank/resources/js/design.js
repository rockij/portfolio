// count action
function counting(num,speed){
	// console.log(num);
	$('.count_'+num).each(function() {
		var $this = $(this),
		countTo = $this.attr('data-count');
		$({ countNum: $this.text()}).animate({
			countNum: countTo
		},{
			duration: speed,
			easing:'linear',
			step: function() {
				$this.text(Math.floor(this.countNum));
				if(!isNaN(Number($this.text())) && $this.text()) $this.text(Number($this.text()).toLocaleString().split('.')[0]);
			}, complete: function() {
				$this.text(this.countNum);
				if(!isNaN(Number($this.text())) && $this.text()) $this.text(Number($this.text()).toLocaleString().split('.')[0]);
			}
		});
	});
}

// fullpage
function fullpageSet(){
	var myFullpage = new fullpage('#fullpage', {
		autoScrolling: false,
		fitToSection: false,
		navigation: true,
		onLeave: function(origin, destination, direction){
            $("#fp-nav").removeClass('chg');
            console.log(destination.index);
			if(destination.index == 0){
				setTimeout(function(){
					$("#section1").addClass("play");
                }, 350);
                $("#fp-nav").css("opacity",0);
            }else if(destination.index == 1){
                $("#section11").addClass("play");
                $("#fp-nav").css("opacity",1);
                setTimeout(function(){
					$('.security').addClass('lock');
                }, 1500);
			}else if(destination.index == 2){
                $("#section2").addClass("play");
                $("#fp-nav").css("opacity",1);
			}else if(destination.index == 3){
                $("#section9").addClass("play");
                $("#fp-nav").addClass('chg').css("opacity",1);
            }else if(destination.index == 4){
                $("#section10").addClass("play");
                $("#fp-nav").css("opacity",1);
			}else if(destination.index == 5){
                $("#section4").addClass("play");
                $("#fp-nav").css("opacity",1);
				setTimeout(function(){
					counting('deal',3000);
                }, 700);
            }else if(destination.index == 6){
                $("#section5").addClass("play");
                $("#fp-nav").css("opacity",1);
			}else if(destination.index == 7){
                $("#section8").addClass("play");
                $("#fp-nav").css("opacity",0);
			}else{
				$("#section1").removeClass("coin");
			}
		},
		afterResize: function(){
            fullpage_api.setAutoScrolling(false);
		},
		licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE'
	});
	$(window).scroll(function(){
		$("#section1").addClass("coin");
		if ($(window).scrollTop() == $("html, body").offset().top) {
			$("#section1").removeClass("coin");
		}
		var $btm = $("#section8").height()/2 + $("#footer").height();
		if ($(window).scrollTop() >= $(document).height() - $(window).height() - $btm) {
			$("#section8 ul").addClass("nofix");
		}else{
			$("#section8 ul").removeClass("nofix");
		}
	});
	$(window).load(function(){
		if ($(window).scrollTop() >= $("#section2").height()) {
			$("#section1").removeClass("play coin");
		}else{
			setTimeout(function(){
				$("#section1").addClass("play");
			}, 1);
		}
	});
    // fullpage_api.silentMoveTo(3);
};

// 맨위로
function topBtn(){
	var $width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var $body = $("html, body");
	$(".btn_top").on("click", function(){
		$("html,body").animate({ scrollTop: 0 }, 350);
	});
	$(window).scroll(function(){
		if ($(window).scrollTop() > $("html, body").offset().top) {
			$(".btn_top").fadeIn();
		}else{
			$(".btn_top").fadeOut();
		}
		if($width <= 768){
			if($(window).scrollTop() >= $(document).height() - $(window).height() - $("#footer").height()){
				$(".btn_top").addClass("nofix");
			}else{
				$(".btn_top").removeClass("nofix");
			}
		}else{
			if($(window).scrollTop() >= $(document).height() - $(window).height() - 132){
				$(".btn_top").addClass("nofix");
			}else{
				$(".btn_top").removeClass("nofix");
			}
		}
	});
};

// 브라우저 확인
$(function(){
	var agent = navigator.userAgent, match;
	var app, version;
	if((match = agent.match(/MSIE ([0-9]+)/)) || (match = agent.match(/Trident.*rv:([0-9]+)/))) app = 'Internet Explorer';
	else if(match = agent.match(/Chrome\/([0-9]+)/)) app = 'Chrome';
	else if(match = agent.match(/Firefox\/([0-9]+)/)) app = 'Firefox';
	else if(match = agent.match(/Safari\/([0-9]+)/)) app = 'Safari';
	else if((match = agent.match(/OPR\/([0-9]+)/)) || (match = agent.match(/Opera\/([0-9]+)/))) app = 'Opera';
	else app = 'Unknown';
	if(app !== 'Unknown') version = match[1];
	if( app == 'Internet Explorer' && version == 9 ){
		$('body').addClass('ie9');
	}
});

// 팝업
function layer_open(obj){
	var $body = $("html, body"), temp = $("#"+obj);
	$body.css("overflow","hidden");
	temp.show();
}
function layer_close(){
	var $body = $("html, body");
	$body.css("overflow","visible");
    $(".ly_pop").hide();
}

// dropdown menu
$(function(){
	var family = $('.dropdown-menu'), familyList = $('.dropdown-menu ul'), familyBtn = $('.dropdown-menu button');
	familyBtn.on('click', function(){
		$(this).next('ul').stop().slideToggle(0);
		return false;
	});
	family.on('mouseleave', function(){
		familyList.stop().slideUp(0);
		return false;
	});
});

// ready
$(function(){
	topBtn();
    fullpageSet();
});