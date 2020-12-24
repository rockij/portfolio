body = $("html, body");

// 고정영역 간격주기
function fixValue(){
    var t = $(".fix.top").outerHeight(), b = $(".fix.btm").outerHeight(), lyt = $(".ly_pop .head").outerHeight();
	if($(".fix.top").length > 0) $("#wrap").css("padding-top", t);
    if($(".fix.btm").length > 0) $("#wrap").css("padding-bottom", b);
    if($(".ly_pop.full").length > 0) $(".wrap").css("padding-top", lyt);
    if($(".fix.btm").hasClass("goOut")) $(".goOut").css("bottom",-b);
}
function fixValueOver(){
	var wrapFixed = $('.fix.btm');
	$("#wrap").css("padding-bottom","");
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
}

// popup
function layer_close(opt){
    var back = $('body');
    back.css("overflow","");
    if(opt == "btm"){
        $(".ly_pop.btm").removeClass("show");
        setTimeout(function(){
            $(".ly_pop.btm").css("z-index",-1).css("visibility","hidden");
            $('.ly_pop .content').scrollTop(0);
        }, 350);
    }else{
        $(".ly_pop").hide();
    }
    window.onscroll=function(){};
}
function layer_open(obj,timer){
    var tar = $("#mw-"+obj), back = $('body');
    back.css("overflow","hidden");
    setTimeout(function(){
        if(tar.hasClass("btm")){
            tar.addClass("show").css("z-index",99).css("visibility","visible");
        }else{
            tar.show();
        }
    }, timer);
    // 영역 외 클릭 닫기
	$(".ly_pop").click(function(e){
        if(!$('.ly_pop .wrap').has(e.target).length) {
            if($(this).hasClass("btm")){
                if(!$(this).hasClass("nside")){
                    $(".ly_pop.btm").removeClass("show");
                    setTimeout(function(){
                        $(".ly_pop.btm").css("z-index",-1).css("visibility","hidden");
                        back.css("overflow","");
                        $('.ly_pop .content').scrollTop(0);
                    }, 350);
                    window.onscroll=function(){};
                }
            }else{
                if($(this).hasClass("nside")){
                    return false;
                }else{
                    layer_close();                    
                }
            }
		}
    });
    var x=window.scrollX, y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y)};
}
function layer_open_sim(obj,timer){
    var tar = $("#mw-"+obj), back = $('body');
    back.css("overflow","hidden");
    setTimeout(function(){
        if(tar.hasClass("btm")){
            tar.addClass("show").css("z-index",99).css("visibility","visible");
        }else{
            tar.show();
        }
    }, timer);
    // 영역 외 클릭 닫기
	$(".ly_pop").click(function(e){
        if(!$('.ly_pop .wrap').has(e.target).length) {
            if($(this).hasClass("btm")){
                if(!$(this).hasClass("nside")){
                    $(".ly_pop.btm").removeClass("show");
                    setTimeout(function(){
                        $(".ly_pop.btm").css("z-index",-1).css("visibility","hidden");
                        back.css("overflow","");
                        $('.ly_pop .content').scrollTop(0);
                    }, 350);
                }
            }else{
                if($(this).hasClass("nside")){
                    return false;
                }else{
                    layer_close();                    
                }
            }
		}
    });
}
$(function() {
    $(".ly_pop.btm").blur(function(){
        var obj = $(this).find(".wrap"), height = obj.outerHeight();
        if($(this).hasClass("ly_barcode")){
            height = $(window).height() * 2;
        }
        $(this).css({bottom:-height}).css("visibility","hidden");
    }).blur();
});

// 하단 배너 모션
function bn_btmcheck(name){
    if(name == "autoview"){
        body.css("overflow", "hidden");
        $(".bn_autoview").addClass("on");
        setTimeout(function(){
            fixValue();
            body.css("overflow", "");
        }, 1500);
    }
}

// counting ani
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

// swiper setting
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
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        // },
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
function swirGallery(){
    var thumb = $(".gallery-thumbs .swiper-slide").length;
    var count = thumb;
   
    if(thumb <= 3){
        // 4개이하
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
            spaceBetween:0,
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
        $('#'+id).find('.chkAll input').on("change", function () {
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
                $('#'+id).find('.chkAll input').prop("checked", true);
                $('#'+id).find('.btn_btm_end').attr('disabled', false);
            }else{
                $('#'+id).find('.chkAll input').prop("checked", false);
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
            console.log(size);
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

// ready
$(function() {
    fixValue();

    // 받은쿠폰 삭제시작
    $(".coupon_handle .delStart").on("click", function () {
        $(this).hide().parent().addClass('on');
        $(this).parent().next().addClass('delchkOpen');
    });

    // input focus
    $(".ipbx input").on("focus", function () {
        $(this).parent().addClass('focus');
    }).blur(function(){
        $(this).parent().removeClass('focus');
    }).blur();

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

    // coupon download >> disabled
    $('.list_coupon>li>button.cdown').on('click', function () {
        $(this).attr("disabled", "disabled");
    });

    // 멈춰있던 데이터 시작
    var headerHeight = $('header').height(),
    wrapFix = $('.data_on_off'),
    prdDetail = $('.data_wrap section'),
    lstTabHeight = wrapFix.height() + 200;

    $(window).scroll(function() {
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
    }).trigger("scroll");

});

// load
$(window).on("load", function () {

    fixValue();

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

    // 하단 버튼 on off
    var $btmBtn = $(".btm_btn_area");
    if($btmBtn.length > 0){
        if($(this).scrollTop() > 10){
            $btmBtn.addClass("on");
        }else{
            $btmBtn.removeClass("on");
        }
    }

});

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


