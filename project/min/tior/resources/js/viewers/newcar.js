// 신차체험권 리스트 토글
function experToggleHandler(btn) {
    var experWrap = $(btn).next();
    if(experWrap.length > 0) {
        $(btn).toggleClass('toggled');
        $(experWrap).slideToggle();
    }
}

// 신차체험권 토글
function togglePayment() {
    // 결제수단 토글
    $('.payment_choice button').on('click', function() {
        $('.payment_choice button').removeClass('choice');
        $(this).addClass('choice');
    })
    // 섹션 토글
    $('.payment_sec:not(.not_fold) .ico_toggle').on('click', function() {
        var section = $(this).parents('.payment_sec');
        if ($(section).hasClass('fold')) {
            $('.payment_sec').addClass('fold');
            $('.payment_sec:not(.not_fold) .spread_desc').slideUp();
            $(section).find('.spread_desc').slideDown();
            $(section).removeClass('fold');
        } else {
            $(section).find('.spread_desc').slideUp();
            $(section).addClass('fold');
        }
    })
}

// 신차체험권 input fix button issue
function newCarIpHandler() {
    var ipTitBox = $('.ipTitBox .ip');
    ipTitBox.on({
        "focus": function() {
            $('.fix.btm').css('position', 'static');
            $('#wrap').css('padding-bottom', '');
        },
        "blur": function() {
            $('.fix.btm').css('position', 'fixed');
            $('#wrap').css('padding-bottom', $('.fix.btm').height());
        }
    })
}