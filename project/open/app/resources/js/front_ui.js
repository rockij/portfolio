var menuSpeed = 450;

function left_menu_click(event){
	if(event){
		try{
			event.stopPropagation();
			event.preventDefault();
		}catch(e){
		}
	}
	$('#lnb .lnb_cont').stop().animate({left:0}, menuSpeed);
	$('.dimd').fadeIn();
	$('.btn_close').css('display','block');
	$('body').addClass("noScroll");
	return false;
}

/* 전체메뉴 */
$(function(){
	/* LNB */

	var menuSlide = $('#lnb .lnb_cont').width();



// 	$('.btn_all_menu').click(function(event){
// event.stopPropagation();
// event.preventDefault();
// 		$('#lnb .lnb_cont').stop().animate({left:0}, menuSpeed);
// 		$('.dimd').fadeIn();
// 		$('.btn_close').css('display','block');
// 		$('body').addClass("noScroll");
// 		return false;
//     });
	$('.btn_close, .dimd').click(function(){
		$('#lnb .lnb_cont').stop().animate({left:-menuSlide}, menuSpeed);
		$('.dimd').fadeOut();
		$('.btn_close').css('display','none');
		$('body').removeClass("noScroll");
		return false;

    });

	var foldSpeed = 400;
	var foldHeight = 54;


});

/* 검색 */
$(function(){
	/* 검색 */

	var menuSlide = $('#lnb .lnb_cont').width();
	var menuSpeed = 450;

	$('.search_btn').click(function(){
		$('.main_search').stop().animate({right:0}, menuSpeed);
		return false;
    });
	$('.main_back').click(function(){
		$('.main_search').stop().animate({right:-menuSlide}, menuSpeed);
		return false;

    });

	var foldSpeed = 400;
	var foldHeight = 54;


});

/*** Popup ***/
$(function(){
	$('body').append('<div class=\"dimd\"></div>');
	var PopBg = $('.dimd');
	var PopBg02 = $('.dimd02');
	var PopHidden = $('body');
	var PopCont = $('.popup');
	var PopCont02 = $('.popup02');

	$('.btn_pop_open').click(function() {
		PopBg.fadeIn();
		PopHidden.css('height', $(window).height());
		var activePop = $(this).attr("href");
		$(activePop).fadeIn();
		$(activePop).css('margin-top', -($(activePop).find('.pop_area').innerHeight() /2));
		$(activePop).find('.pop_cont').css('max-height', $(window).height() - 180);
		$('body').addClass("noScroll");
		return false;
	});

	$('.btn_pop_open02').click(function() {
		PopBg02.fadeIn();
		PopHidden.css('height', $(window).height());
		var activePop = $(this).attr("href");
		$(activePop).fadeIn();
		$(activePop).css('margin-top', -($(activePop).find('.pop_area').innerHeight() /2));
		$(activePop).find('.pop_cont').css('max-height', $(window).height() - 180);
		$('body').addClass("noScroll");
	});



	$('.btn_pop_cl, .pop_close').click(function() {
		$(PopBg).fadeOut();
		$(PopCont).fadeOut();
		PopHidden.css('height', '100%');
		PopCont.removeClass('on');
		$('body').removeClass("noScroll");
		return false;
	});

	$('.btn_pop_close').click(function() {
		$(PopBg02).fadeOut();
		$(PopCont02).fadeOut();
		PopHidden.css('height', '100%');
		PopCont02.removeClass('on');
		return false;
	});


});




// 위로버튼
$(function () {
	  $("#cmTopScroll").click(function (){ $("html, body").animate({scrollTop:0}, 200); });
    $(window).scroll(function (){
	var top = $(document).scrollTop();
	if(top > 50){
     $("#cmTopScroll").stop().animate({"bottom":15}, 250);
        }else{
            $("#cmTopScroll").stop().animate({"bottom":-200}, 250);
        }
    });
});




// 헤더 픽스
$(window).scroll(
    function(){
	var index = 0;
	var winWidth = $(window).width();
        //스크롤의 위치가 상단에서
		if($(window).scrollTop() > 60){
    //    if($(window).scrollTop() > $('').eq(index).height()){
       /* if(window.pageYOffset >= $('원하는위치의엘리먼트').offset().top){ */
           $('.header .top_menu').addClass("scroll");
		   $('.coupon_tab').addClass("fix");
		   $('.sub_header.variable').css('display','block');
            //위의 if문에 대한 조건 만족시 fix라는 class를 부여함
       }else{
            $('.header .top_menu').removeClass("scroll");
			$('.coupon_tab').removeClass("fix");
           //위의 if문에 대한 조건 아닌경우 fix라는 class를 삭제함
        }
    }
)



// 헤더 픽스
$(window).scroll(
    function(){
	var index = 0;
	var winWidth = $(window).width();
        //스크롤의 위치가 상단에서
		if($(window).scrollTop() > 48){
    //    if($(window).scrollTop() > $('').eq(index).height()){
       /* if(window.pageYOffset >= $('원하는위치의엘리먼트').offset().top){ */
           $('.ing_barcode').addClass("up");
		   $('.sub_header.width').addClass("up");
		   $('.ing_barcode img').attr('src','../../resources/images/sub/img_barcodeing02.png');
            //위의 if문에 대한 조건 만족시 fix라는 class를 부여함
       }else{
            $('.ing_barcode').removeClass("up");
			$('.sub_header.width').removeClass("up");
			$('.ing_barcode img').attr('src','../../resources/images/sub/img_barcodeing.png');
           //위의 if문에 대한 조건 아닌경우 fix라는 class를 삭제함
        }
    }
)


// 헤더 픽스
$(window).scroll(
    function(){
	var index = 0;
	var winWidth = $(window).width();
        //스크롤의 위치가 상단에서
		if($(window).scrollTop() > 100){
    //    if($(window).scrollTop() > $('').eq(index).height()){
       /* if(window.pageYOffset >= $('원하는위치의엘리먼트').offset().top){ */
		   $('.tap_btn').addClass("up");
            //위의 if문에 대한 조건 만족시 fix라는 class를 부여함
       }else{
			$('.tap_btn').removeClass("up");
           //위의 if문에 대한 조건 아닌경우 fix라는 class를 삭제함
        }
    }
)


// 문화행사
$(function() {
    $('.calendar_box ul li').click(function() {
        $(this).addClass('on').siblings('li').removeClass('on')
    });
});




// 결제하기 2017-10-30일 추가
$(function() {
    $('.payment_box .pay_way ul li').click(function() {
        $(this).addClass('on').siblings('li').removeClass('on')
    });
});


// 회원정보입력탭
$(function() {
    $('.add_tab ul li').click(function() {
        $(this).addClass('on').siblings('li').removeClass('on')
    });
	$('.add_tab ul li.nn01').click(function(){
			$('.address_box01').show().siblings('.address_box').hide()
		})
	$('.add_tab ul li.nn02').click(function(){
			$('.address_box02').show().siblings('.address_box').hide()
		})
});





// 푸터 픽스 //
var body_top = 0;
$('document').ready(function(){
   $(window).scroll(function(){
      if(body_top >= $('body').scrollTop()|| $('body').height() - $('body').scrollTop() - $(window).height() == 0){
         $('.footer').css('display','block');
      }else{
         $('.footer').css('display','none');
      }
      body_top = $('body').scrollTop();
   });
});


$(function() {
    $('.comment').click(function() {
        $(this).parents().addClass('on');
    });
});



// 푸터 픽스 //
//var body_top = 0;
//$('document').ready(function(){
//   $(window).scroll(function(){

//   	if($('body').scrollTop() >= 20 && $('body').height() - $('body').scrollTop() - $(window).height() <= 30){
//   		$('.footer').css('display','none');
//   	}else{
//   		$('.footer').css('display','block');
//   	}
//      body_top = $('body').scrollTop();
//   });
//});



// 결제내역 //
//$(function() {
     //   $('.drop_box').click(function() {
  //          if ($(this).hasClass('target')) {
  //              $(this).removeClass('target').children('.st').slideUp()
 //           } else {
 //               $(this).addClass('target').children('.st').slideDown()
  //                  .parent('li')
   //                 .siblings('li').removeClass('target').children('.st').hide()
				//		$('html,body').animate({
				  //      scrollTop: $('.target').eq(0).offset().top
				 //   }, 'slow');
 //           }
  //      })
  //      if ($('.drop_box').hasClass('target')) {
  //          $('.drop_box.target').children('.st').show()
  //      } else {}
 //   })


// 결제내역 //
$(function() {
        $('.notice_box').click(function() {
            if ($(this).hasClass('target')) {
                $(this).removeClass('target').children('.st').slideUp()
            } else {
                $(this).addClass('target').children('.st').slideDown()
                    .parent('li')
                    .siblings('li').removeClass('target').children('.st').hide()
											$('html,body').animate({
				        scrollTop: $('.target').eq(0).offset().top
				    }, 'slow');
            }
        })
        if ($('.notice_box').hasClass('target')) {
            $('.notice_box.target').children('.st').show()
        } else {}
    })



$(function(){
    $(window).load(function() {
        // $('.slider').flexslider({
        //     initDelay: 0,
        //     slideshow: false,
        //     slideshowSpeed: 3000,
        //     animation: "slide",
        //     pauseOnHover: true,

        // });
    });
});



// 2018-07-17 메인 수정
$(function() {
    $('.section02 .title_tt').click(function() {
        $(this).parent().toggleClass('on');

		$('.section02 .card_box ul li').each(function(i, v) {
			$(v).children().children().css('margin-top', -($(v).children().children().height() / 2));
		});
    });
});


 $(function(){
	$('.section01 .card_box > ul > li > div > dl').each(function(i,v){
		$(v).css('margin-top', -($(v).innerHeight() /2));
		});
});


// 2019.05.23 js 추가부분
$(document).ready(function(){
	$('.title_icon').on('click', function(){
		$('.notice_popup, .popup_bg, body').addClass('on');
		return false;
	})
	$('.ntc_close').on('click', function(){
		$('.notice_popup, .popup_bg, body').removeClass('on');
		return false;
	})
})
// 2019.05.23 js 추가부분

// 2019.07.22 js 추가

// popup
function layer_close(opt){
	var $body = $("html, body");
    $body.removeAttr("style");
    if(opt == "btm"){
        $(".ly_pop.btm").removeClass("show");
        setTimeout(function(){
            $(".ly_pop.btm").css("z-index",-1).css("visibility","hidden");
        }, 350);
    }else{
        $(".ly_pop").hide();
    }
}
function layer_open(obj){
	var body = $("body"), temp = $("#mw-"+obj);
	body.css("height","100%");
    if(temp.hasClass("btm")){
        temp.addClass("show").css("z-index",99).css("visibility","visible");
        if(!temp.hasClass("nodis")){
            setTimeout(function(){ layer_close("btm"); }, 1000);
        }
    }else{
        temp.show();
    }
}
$(function(){
    $(".ly_pop.btm").blur(function(){
        var $obj = $(this).find(".ly_content"), $height = $obj.outerHeight();
        $(this).css({bottom:-$height}).css("visibility","hidden");
    }).blur();
    // 영역 외 클릭 닫기
	$(".ly_pop").click(function(e){
        if(!$(this).hasClass("full")){
            if(!$(this).find(".ly_content").has(e.target).length) {
                layer_close();
            }
        }
	});
});

// tab
function tabshow(set, tar){
    $('.'+set).hide();
    $('#'+tar).show();
}

// 은행선택
function bankSelectSwir(){
    bankselect = new Swiper('#swir-bankselect', {
        initialSlide: 0,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },
        init: false
    });
    $('.lst_txtcheck .checkbox input').change(function() {
        bankselect.init();
        bankselect.slideNext();
    });
}

$(function(){

    // fn
    $.fn.extend({
        ipDel: function () {
			$(".ipdel input").on("focus keyup", function(){
				if ($.trim($(this).val()) == "" ) {
                    $(this).parent().find(".ip_del").hide();
                    if($(this).parent().hasClass("ui-input-text")){
                        $(this).parent().parent().find(".ip_del").hide();
                    }
				}else{
                    $(this).parent().find(".ip_del").show();
                    if($(this).parent().hasClass("ui-input-text")){
                        $(this).parent().parent().find(".ip_del").show();
                    }
				}
			});
			$(".ipdel input").on("focusout", function(e){
                setTimeout(function(){ $(e.target).parent().find(".ip_del").hide(); }, 250);
                if($(this).parent().hasClass("ui-input-text")){
                    setTimeout(function(){ $(e.target).parent().parent().find(".ip_del").hide(); }, 250);
                }
			});
			$(".ipdel .ip_del").on("click", function(e){
				e.preventDefault();
				$(this).hide().parent().find('input').val('').focus();
			});
        },
    });
    $(".ipbox.ipdel input").ipDel();

    // load
    $(window).on("load", function(){
        // 고정영역 만큼 상하단 간격주기
        var ft = $(".fix.top").outerHeight(), fb = $(".fix.btm").outerHeight();
        if($(".fix.top").length > 0) $("#wrap").css("padding-top", ft);
        if($(".fix.btm").length > 0)
            $("#wrap").css("padding-bottom", fb);
            $("#gnb .iscroll").css("padding-bottom", fb);
            $(".topGo").css("margin-bottom", fb);
    });

    // scroll
    $(document).on("scroll", function(){
        var sTop = $(this).scrollTop(), _body = $("html,body");
        // 맨위로
        $(".topGo").on("click", function(){
            $("html,body").stop().animate({ 'scrollTop': _body.offset().top }, 350);
        });
        if(sTop > 0) $(".topGo").addClass("on");
        else $(".topGo").removeClass("on");
        // if($("#navbar").length > 0){
        //     var navH = $("#navbar").outerHeight();
        //     $(".topGo").css("margin-bottom", navH);
        // }
    }).trigger("scroll");

    // gnb
    var $win = $(window).width(), gnb = $("#gnb");
    gnb.css("right",-$win);
    $(".gnb_control").on("click", function(){
        gnb.toggleClass("show");
        if(gnb.hasClass("show")){
            $("html").addClass("noscroll");
        }else{
            $("html").removeClass("noscroll");
        }
    });
    gnb.find("a[class*='dep']").on("click", function(e){
        e.preventDefault();
        $(this).parent().toggleClass("open");
    });
    $('.gnb_control').on('click', function() { // 닫기
        $(this).toggleClass('on');
    });

    // tab    
    $('.tab_type2 button, .tab_type2 a').on('click', function() {
        $('.tab_type2 button, .tab_type2 a').removeClass("active");
        $(this).addClass("active");
    });
    $('.tab_type3 button, .tab_type3 a').on('click', function() {
        $('.tab_type3 button, .tab_type3 a').removeClass("active");
        $(this).addClass("active");
    });

    // box control    
    $('.toggle_next').on('click', function() {
        $(this).toggleClass("on").parent().parent().toggleClass("open");
    });
    $(".modify_bx").on('click', function() { // 편집
        var _this = $(this).parent().parent();
        _this.addClass("save");
        _this.find(".sortable").addClass("on");
        if(_this.find(".sortable").hasClass("on")){
            _this.find(".sortable").sortable();
            _this.find(".sortable").sortable({ handle: "[title='핸들']" });
            _this.find(".sortable").disableSelection();
            // $(".sortable").bind( "sortstop", function(event, ui) {
            //     $('.sortable').listview('refresh');
            // });
            _this.find(".sortable").sortable("enable");
        }
    });
    $(".modify_btn").on('click', function() { // 편집
        var _this = $(this).parent().parent();
        _this.addClass("modify");
    });
    $(".liDel").on('click', function() { // 삭제
        $(this).parent().remove();
    });

    // tooltip
    $('.tooltip .btn_del').on('click', function() {
        $(this).parent().hide();
    });

    // 지도맵
    var mapPoint = $(".maparea .pointbx .point");
    mapPoint.on('click', function() {
        $(this).next().toggle();
    });

    // 달력노출    
    $(".ip_calendar").on('click', function() {
        $(this).parent().find("input").datepicker("show");
    });

    // 기간설정    
    $(".dateset").on('click', function() {
        $(this).parent().next().toggleClass("on");
    });

});

// sortable reset
function uisort_reset(tar){
    $("#"+tar).removeClass("modify save").addClass("open");
    $('.toggle_next').removeClass("on");
    $(".sortable").sortable({ handle: "[title='핸들']" });
    if($("#"+tar).find(".sortable").hasClass("on")){
        $(".sortable").removeClass("on").sortable("disable");
    }
}