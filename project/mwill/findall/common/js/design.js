//Layer Popup
function layer_open(obj) {
    var temp = $('#' + obj);
    var bg = temp.parent().parent().find(".bg").hasClass('bg');

    if(bg) {
        $('body').css('overflow-y','hidden');
        temp.parent().parent().show();
        temp.parent().css('overflow-y','auto');
    }

    temp.find('.bt_pop_close').click(function(e){
        if(bg) {
            $('html, body, .ly_pop, .cont').removeAttr('style');
        }
        e.preventDefault();
    });

    temp.find('.bt_cancle').click(function(e){
        if(bg) {
            $('html, body, .ly_pop, .cont').removeAttr('style');
        }
        e.preventDefault();
    });
};

//지역신문 설정
$(function(){
    $("#areasetbtn").bind("touchmove click", function () {
        $("#setvw").slideToggle(0);
        $(this).children().toggleClass("active");
        return false;
    });
});

//지역 관심설정
$(function(){
    $("#areainter .tab a").bind("click", function () {
        $('.cityset').css('height', '0');
        $(this).parent().parent().next('.cityset').css('height', 'auto');
        return false;
    });

    $("#areainter .tab a").bind("click", function () {
        $('#areainter .cityset > div').hide();
        $('#areainter .tab a').removeClass();
        $(this).addClass('active');
        $('.clse').hide();
        $(this).children('.clse').show();
    });

    $("#areainter > .tab li:nth-child(1) a").bind("click", function () {
        $('#areainter .cityset > div:nth-child(1)').show();
    });

    $("#areainter > .tab li:nth-child(2) a").bind("click", function () {
        $('#areainter .cityset > div:nth-child(2)').show();
    });

    $("#areainter .tab .clse").bind("click", function () {
        $('.cityset').css('height', '0');
        $('#areainter .tab a').removeClass();
        $('.clse').hide();
        return false;
    });
});

//지점안내
$(function(){
    
    $(".shopdsk_htab li:first-child a").bind("touchmove click", function () {
        $(".shopdsk_htab li").removeClass('selected');
        $(this).parent().addClass('selected');
        $('#adBox').hide();
        $('#adLine').show();
        return false;
    });

    $(".shopdsk_htab li:last-child a").bind("touchmove click", function () {
        $(".shopdsk_htab li").removeClass('selected');
        $(this).parent().addClass('selected');
        $('#adBox').show();
        $('#adLine').hide();
        return false;
    });
});

//폰트크게&작게
$(function(){
    $("#fontBtn").bind("touchmove click", function () {
        $(this).toggleClass("fontP");
        var fontControl = $("#fontBtn");
        if (fontControl.hasClass("fontP")) {
            $("#txtControl").addClass('txBig');
            $("#txtControl").removeClass('txSmall');
            $(this).children("b").text("작게");
        } else {
            $("#txtControl").addClass('txSmall');
            $("#txtControl").removeClass('txBig');
            $(this).children("b").text("크게");
        }
    });
});