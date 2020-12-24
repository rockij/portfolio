$(function(){

    // select change color
    $('select.chgRed').on('change', function () {
        var $this = $(this);
        if ($this.val()) {
            $this.addClass('fc_red');
        } else {
            $this.removeClass('fc_red');
        }
    });

    // 고객센터 hover
    $(".snb .cs").hover(
        function(){
            $(this).addClass('open').find('ul').show();
        }, function(){
            $(this).removeClass('open').find('ul').hide();
        }
    );
    
    // tooltip
    $(".tooltip_handle").hover(
        function(){
            $(this).next().show();
        }, function(){
            $(this).next().hide();
        }
    );    

    // a disabled
    $('a.disabled').on('click', function () {
        return false;
    });

    // toggle button
    $('.handle_toggle button').on('click', function () {
        $(this).parent().toggleClass('open');
    });
    $('button.handle_toggle').on('click', function () {
        $(this).toggleClass('open');
    });

    // 펼치기
    $('.handle_fold').on('click', function () {
        $(this).toggleClass('open');
        $(this).parent().toggleClass('open');
    });
    
    // lnb
    $('.handle_lnb_menu').on('click', function () {
        $(this).parent().toggleClass('open');
    });
    $('.handle_lnb').on('click', function () {
        var li = $('.lnb .menu>li');
        $(this).toggleClass('open');
        $('.lnb').toggleClass('open');
        $('.lnbAll').toggleClass('open');
        $('.lnb.user').addClass('open');
        if($(this).hasClass('open')){
            $(this).text('메뉴접기');
        }else{
            $(this).text('메뉴펼침');
            li.removeClass('open');
        }
    });
    $('.handle_onoff').on('click', function () {
        $(this).toggleClass('on');
    });

});

// toggle show&hide
function showhideCont(id){
    var tar = $('#'+id);
    tar.toggle();
}

// popup
function layer_open(obj) {
	var $body = $("html, body"), temp = $("#mw-" + obj);
	$body.css("overflow", "hidden");
	temp.show();
}
function layer_close() {
	var $body = $("html, body");
	$body.css("overflow", "");
	$(".ly_pop").hide();
}