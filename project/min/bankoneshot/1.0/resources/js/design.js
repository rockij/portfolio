// webfont load
WebFont.load({
	google: {
		families: ['Roboto','Open Sans']
	}
});

// 안드로이드 버전체크
$(function(){
	var x = navigator.userAgent;
	if(x.match(/Android/)){
		var index = x.indexOf('Android');
		var and_v = eval(x.substr(index+8,1));
		// alert(and_v);
		if(and_v < 5){
			// 안드로이드 버전 5.0 이하
			// alert(x);
			$('body').addClass('issue');
		}else{
			// 안드로이드 버전 5.0 이상
		}
	}
});

// fn
$(function(){
	$.fn.extend({
		inputFocus: function() {
			var $input = $('.input input, .input textarea');
			$input.focus(function(){
				$(this).parent().parent().addClass('focus');
				$(this).parent().parent().find(".unit").show();
			}).blur(function(){
				$(this).parent().parent().removeClass('focus');
				$(this).parent().parent().find(".unit").hide();
				if($('.input').children('textarea').length){
					$('.input textarea').parent().addClass('textarea');
				}
				if($('.input').children('.select_btn').length){
					var $slctwidth = $('.select_btn').width();
					$(this).parent().parent().css("padding-left",$slctwidth);
					$(this).parent().parent().find(".lbl").css("text-indent",$slctwidth);
				}
				if(!$.trim($(this).val()) == "" ) {
					$(this).parent().parent().find(".unit").show();
				}
			}).change(function(){
				$(this).parent().parent().removeClass('focus');
				if(!$.trim($(this).val()) == "" ) {
					$(this).parent().parent().find(".unit").show();
				}
			}).blur();
		},
		progValue: function(){
			var $type = $(this).data("area");
			$(".per").remove();
			$(this).addClass("half"+$type);
			$(this).find(".circle").addClass("on");
			for(var i=1; i <= $type; i++){
				$(this).append("<span class='per text"+i+"'><code class='count_text"+i+"'></code>%</span>");
				$(".count_text"+i).attr("data-count", $(this).attr("data-text"+i));
			}
			counting('text1',1000);
			counting('text2',1000);
			if($(this).data("text1") == 0 && $(this).data("text2") == 0){
				$(this).addClass("zero");
			}
		},
		placeholder: function () {
			var ip = $(".placeholder>label").next().find(".i_text");
            $(".placeholder>label").css("position","absolute");
			ip.focus(function(){
				$(this).parent().prev("label").css("visibility","hidden");
			}).blur(function(){
				if($(this).val() == ""){
					$(this).parent().prev("label").css("visibility","visible");
				} else {
					$(this).parent().prev("label").css("visibility","hidden");
					$(this).parent().parent().addClass("active");
				}
			}).blur();
		},
		placeholder2: function () {
			var ip = $(".placeholder2 .i_text");
            $(".placeholder>label").css("position","absolute");
			ip.focus(function(){
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
		slowDis: function () {
			setTimeout(function(){ $(".slowdis").fadeOut() }, 3000);
		},
		hasVerticalScrollBar: function () {
			return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0)
            || (this.prop("scrollHeight") > this.prop("clientHeight"));
        },
        selectLabel: function (){
            var _this = $(this).children('option:selected'),
                name = _this.data("name"), num = _this.data("num");
            $(this).siblings('.label').find(".name").text(name);
            $(this).siblings('.label').find(".num").text(num);
            $(this).find('select').on('blur change', function () {
                $(this).each(function () {
                    var opt = $(this).val();
                    if (!opt) $(this).removeClass("on");
                    else $(this).addClass("on");
                });
            });
        },
	});
	$(".input").inputFocus();
	$(".placeholder").placeholder();
	$(".placeholder2").placeholder2();
	$(".slowdis").slowDis();
	// calendar
	$(".btn_cal").click(function() {
		$(this).parent().find("input").datepicker("show");
		$(this).parent().addClass('focus');
    });
    $('.select_label select').on('change', function () {
        $(this).selectLabel();
    });
});

//fix 영역 컨트롤
function fixValue(){
	var $topSpe = $(".head_fix").outerHeight(), $btmSpe = $(".footFix").outerHeight();
	if($(".head_fix").length > 0) $("#ct").css("padding-top",$topSpe);
	if($(".footFix").length > 0) $("#wrap").css("padding-bottom",$btmSpe);
	if($(".ui-datepicker").length > 0) $(".ui-datepicker").css("bottom",$btmSpe);
}
function fixValueOver(){
	var wrapFixed = $('.footFix');
	$("#wrap").css("padding-bottom","");
	$("#footer").addClass("btmspace");
	wrapFixed.insertAfter("#footer");
	if (wrapFixed.length) {
		var wrapHeight = fixedHeight();
		fixedBtn();
	}
	$(window).on("resize scroll", function () {
		if (wrapFixed.length) {
			fixedBtn();
		}
	});
	function fixedHeight() {
		$("body").height("auto");
		var wrapHeight = $("body").height();
		$("body").height("100%");
		return wrapHeight;
	}
	function fixedBtn() {
		var window_height = $(window).height();
		if (window_height < wrapHeight) {
			$("#wrap").addClass("ct-over");
			$("body").height("auto");
		}	else {
			$("#wrap").removeClass("ct-over");
			$("body").height("100%");
		}
	}
	// 스크롤 제일 하단으로
	var x = navigator.userAgent;
	if(x.match(/Android/)){
		if(!$(".bank_number").length > 0){ //사기계좌 제외
			$('input').focus(function() {
				setTimeout(function() {
					$("html,body").scrollTop($(document).height());
				}, 400);
			});
		}
	}
}

// link click animation
function aniSet(){ //gage reset
	$("a.ani").find(".gage").css('width', '0');
}
$(function(){
	$("a.ani").click(function(e) {
		e.preventDefault();
		$(this).addClass('on');
		var href = $(this).attr('href');
		$(this).find(".gage").animate({width:'100%'}, function(){
			setTimeout(function(){
				aniSet();
			},50);
			window.location = href;
		});
	});
});

// popup
function layer_open(obj){
	var temp = $('#'+obj);
	$('html,body').addClass('noscroll');
	temp.show();
	if(obj == "ly_agree"){
		var winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		var cont = temp.find(".scroll");
		var objHeight = temp.find('.agree_list').innerHeight()+temp.find('.head').height(), gap = $(".agree_list li").height()*2;
		var btn = temp.find('.link');
		if(objHeight >= winHeight){
			cont.css('height',winHeight/2+150+'px');
		}else{
			cont.css('height',objHeight-gap+'px');
		}
    }
    if(obj == "cpinfo"){
        var temp = $('#mw-'+obj);
        temp.show();
    }
	if(temp.hasClass("btm")){
		temp.addClass("show");
		$('.ly_pop').click(function(e){
			if(!$('.ly_pop .cont').has(e.target).length) {
				$(".ly_pop").removeClass("show");
			}
		});
	}
};
function layer_close(tar){
	$('html,body').removeClass('noscroll');
	if(tar == "btm"){
		$(".ly_pop").removeClass("show");
	}else{
		$('.ly_pop').hide().removeAttr("style");
	}
	if(tar === 'ly_end') {
		animateAfter();
	}
}
// kt프로모션 팝업 더보기 버튼
function layer_more(e) {
	var el = $(e).closest('.ly_random .elm')[0]
	var moreWrap = $(e).closest('.moreWrap')[0]
	var moreDesc = moreWrap.querySelector('.moreDesc');
	if($(moreWrap).hasClass('open')) {
		setTimeout(function() {
			$(el).animate({scrollTop: 0});
			$(el).removeClass('scroll');
			$(moreWrap).removeClass('open');
		},500)
		$(moreDesc).slideToggle();
	} else {
		$(moreWrap).addClass('open');
		$(el).addClass('scroll');
		$(moreDesc).slideToggle();
		$(el).animate({scrollTop: $(el).find('.imgarea').height()});
	}
}
function animateAfter() {
	$('.cheese .popAfter').addClass('popOff');
}
$(function(){
	$(".ly_pop.btm").blur(function(){
		var $obj = $(this).find(".elm"), $height = $obj.outerHeight();
		$obj.css({bottom:-$height});
	}).blur();
});

// 멈춰있던 데이터 시작
$(function(){
    var headerHeight = $('#header').height(), num = 200,
    wrapFix = $('.data_on_off'),
    prdDetail = $('.data_wrap section'),
    lstTabHeight = wrapFix.height() + num;
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
            }
        });
    }).trigger("scroll");
})

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

// swipe :: 기본 가로 슬라이드
function swirHoriz(){
  var swiper = new Swiper('#swir_horiz', {
    slidesPerView: 'auto',
		centeredSlides: false,
		freeMode: true,
		grabCursor: true
  });
}
// swipe :: 세로 슬라이드 (무한)
function swirVertical(id,time){
	var swiper = new Swiper('#'+id, {
    direction: 'vertical',
    autoplay: {
	    delay: time,
	    disableOnInteraction: false
	  },
	  speed: 500,
	  loop: true
  });
}
// kt 효율화v4 메인(테마,투자) 슬라이드
function v4Slide(name) {
	var swiper = new Swiper('.'+name, {
		autoplay: {
			delay: 1500,
			disableOnInteraction: false
		},
		slidesPerView: 1,
		spaceBetween: 20,
		speed: 1000,
	  	loop: true
	})
}
// kt 효율화v5 메인(테마,투자) 슬라이드
function v5Slide(name){
    var swiper = new Swiper('.'+name, {
        effect: 'coverflow',
        initialSlide: 0,
        grabCursor: true,
        centeredSlides: true,
        slideToClickedSlide: false,
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
        autoplay: {
			delay: 3000,
			disableOnInteraction: false
		},
        coverflowEffect: {
            slideShadows: false,
        },
    });
    $(".stockEffect").addClass("on");
}

// 무료컨텐츠 (SKT&KT)
function freePlay(){
	$(".btn_total").addClass("footFix");
	if($(this).scrollTop() > 0){
		setTimeout(function(){
			$('.btn_total').addClass('on').show();
		},1);
	}else{
		$('.btn_total').removeClass('on').hide();
	}
	if($(".money_box_txt").length > 0){
		if($(this).scrollTop() > $('.section1').offset().top-$('.section3').height()/2){
			$('.mt_ratio').addClass('on');
			counting('monthPay',1300);
		}
		if($(this).scrollTop() > $('.money_box_txt').offset().top){
			$('.phonebg2').show();
			$('.phonebg2').stop().animate({right:'-5rem'}, 700);
			$('.phonebg3').show();
			$('.phonebg3').stop().animate({left:'-1rem'}, 700);
			counting('monthPay',1300);
		}
	}
}

//약관 (old)
$(function(){
	var AgreeInp = $('.agree_list input');
	var AgreeButton = $('.agree_list .btn_chk');
	AgreeButton.on('click', function(){
		$(this).toggleClass('on');
		var Count = $('.agree_list button.on').length;
		if(Count == $('.agree_list li').length){
			$('.btn_type3').addClass('on');
		} else {
			$('.btn_type3').removeClass('on');
		}
	});
	$('.agree_list .btn_open').on('click', function(){
		if(!$(this).hasClass('open')){
			$('.agree_list .btn_open').removeClass('open');
			$('.agree_list article, .agree_list pre').filter(':visible').css('display', 'none');
			$(this).addClass('open').next('article,pre').css('display', 'block');
		}else{
			$(this).removeClass('open');
			$(this).next('article,pre').css('display', 'none');
		}
	});
	$('.agree_list .btn_long').on('click', function(){
		if(!$(this).hasClass('open')){
			$('.agree_list .btn_long').removeClass('open');
			$('.agree_list article, .agree_list pre').filter(':visible').removeClass('long');
			$(this).addClass('open').next('article,pre').addClass('long');
		}else{
			$(this).removeClass('open');
			$(this).next('article,pre').removeClass('long');
		}
	});
	$('.subAllChk').find('input').on('click', function(){
		if($(this).is(":checked")){
			$(this).parent().next('button').addClass('on');
			$(this).parent().parent().find('.sub input').prop("checked", true);
		}else{
			$(this).parent().next('button').removeClass('on');
			$(this).parent().parent().find('.sub input').prop("checked", false);
		}
	});
	$('.btn_allChk').on('click', function(){
		if($('.btn_allChk').hasClass('on')){
			$(this).removeClass('on');
			AgreeInp.prop("checked", false);
			$('.btn_type3').removeClass('on');
			AgreeButton.removeClass('on');
		}else{
			$(this).addClass('on');
			AgreeInp.prop("checked", true);
			$('.btn_type3').addClass('on');
			AgreeButton.addClass('on');
		}
	});
	$('.btn_subChk').on('click', function(){
		$(this).parent().find('.sub').toggle();
		$(this).toggleClass('close');
	});
	$('.sub_credit input').on('click', function(){
		var subCredit = $('.sub_credit input:checked').length;
		if(subCredit == 4){
			$('.sub_credit').parent().find('.subAllChk input').prop("checked", true);
		}
	});
	$('.sub_health input').on('click', function(){
		var subHealth = $('.sub_health input:checked').length;
		if(subHealth == 4){
			$('.sub_health').parent().find('.subAllChk input').prop("checked", true);
		}
	});
	AgreeInp.on('click', function(){
		var Count = $('.agree_list input:checked').length;
		if(Count == $('.agree_list li').length){
			$('.btn_type3').addClass('on');
		} else {
			$('.btn_type3').removeClass('on');
		}
	});
});

// 약관선택(simple)
$(function(){
	$(".agreeChklist .one .checkbox").on("change", function() {
		var count = $(".agreeChklist .one input:checkbox:checked").length;
		if(count == $(".agreeChklist .one").length){
			$(".btn_skip").addClass("on");
			$(".all input").prop("checked", true);
		} else {
			$(".btn_skip").removeClass("on");
			$(".all input").prop("checked", false);
		}
	});
	$(".agreeChklist .all .checkbox").on("change", function() {
		if($(this).find("input").prop("checked")){
			$(".checkbox input").prop("checked", true);
			$(".btn_skip").addClass("on");
		}else{
			$(".checkbox input").prop("checked", false);
			$(".btn_skip").removeClass("on");
		}
	});
});

//기간설정
$(function(){
	var $tab = $(".srch_type li button").not('.date').not('.btn_cal');
	$tab.on('click', function(){
		$tab.removeClass("selected");
		$(this).addClass("selected");
	});
	$(".srch_type button.date").on('click', function(){
		$(".calendar").toggle();
		$(".ui-datepicker-bg").remove();
		$("body").after().append("<span class='ui-datepicker-bg'></span>");
	});
	$(".ui-datepicker-bg").click(function () {
		$(".ui-datepicker").fadeOut();
	});
});

// 자동이체 내역 예정알림 창
$(function(){
	if($(".tootip_alarm").length > 0){
		var playY = 0;
		$(".tootip_alarm").animate({ bottom: playY }, 750);
	}
});

// 연결계좌 변경 / 등록 >> 은행선택
$(function(){
	$(".ly_bankslct li button").on('click', function(){
		var $name = $(this).attr('data-name');
		$(".upchg_bank .select_btn").text($name);
		layer_close();
	})
});

// 자산 메인
$(function(){
	// 상단
	$body = $("body");
	virHeight = $(".graph_wrap").height();
	$(".graph_wrap").css("height", virHeight);
	if($(".graph_wrap").length > 0){
		setTimeout(function(){ fixValue(); }, 150);
	}
	function fold(){ // 접기
		$body.css("overflow","");
		$(".graph_wrap").css("height", 0);
		var inter = setInterval(function(){
			if($(".graph_wrap").height() < 0){
				clearInterval(inter);
				$body.css("overflow","");
			}else{
				fixValue();
			}
		}, .1);
	}
	function expand(){ // 펼치기
		$body.css("overflow","hidden");
		$(".graph_wrap").css("height", virHeight);
		var inter = setInterval(function(){
			if($(".graph_wrap").height() >= virHeight){
				clearInterval(inter);
				$body.css("overflow","hidden");
			}else{
				fixValue();
			}
		}, .1);
	}
	if($(".graph_bank").length > 0) $body.css("overflow","hidden");
	$(".btn_expand").on('click', function(){
		$(".graph_wrap").css("height", $(".graph_wrap").height());
		$(".head_type").toggleClass("simp");
		if($(this).hasClass("simp")){
			$(this).removeClass("simp");
			expand();
		}else{
			$(this).addClass("simp");
			fold();
		}
    });
    // alert(1);
	// 아래&위 터치 무브시
	if($(".assets_main").length || $(".eyivstMain").length){
		var lastY;
        $body.css("height","100%");
		$('html,body').bind('touchmove', function (e){
			$body.css("overflow","");
			var currentY = e.originalEvent.touches[0].clientY;
			if(currentY > lastY){
				// moved down
				$(document).on("scroll", function () {
					if($(this).scrollTop() <= 0){
						$(".btn_expand").removeClass("simp");
						$(".head_type").removeClass("simp");
						expand();
					}
				});
				if($(this).scrollTop() == 0){
					$(".btn_expand").removeClass("simp");
					$(".head_type").removeClass("simp");
					expand();
                }
			}else if(currentY < lastY){
                // moved up
				$(".graph_wrap").css("height", virHeight);
				$('html,body').on("scroll", function () {
                    if(!$("html,body").hasVerticalScrollBar()){
                        if($(this).scrollTop() <= 0){
                            $(".head_type").addClass("simp");
							$(".btn_expand").addClass("simp");
							fold();
						}
					}
				});
				$(".head_type").addClass("simp");
				$(".btn_expand").addClass("simp");
                fold();
			}
			lastY = currentY;
            fixValue();
		});
	}
});

// 간편투자 메인
function easyMainSwir(){
    //상단 해외주식배너
    var overstock = new Swiper('#global_stock', {
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: false,
        // },
        initialSlide: 0,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
    });
    overstock.on('slideChange', function () {
        if(overstock.realIndex == 1){
            $("#global_stock .swiper-pagination").removeClass("s1 s3").addClass("s2");
        }else if(overstock.realIndex == 2){
            $("#global_stock .swiper-pagination").removeClass("s1 s2").addClass("s3");
        }else{
        $("#global_stock .swiper-pagination").removeClass("s2 s3").addClass("s1");
        }
    });
    // 중간 띠배너
    var belt = new Swiper('#swir_baner', {
        init: false,
        pagination: {
        el: '.swiper-pagination',
		},
	});
	if($(belt.el).hasClass('kt')) {
		$(belt.el).find('.swiper-pagination').css('display', 'none');
		belt.params.loop = true;
		belt.params.autoplay = 3000;
		belt.autoplay.running = true;
	}
    belt.on('init slideChange', function () {
        var title = $("#swir_baner").find(".swiper-slide:eq("+belt.realIndex+")").attr("data-title");
		$("#swir_baner .swiper-pagination").removeAttr("data-title").attr("data-title", title);
    });
    belt.init(); //띠배너 실행
	swirHoriz(); //테마&토픽
	v4Slide('ttSlide');
	v4Slide('iiSlide'); // kt 효율화v4 테마토픽 슬라이드
	v5Slide('efSlide'); // kt 효율화v5 테마토픽 슬라이드
    swirVertical('swirVer1',3000); //투자인사이트1
    swirVertical('swirVer2',3000); //투자인사이트2
}
function easyMainV6_top(){
    counting('result',1300);
    $(".tip_btn").on("click", function() {
        $(this).next().fadeToggle();
    });
    $(".tip_ly .close").on("click", function() {
        $(this).parent().fadeOut();
    });
    $(window).on('scroll', function() {
        $(".tip_ly").hide();
    });
    // 해외주식배너
    var overstock = new Swiper('#global_stock', {
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: false,
        // },
        initialSlide: 0,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
    });
    // 수익인증
    var swiper = new Swiper('#revenueThumb', {
        effect: 'coverflow',
        initialSlide: 0,
        grabCursor: true,
        centeredSlides: true,
        slideToClickedSlide: false,
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
        coverflowEffect: {
            slideShadows: false,
        },
    });
}
function easyMainV6_tab(n){
    var par = $(".crv_compare");
    par.find(".tab li").removeClass("active");
    par.find(".tab li:nth-child("+n+")").addClass("active");
    par.find(".graph").removeClass("on");
    par.find(".count_easy").removeClass("on");
    $(window).scroll(function(){
        par.find(".count_easy").removeClass("on");
        if(par.hasClass("on")){
            par.find(".count_easy").addClass("on");
        }
    });
    if(n == 1){
        par.find(".graph.krstock").addClass("on");
        par.find(".graph.krstock .count_easy").addClass("on");
    }else if(n == 2){
        par.find(".graph.land").addClass("on");
        par.find(".graph.land .count_easy").addClass("on");
    }else{
        par.find(".graph.save").addClass("on");
        par.find(".graph.save .count_easy").addClass("on");
    }
}

// load
$(window).on("load", function () {
	fixValue();
	// top
	if($("html,body").hasVerticalScrollBar()){
    $("#footer").prepend('<button type="button" class="btn_top"><i class="ico_com">맨위로</i></button>');
    $(".btn_top").on("click", function(){
			$("html,body").stop().animate({ 'scrollTop': $body.offset().top }, 350);
		});
	}
	$(window).on('scroll', function() {
		// 무료
		if($('.free_contents').length > 0){
			freePlay();
			fixValue();
		}
		// 유료
		if($('.charge_contents').length > 0){
			// db 없을때
			if($(this).scrollTop() > $('.section1').offset().top-$('.free_title').height()/2){
				setTimeout(function(){
					$('.btn_total').addClass('on').show();
				},1);
			}
			if($(this).scrollTop() > $('.section2').offset().top+100){
				$(".screen").addClass("on");
			}
			if($(this).scrollTop() > $('.section1').offset().top-$('.section3').height()/2){
				$('.mt_ratio').addClass('on');
				counting('monthPay',1300);
			}
			if($(this).scrollTop() > $('.section2').offset().top-$('.section1').height()/2){
				$(".chart_triangle").addClass("on");
			}
			fixValue();
		}
		// 사기 계좌조회
		if($('.liebank_contents').length > 0){
			$(".chart_triangle").addClass("on");
			if($(this).scrollTop() > $('.section1').offset().top-$('.liebank_top').height()){
				setTimeout(function(){
					$('.btn_total').addClass('on').show();
				},1);
			}
			if($('.btn_total').hasClass('on')){
				if($(this).scrollTop() == $('body').offset().top){
					$('.btn_total').removeClass('on').hide();
				}
			}
			if($(this).scrollTop() > $('.section2').offset().top-$('.section1').height()/2){
				$(".screen").addClass("on");
			}
			fixValue();
		}
		// 추천종목
		if($('.recStock').length > 0){
			var rsTop = $('.recStock').offset().top;
			if($(this).scrollTop() > rsTop - 150) {
				$('.recStock').addClass('arrived');
			}
		}
	}).trigger("scroll");
});

function slideRec(name) {
	var slide = new Swiper('.'+ name, {
		autoplay: {
			delay: 2000,
			disableOnInteraction: false,
		},
		setWrapperSize: true,
		speed: 1000,
		loop: true,
		slidesPerView: 'auto',
		centeredSlides: true,
		autoHeight: true,
		pagination: {
				el: '.swiper-pagination',
				clickable: true,
		},
	})
}

// 무료페이지 gage 애니메이션 팝업껐을때(팝업 있을때)
// function popupClose() {
// 	$('.testPopup').hide();
// 	setTimeout(function() {
// 		$('#header .titH').addClass('show');
// 		$('#header .rankList').addClass('show');
// 	},200);
// }

$(function(){
    $(window).on('scroll', function() {
        setTimeout(function() { // 팝업 없을때
            $('#header .titH').addClass('show');
            $('#header .rankList').addClass('show');
        },200);
        // 무료페이지 gage 애니메이션 scroll
        var compareList = $('.compare .compareList');
        if(compareList.length === 1) {
            var clBottom = (compareList.offset().top + compareList.height())/2;
            if($(this).scrollTop() > clBottom) {
                $(compareList).addClass('show');
            }
        }
        // 간편투자 메인 나의투자현황 고정
        if($(".stock_status").length > 0){
            if($(this).scrollTop() >= $(".stock_status").offset().top - $(".tab_type2").outerHeight()){
                $(".stock_status .wrap").addClass("ui_fix").css("top", $("#header").height()-1);
            }else{
                $(".stock_status .wrap").removeClass("ui_fix").removeAttr("style");
            }
        }
        // 하단 버튼 on off
        var $btmBtn = $(".btm_btn_area");
        if($btmBtn.length > 0){
            if($(this).scrollTop() > 10){
                $btmBtn.addClass("on");
            }else{
                $btmBtn.removeClass("on");
            }
        }
    }).trigger('scroll');
});

function popScroll() {
	$('#servIntro .popSec').on('scroll', function() {
		var popTop = $(this).scrollTop();
		if(popTop > 1) {
			$('#servIntro .elm .money').addClass('hide');
		} else {
			$('#servIntro .elm .money').removeClass('hide');
		}
	})
}

// 상단 알림메뉴
function switchHov() {
    var gnb = $('.gnb-menu');
    gnb.addClass('switchOn');
    $(gnb).click(function (e) {
        if (!$(gnb).find('ul').has(e.target).length) {
            gnb.removeClass('switchOn');
        }
    });
}