// webfont load
$(function(){
	WebFont.load({
		google: {
			families: ['Noto Sans KR','Prompt']
		}
	});
});

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

// window size responsive
function respondGrid(){
	var $width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	function fontSize(w) {
		var fontSize = w / 3.20;
		$('html').css('font-size', Math.floor(fontSize*100)/100 + '%');
	}
	fontSize($width);
	$(window).resize(function(){
		var $width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		fontSize($width);
	});
}

// 아래&위 fix 영역 만큼 간격주기
function fixValue(option){
	var $topSpe = $(".head_fix").outerHeight(), $btmSpe = $(".footFix").outerHeight();
	if(option == "mw"){
		if($(".head_fix").length > 0){
			$("#wrap").css("padding-top",$topSpe);
			$(".head_main").css("top",$topSpe);
			$("#gnb").css("padding-top",$topSpe);
		}
		if($(".footFix").length > 0){
			$("#wrap").css("padding-bottom",$btmSpe);
		}
	}else{
		$("#wrap, #header, #gnb").removeAttr("style");
	}
}

// 맨위로
function topBtn(){
	var $body = $("html, body");
	$(".btn_top").on("click", function(){
		$body.stop().animate({ 'scrollTop': $body.offset().top }, 350);
	});
}

// 알림이용권 선택
function alarmTicket(option){
	/*
	if(option == "mw"){
		$(".alarm_ticket li").on("click", function(e){
			e.preventDefault();
			var $this = $(this);
			$(".alarm_ticket li").removeClass("selected");
			$this.addClass("selected");
		});
	}else{
	//	$(".alarm_ticket li").removeClass("selected");
	//	$(".alarm_ticket li:eq(0)").addClass("selected");
	}
	var $bottom = $('.alarm_ticket_skip').height() + $("#footer").height() + ($(".btn_top").outerHeight()*2);
	$(window).scroll(function(){
		if ($(window).scrollTop() >= $(document).height() - $(window).height() - $bottom) {
			$('.alarm_ticket_skip').addClass('nofix');
		}else{
			$('.alarm_ticket_skip').removeClass('nofix');
		}
	});
	*/
}
// header fix
function headFix(option){
	var $body = $("html, body"), $target = $(".path"); $head = $("#header").outerHeight();
	if(option == "pc"){
		$(window).scroll(function(){
			if($target.length > 0){
				if ($(document).scrollTop() >= $target.offset().top - $head){
					$target.addClass("fix");
					$target.css("top",$head);
					$("#wrap").css("padding-top", $head);
					$(".pathWrap").css("height", $target.outerHeight());
				}
				if ($(document).scrollTop() >= $("#ct").offset().top + $target.outerHeight() + $(".title_type").height() + 80){
					$(".path li.now").show();
				}
				if ($(document).scrollTop() <= $("#ct").offset().top + $target.outerHeight() + 18){
					$target.removeClass("fix").removeAttr("style");
					$("#wrap").removeAttr("style");
					$(".pathWrap").removeAttr("style");
					$(".path li.now").hide();
				}
			}
		});
	}else{
		$(window).unbind("scroll");
		$target.removeClass("fix").removeAttr("style");
		$(".pathWrap").removeAttr("style");
		$(".path li.now").hide();
	}
	if(option == "form"){
		$body.animate({scrollTop : $(".title_type").offset().top - ( $head+$target.height()+30 )}, 350);
	}
}

// 팝업
function layer_open(obj){
	var $body = $("html, body"), temp = $("#"+obj);
	$body.css("overflow","hidden");
	temp.show();
}
function layer_close(){
	var $body = $("html, body");
	$body.css("overflow","");
	$(".ly_pop").hide();
}
// 로그인정책변경팝업
window.onload = function() {
	// if($("#login-service").length) layer_open('login-service');
}

// bbs toggle
function bbsToggle(){
	var obj = $(".bbs_toggle article li.q"), ans = $(".bbs_toggle article li.a");
	var tab = $(".bbs_toggle .tab_type li");
	obj.on("click", function(){
		if(!$(this).hasClass("active")){
			obj.removeClass("active");
			ans.removeClass("open");
			ans.filter(":visible").css("display", "none");
			$(this).addClass("active").next("li.a").css("display", "block");
		}else{
			$(this).removeClass("active");
			$(this).next("li.a").css("display", "none");
		}
	});
	tab.on("click", function(){
		var ind = $(this).index()+1;
		$(".homep .tab_type li").removeClass("selected");
		$(this).addClass("selected");
		$(".bbs_toggle article").hide();
		$("#faq"+ind).show();
	});
}

// gnb
$(function(){
	var body = $("html, body"), $film = $(".bgb");
	var $gnb = $("#gnb"), $gnbBtn = $("#header .btn_menu"), $sub = $("#gnb ul ul");
	var spd = 350;
	$gnbBtn.on("click", function(){
		if(!$(".ie9").length > 0){
			// ie9 이상 or 기타 브라우저
			if($(this).find("input").prop("checked")){
				$("#header .btn_log").addClass("open");
				$(this).addClass("open");
				body.css("overflow","hidden");
				body.css("height","100%");
				$film.show();
				$gnb.stop().animate({right:0}, spd);
			}else{
				$("#header .btn_log").removeClass("open");
				$(this).removeClass("open");
				body.css("overflow","");
				$film.hide();
				$gnb.stop().animate({right:"-14.5rem"}, spd);
			}
		}else{
			// ie9
			if(!$(this).hasClass('open')){
				$(this).addClass("open");
				$("#header .btn_log").addClass("open");
				body.css("overflow","hidden");
				body.css("height","100%");
				$film.show();
				$gnb.stop().animate({right:0}, spd);
			}else{
				$(this).removeClass("open");
				$("#header .btn_log").removeClass("open");
				body.css("overflow","");
				$film.hide();
				$gnb.stop().animate({right:"-14.5rem"}, spd);
			}
		}
	});
	$.film = function(option){
		if(option == "mw"){
			$film.unbind();
		}else{
			$film.bind({
				click: function(){
					$.gnbReset();
				},
				mouseover: function(){
					$sub.show();
					$film.show();
					$("#header").addClass("open");
				},
				mouseleave: function(){
					$sub.hide();
					$film.hide();
					$("#header").removeClass("open");
				}
			});
		}
	},
	$.gnbHover = function(){
		$gnb.bind({
			mouseover: function(){
				$sub.show();
				$film.show();
				$("#header").addClass("open");
			},
			mouseleave: function(){
				$sub.hide();
				$film.hide();
				$("#header").removeClass("open");
			}
		});
	},
	$.gnbNoHover = function(){
		$sub.show();
		$gnb.unbind();
		$("#header").removeClass("chg");
	},
	$.gnbReset = function(){
		body.css("overflow","");
		$gnbBtn.removeClass("open");
		$gnbBtn.find(".spin").removeClass("on");
		$film.hide();
		$sub.hide();
		$gnb.removeAttr("style");
		$.gnbHover();
	}
});

// setting fn
$(function(){
	$.fn.extend({
		// input focus
		selectUi: function () {
			var $select = $(".select_ui"), $list = $(".select_ui ul"), $button = $(".select_ui button");
			$select.bind({
				click: function(){
					var $height = $(this).find("li:eq(1)").height() * $(this).find("li").length + $(this).find("li:eq(0)").height()/1.5;
					if($(this).hasClass("open")){
						$list.removeAttr("style");
						$(this).removeClass("open");
					}else{
						$(this).find("ul").css("height",$height);
						$(this).addClass("open");
					}
				},
				mouseleave: function(){
					$list.removeAttr("style");
					$(this).removeClass("open");
				}
			});
		},
		checkbox: function () {
			$(".checkbox").on('click', function(){
				if ($(".checkbox").children("input").length) {
					$("label").each(function(){
						$(this).removeClass("on");
					});
					$("input:checked").each(function(){
						$(this).next("label").addClass("on");
					});
				}
			});
		},
		inputFocus: function () {
			var input = $('.input input, .input textarea, .input button');
			input.focus(function(){
				$(this).parent().addClass('focus');
				if($(this).parent().hasClass("noval")){
					$(this).parent().find("select").attr("disabled", false);
					$("select").selectmenu("refresh", true);
				}
			}).blur(function(){
				$(this).parent().removeClass('focus');
				if($('.input').children('textarea').length){
					$('.input textarea').parent().addClass('textarea');
				}
				if($(this).parent().find("input").val() == ''){
					$(this).parent().removeClass("active");
					if($(this).parent().hasClass("noval")){
						$(this).parent().find("select").attr("disabled", true);
						$("select").selectmenu("refresh", true);
					}
				}
			}).change(function(){
				$(this).parent().removeClass('focus');
			}).blur();
		},
		placeholder: function () {
			var i_text = $(".placeholder>label").next(".i_text");
			$(".placeholder>label").css("position","absolute");
			i_text.focus(function(){
				$(this).prev("label").css("visibility","hidden");
			}).blur(function(){
				if($(this).val() == ""){
					$(this).prev("label").css("visibility","visible");
				} else {
					$(this).prev("label").css("visibility","hidden");
					$(this).parent().addClass("active");
				}
			}).blur();
		},
	});
});

// PC or MOBILE
function responCheck(){
	var $width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	if($width <= 768){
		// mobile
		headFix();
		fixValue("mw");
		$.gnbNoHover();
		$.film("mw");
		alarmTicket("mw");
	}else{
		// pc
		fixValue();
		$.gnbReset();
		$.film();
		alarmTicket();
		headFix("pc");
		if($(".topimg").length > 0){
			setTimeout(function(){ $(".topimg").addClass("on") }, 150);
		}
	}
};

// load, resize 실행
$(function(){
	topBtn();
	bbsToggle();
	$(".select select").selectmenu();
	$(".checkbox").checkbox();
	$(".input").inputFocus();
	$(".placeholder").placeholder();
	$(".select_ui").selectUi();
	responCheck();
	$(window).load(function(){
		responCheck();
	});
	$(window).resize(function(){
		responCheck();
	});
});


//팝업 bg 애니메이션
$(function(){
		$('.bg2').animate({'width':'100%',opacity:0.8}, 4000);
});

if(document.querySelector('.pcTable')) {
	pcSelecting();
}

function pcSelecting() { // 이용권구매 pc 190327
	var table = document.querySelector('.pcTable');
	var selectOn = table.querySelector('.pcSelect');
	var selectLeft = $(selectOn).position().left;
	$('.actBox').animate({left: selectLeft}, 0);
	if(table) {
		table.addEventListener('click', addSelect);
    }
    window.onresize = function() {
		selectOn = table.querySelector('.pcSelect');
		selectLeft = $(selectOn).position().left;
		var selectWidth = $(selectOn).width();
		$('.actBox').animate({width: selectWidth}, 0);
        $('.actBox').animate({left: selectLeft}, 0);
    }
	function addSelect(event) {
        var target = event.target;
        var tCol = $(target).closest('li');
        if($(target).hasClass('rowTh') || $(tCol[0]).hasClass('pcSelect') || $(target).hasClass('actBox')) {
            return false;
        } else {
			var tIndex = tCol[0].getAttribute('class');
			var tWidth = $('.' + tIndex).width();
            var tLeft = $('.' + tIndex).position().left;
            $('.pcTable .row li').removeClass('pcSelect');
            if(tIndex.indexOf('index') > -1) {
				$('.' + tIndex).addClass('pcSelect');
				// $('.actBox').css('width', tWidth);
				$('.actBox').animate({width: tWidth}, 200);
				$('.actBox').animate({left: tLeft}, 300);
				
            }
        }
        
    }
}
moSelecting()
function moSelecting() { // 이용권구매 mobile
	var table = document.querySelector('.moTable');
	if(table) {
		table.addEventListener('click', addSelect);
	}
	function addSelect(event) {
		var target = event.target;
		if($(target).closest('ul').hasClass('moTh')) {
			return;
		} else {
			$('.moTd').removeClass('moSelected');
			$(target).addClass('moSelected');
		}
	}
}
