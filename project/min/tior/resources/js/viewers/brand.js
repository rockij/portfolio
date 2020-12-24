// brand swipe setting
function swirSet() {
    carPhoto = new Swiper('#carPhoto', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>'
            }
        },
        init: false
    });
    baseSlide = new Swiper('#baseSlide', {
        init: false
    });
}
// 리뷰내 사진 swiper
function reviewDescSwir(pop) {
    var options = {
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
    }
    if(pop) options.init = false;
    else options.init = true;
    review = new Swiper('.review_swir', options)
}

// 시승신청완료 버튼 position set
function targetOverPop(target) {
    var cont = $('#' + target).find('.content');
    var buttonArea = $('#' + target).find('*[class*="btn_area"]');
    $(cont).css('height', 'auto');

    var sizeWin = $(window).outerHeight();
    var sizeCont = $(cont).outerHeight() - $(buttonArea).outerHeight();

    if (sizeCont > sizeWin) {
        $(buttonArea).css('position', 'static')
        $(cont).css({
            'overflow-y': 'scroll',
            'height': '100%',
            'padding-bottom': 0
        })
    } else {
        $(buttonArea).css('position', 'absolute')
        $(cont).css({
            'overflow-y': 'hidden',
            'height': 'auto',
            'padding-bottom': $(buttonArea).outerHeight()
        })
    }
}

// 일정선택
function daySelect(id, btn) {
    var tar = $('#' + id);
    var dayBody = tar.find('.dayselct .body');
    $('.calendarSet .close').trigger('click');
    $(btn).addClass('hide');
    var pos = $(tar).find('.info').offset().top - $('#header').outerHeight();
    $('html,body').animate({scrollTop: pos}, 400);
    $(tar).find('.calendarSet').slideDown(400);
    tar.addClass('open on');
    dayBody.scrollLeft(0);
}

$(function() {
    // 시승예약 리스트 id 셋팅
    $.each($(".reserveSection>li"), function (i, v) {
        $(v).attr('id', 'list' + i);
    });

    // 시승예약 탭
    $('.handle_drivetab').on('click', function () {
        $(this).toggleClass('open').next().slideToggle('fast');
    });

    // 캘린더 닫기
    $(document).on('click', '.calendarSet .close', function () {
        var _this = $(this).parent();
        _this.parent().removeClass('open');
        $(_this).slideUp();
        _this.parent().find('.handle_calendar').removeClass('hide');
        _this.find('li').removeClass('current').eq(0).addClass('current');
        _this.find('.timeselct button').removeClass('selected');
    });

    // 일정확인 부분
    $(document).on('click', '.timeselct button', function () {
        var _this = $(this).parent();
        _this.parent().find('button').removeClass('selected');
        $(this).addClass('selected');
    });
    $(document).on('click', '.dayselct .body button', function () {
        var _this = $(this).parent();
        _this.parent().find('li').removeClass('current');
        _this.addClass('current');
    });
})


// 시승예약 스크롤
function carInfoScrollHandler() {
    var detailItem = {
        cont: $('.ly_car_detail').find('.content'),
        top:$('.ly_car_detail').find('.head'),
        btn: $('.ly_car_detail').find('.btn_area_float')
    }
    
    $(detailItem.cont).on('scroll', function () {
        var viewTop = $(this).scrollTop();
        var hurdle = $(detailItem.top).find('.photoArea').outerHeight();
        if (viewTop > hurdle) {
            $(detailItem.top).addClass('scroll_shw');
            $(detailItem.btn).addClass('scrolled');
        } else {
            $(detailItem.top).removeClass('scroll_shw');
            $(detailItem.btn).removeClass('scrolled');
        }
    })
}

// 리뷰 별 change
function rateStarChgHandler() {
    $('.rate_star input').on('change', function() {
        var targetRate = $(this).parents('.rate_star')
        var rateObj = {
            idx: Number(this.value),
            num: $(targetRate).find('.num'),
            gage: $(targetRate).find('.gage'),
            lbl: $(targetRate).find('label')
        }
        setRateStarSize(rateObj)
    })
}

// 별길이 계산
function setRateStarSize(obj) {
    if(obj) {
        var size = 20 * obj.idx;
        $(obj.num).text(obj.idx + '.0')
        $(obj.gage).css('width', size + '%')
    } else {
        $('.rate_star').each(function(idx, item) {
            var itemObj = {
                num: $(item).find('.num'),
                gage: $(item).find('.gage')
            }
            var idx = Number($(itemObj.num).text());
            var size = 20 * idx;
            $(itemObj.gage).css('width', size + '%')
        })
    }
    setAvgTotalSize()
}

// 리뷰작성 total 평균
function setAvgTotalSize() {
    var rateTotal = $('.review_rate');
    var rateEle = {
        total: $(rateTotal).find('.rate_tit .total'),
        num: $(rateTotal).find('.rate_star .num')
    }
    var sum = Array.from(rateEle.num).reduce(function(acc, cur) {
        var curNum = Number($(cur).text())
        return acc + curNum
    }, 0);
    var avg = sum / rateEle.num.length;
    avg = Math.ceil(avg * 2) / 2;
    $(rateEle.total).text(avg.toFixed(1));
}

// 리뷰내용 더보기
function reviewDescMoreHandler() {
    $('.desc_more .more, .desc_more .review_conts').on('click', function() {
        var target = $(this).parent()
        if($(target).hasClass('opened')) $(target).removeClass('opened')
        else $(target).addClass('opened')
    })
}

// 추천컨설턴트 상세내용 더보기
function salesDetailHandler(btn) {
    var wrap = $(btn).parents('.sales_video');
    if($(wrap).hasClass('detail')) $(wrap).removeClass('detail');
    else (wrap).addClass('detail');
}

// 리뷰 해시태그 액션
function reviewTagHandler() {
    var tagWrap = $('.review_tag');
    var tagEle = {
        input: $(tagWrap).find('#hashtag'),
        plus: $(tagWrap).find('.tag_plus'),
        list: $(tagWrap).find('ul'),
        tag: $(tagWrap).find('li button'),
        erase: $(tagWrap).find('li i'),
    }

    // input 입력 시
    $(tagEle.input).on('keyup', function(e) {
        var value = $(this).val();
        var code = e.keyCode;
        if(code == 188 || code == 32) value = value.substring(0, value.length - 1);
        if(code == 13 || code == 188 || code == 32) insertReviewTag(value, tagEle.input, tagEle.list);
    })

    // 태그추가 버튼 누를때
    $(tagEle.plus).on('click', function() {
        var value = $(tagEle.input).val();
        insertReviewTag(value, tagEle.input, tagEle.list)
    })
}

// 해시태그 만들기
function insertReviewTag(value, input, list) {
    var add = true;
    var hashTag = value;
    $('#tags li').each(function(index, item) {
        if(index > 8) add = false;
        var tag = $(this).text()
        if(tag == ("#" + hashTag)) {
            // 공통팝업으로 대체 필요
            popup_alert("중복으로 등록 불가능합니다.");
            add = false;
        }
    })
    if(value == "") return false;
    var insert = `<li><button type="button" onclick="$(this).toggleClass('focus')" class="focus">#${value}<i onclick="$(this).parents('li').remove()"></i></button></li>`
    if(add) {
        $(list).append(insert);
    }
    $(input).parent().find('.del').hide()
    $(input).val("");
}