// swiper fn
function swirSet(){
    hitword = new Swiper('#hitword_swir', {
        initialSlide: 0,
        speed: 750,
        effect: 'fade',
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
        },
        init: false
    });
    latelyword = new Swiper('#latelyword_swir', {
        initialSlide: 0,
        pagination: {
            el: '.swiper-pagination',
        },
        init: false
    });
    categoryword = new Swiper('#category_swir', {
        initialSlide: 0,
        pagination: {
            el: '.swiper-pagination',
        },
        init: false
    });
    aimaintop = new Swiper('#aiMaintop_swir', {
        initialSlide: 0,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
        },
        init: false
    });
    aimaintop.on('slideChange', function () {
        $(".tag li").removeClass("on");
        $(".tag li:eq("+aimaintop.realIndex+")").addClass("on");
    });
    goodspush = new Swiper('#goodspush_swir', {
        initialSlide: 0,
        slidesPerView: 'auto',
        centeredSlides: false,
        freeMode: true,
        grabCursor: true,
        init: false
    });
    goodsbsket = new Swiper('#goodsbsket_swir', {
        slidesPerView: 'auto',
        centeredSlides: false,
        freeMode: true,
        grabCursor: true,
        init: false
    });
    magacont = new Swiper('#magazine_swir', {
        initialSlide: 0,
        slidesPerView: 'auto',
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            el: '#magazine_swir .swiper-pagination',
            clickable: true,
        },
        init: false
    });
    magacont2 = new Swiper('#magazine_swir2', {
        initialSlide: 0,
        slidesPerView: 'auto',
        pagination: {
            el: '#magazine_swir2 .swiper-pagination',
            clickable: true,
        },
        init: false
    });
    cardbn = new Swiper('#cardBaner', {
        initialSlide: 0,
        // autoplay: {
        // 	delay: 3000,
        // 	disableOnInteraction: false
        // },
        pagination: {
            el: '#cardBaner .swiper-pagination',
        },
        init: false
    });
    tabs = new Swiper('#tabSlide', {
        slidesPerView: "auto",
        spaceBetween: 0,
        freeMode: true,
        init: false
    });
}

// 로딩노출
function aiLoading(){
    aiSearchBack();
    $("#footer").hide();
    $("html, body").scrollTop(0);
    $("html, body").css("overflow","hidden");
    $(".tab_type").removeClass("hid");
    fixValue();
    $(".ai_srchfrm").addClass("loading");
}
// inputbox return
function aiSearchBack(){
    aiInput.val("");
    $("html, body").css("overflow","");
    $(".tab_type").removeClass("hid");
    $("#footer").show();
    fixValue();
    $("[class*='ai_']").removeAttr("style");
    $("[class*='ai_']").find('input').prop("checked", false);
    $(".ai_srchfrm").removeClass("start ing");
    $(".ai_category .btn_btm_more").removeClass("on");
    // 궁합시간표 swir reset
    if($(".ai_category .swiper-container").hasClass("swiper-container-horizontal")){
        categoryword.destroy();
    }
    if($("#goodsbsket_swir .swiper-slide").length > 0){
        $(".ai_nodata").hide();
    }
}
// 단어 전체삭제
function wordAllDel(tar){
    $("#"+tar).find("li").remove();
}

// ready
$(function() {

    // 최근검색어로
    function latelyWordGo(){
        $("#ct [class*='ai_']").removeAttr("style");
        $(".ai_srchfrm").removeClass("ing").addClass("start");
    }

    // 검색프로세스 설정
    aiInput = $(".ai_ipbox input"),
    aiIpDel = $(".input.del button.del"),
    aiWordDel = $(".w_del"),
    aichkRest = $(".btn_checkReset");
    function ai_ip_focus(){
        $("html, body").scrollTop(0);
        $(".ai_srchfrm").addClass("start");
        $(".ai_srchpop_close").show();
        $("#footer").hide();
        swirSet();
        if($("#latelyword_swir").length > 0){
            if(!$(".ai_srchfrm").hasClass("ing")){
                setTimeout(function(){ latelyword.init() },300);
            }
        }else if($("#category_swir").length > 0){
            $('.list_step1 .checkbox input').change(function() {
                categoryword.init();
                categoryword.slideNext();
            });
            categoryword.on('slideChange', function () {
                // console.log(this.activeIndex);
                if(this.activeIndex == 1) $(".ai_category .btn_btm_more").addClass("on");
                else $(".ai_category .btn_btm_more").removeClass("on");
            });
        }
        // 궁합시간표 height
        tab = $("#head .tab_type").height();
        topH = $("#head h1").height() + tab, n = 3;
        categoryH = $(window).height() - ( topH + $(".ai_ipbox").height()+ $(".ai_category h3").outerHeight() + n );
        latelyworH = $(window).height() - ( topH + $(".ai_ipbox").height() + $(".ai_latelyword h3").outerHeight() + $(".w_alldel").height() + n );
        $(".ai_category .iscroll").css("height", categoryH);
        $(".ai_latelyword .iscroll").css("height", latelyworH);
        $(".tab_type").addClass("hid");
        fixValue();
    }
    aiInput.on("focus", function(){
        ai_ip_focus();
    });
    aiInput.on("keyup", function(){
        if (!$.trim($(this).val()) == "" ) {
            $(".ai_srchfrm").addClass("ing");
            swirSet();
            if($(".ai_goodspush").length > 0){
                goodspush.init();
            }
        }else{
            latelyWordGo();
            ai_ip_focus();
        }
    });
    // aiInput.keydown(function(key) {
    //     if(key.keyCode == 13){
    //         aiLoading();
    //     }
    // });
    aiIpDel.on("click", function(e){
        e.preventDefault();
        latelyWordGo();
        ai_ip_focus();
    });
    aichkRest.on("click", function(e){
        e.preventDefault();
        $(this).parent().find("input").prop("checked", false);
    });
    aiWordDel.on("click", function(e){
        e.preventDefault();
        $(this).parent().remove();
    });
    $(".ai_srchpop_close").on("click", function(){
        $(this).hide();
        aiSearchBack();
    });

    // 비교함 오픈
    $(".btn_basket").on("click", function(){
        if($(this).attr("data-val") > 0){
            if($(this).hasClass("open")){
                $(this).removeClass("open");
                $(".ai_compare").removeClass("open");
                goodsbsket.destroy();
            }else{
                $(this).addClass("open");
                $(".ai_compare").addClass("open");
                swirSet();
                goodsbsket.init();
            }
        }else{
            alert("비교함에 제품이 없습니다.");
        }
    });
    $(".btn_basket").on("blur", function(){
        var _swir = $(this).parent().parent().parent();
        if($(this).attr("data-val") > 0){
            $(this).addClass("open");
            _swir.addClass("open");
            swirSet();
            goodsbsket.init();
        }
    }).blur();
    // 비교함 삭제
    $(".ai_compare .sbj .del").on("click", function(){
        $(this).parent().parent().parent().remove();
    });
    // 비교함 갯수 확인
    // var $cpechk = $(".ai_compare .checkbox input");
    // $cpechk.on('change', function () {
    //     var _count = $cpechk.filter(':checked').length;
    //     if(_count == 2){
    //         $cpechk.not(':checked').prop("disabled", true);
    //     }else{
    //         $cpechk.not(':checked').prop("disabled", false);
    //     }
    // });
    // 비교함 담기
    $(".cartbox button").on("click", function(){
        if($(".btn_basket").attr("data-val") > 0){
            $(this).addClass("open");
            $(".ai_compare").addClass("open");
            swirSet();
            goodsbsket.init();
        }else{
            alert("비교함에 제품이 없습니다.");
        }
    });

    // 원료 및 성분
    if($(".medilist").length > 0){
        var tar = $(".medilist ul").eq(0), count = tar.find(">li").length;
        if(count%2 == 0 ){
            tar.find("+ul").removeClass("even");
        }else{
            tar.find("+ul").addClass("even");
        }
    }

    // 가격 비교
    if( $(".ai_title3.price").length > 0 ){
        var n1 = $(".ai_title3.price .pot b").eq(0).data("price"),
            n2 = $(".ai_title3.price .pot b").eq(1).data("price"),
            tar = $(".ai_compare_coin");
        if(n1 > n2){
            tar.addClass("case1");
        }else if(n1 < n2){
            tar.addClass("case2");
        }else{
            tar.addClass("case3");
        }
    }

    // 메인 :: 핫키워드
    $(".ai_keyword .ai_tagbox a").on("click", function(){
        var _this = $(this).text();
        $(".tagip input").val(_this);
    });

    $(".icon_stamp").on("blur", function(){
        var wid = $(this).find("li").width()*$(this).find("li").length;
        $(this).parent().css("padding-right",wid+10);
    }).blur();

    // 회원가입 동의
    $(".joinchk_list .all input").on('change', function () {
        if($(this).prop("checked")) {
            $(".joinchk_list .checkbox input").prop("checked",true);
            $(".joinchk_list .skip button").attr('disabled',false);
            $(".joinchk_list pre").slideDown('fast');
        } else {
            $(".joinchk_list .checkbox input").prop("checked",false);
            $(".joinchk_list .skip button").attr('disabled',true);
            $(".joinchk_list pre").slideUp('fast');
        }
    });
    $(".joinchk_list .chk input").on('change', function () {
        var chk = $('.chk').length;
        if($('.chk input:checked').length == chk){
            $(".joinchk_list .all input").prop("checked",true);
            $(".joinchk_list .skip button").attr('disabled',false);
        }else{
            $(".joinchk_list .all input").prop("checked",false);
            $(".joinchk_list .skip button").attr('disabled',true);
        }        
    });
    $(".joinchk_list .checkbox input").on('change', function () {
        if ($(this).prop('checked')) {
            $(this).parent().next().slideDown('fast');
        }else{
            $(this).parent().next().slideUp('fast');
        }
    });
    
});

// scroll
$(window).scroll(function() {

    // 비교
    if($(".ai_databox").hasClass("on")){
        if($(".rating_graph").length > 0){
            counting('score1', 1000);
            counting('score2', 1000);
        }
    }

}).trigger("scroll");