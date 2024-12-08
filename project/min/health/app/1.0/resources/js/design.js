WebFont.load({
    google: {
        families: ['Noto Sans KR', 'Roboto']
    }
});

// fn
$(function(){
	$.fn.extend({
		// 입력박스 포커스
		inputFocus: function() {
			var $input = $('.input input, .input textarea');
			$input.focus(function(){
				$(this).parent().addClass('focus');
			}).blur(function(){
				$(this).parent().removeClass('focus');
				if($('.input').children('textarea').length){
					$('.input textarea').parent().addClass('textarea');
				}
			}).change(function(){
				$(this).parent().removeClass('focus');
			}).blur();
		},
		// 동그라미 그래프
		progValue: function(){
			var $type = $(this).data("area");
			$(".per, .circle").remove();
			$(this).addClass("half"+$type);
			$(this).find(".circle").addClass("on");
			for(var i=1; i <= $type; i++){
				$(this).prepend("<div class='circle circle"+i+"' data-name='' data-val=''><div class='mask full'><div class='fill'></div></div><div class='mask'><div class='fill fix'></div></div></div>");
				$(".circle"+i).attr("data-name", $(this).attr("data-name"+i));
				$(".circle"+i).attr("data-val",$(this).attr("data-text1"));
				// console.log($(this).attr("data-text"+i));
			}
            $(".circle1").attr("data-val",$(this).data("text1"));
			$(".circle2").attr("data-val",$(this).data("text1")+$(this).data("text2"));
			$(".circle3").attr("data-val",$(this).data("text1")+$(this).data("text2")+$(this).data("text3"));
			$(".circle4").attr("data-val",$(this).data("text1")+$(this).data("text2")+$(this).data("text3")+$(this).data("text4"));
            $(".circle5").attr("data-val",$(this).data("text1")+$(this).data("text2")+$(this).data("text3")+$(this).data("text4")+$(this).data("text5"));
		},
		// placeholder (custom)
		placeholder: function(){
			var i_text = $(".placeholder>label").next(".i_text");
			$(".placeholder>label").css("position","absolute");
			i_text.focus(function(){
				$(this).prev("label").css("visibility","hidden");
				$(this).parent().addClass("focus");
			}).blur(function(){
				if($(this).val() == ""){
					$(this).prev("label").css("visibility","visible");
					$(this).parent().removeClass("focus");
				} else {
					$(this).prev("label").css("visibility","hidden");
				}
			}).change(function(){
				if($(this).val() == ""){
					$(this).prev("label").css("visibility","visible");
					$(this).parent().removeClass("focus");
				} else {
					$(this).prev("label").css("visibility","hidden");
				}
			}).blur();
        },
        inputDel: function () {
			$(this).on("focus keyup", function(e){
				if ($.trim($(this).val()) == "" ) {
					$(this).parent().find("button.del").hide();
				}else{
					$(this).parent().find("button.del").show();
				}
			});
			$(this).on("focusout", function(e){
				setTimeout(function(){ $(e.target).parent().find("button.del").hide(); }, 250);
            });
            $(this).parent().find("button.del").on("click", function(e){
				e.preventDefault();
				$(this).hide().parent().find('input').val('').focus();
			});
        },
		// 체크박스 선택
		allCheck : function (opts) {
			var defaults = {
				all: '.checkall',
				child: '.chkitem'
			};
			var options = $.extend({}, defaults, opts);
			$(this).each(function (index) {
				var thisObj = $(this);
				var size = $(this).find($(options.child)).length;
				$(this).find($(options.all)).on('change', function (e) {
					if ($(this).prop('checked')) {
						thisObj.find($(options.child)).prop({ 'checked': true });
					} else {
						thisObj.find($(options.child)).prop({ 'checked': false });
					}
				});
				thisObj.find(options.child).on('change', function (e) {
					setting();
				});
				function setting() {
					var checkCount = thisObj.find($(options.child + ':checked')).length;
					var $all = thisObj.find($(options.all));
					if (checkCount === 0) {
						$all.prop({ 'checked': false });
					}
					else if (checkCount >= size) {
						$all.prop({ 'checked': true });
						thisObj.find($(options.child)).prop({ 'checked': true });
					}
					else {
						$all.prop({ 'checked': false });
					}
				}
			});
        },
        bbsToggle: function () {
			var obj = $(".bbsToggle li.q");
			var ans = $(".bbsToggle li.a");
			obj.on("click", function(){
				if(!$(this).hasClass("on")){
					obj.removeClass("on");
					ans.removeClass("open");
					ans.filter(":visible").css("display", "none");
					$(this).addClass("on").next("li.a").css("display", "block");
				}else{
					$(this).removeClass("on");
					$(this).next("li.a").css("display", "none");
				}
				$("html, body").animate({scrollTop : $(this).offset().top}, 350);
			});
		}
	});
	$(".input").inputFocus();
	$(".input input").inputDel();
	$(".ipdel input").inputDel();
	$(".placeholder").placeholder();
    $('.checkbox_select').allCheck();
    $(".bbsToggle").bbsToggle();
	// lgu+ 폰트로드
	if($("body.lgu").length > 0){
		WebFont.load({
			google: {
				families: ['Nanum Gothic', 'Roboto']
			}
		});
    }
    // 비교결과 도장 간격
    $(".istamp").on("blur", function(){
        var wid = $(this).find("li").width()*$(this).find("li").length;
        $(this).parent().css("padding-right",wid+10);
    }).blur();

    // 비교결과 2depth 열고닫기
    $(".handle_toggle_depth").on("click", function(){
        if($(this).hasClass('depth')){
            var _this = $(this);
        }else if($(this).hasClass('rose')){
            var _this = $(this).parent().parent();
        }else{
            var _this = $(this).parent();
        }
        _this.toggleClass('on').next().slideToggle(150);
        var target = $(this).offset();
        $('html,body').animate({scrollTop : target.top}, 150);
    });
});

// 안드로이드 버전체크
$(function(){
	var x = navigator.userAgent;
	if(x.match(/Android/)){
		var index = x.indexOf('Android');
		var and_v = eval(x.substr(index+8,1));
		if(and_v < 5){
			// 안드로이드 버전 5.0 이하
			$('html').addClass('aos5');
		}else{
			// 안드로이드 버전 5.0 이상
        }
    }
});

// click gage animation reset
function aniSet(){
	$("a.ani").find(".gage").animate({width:'0'});
}

// fix area value
function fixValue(v){
	var headfix = $("#head.fix"), footfix = $(".fixbtm");
	var topValue = headfix.outerHeight(), footValue = footfix.outerHeight();
	var $btSet = $("#ct .btn_set");
	if(headfix.length > 0){
		$("#wrap").css("padding-top",topValue);
		$btSet.css("top",topValue);
	}
	if(footfix.length > 0) $("#wrap").css("padding-bottom",footValue);
    if(v == 0) $("#wrap").css("padding-bottom","");
}

// fix area content over
function fixValueOver(){
	var win = $(window), body = $("body"), wrapFixed = $('.fixbtm');
	if (wrapFixed.length) {
		var wrapHeight = fixedHeight();
		fixedBtn();
	}
	win.on("resize scroll", function () {
        if (wrapFixed.length) {
            fixedBtn();
            $('#wrap').css('padding-bottom','');
		}
	});
	function fixedHeight() {
		body.height("auto");
		var wrapHeight = body.height();
		body.height("100%");
		return wrapHeight;
	}
	function fixedBtn() {
		var window_height = win.height();
		if (window_height < wrapHeight) {
			$("#wrap").addClass("ct-over");
			body.height("auto");
		}	else {
			$("#wrap").removeClass("ct-over");
			body.height("100%");
		}
	}
}

// function once
function checkVisible( elm, eval ) {
  eval = eval || "object visible";
  var scrolltop = $(window).scrollTop(), // Scroll Top
  y = $(elm).offset().top,
  elementHeight = $(elm).height();
  if (eval == "object visible") return ((y > scrolltop));
}

//Layer Popup
function layer_open(obj){
	var temp = $('#'+obj), $body = $("html, body");
	var bg = temp.parent().parent().find(".bg").hasClass('bg');
	if(bg){
		$body.css("overflow","hidden");
		temp.parent().parent().show();
	}
	temp.find('.popcls').on('click', function(e){
		if(bg) {
			$body.css("overflow","");
			temp.parent().parent().hide();
		}
		e.preventDefault();
	});
};
function layer_close(){
	$("html, body").css("overflow","");
	$('.ly_pop').hide();
}
function layer_btm_open(obj){
    var temp = $('#'+obj), $body = $("html, body");
    var bg = temp.parent().parent().find(".bg").hasClass('bg');
    if(bg){
        $body.css("overflow","hidden");
        temp.parent().parent().addClass("show").css("z-index",99).css("visibility","visible");
    }
}
function layer_btm_close(){
    $(".ly_pop").removeClass("show");
    setTimeout(function(){
        $(".ly_pop").css("z-index",-1).css("visibility","hidden");
    }, 350);
}

// count action
function counting(num,speed,point){
    var point;
    if ( typeof point == "undefined" ){
        point = 0;
    }
	$('.count_'+num).each(function() {
		var $this = $(this),
        countTo = $this.attr('data-count');
        if($this.text() == 0){
            $({ countNum: $this.text()}).animate({
                countNum: countTo
            },{
                duration: speed,
                easing:'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                    if(!isNaN(Number($this.text())) && $this.text()) $this.text(Number($this.text()).toLocaleString().split('.')[point]);
                }, complete: function() {
                    $this.text(this.countNum);
                    if(!isNaN(Number($this.text())) && $this.text()) $this.text(Number($this.text()).toLocaleString().split('.')[point]);
                }
            });
        }
	});
}
function countingReset(num){
	// console.log(num);
	$('.count'+num).each(function() {
		var $this = $(this),
		countTo = 0;
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
}

// 하단버튼 hide & shwow
function btmBtnShow(){
	var $btn = $(".fixbtm");
	$(window).scroll(function(){
		// $("#wrap").css("padding-bottom","");
		// 보험추천은 처음부터 노출
		if($(".mybohum_profile2").length > 0){
			$btn.addClass("up-down");
		}else{
			if ($(this).scrollTop() > 0){
				$btn.addClass("up-down");
			}else{
				$btn.removeClass("up-down");
			}
		}
		if ($(window).scrollTop() >= $(document).height()-$(window).height()-$("#footer").outerHeight()+$(".fixbtm").outerHeight()){
			$btn.removeClass("fixbtm");
		}else{
			$btn.addClass("fixbtm");
		}
	}).trigger("scroll");
}

// 헬스케어 swiper
num = 0;
function careDetailSwipe(num){
	var tline = $(".srvqna_list article");
	var swiper = new Swiper('#topBaner', {
        initialSlide: num,
		init: false,
		autoHeight: true,
		pagination: {
			el: '.swiper-pagination',
		},
	});
	$.card1 = function(){
		var number = $(".swiper-slide:eq("+swiper.activeIndex+")");
		if(swiper.activeIndex == 0){
			number.find("aside").addClass("active");
			number.find(tline).eq(0).find(".emp").addClass("active");
			$(window).scroll(function(){
				if($(this).scrollTop() > 0){
					number.find(tline).eq(1).find(".emp").addClass("active");
				}
			}).trigger("scroll");
		}
	},
	$.cardNext = function(){
		var number = $(".swiper-slide:eq("+swiper.activeIndex+")");
		number.find("aside").addClass("active");
		number.find(tline).eq(0).find(".emp").addClass("active");
		$(window).scroll(function(){
			if($(this).scrollTop() > 0){
				number.find(tline).eq(1).find(".emp").addClass("active");
			}
			if($(this).scrollTop() > number.find(".srvqna_list>article:eq(1)").offset().top - 200){
				number.find(tline).eq(2).find(".emp").addClass("active");
			}
		});
	}
	// console.log(num);
	swiper.on("init", function () {
		$.card1();
	});
	swiper.init();
	swiper.on("slideChange", function () {
		$(window).scrollTop(0);
		$("aside").removeClass("active");
		$(".swiper-slide").find(".emp").removeClass("active");
		$(".srvqna_map .map").removeClass("on");
		if(swiper.activeIndex == 1){
			$.cardNext();
		}else if(swiper.activeIndex == 2){
			$.cardNext();
			$(window).scroll(function(){
				if ($(this).scrollTop() > $(".srvqna_list").offset().top + 50){
					$(".srvqna_map .map").addClass("on");
				}
            });
		}else{
			$.card1();
		}
	});
}

// 상단 탭 슬라이드
function tabSwir(n){
    var swiper = new Swiper('#swipetab', {
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },
        scrollbarHide: true,
        slidesPerView: 'auto',
        freeMode: false,
        grabCursor: true,
        initialSlide: n,
        on: { init: function () { $('#swipetab li:eq('+n+') a').addClass('selected') }, }
    });
    var yrCount = $(".tabYear li").length;
    if(yrCount < 4){
        $(".tabYear").addClass("tab"+yrCount);
    }
}

// switch menu
function switchHov() {
    var gnb = $('.gnb_menu');
    gnb.addClass('switchOn');
    $(gnb).click(function (e) {
        if (!$(gnb).find('ul').has(e.target).length) {
            gnb.removeClass('switchOn');
        }
    });    
}

// ready :: etc
$(function() {

    fixValue();

    // top
    $(".topGo").on("click", function(){
        var $body = $("body");
        $("html,body").stop().animate({ 'scrollTop': $body.offset().top }, 350);
    });

    // popup-bottom reset
    $(".ly_pop.btm").blur(function(){
        var obj = $(this).find(".elm"), height = obj.outerHeight();
        $(this).css({bottom:-height}).css("visibility","hidden");
    }).blur();

    // click gage animation
    $("a.ani, button.ani").click(function(e) {
		e.preventDefault();
		$(this).addClass('on');
		var href = $(this).attr('href');
		$(this).find(".gage").animate({width:'100%'}, function(){
			window.location = href;
		});
	});

	// click focusing effect
	$('a.active, button.active').on({
		'touchstart' : function () { $(this).addClass('fake');},
		'touchend' : function () { $(this).removeClass('fake'); }
	});

	//유의사항
	$(".mybobum_aw").click(function () {
		$(".mybobum_ar_txt").slideDown(300)
		$(".mybobum_aw2").show();
		$(".mybobum_aw").hide();
	});
	$(".mybobum_aw2").click(function () {
		$(".mybobum_ar_txt").slideUp(300);
		$(".mybobum_aw2").hide();
		$(".mybobum_aw").show();
    });

    // 하단 배너
    var bb = $(".squarebn_nor");
    $(window).load(function(){
        bb.css("bottom", -bb.outerHeight());
    });
    $(window).scroll(function(){
        if ($(this).scrollTop() > 0){
            bb.addClass("fixbtm on");
            fixValue();
        }else{
            bb.removeClass("fixbtm on");
        }
    });

    // 헬스케어 검진센터 지도 맵
	$(".srvqna_map .map a[data-area]").on("click", function(e){
		e.preventDefault();
		$(".srvqna_map .areatip").removeClass("visible");
		$(this).next().addClass("visible");
	});
	$(".srvqna_map .map .btn_cls").on("click", function(){
		$(".areatip").removeClass("visible");
	});

	// 무료컨텐츠
	$(window).scroll(function(){
		if($(".free_contents").length > 0){
			var freeBtn = $('.btn_total'), ptb = freeBtn.outerHeight();
			if(freeBtn.length > 0){
				$('#footer, .footer_cm').css('padding-bottom',ptb);
			}
			if($("body.kt").length > 0 || $("body.lgu").length > 0){
                $(".nodata_box").parent().addClass("nodata");
                if($('.my_premium').length > 0){
                    var isVisible = false;
                    if($('.my_premium').prev().css("display") == "none"){
                        if (checkVisible($('.my_premium').prev().prev())&&!isVisible) {
                            $(".progress").progValue();
                            isVisible=true;
                        }
                    }else{
                        if (checkVisible($('.my_premium').prev())&&!isVisible) {
                            $(".progress").progValue();
                            isVisible=true;
                        }
                    }
                }
				if ($(this).scrollTop() > 0){
					setTimeout(function() {
						$('.free_contents .btn_total').addClass('on');
					},1);
                }
				if($('.free_contents .btn_total').hasClass('on')){
					if ($(this).scrollTop() == $('body').offset().top){
						$('.free_contents .btn_total').removeClass('on');
					}
				}
			}
		}
    }).trigger("scroll");

    // 멈춰있던 데이터 시작
    var headerHeight = $('#head').height(), num = 300,
    wrapFix = $('.data_on_off'),
    prdDetail = $('.data_wrap section, .data_wrap aside'),
    lstTabHeight = wrapFix.height() + num;
    console.log(wrapFix.height());
    $(window).scroll(function() {
        var scroll = $(this).scrollTop();//현재 스크롤탑 높이
        prdDetail.each(function(index) {
            //해당요소의 id를 얻어옵니다.
            var id = $(this).attr("id");
            //현재요소의 top
            var now = $(this).offset().top-headerHeight-lstTabHeight;
            var flag = false;//이게 true면 on
            //false면 on제거
            if(index == prdDetail.length-1) {
                //마지막요소이기 때문에 마지막이 없습니다.
                flag = scroll >= now;
            }else {
                //그 다음요소의 top
                next = prdDetail.eq(index+1).offset().top-headerHeight-lstTabHeight;
                flag = scroll >= now && scroll < next;
            }
            $menu = $("#"+id);
            if(flag) {
                $menu.addClass("on");
                if($menu.hasClass("ai_databox")){
                    $menu.removeClass("off");
                }
            }
        });
        if($("[id^=section]").hasClass("last")){
            if ($(window).scrollTop() >= $(document).height() - $(window).height() - 50) {
                $menu.addClass("on");
            }
        }
    }).trigger("scroll");

    // 보험추천 최저가 강조
    setInterval(function(){
        $(".list_result .sale").toggleClass("sparkle");
    }, 500);

    // image preload
    var cache = [];
    $.preLoadImages = function () {
        var args_len = arguments.length;
        for (var i = args_len; i--;) {
            var cacheImage = document.createElement('img');
            cacheImage.src = arguments[i];
            cache.push(cacheImage);
        }
    }
    $.preLoadImages(
        "https://resource.minwise.co.kr/health/resources/images/skt_bg_icon.png",
        "https://resource.minwise.co.kr/health/resources/images/skt_bg_grim.png",
        "https://resource.minwise.co.kr/health/resources/images/kt_bg_icon.png",
        "https://resource.minwise.co.kr/health/resources/images/kt_bg_grim.png",
        "https://resource.minwise.co.kr/health/resources/images/lgu_bg_icon.png",
        "https://resource.minwise.co.kr/health/resources/images/lgu_bg_grim.png",
        "https://resource.minwise.co.kr/health/resources/images/loading_bigger_hack.png"
    )

});

// gage 값넣기
function beltgage(){
    $.each($(".on .rating_belt .real"), function(i,v){
        var g = $(v).data('gage');
        $(v).css('width',g+"%").parent().find('.val').text(g);
	});
}

// load
$(window).on("load", function(){
    fixValue();
    setTimeout(function() {
        fixValue();
    },100);
});

// 셀바스 설문조사
function selvasSurvey(){
    // alert(1);
    // aos only
    fixValueOver();
    var ua = navigator.userAgent;
    if ( ua.match(/Android/i) ){
        $(".ipbx input").on('focus', function (e) {
            setTimeout(function() {
                $('html, body').scrollTop($(e.target).offset().top - 100);
            },250);
            return false;
        });
    }
    $('.btn_btm_skip a.disabled').click(function () { return false });
    // $(".checking input").on('change', function () {
    //     if($(this).parent().parent().find('.checkbox input:checked').length > 0){
    //         $(this).parent().parent().parent().next().find("button").attr('disabled',false);
    //     }else{
    //         $(this).parent().parent().parent().next().find("button").attr('disabled',true);
    //     }
    // });
    $(".smkcheck input").on('change', function () {
        if ($(this).prop('checked')) {
            var url = $(this).next().data('url'), a = $('.btn_btm_skip a');
            a.removeClass('disabled');
            a.unbind('click');
            a.attr('href',url);
        }
    });
    $("[class*=limits]").on('keyup ', function (e) {
        // 0~7까지만 입력 가능
        // alert(e.keyCode);
        if($(this).hasClass('limits7')){
            if (e.keyCode >=48 && e.keyCode <= 55 || e.keyCode >=96 && e.keyCode <= 103 || e.keyCode == 8 || e.keyCode == 13 ) {
                return true;
            }else if (e.keyCode == 229) {
                var v = $(this).val();
                if(v == 8 || v == 9){
                    alert($(this).data('mss'));
                    $(this).val('');
                }
            } else {
                alert($(this).data('mss'));
                $(this).val(''); 
            }
        }
    });
    $("[numberOnly]").on('keyup', function (e) {
        if(e.keyCode == 8) return true;
        if(!$(this).val().replace(/[^0-9]/g,"")){
            alert('숫자를 입력 해주세요');
            $(this).val('');
        }
    });
    $(".ipbx .val").on('focus keyup', function () {
        var byte = $(this).data('byte');
        if($(this).val() == ''){
            // true
            // console.log('true');
            $(".btn_btm_skip button").attr('disabled',true);
        }else{
            // false
            // console.log('false');
            if($(this).val() > byte){
                alert($(this).data('mss2'));
                $(this).val('');
            }
            $(".btn_btm_skip button").attr('disabled',false);
        }
    });
    $("#smoke1 input").on('focus keyup', function () {
        var objs = $("#smoke1 input");
        for(var i=0; i < objs.length; i++ ){
            if(objs.eq(i).val() == ''){
                $(".btn_btm_skip button").attr('disabled',true);
                return false;
            }else{
                $(".btn_btm_skip button").attr('disabled',false);
            }
        }
    });    
    $("#smoke2 input").on('focus keyuplur', function () {
        var objs = $("#smoke2 input");
        for(var i=0; i < objs.length; i++ ){
            if(objs.eq(i).val() == ''){
                $(".btn_btm_skip button").attr('disabled',true);
                return false;
            }else{
                $(".btn_btm_skip button").attr('disabled',false);
            }
        }
    });
    // $("[id^='smoke'] input").on('keyup', function () {
    //     if(this.value.length == 0){
    //         $(this).parent().parent().prev().find('input').focus();
    //     }else if(this.value.length >= 1){
    //         $(this).parent().parent().next().find('input').focus();
    //     }
    // });
    $(".iplst input").on('focusout', function () {
        if($(this).val() == ''){
            $(this).removeClass('focus');
        }else{
            $(this).addClass('focus');
        }
    });
}

// 체크박스 버튼체크
function surveyCecking(id){
    var tar = $('#survey_step_'+id);
    tar.find(".checking input").on('change', function () {
        if(tar.find('.checkbox input:checked').length > 0){
            $(".btn_btm_skip button").attr('disabled',false);
        }else{
            tar.find(".btn_btm_skip button").attr('disabled',true);
        }
    });
}

// 셀바스 결과상세
function selvasResult(){
    function values(){
        if($('.profile_results [data-section="위험도2"]').hasClass('on')){
            counting('disease', 500, 2);
        }
        if($('.profile_results [data-section="나이"]').hasClass('on')) counting('age', 500);
        if($('.profile_results [data-section="생존률"]').hasClass('on')) counting('live', 500, 2);
        if($('.profile_results [data-section="위험도비교"]').hasClass('on')) counting('curve', 1000, 2);
    }
    $(window).on("load", function(){
        values();
        beltgage();
    });
    $(window).on("scroll", function(){
        values();
        beltgage();
        if($(this).scrollTop() >= $('#section3').offset().top + 200){
            $('.profile_results [data-section="위험도3"]').addClass('on');
        }
    });
}