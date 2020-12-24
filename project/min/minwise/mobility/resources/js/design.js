// 브라우저 확인
function chkDevive() {
    window.mobilecheck = function () {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);

        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            check = true;
        }
        return check;
    };
    window.browsercheck = function () {
        var agent = navigator.userAgent, match;
        var app, version;
        if((match = agent.match(/MSIE ([0-9]+)/)) || (match = agent.match(/Trident.*rv:([0-9]+)/))) app = 'Internet Explorer';
        else if(match = agent.match(/Chrome\/([0-9]+)/)) app = 'Chrome';
        else if(match = agent.match(/Firefox\/([0-9]+)/)) app = 'Firefox';
        else if(match = agent.match(/Safari\/([0-9]+)/)) app = 'Safari';
        else if((match = agent.match(/OPR\/([0-9]+)/)) || (match = agent.match(/Opera\/([0-9]+)/))) app = 'Opera';
        else app = 'Unknown';
        if(app !== 'Unknown') version = match[1];
        if( app == 'Internet Explorer' && version == 9 ){
            $('body').addClass('ie9');
        }
    };

    if (mobilecheck()) {
        // console.log('mobile');
        $('html').removeClass("pc").addClass('mobile');
    } else {
        // console.log('pc');
        $('html').removeClass("mobile").addClass('pc');
        browsercheck();
    }
}

// fullpage Setting
function fullPage(){
    $('#slideEx').slick({
        arrows: false,
        dots: true,
        fade: true,
        speed: 500,
        pauseOnHover: false,
        autoplay: true,
        autoplaySpeed: 5000
    });
    $('#slideHtw').slick({
        arrows: true,
        dots: true,
        fade: true,
        speed: 500,
        pauseOnHover: false,
        autoplay: true,
        autoplaySpeed: 4000
    });
    $('#slideCar').slick({
        infinite: true,
        arrows: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        centerMode: true,
        slidesToScroll: 1,
        variableWidth: true,
    });
    $("#fullpage").fullpage({
        licenseKey: '19FE016C-30EB4C18-85BD60E1-5FF8BCB9',
        // verticalCentered: false,
        autoScrolling: true,
        fitToSection: false,
        navigation: false,
        scrollOverflow: true,
        scrollOverflowReset: true,
		onLeave: function(index,slideIndex,nextIndex,direction){
            // alert(slideIndex);
            $(".about").removeClass("on");
            $(".gnb li").removeClass("selected");
            // $("header, #fp-nav").addClass('chg');
            $('.slick-wrapper').slick('slickGoTo', 0);
            $(".slick-wrapper").slick('slickPause');
            if(slideIndex == 1){
                $(".about").addClass("on");
                $(".btn_top").removeClass("on");
            }else if(slideIndex == 2){
                $(".gnb li:eq(0)").addClass("selected");
                $(".btn_top").addClass('on');
                $("#slideEx").slick('slickPlay');
                $(".partnerwork").removeClass("off").addClass("nexton");
            }else if(slideIndex == 3){
                $(".gnb li:eq(1)").addClass("selected");
                $(".btn_top").addClass('on');
                $("#slideHtw").slick('slickPlay');
                $(".partnerwork").removeClass("nexton");
            }else if(slideIndex == 4){
                $(".gnb li:eq(2)").addClass("selected");
                $(".btn_top").addClass('on');                
                $.fn.fullpage.reBuild();
            }
        },
        afterLoad: function (origin, destination, direction) {
            var hover = false;
            if (destination === 1) {
                MouseContact(hover);
            }
        }
    });
    // $.fn.fullpage.moveTo(4);
}
function MouseContact(hover) {
    $(".partnerwork .contact").on('mouseenter', function() {
        hover = true;
    });
    setTimeout(function () {
        if (!hover) {
            console.log('if', hover);
            $(".partnerwork").addClass("nexton");
        } else {
            console.log('else', hover);
            $(".partnerwork .contact").on('mouseleave', function () {
                // console.log('leave');
                if ($(".partnerwork").hasClass('off')) {
                    $(".partnerwork").addClass("nexton");
                }
            });
            hover = false;
        }
    }, 5000);

    return false;
}


// gnb
function gnbAnchor(tar){
    if ($('html').hasClass('pc') && $(fullpage).length > 0) {
        $.fn.fullpage.moveTo(tar);
    }else{
        $('html,body').animate({ scrollTop: $("#section"+tar).offset().top }, 350);
        $("#gnb").removeClass("show");
        $(".gnb_control").removeClass('on');
    }
    return false;
}
function gnbMenu(){
    var $win = $(window).width(), gnb = $("#gnb");
    gnb.css("right",-$win);
    $(".gnb_control").on("click", function(){
        gnb.toggleClass("show");
    });
    $('.gnb_control').on('click', function() { // 닫기
        $(this).toggleClass('on');
    });
}

// mobile scroll
function mbTarget(){
    // 멈춰있던 데이터 시작
    var headerHeight = $('#header').height(),
    wrapFix = $('.data_on_off'),
    prdDetail = $('.data_wrap section'),
    lstTabHeight = wrapFix.height() + 150;

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
                var next = prdDetail.eq(index+1).offset().top-headerHeight-lstTabHeight;
                flag = scroll >= now && scroll < next;
            }
            var $menu = $("#"+id);
            if(flag) {
                setTimeout(function() {
                    $menu.addClass("on");
                }, 1);
            }else {
                // $menu.removeClass("on");
            }
        });
    }).trigger("scroll");
}

function qnaHov() {
    var qnaBtn = $('.btn_qna');
    qnaBtn.on('click', function() {
        var target = event.target;
        if (target.nodeName != "A") {
            if (qnaBtn.hasClass('spread')) {
                qnaBtn.removeClass('spread');
            } else {
                qnaBtn.addClass('spread');
            }
        }
    });
    $(document).on('click', function() {
        var target = event.target;
        console.log(target);
        if (!$(target).hasClass('btn_qna') && !$(target).hasClass('qna_list') && !$(target).hasClass('qna_tit') && !$(target).hasClass('qna_link')) {
            qnaBtn.removeClass('spread');
        }
    })
}

$(function() {

    // number check
    function getTextLength(str) {
        var len = 0;    
        for (var i = 0; i < str.length; i++) {
            if (escape(str.charAt(i)).length == 6) {
                len++;
            }
            len++;
        }
        return len;
    }
    $(".numCheck").on("focus keyup", function(){
        if(getTextLength($(this).val()) == 11){
            $(this).parent().next(".user").attr("disabled", false);
        }else{
            $(this).parent().next(".user").attr("disabled", true);
        }
    });
    $("button.user").on("click", function(){
        $("li.cnum").show().find("input").focus();
    });

    setTimeout(function() {
        $(".about").addClass("on");
    }, 1);
    chkDevive();
    if ($('html').hasClass('pc') && $(fullpage).length > 0) {
        fullPage();
        $(".btn_top").on("click", function() {
            $.fn.fullpage.moveTo(1);
        });
    }else{
        gnbMenu();
        mbTarget();
        qnaHov();
        $(".btn_top").on("click", function() {
            $('html,body').animate({ scrollTop: 0 }, 350);
        });
        $('#slideEx').slick({
            initialSlide: 0,
            arrows: false,
            dots: true,
            fade: true,
            speed: 250,
            autoplay: false,
            autoplaySpeed: 5000
        });
        $('#slideHtw').slick({
            initialSlide: 0,
            arrows: false,
            dots: true,
            fade: true,
            speed: 250,
            autoplay: false,
            autoplaySpeed: 4000
        });
        $('#mslideCar').slick({
            infinite: true,
            arrows: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 5000,
            pauseOnHover: false,
            centerMode: true,
            slidesToScroll: 1,            
        });
        $(window).scroll(function() {
            if ($(this).scrollTop() > 0){
                $(".btn_top").addClass('on');
                $("#gnb").removeClass("show");
                $(".gnb_control").removeClass("on");
            }else{
                $(".btn_top").removeClass('on');
            }
            if($(".experience").hasClass("on")) $("#slideEx").slick('slickPlay');
            if($(".howtowork").hasClass("on")) $("#slideHtw").slick('slickPlay');
        }).trigger("scroll");
    }

});
