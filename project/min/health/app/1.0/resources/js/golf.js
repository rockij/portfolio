// 즉시실행함수
$(function() {
    fixValue();
    underPopSet();
    ipFocus();
    checkOne();
    setToday();

    if($('#picker').length > 0) {
        pickerSet();
    }
});


// fix area value
function fixValue(){
    var headfix = $("#head.fix"), footfix = $("#foot.fix");
    // console.log(headfix, footfix);
	var topValue = headfix.outerHeight(), footValue = footfix.outerHeight();
	if(headfix.length > 0) $("#wrap").css("padding-top",topValue);
    if(footfix.length > 0) $("#wrap").css("padding-bottom",footValue);
}

// ly_pop show
function popOn(pop) {
    var temp = $("#" + pop),
    scroll = $(".ly_pop .scroll");
    // $('body').addClass('hidden');
    $('body').css("overflow", "hidden");
    $(temp).addClass('show');
    scroll.scrollTop(0);
    var x=window.scrollX, y=window.scrollY; 
    window.onscroll=function(){window.scrollTo(x, y)};

    $('.ly_pop').click(function (e) {
        if (!$('.ly_pop .elm').has(e.target).length) {
            popOff(pop);
        }
    });
}

// ly_pop hide
function popOff(pop) {
    // $('body').removeClass('hidden');
    $('body').css("overflow", "");
    $('#' + pop).removeClass('show');
    window.onscroll = function () {};
}

// popup pos bottom set;
function underPopSet() {
    $(".ly_pop").blur(function(){		
		var $obj = $(this).find(".elm"), $height = $obj.outerHeight();
		$obj.css({bottom:-$height});
	}).blur();
}

// 메인 scroll
function mainSet() {
    // 메인 ct swiper
    var golf = new Swiper('.golfSlide', {
        autoplay: false,
        delay: 2000,
        disableOnInteraction: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,
        setWrapperSize: true,
    });

    setTimeout(function() {
        $('.sec0').addClass('arrived');
    },200);
    
    var mainSec = $('.mainSec');
    var secTop = [];
    for (var i = 0; i < mainSec.length - 1; i++) { // main section별 active 위치값 설정
        if (i > 0) {
            secTop.push(($(mainSec[i]).offset().top + $(mainSec[i - 1]).offset().top) / 2);
        }
    }
    // console.log(secTop);
    $(window).on('scroll', function () {
        var top = $(this).scrollTop();
        for (var j = 0; j < secTop.length; j++) {
            if (top > secTop[j]) {
                // console.log(j, secTop[j]);
                $('.sec' + (j + 1)).addClass('arrived');
                if ($('.sec2').hasClass('arrived')) golf.autoplay.start();
            }
        }
    });
}


// 이용내역 은행 선택
function selectM(btn) {
    var pop, date, month;
    $('.monthList button').removeClass('checked');
    $(btn).addClass('checked');
    date = $(btn).text();
    month = date.slice(-2);
    if(month.split('')[0] == 0) {
        month = month[1];
    }
    $('.tDate').text(date);
    $('.tMonth').text(month);
    pop = $(btn).parents('.ly_pop').attr('id');
    popOff(pop);
}

// 입력창 focus
function ipFocus() {
    var ip, box;
    ip = $('.tIp');
    ip.on({
        'focus': function() {
            box = $(this).parents('.ipBox');
            $(box).addClass('focus');
        },
        'blur': function() {
            box = $(this).parents('.ipBox');
            $(box).removeClass('focus');
        }
    })
}

// input type="number" set maxlength
function checkLength(obj) {
    if (obj.value.length > obj.maxLength) {
        obj.value = obj.value.slice(0, obj.maxLength);
    } else {
        if(obj.value.length == obj.maxLength) {
            obj.blur();
            $('.calendarWrap').addClass('show');
            setTimeout(function() {
                var ipTop = $('.calendarWrap').offset().top;
                $('html,body').animate({ scrollTop: ipTop }, 300);
                popOn('select_date');
            },300);
        }
    }
    ableButton();
}

// input checkbox choice one
function checkOne() {
    $('.ipChk').on('change', function() {
        // console.log(this);
        if($(this).hasClass('inDoc')) {
            return false;
        } else {
            var thisWrap = $(this).parents('.checkList');
            if ($(this).prop('checked')) {
                $(thisWrap).find('.ipChk').prop('checked', false);
                $(this).prop('checked', true);
            }
            ableButton();
        } 
    });
}

// 오늘날짜 설정
function setToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    
    today = yyyy + '.' + mm + '.' + dd;
    $('.datePick').text(today);
}

// 가입 주민번호 뒷자리, 동의&미동의 선택
function ableButton() {
    var ipLength, agreeLength, dayLength;
    agreeLength = $('input.ipChk[type="checkbox"]:checked').length;
    if($('input.tIp').length > 0) {
        ipLength = $('input.tIp').val().length;
        dayLength = $('.ui-datepicker-current-day').length;
        if(ipLength > 6 && dayLength > 0) {
            $('#foot.fix').removeClass('hide');
            if(agreeLength > 0) {
                $('.footBtn button').prop('disabled', false);
            } else {
                $('.footBtn button').prop('disabled', true);
            }
        }
        // console.log(ipLength, dayLength, agreeLength);
    } else {
        if (agreeLength > 0) {
            $('.footBtn button').prop('disabled', false);
        } else {
            $('.footBtn button').prop('disabled', true);
        }
    }
}

// 가입 달력
function pickerSet() {
    $('#picker').datepicker({
        inline: true, // 달력활성화
        showMonthAfterYear: true, //년도 먼저 나오고, 뒤에 월 표시
        yearSuffix: ".", //달력의 년도 부분 뒤에 붙는 텍스트
        dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'], //달력의 요일 부분 텍스트
        monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'], //월 텍스트
        minDate: 'today', // 최소날짜
        numberOfMonths: [2,1],
        maxDate: '1M', // 최대날짜
        onSelect: function(dateText, inst) {
            var year, month, day;
            year = inst.selectedYear;
            month = inst.selectedMonth + 1; // 1월 = 0
            day = inst.selectedDay;
            if (day < 10) {
                day = day;
                day = '0' + day;
            }
            if (month < 10) {
                month = '0' + month;
            }
            dateText = year + '.' + month + '.' + day;
            // console.log(year, month, day, dateText);
            $('.datePick').text(dateText);
            setTimeout(function() {
                popOff('select_date');
                ableButton();
                $('.checkWrap').addClass('show');
                var agreeTop = $('.checkWrap').offset().top;
                $('html,body').animate({ scrollTop: agreeTop }, 400);
            },200);
        },
    });
    $('#picker').css('padding-bottom', $('.ui-datepicker-group').height());
    $('#picker').datepicker('setDate', 'today');
    $('#picker .ui-datepicker-today').removeClass('ui-datepicker-current-day');
}

// 가입 전 확인사항 토글
function tgCheck(btn) {
    var tgSec = $(btn).parents('.tgSec');
    if($(tgSec).hasClass('descOn')) {
        $(tgSec).removeClass('descOn');
    } else {
        $('.tgSec').removeClass('descOn');
        $('.tgSec.note').addClass('descOn');
        $(tgSec).addClass('descOn');
    }
}

// 메인 약관팝업 체크 전부다
function agrAll(check) {
    var ipAgree = $(check).attr('data-value');
    var docButton = $(check).parents('.ly_pop').find('.footBtn button');
    // console.log(check, ipAgree, docButton);
    if ($(check).prop('checked')) {
        $('.ipChk').prop('checked', false);
        $(check).prop('checked', true);
        $('.ipAgree').prop('checked', false);
        if(ipAgree != "all") {
            $('.ipAgree.essential').prop('checked', true);
        } else {
            $('.ipAgree').prop('checked', true);
        }
        $(docButton).prop('disabled', false);
    } else {
        $('.ipChk').prop('checked', false);
        $('.ipAgree').prop('checked', false);
        $(docButton).prop('disabled', true);
    }
}

// 약관동의 체크박스
function agrWhole() {
    var docPop, docButton, totalCheck
    var essentialLength, essentialChecked;
    var ipAgreeLength, ipAgreeChecked;

    $('.ipAgree').on('change', function() {
        docPop = $(this).parents('.ly_pop');
        docButton = $(docPop).find('.footBtn button');
        totalCheck = $(docPop).find('.checkList .ipChk');
        // console.log(docPop, docButton, totalCheck); 팝업 내 버튼, 기본 체크

        ipAgreeLength = $(docPop).find('.ipAgree').length;
        essentialLength = $(docPop).find('.ipAgree.essential').length;
        // console.log(ipAgreeLength, essentialLength); 전체약관, 필수약관동의 갯수

        ipAgreeChecked = $(docPop).find('.ipAgree:checked').length;
        essentialChecked = $(docPop).find('.ipAgree.essential:checked').length;
        // console.log(ipAgreeChecked, essentialChecked); 전체약관, 필수약관동의 chceck된 갯수

        if (essentialChecked >= essentialLength) { // 필수항목
            $(totalCheck[1]).prop('checked', true);
            $(docButton).prop('disabled', false);
            if (ipAgreeChecked >= ipAgreeLength) { //선택항목
                $(totalCheck[0]).prop('checked', true);
                // $(docButton).prop('disabled', false);
            } else {
                $(totalCheck[0]).prop('checked', false);
                // $(docButton).prop('disabled', true);
            }
        } else {
            $(totalCheck).prop('checked', false);
            $(docButton).prop('disabled', true);
        }
    });
    
}