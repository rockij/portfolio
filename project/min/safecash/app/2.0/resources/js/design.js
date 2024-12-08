// webfon down
WebFont.load({
    google: {
        families: ['Noto Sans KR', 'Roboto']
    }
});

// 상,하 고정 간격
function fixValue() {
    var hfix = $("#header.fix, .fix.top"),
        ffix = $("#footer.fix, .fix.btm");
    var hv = hfix.outerHeight(), fv = ffix.outerHeight();
    var lhv = $('.ly_pop.full header').outerHeight();
    // console.log(hfix, hv);
    // console.log(ffix, fv);
    if (hfix.length > 0){
        $("#wrap").css("padding-top", hv);
    }
    if (ffix.length > 0){
        $("#wrap").css("padding-bottom", fv);
        if($(".fix.btm").hasClass("goOut")) $(".goOut").css("bottom",-fv);
    }
    // 오픈약관
    if ($('.ly_terms').hasClass('open')){
        $('.ly_terms .content').css('padding-top',lhv);
    }
}
function fixValueOver(){
	var wrapFixed = $('.fix.btm');
	// $("#wrap").css("padding-bottom","");
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

// counting ani
function counting(num, speed) {
    // console.log(num);
    $('.count_' + num).each(function () {
        var $this = $(this),
            countTo = $this.attr('data-count');
        $({ countNum: $this.text() }).animate({
            countNum: countTo
        }, {
            duration: speed,
            easing: 'linear',
            step: function () {
                $this.text(Math.floor(this.countNum));
                if (!isNaN(Number($this.text())) && $this.text()) $this.text(Number($this.text()).toLocaleString().split('.')[0]);
            }, complete: function () {
                $this.text(this.countNum);
                if (!isNaN(Number($this.text())) && $this.text()) $this.text(Number($this.text()).toLocaleString().split('.')[0]);
            }
        });
    });
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

// tab section control
function tabSecHandle(tar){
    var idx = tar-1;
    $('.tab_type button, .tab_type a').removeClass('active');
    $('.tab_type2 button, .tab_type2 a').removeClass('active');
    $('.tab_type li:eq('+idx+') button, .tab_type li:eq('+idx+') a').addClass('active');
    $('.tab_type2 li:eq('+idx+') button, .tab_type2 li:eq('+idx+') a').addClass('active');
    $('[id^=section]').hide();
    $('#section'+tar).show();
    return false;
}

// check list
function chkinglst(id,a){
    var item = $('.i_chk input'), iall = $('#'+id).find(item).length;
    if(a == 1){
        // 전체선택
        $.each($('#'+id).find(item), function(i,v){
            $(v).prop("checked", true);
        });
        $('#'+id).find('.chkAll').hide();
        $('#'+id).find('.chkBack').show();
        $('#'+id).find('.btn_btm_end').css('height','auto').show();
        fixValue();
    }else if(a == 0){
        // 전체해제
        $.each($('#'+id).find(item), function(i,v){
            $(v).prop("checked", false);
        });
        $('#'+id).find('.chkBack').hide();
        $('#'+id).find('.chkAll').show();
        $('#'+id).find('.btn_btm_end').css('height',0).hide();
        fixValue();
    }
    if(a == 2){
        $('.chkAll input').on("change", function () {
            if($(this).prop('checked')) {
                item.prop("checked", true);
                $('#'+id).find('.btn_btm_end').attr('disabled', false);
            }else{
                item.prop("checked", false);
                $('#'+id).find('.btn_btm_end').attr('disabled', true);
            }
        });
        $('#'+id).find('.btn_btm_end').show();
        $('#'+id).find(item).on("change", function () {
            var size = $('#'+id+' .i_chk input:checked').length;
            // console.log(size);
            if(size == iall){
                $('.chkAll input').prop("checked", true);
                $('#'+id).find('.btn_btm_end').attr('disabled', false);
            }else{
                $('.chkAll input').prop("checked", false);
                $('#'+id).find('.btn_btm_end').attr('disabled', true);
            }
        });
    }
    if(a == 'reset'){
        $('#'+id).find('input').prop("checked", false);
        $('#'+id).find('.btn_btm_end').css('height','auto').show();
        $('#'+id).find('.btn_btm_end').attr('disabled', true);
        fixValue();
    }
    // 시작
    if(a == 'start'){
        $('#'+id).find(item).on("change", function () {
            var size = $('#'+id+' .i_chk input:checked').length;
            // console.log(size);
            if(size == iall){
                $('#'+id).find('.chkAll').hide();
                $('#'+id).find('.chkBack').show();
                $('#'+id).find('.btn_btm_end').css('height','auto').show();
            }else if(size > 0){
                $('#'+id).find('.btn_btm_end').css('height','auto').show();
            }else{
                $('#'+id).find('.chkAll').show();
                $('#'+id).find('.chkBack').hide();
                $('#'+id).find('.btn_btm_end').css('height',0).hide();
            }
            fixValue();
        });
        $('#'+id).find(".delBack").on("click", function () {
            $('.coupon_handle').removeClass('on');
            $('.coupon_handle').next().removeClass('delchkOpen');
            $('.delStart').show();
        });
    }
}

// check fix
function checkfix(name){
    if(name == "on"){
        $('input').prop("checked", true);
    }else if(name == "off"){
        $('input').prop("checked", false);
    }
}

$(function () {

    fixValue();// 즉시실행함수

    // fn
    $.fn.extend({
        inputFocus: function() {
			var $input = $(this);
			$input.focus(function(){
				$(this).parent().addClass('focus');
				$(this).parent().find(".unit").show();
			}).blur(function(){
				$(this).parent().removeClass('focus');
				$(this).parent().find(".unit").hide();
				if($(this).parent().children('textarea').length){
					$(this).parent().addClass('textarea');
				}
				if($(this).parent().children('.select_btn').length){
					var $slctwidth = $('.select_btn').width();
					$(this).parent().css("padding-left",$slctwidth);
					$(this).parent().find(".lbl").css("text-indent",$slctwidth);
				}
				if(!$.trim($(this).val()) == "" ) {
					$(this).parent().find(".unit").show();
				}
			}).change(function(){
				$(this).parent().removeClass('focus');
				if(!$.trim($(this).val()) == "" ) {
					$(this).parent().find(".unit").show();
				}
			}).blur();
        },
        placeholder: function () {
			var ip = $(".placeholder .i_text");
            $(".placeholder>label").css("position","absolute");
			ip.focus(function(){
				$(this).parent().find("label").css("visibility","hidden");
			}).blur(function(){
				if($(this).val() == ""){
					$(this).parent().find("label").css("visibility","visible");
				} else {
					$(this).parent().find("label").css("visibility","hidden");
					$(this).parent().addClass("active");
				}
			}).blur();
        },
        selectLabel: function (){
            console.log(1)
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
    $(".input input, .ipbx input").inputFocus();
    $(".placeholder").placeholder();
    $('.select_label select').on('change', function () {
        $(this).selectLabel();
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

    // calendar
    $(".btn_cal").click(function() {
		$(this).parent().find("input").datepicker("show");
		$(this).parent().addClass('focus');
    });

    // selectbox custom
    $('.select-line2 select').on('change', function () {
        var _this = $(this).children('option:selected'),
            name = _this.data("name"), num = _this.data("num");
        $(this).siblings('.label').find(".name").text(name);
        $(this).siblings('.label').find(".num").text(num);
    });

    // click focusing effect
	$('a.ef, button.ef').on({
		'touchstart' : function () { $(this).addClass('fake');},
		'touchend' : function () { $(this).removeClass('fake'); }
    });

    // 받은쿠폰 삭제시작
    $(".coupon_handle .delStart").on("click", function () {
        $(this).hide().parent().addClass('on');
        $(this).parent().next().addClass('delchkOpen');
    });

    // 안심알림 거래내역 은행선택
    $(".profile_bankselct .bank select, .profile_bankselct .select-line2 select").on("blur", function () {
        var size = $(this).find('option').length;
        if(size <= 1){
            $(this).attr('disabled', true);
        }
    }).blur();

});

// scroll
$(window).on("scroll", function () {

    // 하단버튼 움직임
    if($(this).scrollTop() > 30){
        $(".goOut").addClass('on');
    }else{
        $(".goOut").removeClass('on');
    }
    var $btmBtn = $(".btm_btn_area");
    if($btmBtn.length > 0){
        if($(this).scrollTop() > 10){
            $btmBtn.addClass("on");
        }else{
            $btmBtn.removeClass("on");
        }
    }

    // 추천종목
    if($('.recStock').length > 0){
        var rsTop = $('.recStock').offset().top;
        if($(this).scrollTop() > rsTop - 150) {
            $('.recStock').addClass('arrived');
        }
    }

    // 멈춰있던 데이터 시작
    var headerHeight = $('#header').height(),
    wrapFix = $('.data_on_off'),
    prdDetail = $('.data_wrap section'),
    lstTabHeight = wrapFix.height() + 200;
    var scroll = $(this).scrollTop();//현재 스크롤탑 높이
    prdDetail.each(function(index) {
        var id = $(this).attr("id");
        var now = $(this).offset().top-headerHeight-lstTabHeight;
        var flag = false;//이게 true면 on
        //false면 on제거
        if(index == prdDetail.length-1) {
            //마지막요소이기 때문에 마지막이 없습니다.
            flag = scroll >= now;
        }else {
            var next = prdDetail.eq(index+1).offset().top-headerHeight-lstTabHeight;
            flag = scroll >= now && scroll < next;
        }
        var $menu = $("#"+id);
        if(flag) {
            $menu.addClass("on");
        }else {
            // $menu.removeClass("on");
        }
    });

}).trigger('scroll');

// swipe :: 기본 가로 슬라이드
function swirHoriz(){
    var swiper = new Swiper('#swir_horiz', {
        slidesPerView: 'auto',
            centeredSlides: false,
            freeMode: true,
            grabCursor: true
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
// 기본 슬라이드
function swirSet(){
    marketPart = new Swiper('#marketPart', {
        slidesPerView: 'auto',
        spaceBetween: 7,
        loop: true,
        init: false
    });
    freeRagist = new Swiper('#freeRagist', {
        initialSlide: 0,
        pagination: {
            el: '.swiper-pagination',
        },
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        init: false
    });
    freeRagist.on('init slideChange', function() {
        if(freeRagist.realIndex == 2){
            setTimeout(function(){
                $(".checkbox-notice input").prop("checked", false);
            }, 2000);
        }
    });
}
// 갤러리 슬라이드
function swirGallery(){
    var thumb = $(".gallery-thumbs .swiper-slide").length;
    var count = thumb;
    // console.log(count);
    if(thumb <= 3){
        // 3개이하
        var galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 5,
            slidesPerView: "auto",
            slideActiveClass: "swiper-slide-thumb-active"
        });
        var galleryTop = new Swiper('.gallery-top', {
            autoHeight: true,
            thumbs: {
                swiper: galleryThumbs
            }
        });
    }else{
        /* 3개이상 무한루프 */
        var galleryTop = new Swiper('.gallery-top', {
            autoHeight: true,
            loop:true,
            loopedSlides: count,
        });
        var galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 5,
            slidesPerView: "auto",
            loop:true,
            loopedSlides: count,
            slideToClickedSlide:true,
            slideActiveClass: "swiper-slide-thumb-active",
            on: {
                slideChange: function() {
                    var activeSlide = $(".gallery-top").find('.swiper-slide').eq(this.activeIndex);
                    var conHeight = activeSlide.outerHeight();
                    $(".gallery-top").find(".swiper-wrapper").css("height",conHeight);
                }
            }
        });
        galleryTop.controller.control = galleryThumbs;
        galleryThumbs.controller.control = galleryTop;
    }
}
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
	// v4Slide('iiSlide'); // kt 효율화v4 테마토픽 슬라이드
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
// 자산 메인 touchmove
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
	if($(".assetsMain").length || $(".eyivstMain").length){
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