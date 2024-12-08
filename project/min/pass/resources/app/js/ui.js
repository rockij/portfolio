$(document).ready(function () {

	// toggle
	var obj = $('.bbs_toggle li.q');
	var ans = $('.bbs_toggle li.a');
	obj.on('click', function(e){
		if(!$(this).hasClass('active')){
			obj.removeClass('active');
			ans.removeClass('open');
			ans.filter(':visible').css('display', 'none');
			$(this).addClass('active').next('li.a').css('display', 'block');
		}else{
			$(this).removeClass('active');
			$(this).next('li.a').css('display', 'none');
        }
        if($('.header').length > 0){
            $(window).scrollTop($(this).position().top - $('.header').outerHeight());
        }else{
            $(window).scrollTop($(this).position().top);
        }
		// 레이어팝업 영역안으로 들어갔을시 포커스이동
		var selector = $(this).index()+1;
		$('.ly_view').each(function(){
			myScroll.refresh();
			myScroll.scrollToElement('li.q:nth-child('+selector+')');
		});
		e.preventDefault();
	});

	// 수협약관 상품안내 체크
	$.fn.itemCheck = function () {
		var wrap = $(this);
		var all, items, size;
		all = $(wrap).find('.item-all');
		items = $(wrap).find('.item-check');
		size = $(items).length;
		// console.log(all, items, size);
		$(all).on('change', function () {
			if ($(this).prop('checked')) {
				$(items).prop({ 'checked': true });
			} else {
				$(items).prop({ 'checked': false });
			}
		});
		$(items).on('change', function () {
			var count = wrap.find($('.item-check:checked')).length;
			if (count >= size) {
				$(all).prop({ 'checked': true });
			}
		});
	}
	$('.wrap-item-all').itemCheck();

	// 모두 선택하기
	$.fn.allCheck = function (opts) {
		var defaults = {
			all: '.check-all',
			child: '.ip-check'
		};
		var options = $.extend({}, defaults, opts);

		$(this).each(function (index) {
			var thisObj = $(this);
			var size = $(this).find($(options.child)).length;

			$(this).find($(options.all)).on('change', function (e) {
				if ($(this).prop('checked')) {
					thisObj.find($(options.child)).prop({ 'checked': true });
					$('.btn.skip').addClass('btn-focused');
					$('#join_submit').prop({'disabled': false});

				} else {
					thisObj.find($(options.child)).prop({ 'checked': false });
					$('.btn.skip').removeClass('btn-focused');
					$('#join_submit').prop({ 'disabled': true });
				}
				evtAgree();
			});

			thisObj.find(options.child).on('change', function (e) {
				setting();
			});

			function setting() {
				var checkCount = thisObj.find($(options.child + ':checked')).length;
				var $all = thisObj.find($(options.all));

				if (checkCount === 0) {
					$all.prop({ 'checked': false });
					$('.btn.skip').removeClass('btn-focused');
				}
				else if (checkCount >= size) {
					$all.prop({ 'checked': true });
					thisObj.find($(options.child)).prop({ 'checked': true });
					$('.btn.skip').addClass('btn-focused');
				}
				else {
					$all.prop({ 'checked': false });
					$('.btn.skip').removeClass('btn-focused');
				}
				evtAgree();
			}

			function evtAgree() {
				var agrAll = thisObj.find('.check-all');
				if ($(agrAll).prop('checked')) {
					thisObj.addClass('checkingAll');
				} else {
					thisObj.removeClass('checkingAll');
				}
			}
		});
	}
	$('.wrap-check-all').allCheck();
	$('.ipAgree').allCheck();


	// faq 아코디언 메뉴
	$('.faqList_item_link').on('click', function (e) {
		e.preventDefault();
		var thisObj = $(this);
		var target = thisObj.parent().siblings('.faq_answer');

		if (target.hasClass('on')) {
			thisObj.removeClass('show');
			target.removeClass('on').hide();
		}
		else {
			thisObj.addClass('show');
			target.addClass('on').show();
		}
	});

	// selected option 레이블에 표기
	$('.credit_select').on('change', function () {
		var select_name = $(this).children('option:selected').text() + '';
		$(this).siblings('.credit_label_txt').text(select_name);
	});

    // 버튼 하단 고정 form
    function fixOver(){
        var wrapFixed = $('.wrap-fixed');
        if (wrapFixed.length) {
            var wrapHeight = fixedHeight();
            fixedBtn();
        }
        $(window).on('resize scroll', function () {
            if (wrapFixed.length) {
                fixedBtn();
            }
            if(fixBtm.length) {
                var hTop = $(this).scrollTop();
                fixBtmChk(fixBtm, hTop);
            }
        });
        function fixedHeight() {
            $('body').height('auto');
            var wrapHeight = $('body').height();
            $('body').height('100%');
            return wrapHeight;
        }
        function fixedBtn() {
            var window_height = $(window).height();
            if (window_height < wrapHeight) {
                $('.wrap-fixed').removeClass('wrap-fixed-over');
                $('body').height('auto');
            }
            else {
                $('.wrap-fixed').addClass('wrap-fixed-over');
                $('body').height('100%');
            }
        }
    }
    fixOver();
    setTimeout(function() {
        fixOver();
    },100);

	var fixBtm = $('.fixBtm');
	function fixBtmChk(fixBtm, hTop) {
		if (hTop > 1) {
			fixBtm.addClass('active');
		} else {
			fixBtm.removeClass('active');
		}
	}

	// css calc, background step-image 실행
	bgCircleSort();
	widthCalcItems();

	$(window).on('resize', function () {
		bgCircleSort();
		widthCalcItems()
	});

	// css calc
	function widthCalcItems() {
		var vw = $('body').width() - 40;
		if ($('.label-select-3items').length) {
			$('.label-select-3items').css({ 'width': (vw - 40) / 3 });
		}

		if ($('.label-select-postItems').length) {
			$('.label-select-postItems').css({ 'width': ((vw - 20) / 3) * 2 });
		}

		if ($('.certify-progress_view').length) {
			$('.certify-progress_view .btn').css({ 'width': (vw - 6) / 2 });
		}
	}

	// background step-image
	function bgCircleSort() {
		var numCircle = $('.bg-circle').length;

		var vw = $('.account_step').width() - 34;
		var liWidth = $('.step-on_txt').outerWidth();
		$('.account_stepList_item').width(liWidth);

		var bgCircle = (vw - liWidth * (numCircle + 1)) / numCircle;
		$('.bg-circle').width(bgCircle);
		$('.account_stepList_item').css({ 'margin-left': bgCircle });
		$('.account_stepList_item').eq(0).css({ 'margin-left': 0 });

		var wrapCircle = bgCircle + 12;
		bgCircle = wrapCircle - (wrapCircle % 6);

		$('.wrap-bg').width(wrapCircle);
		$('.bg-circle').width(bgCircle);
	}

	// tab select
	tabInput();
	$('.tab-select-btn').on('change', function () {
		tabInput();
	});

	function tabInput() {
		var thisObj = $('.tab-select-btn');
		thisObj.each(function () {
			if ($(this).is(':checked')) {
				$('.ipBox-payment').hide();
				$('.' + $(this).attr('id') + '-select').show();
			}
		});
	}

	// select메뉴 선택시 텍스트 색상 변경
	isDisabled()
	$('.ipBox_ip-select').on('change', function () {
		isDisabled();
	});

	function isDisabled() {
		$('.ipBox_ip-select').each(function () {
			var opt = $(this).val();
			if (!opt) {
				$(this).css({ 'color': '#a7a7a7' });
			}
			else {
				$(this).css({ 'color': '#222' });
			}
			if ($(this).hasClass("short")) {
				slctAutoWidth($(this));
				$(this).on('change', function () {
					slctAutoWidth($(this));
				})
			}
		});

		function slctAutoWidth(that) {
			var $this = that;
			var text = $this.find('option:selected').text();
			var $test = $("<span>").html(text).css({
				"font-size": $this.css("font-size"), // ensures same size text
				"visibility": "hidden" 							 // prevents FOUC
			});
			$test.appendTo($this.parent());
			var width = $test.width();
			$test.remove();
			$this.width(width + 25);
		}

		// input 우측에 원이 있을시 정렬 변경
		$(".ipBox_won input").on("focus keyup blur", function(){
			if ($.trim($(this).val()) == "" ) {
				$(this).removeClass("t_r");
			}else{
				$(this).addClass("t_r");
			}
		}).blur();
	}

	// table select 선택시 스타일 지정
	$('.select-btn_ip').on('change', function () {
		$(this).parents('.ipBox').find($('.select-btn')).removeClass('selectedBox');
		$(this).parent('.select-btn').addClass('selectedBox')
	});

	// 비과세종합저축 기가입자 한도조회 click
	$('.btn_lookup').on('click', function () {
		$('.lookupBox').toggle();
		if($('.lookupBox').css('display') == 'block'){
			$('.wrap-fixed').css('height','auto');
			$("html, body").animate({scrollTop : $(this).offset().top}, 350);
		}else{
			$('.wrap-fixed').css('height','');
			$("html, body").scrollTop(0);
		}
	});

	// 하단팝업 셋팅
	function lyBtmSet() {
		var lyBtm = $('.ly_btm');
		$(lyBtm).find('.content').css('bottom', $(lyBtm).height() * -1);
	}
    // lyBtmSet();

});


// 스크롤 맨아래 이동
function scrollmov(tar){
    if(tar === 'btm'){
        $('html,body').animate({ scrollTop: $(document).height()-$(window).height() });
    }
}

// 팝업
function layer_open(obj, docIdx) {
	if(event != undefined) {
		var target = event.target;
		if ($(target).hasClass('check-all_label')) {
			var allCheck = $(target).parent().find('.check-all');
			if ($(allCheck).prop('checked')) {
				return false;
			}
		}
	}
	var temp = $("#" + obj),
	scroll = $(".ly_pop .scroll");
	$('body').css("overflow", "hidden");
	temp.show();
	if ($(temp).hasClass('ly_btm')) {
		setTimeout(function() {
			$(temp).addClass('up');
		},50);
	}
    scroll.scrollTop(0);
    var x=window.scrollX, y=window.scrollY;
	window.onscroll=function(){window.scrollTo(x, y)};
	if(docIdx != undefined) {
		docSwir(docIdx);
		if($(target).hasClass('check_label_link')) {
			$(temp).find('.btn-area-fixed').hide();
		}
	}
	$('.ly_note').click(function (e) {
		if (!$('.ly_note').has(e.target).length) {
			layer_close();
		}
    });
    // contnet top padding
    var lyh = $("#" + obj).find('.header').outerHeight(),
        lyc = $("#" + obj).find('.scroll');
    if($("#" + obj).hasClass('ly_doc')){
        lyc.css('padding-top',lyh);
    }
}
function layer_close() {
	$('#doc_wrap').find('.btn-area-fixed').show();
	$('body').css("overflow", "");
    $(".ly_pop").hide();
	$('.ly_btm').removeClass('up');
	window.onscroll=function(){};
	if($('.ipBank button.ip').hasClass('focused')) {
		var ipBank = $('.ipBank button.ip');
		if($(ipBank).find('.name').text() == "은행선택") {
			$(ipBank).removeClass('focused');
		}
	}
}
function layer_close_tar(obj) {
    $('body').css("overflow", "");
    $("#"+obj).hide();
	$("#"+obj).removeClass('up');
}

// 체크박스 해제
function checkRelease(tar){
  $("#"+tar).find("input").prop("checked", false);
  $("#"+tar).find(".btn.skip").removeClass("btn-focused");
}

// 세이프가드 참고글 토글
function accoAct(e) {
	var target = e.target;
	var desc = $(target).closest('.accoDesc');

	if(desc.hasClass('toggle')) {
		desc.removeClass('toggle');
	} else {
		desc.addClass('toggle');
	}
}

// 리뷰이벤트 화살표 토글
function showEvtDoc() {
	if($('.ipAgree').hasClass('checkingAll')) {
		$('.ipAgree').removeClass('checkingAll')
	} else {
		$('.ipAgree').addClass('checkingAll')
	}
}

function docSwir(idx) {
	var docThumb = new Swiper('#doc-thumbs', {
		spaceBetween: 10,
		slidesPerView: "auto",
	});
	var docCont = new Swiper('#doc-content', {
		initialSlide: 0,
		autoHeight: true,
		thumbs: {
			swiper: docThumb
		}
	});

	// 보기 눌렀을때
	// console.log(idx);
	docCont.slideTo(idx);
	docThumb.slideTo(idx);
	$('.docTg').removeClass('docAct');
	$('.docTg:eq('+ idx + ')').addClass('docAct');

	// 탭메뉴 클릭 시
	$('.docTg').on('click', function() {
		var thumbIdx = $(this).attr('data-idx');
		// console.log(thumbIdx);
		$('.docTg').removeClass('docAct');
		$(this).addClass('docAct');
		docCont.slideTo(thumbIdx);
		docThumb.slideTo(thumbIdx);
	});
	// 닫기버튼 클릭 시
	$('.ico-close').on('click', function () {
		docCont.slideTo(0);
		docThumb.slideTo(0);
	});

	// 약관 이미지 슬라이드 시
	docCont.on('slideChange', function () {
		var contIdx = docCont.realIndex;
		// console.log(contIdx);
		docThumb.slideTo(contIdx);
		$('.docTg').removeClass('docAct');
		$('.docTg:eq(' + contIdx + ')').addClass('docAct');
	});
}

//pass머니 이체 숫자패트 애니메이션
function numpadEvt() {
	$('.num_pad button').on('touchstart', function () {
		$(this).addClass('touch');
	});
	$('.num_pad button').on('touchend', function () {
		$(this).removeClass('touch');
	});
}
// pass머니 이체 은행선택버튼
function bankSet() {
	bankSelect();
	$('.ipBank button.ip').on('click', function() {
		var ipBtn = this;
		$(ipBtn).addClass('focused');
		layer_open('bank');
	});
	// 키패드 이슈수정
	$('.ipBank input.ip').on('focus', function () {
		$('.fix_btm').css('position', 'static');
	});
	$('.ipBank input.ip').on('blur', function () {
		$('.fix_btm').css('position', 'relative');
	});
	$('.ipBank input.ip').on('change keyup', function() {
		var name = $('.ipBank .name').text();
		bankBtnFocus(name);
	});
}

// pass머니 이체 팝업은행이름
function bankSelect() {
	var bankName, chgName;

	$(document).on('click', '#bank .bankBtn', function() {
		bankName = $(this).find('span').text();
		chgName = $('.ipBank .name');
		$(chgName).html(bankName);
		layer_close('bank');
		bankBtnFocus(bankName);
	})
}

// pass머니 이체 버튼 활성화
function bankBtnFocus(name) {
	var account = $('.ipBank input.ip').val();
	if(name != "은행선택" && account) {
		$('.btn-focused').prop('disabled', false);
	}
}

// pass머니 계좌입력 높이계산
function calcH() {
	var top = $('.header').outerHeight();
	var btm = $('.fix_btm').outerHeight();
	var secH = $(window).innerHeight() - (top + btm);
	$('.send_sec').css('height', secH);
}

// pass머니 룰렛
function moneyLulte(){
	$('.visitCheck_roulette .go').on('click', function (e) {
        $(this).prop({'disabled': true}).addClass('push');
        $(this).parent('figure').addClass('on');
        $(this).parent('figure').find('.go').addClass('stop');
        setTimeout(function() {
            $(e.target).removeClass('push');
        },200);
        setTimeout(function() {
            layer_open('winning');
        },3000);
        setTimeout(function() {
            // $('figure').removeClass('on');
            $('figure').find('.go').removeClass('stop');
            $(e.target).prop({'disabled': false});
        },2500);
    });
}

// text count animation
function counting(name,speed,point){
    var point;
    if ( typeof point == "undefined" ){
        point = 0;
    }
	$('.count_'+name).each(function() {
		var $this = $(this),
        countTo = $this.attr('data-count');
        if($this.text() == 0){
            $({ countNum: $this.text()}).animate({
                countNum: countTo
            },{
                duration: speed,
                easing:'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                    if(!isNaN(Number($this.text())) && $this.text()) $this.text(Number($this.text()).toLocaleString().split('.')[point]);
                }, complete: function() {
                    $this.text(this.countNum);
                    if(!isNaN(Number($this.text())) && $this.text()) $this.text(Number($this.text()).toLocaleString().split('.')[point]);
                }
            });
        }
	});
}

// 모바일 면허증
function licenseFullpage(){
    var swiper = new Swiper('#fullpage', {
        direction: 'vertical',
    });
    var startScroll, touchStart, touchCurrent;
    swiper.slides.on('touchstart', function (e) {
        startScroll = this.scrollTop;
        touchStart = e.targetTouches[0].pageY;
    }, true);
    swiper.slides.on('touchmove', function (e) {
        touchCurrent = e.targetTouches[0].pageY;
        var touchesDiff = touchCurrent - touchStart;
        var slide = this;
        var onlyScrolling = ( slide.scrollHeight > slide.offsetHeight ) && (
            ( touchesDiff < 0 && startScroll === 0 ) ||
            ( touchesDiff > 0 && startScroll === ( slide.scrollHeight - slide.offsetHeight ) ) ||
            ( startScroll > 0 && startScroll < ( slide.scrollHeight - slide.offsetHeight ) )
            );
            if (onlyScrolling) {
                e.stopPropagation();
            }
        if(swiper.realIndex == 2 || swiper.realIndex == 3){
            $('.aboutCont').addClass('last');
            var cnt = 0;
            var timer = setInterval(function() {
                cnt++;
                if($('#section2, #section3').hasClass('swiper-slide-active')){
                    $('.aboutCont').removeClass('last');
                    $('#section4').scrollTop(0);
                    $('.skip.more').removeClass('on');
                }else{
                    $('.aboutCont').addClass('last');
                    $('.skip.more').addClass('on');
                }
                if(cnt == 10){
                    clearInterval(timer);
                }
            },1);
        }else{
            $('.aboutCont').removeClass('last');
            $('#section4').scrollTop(0);
        }
    }, true);

    var swiper1 = new Swiper('#slide1', {
        pagination: {
          el: '#slide1 .swiper-pagination',
        },
      });
      swiper1.on('slideChange', function () {
          // console.log(swiper1.realIndex);
          $('.count_num').attr('data-count',0).text(0);
          if(swiper1.realIndex == 2){
              $('.count_num').attr('data-count',30);
              counting('num',1000);
          }
      });
      var swiper2 = new Swiper('#slide2', {
        pagination: {
          el: '#slide2 .swiper-pagination',
        },
      });
      var swiper3 = new Swiper('#slide3', {
          pagination: {
              el: '#slide3 .swiper-pagination',
          },
      });
      var swiper4 = new Swiper('#slide4', {
        pagination: {
          el: '#slide4 .swiper-pagination',
        },
      });
      // $.fn.fullpage.moveTo(4);
      $('.handle_onoff').on('click', function(e) {
          e.preventDefault();
          var idx = $(this).parent().index()+1,
              sid = $(this).attr('data-id'),
              slid = $(this).attr('data-slide');
          $(this).parent().parent().removeClass('on1 on2').addClass('on'+idx);
          $('#section'+sid).find('.swiper-container').hide();
          $('#slide'+slid).show();
          if(slid == 3){
              $('#slide4 .swiper-slide').removeClass('swiper-slide-active');
              $('#section'+sid).find('.txt').hide();
              $('#section'+sid).find('.tx'+slid).show();
              swiper3.slideReset();
          }else if(slid == 4){
              $('#slide3 .swiper-slide').removeClass('swiper-slide-active');
              $('#section'+sid).find('.txt').hide();
              $('#section'+sid).find('.tx'+slid).show();
              swiper4.slideReset();
          }
      });
      $('#section3 .handle_onoff:eq(0)').trigger('click');

      // 세로긴폰
      if( $(window).height() > 680 ){
          $('html').addClass('hw');
      }
      // height:574 이하 (G5)
      if( $(window).height() <= 574 ){
        $('html').addClass('hw574');
      }
    //   console.log( $(window).height() );
}

// 고정영역 간격
function fixValue(){
    var t = $(".fix.top").innerHeight(),
        b = $(".fix.btm").outerHeight(),
        w = $("#wrap");
    if($(".fix.top").length > 0) {
        w.css("padding-top", t);
    }
    if($(".fix.btm").length > 0){
        w.css("padding-bottom", b);
    }
    if($(".fix.btm").hasClass("goOut")){
        $(".goOut").css("bottom",-b);
    }
    if($(".fix_btm").length > 0){
        $(".wrap").css("padding-bottom", b);
	}
	if ($(".send_end").length > 0) {
		$(".send_sec").css("padding-bottom", b);
	}
}
// $(window).on('load', function () {
//     fixValue();
// });

// 전체동의
function chkinglst(id){
    var doc = $(document),
    item = $('.i_chk input'),
    iall = $('#'+id).find(item).length,
    pall = $('#'+id).find('.chkAll input');
    // 전체동의
    doc.on('change', '#'+id+' .chkAll input', function () {
        if($(this).prop('checked')) {
            item.prop("checked", true);
            $('#'+id+'-btn').prop("disabled", false);
        }else{
            item.prop("checked", false);
            $('#'+id+'-btn').prop("disabled", true);
        }
    });
    pall.on("blur", function () {
        pall.trigger('change');
    }).blur();
    // 한개씩 전체 체크
    doc.on("change", '#'+id+' .i_chk input', function () {
        var size = $('#'+id+' .i_chk input:checked').length;
        if(size === iall){
            pall.prop("checked", true);
            $('#'+id+'-btn').prop("disabled", false);
        }else{
            pall.prop("checked", false);
            $('#'+id+'-btn').prop("disabled", true);
        }
    });
}

// tab slide(scroll)
function tabSlide(tar){
    var w = $('.swiper-wrapper').innerWidth();
    var x = $('.selected').parent().offset().left;
    $('.'+tar).animate({scrollLeft:x-20},0);
    // console.log(x);
    $('.'+tar+' .tab_type').each(function(){
        var t = $(this), tW = 0;
        $('li', t).each(function(){
            tW += $(this).outerWidth(true);
        });
        t.css('width',tW + t.outerWidth(true) - t.width());
    });
}

// os 버전체크
var userOS;
var userOSver;
function getOS(){
    var ua = navigator.userAgent;
    var uaindex;

    // determine OS
    if ( ua.match(/iPad/i) || ua.match(/iPod/i) || ua.match(/iPhone/i) ){
        userOS = 'iOS';
        uaindex = ua.indexOf( 'OS ' );
    }else if ( ua.match(/Android/i) ){
        userOS = 'Android';
        uaindex = ua.indexOf( 'Android ' );
    }else{
        userOS = 'unknown';
    }

    // determine version
    if ( userOS === 'iOS'  &&  uaindex > -1 ){
        userOSver = ua.substr( uaindex + 3, 3 ).replace( '_', '.' );
        if(userOSver < 9){
            $('html').addClass('os-down');
        }
    }else if ( userOS === 'Android'  &&  uaindex > -1 ){
        userOSver = ua.substr( uaindex + 8, 3 );
        if(userOSver < 4.4){
            $('html').addClass('os-down');
        }
    }else{
        userOSver = 'unknown';
    }
}