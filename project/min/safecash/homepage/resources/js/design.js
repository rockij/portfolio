// webfont load
WebFont.load({
	google: {
		families: ['Open Sans','Roboto']
	}
});

// 브라우저 확인
$(function(){
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
});

// setting fn
$(function(){
	$.fn.extend({
		inputFocus: function () {
			var input = $('.input input, .input textarea');
			input.focus(function(){
				$(this).parent().addClass('focus');
			}).blur(function(){
				$(this).parent().removeClass('focus');
				if($('.input').children('textarea').length){
					$('.input textarea').parent().addClass('textarea');
				}
			}).change(function(){
				$(this).parent().removeClass('focus');
			}).blur();
		}
	});
});

// animation counting
function counting(name,speed){
	$('.count_'+name).each(function() {
		var $this = $(this), countTo = $this.attr('data-count');
		var comma = $.animateNumber.numberStepFactories.separator(',');
		$('.count_'+name).stop().animateNumber({
			number: countTo,
			numberStep: comma,
			easing: 'easeInQuad'
		}, speed );
	});
};
function countingReset(){
	$('.count').animateNumber({
		number: 0
	}, 0);
};
function countPlay(){
	counting('balance', 1000);
	counting('hit', 1000);
	counting('bank', 1000);
}

// popup
win = $(window).width();
function layer_open(obj) {
	var $body = $("html, body"), temp = $("#" + obj), win = $(window).width();
	$body.css("overflow", "hidden");
    temp.show();
    if(win > 768){
        fullpageStop();
    }
}
function layer_close() {
	var $body = $("html, body");
	$body.css("overflow", "");
    $(".ly_pop, .ly_cpinfo_res").hide();
    if(win > 768){
        $.fn.fullpage.setAllowScrolling(true);
    }
}

