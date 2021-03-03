var uiStyle;

$(function(){
	uiStyle = {
        init: function(){
            $('.pageTab').length > 0 && uiStyle.pageTab.init(); //pageTab
            $('.tableWrap').length > 0 && uiStyle.tableAccessibility.init(); // 테이블 caption 관리
            $('.btnWrap.fixed, .btnWrap.spaceFixed').length > 0 && uiStyle.pageFixBtn();
            $('.serviceList').length > 0 && uiStyle.joinService.init(); // 서비스가입 안내
            $('.accordionList').length > 0 && uiStyle.caseAccordion.init(); // 아코디언 타입별
            $('.accordionCheck').length > 0 && uiStyle.checkAccordion.init(); //아코디언 체크박스
            $('.moreToggle').length > 0 && uiStyle.moreToggle.init(); //확장 토글
            $('.cmmTooltip').length > 0 && this.cmmTooltip(); // tooltip
        },
        pageTab : {
            init:function() {
                var _this = this;

                var offsetL = $(".pageTab ul li.on").offset().left;
                $(".pageTab ul li.on").find('a').attr('title','선택됨');

                _this.handler();
            },
            handler : function() {
                var $tab = $('.pageTab'),
                    tabList = $tab.find('ul li');

                tabList.find('a').on("click", function() {
                    var $this = $(this).parent(),
                        idx = $this.index(),
                        offsetLeft = $(this).offset().left;

                    $(this).attr('title','선택됨').parent().addClass('on').siblings().removeClass('on').find('a').attr('title','');
                    $tab.find('>ul').animate({"scrollLeft": offsetLeft} , 300);
                });
            }
        },
        cmmTooltip : function() {
			var $wrap = $('.cmmTooltip');

			$wrap.find('a').on('click', function() {
                if ( $(this).siblings('.toolCont').hasClass('open')) {
                    $(this).attr('title','열기');
                    $(this).siblings('.toolCont').removeClass('open').fadeOut(300);
                } else {
                    $(this).attr('title','닫기');
                    $(this).siblings('.toolCont').addClass('open').fadeIn(300);
                }
			});

			// $(window).on('click', function(e){
			// 	if(!$(e.target).hasClass('toolCont') && !$(e.target).closest('div').hasClass('cmmTooltip')){
			// 		$('.toolCont.open').fadeOut(300);
            //         $('.toolCont.open').closest('.btnTooltip').attr('title','열기');
			// 	};
			// });
		},
        moreToggle: {
            init : function() {
                var _this = this;

                _this.handler();
            },
            handler : function() {
                var $wrap = $('.moreToggle');

                $wrap.each(function() {
                    var moreBtn = $(this).find('.btnToggle');
                    moreBtn.on("click", function() {
                        if ( $(this).hasClass('open')) {
                            $(this).removeClass('open').attr('title', '영역 펼치기').parents('.moreToggle').find('.toggleCont').slideUp(400);
                        } else {
                            $(this).addClass('open').attr('title', '영역 닫기').parents('.moreToggle').find('.toggleCont').slideDown(400);
                        }
                    });
                })
                
            }
        },
        caseAccordion : {
            init: function() {
                var _this = this;

                $('.acc_title').find('span').text('메뉴펼쳐보기');
                $('.acc_title.acc_open').parent().addClass('active').find('.acc_title > span').text('메뉴숨기기');

                _this.caseType();

            },
            caseType: function() {
                var acc = $('.accordionList');

                $('.acc_title').off('click').on('click', function() {
                    var $this = $(this),
                        thisAcc = $this.parents('.accordionList');

                    if ( !$this.find('.acc_title').hasClass('acc_open') && !$this.hasClass('disabled')) {
                        if ( !$this.parent().hasClass('active')) {
                            if ( thisAcc.hasClass('targetJS')) { // targat만
                                $this.parent().addClass('active').siblings('li').removeClass('active').find('.acc_title').removeClass('acc_open');
                            } else {
                                $this.parent().addClass('active');
                            }
                        } else {
                            $this.parent().removeClass('active');
                        }
                    }
                });
            }
        },
        checkAccordion : {
            init: function () {
                var acc = $('.accordionCheck');
                acc.on("change", 'input', function () {
                    var _this = $(this);
                    if(_this.prop("checked")){
                        _this.parents('dl').find('.showbox').show();
                    }else{
                        _this.parents('dl').find('.showbox').hide();
                    }
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
				var _str = uiStyle.tableAccessibility.strArr;

				$('.tableWrap').each(function(i){

					$('.tableWrap').eq(i).find('th').each(function(n, items){

						_str.push($(this).text());

						if($('.tableWrap').eq(i).find('th').length - 1 == n){

							_str = uiStyle.arrFiltering(_str)

/*
							_str = _str.filter(function(item) {
								  return item !== null && item !== undefined && item !== '';
							});
*/
							$('.tableWrap').eq(i).find('table').find('caption').text(_str + '으로 구성');

							_str = [];

						};

					});

				});
			}
		},
        arrFiltering: function(v){

			return v = v.filter(function(item) {
						return item !== null && item !== undefined && item !== '';
					});

		},
        joinService : {
            init : function() {
                var _this = this;

                _this.slider();
            },
            slider : function() {
                var serviceSlider = new Swiper('.serviceList', {
                    slidesPerView : 'auto',
                    freeMode : 'ture'
                });
            }
        },
        pageFixBtn : function() {
            var fixBtn = $('.btnWrap.fixed'),
                spaceFixbtn = $('.btnWrap.spaceFixed');

            if ( fixBtn.length != 0) {
                fixBtn.closest('#content').addClass('hasFixedBtn');
            } else if ( spaceFixbtn.length != 0) {
                spaceFixbtn.closest('#content').addClass('hasSpaceFixedBtn');
            }
        },
    }

    uiStyle.init();
    common_ui.init();
});