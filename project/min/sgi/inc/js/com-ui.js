/* 실행함수 */
$(document).on('pageshow', function() {
// $(document).ready(function(){
	SgiUI.rdochkLabel('.ps-rdo, .ps-chk, .select-wrap .item');
	SgiUI.btmPopSheet('.bottom-listpop');
	SgiUI.accordion('.ps-accordion-wrap');
	SgiUI.chkAccordion('.ps-chk-accordion-wrap');
	SgiUI.tab('.tab-01', '.tab-conts-01');
	SgiUI.tab('.tab-02', '.tab-conts-02');
	SgiUI.tab('.tab-03', '.tab-conts-03');
	SgiUI.tab('.tab-04', '.tab-conts-04');
    // SgiUI.btomSheet('.sheet-wrap');
	SgiUI.modalOpen('.open-modal');
	SgiUI.modalClose('.close-js');
	// SgiUI.bottomOpen('.open-bottom');
	// SgiUI.bottomClose('.close-bottom');
	SgiUI.bottomPopOpen('.open-bottomlist');
	SgiUI.bottomPopClose('.close-bottomlist');
	SgiUI.rollUpFix('.ui-page-active .rollup-fix-data', '.ui-page-active .content, .ui-page-active .pop-content');
	SgiUI.dateStat('.date-stat-wrap .btn');
    SgiUI.tableFix('.table-fix-wrap');
	SgiUI.fileSelect('.ps-file-wrap');
	SgiUI.switchLabel('.ps-switch-wrap');
	SgiUI.addrDetail('.addr-list-wrap');
	SgiUI.bookMarkToggle('.btn-book-mark');
	SgiUI.dateToggle('.date-deta-btn');
	SgiUI.accordionSelf('.acco-btn-item');
	SgiUI.starrev('.star-item');
	SgiUI.moreList('.ps-btn-more');
    SgiUI.headerFix('.header-fixed');
    SgiUI.accoFix('.acco-top-fixed');
	SgiUI.allMenuOpen('.btn-menu-open');
	SgiUI.addDatePicker('.ps-datepicker');
	SgiUI.dataPickerInput();
    //SgiUI.mainMoreList('.ps-main-more');
    //SgiUI.addFrom('.btn-add-from');
    SgiUI.datelistSort('.sort-btn-wrap');
	SGI.uiDatePicker({selector: '[data-name*="uiDatePicker"]'});
	swipeInit();//스와이프 실행
});
  
/* 스와이프 셋팅 */
function swipeInit() {
    SgiUI.swipeMain('.swiper-main');
    SgiUI.swipeCeMain('.ce-swiper-main');
    SgiUI.swipeMainBanner('.swiper-main-banner');
    //SgiUI.swiperMainPrdt('.swiper-main-prdt');
	SgiUI.swipeSubMain('.swiper-submain');
	SgiUI.swipeTab('.swiper-tab-wrap');
	// SgiUI.swipeDotNonloop('.agree-swiper');
	SgiUI.swipeDotNonloop('.info-swiper');
    SgiUI.swipeYearMonth('.btm-calendar-wrap');
    SgiUI.swipeDotCanNonloop('.test-swiper-02');
};

var SgiUI = {
	checkObj: function(obj) {
		return $(obj).length == 0 ? false : true;
	},
	// 인풋 입력값 체크
	dataPickerInput: function() {
		var originVal = $.fn.val;
		$.fn.val = function(value) {
			var res = originVal.apply(this, arguments);
			if (this.is("input") && arguments.length >= 1) {
				this.trigger("input")
			}
			return res;
		};
	},
	addDatePicker: function(obj) {
		if ($('.ui-page-active').find(obj).length == 0) {
			return;
		}else{
			var dpwrapNum = 0;
			$('.container .ps-drop-pnl, .pop-container .ps-drop-pnl').each( function() {
				$(this).remove();
			})
			$('.ui-page-active').find(obj).each( function(num) {
				dpwrapNum = parseInt(num) + 1;
				$(this).attr('data-name', "uiDatePicker" + dpwrapNum);
				$(this).find('.inp-base').attr('data-name',  "lnd0060Cal" + dpwrapNum);
                $(this).find('.ps-datepicker-btn').attr({ 'data-name': "uiDatePck" + dpwrapNum, 'data-inp': "lnd0060Cal" + dpwrapNum});
                // 2019-11-25 현장영업 페이지 안 팝업에서 데이터피커 생성 문제로 수정
				$($('.ui-page-active .container , .ui-page-active .pop-container')[0]).append(
					'<div class="ps-drop-pnl ps-datepicker-wrap" data-add="uiDatePicker' + dpwrapNum + '" aria-hidden="true" data-id="uiDatePck' + dpwrapNum + '" id="uiDatePck' + dpwrapNum +'_pnl"></div>'
				);
			});
		};
	},
    swipeMain: function(obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
        };

        var dataTit = [];
        $(obj).children('.swiper-wrapper').children('.swiper-slide').each( function() {
            dataTit.push($(this).attr('data-tit'));
        });

        var mainSwiper = new Swiper(obj, {
            spaceBetween: 10,
			pagination: {
                el: '.main-tab-wrap',
                clickable: 'true',
                renderBullet: function(index, className) {
                    if(index == 0 ) {
                        return '<button type="button" class="' + className + '" aria-label="' + dataTit[index] + ' 선택됨">' + dataTit[index] + '</button>';
                    } else { 
                        return '<button type="button" class="' + className + '" aria-label="' + dataTit[index] + '">' + dataTit[index] + '</button>';
                    }
                }
            },
            a11y: {
                enabled: false
            },
            on: {
                init: function() {
                    //접근성 포커스
                    $(obj).children('.swiper-wrapper').children('.swiper-slide').eq(0).siblings().attr('aria-hidden', 'true');
                },
                slideChange: function() {
                    $(obj).find('.swiper-main-tab').attr('data-index', this.activeIndex);
                    $(obj).children('.swiper-wrapper').children('.swiper-slide').eq(this.activeIndex).addClass('slide-on');
                    //접근성 포커스, 대체 텍스트
                    $(obj).children('.swiper-wrapper').children('.swiper-slide').eq(this.activeIndex).attr('aria-hidden', 'false').siblings().attr('aria-hidden', 'true');
                    $(obj).find('.main-tab-wrap > button').each( function(i) {
                        $(this).attr('aria-label', dataTit[i]);
                    });
                    var activeAriaTxt = $(obj).find('.main-tab-wrap > button').eq(this.activeIndex).text();
                    $(obj).find('.main-tab-wrap > button').eq(this.activeIndex).attr('aria-label', activeAriaTxt + ' 선택됨');
                }
            }
        });
    },
    swipeCeMain: function(obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
        };
        
		new Swiper(obj, {
            slidesPerView: 1.2,
			spaceBetween: 17,
			centeredSlides: true,
			pagination: {
                el: '.swiper-pagination',
                clickable: true
			}
        });
    },
    //대고객 : 메인 오늘할일탭 하단, 고객센터 메인 / 현장영업(개발 실행) : 메인 하단(class: swiper-ce-banner), 사용자 가이드(class: swiper-guide-wrap)
    swipeMainBanner: function(obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
        };

        var spaceNum = 0;
        if($(obj).parent().hasClass('ce-banner-wrap')) {
            spaceNum = 17;
        }
        
		var mainBannerSwiper = new Swiper(obj, {
            spaceBetween: spaceNum,
			pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            a11y: {
                paginationBulletMessage: '{{index}}번째 배너 이동하기'
            },
            on: {
                init: function() {
                    //접근성 포커스, 대체 텍스트
                    $(obj).children('.swiper-wrapper').children('.swiper-slide').eq(0).siblings().attr('aria-hidden', 'true');
                    setTimeout( function() {
                        $(obj).find('.swiper-pagination').children('.swiper-pagination-bullet-active').attr('aria-label', '1번째 배너 이동하기 선택됨');
                    }, 100);
                },
                slideChange: function() {
                    //접근성 포커스, 대체 텍스트
                    $(obj).children('.swiper-wrapper').children('.swiper-slide').eq(this.activeIndex).attr('aria-hidden', 'false').siblings().attr('aria-hidden', 'true');
                    $(obj).find('.swiper-pagination').children('.swiper-pagination-bullet').eq(this.activeIndex).attr('aria-label', (this.activeIndex + 1) + '번째 배너 이동하기 선택됨');
                }
            }
        });
    },
    //대고객 : 메인 상품탭(2019-10-22 케이스 불러오는 시점때문에 개발에서 실행하기로 함)
    swiperMainPrdt: function(obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
        };

        if($(obj).find('.swiper-wrapper > .swiper-slide').length > 2) {
            var mainPrdtSwiper = new Swiper(obj, {
                spaceBetween: 50,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                a11y: {
                    paginationBulletMessage: '{{index}}번째 상품 이동하기'
                },
                on: {
                    init: function() {
                        //접근성 포커스, 대체 텍스트
                        $(obj).children('.swiper-wrapper').children('.swiper-slide').eq(0).siblings().attr('aria-hidden', 'true');
                        setTimeout( function() {
                            $(obj).find('.swiper-pagination').children('.swiper-pagination-bullet-active').attr('aria-label', '1번째 상품 이동하기 선택됨');
                        }, 100);
                    },
                    slideChange: function() {
                        //접근성 포커스, 대체 텍스트
                        $(obj).children('.swiper-wrapper').children('.swiper-slide').eq(this.activeIndex).attr('aria-hidden', 'false').siblings().attr('aria-hidden', 'true');
                        $(obj).find('.swiper-pagination').children('.swiper-pagination-bullet').eq(this.activeIndex).attr('aria-label', (this.activeIndex + 1) + '번째 상품 이동하기 선택됨');
                    }
                }
            });
        }
    },
    //대고객 : 상품 메인
	swipeSubMain: function(obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
		};

		var submain = new Swiper(obj, {
			speed: 300,
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},
            a11y: {
                paginationBulletMessage: '{{index}}번째 상품 이동하기'
            },
            on: {
                init: function() {
                    //접근성 포커스, 대체 텍스트
                    $(obj).children('.swiper-wrapper').children('.swiper-slide').eq(0).siblings().attr('aria-hidden', 'true');
                    setTimeout( function() {
                        $(obj).find('.swiper-pagination').children('.swiper-pagination-bullet-active').attr('aria-label', '1번째 상품 이동하기 선택됨');
                    }, 100);
                },
                slideChange: function() {
                    var nowSlideColor = $('.swiper-submain .swiper-slide').eq(this.activeIndex).attr('data-color');
                    var slidecolor = new TimelineLite();
                    slidecolor.to($('.swiper-submain , .header.color'), 0.7, {backgroundColor: nowSlideColor});
                    $('.swiper-submain .swiper-slide').eq(this.activeIndex).addClass('slide-on');
                    //접근성 포커스, 대체 텍스트
                    $(obj).children('.swiper-wrapper').children('.swiper-slide').eq(this.activeIndex).attr('aria-hidden', 'false').siblings().attr('aria-hidden', 'true');
                    $(obj).find('.swiper-pagination').children('.swiper-pagination-bullet').eq(this.activeIndex).attr('aria-label', (this.activeIndex + 1) + '번째 상품 이동하기 선택됨');
                }
            }
		});
	},
	swipeTab: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
        };
        
		SgiUI.swipeTabMenu = new Swiper(obj, {
            slidesPerView: 'auto',
            slideToClickedSlide: true,
            setWrapperSize: true
        });

	},
	/* Swipe - swipeDotNonloop /  대고객 : 약관 */
	swipeDotNonloop: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
		};
		var lastIdx = $('.ui-page-active ' + obj).find(".swiper-wrapper > .swiper-slide").length;
		
		new Swiper(obj , {
			speed: 200,
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},
			navigation:{
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next'
            },
            a11y: {
                prevSlideMessage: '이전',
                nextSlideMessage: '다음',
                paginationBulletMessage: '{{index}}번째 약관페이지 이동하기',
            },
			on:{
                init: function() {
                    //접근성 포커스, 대체 텍스트
                    $(obj).children('.swiper-wrapper').children('.swiper-slide').eq(0).siblings().attr('aria-hidden', 'true');
                    setTimeout( function() {
                        $(obj).find('.swiper-pagination').children('.swiper-pagination-bullet-active').attr('aria-label', '1번째 약관페이지 이동하기 선택됨');
                    }, 100);
                },
                slideChange: function() {
                    //접근성 포커스, 대체 텍스트
                    $(obj).children('.swiper-wrapper').children('.swiper-slide').eq(this.activeIndex).attr('aria-hidden', 'false').siblings().attr('aria-hidden', 'true');
                    $(obj).find('.swiper-pagination').children('.swiper-pagination-bullet').eq(this.activeIndex).attr('aria-label', (this.activeIndex + 1) + '번째 약관페이지 이동하기 선택됨');
                },
				slideChangeTransitionEnd : function(){
					var activeIndex = this.activeIndex+1;
					if(activeIndex == lastIdx) {
						$("body").find(".fix-btn-wrap").find(".btn").attr('disabled',false);
					}else{
						$("body").find(".fix-btn-wrap").find(".btn").attr('disabled',true);
					}
				}
            }
		});
	},
	/* Swipe - swipeDotCanNonloop / 가이드용 */
	swipeDotCanNonloop: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
		};

		new Swiper(obj, {
			// loop: true,
			slidesPerView: 1.2,
			spaceBetween: 30,
			centeredSlides: true,
			speed: 400,
			pagination: {
				// spaceBetween: 100,
				el: '.swiper-pagination',
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '" title="' + (index + 1) + '번째 슬라이드"></span>';
				}
			},
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next'
			}
		});
    },
    //대고객 : 서류선택, 현장영업 : 영업실적현황조회 - 년/월 선택
    swipeYearMonth: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
        };
        
        var swiperYear = new Swiper('.swiper-year', {
            slidesPerView : 3,
            centeredSlides : true,
            direction: 'vertical',
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            },
            a11y: {
                prevSlideMessage: '이전',
                nextSlideMessage: '다음'
            },
            on: {
                init: function() {
                    $(obj).find('.year-wrap .swiper-slide').each( function() {
                        var yTxt = $(this).text();
                        $(this).attr('data-y', yTxt.substr(0, yTxt.length - 1));
                    });
                }
            }
        });

        var swiperMonth = new Swiper('.swiper-month', {
            slidesPerView : 3,
            centeredSlides : true,
            direction: 'vertical',
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            },
            a11y: {
                prevSlideMessage: '이전',
                nextSlideMessage: '다음'
            },
            on: {
                init: function() {
                    $(obj).find('.month-wrap .swiper-slide').each( function() {
                        var mTxt = $(this).text();
                        $(this).attr('data-m', mTxt.substr(0, mTxt.length - 1));
                    });
                }
            }
        });
        
        var btnData = null;
        var dataY = null;
        var dataM = null;
        var btmType = null;
        var yearNum = null;
        var monthNum = null;
        var btmCalendarWrap = null;
        var openBtmData = null;
        var selectYear = null;
        var selectMonth = null;

        $('.btn-yymm').on('click', function() {
            btnData = $(this).data('page');
            dataY = $(this).siblings().find('input').attr('data-y');
            dataM = $(this).siblings().find('input').attr('data-m');

            if(btnData == 'bottom-pop-list01') {
                btmType = 0;
            }else if(btnData == 'bottom-pop-list02') {
                btmType = 1;
            }

            if(!!dataY && !!dataM) {
                yearNum = $(obj + '[data-page="' + btnData +'"]').find('.swiper-year').find('.swiper-slide[data-y="' + dataY + '"]').index();
                monthNum = $(obj + '[data-page="' + btnData +'"]').find('.swiper-month').find('.swiper-slide[data-m="' + dataM + '"]').index();

                swiperYear[btmType].slideTo(yearNum, 0);
                swiperMonth[btmType].slideTo(monthNum, 0);
            }else {
                swiperYear[btmType].slideTo(0, 0);
                swiperMonth[btmType].slideTo(0, 0);
            }
        });

        $('.btn-ym-check').on('click', function() {
            btmCalendarWrap = $(this).parents(obj);
            openBtmData = btmCalendarWrap.data('page');

            selectYear = btmCalendarWrap.find('.swiper-year').find('.swiper-slide-active').attr('data-y');
            selectMonth = btmCalendarWrap.find('.swiper-month').find('.swiper-slide-active').attr('data-m');
            
            $('.btn-yymm[data-page="' + openBtmData + '"]').parent('.ps-date-fild').find('input').val(selectYear + '-' + selectMonth);
            $('.btn-yymm[data-page="' + openBtmData + '"]').parent('.ps-date-fild').find('input').attr('data-y', selectYear);
            $('.btn-yymm[data-page="' + openBtmData + '"]').parent('.ps-date-fild').find('input').attr('data-m', selectMonth);

            SgiUI.popAniOff('.btm-calendar-wrap');
            $('.btn-yymm[data-page="' + openBtmData + '"]').focus();
        });
	},

    /* 공통 */
    //접근성 라디오버튼, 체크박스
    rdochkLabel: function(obj) {
        if (!SgiUI.checkObj(obj)) {
			return;
        };

        var rdochkItem = null;
        var ariaTxt= null;

        function init() {
            rdochkItem = $(obj);
        };

        function event() {
            //라디오버튼, 체크박스 둘다 적용
            rdochkItem.find('label').attr('aria-hidden', 'true');
            
            ariaTxt = [];
            rdochkItem.each( function(i) {
                ariaTxt.push($(this).find('label').text());
                $(this).find('input').attr('aria-label', ariaTxt[i]);
            });
            
            if(rdochkItem.hasClass('ps-chk')) { //체크박스일때
                rdochkItem.find('input').on('change', function() {
                    if($('input, textarea').is(':focus')){
                        $(':focus').blur();
                    }
                });
            }
        };

        init(obj);
        event();
    },

    //접근성 바텀시트
    btmPopSheet: function(obj) {
        if (!SgiUI.checkObj(obj)) {
			return;
        };

        function init() {
           $(obj).attr('aria-hidden', 'true');
        };

        init(obj);
    },

	/* Tab */
	tab: function(obj, con){
		if (!SgiUI.checkObj(obj)) {
			return;
		};
		var tab = null
		var	tabContent = null;

		function init(obj, con){
			tab = $(obj).find('> li > button');
            tabContent = $(con).find(' > .tab-cont');
            var onIdx = $(obj).find('button.on').parent().index();
            $(obj).attr('data-on', onIdx);
		};

		function event(){
			tab.on('click', function (e) {
				e.preventDefault();
                var i = $(this).parent().index();
                $(this).parents(obj).attr('data-on', i);
                tabMenu(i);
               
				if ($(this).parents('.rollup-fix-area').length > 0) {
                    $('.rollup-fix-wrap li > button').removeClass('on').removeAttr('title');
                    $('.rollup-fix-wrap').find('[class*="tab-"] > li').eq(i).children('button').addClass('on').attr('title', "선택됨").focus();
                    $('.rollup-fix-wrap').find('[class*="tab-"]').attr('data-on', i);
				}
			});
		};

		function tabMenu(index){
			tab.removeClass('on').removeAttr('title');
			$(obj).each(function(){
				$(this).find('li').eq(index).children('button').addClass('on').attr('title', "선택됨");	
            });
			tabContent.removeClass('on');
			tabContent.eq(index).addClass('on');
            $('.ps-sub-page .container .content').scrollTop(0);

            //탭 안에 고정 테이블
            SgiUI.tableFix('.table-fix-wrap');
		};

		init(obj, con);
		event();
	},

	/* Accordion */
	accordion: function(obj){
		if (!SgiUI.checkObj(obj)) {
			return;
		}

		var accordion = null;
		var smallAccordion = null;
		
		function init(obj){
			accordion = $(obj);
			smallAccordion = $(obj).find('.small-acco-list');
		};

		function event(){
			// 접근성 현재 상태 표시
			accordion.find('.accordion-tit').attr('title','접힘');
			accordion.find('.accordion-tit.on').attr('title', '펼쳐짐');
			accordion.find('.accordion-tit.on').parents('.accordion-item').find('.accordion-docu').show();

			if (accordion.hasClass('rollup-fix-acco')) {
				accordion.on('click', '.accordion-tit', '.accordion-tit button', function () {
					if (!$(this).hasClass('on')) {
						$('.accordion-tit, .accordion-tit button').attr('title', '펼쳐짐').addClass('on').parents('.accordion-item').find('.accordion-docu').slideDown(100);
						$('.accordion-tit, .accordion-tit button').parents('.accordion-item').addClass('on')
					} else {
						$('.accordion-tit, .accordion-tit button').attr('title', '접힘').removeClass('on').parents('.accordion-item').find('.accordion-docu').stop(true).slideUp(100);
						$('.accordion-tit, .accordion-tit button').parents('.accordion-item').removeClass('on')
					}
				});
			}else{
				accordion.on('click', '.accordion-tit', '.accordion-tit button', function () {
					if (!$(this).hasClass('on')) {
						$(this).addClass('on').parents('.accordion-item').find('.accordion-docu').slideDown(100);
						$(this).attr('title', '펼쳐짐');
						$(this).parents('.accordion-item').addClass('on')

					} else {
						$(this).removeClass('on').parents('.accordion-item').find('.accordion-docu').stop(true).slideUp(100);
						$(this).attr('title', '접힘');
						$(this).parents('.accordion-item').removeClass('on')
					}
					
				});
            }
            

			//accordion > accordion
			if(accordion.find('.small-acco-list')){
				accordion.find('.small-acco-tit').attr('title','접힘');
				accordion.find('.small-acco-tit.on').attr('title', '펼쳐짐');
				accordion.find('.small-acco-tit.on').parents('.small-acco-item').find('.small-acco-docu').show();
				smallAccordion.on('click', '.small-acco-tit', '.small-acco-tit button' ,function(){
					if(!$(this).hasClass('on')){
						$(this).addClass('on').parents('.small-acco-item').find('.small-acco-docu').slideDown(100);
						$(this).attr('title', '펼쳐짐');
						$(this).parents('.small-acco-item').addClass('on')
					}else{
						$(this).removeClass('on').parents('.small-acco-item').find('.small-acco-docu').stop(true).slideUp(100);
						$(this).attr('title', '접힘');
						$(this).parents('.small-acco-item').removeClass('on')
					}
					
				});
			}
		};

		init(obj);
		event();
	},

	/* Check Accordion */
	chkAccordion: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
		}

		var accordion = null;

		function init(obj) {
			accordion = $(obj);
		};

		function event() {
			accordion.find('.ps-chk input:checked').parents('.accordion-item').find('.accordion-docu').show();
			accordion.on('change', '.ps-chk input', function () {
				if ($(this).prop('checked')) {
					$(this).parents('.accordion-item').find('.accordion-docu').slideDown(100);

				} else {
					$(this).parents('.accordion-item').find('.accordion-docu').stop(true).slideUp(100);
				}
			});
		};

		init(obj);
		event();
    },
    
	/* Scroll to */
	//입력박스 키페드 출력시에 스크롤 이동
	scrollto: function(obj){
		if (!SgiUI.checkObj(obj)) {
			return;
		}

		var el = null;
		
		function init(obj){
			el = $(obj);
			head = $('header').outerHeight(true);
		};
		
		function event(){
			$('html').animate({scrollTop : el.offset().top - (head+20)},200);
			el.focus();
		};

		init(obj);
		event();
	},

	/* Popup open */
	popOpen: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
		}

		var openPop = null;
		var openPopData = null;
		var openWrap = null;

		function init(obj) {
			openPop = $(obj);
			openPopData = openPop.data('page');
		};

		function event() {
			openPop.on('click', function(){
				openWrap = $('.pop-js-wrap[data-page="' + openPopData +'"]');
				openWrap.siblings().each(function(){
					if($(this).css('display') == 'none') {
						$(this).attr('data-display', 'off');
					}else {
						$(this).css('display', 'none');
					};
					if($(this).attr('aria-hidden') == 'true') {
						$(this).attr('data-ariahide', 'on');
					}else {
						$(this).attr('aria-hidden', 'true');
					};
				})
				//접근성 ios이슈 최하위 태그로 포커스이동
				openWrap.css('display', 'block').find('h1').focus();
			});
		};

		init(obj);
		event();
	},

	/* Popup close */
	popClose: function(obj){
		if (!SgiUI.checkObj(obj)) {
			return;
		}

		var closePop = null;
		var closeWrap = null;
		var closePopData = null;

		function init(obj){
			closePop = $(obj);
		};

		function event(){
			closePop.on('click', function(e){
				closeWrap = $(this).parents('.pop-js-wrap');
				closePopData = closeWrap.data('page');
				closeWrap.siblings().each(function () {
					if ($(this).attr('data-display') == 'off') {
						$(this).removeAttr('data-display');
					} else {
						$(this).css('display', 'block');
					};
					if ($(this).attr('data-ariahide') == 'on') {
						$(this).removeAttr('data-ariahide');
					} else {
						$(this).removeAttr('aria-hidden');
					};
				});
				closeWrap.css('display', 'none');
				$('.open-pop[data-page="'+ closePopData +'"]').focus();
			});
		};

		init(obj);
		event();
	},

    // 모달팝업 실행 - 클릭X
	modalNonClickOpen: function(obj, modalData){
		if(!SgiUI.checkObj(obj)) {
			return;
		};

		var openmodal = null;
		var openmodalData = null;
		var openWrap = null;

		function init(obj) {
			openmodal = $(obj);
			openmodalData = modalData;
		};

		function event() {
            openWrap = $('.pop-modal-js-wrap[data-page="' + openmodalData + '"]');
            openWrap.siblings().each(function () {
                if ($(this).attr('aria-hidden') == 'true') {
                    $(this).attr('data-ariahide', 'on');
                } else {
                    $(this).attr('aria-hidden', 'true');
                };
            })
            //접근성 ios이슈 최하위 태그로 포커스이동
            openWrap.addClass('on').css('display', 'block').find('h2').focus();
            SgiUI.dimdOn();
		};

		init(obj);
		event();
    },
    
	// 모달팝업 실행
	modalOpen: function(obj){
		if(!SgiUI.checkObj(obj)) {
			return;
		};

		var openmodal = null;
		var openmodalData = null;
		var openWrap = null;

		function init(obj) {
			openmodal = $(obj);
			openmodalData = openmodal.data('page');
		};

		function event() {
			openmodal.on('click', function () {
				openmodalData = $(this).data('page');
				openWrap = $('.pop-modal-js-wrap[data-page="' + openmodalData + '"]');
				openWrap.siblings().each(function () {
					if ($(this).attr('aria-hidden') == 'true') {
						$(this).attr('data-ariahide', 'on');
					} else {
						$(this).attr('aria-hidden', 'true');
					};
                })
                //접근성 ios이슈 최하위 태그로 포커스이동
                if(openWrap.hasClass('file-select-wrap')) {
                    openWrap.addClass('on').css('display', 'block').find('.file-select-list > li').eq(0).find('button').focus();
                } else {
                    openWrap.addClass('on').css('display', 'block').find('h2').focus();
                }
				SgiUI.dimdOn();
			});
		};

		init(obj);
		event();
	},

	// 모달팝업 종료
	modalClose: function(obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
		}

		var closemodal = null;
		var closeWrap = null;
		var closemodalData = null;

		function init(obj) {
			closemodal = $(obj);
		};

		function event() {
			closemodal.on('click', function (e) {
				closeWrap = $(this).parents('.pop-modal-js-wrap');
				closemodalData = closeWrap.data('page');
				closeWrap.siblings().each(function () {
					if ($(this).attr('data-ariahide') == 'on') {
						$(this).removeAttr('data-ariahide');
					} else {
						$(this).removeAttr('aria-hidden');
					};
				});
                closeWrap.removeClass('on').css('display', 'none');
                if($('.open-pop').length) {
                    $('.open-pop[data-page="' + closemodalData + '"]').focus();
                } else {
                    $('h1').focus();
		            SgiUI.dimdOff();
                }
				
				SgiUI.dimdOff();
			});
		
		};

		init(obj);
		event();
	},

	// 바닥시트 실행
	bottomOpen: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
		};

		var openbottom = null;
		var openbottomData = null;
		var openWrap = null;

		function init(obj) {
			openbottom = $(obj);
			openbottomData = openbottom.data('page');
		};

		function event() {
			openbottom.on('click', function () {
				openWrap = $('.pop-bottom-js-wrap[data-page="' + openbottomData + '"]');
				openWrap.siblings().each(function () {
					if ($(this).attr('aria-hidden') == 'true') {
						$(this).attr('data-ariahide', 'on');
					} else {
						$(this).attr('aria-hidden', 'true');
					};
				})
				//접근성 ios이슈 최하위 태그로 포커스이동
				openWrap.stop().animate({'bottom' : '200px'}, 100).removeAttr('aria-hidden').find('h1').focus();
				SgiUI.dimdOn();
				setTimeout(function(){
					sheetPoBo = parseInt(openWrap.css('bottom'));
				},105)
			});
		};

		init(obj);
		event();
	},

	// 바닥시트 종료
	bottomClose: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
		}

		var closebottom = null;
		var closeWrap = null;
		var closebottomData = null;

		function init(obj) {
			closebottom = $(obj);
		};

		function event() {
			closebottom.on('click', function (e) {
				closeWrap = $(this).parents('.pop-bottom-js-wrap');
				closebottomData = closeWrap.data('page');
				closeWrap.siblings().each(function () {
					if ($(this).attr('data-ariahide') == 'on') {
						$(this).removeAttr('data-ariahide');
					} else {
						$(this).removeAttr('aria-hidden');
					};
				});
				closeWrap.stop().animate({ 'bottom': '0' }, 100).attr('aria-hidden', 'true');
				$('.open-pop[data-page="' + closebottomData + '"]').focus();
                SgiUI.dimdOff();
			});
		};

		init(obj);
		event();
	},

	/* bottom sheet */
	btomSheet: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
		}

		var sheet = null;
		var htmlHight = null;
		var sheetHight = null;
		var NowsheetPoBo = null;
		var touchPosition = null;
		var movePosition = null;

		function init(obj) {
			sheet = $(obj);
			htmlHight = $(window).height();
			sheetHight = parseInt(sheet.parent().css('height'));
		};

		//touchstart
		//touchmove
		//touchand
		function event() {
			sheet.on('touchstart', function (e) {
				event = e.originalEvent;
				NowsheetPoBo = parseInt($(this).parent().css('bottom'));
				touchPosition = parseInt(event.touches[0].clientY);
				movePosition = (htmlHight - touchPosition - NowsheetPoBo) * -1 ;
				e.preventDefault();
			});

			sheet.on('touchmove', function (e) {
				event = e.originalEvent;
				touchPosition = parseInt(event.touches[0].clientY);
				$(this).parent().css('bottom', htmlHight - touchPosition + movePosition);
				e.preventDefault();
			});

			sheet.swipe({
				swipe: function (event, direction, distance, duration, fingerConut, fingerData) {
					// direction = 방향 left , right , up , down
					// distance = 터치 이동거리
					// duration = 터치 시간
					// fingerConut = 터치 손가락수
					// fingerData = 터치되있는 좌표
					// threshold = 기본값 75
					if (direction == "up") {
						$(this).parent().css('bottom', sheetHight).addClass('up').find('.pop-swipe-btn').attr('title', '바닥 페이지, 펼쳐짐').addClass('on');

					} else if (direction == "down") {
						$(this).parent().css('bottom', sheetPoBo).removeClass('up').find('.pop-swipe-btn').attr('title', '바닥 페이지, 접힘').removeClass('on');
					};
				},
				threshold: 0  //(75px만큼 움직여야 작동, 기준 0으로 셋팅)
			});

			sheet.parent().find('.pop-swipe-btn').on('click', function () {
				if ($(this).hasClass('on')) {
					$(this).parent().css('bottom', sheetPoBo);
					$(this).attr('title', '바닥 페이지, 접힘').removeClass('on');
				} else {
					$(this).parent().css('bottom', sheetHight);
					$(this).attr('title', '바닥 페이지, 펼쳐짐').addClass('on');
				};
			});
		};
		init(obj);
		event();
	},

	// 바닥팝업 실행
	bottomPopOpen: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
		};

		var openbotPop = null;
		var openbotPopData = null;
		var openWrap = null;

		function init(obj) {
			openbotPop = $(obj);
			openbotPopData = openbotPop.data('page');
		};

		function event() {
			openbotPop.on('click', function () {
				$(this).addClass('click-btn');
				openbotPopData = $(this).data('page');
				openWrap = $('.pop-botlist-js-wrap[data-page="' + openbotPopData + '"]');
				openWrap.siblings().each(function () {
					if ($(this).attr('aria-hidden') == 'true') {
						$(this).attr('data-ariahide', 'on');
					} else {
						$(this).attr('aria-hidden', 'true');
					};
				})
                //접근성 ios이슈 최하위 태그로 포커스이동
                if(openWrap.find('h2').length > 0) {
                    openWrap.stop().animate({'bottom': '0'}, 100).removeAttr('aria-hidden').find('h2').attr('tabindex', '-1').focus();
                }else if(openWrap.find('.tit').length > 0) {
                    openWrap.stop().animate({'bottom': '0'}, 100).removeAttr('aria-hidden').find('.tit').attr('tabindex', '-1').focus();
                }
				SgiUI.dimdOn();
			});
		};

		init(obj);
		event();
	},

	// 바닥팝업 종료
	bottomPopClose: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
		}

		var closebotPop = null;
		var closeWrap = null;
		var closebotPopData = null;

		function init(obj) {
			closebotPop = $(obj);
		};

		function event() {
			closebotPop.on('click', function (e) {
                closeWrap = $(this).parents('.pop-botlist-js-wrap');
                closeWrapHeight = parseInt(closeWrap.css('height'));
				closebotPopData = closeWrap.data('page');
				closeWrap.siblings().each(function () {
					if ($(this).attr('data-ariahide') == 'on') {
						$(this).removeAttr('data-ariahide');
					} else {
						$(this).removeAttr('aria-hidden');
					};
				});
				closeWrap.stop().animate({'bottom': -(closeWrapHeight) + 'px'}, 100).attr('aria-hidden', 'true');
				$('.click-btn').focus().removeClass('click-btn');
                SgiUI.dimdOff();
			});
		};

		init(obj);
		event();
	},

	// 스크롤시 매뉴 고정
	rollUpFix: function(obj, com) {
		if (!SgiUI.checkObj(obj)) {
			return;
		}
		var rollupCont = null;
        var scrollCont = null;
        var rollupCLength = null;
		var fixArea = null;
		var nowScroll = 0;
		var rollupTop = [];
		var rollupH = [];
        var fixCont = '';

		function init(obj, com) {
            // if($(obj).parents('.group-info-wrap').length) {
            //     $(obj).parents('.group-info-wrap').parent('.cont-wrap').css('min-height', $('body').prop('clientHeight'));
            // }
			rollupCont = $(obj);
			scrollCont = $(com);
            rollupCLength = rollupCont.length;
			if (rollupCLength > 0 && !$('.container').children('.rollup-fix-area').length) {
				scrollCont.parent().prepend('<div class="rollup-fix-area"></div>');
			}
            fixArea = $('.ui-page-active .rollup-fix-area');
            setTimeout( function() {
                rollposition();
            }, 300);
		};

		function rollposition() {
            nowScroll = scrollCont.scrollTop();
			for (var i = 0; i < rollupCLength; i++) {
                rollupH[i] = parseFloat(rollupCont.eq(i).height());
				if (i == 0) {
                    rollupTop[i] = parseFloat(rollupCont.eq(i).parent().position().top - nowScroll);
				} else if (i == rollupCLength) {
                    rollupTop[i] = parseFloat(rollupCont.eq(i).parent().position().top - nowScroll) - rollupH[i - 1] - rollupH[i - 2];
				}else {
                    rollupTop[i] = parseFloat(rollupCont.eq(i).parent().position().top - nowScroll) - rollupH[i - 1];
                };
			}
		};

		function rollupSelect() {
            if($('body').prop('clientHeight') > $('.content').prop('scrollHeight') - scrollCont.scrollTop) {
                return;
            } else {
                for (var i = 0; i < rollupCLength; i++) {
                    if (nowScroll > rollupTop[i] && !rollupCont.eq(i).hasClass('on') && !$('.rollup-fix-area > .rollup-fix-data').eq(i).hasClass('on')) {
                        selectAdd(i);
                    } else if (nowScroll <= rollupTop[i] && $('.rollup-fix-area > .rollup-fix-data').eq(i).hasClass('on')) {
                        selectRemove(i);
                    }
                }
            }
		};

		function selectRemove(num) {
			selectroll = rollupCont.eq(num);
			selectroll.removeClass('on');
			fixCont = selectroll.closest('.rollup-fix-wrap');
            if (nowScroll <= 0) {
                fixArea.find('.rollup-fix-data').remove();
            } else {
                fixArea.find('.rollup-fix-data').eq(num).remove();
            }

			// if (num <= 0) {
            //     $('body > *').removeClass('rollup');
            // };
		};

		function selectAdd(num) {
            selectroll = rollupCont.eq(num);
			selectroll.addClass('on');
			fixCont = selectroll.closest('.rollup-fix-wrap');
            // fixArea.append(fixCont.html());
            fixArea.append(fixCont.find('>.rollup-fix-data').clone(true));
			// if(num == 1) {
            //     if(!!$(obj).parents('.group-info-wrap').length) {
            //         $('.group-info-wrap, .rollup-fix-wrap').addClass('visibleN');
            //         var totalH = 0;
            //         for (var i = 0; i < rollupCLength; i++) {
            //             totalH += rollupH[i];
            //         }
            //     }
            //     // setTimeout( function() {
            //     //     $('body > .ui-page-active').addClass('rollup');
            //     // }, 100);
            // };

			// SgiUI.tab('.rollup-fix-area .tab-01', '.tab-conts-01');
			// SgiUI.tab('.rollup-fix-area .tab-02', '.tab-conts-02');
			// SgiUI.tab('.rollup-fix-area .tab-03', '.tab-conts-03');
			// SgiUI.tab('.rollup-fix-area .tab-04', '.tab-conts-04');
            // SgiUI.accordion('.rollup-fix-area .ps-accordion-wrap');
            // SgiUI.swipeTab('.rollup-fix-area .swiper-tab-wrap');
            // SgiUI.datelistSort('.rollup-fix-area .sort-btn-wrap');
		};

		function event() {
            scrollCont.on('scroll', function() {
                nowScroll = scrollCont.scrollTop();
                rollupSelect();
                if (nowScroll <= 0) {
                    fixArea.find('.rollup-fix-data').remove();
                    rollupCont.removeClass('on');
                };
            });
            
            rollupCont.on('click', '.accordion-tit', '.accordion-tit button', function() {
                for(var time = 0; time < 100; time++) {
                    setTimeout( function() {
                        rollposition();
                    }, time);
                }
            });
		};

		init(obj, com);
		event();
    },

	/* Dimmed */
	dimdOn: function(){
        if(!$('body').children('.ps-dimmed').length) {
            $('body').append("<div class='ps-dimmed' aria-hidden='true'></div>");
        }
	},
	dimdOff: function(){
		$('body').find(".ps-dimmed").remove();
    },
    
	/* 바텀시트 - 애니메이션 */
	popAniOn: function (obj) {
        $(obj).siblings().each(function () {
            if ($(this).attr('aria-hidden') == 'true') {
                $(this).attr('data-ariahide', 'on');
            } else {
                $(this).attr('aria-hidden', 'true');
            };
        });
		$(obj).stop().animate({'bottom' : '0'}, 100).removeAttr('aria-hidden').find('.tit').attr('tabindex', 0).focus();
		SgiUI.dimdOn();
	},
	popAniOff: function (obj) {
        var closeWrapH = $(obj).height();
        $(obj).siblings().each(function () {
            if ($(this).attr('data-ariahide') == 'on') {
                $(this).removeAttr('data-ariahide');
            } else {
                $(this).removeAttr('aria-hidden');
            };
        });
		$(obj).stop().animate({'bottom': -(closeWrapH) + 'px'}, 100).attr('aria-hidden', 'true');
		$('h1').attr('tabindex', 0).focus();
        SgiUI.dimdOff();
	},
	
	/* date sorting */
	dateStat: function(obj){
		if (!SgiUI.checkObj(obj)) {
			return;
		};

		var statW = null;
		var statInnerL = null;
		var statInnerR = null;
		var chkItemWrap = null;
		var chkItme = null;
		var statTxt = null;
		var chkW = null;

		function init(obj){
			dateSortingBtn = $(obj);
		};

		function event(){
			dateSortingBtn.on('click.toggle', function(){
				statW = $(this).parents(".date-info-wrap").width();
				statInnerL = $(this).parent().position().left;
				statInnerR = statInnerL + $(this).parent().width();
				chkItemWrap =  $(this).siblings(".select-wrap");
				chkItme = chkItemWrap.find("input");
				statTxt = $(this).siblings(".stat-txt");
				chkW = chkItme.width();

				$(this).toggleClass("on");
				statTxt.attr("tabindex",0).focusout();
				chkItemWrap.attr("tabindex",-1).focus();

				if(statInnerR >= statW){
					$(this).siblings(".select-wrap").css({"right":$(this).width()+5 , "width":chkW});
				} else if(statInnerL == 0){
					$(this).siblings(".select-wrap").css({"left":$(this).parent().width()+5 , "width":chkW});
				}

				chkItme.on("change", function(){
					if( $(this).is(":checked") ){
						$(this).parents(".date-stat-wrap").find(".btn").removeClass("on");
						statTxt.text($(this).prev().text());
						statTxt.attr("tabindex",-1).focus();
						chkItemWrap.attr("tabindex",0).focusout();
					}
				});
			});
		};

		init(obj);
		event();
    },

    // switch 체크박스
    switchLabel: function(obj) {
        if (!SgiUI.checkObj(obj)) {
            return;
        };

        var switchChk = null;

        function init(obj) {
            switchChk = $(obj).find('input');
            switchChk.each( function(idx) {
                $(this).siblings('label').removeAttr('aria-label');
                $(this).attr('data-idx', idx);
                switchState(this);
            });
        };

        function event() {

            switchChk.on('change', function() {
                if($('input, textarea').is(':focus')){
                    $(':focus').blur();
                }
                switchState(this);
            });
        };

        function switchState(el) {
            var switchTit = $(el).parents('.ps-switch-wrap').siblings('.switch-title').text();
            if($(el).is(':checked')) {
                $(el).attr({'checked' : true, 'aria-label' : switchTit + ' 동의'});
            } else {
                $(el).attr({'checked' : false, 'aria-label' : switchTit + ' 비동의'});
            }
        };

        init(obj);
        event();
    },
    
    // 테이블 틀고정
    tableFix: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
        }
        
        var tabOnCheck = null;
        var tblScrollCont = null;
		var getThRowW = null;
		var getThRow = null;
        var getThColFirstH = null;
        var getFixData = null;
        var trHtml = null;

		function init(obj) {
            if(!$(obj).parents('.tab-cont').length) {
                tabOnCheck = $(obj);
            } else {
                tabOnCheck = $('.tab-cont.on').find(obj);
            }
		};

		function event() {
            setTimeout(function () {
                tblScrollCont = tabOnCheck.find('.scroll-cont'),
                getThRow = tblScrollCont.find('table th[scope="row"]'),
                getThRowW = tblScrollCont.find('table th[scope="row"]').eq(0).outerWidth();
                getThColFirstH = tblScrollCont.find('table thead th[scope="col"]').eq(0).outerHeight();
                getFixData = tblScrollCont.find('.fix-data');
                getFixDataRowW = tblScrollCont.find('.fix-data').eq(0).outerWidth();
                
                // 고정 열 1개
                trHtml = '';
                trHtml += '<div class="fix-tit" style="width:' + (getThRowW + getFixDataRowW) + 'px" aria-hidden="true"><div class="fix-col" style="width:' + getThRowW + 'px">';
                trHtml += '<span style="height:' + getThColFirstH + 'px"></span>';
                getThRow.each( function(i) {
                    if(!getThRow.eq(i).hasClass('total-th')) {
                        trHtml += '<span style="height:' + getThRow.eq(i).outerHeight() + 'px">' + getThRow.eq(i).html() + '</span>';
                    } else {
                        trHtml += '<span class="'+ getThRow.eq(i).attr('class')+'" style="height:' + getThRow.eq(i).outerHeight() + 'px">' + getThRow.eq(i).html() + '</span>';
                    }
                });
                trHtml += '</div>';

                // 고정 열 2개(업종평균)
                if(getFixData.length > 0) {
                    trHtml += '<div class="fix-col" style="width:' + getFixDataRowW + 'px">';
                    getFixData.each( function(i) {
                        if(i == 0) {
                            trHtml += '<span class="'+ getFixData.eq(i).attr('class')+'" style="height:' + getThColFirstH + 'px">' + getFixData.eq(i).html() + '</span>';
                        } else {
                            trHtml += '<span class="'+ getFixData.eq(i).attr('class')+'" style="height:' + getThRow.eq(i - 1).outerHeight() + 'px">' + getFixData.eq(i).html() + '</span>';
                        }
                    });
                    trHtml += '</div>';
                }                
                trHtml += '</div>';

                tabOnCheck.find('.fix-tit').remove();
                tabOnCheck.append(trHtml);
            }, 100);
        }

		init(obj);
        event();
    },
    
    // 파일첨부
    fileSelect: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
        }
        
        var fileSelectWrap = null;
        var selectIdx = null;
        var fileField = null;
        var showField = null;
        var fileName = null;

		function init(obj) {
			fileSelectWrap = $(obj);
            fileSelectWrap.each( function(idx) {
				$(this).attr('data-idx', idx );
            });
		};

		function event() {
            $('.btn-file').on('click', function() {
                selectIdx = $(this).parents('.ps-file-wrap').attr('data-idx');
                fileEvent(selectIdx);
            });
    
            $('.btn-del').on('click', function() {
                $(this).siblings('.ui-input-text').find('input[type="text"]').val('');
                $(this).removeClass('on');
            });
        };
        
        function fileEvent(selectIdx) {
            fileField = fileSelectWrap.eq(selectIdx).find('input[type="file"]');
            showField = fileSelectWrap.eq(selectIdx).find('input[type="text"]');
            fileField.on('change', function() {
                fileName = $(this).val();
                showField.val(fileName).parent('.ui-input-text').siblings('.btn-del').addClass('on');
            });
        };

		init(obj);
		event();
	},

	//주소상세보기
    addrDetail: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
        }
        
        var addrWrap = null;
		var addrBtn = null;

		function init(obj) {
			addrWrap = $(obj);
			addrBtn = addrWrap.find(".btn-addr");
		};

		function event() {
        	addrBtn.on('click', function() {
				addrBtn.removeClass("on");
                $(this).addClass("on");
                //2019-10-04 주석처리 : 나오는 시점 개발에서 처리
				//$(".deta-addr-wrap").show(); 
				$(".deta-addr-wrap").attr("tabindex",-1).focus();
            });
    
		};

		init(obj);
		event();
	},

	//북마크
	bookMarkToggle: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
        }
        
        var bookMarkBtn = null;

		function init(obj) {
			bookMarkBtn = $(obj);
		};

		function event() {
        	bookMarkBtn.on('click.toggle', function() {
				$(this).toggleClass("on");
				if ($(this).hasClass('on')) {
					$(this).attr('title', '즐겨찾기 등록');
				} else {
					$(this).attr('title', '즐겨찾기 미등록');
				};
            });
    
		};

		init(obj);
		event();
	},
	
	//날짜 상세 검색
	dateToggle: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
        }
		
		var dateDeatilBtn = null;
		var dateDetail = null;
		var dateInput = null;

		function init(obj) {
			dateDetailBtn = $(obj);
			dateDetail = $(obj).parents('.date').siblings('.date-deta-wrap');
			dateInput = $(obj).parent('.date').find('input');
		};

		function event() {
        	dateDetailBtn.on('click.toggle', function() {
				$(this).toggleClass('on');
				dateDetail.toggleClass('on');
				if ($(this).hasClass('on')) {
					dateDetail.attr("tabindex",-1).focus();
					$(this).parents('.date').find('input').attr('checked',false);
					$(this).parents('.date').find('label').removeClass('ui-radio-on').addClass('ui-radio-off');
				} else {
					dateDetail.attr("tabindex",0).focusout();
				};
			});
			
			dateInput.on("change", function(){
				if( $(this).is(":checked") ){
					dateDetailBtn.removeClass('on');
					dateDetail.removeClass('on');
				}
			});
    
		};

		init(obj);
		event();
	},

	accordionSelf: function(obj){
		if (!SgiUI.checkObj(obj)) {
			return;
		}

		var accoSelfWrap = null;
		var accoSelfItem = null;
		var stateBtn = null;
		var stateItemWrap = null;
		var stateItem = null;
		
		function init(obj){
			accoSelfWrap = $(obj);
			accoSelfItem = $(obj).find('.acco-btn-box');
			stateBtn = $(obj).find('.state-btn');
			stateItemWrap = stateBtn.siblings('.select-wrap');
			stateItem = stateItemWrap.find(".item-label");
		};

		function event(){
			accoSelfWrap.on('click.toggle', '.acco-btn-box' , function(){
				$(this).parents('.acco-btn-item').toggleClass('on')
				if(!$(this).parents('.acco-btn-item').hasClass('on')){
					$(this).attr('title', '접힘');
				}else{
					$(this).attr('title', '펼쳐짐');
				}
			});

			stateBtn.on('click.toggle', function(){
				$(this).toggleClass("on");
				if ($(this).hasClass('on')) {
					stateItemWrap.attr("tabindex",-1).focus();
				} else {
					stateItemWrap.attr("tabindex",0).focusout();
				};
			});
			
			stateItem.on("click", function(){
				$(this).parents(".state-btn-wrap").find(".state-btn").removeClass("on");
				stateItemWrap.attr("tabindex",0).focusout();
				stateBtn.attr("tabindex",-1).focus();
			});
		};

		init(obj);
		event();
	},

	//만족도 조사
	starrev: function(obj){
		if (!SgiUI.checkObj(obj)) {
			return;
		}

		var isMouseMoveStart = false;
		var starWrap = null;
		var starChild = null;
		var starChildActive = null;
		var grid = [];
		
		function init(obj){
			starChildActive = 'on';
			starWrap = $(obj);
			starChild = starWrap.find('.item');

			starWrap.each(function(idx) {
				$(this).attr('data-idx', idx);
			});
			
			starChild.each(function(idx){
				grid.push($(this).outerWidth(true) * idx);
			});
		};

		function utils(e){
			var x = 0, rect = starWrap.get(0).getBoundingClientRect();
			x = (e.originalEvent.targetTouches[0].pageX - rect.left)- window.pageXOffset;
			return x;	
		};

		function event(){
			var timer = null;
			
			function handleMouseDown() {
				isMouseMoveStart = true;
				if(timer) clearTimeout(timer);
			};

			function handleMouseMove(e) {
				if(!isMouseMoveStart) return;
				var pos = utils(e);
				$(this).find('.item').each(function(idx){
					var offsetLeft = grid[idx];
					if(offsetLeft < pos) {
						$(this).addClass(starChildActive)
					} else {
						//if (pos < 0) return;
						$(this).removeClass(starChildActive);
					}
				});
			};

			function handleMouseUp() {
				isMouseMoveStart = false;
				var selectIdx = $(this).find('.item.on').length-1;

				$(this).find('.item.on').eq(selectIdx).attr('title', '선택');

				// timer = setTimeout(function(){
				// 	alert('별선택');
				// }, 1000)
			};
			
			function handleStarPointMouseDown() {
				var indexWrap = $(this).parents('.star-item').attr('data-idx');
				var index = $(this).index();

				starWrap.eq(indexWrap).find('.item').removeClass(starChildActive).removeAttr('title');
				for(var i = 0; i <= index; i++) {
					starWrap.eq(indexWrap).find('.item').eq(i).addClass(starChildActive);
				}
			};

			starWrap.off("touchstart.starpoint").on("touchstart.starpoint", handleMouseDown);
			starWrap.off("touchmove.starpoint").on("touchmove.starpoint", handleMouseMove);
			starWrap.off("touchend.starpoint").on("touchend.starpoint", handleMouseUp);
			starChild.off("touchstart.starpoint").on("touchstart.starpoint", handleStarPointMouseDown);
			
		};

		init(obj);
		event();
	},

	moreList: function(obj){
		if (!SgiUI.checkObj(obj)) {
			return;
		}

        var moreBtn = null;
		var moreListWrap = null;
		var moreList = null;
        var nextFocus = null;
        var clickIdx = null;
		
		function init(obj){
            moreBtn = $(obj);
            moreBtn.each(function(idx) {
				$(this).attr('data-idx', idx);
			});
		};

		function event(){
			moreBtn.on('click', function(){
                clickIdx = $(this).data('idx');
                moreListWrap = moreBtn.eq(clickIdx).siblings('.ps-link-list');
                moreList = moreListWrap.find('.link-item');
                nextFocus = moreListWrap.find('.link-item.on').length;

                moreListWrap.find('.link-item').addClass('on');
                moreList.eq(nextFocus).attr("tabindex",-1).focus();
                $(this).hide();
			});
		};

		init(obj);
		event();
	},

	headerFix: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
		}
		var header = null;
		var lastScrollTop = 0;

		function init(obj) {
			header = $(obj);
		};

		function event(){
			function scrollEvent() {
				var st = $(this).scrollTop();
				if(st > 0){
					header.addClass("on");
				}else{
					header.removeClass("on");
				}
				lastScrollTop = st;
			};

			$('.content').off("scroll.fixed").on("scroll.fixed",scrollEvent);
			
		};

		init(obj);
		event();
    },

    accoFix: function (obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
        }
        
        var accoFixList = null;

		function init(obj) {
			accoFixList = $(obj).find('.small-acco-list');
		};

		function event(){
            $(obj).find('.small-acco-tit').attr('title','접힘');
            $(obj).find('.small-acco-tit.on').attr('title', '펼쳐짐');
            $(obj).find('.small-acco-tit.on').parents('.small-acco-item').find('.small-acco-docu').show();
            accoFixList.on('click', '.small-acco-tit', '.small-acco-tit button' ,function(){

                if(!$(this).hasClass('on')){
                    var headH = $('.header').outerHeight();
                    var currentScroll = $('.content').scrollTop();
                    var clickTop = $(this).parent('.small-acco-item').get(0).offsetTop;
                    //var clickTop = $(this).parent('.small-acco-item').offset().top;
                    TweenMax.to($(".content"), .35, { scrollTop: clickTop });
                    
                    $(this).addClass('on').parents('.small-acco-item').find('.small-acco-docu').slideDown(100);
                    $(this).attr('title', '펼쳐짐');
                    $(this).parents('.small-acco-item').addClass('on');

                }else{
                    $(this).removeClass('on').parents('.small-acco-item').find('.small-acco-docu').stop(true).slideUp(100);
                    $(this).attr('title', '접힘');
                    $(this).parents('.small-acco-item').removeClass('on');
                }
            });
		};

		init(obj);
		event();
	},

	// 전체메뉴
	allMenuOpen: function(obj){
		if(!SgiUI.checkObj(obj)) {
			return;
		};

		var openBtn = null;
		var allMenuWrap = null;
		var menuItem = null;

		function init(obj) {
			openBtn = $(obj);
			allMenuWrap = $('body').find('.all-menu-wrap');
			closeBtn = allMenuWrap.find('.btn-all-menu-close');
			menuWrap = allMenuWrap.find('.menu');
			menuItem = menuWrap.find('.link');
            menuItem02 = allMenuWrap.find('.depth02');

            allMenuWrap.attr('aria-hidden', 'true');
			if(!menuWrap.hasClass('on')){
				allMenuWrap.find('.menu-list').find('.menu').eq(0).addClass('on');
			}
		};

		function event() {
			openBtn.on('click', function() {
				SgiUI.dimdOn();
                allMenuWrap.removeAttr('aria-hidden').css('display', 'block');
                setTimeout( function() {
                    allMenuWrap.addClass('on');
                }, 100);
                allMenuWrap.siblings().each(function() {
					if($(this).attr('aria-hidden') == 'true') {
						$(this).attr('data-ariahide', 'on');
					}else {
						$(this).attr('aria-hidden', 'true');
					};
                });
                //접근성 ios이슈 최하위 태그로 포커스이동
                setTimeout( function() {
                    allMenuWrap.find('.user-wrap .tit').attr('tabindex', -1).focus();
                }, 300);
			});

			menuItem.on('click', function() {
				$(this).parents('.menu').addClass('on').siblings().removeClass('on');
			});

			function closeMenu() {
                allMenuWrap.attr('aria-hidden', 'true').removeClass('on');
                setTimeout( function() {
                    allMenuWrap.css('display', 'none');
                }, 100);
                allMenuWrap.siblings().each( function() {
                    if ($(this).attr('data-ariahide') == 'on') {
                        $(this).removeAttr('data-ariahide');
                    } else {
                        $(this).removeAttr('aria-hidden');
                    };
                });
				//접근성 ios이슈 최하위 태그로 포커스이동
				//allMenuWrap.find('.user-wrap .tit').attr('tabindex', 0).focusout();
				SgiUI.dimdOff();
				openBtn.focus();
			}

			closeBtn.off("click.close").on("click.close", closeMenu);
		};

		init(obj);
		event();
    },
    
    // 메인리스트(2019-10-22 케이스 불러오는 시점때문에 개발에서 실행하기로 함)
	mainMoreList: function(obj){
		if(!SgiUI.checkObj(obj)) {
			return;
		};

        var btnTodayMore = null;
        var todayWrap = null;
        var todayList = null;
        var todayListItem = null;
        var nextFocus = null;

		function init(obj) {
            btnTodayMore = $(obj);
            todayWrap = btnTodayMore.parent('.today-wrap');
            todayList = todayWrap.children('.today-list');
            todayListItem = todayList.children('.link-item');
            if(todayListItem.length >= 2) {// 리스트 2개 이상일때 첫번째 제외 리스트에 aria-hidden
                todayListItem.eq(0).siblings().attr('aria-hidden','true');
            } else if(todayListItem.length == 1) {// 리스트 1개일때 더보기버튼 가리기
                btnTodayMore.hide();
            }
		};

		function event() {
            btnTodayMore.on('click', function() {
                if($(this).hasClass('on')) {
                    todayListItem.eq(0).siblings().stop().slideUp(200).attr('aria-hidden', 'true');
                    todayWrap.removeClass('on').find(btnTodayMore).removeClass('on').attr('title', '오늘할일 더보기 접힘');
                } else {
                    todayWrap.addClass('on').find(btnTodayMore).addClass('on').attr('title', '오늘할일 더보기 펼쳐짐');
                    todayListItem.attr('aria-hidden', 'false').stop().slideDown(200);
                    //리스트 열린 후 두번째 리스트에 포커스 이동(최하위 태그로 포커스이동)
                    todayListItem.eq(1).find('.main-txt').attr('tabindex', 0).focus();
                }
            });
		};

		init(obj);
		event();
    },

    // 폼추가(2019-10-04 주석처리 : 클래스명,아이디값 들어와야해서 개발에서 만들어서 사용하기로 함)
	/*addFrom: function(obj){
		if(!SgiUI.checkObj(obj)) {
			return;
		};

        var btnAddFrom = null;
        var addFromHtml = null;

		function init(obj) {
            btnAddFrom = $(obj);
		};

		function event() {
            addFromHtml = '';
            addFromHtml += '<div class="ps-from-item">';
            addFromHtml += '<p class="write-title">독촉(통화)일자</p>';
            addFromHtml += '<div class="ps-date-wrap"><div class="ps-datepicker"><div class="ps-date-fild">';
            addFromHtml += '<input class="inp-base" type="text" title="날짜선택" placeholder="선택">';
            addFromHtml += '<button type="button" class="btn-base ps-drop ps-datepicker-btn" aria-expanded="false"><span>독촉(통화)일자 설정</span></button>';
            addFromHtml += '</div></div></div>';
            addFromHtml += '</div>';
            addFromHtml += '<div class="ps-from-item">';
            addFromHtml += '<p class="write-title">독촉(촉구)내용 및 환불요구내용</p>';
            addFromHtml += '<div class="ps-textarea"><textarea title="내용 입력" placeholder="피해내용을 상세하게 기술해 주세요."></textarea></div>';
            addFromHtml += '</div>';

            btnAddFrom.on('click', function() {
                $(this).siblings('.ps-add-from').append(addFromHtml);
                SgiUI.addDatePicker('.ps-datepicker');
                SGI.uiDatePicker({ selector: '[data-name*="uiDatePicker"]'});
            });
		};

		init(obj);
		event();
    }*/
    // 현장영업 버튼 리스트 솔팅
     datelistSort: function(obj) {
		if (!SgiUI.checkObj(obj)) {
			return;
        }
        
        var sortBtnWrap = null;
        var itemIdx = null;
        var itemIdxX = null;
        var clickNum = null;

		function init(obj) {
            sortBtnWrap = $(obj);
            sortBtnItem = $(obj).find('.item');
            sortBtnItem.each( function(idx) {
                $(this).attr('data-idx', idx);
            });
		};

		function event(){

            sortBtnItem.on('click', function() {
                itemIdx = $(this).index();
                
                if($('.sort-btn-wrap > .item[data-idx="' + itemIdx + '"]').hasClass('desc')) {
                    $('.sort-btn-wrap > .item[data-idx="' + itemIdx + '"]').removeClass('desc').addClass('asc');
                }else if($('.sort-btn-wrap > .item[data-idx="' + itemIdx + '"]').hasClass('asc')) {
                    $('.sort-btn-wrap > .item[data-idx="' + itemIdx + '"]').removeClass('asc').addClass('desc');
                }else if(!$('.sort-btn-wrap > .item[data-idx="' + itemIdx + '"]').hasClass('desc') || !$('.sort-btn-wrap > .item[data-idx="' + itemIdx + '"]').hasClass('asc') ) {
                    $('.sort-btn-wrap').find('.item').removeClass('desc asc');
                    $('.sort-btn-wrap > .item[data-idx="' + itemIdx + '"]').addClass('desc');
                }
            });
		};

		init(obj);
		event();
	}
};