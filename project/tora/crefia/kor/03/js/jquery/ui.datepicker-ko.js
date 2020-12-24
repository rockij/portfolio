jQuery(function($){
	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월', '7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,		
		isRTL: false
	};
	$.datepicker.setDefaults($.datepicker.regional['ko']);
});

(function($) {
	var oldGoToToday = $.datepicker._gotoToday;
	
	$.datepicker._gotoToday = function() {
		oldGoToToday.apply(this, arguments);

		var inst = this._curInst;
		this._selectDate(inst.input[0], this._formatDate(inst, inst.selectedDay, inst.selectedMonth, inst.selectedYear));
	};
})(jQuery);
