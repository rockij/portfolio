// 이벤트 상세
function replyFunc() {
    var area, lbl, send;
    area = $('.reBox textarea');
    lbl = $('.reBox label');
    send = $('.reBox .send');

    $.each($(area), function () {
        var offset = this.offsetHeight - this.clientHeight;

        var resized = function (el) {
            jQuery(el).css('height', 'auto').css('height', el.scrollHeight + offset);
        };

        $(this).on('keyup input', function () {
            resized(this);
            $("#wrap").css("padding-bottom", $('.submit').outerHeight());
            var val = $(this).val();
            if (!val) {
                lbl.show();
                send.prop('disabled', true);
            } else {
                lbl.hide();
                send.prop('disabled', false);
            }
        })
    });
}

// 매거진 padding-top
function setBnMagazine(height) {
    $('#wrap').css('padding-top', height);
    $(window).on('scroll', function() {
        var wTop = $(this).scrollTop();
        if(wTop > height) $('#header').hide()
        else $('#header').show()
    })
}

$(window).on("load", function() {
    var BnHeight = $('.mgDetail').innerHeight();
    if(BnHeight) setBnMagazine(BnHeight);
})