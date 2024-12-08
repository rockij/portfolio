// webfont down
// WebFont.load({
//     google: {
//         families: ['Noto Sans KR','Nunito Sans']
//     }
// });

// ready
$(function() {

    // alert(1);

    // module
    $.fn.extend({
        inputFocus: function() {
            var _input = $(this);
			_input.on("focus", function () {
                $(this).parent().addClass('focus');
			}).on("blur", function (e) {
                $(this).parent().removeClass('focus');
				if($(this).parent().children('textarea').length){
                    $(this).parent().addClass('textarea');
				}
				if(!$.trim($(this).val()) == "" ) {
                    $(this).parent().find('.lbl').hide();
                    setTimeout(function(){
                        $(e.target).parent().find("button.pen").show();
                    },250);
                }else{
                    $(this).parent().find('.lbl').show();
                }
            }).blur();
            _input.on("keyup", function () {
                if($.trim($(this).val()) == "" ) {
                    $(this).parent().find('.lbl').hide();
                }
            });
            $(this).parent().find("button.pen").on("click", function(){
                $(this).parent().find("input").trigger("change").focus();
			});
        },
        selectFocus: function() {
            var _input = $(this);
			_input.on("focus", function () {
                $(this).parent().removeClass('in');
                $(this).parent().addClass('focus');
			}).on("blur", function () {
				if(!$.trim($(this).val()) == "" ) {
                    $(this).parent().find('.lbl').hide();
                }else{
                    $(this).parent().find('.lbl').show();
                }
                $(this).parent().addClass('in');
            }).blur();
            _input.on("change", function () {
                $(this).parent().find('.lbl').hide();
                $(this).parent().addClass('in');
                if($(this).parent().hasClass('in') & $(this).parent().hasClass('focus')) {
                    $(this).parent().removeClass('in');
                }
            });
        },
        headerSelect: function() {
            var _input = $(this);

			_input.on("focus", function () {
                $(this).parent().addClass('focus');
			}).on("blur", function (e) {
                $(this).parent().removeClass('focus');
            }).blur();

            var arrowWidth = 19;

            _input.on("change", function () {
                var $this = $(this);
                var text = $this.find("option:selected").text();

                var $temp = $("<span>").html(text).css({
                    "font-size": $this.css("font-size"),
                    "visibility": "hidden"
                });
                $temp.appendTo($this.parent());

                var width = $temp.width();
                $temp.remove();
                $this.width(width+arrowWidth);
            }).change();
        },
        inputDel: function () {
            var _input = $(this);
			_input.on("focus keyup", function(){
				if ($.trim($(this).val()) == "" ) {
                    $(this).parent().find("button.del").hide();
				}else{
                    $(this).parent().find("button.pen").hide();
                    $(this).parent().find("button.del").show();
				}
			}).on("blur", function(e){
                setTimeout(function(){
                    $(e.target).parent().find("button.del").hide();
                },250);
            }).blur();
			$(this).parent().find("button.del").on("click", function(){
                $(this).hide().parent().find("input").val('').trigger("change").focus();
                $(this).parent().find('.lbl').show();
            });
        },
        // accorion
        toggleList: function () {
            $(document).on("click",".q", function(){
                if($(this).hasClass('on')){
                    $('li.a').slideUp(200);
                    $(this).removeClass('on');
                }else{
                    $('li.a').slideUp(200);
                    $('li.q').removeClass('on');
                    $(this).addClass('on').next().slideDown(200);
                }
            });
        },
        // scrollbar?
        hasVerticalScrollBar: function () {
			return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0)
            || (this.prop("scrollHeight") > this.prop("clientHeight"));
        },
    });
    $(".ip_line input, .ip_box input").inputFocus();
    $(".ip_line textarea, .ip_box textarea").inputFocus();
    $(".ip_line select, .ip_box select").selectFocus();
    $("#header .select_wrap select").headerSelect();
    $(".ip_del input").inputDel();
    $(".list_toggle").toggleList();

    // 고정영역 간격주기
    function fixValue(){
        var t = $(".fix.top").outerHeight(),
            b = $(".fix.btm").outerHeight(),
            w = $("#wrap");
        if($(".fix.btm").hasClass("goOut")){
            $(".goOut").css("bottom",-b);
        }
        w.css("padding-top", t);
        w.css("padding-bottom", b);
    }
    fixValue();

    // text copy
    $('.copytext').on("click", function(){
        $(this).prev().select();
        document.execCommand('copy');
        popupOpen('alert','mwf');
        setTimeout(function() {
            popupClose('alert','mwf');
        },1000);
    });

    // load
    $(window).on("load", function(){

        fixValue(); //고정영역 간격
        $("#header .select_wrap select").headerSelect(); //상단 헤더 셀렉트박스

        if($("html,body").hasVerticalScrollBar()){ //scrollbar?
        }

    });

    // resize
    $(window).on("resize", function(){
    });

    // scroll
    $(window).on("scroll", function(){
    });

});

// 가상의 bg
function virtualBg(){
    // alert(2);
    $('body').prepend('<span class="back"></span>');
    var topHeight = $('.fix.top').outerHeight();
    $('.back').css('top', topHeight );
    function progress(){
        var windowScrollTop = $(window).scrollTop();
        if(windowScrollTop < 0){
            $('.back').css('top', topHeight*2 + Math.abs(windowScrollTop) );
        }
    }
    progress();
    $(document).on('scroll', progress);
}
// virtualBg();

// 하단 고정영역 컨텐츠 겹침
function fixOver(){
    function over(){
        var win = $(window).height();
        var h = $(".fix.top").outerHeight();
        var b = $(".fix.btm").outerHeight();
        var c = $("#content").outerHeight();
        var m = h + c + b;
        var gap = win - m; // check
        if(gap >= 0) {
            $("html").removeClass("static");
        } else {
            $("html").addClass("static");
        }
    }
    over();
    $(window).on("resize", function(){
        over()
    });
}

// scorllmov header
function headHiding(ty){
    var clone = $('#content .clone').text();
    window.onscroll = function(){
        var currentScrollpos = window.pageYOffset;
        if(currentScrollpos >= $('.fix.top').height()){
            if(ty === 'hurdle'){
                $('.fix.top h1.clone').text(clone);
            }else if(ty === 'shrink'){
                $('.fix.top').addClass('shrink');
            }else if(ty === 'all'){
                $('.fix.top h1.clone').text(clone);
                $('.fix.top').addClass('shrink');
            }
        }else{
            if(ty === 'hurdle'){
                $('.fix.top h1.clone').text('');
            }else if(ty === 'shrink'){
                $('.fix.top').removeClass('shrink');
            }else if(ty === 'all'){
                $('.fix.top h1.clone').text('');
                $('.fix.top').removeClass('shrink');
            }
        }
        prevScrollpos = currentScrollpos;
    }
}

// scorllmov bottom-btn show
function scrollbtmOn(){
    $(window).on("scroll", function(){
        if($('.fix.btm').hasClass('goOut')){
            if ($(this).scrollTop() <= $('html,body').offset().top){
                $('.goOut').removeClass('on');
            }else{
                $('.goOut').addClass('on');
            }
        }
    });
}

// tab sliding indicator
function tabSliding(tar){
    var marker = $('.mark');
    var item = $('.tab_type a, .tab_type button');
    var interval = 14;
    item.on("click", function (e) {
        marker.css('opacity',1);
        item.removeClass('on');
        $(e.target).addClass('on');
        marker.css('left', $(e.target).offset().left+interval/2+"px" );
        marker.css('width', $(e.target).outerWidth()-interval+"px" );
    });
    item.eq(tar-1).trigger('click');
}

// counting
function counting(tar,delay){
    console.log(delay);
    var _this = $('.mcount_'+tar),
        per = _this.attr('per');
    _this.attr('per',0);
    setTimeout(function(){
        $({animatedValue:0}).animate({animatedValue:per},{
            duration: 1000,
            step: function(){
                _this.attr('per',Math.floor(this.animatedValue));
            },
            complete: function() {
                _this.attr('per',Math.floor(this.animatedValue));
            }
        });
    }, delay*1000);
}

// checkbox package
function chkingDefault(tar,count){
    var doc = $(document),
        item = $('#'+tar).find('.i_chk input'),
        total = $('#'+tar).find(item).length,
        iall = $('#'+tar).find('.i_all input');
    doc.on("change", '#'+tar+' .i_chk input', function () {
        var size = $('#'+tar+' .i_chk input:checked').length;
        if( count > 0){
            if(size === count){
                iall.prop("checked", true);
                $('#'+tar+'-btn button').prop("disabled", false);
            }else{
                iall.prop("checked", false);
                $('#'+tar+'-btn button').prop("disabled", true);
            }
        }else{
            if(size === total){
                iall.prop("checked", true);
                $('#'+tar+'-btn button').prop("disabled", false);
            }else{
                iall.prop("checked", false);
                $('#'+tar+'-btn button').prop("disabled", true);
            }
        }
    });
    doc.on('change', '#'+tar+' .i_all input', function () {
        if($(this).prop('checked')) {
            item.prop("checked", true);
            $('#'+tar+'-btn button').prop("disabled", false);
        }else{
            item.prop("checked", false);
            $('#'+tar+'-btn button').prop("disabled", true);
        }
    });
}
function chkinglst(id,option){
    function lup(){
        fixOverCount();
        lst.slideUp( "fast" );
    }
    function ldw(){
        fixOverCount();
        lst.slideDown( "fast" );
    }
    var doc = $(document),
        lst = $('#'+id).find('.clst');
    // 슬라이드 닫기
    if(option === 'lstClose'){
        lst.slideUp('fast')
    }
    // 전체동의
    doc.on('change', '#'+id+' .i_all input', function () {
        if($(this).prop('checked')) {
            $('#'+id).find('.stit.tog').addClass('on');
            if(option === 'slide'){
                lst.slideUp( "fast" );
            }else if(option === 'fixcheck'){
                lup();
            }
            $('.goOut').addClass('on');
        }else{
            $('#'+id).find('.stit.tog').removeClass('on');
            if(option === 'slide'){
                lst.slideDown( "fast" );
            }else if(option === 'fixcheck'){
                ldw();
            }
            $('.goOut').removeClass('on');
        }
    });

    // 입력창 focus시 활성화
    var iobjs = doc.find('#'+id+'-handle input'),
        body = $('html, body');
    iobjs.on("focus keyup", function () {
        var pos = $(this).offset().top / 2;
        body.animate({scrollTop : pos}, 250);
        fixOverCount();
        for(var i=0; i < iobjs.length; i++ ){
            if(iobjs.eq(i).val() == ''){
                $('#'+id).removeClass('on');
                $('#'+id+'-btn').removeClass('on');
                return false;
            }else{
                $('#'+id).addClass('on');
                $('#'+id+'-btn').addClass('on');
            }
        }
    });

    // 서브체크박스 toggle
    $('#'+id+' .tog').on("click", function () {
        $(this).toggleClass('on').next().slideToggle( "fast" );
    });
}
function checkCount(id,count){
    var tar = $('#'+id);
    $(document).on('change', '#'+id+' input', function () {
        if(tar.find('.checkbox input:checked').length >= count){
            $('#'+id+'-btn').addClass('must').find('.skip').attr('disabled',false);
        }else{
            $('#'+id+'-btn').removeClass('must').find('.skip').attr('disabled',true);
        }
    });
}
function checkCountReset(id){
    var tar = $('#'+id);
    tar.find('.checkbox input').prop('checked',false);
    $('#'+id+'-btn').removeClass('must').find('.skip').attr('disabled',true);
}

// slide package
function slideMaincar(){ // main top car
    var swiper = new Swiper('.main_carinfo', {
        initialSlide: 0,
        effect: 'fade',
        pagination: {
            el: '.swiper-pagination',
        },
        on: {
            slideChange: function(){
              var currentSlide = this.realIndex + 1;
            //   console.log("currentSlide is:" + currentSlide);
              document.querySelector('.swiper-counter .current').innerHTML = currentSlide;
            },
            paginationRender: function(){
              var totalSlides = document.getElementsByClassName('swiper-pagination-bullet').length;
            //   console.log("totalSlides: " + totalSlides);
              document.querySelector('.swiper-counter .total').innerHTML = totalSlides;
            }
          }
    });
}
function slideMycar(){ // my car top
    var swiper = new Swiper('.swiper-container', {
        initialSlide: 0,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
        },
    });
}
function slideEvent(){ // event slide
    var swiper = new Swiper('.event_card_info', {
        initialSlide: 0,
        pagination: {
            el: '.swiper-pagination',
        }
    });
}

// gsap package
function gsapPlay(name){
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
        .to(".gsap_under1", .5, {
            y: 0,
            delay: .1,
            opacity: 1,
            ease: "back.out(1.7)",
        })
        .to(".gsap_under2", .5, {
            y: 0,
            delay: -.3,
            opacity: 1,
            ease: "back.out(1.7)",
        })
        gsap.timeline({
            scrollTrigger: {
                trigger: ".gsap_box2",
                start: "top 70%",
                end: "bottom top",
                // markers: true,
                // pin: true
            }
        })
        .from(".gsap_top1", .5, {
            y: -30,
            opacity: 0,
            delay: 0,
            ease: "back.out(1.7)",
        })
        .from(".gsap_top2", .5, {
            y: -30,
            opacity: 0,
            delay: 0,
            ease: "back.out(1.7)",
        })
        .from(".gsap_top3", .5, {
            y: -30,
            opacity: 0,
            delay: 0,
            ease: "back.out(1.7)",
        })
    }
    if(name === 'eventCard'){
        gsap.timeline({
            scrollTrigger: {
                trigger: ".gsap_box",
                start: "top center",
                end: "bottom top"
            }
        })
        .to(".gsap_under1", .5, {
            y: 0,
            delay: .1,
            opacity: 1,
            ease: "back.out(1.7)",
        })
        .to(".gsap_under2", .5, {
            y: 0,
            delay: -.3,
            opacity: 1,
            ease: "back.out(1.7)",
        })
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".gsap_box2",
                start: "top 70%",
                end: "bottom top"
            }
        });
        $(".event_wrap").find(".list").find("li").each(function(idx){
            tl.from($(this), .4, {
                y: -30,
                opacity: 0,
                delay: 0,
                ease: "back.out(1.7)",
            })
        });
    }
}

// gsap popup
function popupOpenGsap(tar){
    popupOpen(tar,'mwf',0);
    TweenMax.to('#mw-'+tar+' .wrap', .35,{
        transform: "translateY(0)",
        ease: Power2.easeInOut,
        delay: 0
    });
}
function popupCloseGsap(tar){
    popupClose(tar,'mwf');
    TweenMax.to('#mw-'+tar+' .wrap', .25,{
        transform: "translateY(100vh)",
        ease: Power2.easeInOut,
        delay: 0
    });
}

// email autocomplete
function emailAuto(){    
    var domain = [
        "daum.net",
        "gmail.com",
        "hanmail.net",
        "hotmail.com",
        "nate.com",
        "naver.com"
    ];
    $("#email").autocomplete({
        open:function(){
            // console.log('open')
        },
        close:function(){
            popupCloseGsap('autoEmail');
            console.log('close')
        },
        source: function( request, response ) {
            var reqItem = request.term.includes("@") ?
                request.term.substr(request.term.lastIndexOf("@")+1) :
                request.term;
                var matcher = new RegExp ($ .ui.autocomplete.escapeRegex (reqItem), "i");
            response(domain.map( element => {
                return request.term.includes("@") ?
                matcher.test(element) && request.term.substr(0, request.term.lastIndexOf("@")+1) + element :
                request.term.endsWith("@") ?
                request.term + element :
                request.term + "@" + element;
            }));
            // console.log(reqItem);
            if(!reqItem){
                $("#email").blur();
                popupOpenGsap('autoEmail');
            }
        },
        appendTo: ".domain_list_wrap",
        classes: {
            "ui-autocomplete": "domain_list"
        }
    });
    // 직접입력
    $('.domain_direct').on("click", function(){
        popupCloseGsap('autoEmail');
        $("#email").focus();
    });
}

// os checking
var userOS;
var userOSver;
function getOS(){
    var ua = navigator.userAgent;
    var uaindex;
    // determine OS
    if ( ua.match(/iPad/i) || ua.match(/iPod/i) || ua.match(/iPhone/i) ){
        userOS = 'iOS';
        uaindex = ua.indexOf( 'OS ' );
    }else if ( ua.match(/Android/i) ){
        userOS = 'Android';
        uaindex = ua.indexOf( 'Android ' );
    }else{
        userOS = 'unknown';
    }
    // determine version
    if ( userOS === 'iOS'  &&  uaindex > -1 ){
        userOSver = ua.substr( uaindex + 3, 3 ).replace( '_', '.' );
        // alert(userOSver);
        if(userOSver < 10){
            $('html').addClass('dos');
        }
    }else if ( userOS === 'Android'  &&  uaindex > -1 ){
        userOSver = ua.substr( uaindex + 8, 3 );
        if(userOSver < 5.5){
            $('html').addClass('dos');
        }
    }else{
        userOSver = 'unknown';
    }
}
getOS(); // 단말기 OS 체크


/*========= sungwon127 working =========*/
$(document).on("click",".btn_tip",function(e){
    e.stopPropagation();
    var $tipWrap = $(this).parents(".page_tit_wrap").find(".tip_wrap"),
        tipTop = $(this).position().top + 31;
    $tipWrap.addClass("on").css({top:tipTop});
    $("#wrap").addClass("tipShow").on("click.tooptip",function(){
        $tipWrap.removeClass("on");
        $("#wrap").off("click.tooptip");
    });
});

function toast_open(ty) {
    popupOpen(ty,'mwf',0);
    setTimeout(function(){
        popupClose(ty,'mwf');
    },1000);
}
