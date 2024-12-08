// 고정영역 간격주기
function fixValue(){
    var t = $(".fix.top").outerHeight(), b = $(".fix.btm").outerHeight();
    var lyt = $(".ly_pop .tophead2").outerHeight();
	if($(".fix.top").length > 0) $("#wrap").css("padding-top", t);
    if($(".fix.btm").length > 0) $("#wrap").css("padding-bottom", b);
    if($(".fix.btm").hasClass("goOut")) $(".fix.btm").css("bottom",-b);
    if($(".ly_pop.full").length > 0) $(".wrap").css("padding-top", lyt);
}
function fixValueOver(){
	var wrapFixed = $('.fix.btm');
	wrapFixed.insertAfter("#footer");
	if (wrapFixed.length) {
		var wrapHeight = fixedHeight();
		fixedBtn();
	}
	$(window).on("resize scroll", function () {
        if (wrapFixed.length) {
            fixedBtn();
            $('#wrap').css('padding-bottom','');
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

// swiper setting
function swirSet(){
    tab = new Swiper('#tabswir', {
        slidesPerView: "auto",
        // spaceBetween: 13,
        freeMode: true,
        init: false
    });
    my = new Swiper('#swir-my', {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
        },
        initialSlide: 0,
        init: false
    });
    horizon = new Swiper('#swir-horizon', {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
        },
        initialSlide: 0,
        init: false
    });
    mainSwir = new Swiper('#swir-main', {
        pagination: {
            el: '#swir-main + .swiper-pagination'
        },
        autoHeight: true,
        initialSlide: 0,
        init: false
    });
    mainSwirsub = new Swiper('#swir-mainsub', {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        autoHeight:false,
        initialSlide: 0,
        noSwiping:true,
        init: false
    });
    mainSwirfree = new Swiper('#swir-mainfree', {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        initialSlide: 0,
        init: false
    });
    mainSwirsub.on('slideChange', function () {
        if(mainSwirsub.realIndex == 4){
            mainSwirsub.autoplay.stop();
            setTimeout(function(){
                mainSwir.slideNext();
                mainSwirsub.slideTo(0);
            }, 3000);
        }
    });
    mainSwir.on('slideChange', function () {
        mainSwirsub.slideTo(0);
        if(mainSwir.realIndex == 0){
            mainSwirsub.autoplay.start();
        }
    });
    bn = new Swiper('#swir-bn', {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        initialSlide: 0,
        init: false
    });
}
function swirServie(){
    tabThumb = new Swiper('#tab-thumbs', {
        spaceBetween: 25,
        slidesPerView: "auto"
    });
    tabCont = new Swiper('#tab-content', {
        initialSlide: 0,
        autoHeight: true,
        thumbs: {
            swiper: tabThumb
        }
    });
    $('.swiper-slide').on('click', function () {
        tabThumb.slideTo(0);
    });
    $('.swiper-slide:eq(3), .swiper-slide:eq(4)').on('click', function () {
        tabThumb.slideTo(1);
    });
    tabCont.on('slideChange', function () {
        // console.log(tabCont.realIndex);
        if(tabCont.realIndex >= 3){
            tabThumb.slideTo(1);
        }
    });
}

// popup
function layer_close(opt){
    $("body").css("overflow","");
    if(opt == "btm"){
        $(".ly_pop.btm").removeClass("show");
    }else{
        $(".ly_pop, .ly_cpinfo_mw").hide();
    }
    window.onscroll=function(){};
}
function layer_open(obj,timer){
    var tar = $("#mw-"+obj);
    $("body").css("overflow","hidden");
    $('.scroll').scrollTop(0);
    setTimeout(function(){
        if(tar.hasClass("btm")){
            tar.addClass("show");
        }else{
            tar.show();
        }
    }, timer);
    // 영역 외 클릭 닫기
	$(".ly_pop").click(function(e){
        if(!$(this).hasClass('ndim')){
            if(!$('.ly_pop .wrap').has(e.target).length) {
                if($(this).hasClass("btm")){
                    $("body").css("overflow","");
                    $('[class*="ly"]').removeClass("show");
                    window.onscroll=function(){};
                }else{
                    layer_close();
                }
            }
        }
    });
    var x=window.scrollX, y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y)};
}

// 탭 컨텐츠 보기
function tabContView(n){
    var cont = $("[id^='contview']");
    var tab = $("#tab li:nth-child("+n+") button, #tab li:nth-child("+n+") a");
    cont.hide();
    $("#contview"+n).show();
    $("#tab button, #tab a").removeClass("active");
    tab.addClass("active");
    $('.tabtitle').text(tab.text());
}

// 주소검색 완료
function addrSrchEnd(){
    layer_close();
    var win = $('.ly_addrfrm'), ip = $('.ip_address .ip');
    ip.text($(window).find('.rsltlst .active button').text());
    $(window).find('.rsltlst li').removeClass('active');
    $(window).find('.result').hide();
    $(window).find('.ex').show();
    if(ip.height() > 40){
        ip.addClass('s');
    }
    $(".ip_address .del").show();
}

// tab section control
function tabSecHandle(tar){
    var idx = tar-1;
    $('.tab_type2 button').removeClass('active');
    $('.tab_type2 li:eq('+idx+') button').addClass('active');
    $('[id^=section]').hide();
    $('#section'+tar).show();
}
function tabDocHandle(tar,n){
    var idx = n-1;
    $('.ly_doc .tab button').removeClass('on');
    $('.ly_doc .tab li:eq('+idx+') button').addClass('on');
    $('.ly_doc pre').hide();
    $('.ly_doc #'+tar).show();
    console.log(idx)
}

// 실시간전파 탭 선택
function liveSpread(n){
    var t = $('.ly_real_agency'), idx = n-1;
    t.find('.tab_type2 button').removeClass('active');
    t.find('.tab_type2 li:eq('+idx+') button').addClass('active');
}

// ready
$(function() {

    fixValue();

    // a disabled
    $("a.disabled").on("click", function () { return false });

    // input focus
    $(".ip_dep input").on("focus", function () {
        $(this).parent().parent().parent().addClass('focus');
    }).blur(function(){
        $(this).parent().parent().parent().removeClass('focus');
    }).blur();

    // selectbox
    $('.select_type select').on('change', function () {
        var _this = $(this).children('option:selected'),
            name = _this.data("name"), num = _this.data("num");
        $(this).siblings('.label').find(".name").text(name);
        $(this).siblings('.label').find(".num").text(num);
    });
    $('select').on('blur change', function () {
        $(this).each(function () {
            var opt = $(this).val();
            if (!opt) $(this).removeClass("on");
            else $(this).addClass("on");
        });
    });

    // click effect
	$('a.fake, button.fake').on({
		'touchstart' : function () { $(this).addClass('on');},
		'touchend' : function () { $(this).removeClass('on'); }
    });

    // toggle
    var q = $(".toggle li.q"), a = $(".toggle li.a");
    q.on("click", function(){
        if(!$(this).hasClass("on")){
            q.removeClass("on");
            a.removeClass("open");
            a.filter(":visible").css("display", "none");
            $(this).addClass("on").next("li.a").css("display", "block");
        }else{
            $(this).removeClass("on");
            $(this).next("li.a").css("display", "none");
        }
    });

    // placeholder load
    $(".ipbx input").on("blur", function(e){
        if($.trim($(this).val()) == "" ) {
            $(this).removeClass('focus');
        }else{
            $(this).addClass('focus');
        }
    }).blur();

    // 입력란 삭제버튼
    $(".ip_del input").on("focus keyup blur", function(e){
        if ($.trim($(this).val()) == "" ) {
            $(this).parent().find(".del").hide();
        }else{
            $(this).parent().find(".del").show();
        }
    }).blur();
    $(".ip_del input").on("focusout", function(e){
        setTimeout(function(){ $(e.target).parent().find(".btn_del").hide(); }, 250);
    });
    $(".ip_del .del").on("click", function(e){
        e.preventDefault();
        $(this).hide().parent().find('.ip').val('').focusout();
        $(this).parent().find('.remain select').val('').removeClass('on');
        $('.ip_email .remain select').trigger('change');
    });

    // 이메일 직접입력
    $('.ip_email .remain select').on('change', function () {
        $(this).each(function () {
            var opt = $(this).val();
            if (opt == "direct"){
                $(this).parent().addClass("direct");
                $(this).prev("input").focus();
            }else{
                $(this).parent().removeClass("direct");
                $(this).prev("input").val("");
            }
        });
    });

    // 주소검색
    $('.ip_address .ip').on('click', function () {
        $(window).scrollTop(0);
        layer_open('address');
    });    
    $('.ly_addrfrm .ipbx input').on('focus', function () {
        $(this).parent().addClass('focus');
    }).blur(function(){
        $(this).parent().removeClass('focus');
    }).blur();
    $('.ly_addrfrm .rsltlst button').on('click', function () {
        $('.ly_addrfrm .rsltlst li').removeClass('active');
        $(this).parent().addClass('active');
    });
    // $('.ipbx input').on('focus', function () {
    //     $(".ip_address .ip").attr('disabled',true);
    // }).blur(function(){
    //     $(".ip_address .ip").attr('disabled',false);
    // }).blur();
    // input del
    $(".ip_address .del").on("click", function(e){
        e.preventDefault();
        $(this).hide().parent().find('.ip').text('');
        $('.ip_address ip').removeClass('s');
    });

    // gnb
    var win = $(window).width(), gnb = $("#gnb"), hd = $('#header');
    gnb.css("right",-win);
    $(".gnb_handle").on("click", function(){
        gnb.toggleClass("open");
        if(gnb.hasClass("open")){
            $("body").css("overflow","hidden");
            hd.css('z-index','10');
        }else{
            $("body").css("overflow","");
            setTimeout(function(){
                hd.css('z-index','');
            }, 350);
        }
        $.each($(".smenu a.n"), function(i,v){
            $(this).contents().wrap("<span class='inew2'></span>");
        });
        $.each($('.dep2'), function(i,v){
            if($(v).find('a').hasClass('n')){
                $(this).prev().contents().wrap("<span class='inew2'></span>");
            }
        });
    });
    // }).trigger('click');
    $('#gnb .smenu>li>a').on("click", function(){
        $('#gnb .smenu>li').removeClass('active');
        if($(this).hasClass('depOn')){
            $(this).parent().addClass('active');
            return false;
        }
    });
    $('.gnb_handle').on("click", function(e){
        $(this).toggleClass('open');
        e.preventDefault();
    }); 

});

// load
$(window).on("load resize", function () {
    fixValue();
    // gnb 처음에 보이는 문제
    setTimeout(function(){
        $('#gnb').show();
    }, 100);
});

// scroll
$(window).on("scroll resize", function () {    
    $(".goOut").addClass("on");
    if($(window).height() < $(document).height()){
        if($(".fix.btm").hasClass("goOut")){
            if ($(this).scrollTop() > 0){
                $(".goOut").addClass("on");
            }else{
                $(".goOut").removeClass("on");
            }
        }
    }
    if($('html').hasClass('lgu')){
        if($("#header").hasClass("fix top")){
            if ($(this).scrollTop() > 0){
                $("#header").addClass("shw");
            }else{
                $("#header").removeClass("shw");
            }
        }
    }
    // 멈춰있던 데이터 시작
    var headerHeight = $('#header').height(),
    wrapFix = $('.data_on_off'),
    section = $('.data_wrap section'),
    lstTabHeight = wrapFix.height() + 200;
    var scroll = $(this).scrollTop();//현재 스크롤탑 높이
    section.each(function(index) {
        var id = $(this).attr("id");
        var now = $(this).offset().top-headerHeight-lstTabHeight;
        var flag = false;//이게 true면 on
        //false면 on제거
        if(index == section.length-1) {
            //마지막요소이기 때문에 마지막이 없습니다.
            flag = scroll >= now;
        }else {
            var next = section.eq(index+1).offset().top-headerHeight-lstTabHeight;
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

// scorll시 상단 고정
var didScroll;
var lastScrollTop = 0, delta = 10;
var tf = $('.title_fix'), tfo = $('.title_fix_cover'), tt = tf.height();
var head = $('#header'), headHeight = head.outerHeight();
$(window).on("scroll", function () {
    if($('html').hasClass('app')){
        didScroll = true;
    }
}).trigger('scroll');
setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 1);
function hasScrolled() {
    var st = $(this).scrollTop();
    // delta값 이상으로 스크롤시
    if(Math.abs(lastScrollTop - st) <= delta) return;
    // 스크롤시 header 지나면 클래스 컨트롤
    if (st > headHeight-30){
        // Scroll Down
        tf.addClass('on');
        tfo.css('height',tt);
        head.removeClass('fup').addClass('hid');
        // console.log('down');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            tf.removeClass('on');
            tfo.removeAttr('style');
            head.addClass('fup').removeClass('hid');
        }
        // console.log('up');
        if(st <= delta) {
            tf.removeClass('on');
            tfo.removeAttr('style');
            head.removeClass('fup hid');
            fixValue();
        }
    }
    lastScrollTop = st;
}


function switchHov() {
    var gnb = $('.gnb_menu');
    gnb.addClass('switchOn');
    $(gnb).click(function (e) {
        if (!$(gnb).find('ul').has(e.target).length) {
            gnb.removeClass('switchOn');
        }
    }); 
}