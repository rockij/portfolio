//슬라이드 메뉴
$(function(){
	var mn_more = $('.mn_more');
	var menu = $('#menu');
	var close = $('#menu > menu > .close');
	var film = $('#menu > .bgb');

	mn_more.bind({
		click:function(){
			var tg = $(this);
			film.fadeIn();
			menu.stop().animate({left:0});
		}
	});

	close.bind({
		click:function(){
			var tg = $(this);
			film.fadeOut();
			menu.stop().animate({left:-300});
		}
	});

	film.bind({
		click:function(){
			var tg = $(this);
			film.fadeOut();
			menu.stop().animate({left:-300});
		}
	});
});

//리스트 - 탭메뉴
$(function(){
	var ListTab = $('.cate > ul > li');
	ListTab.on('click', function(e){
		var tg = $(this);
		var tc = tg.parent();
		tc.find('> li').removeClass('on');
		tg.addClass('on');
	});
});

//리스트 - 페이징
$(function(){
	var ListTab = $('.pg > span');
	ListTab.on('click', function(e){
		var tg = $(this);
		var tc = tg.parent();
		tc.find('> span').removeClass('on');
		tg.addClass('on');
	});
});

//매물검색 - Tab
$(function(){
	var ListTab = $('.sc_tab > ul > li');
	ListTab.on('click', function(e){
		var tg = $(this);
		var tc = tg.parent();
		tc.find('> li').removeClass('on');
		tg.addClass('on');
	});
});

//매물검색 - 상세조건
$(function(){
	var sc_de = $('#SearchDetail');
	var DetailBt = $('#SearchDetail');

	sc_de.bind({
		click:function(){
			var tg = $(this);
			var tc = tg.parent().parent();
			tc.find('> #SearchDetailC').animate({height:"toggle"}, 350);
		}
	});

	DetailBt.on('click', function(e){
		if ($(this).hasClass('scdt')) {
			$(this).removeClass('scdt').addClass('scdt_on');
		}
		else if ($(this).hasClass('scdt_on')) {
			$(this).removeClass('scdt_on').addClass('scdt');
		}
	});
});

//radio checkbox custom
function setupLabel() {
	if ($(".label_check input").length) {
		$(".label_check").each(function(){
			$(this).removeClass("c_on");
			$(this).removeClass("c_dsb");
		});
		$(".label_check input:checked").each(function(){
			$(this).parent("label").addClass("c_on");
		});
		$(".label_check input:disabled").each(function(){
			$(this).parent("label").addClass("c_dsb");
		});
	};
	if ($(".label_radio input").length) {
		$(".label_radio").each(function(){
			$(this).removeClass("r_on");
		});
		$(".label_radio input:checked").each(function(){
			$(this).parent("label").addClass("r_on");
		});
		$(".label_radio input:disabled").each(function(){
			$(this).parent("label").addClass("r_dsb");
		});
	};
};

//체크박스 단일 선택
function setupLabel3(vObj) {
	if ($(vObj).is(":checked")) {
		//$(vObj).attr("checked", true);
		$(vObj).prop("checked", true);
		$($(vObj).parent("label")).addClass("c_on");
	}
	else {
		$($(vObj)).removeAttr("checked");
		$($(vObj).parent("label")).removeClass("c_on");
	}
};

function setupLabelTouch(){
	$(".check .label_check input").bind("click", function () {
		setupLabel3($(this));
    });
    $(".label_check input").bind("click", function () {
        setupLabel();
    });
    $(".check .label_radio input").bind("click", function () {
        setupLabel3($(this));
    });
    $(".label_radio input").bind("click", function () {
        setupLabel();
    });
	setupLabel();
};

$(function(){
	setupLabelTouch(); //radio, checkbox 이미지화 실행
});

//매물상세정보 - 공유
$(function(){
	var dt_share = $('.dt_ico_share');
	var dt_shareBt = $('.dt_ico_share');
	dt_share.bind({
		click:function(){
			var tg = $(this);
			var tc = tg.parent().parent().parent();
			tc.find('> .dtshare').animate({height:"toggle"}, 350);
		}
	});
	dt_shareBt.on('click', function(e){
		if ($(this).hasClass('dt_ico_share')) {
			$(this).removeClass('dt_ico_share').addClass('dt_ico_share_on');
		}
		else if ($(this).hasClass('dt_ico_share_on')) {
			$(this).removeClass('dt_ico_share_on').addClass('dt_ico_share');
		}
	});
});

//매물상세정보 - 탭
$(function () {
    var DtTab = $('.site_tab > ul > li');
    var DtContent = $('.site_contb > .site_cont');
    DtTab.on('click', function (e) {
        e.preventDefault();

        var tg = $(this);
        var tc = tg.parent();
        tc.find('> li').removeClass('on');
        tg.addClass('on');

        i = tg.index();
        
        DtContent.css('display', 'none');
        DtContent.eq(i).css('display', 'block');

        fn_MapAround(i);

        //$('#touchSlider2').resize();

        //var TsTg = $('#touchSlider2 > ul > li > ul.list');
        //var TsTc = TsTg.parent().parent().parent().parent();
        //var TsHeight = TsTg.outerHeight();
        //TsTc.find('#touchSlider2').height(TsHeight);
    });
});


//매물상세정보 - 광고닫기
$(function(){
	var AdClose = $('.ad_box > .ad_close');
	AdClose.on('click', function(e){
		var tg = $(this);
		var tc = tg.parent();
		tc.hide();
	});
});

//공지사항 - 텍스트 크게 & 작게
$(function () {
	$('.nt_view_top > .fr > .btg').bind("touchmove click", function () {
		$('.nt_view_cont').toggleClass('big');
		if($('.nt_view_cont').hasClass('big')){
			$('.nt_view_top > .fr > .btg > .txt').text('작게');
			$('.nt_view_top > .fr > .btg > .ntbg').removeClass('plus_ico');
			$('.nt_view_top > .fr > .btg > .ntbg').addClass('minus_ico');
		}else{
			$('.nt_view_top > .fr > .btg > .txt').text('크게');
			$('.nt_view_top > .fr > .btg > .ntbg').removeClass('minus_ico');
			$('.nt_view_top > .fr > .btg > .ntbg').addClass('plus_ico');
		}
		return false;
	});
});

//지역선택 - IScroll
function loaded() {
	//iScroll 개체 중복 출력으로 인한 에러 제거위해 추가
	var scrollCheck = $(".iScrollVerticalScrollbar.iScrollLoneScrollbar").html();
	if (scrollCheck != "" && scrollCheck != "undefined" ) {
		$('.iScrollVerticalScrollbar.iScrollLoneScrollbar').remove();
	}

    myScroll = new IScroll('.cho_wrap', {
        scrollbars: true,
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true
    });
}

//지역선택 - Layer Popup
function layer_open(obj){
	var temp = $('#'+obj);
	var bg = temp.parent().find(".bg").hasClass('bg');

	if(bg){
		temp.parent().fadeIn();
	}
		$('body').bind('touchmove', function(e){e.preventDefault()});
		loaded();
	if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
		else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
		else temp.css('left', '0px');

	temp.find('.pop_close').click(function(e){
		if(bg){
			$('.pop_box').fadeOut();
		}
		e.preventDefault();
		$('body').unbind('touchmove');
	});

	$('.pop_box .bg').click(function(e){
		$('.pop_box').fadeOut();
		e.preventDefault();
		$('body').unbind('touchmove');
	});
}

//맞춤정보 설정 - 학교 선택 Focus
$(function(){
  $("#autocomplete-dynamic").click(function() {
        $('html, body').animate({scrollTop: $('.main_sc_area').offset().top}, 'speed');
    });
});

//메인 - 프리미엄매물
$(function(){
	var Pre_Tab = $('.premium_tab > ul > li');
	var Pre_Cont = $('.premium_conts > .premium_cont');
	Pre_Tab.on('click', function(e){
		e.preventDefault();
		
		var tg = $(this);
		var tc = tg; 
		
		Pre_Tab.removeClass('on');
		
		tc.addClass('on');
		
		i = tg.index();
		
		Pre_Cont.css('display', 'none');
		Pre_Cont.eq(i).css('display', 'block');
	});
});

//Layer Popup
/*function layer_open(obj) {
  var temp = $('#' + obj);
  var bg = temp.parent().parent().find(".bg").hasClass('bg');

  if (bg) {
    temp.parent().parent().show();
    $('body').css('overflow', 'hidden');
  }

  temp.find('.ly_pop_cls').click(function (e) {
    if (bg) {
      $('.ly_pop').hide();
      $('body').css('overflow-y', 'auto');
    }
  });
}*/

//detail - 매물위치
$(function(){
	var PointTab = $('.ly_pop .cont .element .point .point_tab ul li');
	var PointCont = $('.ly_pop .cont .element .point .point_cont .elem');
	PointTab.on('click', function(e){
		var tg = $(this);
		var tc = tg; 
		
		PointTab.removeClass('active');
		
		tc.addClass('active');
		
		i = tg.index();
		
		PointCont.css('display', 'none');
		PointCont.eq(i).css('display', 'block');
	});
});

//detail - 주변정보
$(function(){
	var PositionTab = $('.position ul li');
	PositionTab.on('click', function(e){
		var tg = $(this);
		var tc = tg; 
		
		PositionTab.removeClass('active');
		tc.addClass('active');
	});
});