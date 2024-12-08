
function moNavAct(gnb) { // mobile nav gnb button work
    var gnb = $('.' + gnb);
    if(gnb.hasClass('navOn')) {
        $('html, body').removeClass('hidden');
        gnb.find('.moHomeBtn').removeClass('homeOn');
        gnb.removeClass('navOn');
    } else {
        $('html, body').addClass('hidden');
        gnb.addClass('navOn');
        setTimeout(function() {
            gnb.find('.moHomeBtn').addClass('homeOn');
        },200);
        
    }
}

function subMbSet(vw) {
    var subHeader = $('.subPage');
    var cancel = $('.cancelBtn');
    if(vw < 999) {
        if(subHeader.length > 0) {
            subHovScroll(subHeader, cancel);
        }
    } else {
        subHeader.removeClass('chgFix');
        cancel.removeClass('show');
    }
}
function subHovScroll(head, cancel) {
    $(window).on('scroll', function() {
        var hTop = $(this).scrollTop();
        if(hTop > 0) {
            head.addClass('chgFix');
            cancel.addClass('show');
        } else {
            head.removeClass('chgFix');
            cancel.removeClass('show');
        }
    });
}

function subTopWork() { // 서브 모바일 탑버튼
    $('html,body').animate({ scrollTop: 0 }, 300);
}

function chgAgency(e) { // 통신사 버튼
    var t = e.target.parentNode;
    $('.agencyList li').removeClass('now');
    $(t).addClass('now');
}

function chgSubmitBtn(e) { // 인증요청 버튼 색 변경
    var t = e.target;
    var inputValue = $(t).val();
    var tWrap = t.parentNode.parentNode.parentNode;
    var tButton = $(tWrap).find('.submitBtn');
    if(inputValue) {
        $(tButton).addClass('val');
    } else {
        $(tButton).removeClass('val');
    }
}

function confirmOn() {
    $('.confirm').addClass('sent');
}

function toggleMenu(e) { // 공지사항 토글
    var t = e.target;
    var tWrap = $(t).closest('.toggleWrap');
    if($(tWrap).hasClass('open')) {
        $(tWrap).removeClass('open');
    } else {
        $('.toggleWrap .desc').slideUp();
        $('.toggleWrap').removeClass('open');
        $(tWrap).addClass('open');
    }
    $(tWrap).children('.desc').slideToggle();
}

function faqTab(faqindex) {
    $('.faqList').removeClass('now');
    $('#faq' + faqindex).addClass('now');
    if(window.innerWidth < 679) {
        var agencyLi = $('.agencyList li');

        agencyLi.each(function(index, item) {
            if($(agencyLi).eq(index).hasClass('now')) {
                $(agencyLi).css('border','0');
                $(item).css('border', '2px solid #000');
                if(index === 0) {
                    $(agencyLi).eq(1).css('border-right', '1px solid #e7e7e7');
                    $(agencyLi).eq(1).css('border-top', '1px solid #e7e7e7');
                    $(agencyLi).eq(1).css('border-bottom', '1px solid #e7e7e7');
                    $(agencyLi).eq(2).css('border-right', '1px solid #e7e7e7');
                    $(agencyLi).eq(2).css('border-bottom', '1px solid #e7e7e7');
                    $(agencyLi).eq(3).css('border-right', '1px solid #e7e7e7');
                    $(agencyLi).eq(3).css('border-bottom', '1px solid #e7e7e7');
                }
                if(index === 1) {
                    $(agencyLi).eq(0).css('border-left', '1px solid #e7e7e7');
                    $(agencyLi).eq(0).css('border-top', '1px solid #e7e7e7');
                    $(agencyLi).eq(0).css('border-bottom', '1px solid #e7e7e7');
                    $(agencyLi).eq(2).css('border-right', '1px solid #e7e7e7');
                    $(agencyLi).eq(2).css('border-bottom', '1px solid #e7e7e7');
                    $(agencyLi).eq(3).css('border-right', '1px solid #e7e7e7');
                    $(agencyLi).eq(3).css('border-bottom', '1px solid #e7e7e7');
                }
                if(index === 2) {
                    $(agencyLi).eq(0).css('border-left', '1px solid #e7e7e7');
                    $(agencyLi).eq(0).css('border-top', '1px solid #e7e7e7');
                    $(agencyLi).eq(0).css('border-bottom', '0');
                    $(agencyLi).eq(1).css('border', '1px solid #e7e7e7');
                    $(agencyLi).eq(3).css('border-right', '1px solid #e7e7e7');
                    $(agencyLi).eq(3).css('border-bottom', '1px solid #e7e7e7');
                }
                if(index === 3) {
                    $(agencyLi).eq(0).css('border', '1px solid #e7e7e7');
                    $(agencyLi).eq(1).css('border-left', '0');
                    $(agencyLi).eq(1).css('border-right', '1px solid #e7e7e7');
                    $(agencyLi).eq(1).css('border-top', '1px solid #e7e7e7');
                    $(agencyLi).eq(2).css('border-left', '1px solid #e7e7e7');
                    $(agencyLi).eq(2).css('border-bottom', '1px solid #e7e7e7');
                }
            }
        })
    }
}

function tabSlide(tab) {
    var tabNum = tab.attr('tab-num');
    var vw = window.innerWidth;
    var swiper = new Swiper(tab, {
        init: true,
        slidesPerView: 'auto',
        freeMode: false,
        grabCursor: true,
        initialSlide: tabNum,
    });
}

$(document).ready(function() {
    verChk();
    
    $.fn.allCheck = function () {
		var defaults = {
			all: '.chkAll',
			child: '.ipChk'
		};
        var options = $.extend({}, defaults);
		
		$(this).each(function (index) {
			var thisObj = $(this);
			var $all = thisObj.find($(options.all));
			var $child = thisObj.find($(options.child));
			var size = $child.length; //chkbox 갯수

            $(this).find($(options.all)).on('change', function (e) {
                if ($(this).prop('checked')) {
                    thisObj.find($(options.child)).prop({ 'checked': true });
                } else {
                    thisObj.find($(options.child)).prop({ 'checked': false });
                }
            });

            thisObj.find(options.child).on('change', function (e) {
                setting();
            });

            function setting() {
                var checkCount = thisObj.find($(options.child + ':checked')).length;
                var $all = thisObj.find($(options.all));

                if (checkCount === 0) {
                    $all.prop({ 'checked': false });
                }
                else if (checkCount >= size) {
                    $all.prop({ 'checked': true });
                    thisObj.find($(options.child)).prop({ 'checked': true });
                }
                else {
                    $all.prop({ 'checked': false });
                }
            }
		});
  	}
    if ($('.subPage').length > 0) {
        // console.log('sub');
        // $('.chkList').allCheck();
        var vw = window.innerWidth;
        var tab = $('.tabSlide');
        if(tab.length > 0) {
            tabSlide(tab);
        }
        subMbSet(vw);
        $(window).on('resize', function () {
            vw = window.innerWidth;
            subMbSet(vw);
        });
    }

    if($('.chkList').length > 0) {
        $('input[type="checkbox"]').prop({ 'checked': false });
    }
    

    var lblBoth = $(".lblHov");
    if(lblBoth.length > 0) {
        var lbl; // block 되는 label
        var obj = lblBoth; // label 2개 바뀌는 영역
        var t; // focus, focusout 하는 target

        if(vw > 998) { // vw에 따른 lbl 선택
            lbl = obj.siblings('.mbOff');
        } else {
            lbl = obj.siblings('.mbOn');
        }
        lblSet(vw, obj, lbl);
        $(window).on('resize', function() {
            lblSet(vw, obj, lbl);
        });
        lblBoth.on('keydown', function() {        
            t = $(this); // target 설정
            lblSet(vw, obj, lbl, t);
        });
        lblBoth.on('focus', function() {
            t = $(this); // target 설정
            lblSet(vw, obj, lbl, t);
        });
        lblBoth.on('focusout', function() {
            t = $(this); // target 설정 
            lblSet(vw, obj, lbl, t);
        });
    }
})

function lblSet(vw, obj ,lbl, t) { // lbl 바꾸기
    if(vw > 998) { // resize 시 lbl 재설정
        lbl = $(obj).siblings('.mbOff');
        tlbl = $(t).siblings('.mbOff');
    } else {
        lbl = $(obj).siblings('.mbOn');
        tlbl = $(t).siblings('.mbOn');
    }
    obj.siblings('label').css('display', 'none'); // default로 label 2개 none 처리
    lbl.css('display', 'block');
    if($(t).val()) { // value 체크
        $(t).siblings('label').css('display', 'none'); 
    }
    if($('#email').val()) {
        $('#email').siblings('label').css('display', 'none');
    }
    if($('#contents').val()) {
        $('#contents').siblings('label').css('display', 'none');
    }
}

function verChk() {
    if(navigator.appName.indexOf("Internet Explorer") != -1 && navigator.userAgent.indexOf('9.0') != -1) {
        // console.log('ie9');
        $('body').addClass('ie9');
    } 
}

// 팝업 이벤트 on, off
function popupOn(popId) {
	$('html, body').addClass('noscroll');
	$('#'+ popId).show();
}
function popupOff(popId) {
	$('#'+ popId).hide();
    $('html, body').removeClass('noscroll');
    // 다회선 인증알림 팝업 안 입력칸 초기화
    $('.lyPop .other input').val('');
    $('.lyPop .confirm').removeClass('sent');
    $('.lyPop .pageBtn').removeClass('now');
    $('.lyPop .pageList li:first-child .pageBtn').addClass('now');
    $('.lyPop .agencyList li').removeClass('now');
    $('.lyPop .agencyList li:first-child').addClass('now');
    $('.lyPop .chkList .ipChk').removeClass('wasChk');
	$('.lyPop .chkList .ipChk').prop({'checked': false});
}

/* 팝업 페이징 버튼 */
function pageChg(e) {
    var target = e.target.parentNode;
    $('.pageBtn').removeClass('now');
    $(target).addClass('now');
}