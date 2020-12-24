// 민앤지 작업본

$(function() {
    // input readonly focus 시 blur 처리
    var readIp = $('.input input').prop('readonly', true);
    $(readIp).on('focus', function() {
        $(this).blur();
    })
    // fixed top,bottom content height 계산
    if ($('.fix-layer').length > 0) {
        contHeight();
    }

    // 모달팝업 setting 및 이벤트
    if ($('.modal-info').length > 0) {
        modalSet();
    }
    // 충전하기 이벤트
    if ($('.modal-info').length > 0) {
        chargeIpForm();
    }

    // 계좌관리 주계좌 설정 별버튼
    $('.manage-wrap .btn-star').on('click', function() {
        $('.manage-wrap .desc').removeClass('default');
        $('.manage-wrap .btn-star').removeClass('on');
        $(this).addClass('on');
        $(this).parent().addClass('default');
    });
    // 계좌관리 순서 설정
    if ($('#sort-account').length > 0) {
        $("#sort-account").sortable({axis: 'y'});
        $("#sort-account").disableSelection();
    }

    // checkbox 하나만 선택
    $.fn.checkedOne = function() {
        var wrap = $(this);
        var child =$(wrap).find('.checkbox input[type="checkbox"]');
        $(child).on('change', function () {
            $(child).prop('checked', false);
            $(this).prop('checked', true);
        });
    }
    $('.checked-one').checkedOne();

    // 배너 슬라이드 (HOME)
    $(".home-bn-slide").owlCarousel({
        items: 1,
        smartSpeed: 300,
        autoplay: true,
        loop: true,
    });
})

// fix-layer 있을때 content padding값
function contHeight() {
    var fixTop = $('.fix-layer.top');
    if(fixTop.length > 0) {
        fixTop = $(fixTop).outerHeight();
    }
    
    $('#content').css({
        'padding-top': fixTop + 'px',
    })
}

// 모달팝업 setting 및 이벤트
function modalSet() {
    var modalCont = $('.modal-info .modal-content');
    var modalH = $(window).height() - 60;
    modalH = modalH * -1
    $(modalCont).css('bottom', modalH); // 팝업들 bottom 값 setting
    
    // 내정보 bottom 레이어 열기
    $(".info-chg").click(function () {
        var selectId = $(this).attr("id");
        var optionLayer = "modal-" + selectId;
        var temp = $("#" + optionLayer);
        temp.show();
        $(temp).find('.modal-content').animate({
            bottom: 0
        }, 300);
        $("body").addClass("modal-open"); // 바디 스크롤 제거

        // 바깥영역 클릭 시 팝업 닫힘
        $(temp).on('click', function (e) {
            if (!$('.modal-content').has(e.target).length) {
                modalOut();
            }
        })
        // 팝업내 하단버튼 클릭 시 팝업 닫힘
        $(temp).find('.modal-content button.btn').on('click', function (e) {
            modalOut();
        });

        // bottom modal 닫기
        function modalOut() {
            temp.fadeOut();
            $(temp).find('.modal-content').animate({
                bottom: modalH
            }, 300);
            $("body").removeClass("modal-open");
        }
    });
}

// 충전하기 이벤트
function chargeIpForm() {
    var chargeIp, chargeLi, chargeBtn;
    chargeIp = $('.charge-form .form-type input');
    chargeIp.on({
        'focus': function() {
            chargeLi = $(this).parents('li');
            $(chargeLi).addClass('shw');
            // $(chargeBtn).fadeIn();
        },
        'blur': function () {
            chargeLi = $(this).parents('li');
            if (!$(this).val()) {
                $(chargeLi).removeClass('shw');
            }
            // $(chargeBtn).fadeOut();
        },
    })
}
