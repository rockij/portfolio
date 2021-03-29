var uiCommon, uiMain;
$(function(){
	uiCommon = {
		init: function(){
			uiCommon.gnbHeader.init(); // GNB 공통
			$('[target-layer-open]').length > 0 && uiCommon.layer.init(); // layer 관리
			$('.accordionWrap').length > 0 && uiCommon.accordion.init(); // accordion 관리
			$('.tab').length > 0 && uiCommon.tab.init(); // tab 관리
			$('input[type=text]').length > 0 && uiCommon.placeHolder.init(); // placeholder 관리
			$('[scrollTabley]').length > 0 && uiCommon.tableScroll.init(); // 테이블 스크롤 관리
			$('[target-tooltip]').length > 0 && uiCommon.toolTip.init(); // tooltip 관리
			$('.tableWrap').length > 0 && uiCommon.tableAccessibility.init(); // 테이블 summary, caption 관리
			$('.viewArea').length > 0 && uiCommon.widePage(); // container width:100%
			$('i.icon.print').length > 0 && uiCommon.printTitle.init();
			$('i.icon.print').length > 0 && uiCommon.printTitle.init();
		},
		widePage: function() {
			if ( $('.viewArea').hasClass('wide')) {
				$('.viewArea').parents('#container').css('width','100%');
			}
		},
		gnbHeader : {
			init : function() {
				var _this = this;

				_this.heightSet();

				var depth = $('.headerMenu .cate');

				depth.find('>a').bind("focusin", function() {
					depth.removeClass('active');
					$(this).parent().addClass('active');
				});

				depth.bind("mouseenter", function() {
					$(this).addClass('active');
				});
				
				depth.bind("mouseleave", function() {
					$(this).removeClass('active');
				});
			},
			heightSet : function(){
				$('.headerMenu .cate').each(function() {
					var $this = $(this),
						subDepth = $this.find('.cate_sub'),
						list = subDepth.find('> ul > li'),
						depthLength = list.length,
						firstLineHeight = 0,
						twoLineHeight = 0;

					$(this).addClass('active');

					/* 2번째 줄 li 채워넣기 */
					if ( depthLength > 6 ) {
						for(var x=depthLength; x<12; x++) {
							subDepth.find('> ul').append('<li></li>');
						}
					}

					/* 1~6번째 */
					for ( var idx=0; idx < 6; idx++) {
						var list_h = list.eq(idx).innerHeight();
						if ( list_h > firstLineHeight ) {
							firstLineHeight = list_h;
						}
					}
					subDepth.find('> ul > li:lt(6)').css('height', firstLineHeight);

					/* 7번째 ~ */
					for ( var idx=6; idx < depthLength; idx++) {
						var list2_h = list.eq(idx).innerHeight();
						if ( list2_h > twoLineHeight ) {
							twoLineHeight = list2_h;
						}
					}
					subDepth.find('> ul > li:gt(5)').css('height', twoLineHeight);

					$(this).removeClass('active');
				})
			}
		},
		printTitle : {
			init: function() {
				var _this = this;

				_this.title();
			},
			title : function() {
				var target = $('i.icon.print');

				target.parent().each(function() {
					$(this).attr({'title':'인쇄 팝업 새창열기'});
				});
			}
		},
		toolTip: {
			init: function(){

				var _this = this;

				$(this).attr({'title':'툴팁 레이어 팝업 열림'});

				_this.toggle();

			},
			toggle: function(){

				$('[target-tooltip]').bind('click', function(){
					if($(this).hasClass('on')){
						$(this).removeClass('on').attr({'title':'툴팁 레이어 팝업 열림'}).siblings($('.' + $(this).attr('target-tooltip'))).fadeOut();
					} else {
						$(this).addClass('on').attr({'title':'툴팁 레이어 팝업 닫힘'}).siblings($('.' + $(this).attr('target-tooltip'))).fadeIn();
					};
				});

			}
		},
		tableAccessibility: {
			strArr: [],
			init: function(){

				var _this = this

					_this.set();

			},
			set: function(){
				var _str = uiCommon.tableAccessibility.strArr;

				$('.tableWrap').each(function(i){

					$('.tableWrap').eq(i).find('th').each(function(n, items){

						_str.push($(this).text());

						if($('.tableWrap').eq(i).find('th').length - 1 == n){

							_str = uiCommon.arrFiltering(_str)

/*
							_str = _str.filter(function(item) {
								  return item !== null && item !== undefined && item !== '';
							});
*/
							$('.tableWrap').eq(i).find('table').attr('summary', _str + '으로 구성').find('caption').text(_str + '으로 구성');

							_str = [];

						};

					});

				});
			}
		},
		tableScroll: {
			init: function(){
				var _this = this;
				$('[scrollTabley]').each(function(i){
					var w = _this.cal($(this)),
						h = $(this).attr('data-height'),
						th = $(this).find('thead').outerHeight();
					if(!$('div', this).hasClass('scrollY')){
						$(this).css({'position':'relative'}).find('table').wrap('<div class="scrollY"></div>');
						$('> .scrollY', this).attr('style','width:'+ w +'px; max-height:'+ h +'px; margin-top: '+ th +'px;').find('thead').css({'position':'absolute', 'top':'0'});
					} else {
						$('> .scrollY', this).attr('style','width:'+ w +'px; max-height:'+ h +'px; margin-top: '+ th +'px;').find('thead').css({'position':'absolute', 'top':'0'});
					};
				});
				$('[scrollTablexy] .scrollTable').wrap('<div class="scrollXY"></div>');
				$('.scrollXY').bind('scroll', function(){
					$(this).prev('table').css({'margin-left': -$(this).scrollLeft()});
				});
				_this.set();
			},
			set: function(){
				$('[scrollTabley] colgroup col').each(function(i){
					$('[scrollTabley] thead th').eq(i).width($(this).width());
				});
			},
			cal: function($this){
				return $this.find('table').outerWidth();
			}
		},
		placeHolder: {
			init: function(){

				var _this = this;

				$('input[type=text]').each(function(i){

					if($(this).val().length == 0 ){
						$(this).attr('placeholder', $(this).attr('data-placeholder'))
						//$(this).val($(this).attr('data-placeholder'));

					} else {

						$(this).addClass('isValue');

					};

				});

				_this.in();
				_this.out();

			},
			in: function(){

				$('input[type=text]').bind('focusin', function(){

					if($(this).val() == $(this).attr('data-placeholder') ){

						$(this).val('');

					};

					$(this).bind('keypress keyup keydown', function(){

						$(this).val().length > 0 ? $(this).addClass('isValue') : $(this).removeClass('isValue');

					});

				});

			},
			out: function(){

				$('input[type=text]').bind('focusout', function(){

					if($(this).val() != $(this).attr('data-placeholder') && $(this).val().length > 0){

						return false;

					} else if($(this).val().length == 0){

						$(this).attr('placeholder', $(this).attr('data-placeholder'));

					};

				});
			}

		},
		tab: {//tab 관리
			init: function(){

				var _this = this;

				$('.tab li').eq(0).find('a').attr({'title':'현재 탭','aria-selected':'true', 'role':'tab'});
				$('.tabContent').children('div').eq(0).attr('aria-hidden','false').siblings('div').attr('aria-hidden','true');

				_this.handler();

			},
			handler: function(){

				$('.tab li a').bind('focusin click', function(){

					var i = $(this).closest('li').index();

					$(this).addClass('on').attr({'title':'현재 탭','aria-selected':'true'}).closest('li').siblings('li').find('a').removeClass('on').attr({'title':'','aria-selected':'false'});
					$(this).closest('.tab').next('.tabContent').children('div').attr('aria-hidden','false').eq(i).show().siblings('div').hide().attr('aria-hidden','true');

				});

			}
		},
		accordion: {//accordion 관리
			init: function(){

				var _this = this;

				$('.accordionWrap dt').attr({'role':'presentation'});
				$('.accordionWrap dt a').addClass('trigger').attr({'title':'상세내용 열림', 'role':'button'});
				$('.accordionWrap dd').height(0);

				_this.handler();

			},
			handler: function(){
				$('.accordionWrap').find('.trigger').bind('click', function(){

					var h = $(this).closest('dt').next('dd').children('div').outerHeight();

					if($(this).hasClass('on')){
						$(this).attr('title', '상세내용 닫힘').removeClass('on');
						$(this).closest('dt').next('dd').animate({'height': 0});
					} else {
						$(this).attr('title', '상세내용 닫힘').addClass('on').closest('dt').siblings('dt').find('a').attr('title', '상세내용 열림').removeClass('on');
						$(this).closest('dt').next('dd').animate({'height': h}).closest('dd').siblings('dd').animate({'height': 0});
					};

				});
			}
		},
		layer: {//layer 관리
			obj: null,
			init: function(){

				var _this = this;

				$('.layer').attr({'role':'dialog','aria-hidden':'true'});

				$('[target-layer-open]').bind('click', function(){

					var t = $(this).attr('target-layer-open').split(';'),
						t = uiCommon.arrFiltering(t);

					_this.open(t[0], t[1]);

					_this.obj = $(this);

				});

				$('[target-layer-close]').bind('click', function(){

					var t = $(this).attr('target-layer-close');
					_this.close(t);

				});

			},
			open: function(t, d){

				$('.' + t).attr({'tabindex':0,'aria-hidden':'false'}).show().focus();
				d == 'dim' && uiCommon.dim.show(t);

			},
			close: function(t){

				uiCommon.dim.hide(t);
				$('.' + t).attr({'tabindex':'','aria-hidden':'true'}).hide();
				uiCommon.layer.obj && uiCommon.layer.obj.focus();

			}
		},
		arrFiltering: function(v){

			return v = v.filter(function(item) {
						return item !== null && item !== undefined && item !== '';
					});

		},
		dim: {// dim 관리
			show: function(t){

				$('body').append('<div class="dim" name="'+t+'"></div>');

			},
			hide: function(t){

				$('.dim[name="'+ t +'"]').remove();

			}
		},
		counting: function(target, timer, speed){ // 카운팅 모션
			var timer = 0, speed = 1;
			$('.'+target+' .range').each(function(){
				var $this = $(this),
					per = $this.attr('per');
				$({animatedValue:0}).delay(timer*1000).animate({animatedValue:per},{
					duration: speed*1000,
					step: function(){
						$this.text( String(Math.ceil(this.animatedValue)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") );
					},
					complete: function() {
						$this.text( String(Math.ceil(this.animatedValue)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") );
					}
				});
			});
		},
		browserCehck: function(){ // 브라우저 확인
			var agent = navigator.userAgent, match;
			var app, version;
			if((match = agent.match(/MSIE ([0-9]+)/)) || (match = agent.match(/Trident.*rv:([0-9]+)/))) app = 'Internet Explorer';
			else if(match = agent.match(/Chrome\/([0-9]+)/)) app = 'Chrome';
			else if(match = agent.match(/Firefox\/([0-9]+)/)) app = 'Firefox';
			else if(match = agent.match(/Safari\/([0-9]+)/)) app = 'Safari';
			else if((match = agent.match(/OPR\/([0-9]+)/)) || (match = agent.match(/Opera\/([0-9]+)/))) app = 'Opera';
			else app = 'Unknown';
			if(app !== 'Unknown') version = match[1];
			// alert('Browser: ' + app);
			// alert('Version: ' + version);
			if( app == 'Internet Explorer'){
				$('html').addClass('ie');
			}
			if( app == 'Internet Explorer' && version == 9 ){
				$('html').addClass('ie9');
				$('.animate').removeClass('animate');
			}
		},
	};
	uiMain = {
		init: function(){
			$('.cmsMainLogin').length > 0 && uiMain.mainBanner(); //메인 배너
			uiCommon.browserCehck(); //ie9 브라우저 체크
		},
		mainBanner : function() {
			$('.bannerSlide').flexslider({
				animation: "slide",
				loop:true,
				directionNav: false,
				pauseOnAction: true,
				pausePlay: true,
				slideshowSpeed: 5000,
				animationSpeed: 500,
			});
			var pauseLeft = $('.flex-control-paging').width();
			$('.flex-pauseplay').css('left',pauseLeft+30)
		},
		scrollMotion: function(){ //스크롤시에 모션의 실행 시점 설정
			var count1 = false,
				count2 = false;
			$(window).bind("scroll DOMMouseScroll", function(){
				var	viewTop = $(this).scrollTop(),
				viewHeight = $(this).height() / 5.5,
				viewBottom = viewTop + viewHeight;
				// console.log(viewHeight);
				$('.animate').each(function() {
					var elementTop = $(this).offset().top,
					elementHeight = $(this).height(),
					elementBottom = elementTop + elementHeight;
					if(viewTop < elementBottom && viewBottom > elementTop) {
						var id = $(this).attr('id');
						$('#'+id).addClass('active');
						if(id === 'sec03'){
							if(!count1){
								uiCommon.counting('sec03');
							}
							count1 = true;
						}else if(id === 'sec04'){
							if(!count2){
								uiCommon.counting('sec04', .5, 1);
							}
							count2 = true;
						}
					}if(viewTop <= $('.visual').outerHeight(true) / 1.3	) { //제일 상단으로 갔을시 reset
						$('.animate').removeClass('active');
						$('.sec03 .range').text('0,000,000');
						$('.sec04 .range').text('0');
						count1 = false;
						count2 = false;
					}
				});
			}).trigger("scroll");
		}
	};
	uiCommon.init();
	uiMain.init();
	uiMain.scrollMotion();
});
