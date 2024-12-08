// fixtop scorll shadow
function contTopShwHandler() {
    var topEle = $('#wrap>.top');
    if(topEle.length < 1 || $('.brandWrap').length > 0 || $('.maplstView').length > 0 || $('.salesSubmit').length > 0 || $('.mgDetail').length > 0) {
        return false;
    } else {
        var topEleHeight = $(topEle).outerHeight();
        $(window).on('scroll', function() {
            var viewTop = $(this).scrollTop();
            if(viewTop > topEleHeight) $(topEle).addClass('scroll_shw');
            else $(topEle).removeClass('scroll_shw');
        })
    }
}

// nav top button show, hide
function topScrollHandler() {
    $(window).on('scroll', function () {
        var viewTop = $(this).scrollTop();
        if (viewTop > 0) {
            $('.topBtn button').addClass('visible')
        } else {
            $('.topBtn button').removeClass('visible')
        }
    })
}

// nav top button
function goTopHandler() {
    $('html,body').animate({ scrollTop: 0 }, 300);
}

// footer 사업자정보 버튼
function footerInfoMore(btn) {
    var footwrap = $(btn).parents('.footWrap');
    var viewTop = $(window).scrollTop();
    if($(footwrap).hasClass('moreInfo')) {
        $(footwrap).removeClass('moreInfo')
    } else {
        $(footwrap).addClass('moreInfo')
        $('html,body').animate({ scrollTop: viewTop + 100 }, 300);
    }
}

// 탭 슬라이드
function setTabSwiper() {
    var tabSlide = new Swiper('#tabTypeSlide', {
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        setWrapperSize: true,
        slidesPerView: "auto",
    });
}

// 컨텐츠탭 on,off
function onChgTabHandler(btn) {
    var actTab = $(btn).parents('.tabType');
    $(actTab).find('a').removeClass('active');
    $(btn).addClass('active');
    var tabType = $(btn).attr('data-tab');
    $('.tabDesc').removeClass('active');
    $('.tabDesc').removeClass('seeMore');
    $('#mainTabSlide .tabDesc .more').hide();
    $('.tabDesc.' + tabType).addClass('active');
}

// 일정변경 carousel
function ScheduleSwir(selector, count) {
    var itemHeight = $(selector).find('.slct_item').outerHeight()
    var schedule = new Swiper(selector , {
        direction: 'vertical',
        slidesPerView: count,
        centeredSlides: true,
        grabCursor: true,
        height: itemHeight * count,
        on: {
            slideChange: function() {
                var activeSlide = schedule.slides[schedule.activeIndex]
                // console.log(activeSlide)
            }
        }
    });
}
function calcSchedulerHeight(options) {
    var itemHeight = $(options.container).find('.slct_item').outerHeight()
    $(options.container).height(itemHeight * options.count)
}

// 허들 타이틀
function hurdleSc() {
    var hurdle = $('.hurdle').offset().top + $('.hurdle').height() - $('#header').height();
    $(window).on('scroll', function () {
        var top = $(this).scrollTop();
        if (top > hurdle) {
            $('.headWrap h1').removeClass('white');
            $('#header').removeClass('nobg');
        } else {
            $('.headWrap h1').addClass('white');
            $('#header').addClass('nobg');
        }
    });
}

// 약관&공지사항 상세타이틀
function detailScroll() {
    var title = $('.titWrap h3').text();
    $(window).on('scroll', function() {
        var top = $(this).scrollTop();
        if(top > 1) {
            $('.headWrap h1').removeClass('white');
            $('.headWrap h1').text(title);
        } else {
            $('.headWrap h1').addClass('white');
        }
    });
}
// 약관&공지사항 상세타이틀 -popup
function detailScrollPop() {
    $('.fuller').find('main').on('scroll', function() {
        var top = $(this).scrollTop();
        var title = $(this).find('h3').text();
        if(top > 1) {
            $('.headWrap h1').removeClass('white');
            $('.headWrap h1').text(title);
        } else {
            $('.headWrap h1').addClass('white');
        }
    });
}

// 문의내역 토글
function askToggle(btn) {
    var answer = $(btn).siblings('.a');
    $(answer).slideToggle();
}

// ipLine focus, blur
function focusipLine() {
    var ip = $('.ipLine input');
    ip.on({
        'focus': function() {
            var line, lbl, parent, valChange
            line = $(this).parents('.ipJoin');
            lbl = $(line).find('.ip + label');
            parent = $(this).parents('.inputVal');
            valChange = $(parent).find('input');
            $(lbl).hide();
            $(line).addClass('lineFocus');
            $(line).addClass('lineFocus');
            $(valChange).css("color","#222222");
        },
        'blur': function() {
            var line, lbl, parent, valChange
            line = $(this).parents('.ipJoin');
            lbl = $(line).find('.ip + label');
            parent = $(this).parents('.inputVal');
            valChange = $(parent).find('input');

            if(!$(this).val()) {
                $(lbl).show();
            } else {
                $(lbl).hide();
                next = $(line).next('.ipJoin');
            }
            $(line).removeClass('lineFocus');
            $(valChange).css("color","#666666");
        }
    })
}


/* ================================================ */

// 고정영역 간격
function fixValue(){
    var t = $(".fix.top").innerHeight(),
        b = $(".fix.btm").outerHeight(),
        w = $("#wrap");
	if($(".fix.top").length > 0) {
        w.css("padding-top", t);
    } else {
        w.css("padding-top", 0);
    }
    if($(".fix.btm").length > 0){
        w.css("padding-bottom", b);
    }
    if($(".fix.btm").hasClass("goOut")){
        $(".goOut").css("bottom",-b);
    }
    if($(".btm_btn_area").length > 0) {
        var b = $(".btm_btn_area"),
            h = b.find('.wrap').outerHeight();
        if( !b.find('.wrap').hasClass('off') ){
            b.css("height",h);
        }
    }
}
function fixValueOver(){
    var fix = $('.fix.btm');
	if (fix.length) {
		// var ctH = ctH();
		get();
	}
	$(window).on("resize scroll", function () {
        if (fix.length) {
            get();
            $('#wrap').css('padding-bottom', '');
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
        // $('body').height("auto");
        ctH = $('body').height();
        var win = $(window).height() - $(fix).outerHeight();
        // console.log(win, ctH);
		if (win < ctH) {
            $("#wrap").addClass("ct-over");
            $('body').height("auto");
		}else{
            $("#wrap").removeClass("ct-over");
            $('body').height("100%");
		}
	}
}
function fixOverPop(id){
    var tar = $('#mw-'+id), fix = tar.find('.fix.btm');
    
    tar.find('.content').css('padding-bottom',fix.height());
	if (fix.length) {
        var ctH = ctH();
		get();
	}
	$(window).on("resize scroll", function () {
        if (fix.length) {
            get();
        }
	});
	function ctH() {
        var ctH;
        ctH = tar.find('.content').outerHeight();
		return ctH;
	}
	function get() {
        var win = tar.height()-fix.height();
		if (win < ctH) {
            $(".wrap").addClass("fover");
		}else{
            $(".wrap").removeClass("fover");
		}
	}
}

// popup
function layer_close(opt){
    $('body').css("overflow","");
    if(opt == "btm"){
        $(".ly_pop.btm").removeClass("show");
    }else{
        $(".ly_pop").hide();
    }
    window.onscroll=function(){};
}
function layer_close_tar(obj){
    $('body').css("overflow","");
    var tar = $("#mw-"+obj);
    tar.find('.content').scrollTop(0);
    if(tar.hasClass('ndim')){
        tar.css('left','');
    }else{
        tar.hide();
    }
    window.onscroll=function(){};
}
function layer_open(obj,timer){
    var tar = $("#mw-"+obj);
    $('body').css("overflow","hidden");
    if(timer >= 0){
        setTimeout(function(){
            if(tar.hasClass("btm")){
                tar.addClass("show");
            }else{
                tar.show();
            }
        }, timer);
    }else{
        tar.show();
        if(tar.hasClass('ndim')){
            tar.css('left',0);
        }
        tar.find('.content').scrollTop(0);
    }
    var lft = tar.find(".head").innerHeight();
    setTimeout(function(){
        tar.find(".content").css("padding-top", lft);
    }, 10);
    // 영역 외 클릭 닫기
	$(".ly_pop").click(function(e){
        if(!$(this).hasClass('ndim')){
            if(!$('.ly_pop .wrap').has(e.target).length) {
                if($(this).hasClass("btm")){
                    $('body').css("overflow","");
                    $(".ly_pop.btm").removeClass("show");
                    window.onscroll=function(){};
                }else{
                    // console.log(obj);
                    layer_close_tar(obj);
                }
            }
        }
    });
    var x=window.scrollX, y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y)};
    focusipLine();
    inputSet();
    fixOverPop(obj);
}

// checkbox checking
function chkinglst(id){
    var item = $('.i_chk input'), iall = $('#'+id).find(item).length;
    $('.chkAll input').on("change", function () {
        if($(this).prop('checked')) {
            item.prop("checked", true);
        }else{
            item.prop("checked", false);
        }
    });
    $('.chkAll').on("click", function () {
        $('#'+id).find('.clst').slideDown( "fast" );
    });
    $('.chkAll input').on("blur", function () {
        $('.chkAll input').trigger('change');
    }).blur();
    $('.chkview').on("click", function () {
        $('#'+id).find('.clst').slideToggle( "fast" );
        $(this).toggleClass('on');
    });
    $('#'+id).find(item).on("change", function () {
        var size = $('#'+id+' .i_chk input:checked').length;
        if(size == iall){
            $('.chkAll input').prop("checked", true);
        }else{
            $('.chkAll input').prop("checked", false);
        }
    });
}

// 입력박스 설정
function inputSet(){
    // input focus
    var input = $('.ip_box input, .ip_box textarea, .ip_textarea textarea, .ipLine input');
    input.focus(function(){
        $(this).parent().addClass('focus');
    }).blur(function(){
        $(this).parent().removeClass('focus');
        if($(this).val() == ""){
            $(this).parent().find("label").show();
        } else {
            $(this).parent().find("label").hide();
        }
    }).change(function(){
        $(this).parent().removeClass('focus');
    }).blur();
    // 입력란 삭제버튼
    $(".ip_del input, .ip_del textarea").on("focus keyup", function(){
        if ($.trim($(this).val()) == "") {
            $(this).parent().find(".del").hide();
        } else {
            $(this).parent().find(".del").show();
        }
    });

    $(".ip_del .del").on("click", function(e){
        e.preventDefault();
        $(this).hide().parent().find('label').show();
        $(this).hide().parent().find('.ip').val('').focusout();
        $('.ip_request textarea').css('height', 'auto');
    });
    $(".ip_pw .eyes").off().on('click', function() {
        if($(this).hasClass('pwShow')) {
            $(this).removeClass('pwShow');
            $(this).parent().find('.ip').attr('type', "password");
        } else {
            $(this).addClass('pwShow');
            $(this).parent().find('.ip').attr('type', "text");
        }
    });
    // selectbox
    $('.select_type select').on('change', function () {
        var _this = $(this).children('option:selected'),
            name = _this.data("name"), num = _this.data("num");
        $(this).siblings('.label').find(".name").text(name);
        $(this).siblings('.label').find(".num").text(num);
    });
    $('select').on('change', function () {
        $(this).each(function () {
            var opt = $(this).val();
            var idx = this.value;
            if (!opt) $(this).removeClass("on");
            else $(this).addClass("on");
            if(idx) {
                if(idx != 0) {
                    $(this).addClass('slcted');
                } else {
                    $(this).removeClass('slcted');
                }
            }
            $('.ip_slct').removeClass('focus');
            $('.ip_slct').parent().find('.error').removeClass('show');
        });
    });
}

$(function() {
    if($('.topBtn').length > 0) {
        $('.topBtn').css({
            'bottom': $('.fix.btm').outerHeight() + 15,
            'right': $('#content').position().left + $('.topBtn').width() - 13
        })
        $(window).on('resize', function() {
            $('.topBtn').css({
                'bottom': $('.fix.btm').outerHeight() + 15,
                'right': $('#content').position().left + $('.topBtn').width() - 13
            })
        })
    }

    fixValue(); // 상단간격

    // 입력박스 설정
    inputSet();

    // a:disabled
    $("a.disabled").on("click", function () { return false });

    // click effect
	$('a.fake, button.fake').on({
		'touchstart' : function () { $(this).addClass('on');},
		'touchend' : function () { $(this).removeClass('on'); }
    });

    // header right padding
    var hrp = 0;
    $('#header h1 ~ a, #header h1 ~ .crangeBtn').each(function() {
        hrp += $(this).outerWidth();
    });
    $('.headWrap h1').css('padding-right',hrp + 10);
    if( $('#header .telGo').length > 0 ){
        var tgw = $('#header .telGo').width()-30;
        $('.headWrap h1').css('padding-right',hrp - tgw);
    }

    // 유의사항
    // $('.noticeList .title button').on('click', function () {
    //     var _this = $(this).parent().parent();
    //     _this.parent().parent().toggleClass('open');
    //     _this.find('.txtbx').slideToggle( "fast" );
    // });

    // 리뷰더보기
    $('.handle_reviewMore').on('click', function () {
        $(this).parent().toggleClass('open');
    });

    // 시승완료
    $('.handle_driveEnd').on('click', function () {
        $(this).prop('disabled', true);
        $('#endSkip').hide();
    });

    // 시승시 요청사항 textarea resize
    if($('.ip_request textarea').length > 0) {
        requestHeight();
    }
    function requestHeight() {
        $('.ip_request textarea, .ip_request input').on('focus', function () {
            $(this).parent().find('label').hide();
        });
        $('.ip_request textarea').on('keyup input', function () {
            this.style.height = "1px";
            this.style.height = (this.scrollHeight) + "px";
        });
    }

    // 리뷰더보기
    $('.handle_reviewMore p').on('blur', function () {
        if($(this).height() < 70){
            $(this).parent().find('.arr').remove();
        }
    }).blur();

    // 별점선택
    $('.ratingStar.button input').on("change", function () {
        var tar = $(this).parent().parent().find('>span'),
            v = $(this).val(),
            p = $(this).parent().parent().prev();
        tar.css('width', v+'0%');
        if(v%2 == 0){
            p.text(v/2+'.0');
        }else{
            p.text(v/2);
        }
    });

    // 태그선택
    $('.tagSelect li button').on("click", function () {
        $(this).toggleClass('selected');
    });

    // 태그삭제
    $('.tagDel').on("click", function () {
        $(this).parent().remove();
    });

    // scorll시 상단 고정
    if($('#headerFix').length > 0){
        var didScroll;
        var lastScrollTop = 0, delta = 10;
        var win = $(window);
        var hf = $('#headerFix'), hh = $('#header').outerHeight();
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
                hf.addClass('on');
                hf.css('top', -hh);
            } else {
                if(st <= delta) {
                    hf.removeClass('on');
                    hf.css('top', 0);
                }
            }
            lastScrollTop = st;
        }
    }

    // 수정&삭제 box
    $('.handle_modify').on("click", function () {
        $(this).parent().toggleClass('on');
    });

    // 세일즈 select
    $('.ip_slct select').on('focus', function() {
        var ipSlct = $(this).parents('.ip_slct');
        $(ipSlct).addClass('focus');
        $(ipSlct).parent().find('.error').addClass('show');
    });
    // 세일즈 input
    $('.salesSubmit .ip_box input').on('focus keyup', function() {
        var error = $(this).parents('li').find('.error');
        $(error).addClass('show');
    });
    $('.salesSubmit .ip_box input').on('blur', function () {
        var error = $(this).parents('li').find('.error');
        $(error).removeClass('show');
    });
    // 세일즈 checkbox
    chkBoxSet();
    function chkBoxSet() {
        var ipChk = $('.chkBox input[type="checkbox"]');
        $(ipChk).on('change', function () {
            var chkBox = $(this).parents('.chkBox');
            var error = $(chkBox).find('.error');
            if ($(this).prop('checked')) {
                $(error).addClass('checked');
            } else {
                $(error).removeClass('checked');
            }
        })
    }

    // fn
    $.fn.extend({

        // scrollbar?
        hasVerticalScrollBar: function () {
			return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0)
            || (this.prop("scrollHeight") > this.prop("clientHeight"));
        }

    });

    // 이미지 resizing
    $('.crop img').each(function() {
        var w = $(this)[0].naturalWidth,
            h = $(this)[0].naturalHeight;
        if( w > h){
            $(this).parent().addClass('w');
        }else if(w < h){
            $(this).parent().addClass('h');
        }
    });

    // 스크롤바 X
    if(!$("html,body").hasVerticalScrollBar()){
        //하단 버튼 show
        var b = $('.btm_btn_area'),
            bw = b.find('.wrap');
        if( bw.hasClass('off') ){
            bw.removeClass('on');
        }else{
            bw.addClass('on');
        }
    }else{
        $('html').addClass('auto');
    }

    // 시승신청 요구사항 펼치기
    $('.moreBtn').on('click', function() {
        $(this).removeClass('elip');
    })

});

// 체크박스 cheking
function ratingCheck(id,s){
    $('.handle_total').on("click", function () {
        var sum = 0;
        $('#'+id).find('.item .point').each(function() {
            sum += parseFloat($(this).text());
        });
        var avg =  sum / parseInt($('#'+id).find('.item .point').length);
        // console.log(Math.round(avg*10)/10);
        if(avg < 1){
            $('.ratingStar.total input:eq(0)').trigger('change'); //0.5
        }else if(avg < 1.5){
            $('.ratingStar.total input:eq(1)').trigger('change'); //1
        }else if(avg < 2){
            $('.ratingStar.total input:eq(2)').trigger('change'); //1.5
        }else if(avg < 2.5){
            $('.ratingStar.total input:eq(3)').trigger('change'); //2
        }else if(avg < 3){
            $('.ratingStar.total input:eq(4)').trigger('change'); //2.5
        }else if(avg < 3.5){
            $('.ratingStar.total input:eq(5)').trigger('change'); //3
        }else if(avg < 4){
            $('.ratingStar.total input:eq(6)').trigger('change'); //3.5
        }else if(avg < 4.5){
            $('.ratingStar.total input:eq(7)').trigger('change'); //4
        }else if(avg < 5){
            $('.ratingStar.total input:eq(8)').trigger('change'); //4.5
        }else if(avg == 5){
            $('.ratingStar.total input:eq(9)').trigger('change'); //5
        }
    });
    if(s == 'all'){
        $('.ratingStar.item input').trigger('change');
        $('.ratingStar.total input:eq(9)').trigger('change'); //5
    }
    $('#'+id).find('.item').on("click", function () {
        setTimeout(function(){
            $('.handle_total').trigger('click');
        }, 1);
    });
}

// 스크롤바 touch hide&show
function scrollDisable(){
    $('#wrap').on('scroll touchmove mousewheel', function (e) {
        if(!$('#content').has(e.target).length) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });
}
function scrollEnable(){
    $('#content').off('scroll touchmove mousewheel');
}

// 스클로바 target mov
function scrollMov(tar){
    var top = $(this).scrollTop(),
        sh = $(document).height();
    if(tar == 'btm'){
        $('html,body').animate({
            scrollTop : sh
        }, 350);
    }
}

// load
$(window).on("load", function () {
    contTopShwHandler(); // 컨텐츠탑 스크롤그림자
    fixValue(); //고정영역 간격
    chkDevive(); // 브라우저 체크

    // 배경색 설정
    if($('#wrap').hasClass('type')){
        $('body').addClass('type');
    }

    // 시승예약 리스트 id 셋팅
    // $.each($(".listThumcar>ul>li"), function(i,v){
    //     $(v).attr('id','list'+i);
    // });

});

// scroll
$(window).on("scroll", function () {

    var top = $(this).scrollTop(),
        hh = $('#header').innerHeight();

    // 하단고정버튼 show&hide
    if($('.btm_btn_area').length > 0){
        if(top > 10){
            $('.btm_btn_area .goOut').addClass('on');
            $('.btm_btn_area').parents('.btn_area_float').removeClass('trans');
        }else{
            $('.btm_btn_area .goOut').removeClass('on');
            $('.btm_btn_area').parents('.btn_area_float').addClass('trans');
        }
    }

    // 지도 메인
    if($('.maplstView').length > 0){
        var cat = $('.cmapList .bar').offset().top - hh;
        if($(this).scrollTop() >= cat){
            $('#header').addClass('barOn');
        }else{
            $('#header').removeClass('barOn');
        }
    }

});

// 브라우저 확인
function chkDevive() {
    window.mobilecheck = function () {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);

        if (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i)
        ) {
            check = true;
        }
        return check;
    };
    window.browsercheck = function () {
        var agent = navigator.userAgent,
            match;
        var app, version;
        if ((match = agent.match(/MSIE ([0-9]+)/)) || (match = agent.match(/Trident.*rv:([0-9]+)/))) app = 'Internet Explorer';
        else if (match = agent.match(/Chrome\/([0-9]+)/)) app = 'Chrome';
        else if (match = agent.match(/Firefox\/([0-9]+)/)) app = 'Firefox';
        else if (match = agent.match(/Safari\/([0-9]+)/)) app = 'Safari';
        else if ((match = agent.match(/OPR\/([0-9]+)/)) || (match = agent.match(/Opera\/([0-9]+)/))) app = 'Opera';
        else app = 'Unknown';
        if (app !== 'Unknown') version = match[1];
        if (app == 'Internet Explorer') {
            $('body').addClass('ie');
        }
        if (app == 'Internet Explorer' && version == 9) {
            $('body').addClass('ie9');
        }
    };

    if (mobilecheck()) {
        // console.log('mobile');
        $('html').removeClass("pc").addClass('mo');
        getOS();
    } else {
        // console.log('pc');
        $('html').removeClass("mo").addClass('pc');
        browsercheck();
    }        
}

// os 버전체크
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
        if(userOSver < 9){
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
