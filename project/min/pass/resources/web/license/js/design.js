// webfont load
WebFont.load({
	google: {
		families: ['Open Sans','Roboto']
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
    } else {
        // console.log('pc');
        browsercheck();
    }
}

// popup
function layer_open(obj) {
	var $body = $("html, body"), temp = $("#" + obj), win = $(window).width();
	$body.css("overflow", "hidden");
  temp.show();
  if(win > 768){
    fullpageStop();
  }
}
function layer_close() {
	var $body = $("html, body"), win = $(window).width();
	$body.css("overflow", "");
  $(".ly_pop").hide();
  if(win > 768){
    $.fn.fullpage.setAllowScrolling(true);
  }
}

// lnb
function lnbClose(){
    $("header").removeClass("open");
}
function lnbClick(){
    if($("header").hasClass("open")){
        $("header").removeClass("open");
    }else{
        $("header").addClass("open");
    }
}
function lnbMv(sec) {
    var secTop = $('#' + sec).offset().top;
    if(sec == 'section1') {
        $('header').addClass('chg');
    } else {
        $('header').removeClass('chg');
    }
    $('html,body').animate({ scrollTop: secTop }, 500);
}

// fullpage Setting
function fullpageStop(){
	$.fn.fullpage.setAllowScrolling(false);
}

function fullPage(){
	$('#fullpage').fullpage({
        // verticalCentered: false,
		autoScrolling: true,
		fitToSection: false,
		navigation: false,
        scrollOverflow: true,
		onLeave: function(index,slideIndex,nextIndex,direction){
            $(".gnb")
                .removeClass('m2')
                .removeClass('m3')
                .removeClass('m4')
                .removeClass('m5')
            ;
            $('.vscroll').removeClass('chg');
            $('.section').removeClass('on');
            $('#section2')
                .find('.oclick').removeClass('go').show().end()
                .removeClass('m2 m3').addClass('m1')
            ;
            // console.log(slideIndex);
			if(slideIndex == 1){ // 서비스소개
                $("header").removeClass('chg');
                $(".btn_top").removeClass("on");
                $('#section1').addClass('on');
                $('.vscroll').removeClass('off');
                setTimeout(function() {
                    $('.vscroll').removeClass('off');
                }, 1700)
			}else if(slideIndex == 2){ // 등록안내
                $("header")
                    .addClass('chg').end()
                    .find('.gnb').addClass('m2')
                ;
                $('#section2').addClass('on');
                $(".vscroll").addClass('chg');
                $(".btn_top").addClass("on");
                $('.vscroll').removeClass('off');
                $('#section2 ol li').on('click', function(){
                    var id = $(this).index()+1;
                    $('#section2').removeClass ('on');
                    $('#section2').removeClass ('s1 s2 s3');
                    setTimeout(function() {
                        $('#section2').addClass('on s'+id);
                    }, 500);
                });
			}else if(slideIndex == 3){ // 이용안내
                $("header")
                    .addClass('chg').end()
                    .find('.gnb').addClass('m3')
                ;
                $('#section3').addClass('on');
                $(".vscroll").addClass('chg');
                $('#section3').find('.tab button:eq(0)').trigger('click');
                $('.vscroll').removeClass('off');
			}else if(slideIndex == 4){ // 다운로드
                $("header")
                    .addClass('chg').end()
                    .find('.gnb').addClass('m4')
                ;
                $(".vscroll").addClass('chg');
                $('.vscroll').removeClass('off');
			}else if(slideIndex == 5){ // 제휴문의
                $("header")
                    .removeClass('chg').end()
                    .find('.gnb').addClass('m5')
                ;
                $('.vscroll').addClass('off');
			}
		},
		afterRender: function(){
            // $.fn.fullpage.silentMoveTo(2);
        }
  });
}

function moScroll() {
    $(window).on('scroll', function(){
        var sTop = $(this).scrollTop();
        $("header").removeClass('chg');
        $("#section1").addClass("active");
        $(".btn_top").removeClass("on");
        $('.lnb li button').removeClass('active');
        $('.lnb li:eq(0) button').addClass('active');
        // 등록안내
        if(sTop > $("#section2").offset().top - 50){
            $("header").addClass('chg');
            $("#section2").addClass("active");
            $('.lnb li button').removeClass('active');
            $('.lnb li:eq(1) button').addClass('active');
            $(".btn_top").addClass("on");
            $('#section2 ol li').on('click', function(){
                var id = $(this).index()+1;
                $('#section2').removeClass ('active');
                $('#section2').removeClass ('s1 s2 s3');
                setTimeout(function() {
                    $('#section2').addClass('active s'+id);
                }, 500);
            });
        // 이용안내
        }if(sTop > $("#section3").offset().top - 50){
            $("#section3").addClass("active");
            $('#section3').find('.tab button:eq(1)').prop('disabled',false);
            $('.lnb li button').removeClass('active');
            $('.lnb li:eq(2) button').addClass('active');
            // 다운로드
        }if(sTop > $("#section4").offset().top - 50){
            $("#section4").addClass("active");
            $("header").addClass('chg');
            $('.lnb li button').removeClass('active');
            $('.lnb li:eq(3) button').addClass('active');
            // 제휴문의
        }if(sTop > $("#section5").offset().top - $("#section5").height()/2 || sTop > $("#section5").offset().top - 50){
            $("#section5").addClass("active");
            $("header").removeClass('chg');
            $('.lnb li button').removeClass('active');
            $('.lnb li:eq(4) button').addClass('active');
        }if(sTop <= 0){
            $('.vscroll').removeClass('off');
        }else{
            $('.vscroll').addClass('off');
        }
    }).trigger("scroll");
}

$(function(){

    chkDevive(); //브라우저 체크

    // section2 slide
    var s2slide = $('#section2 .mslide');
    s2slide.slick({
        dots: true,
        speed: 500,
        arrows: false,
        fade: true,
        cssEase: 'ease',
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false
    });
    $.each( $('#section2 ol li') , function(i,v){
        s2slide.find('.slick-slide:eq('+i+')>p').html( $(v).find('p').html() );
    });
    s2slide.find('.slick-slide:eq(0)').addClass('on');
    s2slide.on('afterChange', function(event, slick, currentSlide){
        // console.log(currentSlide);
        s2slide.find('.slick-slide:eq(0)').removeClass('on');
        if(currentSlide === 0){
            s2slide.find('.slick-slide:eq(0)').addClass('on');            
        }else if(currentSlide === 2){
            s2slide.slick('slickPause');
        }
    });
    s2slide.find('.slick-dots').on('click', function(){
        s2slide.slick('slickPlay');
    });

    // section3 tab
    $('#section3').find('.tab button').on('click', function(){
        var id = $(this).parent();
        $('#section3').removeClass('m1 m2');
        $('#section3').find('.tab button').prop('disabled',false);
        $(this).prop('disabled',true);
        if( id.index() === 1){
            // 온라인
            id.parent().addClass('b2');
            setTimeout(function() {
                $('#section3').addClass('m2');
            }, 10);
        }else{
            // 오프라인
            id.parent().removeClass('b2');
            setTimeout(function() {
                $('#section3').addClass('m1');
            }, 10);
        }
    });    

    // fullpage resize
    var win = $(window).width();
    var clear;
    var device = 'pc';

    fpageSet(win);
    function fpageSet(win){
        if(win < 768) {
            if(device == 'mo') {
                // $.fn.fullpage.destroy('all');
                // $('.vscroll').removeClass('off');
                location.reload();                
                // console.log('mo');
            }
            setTimeout(function() {
                moScroll();
            },100);
            device = 'pc';
        }else{
            if(device == 'pc') {
                clearTimeout(clear);
                device = 'mo';
                fullPage();
                clear = setTimeout(function() {
                    $.fn.fullpage.silentMoveTo(1);
                },10);
                $(".section").removeClass("active");
                $('#section1').addClass('on');
                // console.log('pc');
            }
        }
    }
    $(window).on('resize', function(){
        var win = $(window).width();
        fpageSet(win);
    });

    $(".btn_top").on('click', function(){
        if(device == 'mo') {
            $.fn.fullpage.moveTo(1);
        } else {
            $('html,body').animate({ scrollTop: 0 }, 500);
        }
    });

    // 공인인증서 복사
    $(".btn_copy button").on('click', function(e){
        $(".btn_top").addClass("on");
        $.fn.fullpage.moveTo(5);
    });

});

// x scroll 만들기
// windowResize();
function windowResize() {
	var bodyWidth = window.innerWidth;
	window.onresize = function() {
		bodyWidth = window.innerWidth;
		if(bodyWidth <= 1280) {
			setTimeout(function() {
				$('body').css('overflow-x', 'visible');
			}, 100)
		}
	}
	if(bodyWidth <= 1280) {
		setTimeout(function() {
			$('body').css('overflow-x', 'visible');
		}, 100)
	}
}