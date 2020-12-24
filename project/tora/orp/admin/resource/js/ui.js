$(function(){

    $.fn.extend({
        file: function (options) {
            var fileTarget = $('.filebox .upload_hidden');
            fileTarget.on('change', function(){
                if(window.FileReader){
                    var filename = $(this)[0].files[0].name;
                } else {
                    var filename = $(this).val().split('/').pop().split('\\').pop();
                }
                $(this).siblings('.upload_name').val(filename);
            });
        },
     });

    // gnb
    $("#gnb").hover(
        function(){
            $(".submenu").show();
        }, function(){
            $(".submenu").hide();
        }
    );

    // tab
    $(".tabchg a, .tabchg button").on('click', function (e) {
        e.preventDefault();
        if($(this).parent().prop('tagName') == 'LI'){
            $(".tabchg li").removeClass('active');
            $(this).parent().addClass('active');
        }else{
            $(".tabchg a, .tabchg button").removeClass('active');
            $(this).addClass('active');
        }
    });

    //전체선택
    $(".chkAll").click(function(){
        if($(".chkAll").prop("checked")) {
            $("input[type=checkbox]").prop("checked",true);
        } else {
            $("input[type=checkbox]").prop("checked",false);
        }
    });

    // 연도선택 팝업
    $(".year_list button").click(function(){
        var val = $(this).text();
        $('.handle_yearslct').text(val);
    });
    
    $('.filebox').file(); //파일첨부

});

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