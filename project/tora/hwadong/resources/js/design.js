// popup
function layer_close(opt){
	var $body = $("html, body");
    $body.removeAttr("style");
    if(opt == "btm"){
        $(".ly_pop.btm").removeClass("show");
        setTimeout(function(){
            $(".ly_pop.btm").css("z-index",-1).css("visibility","hidden");
        }, 350);
    }else{
        $(".ly_pop").hide();
    }
}
function layer_open(obj){
	var body = $("body"), temp = $("#"+obj);
	body.css("height","100%");
    if(temp.hasClass("btm")){
        temp.addClass("show").css("z-index",99).css("visibility","visible");
        if(!temp.hasClass("nodis")){
            setTimeout(function(){ layer_close("btm"); }, 1000);
        }
    }else{
        temp.show();
    }
}
$(document).ready(function() {
    $(".ly_pop.btm").blur(function(){
        var $obj = $(this).find(".content, .cont-layer"), $height = $obj.outerHeight();
        $(this).css({bottom:-$height}).css("visibility","hidden");
    }).blur();
    // 영역 외 클릭 닫기
	$(".ly_pop").click(function(e){
        if(!$(this).hasClass("full")){
            if(!$(this).find(".content, .cont-layer, header").has(e.target).length) {
                layer_close();
            }
        }
	});
});

// gnb
$(document).ready(function() {
    var $win = $(window).width(), gnb = $("#gnb");
    gnb.css("right",-$win);
    $(".gnb_control").on("click", function(){
        gnb.addClass("show");
    });
    $(".gnb_close").on("click", function(){
        gnb.removeClass("show");
    });
    gnb.find("a[class*='dep']").on("click", function(e){
        e.preventDefault();
        $(this).parent().toggleClass("open");
	});
	if($("#header.type").length > 0){
		gnb.addClass("left");
		gnb.css("right","").css("left",-$win);
	}
});

// swiper set
function swirSet(){
	imgview = new Swiper('#swir-imgview', {
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
		init: false
	});
	imgviewBig = new Swiper('#swir-imgview2', {
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
		init: false
	});
	imgDetail = new Swiper('#swir-imgview3', {
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
		init: false
    });
    auctionSubmain = new Swiper('#aucsbm_swir', {
        initialSlide: 0,
        slidesPerView: 'auto',
        init: false
	});
	mainTopBn = new Swiper('#mainTopBn', {
		init: false,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		}
	});
	productMenu = new Swiper('#productMenu', {
		init: false,
		slidesPerView: 'auto',
		freeMode: true
	});
	names = [];
	$("#productTab .swiper-slide").each(function() {
		names.push($(this).data("name"));
	});
	productTab = new Swiper('#productTab', {
        autoHeight: true,
		pagination: {
			el: '.product_tab_page',
			clickable: true,
			renderBullet: function (index, className) {
				return '<div class="' + className + '">' + (names[index]) + '</div>';
			},
		},
	});
}

// 상품상세 scroll tab
function viewScrollTab(){
    var headerHeight = $('#header').height(),
    wrapFix = $('.wrap-fix'),
    prdDetail = $('.product_detail section'),
    lstTab = $('.tab_basic'),
    lstTabHeight = lstTab.height();
    lstTab.on('click','a',function(e) {
        e.preventDefault();
        var id = $(this).attr("href");
        var scroll = $(id).offset().top-headerHeight-lstTabHeight+1;
        //현재 클릭한 요소 부모의 인덱스
        var nowIndex = $(this).parent().index();
        //현재 on된 요소의 인덱스
        var activeIndex = $(".active").index();
        //Math.abs()는 절대값
        //스피드는 최소 280ms, 최대 600ms
        var speed = Math.abs(nowIndex-activeIndex)*80+200;
        $("html,body").animate({scrollTop:scroll},speed);
        setTimeout(function(){
            lstTab.find("li").removeClass("active");
            $(e.target).parent().addClass("active");
        }, speed+10);
    });

    $(window).scroll(function() {
        var scroll = $(this).scrollTop();//현재 스크롤탑 높이
        var top = wrapFix.offset().top-headerHeight-10;
        if(scroll>=top) {
            wrapFix.find('.tab_basic').addClass('fix');
            wrapFix.find('.tab_basic').css('top',headerHeight);
        }else{
            wrapFix.find('.tab_basic').removeClass('fix');
            wrapFix.find('.tab_basic').css('top','');
            lstTab.find('li:first').addClass('active');
            return;
        }
        prdDetail.each(function(index) {
            //해당요소의 id를 얻어옵니다.
            var id = $(this).attr("id");
            //현재요소의 top
            var now = $(this).offset().top-headerHeight-lstTabHeight;
            var flag = false;//이게 true면 on
            //false면 on제거
            if(index==prdDetail.length-1) {
                //마지막요소이기 때문에 마지막이 없습니다.
                flag = scroll >= now;
            }else {
                //그 다음요소의 top
                var next = prdDetail.eq(index+1).offset().top-headerHeight-lstTabHeight;
                flag = scroll >= now && scroll < next;
            }
            var $menu = $("."+id);
            if(flag) {
                $menu.addClass("active");
            }else {
                $menu.removeClass("active");
            }
		});
    });
}

// 플로팅메뉴 조절
function ipOverlapOff(){
    window_height = $(window).height();
	scrollHeight = $("body").height();
    var btmSpace = $("#footer").height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
	if ((scrollHeight - scrollPosition) <= btmSpace){
		$(".navPrimary").addClass("nf");
	}else{
		$(".navPrimary").removeClass("nf");
    }
}

// 헤더 제품메뉴
$(window).scroll(function() {
    var n = 0;
    if($(".product_page_wrap").length > 0){
        var menu = $(".product_page_wrap"), top = $(".product_local_menu").offset().top - n, dsc = $(".product_dsc");
        var scroll = $(this).scrollTop();
        if(menu.length > 0){
            if(scroll >= top){
                menu.addClass("open");
                dsc.show();
            }else{
                menu.removeClass("open");
                dsc.hide();
            }
        }
    }
}).trigger("scroll");
$(window).load(function() {
	$(".product_tab_page").each(function() {
		var win = $(window).width();
		var t = $(this), tw = 0;
		$('.swiper-pagination-bullet', t).each(function(){
			tw += $(this).outerWidth();
		});
		var sum = tw + t.outerWidth() - (t.width() - 2);
		t.css('width', sum);
		if(win >= sum){
			t.css('width', "");
		}
	});
});

// fn
$(document).ready(function() {

    // fn
    $.fn.extend({
        ipDel: function () {
			$(".ipbox.del input").on("focus keyup", function(e){
				if ($.trim($(this).val()) == "" ) {
					$(this).parent().find(".ip_del").hide();
				}else{
					$(this).parent().find(".ip_del").show();
				}
			});
			$(".ipbox.del input").on("focusout", function(e){
				setTimeout(function(){ $(e.target).parent().find(".ip_del").hide(); }, 250);
			});
			$(".ipbox.del .ip_del").on("click", function(e){
				e.preventDefault();
				$(this).hide().parent().find('input').val('').focus();
			});
        },
        ipDis: function () {
            var input = $(".ipbox input, .ipbox textarea");
            input.blur(function(){
                if($(this).attr("disabled") == "disabled"){
                    $(this).parent().addClass("dis");
                }
            }).blur();
        },
        ipLook: function () {
			$(".ipbox.look input").on("focus keyup", function(){
				if ($.trim($(this).val()) == "" ) {
					$(this).parent().find(".ip_pwlook").hide();
				}else{
					$(this).parent().find(".ip_pwlook").show();
                }
			});
			$(".ipbox.look .ip_pwlook").on("click", function(e){
                e.preventDefault();
                if($(this).parent().find('input').hasClass("secu")){
                    $(this).parent().find('input').removeClass("secu");
                    $(this).parent().find('input').attr("type","text");
                }else{
                    $(this).parent().find('input').addClass("secu");
                    $(this).parent().find('input').attr("type","password");
                }
			});
			$("#wrap").click(function(e){
				if(!$(".ipbox.look").has(e.target).length) {
					$(".ip_pwlook").hide();
				}
			});
        },
        ipDirect: function () {
            $(this).each(function () {
                var opt = $(this).val();
                if (opt == "direct"){
                    $(this).parent().parent().addClass("direct");
                    $(this).parent().prev("input").focus();
                }else{
					$(this).parent().parent().removeClass("direct");
					$(this).parent().prev("input").val("");
                }
            });
        },
        selectSet: function () {
            $('.select select').each(function () {
				var opt = $(this).val();
                if (!opt) $(this).parent().removeClass("selected");
                else $(this).parent().addClass("selected");
			});
        },
        toggleCustom: function () {
			var obj = $(".toggle li.q");
			var objb = $(".toggle button.q");
			var ans = $(".toggle li.a");
			obj.on("click", function(){
				if(!$(this).hasClass("active")){
					obj.removeClass("active");
					ans.removeClass("open");
					ans.filter(":visible").css("display", "none");
					$(this).addClass("active").next("li.a").css("display", "block");
				}else{
					$(this).removeClass("active");
					$(this).next("li.a").css("display", "none");
				}
            });
            objb.on("click", function(){
				if(!$(this).hasClass("active")){
					objb.removeClass("active");
					ans.removeClass("open");
					ans.filter(":visible").css("display", "none");
                    $(this).addClass("active")
                    $(this).parent().parent().next("li.a").css("display", "block");
				}else{
					$(this).removeClass("active");
					$(this).parent().parent().next("li.a").css("display", "none");
				}
			});
		},
		// 모두 선택하기
		allCheck: function (opts) {
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
    });

    $(".ipbox input").ipDis();
    $(".ipbox.del input").ipDel();
    $(".ipbox.look input").ipLook();
    $('.ipbox input').on('focus', function () {
		fb = $(".fix.btm").outerHeight();
		if($(".navbar").hasClass("nf")){
			$(".navbar").css("bottom", -fb);
		}
        $(".navPrimary, .navbar").addClass("nf");
        $(window).bind("scroll resize", function(){
			if($(".navbar").hasClass("nf")){
				$(".navbar").css("bottom", -fb);
			}
            $(".navPrimary, .navbar").addClass("nf");
        });
    });
    $('.ipbox input').on('focusout ', function () {
		$(".navbar").css("bottom", "");
        $(".navPrimary, .navbar").removeClass("nf");
        $(window).bind("scroll resize", function(){
			$(".navbar").css("bottom", "");
            $(".navPrimary, .navbar").removeClass("nf");
            ipOverlapOff();
        });
    });
    $('.ipbox.email select').on('change', function () {
        $(this).ipDirect();
    });
    $(".toggle").toggleCustom();
    $('select').on('change', function () {
		$(".navPrimary, .navbar").addClass("nf");
        $(window).bind("scroll resize", function(){
            $(".navPrimary, .navbar").addClass("nf");
        });
	});
    $('.select select').on('blur change', function () {
		$(this).selectSet();
	}).blur();
	$(".checkbox-all").allCheck();

});

// 고정영역 간격주기
$(window).on("load", function(){
	var fixT = $(".fix.top").outerHeight(), fixB = $(".fix.btm").outerHeight();
	if($(".fix.top").length > 0) $("#wrap").css("padding-top", fixT);
	if($(".fix.btm").length > 0) $("#wrap").css("padding-bottom", fixB);
	if($(".navbar").length > 0){
		$(".navPrimary").css( "bottom", $(".navbar").height() );
	}
});

// 하단 플로팅 버튼 조절
$(window).bind("load scroll resize", function(){
	ipOverlapOff();
}).trigger("scroll resize");

/* btn 슬라이드 */
function btnSlide($this) {
	var $e = $($this);
	if($e.size() == 0) return;

	var slideCont = $e.next();
	function init(){
		if($e.length != 0){
			if($e.hasClass('on') == true){
                $e.removeClass('on');
            }
			slideCont.hide();
			return false;
		}
	}init();

	$e.off().on('click',function() {
		var $this = $(this),
			slideContThis = $this.next();
		if($(this).hasClass('on') == true){
			$this.removeClass('on');
			slideContThis.stop().slideUp(300);
		}else{
			$e.removeClass('on');
			slideCont.stop().slideUp(300);
			$this.addClass('on');
			slideContThis.stop().slideDown(300);
		}
	});
}

/* 주문 갯수 */
function prdAmount(evt){
	var $e = $(evt);
	if($e.size() == 0) return;

	var $btn = $e.find('a');

	$btn.bind('click', function(){
		var prdAmount = $(this).parents('.prd-amount'),
			$input = prdAmount.find('input'),
			$value = $input.val();

		if(prdAmount.hasClass('Sold-Out') == false){

			if($(this).hasClass('btn-minus') && $value != 0){
				$value--;
				$input.val($value);
			}else if($(this).hasClass('btn-plus') && $value >= 0){
				$value++;
				$input.val($value);
			}
		}
	});
};

/* 배송지 선택 */
function choice(evt){
	var $e = $(evt);
	if($e.size() == 0) return;
	$e.bind('click',function(e) {
		$(this).parent('li').toggleClass('on').siblings().removeClass('on');
	});
};

/* common */
$(document).ready(function() {

	$body = $("html, body");

    // top
	$(".topGo").on("click", function(){
		$body.stop().animate({ 'scrollTop': $body.offset().top }, 350);
    });

    // footer cs
    $(".csControl").on("click", function(){
		$(this).toggleClass("open").next(".csarea").toggle();
		$body.scrollTop($(document).height());
    });

	// 하단 플로팅 버튼 있을시 footer 영역 추가
	if($(".navPrimary".length > 0)){
		$("#footer").addClass("navOn");
    }

	// 상품리스트 더보기
	$(".product_tab_top .btn_btm_more").on("click", function(){
		$(this).toggleClass("open");
		$(".product_tab_top").toggleClass("open");
    });

	// filter reset
	$(".filter_reset").on("click", function(){
        var $tar = $(".ly_filter .list_ip_check > li:first-child");
        $tar.find("input").prop({ 'checked': true });
    });

	// wishlist control
	$(".btn_like").on("click", function(){
        var _this = $(this);
        _this.toggleClass('on');
        if(_this.hasClass("on")){
            layer_open('mw-wish');
        }else{
            layer_open('mw-wish2');
        }
    });

	// 소셜미디어 공유
	$(".sns_link_set .btn_sns").on("click", function(){
		$(this).next().addClass('open');
	});
	$(".sns_link_set .btn_x").on("click", function(){
		$(this).parent().removeClass('open');
    });

	// 상품상세 최종금액확인 화살표 누름
	$(".price_set .btn_updw").on("click", function(){
		$(this).toggleClass('on');
		$(this).parent().next().toggle();
    });

    // 상품상세 구매하기 수량 체크 닫기
    $(".ly_price .btn_hide").on("click", function(){
        layer_close("btm");
    });

	// tab
	$(".tab-cont").hide();
	$("ul.tab li:first").addClass("active").show();
	$(".tab-cont:first").show();

	$("ul.tab li").click(function() {

		$("ul.tab li").removeClass("active");
		$(this).addClass("active");
		$(".tab-cont").hide();

		var activeTab = $(this).find("a").attr("href"),
			scrollHeight = $(".tab").scrollTop();
		$(activeTab).show();
		return false;
	});

	btnSlide('.btn-info , .lst-toggle, .sch-more');
	prdAmount('.prd-amount');//주문 갯수 선택
	choice('.lst-place>li>a, .choice');//배송지 선택

});

