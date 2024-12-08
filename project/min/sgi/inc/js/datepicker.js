(function ($, win, doc, undefined) {
	var global = 'SGI', 
        namespace = 'UI.SGI'
        
	//global namespace
	if (!!win[global]) {
		alert("xhtml 화면에 추가된 공통 script 삭제 해주세요")
		throw new Error("already exists global!> " + global);
	}

	win[global] = createNameSpace(namespace, {
		uiNameSpace: function (identifier, module) { 
			return createNameSpace(identifier, module); 
		},
		uiFocusTab: function (opt) {
			return createUiFocusTab(opt);
		}
	});


	//components option
	win[global].option = {
        partsAdd0 :function(x, y, z) {
            //숫자 한자리수 일때 0 앞에 붙이기
            var y = y === undefined ? 10 : y,
                z = z === undefined ? '0' : z;

            return ((x < 10) ? z + x : x);
        }
	};
    
    function createNameSpace(identifier, module) {
		var w = win,
			name = identifier.split('.'),
			p,
			i = 0;

		if (!!identifier) {
			for (i = 0; i < name.length; i += 1) {
				(!w[name[i]]) ? (i === 0) ? w[name[i]] = {} : w[name[i]] = {} : '';
				w = w[name[i]];
			}
		}

		if (!!module) {
			for (p in module) {
				if (!w[p]) {
					w[p] = module[p];
				} else {
					throw new Error("module already exists! >> " + p);
				}
			}
		}
		return w;
	}

	function createUiFocusTab(opt){
		if (opt === undefined) {
			win[global].uiConsoleGuide([
				global + ".uiFocusHold({ id:'css셀렉트' );",
				"- selector: css셀렉터 형식 예) '#aaa', '.aa .bb' ...(!필수)",
				"※  지정한 특정영역에서 tab 이동 시 포커스 홀딩 "
			]);
			return false;
		}
		
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiFocusTab.option, opt),
			$focus = $(opt.selector),
			$item = $focus.find(opt.focusitem),
			callback = opt.callback,
			focusnot = opt.focusnot,
			type = opt.type,
			timer; 

		if (!!$item.length) {
			$item.eq(0).addClass('ps-fctab-s').attr('tabindex', 0).attr('holds', true);
			$item.eq(-1).addClass('ps-fctab-e').attr('tabindex', 0).attr('holde', true);
		} else {
			$focus.prepend('<div class="ps-fctab-s" tabindex="0" holds="true"></div>');
			$focus.append('<div class="ps-fctab-e" tabindex="0" holde="true"></div>');
			$item = $focus.find('.ps-fctab-s, .ps-fctab-e');
		}
		
		clearTimeout(timer);
		timer = setTimeout(function(){
			!focusnot ? $item.eq(0).focus() : '';
		},0);
		timer = '';

		$focus.find('.ps-fctab-s').off('keydown.holds').on('keydown.holds', function (e) {
			if (type === 'hold') {
				if (e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ps-fctab-e').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.holds');
				(e.shiftKey && e.keyCode == 9) ? callback('before') : '';
			}
		});
		$focus.find('.ps-fctab-e').off('keydown.holde').on('keydown.holde', function (e) {
			if (type === 'hold') {
				if (!e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ps-fctab-s').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.holds');
				(!e.shiftKey && e.keyCode == 9) ? callback('after') : '';
			}
		});
	}


	var $ui = win.SGI,
		namespace = 'UI.SGI';

	
	/* ------------------------------------------------------------------------

		Dropdown

	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiDropdown: function (opt) {
			return createUiDropdown(opt);
		},
		uiDropdownToggle: function (opt) {
			return createUiDropdownToggle(opt);
		},
		uiDropdownHide: function () {
			return createUiDropdownHide();
		},
	});
	$ui.uiDropdown.option = {
		eff: 'btmTop',
		ps: 'btm',
		hold: true,
		auto: false,
		back_close: true,
		openback:false,
		closeback:false,
		dim : false,
		_offset: false,
		_close: true,
		_expanded: false,
		eff_ps: 10,
		eff_speed: 300,
	};

	function createUiDropdown(opt){
		if (opt === undefined || !$('[data-name=' + opt.id + ']').length) {
			return false;
		}
		$('body').data('lastTag', 'true');
		
		var opt = $.extend(true, {}, $ui.uiDropdown.option, opt),
			id = opt.id,
			eff = opt.eff,
			auto = opt.auto,
			ps = opt.ps,
			hold = opt.hold,
			back_close = opt.back_close,
			dim = opt.dim,
			openback = opt.openback,
			closeback = opt.closeback,
			_offset = opt._offset,
			_close = opt._close,
			_expanded = opt._expanded,
			eff_ps = opt.eff_ps,
			eff_speed = opt.eff_speed,
			$btn = $('[data-name=' + id+ ']'),
			$pnl = $('[data-id="'+ id +'"]'); 
			

		
				
		//set up

		if (auto) {
			if (Math.abs($(win).scrollTop() - $btn.offset().top - $btn.outerHeight()) < Math.abs($(win).scrollTop() +  $(win).outerHeight() / 1.5)) {
				ps = 'bc';
				eff = 'st';
			} else {
				ps = 'tc';
				eff = 'sb';
			}
		}
		

		$btn.attr('data-expanded', false)
			.data('opt', { 
				id: id, 
				eff: eff, 
				ps: ps,
				hold: hold, 
				auto: auto,
				dim: dim,
				openback: openback,
				closeback: closeback,
				_offset: _offset, 
				_close :_close, 
				_expanded: _expanded,
				eff_ps: eff_ps,
				eff_speed: eff_speed
			});
		$pnl.attr('aria-hidden', true).attr('aria-labelledby', id).addClass(ps)
			.data('opt', { 
				id: id, 
				eff: eff, 
				ps: ps,
				hold: hold, 
				auto: auto,
				dim : dim,
				openback: openback,
				closeback: closeback,
				_offset: _offset, 
				_close: _close, 
				_expanded: _expanded,
				eff_ps: eff_ps,
				eff_speed: eff_speed
			});
		
		//event
		
		$btn.off('click.dropdown').on('click.dropdown', function(e){
			action(this);
		});
		$(doc)
		// .off('click.dropdownclose').on('click.dropdownclose', '.ps-drop-close', function(e){
		// 	var pnl_opt = $('#' + $(this).closest('.ps-drop-pnl').data('id')).data('opt');
		// 	pnl_opt._expanded = true;
		// 	$ui.uiDropdownToggle({ id: pnl_opt.id });
		// 	$('#' + pnl_opt.id).focus();
		// })
		.off('click.bd').on('click.bd', function(e){
			//dropdown 영역 외에 클릭 시 판단
			if (!!$('body').data('dropdownOpened')){
				if ($('.ps-drop-pnl').has(e.target).length < 1) {
					$ui.uiDropdownHide();
					tparent02 = $('.ps-drop-dim')
					
					tparent02.removeAttr('aria-hidden').siblings().removeAttr('aria-hidden');
					loopHidden03 = setInterval(function () {
						focusNonoutReset02();
					}, 1)
					
				}
			}
		});

		!back_close ? $(doc).off('click.bd') : '';

		function action(t) {
			var $this = $(t),
				btn_opt = $this.data('opt');

			$this.data('sct', $(doc).scrollTop());
			$ui.uiDropdownToggle({ id: btn_opt.id });
		}
	}
	function focusNonoutReset02() {
		if (tparent02.data('lastTag')) {
			clearInterval(loopHidden03);
		} else {
			
			tparent02.siblings().removeAttr('aria-hidden');
			tparent02.siblings('[data-hide = true]').each(function () {
				$(this).attr('aria-hidden', true)
				$(this).removeAttr('data-hide')
			});
			tparent02 = tparent02.parent();
		};
	}
	function createUiDropdownToggle(opt){
		if (opt === undefined) {
			return false;
		}
		
		var id = opt.id,
			$btn = $('[data-name=' + id + ']'),
			$pnl = $('.ps-drop-pnl[data-id="'+ id +'"]'),
			defaults = $btn.data('opt'),
			opt = $.extend(true, {}, defaults, opt),
			eff = opt.eff,
			auto = opt.auto,
			ps = opt.ps,
			dim = opt.dim,
			openback = opt.openback,
			closeback = opt.closeback,
			hold = opt.hold,
			_offset = opt._offset,
			_close = opt._close,
			_expanded =  $btn.attr('data-expanded'),
			eff_ps = opt.eff_ps, 
			eff_speed = opt.eff_speed,
			is_modal = !!$btn.closest('.ps-modal').length,
			btn_w = Math.ceil($btn.outerWidth()),
			btn_h = Math.ceil($btn.outerHeight()),
			btn_t = Math.ceil($btn.position().top),
			btn_l = Math.ceil($btn.position().left),
			pnl_w = Math.ceil($pnl.outerWidth()),
			pnl_h = Math.ceil($pnl.outerHeight());

		//_offset: ture 이거나 modal안의 dropdown 일때 position -> offset 으로 위치 값 변경
		if (_offset || is_modal) {
			btn_t = Math.ceil($btn.offset().top);
			btn_l = Math.ceil($btn.offset().left);
			is_modal ? btn_t = btn_t - $(win).scrollTop(): '';
		}

		//test 
		!!$btn.attr('data-ps') ? ps = $btn.attr('data-ps') : '';

		//위치 자동 설정
		if (auto) {
			if (Math.abs($(win).scrollTop() - $btn.offset().top - $btn.outerHeight()) < Math.abs($(win).scrollTop() +  $(win).outerHeight() / 1.5)) {
				ps = 'bc';
				eff = 'st';
			} else {
				ps = 'tc';
				eff = 'sb';
			}
		}
		
		_expanded === 'false' ? pnlShow(): pnlHide();

		function pnlShow(){
			var org_t, 
				org_l,
				dateId = $btn.parents('.ps-datepicker').attr('data-name'),
				drop_inner = $('.ps-drop-pnl[data-add="' + dateId +'"]').data('id');
			
			//다른 dropdown 닫기가 활성화일때
			if (_close) {
				//dropdown in dropdown 인 경우
				if (!!drop_inner) {
					$('.ps-drop').not('[data-name=' + drop_inner + ']').attr('data-expanded', false);
					$('.ps-drop-pnl').not('[data-id="' + drop_inner +'"]').attr('aria-hidden', true).attr('tabindex', -1).removeAttr('style');
				} else {
					$ui.uiDropdownHide();
				}
			}

			$btn.attr('data-expanded', true);
			$pnl.attr('aria-hidden', false);
			setTimeout(function(){
				$pnl.find('.datepicker-head-tit span').focus();
			},30)

			//focus hold or sense
			// hold ?	
			// 	$ui.uiFocusTab({ selector:'.ps-drop-pnl[data-id="'+ id +'"]', type:'hold' }):
			// 	$ui.uiFocusTab({ selector:'.ps-drop-pnl[data-id="'+ id +'"]', type:'sense', callback:pnlHide });

			switch (ps) {
				case 'bl': $pnl.css({ top: btn_t + btn_h, left: btn_l }); 
					break;
				case 'bc': $pnl.css({ top: btn_t + btn_h, left: btn_l - ((pnl_w - btn_w) / 2) }); 
					break;
				case 'br': $pnl.css({ top: btn_t + btn_h, left: btn_l - (pnl_w - btn_w) }); 
					break;
				case 'tl': $pnl.css({ top: btn_t - pnl_h, left: btn_l }); 
					break;
				case 'tc': $pnl.css({ top: btn_t - pnl_h, left: btn_l - ((pnl_w - btn_w) / 2) }); 
					break;
				case 'tr': $pnl.css({ top: btn_t - pnl_h, left: btn_l - (pnl_w - btn_w) }); 
					break;
				case 'rt': $pnl.css({ top: btn_t, left: btn_l + btn_w }); 
					break;
				case 'rm': $pnl.css({ top: btn_t - ((pnl_h - btn_h) / 2), left:  btn_l + btn_w  }); 
					break;
				case 'rb': $pnl.css({ top: btn_t - (pnl_h - btn_h), left: btn_l + btn_w }); 
					break;
				case 'lt': $pnl.css({ top: btn_t, left: btn_l - pnl_w }); 
					break;
				case 'lm': $pnl.css({ top: btn_t - ((pnl_h - btn_h) / 2), left: btn_l - pnl_w  }); 
					break;
				case 'lb': $pnl.css({ top: btn_t - (pnl_h - btn_h), left: btn_l - pnl_w }); 
					break; 
				case 'center': $pnl.css({ top: '50%', left: '50%', marginTop: (pnl_h / 2 ) * -1, marginLeft: (pnl_w / 2 ) * -1 }); 
                    break;
                case 'btm': $pnl.css({ bottom: '-100%', left: 0 }); 
                    break;
			}
			
			org_t = parseInt($pnl.css('top')),
			org_l = parseInt($pnl.css('left'));
			
			switch (eff) {
				case 'base': $pnl.stop().show(0); 
					break;
				case 'fade': $pnl.stop().fadeIn(eff_speed); 
					break;
				case 'st': $pnl.css({ top: org_t - eff_ps, opacity: 0, display: 'block' }).stop().animate({ top: org_t, opacity: 1 }, eff_speed); 
					break;
				case 'sb': $pnl.css({ top: org_t + eff_ps, opacity: 0, display: 'block' }).stop().animate({ top: org_t, opacity: 1 }, eff_speed); 
					break;
				case 'sl': $pnl.css({ left: org_l + eff_ps, opacity: 0, display: 'block' }).stop().animate({ left: org_l, opacity: 1 }, eff_speed); 
					break;
				case 'sr': $pnl.css({ left: org_l - eff_ps, opacity: 0, display: 'block' }).stop().animate({ left: org_l, opacity: 1 }, eff_speed); 
                    break;
                case 'btmTop': $pnl.css({ bottom: '-100%', opacity: 0, display: 'block' }).stop().animate({ bottom: '0', opacity: 1 }, eff_speed); 
					break;
			}

			setTimeout(function(){
				$('body').data('dropdownOpened',true).addClass('dropdownOpened');
			},0);

			!!openback ? openback() : '';
			!!dim ? dimShow($pnl) : '';
		}
		function pnlHide(){
			var org_t = parseInt($pnl.css('top')),
				org_l = parseInt($pnl.css('left'));
			
			if ($pnl.closest('.ps-drop-box').length < 1) {
				$('body').data('dropdownOpened',false).removeClass('dropdownOpened');
			}
			$btn.attr('data-expanded', false).focus();
			$pnl.attr('aria-hidden', true).attr('tabindex', -1);
			
			switch (eff) {
				case 'base': $pnl.stop().hide(0, pnlHideEnd); 
					break;
				case 'fade': $pnl.stop().fadeOut(eff_speed, pnlHideEnd); 
					break;
				case 'st': $pnl.stop().animate({ top: org_t - eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
				case 'sb': $pnl.stop().animate({ top: org_t + eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
				case 'sl': $pnl.stop().animate({ left: org_l + eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
				case 'sr': $pnl.stop().animate({ left: org_l - eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
                    break;
                case 'btmTop': $pnl.stop().animate({ bottom: '-100%', opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
			}

			function pnlHideEnd(){
				$pnl.hide().removeAttr('style'); 
			}

			!!closeback ? closeback() : '';
			!!dim ? dimHide() : '';
		}

		
	}
	function dimShow(t){
		$(t).after('<div class="ps-drop-dim" aria-hidden="true"></div>');
		$('.ps-drop-dim').stop().animate({
			opacity:0.6
		})
	}
	function dimHide(){
		$('.ps-drop-dim').stop().animate({
			opacity:0
		},200, function(){
			$(this).remove();
		});
	}
	function createUiDropdownHide(){
		$('body').data('dropdownOpened',false).removeClass('dropdownOpened');
		$('.ps-drop').attr('data-expanded', false);
		
		$('.ps-drop-pnl[aria-hidden="false"]').each(function(){
			var $pnl = $(this),
				defaults = $pnl.data('opt'),
				opt = $.extend(true, {}, defaults),
				eff = opt.eff,
				eff_ps = opt.eff_ps,
				closeback = opt.closeback,
				eff_speed = opt.eff_speed,
				org_t = parseInt($pnl.css('top')),
				org_l = parseInt($pnl.css('left'));
			
			switch (eff) {
				case 'base': $pnl.stop().hide(0, pnlHideEnd); 
					break;
				case 'fade': $pnl.stop().fadeOut(eff_speed, pnlHideEnd); 
					break;
				case 'st': $pnl.stop().animate({ top: org_t - eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
				case 'sb': $pnl.stop().animate({ top: org_t + eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
				case 'sl': $pnl.stop().animate({ left: org_l + eff_ps, opacity: 0 }, eff_speed, pnlHideEnd);
					break;
				case 'sr': $pnl.stop().animate({ left: org_l - eff_ps, opacity: 0 }, eff_speed, pnlHideEnd);
                    break;
                case 'btmTop': $pnl.stop().animate({ bottom: '-100%', opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
			}

			function pnlHideEnd(){
				$pnl.hide().removeAttr('style'); 
			}
			$pnl.attr('aria-hidden', true).attr('tabindex', -1);
			!!closeback ? closeback() : '';
		});
		dimHide();
	}


	/* ------------------------------------------------------------------------
	
		Datepicker

	------------------------------------------------------------------------ */
	$ui = $ui.uiNameSpace(namespace, {
		uiDatePicker: function (opt) {
			return createUiDatePicker(opt);
		}
	});
	$ui.uiDatePicker.option = {
		selector: '.ps-datepicker',
		dual: false,
		date_split: '-',
		openback: false,
		closeback: false,
		callback: function(/*v*/){/* console.log(v) */},
		shortDate: false, //DDMMYYYY
		dateMonths: new Array('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'),
		weekDay: new Array('일', '월', '화', '수', '목', '금', '토'),
		remove: false
	};
	function createUiDatePicker(opt){
		var opt = $.extend(true, {}, $ui.uiDatePicker.option, opt),
			date_split = opt.date_split,
			selector = opt.selector,
			dual = opt.dual,
			openback = opt.openback,
			closeback = opt.closeback,
			callback = opt.callback,
			dateMonths = opt.dateMonths,
			weekDay = opt.weekDay,
			shortDate = opt.shortDate,
			remove = opt.remove,
			$datepicker = $(selector),
			date = new Date(),
			dateToday = date,
			calVar,
			calVar_end;

		$datepicker.data('opt', { callback: callback, shortDate: shortDate, openback:openback, closeback:closeback, dual:dual });

		//이달의 날짜 텍스트화
		function textDate(d, m, y, whatday) {
			var text_date = new Date(y, m - 1, d);
			
			if (whatday === true) {
				//요일 추가
				return (text_date.getFullYear() + date_split + dateMonths[text_date.getMonth()] + date_split + $ui.option.partsAdd0(text_date.getDate()) + " (" + weekDay[text_date.getDay()] + ")");
			} else {
				return (text_date.getFullYear() + date_split + dateMonths[text_date.getMonth()] + date_split + $ui.option.partsAdd0(text_date.getDate()));
			}
		}

		//사용여부확인 필요
		function subtractDate(oneDate, anotherDate) { 
			return (anotherDate - oneDate); 
		}

		//DD.MM.YYYY 순으로 정렬
		function toDDMMYYY(d) {
			var d = new Date(d);
			return ($ui.option.partsAdd0(d.getDate()) + date_split + $ui.option.partsAdd0(d.getMonth() + 1) + date_split + d.getFullYear());
		}
		//input에 출력
		function writeInputDateValue(calendarEl, obj, end) {
			var d = $(obj).data("day"),
				id = calendarEl.inputId,
				opt = $('[data-name=' + id+ ']').closest('.ps-datepicker').data('opt');
			!!end ? id = id + '_end' : '';

			calendarEl.shortDate ? d = toDDMMYYY(d) : ''; //DD.MM.YYYY로 설정

			$('[data-name=' + id+ ']').val(d);
			!!opt.callback ? opt.callback({id:id, value:d }): '';
		}

		function calendarObject(opt) {
			this.calId = opt.calId;
			this.inputId = opt.inputId;
			this.buttonId = opt.buttonId;
			this.shortDate = opt.shortDate;
		}

		//사용여부확인 필요
		function matchToday() {
			$('.tbl-datepicker button').each(function () {
				var $this = $(this);
				$this.data('day') === $('.ps-drop-pnl .today button.today').data('day') ?
					$this.attr('title', $this.attr('title')+' (오늘)').addClass('today') : '';
			});
		}                                                                                                                                        

		//달력 Build
		function buildCalendar(date, calendarEl, v) {
			var inp_val = $('[data-name=' + calendarEl.inputId + ']').val(),
				nVal = inp_val.split(date_split),
				generate = v === 'generate' ? true : false,
				day = !generate ? date.getDate() : inp_val === '' ? date.getDate() : Number(nVal[2]),
				month = !generate ? date.getMonth() : inp_val === '' ? date.getMonth() : Number(nVal[1] - 1),
				year = !generate ? date.getFullYear() : inp_val === '' ? date.getFullYear() : Number(nVal[0]),
				prevMonth = new Date(year, month - 1, 1),
				thisMonth = new Date(year, month, 1),
				nextMonth = new Date(year, month + 1, 1),
				firstWeekDay = thisMonth.getDay(),
				daysInMonth = Math.floor((nextMonth.getTime() - thisMonth.getTime()) / (1000 * 60 * 60 * 24)),
				daysInMonth_prev = Math.floor((thisMonth.getTime() - prevMonth.getTime()) / (1000 * 60 * 60 * 24)),
				$input = $('[data-name=' + calendarEl.inputId + ']').eq(0),
				tit = $input.attr('title'),
				_minDay = new Array(),
				_maxDay = new Array(),
				_calendarHtml = '',
				//_isOver = false,
				mm = nextMonth.getMonth(),
				week_day;
				

			$input.data('min') !== undefined ? _minDay = $input.data('min').split(date_split, 3) : _minDay[0] = 1910;// 최소 선택 가능
			$input.data('max') !== undefined ? _maxDay = $input.data('max').split(date_split, 3) : _maxDay[0] = 3000;// 최대 선택 가능
			month === 2 ? daysInMonth = 31 : '';
			
			/* datepicker-head -------------------- */
			_calendarHtml += '<div class="datepicker-head">';
			/* title: datepicker-head-tit */
			_calendarHtml += '<div class="datepicker-head-tit"><span tabindex="-1">'+ tit +'</span></div>';
		
			/* 년월 선택: datepicker-head-select */
			// _calendarHtml += '<div class="datepicker-head-select">';
			// _calendarHtml += '<div class="ps-select datepicker-head-year">';
			// _calendarHtml += '<select title="년도 선택" id="sel_'+ calendarEl.inputId +'_year">';

			// for (var y = Number(_maxDay[0]) + 1 ; y > Number(_minDay[0]); y--) {
			// 	_calendarHtml += y === year ? '<option value="'+ y +'" selected>'+ y +'년</option>': '<option value="'+ y +'">'+ y +'년</option>';
			// }

			// _calendarHtml += '</select>';
			// _calendarHtml += '</div>';

			// _calendarHtml += '<div class="ps-select datepicker-head-month">';
			// _calendarHtml += '<select title="월 선택" id="sel_'+ calendarEl.inputId +'_month">';

			// for (var m = 1; m < 13; m++) {
			// 	_calendarHtml += m === month + 1 ? '<option value="'+ m +'" selected>'+ m +'월</option>': '<option value="'+ m +'">'+ m +'월</option>';
			// }

			// _calendarHtml += '</select>';
			// _calendarHtml += '</div>';
			// _calendarHtml += '</div>';

			/* 년월 선택: button */
			_calendarHtml += '<div class="datepicker-head-btn">';
			_calendarHtml += year <= _minDay[0] && dateMonths[month] <= _minDay[1] ? 
				'<button type="button" class="ps-datepicker-prev-y disabled" disabled>': '<button type="button" class="ps-datepicker-prev-y" title="이전 연도"></button>';
            
            _calendarHtml += year >= _maxDay[0] ? 
                '<button type="button" class="ps-datepicker-next-y disabled" disabled>': '<button type="button" class="ps-datepicker-next-y" title="다음 연도"></button>';
                
			_calendarHtml += year <= _minDay[0] ? 
				'<button type="button" class="ps-datepicker-prev disabled" disabled>': '<button type="button" class="ps-datepicker-prev" title="이전 달"></button>';
			
			_calendarHtml += year >= _maxDay[0] && dateMonths[month] >= _maxDay[1] ? 
				'<button type="button" class="ps-datepicker-next disabled" disabled>': '<button type="button" class="ps-datepicker-next" title="다음 달"></button>';
			
			_calendarHtml += '</div>';

			/* today */
			// _calendarHtml += '<div class="datepicker-head-today">';
			// _calendarHtml += '<button type="button" class="today" data-day=' + textDate(dateToday.getDate(), dateToday.getMonth() + 1, dateToday.getFullYear(), true) + '><span>오늘로 이동</span></button>';
			// _calendarHtml += '</div>';
			
			/* datepicker-head-date */
			_calendarHtml += '<div class="datepicker-head-date">';
			
			_calendarHtml += '<span class="year" data-y="'+ year +'"><strong>' + year + '</strong></span> ';
			_calendarHtml += '<span class="month" data-m="'+ dateMonths[month] +'"><strong>' + dateMonths[month] + '</strong></span>';
			
			if (dual) {
				_calendarHtml += '~ <span class="year2" data-y="'+ year +'"><strong>' + year + '</strong><span>년</span></span> ';
				
				_calendarHtml += '<span class="month2" data-m="'+  dateMonths[month + 1] +'"><strong>' +  dateMonths[month + 1] + '</strong><span>월</span></span>';
			}
			
			_calendarHtml += '</div>';
			_calendarHtml += '</div>';
			
			/* datepicker-core -------------------- */
			_calendarHtml += '<div class="datepicker-core"></div>';
			_calendarHtml += '<button type="button" class="btn-close ps-datepicker-close" aria-label="닫기"></button>';

			return _calendarHtml;
		}
		function buildCore(date, calendarEl, v) {
			var $base = $("[data-name=" + calendarEl.calId + "]"),
				inp_val = $('[data-name=' + calendarEl.inputId + ']').val(),
				nVal = inp_val.split(date_split),
				generate = v === 'generate' ? true : false,
				day = !generate ? date.getDate() : inp_val === '' ? date.getDate() : Number(nVal[2]),
				month = !generate ? date.getMonth() : inp_val === '' ? date.getMonth() : Number(nVal[1] - 1),
				year = !generate ? date.getFullYear() : inp_val === '' ? date.getFullYear() : Number(nVal[0]),
				prevMonth = new Date(year, month - 1, 1),
				thisMonth = new Date(year, month, 1),
				nextMonth = new Date(year, month + 1, 1),
				nextMonth2 = new Date(year, month + 2, 1),
				firstWeekDay = thisMonth.getDay(),
				nextWeekDay = nextMonth.getDay(),
				prevWeekDay = prevMonth.getDay(),
				daysInMonth = Math.floor((nextMonth.getTime() - thisMonth.getTime()) / (1000 * 60 * 60 * 24)),
				daysInMonth_prev = Math.floor((thisMonth.getTime() - prevMonth.getTime()) / (1000 * 60 * 60 * 24)),
				daysInMonth_next = Math.floor((nextMonth2.getTime() - nextMonth.getTime()) / (1000 * 60 * 60 * 24)),
				$input = $('[data-name=' + calendarEl.inputId + ']').eq(0),
				tit = $input.attr('title'),
				_minDay = new Array(),
				_maxDay = new Array(),
				_calendarHtml = '',
				//_isOver = false,
				mm = nextMonth.getMonth(),
				week_day;

			$input.data('min') !== undefined ? _minDay = $input.data('min').split(date_split, 3) : _minDay[0] = 1910;// 최소 선택 가능
			$input.data('max') !== undefined ? _maxDay = $input.data('max').split(date_split, 3) : _maxDay[0] = 3000;// 최대 선택 가능
			month === 2 ? daysInMonth = 31 : '';

			$base.find('.ps-datepicker-prev span').text('이전 '+ dateMonths[(month === 0) ? 11 : month - 1]+ '월로 이동');
			$base.find('.ps-datepicker-next span').text('다음 '+ dateMonths[(month == 11) ? 0 : month + 1]+ '월로 이동');
			$base.find('.datepicker-head-date').find('.year').data('y',year).find('strong').text(year);
			$base.find('.datepicker-head-date').find('.month').data('m',dateMonths[month]).find('strong').text(dateMonths[month]);

			if (dual) {
				if (month + 1 === 12) {
					$base.find('.datepicker-head-date').find('.year2').data('y',year + 1).find('strong').text(year + 1);
					$base.find('.datepicker-head-date').find('.month2').data('m', dateMonths[0]).find('strong').text(dateMonths[0]);
				} else {
					$base.find('.datepicker-head-date').find('.year2').data('y',year).find('strong').text(year);
					$base.find('.datepicker-head-date').find('.month2').data('m', dateMonths[month + 1]).find('strong').text(dateMonths[month + 1]);
				}
				
			}

			$base.find('.datepicker-head-year option').prop('selected', false).removeAttr('selected');
			$base.find('.datepicker-head-year option[value="'+ year +'"]').prop('selected', true);
			$base.find('.datepicker-head-month option').prop('selected', false).removeAttr('selected');
			$base.find('.datepicker-head-month option[value="'+ (month + 1) +'"]').prop('selected', true);

			year <= _minDay[0] && dateMonths[month] <= _minDay[1] ? 
				$base.find('.ps-datepicker-prev').addClass('disabled').attr('disabled'):
				$base.find('.ps-datepicker-prev').removeAttr('disabled').removeClass('disabled');
			
			year <= _minDay[0] ? 
				$base.find('.ps-datepicker-prev-y').addClass('disabled').attr('disabled'):
				$base.find('.ps-datepicker-prev-y').removeAttr('disabled').removeClass('disabled');

			year >= _maxDay[0] && dateMonths[month] >= _maxDay[1] ? 
				$base.find('.ps-datepicker-next').addClass('disabled').attr('disabled'): 
				$base.find('.ps-datepicker-next').removeAttr('disabled').removeClass('disabled');

			year >= _maxDay[0] ? 
				$base.find('.ps-datepicker-next-y').addClass('disabled').attr('disabled'): 
				$base.find('.ps-datepicker-next-y').removeAttr('disabled').removeClass('disabled');
			
			/* datepicker - core -------------------- */
			_calendarHtml += '<table class="tbl-datepicker">';
			//_calendarHtml += '<caption><span>'+ year +'년 '+ dateMonths[month] +'월 일자 선택</span></caption>';
			_calendarHtml += '<colgroup>';
			_calendarHtml += '<col span="7" class="n1">';
			_calendarHtml += '</colgroup>';
			_calendarHtml += '<thead><tr>';
			_calendarHtml += '<th scope="col" class="day-sun"><abbr title="일요일"><span>'+ weekDay[0] +'</span></abbr></th>';
			_calendarHtml += '<th scope="col"><abbr title="월요일"><span>'+ weekDay[1] +'</span></abbr></th>';
			_calendarHtml += '<th scope="col"><abbr title="화요일"><span>'+ weekDay[2] +'</span></abbr></th>';
			_calendarHtml += '<th scope="col"><abbr title="수요일"><span>'+ weekDay[3] +'<span></abbr></th>';
			_calendarHtml += '<th scope="col"><abbr title="목요일"><span>'+ weekDay[4] +'</span></abbr></th>';
			_calendarHtml += '<th scope="col"><abbr title="금요일"><span>'+ weekDay[5] +'</span></abbr></th>';
			_calendarHtml += '<th scope="col" class="day-sat"><abbr title="토요일"><span>'+ weekDay[6] +'</span></abbr></th>';
			_calendarHtml += '</tr></thead>';
			_calendarHtml += '<tbody><tr>';

			// 빈 셀 채우기 - 전
			var empty_before = daysInMonth_prev - firstWeekDay;
			for (var week = 0; week < firstWeekDay; week++) {
				empty_before  = empty_before + 1;

				if (week === 0) {
					_calendarHtml += '<td class="empty"><span>'+ empty_before +'</span></td>'; //일요일
				} else if (week === 6) {
					_calendarHtml += '<td class="empty"><span>'+ empty_before +'</span></td>'; //토요일
				} else {
					_calendarHtml += '<td class="empty"><span>'+ empty_before +'</span></td>'; 
				}
			}

			mm < 1 ? mm = 12 : '';
			mm = $ui.option.partsAdd0(mm);
			week_day = firstWeekDay;

			for (var dayCounter = 1; dayCounter <= daysInMonth; dayCounter++) {
				week_day %= 7;
				week_day === 0 ? daysInMonth - dayCounter < 7 ? _calendarHtml += '</tr>' : _calendarHtml += '</tr><tr>' : '';
				
				if (week_day === 0) {
					_calendarHtml += '<td class="day-sun">'; //일요일
				} else if (week_day === 6) {
					_calendarHtml += '<td class="day-sat">'; //토요일
				} else {
					_calendarHtml += '<td>';
				}

				
				if ((year < _minDay[0]) || (year == _minDay[0] && dateMonths[month] < _minDay[1]) || (year == _minDay[0] && dateMonths[month] == _minDay[1] && dayCounter < _minDay[2])) {
					//_isOver = true;
					_calendarHtml += '<span title="'+ textDate(dayCounter, mm, year, true) +'">' + dayCounter + '</span></td>';
				} else if ((year > _maxDay[0]) || (year == _maxDay[0] && dateMonths[month] > _maxDay[1]) || (year == _maxDay[0] && dateMonths[month] == _maxDay[1] && dayCounter > _maxDay[2])) {
					//_isOver = true;
					_calendarHtml += '<span title="'+ textDate(dayCounter, mm, year, true) +'">' + dayCounter + '</span></td>';
				} else {
					//_isOver = false;
					_calendarHtml += '<button type="button" title="'+ textDate(dayCounter, mm, year, true) +'" data-day="'+ textDate(dayCounter, mm, year, false) +'" value="'+ dayCounter +'"><span>'+ dayCounter +'</span></button></td>';
				}
				week_day++;
			}

			// 빈 셀 채우기 - 후
			var empty_after = 0;
			for (week_day = week_day; week_day < 7; week_day++) { 
				empty_after = empty_after + 1;

				if (week_day === 0) {
					_calendarHtml += '<td class="empty"><span>'+ empty_after +'</span></td>'; //일요일
				} else if (week_day == 6) {
					_calendarHtml += '<td class="empty"><span>'+ empty_after +'</span></td>'; //토요일
				} else {
					_calendarHtml += '<td class="empty"><span>'+ empty_after +'</span></td>';
				}
			}

			_calendarHtml += '</tr></tbody></table>';

			if (dual) {
					/* datepicker-core -------------------- */
				_calendarHtml += '<table class="tbl-datepicker">';
				_calendarHtml += '<caption>'+ year +'년 '+ dateMonths[month + 1] +'월 일자 선택</caption>';
				_calendarHtml += '<colgroup>';
				_calendarHtml += '<col span="7" class="n1">';
				_calendarHtml += '</colgroup>';
				_calendarHtml += '<thead><tr>';
				_calendarHtml += '<th scope="col" class="day-sun"><abbr title="일요일"><span>'+ weekDay[0] +'</span></abbr></th>';
				_calendarHtml += '<th scope="col"><abbr title="월요일"><span>'+ weekDay[1] +'</span></abbr></th>';
				_calendarHtml += '<th scope="col"><abbr title="화요일"><span>'+ weekDay[2] +'</span></abbr></th>';
				_calendarHtml += '<th scope="col"><abbr title="수요일"><span>'+ weekDay[3] +'</span></abbr></th>';
				_calendarHtml += '<th scope="col"><abbr title="목요일"><span>'+ weekDay[4] +'</span></abbr></th>';
				_calendarHtml += '<th scope="col"><abbr title="금요일"><span>'+ weekDay[5] +'</span></abbr></th>';
				_calendarHtml += '<th scope="col" class="day-sat"><abbr title="토요일"><span>'+ weekDay[6] +'</span></abbr></th>';
				_calendarHtml += '</tr></thead>';
				_calendarHtml += '<tbody><tr>';

				// 빈 셀 채우기 - 전
				empty_before = daysInMonth - nextWeekDay;

				for (var week = 0; week < nextWeekDay; week++) {
					empty_before  = empty_before + 1;

					if (week === 0) {
						_calendarHtml += '<td class="empty"><span>'+ empty_before +'</span></td>'; //일요일
					} else if (week === 6) {
						_calendarHtml += '<td class="empty"><span>'+ empty_before +'</span></td>'; //토요일
					} else {
						_calendarHtml += '<td class="empty"><span>'+ empty_before +'</span></td>'; 
					}
				}
				mm = Number(mm) + 1;
				mm < 1 ? mm = 12 : '';
				if (mm > 12) {
					mm = 1;
					year = year + 1;
				};
 				mm = $ui.option.partsAdd0(mm);
				week_day = nextWeekDay;

				for (var dayCounter = 1; dayCounter <= daysInMonth_next; dayCounter++) {
					week_day %= 7;
					week_day === 0 ? daysInMonth_next - dayCounter < 7 ? _calendarHtml += '</tr>' : _calendarHtml += '</tr><tr>' : '';
					
					if (week_day === 0) {
						_calendarHtml += '<td class="day-sun">'; //일요일
					} else if (week_day === 6) {
						_calendarHtml += '<td class="day-sat">'; //토요일
					} else {
						_calendarHtml += '<td>';
					}

					// 남은 여백에 지난달 다음달 날짜
					if ((year < _minDay[0]) || (year == _minDay[0] && dateMonths[month + 1] < _minDay[1]) || (year == _minDay[0] && dateMonths[month + 1] == _minDay[1] && dayCounter < _minDay[2])) {
						//_isOver = true;
						_calendarHtml += '<span title="'+ textDate(dayCounter, mm, year, true) +'">' + dayCounter + '</span></td>';
					} else if ((year > _maxDay[0]) || (year == _maxDay[0] && dateMonths[month + 1] > _maxDay[1]) || (year == _maxDay[0] && dateMonths[month + 1] == _maxDay[1] && dayCounter > _maxDay[2])) {
						//_isOver = true;
						_calendarHtml += '<span title="'+ textDate(dayCounter, mm, year, true) +'">' + dayCounter + '</span></td>';
					} else {
						//_isOver = false;
						_calendarHtml += '<button type="button" title="'+ textDate(dayCounter, mm, year, true) +'" data-day="'+ textDate(dayCounter, mm, year, false) +'" value="'+ dayCounter +'">'+ dayCounter +'</button></td>';
					}
					week_day++;
				}

				// 빈 셀 채우기 - 후
				var empty_after = 0;
				for (week_day = week_day; week_day < 7; week_day++) { 
					empty_after = empty_after + 1;

					if (week_day === 0) {
						_calendarHtml += '<td class="empty"><span>'+ empty_after +'</span></td>'; //일요일
					} else if (week_day == 6) {
						_calendarHtml += '<td class="empty"><span>'+ empty_after +'</span></td>'; //토요일
					} else {
						_calendarHtml += '<td class="empty"><span>'+ empty_after +'</span></td>';
					}
				}
				_calendarHtml += '</tr></tbody></table>';

				_calendarHtml += '<div class="btn-wrap">';
				_calendarHtml += '<button type="button" class="btn-base"><span>확인</span></button>';
				_calendarHtml += '</div>';
			}

			return _calendarHtml;
		}
		$('body').data('lastTag' , 'true');
		

		//달력 Hide&Remove
		function hideCalendar(calendarEl) {
			$("[data-name=" + calendarEl.calId + "]").animate({
				opacity: 0
			}, 300, function () {
				$(this).remove();
			});
		}
		function datepickerClose(calendarEl){
			var $btnpaid = $("[data-name=" + calendarEl.calId + "]").parent().attr('data-add')
			var $btn = $("[data-name=" + $btnpaid + "]").find('.ps-datepicker-btn');
			

			tparent02 = $("[data-name=" + calendarEl.calId + "]").parent()
			tparent02.siblings().removeAttr('aria-hidden');
			loopHidden02 = setInterval(function () {
				focusNonoutReset();
			}, 1)

			$ui.uiDropdownToggle({ id: $btn.attr('data-name') });
			//$ui.uiScroll({ value:$btn.data('sct'), speed:200 });

			remove ? hideCalendar(calendarEl) : '';
		}
		function focusNonout() {
			if (tparent.data('lastTag')) {
				clearInterval(loopHidden);
			} else {
				tparent.siblings('[aria-hidden = true]').each(function () {
					$(this).attr('data-hide', 'true')
				})
				tparent.siblings().attr('aria-hidden', true);
				tparent = tparent.parent()
			};
		}
		function focusNonoutReset() {
			if (tparent02.data('lastTag')) {
				clearInterval(loopHidden02);
			} else {
				tparent02.siblings().removeAttr('aria-hidden');
				tparent02.siblings('[data-hide = true]').each(function () {
					$(this).attr('aria-hidden', true)
					$(this).removeAttr('data-hide')
				});
				tparent02 = tparent02.parent();
			};
		}
		//달력 Show
		function reDisplayCalendar(calendarEl, v) {
			var $calWrap = $("[data-name=" + calendarEl.calId + "]");
			$calWrap.find('.datepicker-core').empty().append(buildCore(date, calendarEl, v));
		}

		function displayCalendar(calendarEl, v) {
			var $calWrap = $("[data-name=" + calendarEl.calId + "]");
			
			$calWrap.empty().append(buildCalendar(date, calendarEl, v));
			reDisplayCalendar(calendarEl, v);
			$ui.uiFocusTab({ selector:$("[data-name=" + calendarEl.calId + "]"), type:'hold' });

			//datepicker event--------------------------------------------------------
			//select year & month
			$calWrap.find('.datepicker-head-year select').off('change.uidpsel').on('change.uidpsel', function(e){
				e.preventDefault();
				yearMonthSelect(this, 'year');
			});
			$calWrap.find('.datepicker-head-month select').off('change.uidpsel').on('change.uidpsel', function(e){
				e.preventDefault();
				yearMonthSelect(this, 'month');
			});
			//next & prev month
			$calWrap.find('.ps-datepicker-prev').off('click.uidatepicker').on('click.uidatepicker', function(e) {
				e.preventDefault();
				monthNextPrev(this, 'prev');
			});
			$calWrap.find('.ps-datepicker-next').off('click.uidatepicker').on('click.uidatepicker', function(e) {
				e.preventDefault();
				monthNextPrev(this, 'next');
			});
			$calWrap.find('.ps-datepicker-prev-y').off('click.uidatepicker').on('click.uidatepicker', function(e) {
				e.preventDefault();
				yearNextPrev(this, 'prev');
			});
			$calWrap.find('.ps-datepicker-next-y').off('click.uidatepicker').on('click.uidatepicker', function(e) {
				e.preventDefault();
				yearNextPrev(this, 'next');
			});

			function yearMonthSelect(t, v){
				var $currentDate = $(t).closest('.datepicker-head').find('.datepicker-head-date'),
					_y = v === 'year' ? 
						$(t).closest('.datepicker-head-year').find('select').eq(0).val(): 
						Number($currentDate.find('.year').data('y')),
					_m = v === 'month' ? 
						$(t).closest('.datepicker-head-month').find('select').eq(0).val(): 
						Number($currentDate.find('.month').data('m') - 1),
					dateTemp = v === 'year' ? new Date(_y, _m, 1): new Date(_y, _m - 1, 1);

				date = dateTemp;
				reDisplayCalendar(calendarEl);
				
				v === 'year' ? 
					$calWrap.find('.datepicker-head-year select').eq(0).focus(): 
					$calWrap.find('.datepicker-head-month select').eq(0).focus();
			}
			function monthNextPrev(t, v){
				var $this = $(t),
					limit = v === 'next' ? 'max': 'min',
					$currentDate = $this.closest('.datepicker-head').find('.datepicker-head-date'),
					_y = Number($currentDate.find('.year').data('y')),
					_m = Number($currentDate.find('.month').data('m') - 1),
					dateTemp = v === 'next' ? new Date(_y, _m + 1, 1): new Date(_y, _m - 1, 1);

				if ($this.hasClass('disabled')) {
					alert($("[data-name=" + calendarEl.inputId + "]").data(limit) +' 을 벗어난 달은 선택이 불가능 합니다.');
				} else {
					date = dateTemp;
					reDisplayCalendar(calendarEl);
					$this.eq(0).focus();
				}
			}
			function yearNextPrev(t, v){
				var $this = $(t),
					limit = v === 'next' ? 'max': 'min',
					$currentDate = $this.closest('.datepicker-head').find('.datepicker-head-date'),
					_y = Number($currentDate.find('.year').data('y')),
					_m = Number($currentDate.find('.month').data('m') - 1),
					dateTemp = v === 'next' ? new Date(_y + 1, _m, 1): new Date(_y - 1, _m, 1);

				if ($this.hasClass('disabled')) {
					alert($("[data-name=" + calendarEl.inputId + "]").data(limit) +' 을 벗어난 년은 선택이 불가능 합니다.');
				} else {
					date = dateTemp;
					reDisplayCalendar(calendarEl);
					$this.eq(0).focus();
				}
			}

			//close
			$('.ps-datepicker-close').off('click.uidayclose').on('click.uidayclose', function(){
                if($(this).parents('.ps-datepicker-wrap').is(':visible')) {
                    datepickerClose(calendarEl);
                }
			});

			var id_ = "[data-name=" + calendarEl.calId + "]" ;
			if (dual) {
				var b_day,
					s_day,
					e_day;
				$(doc)
					.off('click.uidaysel').on('click.uidaysel', id_ + ' td button', function() {
						var $this = $(this),
							$core = $this.closest('.datepicker-core'),
							n_day = $this.data('day').replace(/\-/g,''),
							n_day_ = $core.data('day') === undefined ? false :$core.data('day').replace(/\-/g,''),
							sam_day = n_day === n_day_,
							next_day = n_day > n_day_,
							b_day = n_day;

						if (!$core.data('start')) {
							$core.data('start',true).data('day',n_day);
							
							$core.find('.selected').removeClass('selected').removeAttr('aria-selected');
							$this.addClass('selected-start').attr('aria-selected', true);
							s_day = $this;
							//writeInputDateValue(calendarEl, $this);
						} else if(next_day) {
							
							$core.find('.selected-end').removeClass('selected-end').removeAttr('aria-selected');
							$this.addClass('selected-end').attr('aria-selected', true);
							$core.addClass('date-ing-on');
							e_day = $this;
							//writeInputDateValue(calendarEl, $this, true);

							
						} else if(sam_day) {
							
							$core.data('start',false).data('day', undefined);
							$this.removeClass('selected-start').removeAttr('aria-selected', true);
						}
						
					})
					.off('mouseover.uidaysel').on('mouseover.uidaysel', id_ + ' td button', function() {
						var $this = $(this),
							$core = $this.closest('.datepicker-core'),
							n_day = $this.data('day').replace(/\-/g,''),
							b_day = $core.data('day').replace(/\-/g,'');
							
						
						if (b_day < n_day ) {
							$this.addClass('selected-ing');
						}
					})
					.off('click.uitoday').on('click.uitoday', id_ + ' .datepicker-head-today button', function() {
						date = new Date();
						
						reDisplayCalendar(calendarEl);
					})
					.off('click.uitoday').on('click.uitoday', id_ + ' .btn-base', function() {
						
						writeInputDateValue(calendarEl, s_day);
						writeInputDateValue(calendarEl, e_day, true);
						datepickerClose(calendarEl);

					});
			} else {
				$(doc)
					.off('click.uidaysel').on('click.uidaysel', id_ + ' td button', function() {
						var $this = $(this);

						writeInputDateValue(calendarEl, $this);
						datepickerClose(calendarEl);
					})
					.off('click.uitoday').on('click.uitoday', id_ + ' .datepicker-head-today button', function() {
						date = new Date();
						reDisplayCalendar(calendarEl);

						$calWrap.find('.tbl-datepicker button[data-day="' + textDate(dateToday.getDate(), dateToday.getMonth() + 1, dateToday.getFullYear()) + '"]').addClass('selected').focus().attr('aria-selected', true).attr('aria-label','현재선택 날짜');

						// setTimeout(function(){
						// 	$calWrap.find('td button.today').eq(0).addClass('selected');
						// },1000)
					});
			}

			
			var _btnOffset = $("#" + calendarEl.buttonId).offset();
			matchToday();
			
			return false;
		}

		//dropdown 설정
		$datepicker.each(function() {
			var $this = $(this),
				$btn = $this.find('.ps-datepicker-btn').removeAttr('aria-expanded').attr('data-expanded',false);
			
			callback = !!$this.data('callback') ? $this.data('callback') : callback;

			// if ($ui.browser.mobile) {
				$ui.uiDropdown({ 
					id:$btn.attr('data-name'), 
                    ps:'btm',
					dim:true,
					openback: openback,
					closeback: closeback
				});
			//	$('#' + $btn.data('inp')).prop('readonly', true).attr('aria-hidden', true);
			// }
			// else {
			// 	$ui.uiDropdown({ 
			// 		id:$btn.attr('data-name'), 
			// 		auto:true,
			// 		openback: openback,
			// 		closeback: closeback
			// 	});
			// }

			datepickerReady($btn);
		});

		$datepicker.find('.ps-datepicker-btn').off('click.uidatepicker').on('click.uidatepicker', function() {
			datepickerReady(this);
			// $(this).attr('aria-hidden', true).siblings().attr('aria-hidden', true);

			tparent = $('.ps-drop-pnl[data-add="' + $(this).parents('.ps-datepicker ').attr('data-name') + '"]')
			loopHidden = setInterval(function(){
				focusNonout();
			},1)
		});

		function datepickerReady(v){
			var $this = $(v),
				dropid = $this.attr('data-name'),
				inputId = $this.data('inp'),
				regExp = /^([0-9]{4})-([0-9]{2})-([0-9]{2})/g,
				_val = $('.inp-base[data-name=' + inputId +']').val(),
				reset = regExp.test(_val),
				calspaceHTML = '',
				calspaceHTML_end = '';
				dateId = $this.closest('.ps-datepicker').attr('data-name');
			$this.data('sct', $(doc).scrollTop());
			// !reset ? $('.inp-base[data-name=' + inputId +']').val(''): ''; 초기값에 날짜 이외의 텍스트일경우 삭제
			//수정
			$('body').find('.ps-datepicker-wrap[data-add=' + dateId + '] .datepicker-sec').remove();
			// 수정 end

			calVar = new calendarObject({ 
				calId: "calWrap_" + dropid, 
				inputId: inputId, 
				buttonId: "calBtn_" + dropid,
				shortDate: shortDate
			});

			calspaceHTML += '<div data-name="' + calVar.calId +'" class="datepicker-sec">';
			calspaceHTML += '<div class="datepicker-wrap">';
			calspaceHTML += '</div>';
			calspaceHTML += '</div>';
			//수정
			$('body').find('.ps-datepicker-wrap[data-add=' + dateId + ']').append(calspaceHTML);
			// 수정 end
			displayCalendar(calVar, 'generate');
			
			if($('.inp-base[data-name=' + inputId +']').val() == ""){
				$('.ps-datepicker-wrap').find('.tbl-datepicker button[data-day="' + textDate(dateToday.getDate(), dateToday.getMonth() + 1, dateToday.getFullYear()) + '"]').addClass('selected2 today').attr('aria-selected', true).attr('aria-label', '오늘 날짜');
			}else{
				$('.ps-datepicker-wrap').find('.tbl-datepicker button[data-day="' + textDate(dateToday.getDate(), dateToday.getMonth() + 1, dateToday.getFullYear()) + '"]').addClass('selected2 today').attr('aria-selected', false).attr('aria-label', '오늘 날짜');
				$('.ps-datepicker-wrap').find('.tbl-datepicker button[data-day="' + $('.inp-base[data-name=' + inputId +']').val() + '"]').addClass('selected').attr('aria-selected', true).attr('aria-label', '현재선택 날짜');
			}

			if (dual) {
				$this.closest('.ps-datepicker').find('.ps-datepicker-wrap').addClass('dual');
			}
		}	
	}


})(jQuery, window, document);