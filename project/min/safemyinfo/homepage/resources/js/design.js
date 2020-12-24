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
        $('html').removeClass("pc").addClass('mobile');
    } else {
        // console.log('pc');
        $('html').removeClass("mobile").addClass('pc');
        browsercheck();
    }
}
$(function() {
    chkDevive();

    if ($('#wrap').hasClass('sub')) {
        subSet();
    }
    ipFocus();
});





// toTop click
function gotoTop() {
    if ($('#wrap').hasClass('sub')) {
        $('html,body').animate({ scrollTop: 0 }, 350);
    } else if ($('html').hasClass('pc') && $(fullpage).length > 0) {
        $.fn.fullpage.moveTo(1);
    } else if ($('html').hasClass('mobile') && $(fullpage).length > 0) {
        $('html,body').animate({ scrollTop: $('#sec0').offset().top }, 350);
    }
    
}
// main nav click
function fullMove(idx) {
    if ($('html').hasClass('pc') && $(fullpage).length > 0) {
        $.fn.fullpage.moveTo(idx);
    }
    if ($('html').hasClass('mobile') && $(fullpage).length > 0) {
        $('html,body').animate({ scrollTop: $('#sec' + (idx - 1)).offset().top }, 350);
    }
    if ($('#rnb').hasClass('rnbOn')) {
        rnbHov();
    }
}
// rnb on,off
function rnbHov() {
    if ($('html').hasClass('pc') && !$('#wrap').hasClass('sub')) {
        // console.log('main pc');
        if ($('#rnb').hasClass('rnbOn')) {
            $('#rnb').removeClass('rnbOn');
            $.fn.fullpage.setAllowScrolling(true);
        } else {
            $('#rnb').addClass('rnbOn');
            $.fn.fullpage.setAllowScrolling(false);
        }
        
    } else if ($('html').hasClass('mobile') && !$('#wrap').hasClass('sub')) {
        // console.log('main mobile');
        if ($('#rnb').hasClass('rnbOn')) {
            $('#rnb').removeClass('rnbOn');
            $('html,body').removeClass('lock');
        } else {
            $('#rnb').addClass('rnbOn');
            $('html,body').addClass('lock');
        }
    } else if ($('#wrap').hasClass('sub')) {
        // console.log('sub');
        if ($('#rnb').hasClass('rnbOn')) {
            $('#rnb').removeClass('rnbOn');
            $('html,body').removeClass('lock');
        } else {
            $('#rnb').addClass('rnbOn');
            $('html,body').addClass('lock');
        }
    }
}

// 가입,해지 탭
function joinTab(tab) {
    $('.tabBtn').removeClass('now');
    $('.tabBtn.btn' + tab).addClass('now');
    $('.tabSec').removeClass('tabOn');
    $('#tab' + tab).addClass('tabOn');
    $('#tab' + tab).find('.chkWrap').addClass('checking');
}
// 팝업 on
function popupOn(pop) {
    $('#' + pop).addClass('popShow');
    if ($('html').hasClass('pc') && $(fullpage).length > 0) {
        $.fn.fullpage.setAllowScrolling(false);
    }
    if ($('html').hasClass('mobile') && $(fullpage).length > 0) {
        $('html,body').addClass('lock');
        scrollDisable();
    }
}
// 팝업 off
function popupOff(pop) {
    $('#' + pop).removeClass('popShow');
    if ($('html').hasClass('pc') && $(fullpage).length > 0) {
        $.fn.fullpage.setAllowScrolling(true);
    }
    if ($('html').hasClass('mobile') && $(fullpage).length > 0) {
        $('html,body').removeClass('lock');
        scrollAble();
    }
}

function scrollDisable() {
    $('html,body').on('touchmove', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
}
function scrollAble() {
    $('html,body').off('touchmove');
}


// 통신사선택
function choiceCom() {
    var target = event.target || event.srcElement;
    var comBtn;
    if(target.nodeName != 'SPAN') {
        comBtn =$(target);
    } else {
        comBtn = $(target).parents('button');
    }
    $('.tabOn .chkBtn button').removeClass('chked');
    // console.log(comBtn);
    $(comBtn).parents('.chkWrap').addClass('checking');
    $(comBtn).addClass('chked');
}
// input focus
function ipFocus() {
    var ip = $('.ipWrap input');
    ip.on({
        'focus': function() {
            var form = $(this).parents('.formWrap');
            $(form).find('.chkWrap').removeClass('checking');
        }
    })
}

// sub pc set
function subSet() {
    console.log('subSet');
    subScroll();
}
// sub scroll
function subScroll() {
    var headerH = $('#header').innerHeight();

    $(window).on('scroll', function() {
        if($('html').hasClass('pc')) {
            var left = $(this).scrollLeft() * -1;
            $('#header').css('left', left);
        }

        var wTop = $(this).scrollTop();
        if (wTop > headerH) {
            $('.toTop').addClass('visible');
        } else {
            $('.toTop').removeClass('visible');
        }
    })
}
// sub page
function pageChg() {
    var target = event.target || event.srcElement;
    var idxPage = $(target).text();
    // console.log(target, idxPage);
    $('.pageNum a').removeClass('now');
    $(target).addClass('now');
}
// faq tab
function faqTab(btn, num) {
    $('.faqBtn').removeClass('now');
    $(btn).parent().addClass('now');
    $('.faqList').removeClass('faqNow');
    $('#faq' + num).addClass('faqNow');
}
// faq toggle
function faqToggle() {
    var target = event.target || event.srcElement;
    var qnaT = $(target).parents('.qna');
    // console.log(target, qnaT);
    if (!$(qnaT).hasClass('answer')) {
        $('.qna').removeClass('answer');
        $(qnaT).addClass('answer');
    } else {
        $('.qna').removeClass('answer');
        $(qnaT).removeClass('answer');
    }
}