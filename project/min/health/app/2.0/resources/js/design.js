WebFont.load({
    google: {
        families: ['Noto Sans KR', 'Roboto']
    }
});

// 고정영역 간격
function fixValue(v){
    var t = $(".fix.top").innerHeight(),
        b = $(".fix.btm").outerHeight(),
        w = $("#wrap");
	if($(".fix.top").length > 0) {
        w.css("padding-top", t);
    }
    if($(".fix.btm").length > 0){
        w.css("padding-bottom", b);
    }
    if($(".fix.btm").hasClass("goOut")){
        $(".goOut").css("bottom",-b);
    }
}
function fixOver(){
    var fix = $('.fix.btm');
	if (fix.length) {
		var ctH = ctH();
		get();
	}
	$(window).on("resize scroll", function () {
        if (fix.length) {
            get();
            $('#wrap').css('padding-bottom','');
		}
	});
	function ctH() {
        $('body').height("auto");
        var ctH;
        ctH = $('body').height();
        // console.log(ctH);
		return ctH;
	}
	function get() {
        var win = $(window).height();
		if (win < ctH) {
            $("#wrap").addClass("ct-over");
            $('body').height("auto");
		}else{
            $("#wrap").removeClass("ct-over");
            $('body').height("100%");
		}
	}
}

// counting
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

// gsap setting
function gsapPlay(name){
    // main
    if(name === 'mainCard'){
        gsap.timeline({
            scrollTrigger: {
                trigger: ".gsap_box",
                start: "top center",
                end: "bottom top",
                // scrub: true,
                // markers: true,
                // pin: true
            }
        })
        .to(".gsap1", .75, {
            y: 0,
            delay: .1,
            opacity: 1,
            ease: "back.out(1.7)",
            onComplete: function() {
                counting('medi', 1000);
                $('.gsap1.top').addClass('on');
                $(window).on("scroll", function(){
                    if( $(this).scrollTop() <= 0 ){
                        $('.gsap1.top').addClass('on');
                    }else{
                        $('.gsap1.top').removeClass('on');
                    }
                });
            }
        })
        .to(".gsap2", .75, {
            y: 0,
            delay: -.5,
            opacity: 1,
            ease: "back.out(1.7)"
        })
        .to(".gsap3", .75, {
            y: 0,
            delay: -.5,
            opacity: 1,
            ease: "back.out(1.7)"
        })
        gsap.timeline({
            scrollTrigger: {
                trigger: ".gsap_box2",
                start: "top 60%",
                end: "bottom top",
                // markers: true,
                // pin: true
            }
        })
        .from(".gsap4", .5, {
            y: -30,
            opacity: 0,
            delay: 0,
            ease: "back.out(1.7)",
        })
        gsap.timeline({
            scrollTrigger: {
                trigger: ".gsap_box3",
                start: "top 70%",
                end: "bottom top",
                // markers: true,
                // pin: true
            }
        })
        .from(".gsap5", .5, {
            y: -30,
            opacity: 0,
            delay: 0,
            ease: "back.out(1.7)"
        })
    }
    // 헬스케어 상세1
    if(name === 'hcareDetail'){
        gsap.timeline({
            scrollTrigger: {
                trigger: ".gsap_box",
                start: "top center",
                end: "bottom top",
                // markers: true,
                // pin: true
            }
        })
        .from(".gsap1", .75, {
            y: -30,
            opacity: 0,
            delay: .55,
            ease: Expo.easeInOut
        })
        gsap.timeline({
            scrollTrigger: {
                trigger: ".gsap_box2",
                start: "top center",
                end: "bottom top",
                // markers: true,
                // pin: true
            }
        })
        .from(".gsap2", .75, {
            y: -30,
            opacity: 0,
            delay: -.2,
            ease: Expo.easeInOut
        })
    }
    // 헬스케어 상세2
    if(name === 'hcareDetail2'){
        gsap.timeline({
            scrollTrigger: {
                trigger: ".gsap_box",
                start: "top center",
                end: "bottom top",
                // markers: true,
                // pin: true
            }
        })
        .from(".gsap1", .75, {
            y: -30,
            opacity: 0,
            delay: .55,
            ease: Expo.easeInOut
        })
        gsap.timeline({
            scrollTrigger: {
                trigger: ".gsap_box2",
                start: "top bottom",
                end: "bottom bottom",
                // markers: true,
                // pin: true
            }
        })
        .from(".gsap2", .75, {
            y: -30,
            opacity: 0,
            delay: .75,
            ease: Expo.easeInOut
        })
        gsap.timeline({
            scrollTrigger: {
                trigger: ".gsap_box3",
                start: "top center",
                end: "bottom top",
                // markers: true,
                // pin: true
            }
        })
        .from(".gsap3", .75, {
            y: -30,
            opacity: 0,
            delay: 0,
            ease: Expo.easeInOut
        })
        gsap.timeline({
            scrollTrigger: {
                trigger: ".gsap_box4",
                start: "top center",
                end: "bottom top",
                // markers: true,
                // pin: true
            }
        })
        .from(".gsap4", .75, {
            y: -30,
            opacity: 0,
            delay: 0,
            ease: Expo.easeInOut,
            onComplete: function() {
                $('.map').addClass('on');
            }
        })
    }
}

// swipe setting
function swipeGroup(){
    headerTab = new Swiper('#headerTab', {
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: true
        },
        scrollbarHide: true,
        slidesPerView: 'auto',
        freeMode: false,
        grabCursor: true,
        init:false
    });
    analysisUse = new Swiper('#analysisUse', {
        pagination: {
            el: '.swiper-pagination',
        },
        noSwiping:true,
        init:false
    });
    bohumBefore = new Swiper('#bohumBefore', {
        pagination: {
            el: '.swiper-pagination',
        },
        autoHeight:true,
        init:false
    });
    healthMagazine = new Swiper('#healthMagazine', {
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false
        // },
        slidesPerView: 'auto',
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        init: true
    });
}

// gage 값넣기
function beltgage(){
    $.each($(".on .rating_belt .real"), function(i,v){
        var g = $(v).data('gage');
        $(v).css('width',g+"%").parent().find('.val').text(g);
	});
}

// 멈춰있던 데이터 시작
function scrollDataOn(){
    var hh = $('#header').height(),
        num = 300,
        data = $('.data_wrap section')
    ;
    $(window).scroll(function() {
        var scroll = $(this).scrollTop();//현재 스크롤탑 높이
        data.each(function(index) {
            //해당요소의 id를 얻어옵니다.
            var id = $(this).attr("id");
            //현재요소의 top
            var now = $(this).offset().top - hh - num;
            var flag = false;//이게 true면 on
            //false면 on제거
            if(index == data.length-1) {
                //마지막요소이기 때문에 마지막이 없습니다.
                flag = scroll >= now;
            }else {
                //그 다음요소의 top
                next = data.eq(index+1).offset().top - hh - num;
                flag = scroll >= now && scroll < next;
            }
            $menu = $("#"+id);
            if(flag) {
                $menu.addClass("on");
            }
        });
        if($("[id^=section]").hasClass("last")){
            if ($(window).scrollTop() >= $(document).height() - $(window).height() - 50) {
                $menu.addClass("on");
            }
        }
    }).trigger("scroll");
}

// 체크박스 버튼체크
function surveyCecking(id){
    var tar = $('#survey_step_'+id);
    tar.find(".checking input").on('change', function () {
        if(tar.find('.checkbox input:checked').length > 0){
            $(".skip button").attr('disabled',false);
        }else{
            tar.find(".skip button").attr('disabled',true);
        }
    });
}

// 건강분석
function analysisSurvey(){
    // aos only
    var ua = navigator.userAgent;
    if ( ua.match(/Android/i) ){
        $(".ipbx input").on('focus', function (e) {
            setTimeout(function() {
                $('html, body').scrollTop($(e.target).offset().top - 100);
            },250);
            return false;
        });
    }
    $('.skip a.disabled').click(function () { return false });
    // $(".checking input").on('change', function () {
    //     if($(this).parent().parent().find('.checkbox input:checked').length > 0){
    //         $(this).parent().parent().parent().next().find("button").attr('disabled',false);
    //     }else{
    //         $(this).parent().parent().parent().next().find("button").attr('disabled',true);
    //     }
    // });
    $(".smkcheck input").on('change', function () {
        if ($(this).prop('checked')) {
            var url = $(this).next().data('url'), a = $('.skip a');
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
            $(".skip button").attr('disabled',true);
        }else{
            // false
            // console.log('false');
            if($(this).val() > byte){
                alert($(this).data('mss2'));
                $(this).val('');
            }
            $(".skip button").attr('disabled',false);
        }
    });
    $("#smoke1 input").on('focus keyup', function () {
        var objs = $("#smoke1 input");
        for(var i=0; i < objs.length; i++ ){
            if(objs.eq(i).val() == ''){
                $(".skip button").attr('disabled',true);
                return false;
            }else{
                $(".skip button").attr('disabled',false);
            }
        }
    });
    $("#smoke2 input").on('focus keyuplur', function () {
        var objs = $("#smoke2 input");
        for(var i=0; i < objs.length; i++ ){
            if(objs.eq(i).val() == ''){
                $(".skip button").attr('disabled',true);
                return false;
            }else{
                $(".skip button").attr('disabled',false);
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

// 건강분석 결과
function analysisResult(){
    function values(){
        if($('.analysis_result [data-section="위험도2"]').hasClass('on')){
            counting('disease', 500, 2);
        }
        if($('.analysis_result [data-section="나이"]').hasClass('on')) counting('age', 500);
        if($('.analysis_result [data-section="생존률"]').hasClass('on')) counting('live', 500, 2);
        if($('.analysis_result [data-section="위험도비교"]').hasClass('on')) counting('curve', 1000, 2);
    }
    $(window).on("load", function(){
        values();
        beltgage();
    });
    $(window).on("scroll", function(){
        values();
        beltgage();
        if($(this).scrollTop() >= $('#section3').offset().top + 200){
            $('.analysis_result [data-section="위험도3"]').addClass('on');
        }
    });
}

// ready
$(function() {
    $.fn.extend({
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
        hasVerticalScrollBar: function () {
			return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0)
            || (this.prop("scrollHeight") > this.prop("clientHeight"));
        },
    });
    $(".ipdel input").inputDel();

    fixValue(); //고정영역 간격

    // top
    $(document).on('click', '.topGo', function(){
        var $body = $("body");
        $("html,body").animate({ 'scrollTop': $body.offset().top }, 350);
    });

    // 신청전 체크
    $(".list_toggle_belt").on("click", function(e){
        var $this = $(this).find('.tt');
        e.preventDefault();
        $this.siblings('.ttlst').slideToggle(150);
        setTimeout(function() {
            fixValue();
        },150);
    });

    // 헬스케어 검진센터 지도 맵
	$(".qnamap .map a[data-area]").on("click", function(e){
		e.preventDefault();
		$(".qnamap .areatip").removeClass("visible");
		$(this).next().addClass("visible");
	});
	$(".qnamap .map .close").on("click", function(){
		$(".areatip").removeClass("visible");
    });

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

    // 약관리스트 팝업 상세약관 열고닫기
    $(".terms_list .subchk .doc").on("click", function(){
        $(this).parent().toggleClass('on').next().slideToggle(150);
    });

    // 검색팝업 입력 검색어 리스트 노출
    var srchPop = $('.ly_search'),
        input = srchPop.find('.ipsrch input');
    input.on("focus keyup", function(){
        $('.ly_search .content').scrollTop(0);
        if ($.trim($(this).val()) == "" ) {
            $('.register').show();
            $('.keyword').hide();
        }else{
            $('.register').hide();
            $('.keyword').show();
        }
    });
    srchPop.find(".btn_prev").on("click", function(){
        input.val('');
        $('.register').show();
        $('.keyword').hide();
    });

    // 뉴스검색창
    var newBtn = $('.search_box .default .skip');
    newBtn.on("click", function(){
        $(this).parent().parent().addClass('open');
    });

    // scorll시 상단 고정
    if($('.fix.top').length > 0){
        var didScroll;
        var lastScrollTop = 0, delta = 10;
        var win = $(window);
        var hf = $('.fix.top'), hh = $('#header').outerHeight();
        var bg = $('body').css('background-color');
        win.on("scroll", function () {
            didScroll = true;
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
            if (st > hh-30){
                // Scroll Down
                hf.addClass('hurdle');
                if($('body').hasClass('type')){
                    hf.css({background:bg});
                }
            } else {
                if(st <= delta) {
                    hf.removeClass('hurdle');
                }
            }
            lastScrollTop = st;
        }
    }

});

// scroll
$(window).on("scroll", function(){
    if($('.fix.btm').hasClass('goOut')){
        if ($(this).scrollTop() <= $('html,body').offset().top){
            $('.goOut').removeClass('on');
        }else{
            $('.goOut').addClass('on');
        }
    }
    if($('.topGo').length > 0){
        if ($(this).scrollTop() > $('html,body').offset().top){
            $('.topGo').addClass('on');
        }else{
            $('.topGo').removeClass('on');
        }
    }
});

// load
$(window).on("load", function(){
    if($("html,body").hasVerticalScrollBar()){
        $("#wrap").append("<button type='button' class='topGo' title='맨위로'></button>");
    }
    if($('.fix.btm').length > 0){
        var _h = $('.fix.btm').outerHeight()+18;
        $('.topGo').css('bottom',_h);
    }
});

// 유료안내
function payJoin(){
    var swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
    });
    // 세로긴폰
    if( $(window).height() > 680 ){
        $('html').addClass('hw');
    }
}

// 올원뱅크
$(function() {
});