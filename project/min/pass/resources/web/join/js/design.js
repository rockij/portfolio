//Layer Popup
function layer_open() {
	$('html, body').css('overflow-y','hidden');
};
function layer_close() {
	$('html, body').css('overflow-y','');
	$('.ly_pop').hide();
}
