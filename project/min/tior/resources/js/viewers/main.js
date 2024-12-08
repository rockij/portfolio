// 메인 스크롤
function mainScrollHandler() {
    $('.mainTime .ico_search').css({
        'right': 22 + 'px'
    })
    $(window).on('scroll', function () {
        var viewTop = $(this).scrollTop();
        if (viewTop > $('.mainTime h3').position().top) {
            $('.mainTime .ico_search').addClass('fix');
            $('.mainTime .ico_search').css({
                'right': $('#content').position().left + 22
            })
        } else {
            $('.mainTime .ico_search').removeClass('fix');
            $('.mainTime .ico_search').css({
                'right': 22 + 'px'
            })
        }
    })
}

// 메인 실시간시승예약 더보기
function seeMoreCarCompany(tabName) {
    var brandTab = $('#mainTabSlide .' + tabName);
    var tabMore = $(brandTab).find('.more');
    
    $(tabMore).slideToggle();
    return $(brandTab).hasClass('seeMore') ? $(brandTab).removeClass('seeMore') : $(brandTab).addClass('seeMore')
}

// 메인배너 swiper
function mainSwir() {
    var mainBn = new Swiper('#mainBn', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>'
            }
        },
        loop: true,
        setWrapperSize: true,
        spaceBetween: 7.5,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });
    var tabSlide = new Swiper('#tabSlide', {
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        setWrapperSize: true,
        slidesPerView: "auto",
    });
    // var mainTab = new Swiper('#mainTabSlide', {
    //     setWrapperSize: true,
    //     slidesPerView: 1,
    //     thumbs: {
    //         swiper: tabSlide
    //     },
    //     on: {
    //         slideChange: function () {
    //             var beforeIdx = mainTab.previousIndex;
    //             var beforeSlide = mainTab.slides[beforeIdx];
                
    //             if($(beforeSlide).hasClass('seeMore')) {
    //                 $(beforeSlide).removeClass('seeMore');
    //                 $(beforeSlide).find('.more').slideToggle();
    //             }
    //         }
    //     }
    // })
    var footBn = new Swiper('#footBn', {
        loop: true,
        setWrapperSize: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });
    var options = {
        centeredSlides: true,
        setWrapperSize: true,
    };
    if($("#mainRecSales .swiper-slide").length == 1) {
        options.loop = false
    } else {
        options.loop = true
        options.autoplay = {
            delay: 5000,
            disableOnInteraction: false,
        }
        options.pagination = {
            el: '.swiper-pagination',
        }
    }
    var salesBn = new Swiper('#mainRecSales', options)
}

// 검색 검색결과 탭 show,hide
function chgSearchTabHandler(input) {
    var value = input.value;
    $('.searchWrap').removeClass('show');
    if (value !== "") {
        $('.searchKeyword').addClass('show');
    } else $('.searchDefault').addClass('show');
}