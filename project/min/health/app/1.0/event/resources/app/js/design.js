//Layer Popup
function layer_open(obj){
	var temp = $('#'+obj), $body = $("html, body");
	var bg = temp.parent().parent().find(".bg").hasClass('bg');
	if(bg){
		$body.css("overflow","hidden");
		temp.parent().parent().show();
	}
	temp.find('.popcls').on('click', function(e){
		if(bg) {
			$body.css("overflow","");
			temp.parent().parent().hide();
		}
		e.preventDefault();
	});
};
function layer_close(){
	$("html, body").css("overflow","");
	$('.ly_pop').hide();
}