try {
	window.addEventListener('load', function () {
		setTimeout(scrollTo, 0, 0, 1);
	}, false);
} catch (e) {
}
var uiCommon;


$(function () {
	uiCommon = {
		$window : null,
		$body: null,
		cv: null,
		ST: null,
		layerOrderArr: [],
		isAlert: false,
		init: function () {
			this.set(); // 객체에 dom 할당
			this.evtBinding(); //기본 이벤트 바인딩
			this.iosFixedBug(); // ios fixed 버그 픽스용
//			$('.cal').length > 0 && this.headerTest(); // 임시 헤더 테스트
			$('.formPassword').length > 0 && this.pwdFn(); // 비밀번호 입력 인터렉션
			$('.accordionList').length > 0 && this.accordionFn(); // 아코디언 리스트
			$('.tabWrapJs').length > 0 && this.tabFn(); // tab
			$('.toggleClassWrap').length > 0 && this.toggleClass(); // 클래스 토글
			$('.alertLayer').length > 0 && this.dimClickClose(); // dim 클릭시 레이어 닫기
			$('.priceTooltip').length > 0 && this.closePriceTooltip(); // 툴팁 레이어 닫기
//			$('#canvasGraph').length > 0 && this.drawGraph(); // 그래프
			$('.carSearch').length > 0 && this.carSearchFn(); //신차중고차 조회
			$('.formInput').length > 0 && this.addBtnDel(); //삭제 버튼 제어
			$('.yearCarDetail').length > 0 && this.yearSwiper(); // 년도별 swiper
			$('.itemTab').length > 0 && this.itemSwiper(); // itemTab swiper
//			$('.priceTableWrap').length > 0 && this.priceTblScroll(); //price table scroll
			$('.dropBox').length > 0 && this.dropBox(); // drop box
			$('#container.loungeMain').length > 0 && this.loungeMainFn(); //라운지 메인
			$('.main #container.index').length > 0 && this.mainIndexFn(); // 메인
			$('.guide #container.guidePop').length > 0 && this.guidePopFn(); // 스플래시
			$('.partner #container.oftenMessage').length > 0 && this.partnerFn(); // 파트너
			$('.carVisual').length > 0 && this.carVisual();
			$('.filterSeleted').length > 0 && this.filterToggle();
			$('.cmmTooltip').length > 0 && this.cmmTooltip(); // tooltip
			$('.formInput.datepicker , .salesCalender, .fromDate').length > 0 && this.dateCalender();
			$('.footMenu').length > 0 && this.fixBtnAreaFn(); // 고정버튼 + 풋메뉴
		},
		headerTest: function(){
			var testHeader = ''
				testHeader += '<header style="background: #f5f5f5;">';
				testHeader += '<h2>테스트헤더</h2>';
				testHeader += '<a href="javascript:;" class="btnPrev">이전페이지로 이동</a>';
				testHeader += '<a href="#" class="btnSearch">검색</a>';
				testHeader += '</header>';

				$('main').prepend(testHeader);

		},
		pwdFn: function () { // 비밀번호 입력 인터렉션
			var $ui = $('.formPassword'),
				inpPw = $ui.find('input');

			inpPw.on('keydown', function (e) {
				var pwIdx = $(this).val().length,
					pwBg = $(this).parent().find('.pwdotArea > span'),
					backspace = 8;

				if (e.keyCode == backspace) {
					pwBg.eq(pwIdx - 1).removeClass('active');

				} else {
					pwBg.eq(pwIdx).addClass('active');
				};

				/*
				setTimeout(function(){
					console.log(inpPw.val(), 'length: '+ pwIdx)
				}, 10)
				*/

			});
		},
		accordionFn: function () { //아코디언 리스트
			var ratalCal =  $('#container.ratalCal');

			if ( ratalCal.find('.accordionList .trigger').length == 1 ) {
				$('.accordionList .trigger').addClass('none');
			} else {
				$('.accordionList .trigger').on('click', function (e) {
					if(!$(this).hasClass('none')){
						if ($(this).hasClass('on')) {
							$(this).removeClass('on').next('dd').slideUp(300);
						} else {
							$(this).addClass('on').next('dd').slideDown(300).closest('li').siblings('li').find('.trigger').removeClass('on').next('dd').slideUp(300);
						};
					};
				});
			}
		},
		tabFn: function () { //tab
			var tabWrap = $('.tabWrapJs'),
				tab = $('> ul li', tabWrap),
				tabCont = tabWrap.find('.tabContArea .tabCont');

			tab.find('a').on('click', function () {
				var idx = $(this).parent().index();
				tab.removeClass('on');
				$(this).parent().addClass('on');
				tabCont.removeClass('on');
				tabCont.eq(idx).addClass('on');
			});
		},
		toggleClass: function () { // class toggle 기능
			$('.toggleClassWrap > li').on('click', function () {
				if ($(this).hasClass('on')) {
					$(this).removeClass('on');
				} else {
					$(this).addClass('on').closest('li').siblings('li').removeClass('on');
				};
			});
		},
		tabRadio: function($this){ // tab radio
			$this.closest('span').addClass('on').siblings('span').removeClass('on');
		},
		openFullLayer: function(e){ // 풀팝업 띄우기
			var target = $(e.target).attr('open-fullLayer-id') || e;
			this.getScrollTop();
			$('.'+ target +'').closest('.fullPopupLayer').fadeIn(300, function(){
				$body.css('position','fixed');
			}).addClass('on');
			this.layerOrderArr.push(target);
		},
		closeFullLayer: function(e, $this){ // 풀팝업 닫기
			$body.css('position','static');
			this.setScrollTop();
			$('.'+ this.layerOrderArr[this.layerOrderArr.length - 1] +'').closest('.fullPopupLayer').fadeOut(300).removeClass('on');
			this.layerOrderArr.splice(this.layerOrderArr.length - 1,1);
		},
		openAlertLayer: function (e) { // 알럿 레이어 열기
			var target = $(e.target).attr('open-layer-class') || e;
			$body.append('<div class="dim"></div>');
			$('.'+ target +'').fadeIn(300).addClass('on');
		},
		openLayer: function(tar){
			tar = tar.replace('#', '')
			$('#'+ tar +'').fadeIn(300).addClass('on').find('.btnLayerClose').attr('layer-name', tar);
			$body.append('<div class="dim" layer-name="'+ tar +'"></div>');
		},
		closeLayer:function(tar){
			$('#'+ tar +'').fadeOut(300).removeClass('on');
			$('div[layer-name='+ tar +']').remove();
		},
		closeAlertLayer: function (e) { // 알럿레이어 닫기
			var target = $(e.target).attr('close-layer-class') || e;
			$('.dim').remove();
			$('.'+ target +'').fadeOut(300).removeClass('on');
		},
		dimClickClose: function(){ // dim 클릭시 알럿 레이어 닫기
			uiCommon.closeAlertLayer('alertLayer');
			$('.dim').remove();
		},
		oepnPriceTooltip: function($this){ // 가격 툴팁 열기
			if($this.hasClass('on')){
				$this.removeClass('on');
				$('.'+ $this.attr('data-tooltip-class') +'').fadeOut(300);
			} else {
				$this.addClass('on').closest('dt').siblings('dt').find('a').removeClass('on');
				$('.'+ $this.attr('data-tooltip-class') +'').fadeIn(300).siblings('.tooltip').fadeOut(300);
			};
		},
		closePriceTooltip: function(){ // 가격 툴팁 닫기
			$window.on('click', function(e){
				if(!$(e.target).hasClass('tooltip') && !$(e.target).closest('div').hasClass('priceTooltip')){
					$('.tooltip').fadeOut(300);
					$('.priceTooltip dt a').removeClass('on');
				};
			});
		},
		cmmTooltip : function() {
			var $wrap = $('.cmmTooltip');

			$wrap.find('a').on('click', function() {
				$(this).siblings('.toolCont').fadeToggle(300);
			});

			$window.on('click', function(e){
				if(!$(e.target).hasClass('toolCont') && !$(e.target).closest('div').hasClass('cmmTooltip')){
					$('.toolCont').fadeOut(300);
				};
			});
		},
		checkLength: function($this){ // input의 length체크 하여 삭제버튼 show, hide
				$this.val().length > 0 ? $this.siblings('.btnDel').show() : $this.siblings('.btnDel').hide();
		},
		toggleTrim: function($this){
			if($this.hasClass('on')){
				$this.removeClass('on').siblings('ul').height(4 * $this.siblings('ul').find('li').innerHeight());;
			} else {
				$this.addClass('on').siblings('ul').height($this.siblings('ul').find('li').length * $this.siblings('ul').find('li').innerHeight());
			};
		},
		addBtnDel: function(){ // input에 삭제 버튼 넣기
			$('input').siblings('.btnDel').remove();
			$('.formInput').each(function(){

				$(this).parent().hasClass('idNumArea') ||
				$(this).parent().hasClass('certiSecond') ||
				$(this).append(btnDel);

				if($('input', this).val().length > 0){
					$('input', this).prop('disabled') ||
					$('input', this).prop('readonly') ||
					$('.btnDel', this).show();
				};
			});
		},
		clearInput: function($this){ // input의 value값 초기화 하고 삭제버튼 hide
			$this.siblings('input').val('').change().focus().end().hide();
		},
		tabNewVehiclePrice: function($this){ //newVehiclePrice 페이지의 탭 이동시 상단 영역 show, hide
			if($this.index() == 2){
				$('.selectBox').show();
				$('.selectBtn').hide();
			} else {
				$('.selectBox').hide();
				$('.selectBtn').show();
			}
		},
		loanCounselSearch: function(idx){
			$('.notiWrap ul').eq(idx).show().siblings('ul').hide();
		},
		allChkCtrl: function(e, $this){ // 약관동의 페이지 전체 체크 기능
			var check = $('input[type=checkbox]', $this).prop('checked');
				$('.agreeList ul input[type=checkbox]').prop('checked', check);
		},
		chkCtrl: function(e, $this){ // 약관동의 페이지 하단 체크 컨트롤 기능

			var chkBox =  $('.agreeList ul input[type=checkbox]');

			for(var i=0; i < chkBox.length; i++){

				if(!chkBox.eq(i).prop('checked')){
					$('.allChk input[type=checkbox]').prop('checked', false);
					break;
				};

			};

			i == chkBox.length && $('.allChk input[type=checkbox]').prop('checked', true);

		},
		inputDirect: function($this, str){
			str.includes('직접입력') ? $this.closest('.radioArea').next().show() : $this.closest('.radioArea').next().hide();
		},
		chkInputDirect: function($this, boo){
			boo ? $this.closest('.directInput').next('.formInput').show() : $this.closest('.directInput').next('.formInput').hide();
		},
		otherPriceCtrl: function(boo){
			boo ? $('.estimateWrite .estimatePrice li .fieldList:nth-child(4)').show().siblings('.fieldList:nth-child(3)').hide() : $('.estimateWrite .estimatePrice li .fieldList:nth-child(3)').show().siblings('.fieldList:nth-child(4)').hide();
		},
		agentOnOffCtrl: function(boo){
			boo ? $('.agentWrite > fieldset').show().parent().siblings('.holdingWrite').hide() : $('.agentWrite > fieldset').hide().parent().siblings('.holdingWrite').show();
		},
		drawGraph: function(){

			var config = {
				type: 'line',
				data: {
					labels: ['10월', '11월', '12월', '1월', '2월', '3월'],
					datasets: [{
						label: '상',
						backgroundColor: '#2962c2',
						borderColor: '#94b0e0',
						borderWidth: '1',
						fill: false,
						data: [2200, 2100, 2250, 2000, 2050, 2100]
					}, {
						label: '중',
						backgroundColor: '#333333',
						borderColor: '#aaaaaa',
						borderWidth: '1',
						fill: false,
						data: [1800, 1600, 1900, 1750, 1800, 1900]
					}]
				},
				options: {
					responsive: true,
					maintainAspectRatio: true,
					devicePixelRatio: 1,
					title: {
						display: false
					},
					legend: {
						display: false
					},
					layout: {
						padding:{
							top: 0,
							right: 0,
							bottom: 0,
							left: 0
						}
					},
					scales: {
						xAxes: [{
							display: true,
							ticks: {
								fontFamily: '"Noto Sans CJK KR", "Apple SD Gothic Neo", "Nanum Gothic", sans-serif'
							}
						}],
						yAxes: [{
							display: true,
							ticks: {
								beginAtZero: true,
								fontFamily: '"Noto Sans CJK KR", "Apple SD Gothic Neo", "Nanum Gothic", sans-serif'
							}
						}]
					}
				}
			};

//			var price = new Chart(cv, config);
		},
		carSearchFn: function() { // 신차중고차 조회
			var $wrap = $('.carSearch');
				brand = $wrap.find('.brand'),
				model = brand.find('.model');

			$('html,body').css('overflow','hidden');

			brand.find('> a').on('click', function() {
				$wrap.find('> ul').addClass('action');

				if ( brand.hasClass('active') ) {
					brand.removeClass('active');
					model.removeClass('open').hide().find('li').removeClass('active');
					$('.subModel').removeClass('open').hide().find('li').removeClass('active');

					$(this).parent().addClass('active').find('.model').show().addClass('open');
				} else {
					$(this).parent().addClass('active').find('.model').fadeIn(300).addClass('open');
				};
			});

			model.find('> li > a').on('click', function() {
				if ( model.find('li').hasClass('active')) {
					model.find('li').removeClass('active');
					$('.subModel').removeClass('open').hide();

					$(this).parent().addClass('active').find('.subModel').show().addClass('open');
				} else {
					$(this).parent().addClass('active').find('.subModel').fadeIn(300).addClass('open');
				};
			});
		},
		yearSwiper : function() { //년도별 swiper
			var $wrap = $('.yearCarDetail'),
				yearTab = $wrap.find('.lineTab li');

			var yearTabSwipe = new Swiper('.yearCarDetail .yearTab.swiper-container', {
				slidesPerView:'auto',
				freeMode:true,
				slideToClickedSlide:true
			});

			var yearSwipe = new Swiper('.yearCarDetail .detailCon.swiper-container', {
				speed:350,
				on: {
					slideChange: function() {
						var idx = this.activeIndex;
						yearTab.removeClass('on').eq(idx).addClass('on');
					}
				}
			});

			yearTab.find('a').on('click', function(e) {
				var tabIdx = $(this).parent().index();
				yearSwipe.slideTo(tabIdx);
			});

		},
		itemSwiper : function() { // itemTab swiper
			var yearTabSwipe = new Swiper('.itemTab.swiper-container', {
				slidesPerView:'auto',
				freeMode:true,
				slideToClickedSlide:true
			});
		},
		priceTblScroll : function() {
			var $wrap = $('.priceTableWrap'),
				rightArea = $wrap.find('.rightArea'),
				leftArea = $wrap.find('.leftArea')

			rightArea.on('scroll', function(){
				leftArea.scrollTop(rightArea.scrollTop())
			});

			leftArea.on('scroll', function(){
				rightArea.scrollTop(leftArea.scrollTop())
			});
		},
		dropBox : function() { //drop box
			var $wrap = $('.dropBox'),
				dropBtn = $wrap.find('.dropBtn');

			dropBtn.on('click', function(e) {
				if ($(this).hasClass('on')) {
					$(this).removeClass('on').siblings('.dropList').fadeOut(300);
				} else {
					$(this).addClass('on').siblings('.dropList').fadeIn(300);
				}
			});
		},
		loungeMainFn: function () {
			var dealSlide = new Swiper('.specialDeal.swiper-container', {
				slidesPerView:'auto',
				pagination: {
					el: '.specialDeal .swiper-pagination',
					type: 'progressbar',
				},
				speed:350,
			});

			var pickSlide = new Swiper('.dealerPick.swiper-container', {
				slidesPerView: 1,
				slidesPerColumn: 2,
				// loop:true,
				pagination: {
					el: '.dealerPick .swiper-pagination',
					type: 'progressbar',
				},
				speed:350,
			});
		},
		guidePopFn: function () { //스플래시
			var splashSlide = new Swiper('.guideArea.swiper-container', {
				slidesPerView:'auto',
				parallax: true,
				speed:350,
				pagination: {
					el: '.guideBottom .swiper-pagination',
					type: 'bullets',
				},
			});
		},
		partnerFn: function () { //파트너
			$('.oftenMessage .msgWrap ul li').on('click', function(e){
				$(this).toggleClass('select').siblings().removeClass('select');
			});
		},
		mainIndexFn: function () { //메인
			var dealSlide = new Swiper('.specialDeal.swiper-container', {
				slidesPerView:'auto',
				pagination: {
					el: '.specialDeal .swiper-pagination',
					type: 'progressbar',
				},
				speed:350,
			});

			var pickSlide = new Swiper('.dealerPick.swiper-container', {
				slidesPerView: 1,
				slidesPerColumn: 2,
				// loop:true,
				pagination: {
					el: '.dealerPick .swiper-pagination',
					type: 'progressbar',
				},
				speed:350,
			});
		},
		salesMain: function($this){
			$('.graphWrap > div').eq($this.index()).show().siblings('div').hide();

		},
		carVisual : function() {
			var auctionSlide = new Swiper('.carVisual.swiper-container', {
				slidesPerView: 1,
				pagination: {
					el: '.carVisual .swiper-pagination',
					type: 'progressbar',
				},
				loop:true,
				speed:350,
			});
		},
		filterToggle : function() {
			var filterArea = $('.filterSeleted'),
				btnToggle = filterArea.find('.btnToggle');

			btnToggle.on('click', function() {
				if ($(this).hasClass('on')) {
					$(this).removeClass('on').siblings('ul').removeClass('open');
				} else {
					$(this).addClass('on').siblings('ul').addClass('open');
				}
			});
		},
		evtBinding: function(){ // 기본 이벤트 바인딩
			$('.openFullLayer').on('click', function(e){
				uiCommon.openFullLayer(e);
			});
			$('.closeFullLayer').on('click', function(e){
				uiCommon.closeFullLayer();
			});
			$('.openAlertLayer').on('click', function(e){
				uiCommon.openAlertLayer(e);
			});
			$('.closeAlertLayer').on('click', function(e){
				uiCommon.closeAlertLayer(e);
			});
			$body.on('click', '.dim', function(){
				uiCommon.dimClickClose();
				uiCommon.closeLayer($(this).attr('layer-name'));
			});
			$('.priceTooltip dt a').on('click', function(){
				uiCommon.oepnPriceTooltip($(this));
			});
			$('body').on('click', '.btnDel', function(){
				uiCommon.clearInput($(this));
			});
			$('.formInput input').on('keyup', function(){
				uiCommon.checkLength($(this));
			});
			$('.newVehiclePrice .lineTab li').on('click', function(){
				uiCommon.tabNewVehiclePrice($(this));
			});
			$('.openLayer').on('click', function(e){
				uiCommon.eventBubbleCtrl(e);
				uiCommon.openLayer($(this).attr('href'));
			});
			$('.btnLayerClose').on('click', function(){
				uiCommon.closeLayer($(this).attr('layer-name'));
			});
			$('.agreeList .formChkbox').on('click', function(e){
//				$(this).hasClass('allChk') ? uiCommon.allChkCtrl(e) : uiCommon.chkCtrl(e);
			});
			$('.radioArea.directInput label').on('click', function(){
				uiCommon.inputDirect($(this), $(this).text())
			});
			$('.chkDirect input[type=checkbox]').on('change', function(){
				uiCommon.chkInputDirect($(this), $(this).prop('checked'))
			});

			$('.onlineMaketing .radioArea input[type=radio]').on('change', function(){
				var str = $(this).next().text();
				str.includes('미이용') ? $(this).closest('.radioArea').next().hide() : $(this).closest('.radioArea').next().show();
			});

			$('.otherPrice .tt .formChkbox').on('change', function(e){
				uiCommon.otherPriceCtrl($('input[type=checkbox]', this).prop('checked'));
			});
			$('.agentWrite .titHead .settingCheckBox').on('change', function(e){
				uiCommon.agentOnOffCtrl($('input[type=checkbox]', this).prop('checked'));
			});
			$('.tabRadio label').on('click', function(){
				uiCommon.tabRadio($(this));
			});

			$('.salesMain .toggleClassWrap li').on('click', function(){
				uiCommon.salesMain($(this))
			});

			$('.loanCounselSearch .radioArea span').on('click', function(){
				uiCommon.loanCounselSearch($(this).index());
			});

			$('.trimToggle').on('click', function(){
				uiCommon.toggleTrim($(this));
			});


			$('.fieldList .formInput input[type=tel], .fieldList .formInput input[type=text]').on('focus', function(){
				$(this).closest('dd').prev('dt').addClass('bdcolor');
			});
			$('.fieldList .formInput input[type=tel], .fieldList .formInput input[type=text]').on('blur', function(){
				$(this).closest('dd').prev('dt').removeClass('bdcolor');
			});
			$('.fieldList div.formInput input[type=tel], .fieldList div.formInput input[type=text]').on('focus', function(){
				$(this).closest('div.formInput').siblings('div.formInput').find('input[type=tel], input[type=text]').css('borderColor', '#2962c2');
			});
			$('.fieldList div.formInput input[type=tel], .fieldList div.formInput input[type=text]').on('blur', function(){
				$(this).closest('div.formInput').siblings('div.formInput').find('input[type=tel], input[type=text]').css('borderColor', '');
			});
			$('.bankChange div.formArea input[type=tel], .bankChange div.formArea input[type=text], .loanAccount div.formArea input[type=tel], .loanAccount div.formArea input[type=text]').on('focus', function(){
				$(this).closest('div.formArea').siblings('div.selectBtn').find('a').css('borderColor', '#2962c2');
			});
			$('.bankChange div.formArea input[type=tel], .bankChange div.formArea input[type=text], .loanAccount div.formArea input[type=tel], .loanAccount div.formArea input[type=text]').on('blur', function(){
				$(this).closest('div.formArea').siblings('div.selectBtn').find('a').css('borderColor', '');
			});

		},
		dateCalender: function() {
			$.datepicker.setDefaults({
				dateFormat: 'yy.mm.dd (DD)',
				prevText: '이전 달',
				naxtText: '다음 달',
				monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
				monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
				dayNames: ['일', '월', '화', '수', '목', '금', '토'],
				dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
				dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
				showMonthAfterYear: true,
				showOtherMonths: false,
				yearSuffix: '년',
				buttonImageOnly: false,
				showButtonPanel: false,
				closeText: '닫기',
				// onSelect: function(dateText, param){
				// 	console.log(param)
				// 	$('.datepicker').text(dateText)
				// }
			});

			$('.formInput.datepicker input').datepicker();
			$('.salesCalender').datepicker();
			$('.fromDate input').datepicker();
		},
		fixBtnAreaFn: function() { // 풀메뉴 + 하단고정버튼일경우 여백
			if ( $('.btnArea.full').length > 0) {
				$('#container').addClass('fixBtnArea');
			}
		},
		eventBubbleCtrl: function(e){ // 이벤트 버블링 컨트롤
			e.stopPropagation();
			e.preventDefault();
		},
		getScrollTop: function(){ // scroll top 값 가져오기
			this.ST = $(window).scrollTop();
		},
		setScrollTop: function(){ // scroll top 위치로 보내기
			$(window).scrollTop(this.ST);
		},
		iosFixedBug: function(){ // ios fixed 버그 픽스용
			$('body').append('<div class="console"><p></p>ios fixed 버그 수정용 소스 입니다.</div>')
			$window.on('scroll', function(){
				$('.console p').text('1');
			});
		},
		set: function(){ // 기본 돔 및 변수 셋팅
			$window = $(window);
			$body = $('body');
			btnDel = '<a href="javascript:;" class="btnDel">삭제</a>';
//			cv = document.getElementById('canvasGraph').getContext('2d');
		}
	};

	uiCommon.init();

});
