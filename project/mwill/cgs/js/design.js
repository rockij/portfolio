//(모바일)Slide Menu
$(function(){
  var MFBt = $('.lnb .inner .m_sch_area .m_sch_bt3');
  var MFCont = $('#Navi1');
  var MFFilm = $('#Navi1 .back');
  var MFFilm2 = $('#Navi1 .back .bg2');
  var MFClose = $('#Navi1 .close');

  MFBt.on('click', function(e){
    var tg = $(this);
    MFFilm.fadeIn();
    MFFilm2.stop().animate({ right: 0 });
    MFCont.stop().animate({ right: 0 }).show();
  });

  MFFilm.on('click', function(e){
    var tg = $(this);
    MFFilm.fadeOut();
    MFFilm2.stop().animate({ right: -291 });
    MFCont.stop().animate({ right: -291 });

    setTimeout(function(){ MFCont.hide() }, 500);
  });

  MFClose.on('click', function(e){
    var tg = $(this);
    MFFilm.fadeOut();
    MFFilm2.stop().animate({ right: -291 });
    MFCont.stop().animate({ right: -291 });

    setTimeout(function(){ MFCont.hide() }, 500);
  });
});

//(모바일)검색
$(function(){
  var SearchBt = $('.lnb .inner .m_sch_area .m_sch_bt2');
  var SearchLayer = $('.lnb .inner .sch_cont');

  SearchBt.on('click', function(e){
    var tg = $(this);
    tg.toggleClass('close');
    SearchLayer.slideToggle('fast');
  });
});

//Snb
$(function(){
  var SnbTab = $('.snb .inner ul.step1 li');
  var SnbTabSpe = $('.snb .inner ul.step1 li:gt(2)');
  var SnbCont = $('.snb .snb_menu_list div');

  SnbCont.hide();

  SnbTab.on('click', function(e){
    e.preventDefault();

    var tg = $(this);
    i = tg.index();

    var SnbContHeight = SnbCont.eq(i).outerHeight();

    if (!$(this).hasClass('on')) {
      SnbTab.removeClass('on');
      SnbCont.filter(':visible').css('display', 'none');
      SnbTab.css('margin-top', 0);

      $(this).addClass('on').parent().parent().parent().find('.snb_menu_list div').eq(i).css('display', 'block');
      SnbTabSpe.css('margin-top', SnbContHeight);
    } else {
      $(this).removeClass('on');
      $(this).parent().parent().parent().find('.snb_menu_list div').eq(i).css('display', 'none');
      SnbTab.css('margin-top', 0);
    }

    if (SnbTabSpe.hasClass('on')) {
      SnbTab.css('margin-top', 0);
    } else { }
  });
});

//(모바일)파인드올 이용가이드
$(window).load(function(){

//    이미지 높이 계산
//    $(function(){
//        var GuideUl = $('#GuideList ul');
//        var GuideLi = $('#GuideList ul li');
//        var GuideLiS = GuideLi.outerHeight();
//
//        GuideUl.height(GuideLiS);
//
//        var GuideImg = $('#GuideList ul li .img');
//        var GuideImgS = GuideImg.outerHeight();
//        var GuideArrow = $('.guide_wrap .inner .el .list_b .guide_bt_area');
//
//        GuideArrow.height(GuideImgS);
//
//        var addEvent = window.attachEvent || window.addEventListener;
//        addEvent("resize", function(){
//            var GuideLiNew = GuideLi.resize();
//            var GuideLiSNew = GuideLiNew.outerHeight();
//
//            GuideUl.height(GuideLiSNew);
//
//            var GuideImgNew = GuideImg.resize();
//            var GuideImgSNew = GuideImgNew.outerHeight();
//
//            GuideArrow.height(GuideImgSNew);
//        }, false);
//    });

    $(function(){
        var GuideLi = $('#GuideList ul li');
        var GuideBt = $('.guide_wrap .inner .el .list_b .current ul li');
        var GuideprevBtn = $('.guide_wrap .inner .list_b .guide_bt_area .bt_prev');
        var GuidenextBtn = $('.guide_wrap .inner .list_b .guide_bt_area .bt_next');

        move();
        function move(){
            GuideLi.each(function(){
                if ($(this).css('left') == '0px') {
                    var i = $(this).index();

                    GuideBt.removeClass('on');
                    GuideBt.eq(i).addClass('on');
                }
            });
        }

        GuideprevBtn.click(function(){
            setTimeout(function(){
                move();
            }, 150);
        });

        GuidenextBtn.click(function(){
            setTimeout(function(){
                move();
            }, 150);
        });

        GuideLi.bind('touchmove', function(){
            setTimeout(function(){
                move();
            }, 150);
        });

        var addEvent = window.attachEvent || window.addEventListener;
        addEvent("resize", function(){
            GuideBt.removeClass('on');
            GuideBt.eq(0).addClass('on');

            GuideprevBtn.click(function(){
                setTimeout(function(){
                    move();
                }, 150);
            });

            GuidenextBtn.click(function(){
                setTimeout(function(){
                    move();
                }, 150);
            });

            GuideLi.bind('touchmove', function(){
                setTimeout(function(){
                    move();
                }, 150);
            });
        }, false);
    });
});

//My FindAll
$(function(){
  var MyInfo = $('.lnb .inner .minfo_area .minfo_bt1');
  var MyInfoLayer = $('.minfo_layer');

  MyInfo.on('click', function(e){
    MyInfoLayer.slideToggle('fast');
  });

	$(document).mousedown(function(e){
		$('.minfo_layer').each(function(){
			if ($(this).css('display') == 'block') {
				var l_position = $(this).offset();
				l_position.right = parseInt(l_position.left) + ($(this).width());
				l_position.bottom = parseInt(l_position.top) + parseInt($(this).height());
				if ((l_position.left <= e.pageX && e.pageX <= l_position.right)
					&& (l_position.top <= e.pageY && e.pageY <= l_position.bottom)) {
				} else {
					$(this).css('display', 'none');
				}
			}
		});
	});
});

//상세검색 배경
$(function(){
  var Wrap = $('#Wrap');
  var WrapHeight = Wrap.outerHeight();
  var SubL = $('#SubWrap .sub_l');

  SubL.height(WrapHeight);
});

//(모바일)상세검색 창
$(function(){
  var DetailBt = $('.detail_box .sch_bt');
  var DetailCont = $('#Navi2');
  var DetailFilm = $('#Navi2 .back');
  var DetailFilm2 = $('#Navi2 .back .bg2');
  var DetailClose = $('#Navi2 .close');

  DetailBt.on('click', function(e){
    var tg = $(this);
    DetailFilm.fadeIn();
    DetailFilm2.stop().animate({ left: 0 });
    DetailCont.stop().animate({ left: 0 }).show();
  });

  DetailFilm.on('click', function(e){
    var tg = $(this);
    DetailFilm.fadeOut();
    DetailFilm2.stop().animate({ left: -291 });
    DetailCont.stop().animate({ left: -291 });

    setTimeout(function(){ DetailCont.hide() }, 500);
  });

  DetailClose.on('click', function(e){
    var tg = $(this);
    DetailFilm.fadeOut();
    DetailFilm2.stop().animate({ left: -291 });
    DetailCont.stop().animate({ left: -291 });

    setTimeout(function(){ DetailCont.hide() }, 500);
  });
});

//상세정보 - 기본정보
$(function(){
    $(".detail_tbl ul li:nth-child(even)").addClass("even");
    $(".detail_tbl ul li:nth-child(odd)").addClass("odd");
});

//(모바일)상세검색 - 화살표
$(function(){
  var DetailA = $('.navi2 ul.step1 li');
  var DetailC = $('.navi2 ul.step1 li div.step2');

  DetailA.on('click', function(e){
    var tg = $(this);

    if (!$(this).hasClass('on')) {
      DetailA.removeClass('on');
      DetailC.filter(':visible').css('display', 'none');
      tg.addClass('on').find('div.step2').css('display', 'block');
    } else {
      tg.removeClass('on');
      tg.find('div.step2').css('display', 'none');
    }
  });

  var DetailIcon = $('.navi2 nav ul.step1 li div.step2 ul li');
  var DetailIconA = $('.navi2 nav ul.step1 li div.step2 ul li.active a');

  if (DetailIcon.hasClass('active')) {
    DetailIconA.after().append("<span class='bg_list'></span>");
  } else {
  }
});

//썸네일 이미지들
$(function () {
  var TempListPht = $('.pht');
  var TempListPhtN = $('.pht .pht_num');

  TempListPhtN.mouseover(function () {
    var tg = $(this);

    // 이미지 로딩
    if (tg.parent().find('.pht_photos').css('display') == 'none') {
      var nLineAdNo = tg.parent().attr('LineAdNo');
      var nGroupCd  = tg.parent().attr('GroupCd');

      var imgResult;

      $.ajax({
        type: "POST",
        url: "/js/ajax/sub_eximage.asp",
        data: { LineAdNo: nLineAdNo, GroupCd: nGroupCd },
        dataType: 'html',
        async: false,         // Ajax 통신 끝날때까지 타 함수 실행 안되는 옵션
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (result) {
          imgResult = result;
        }
      });

      tg.parent().find('.pht_photos ul').html(imgResult);
    }

    var el = tg.parent().find('.pht_photos ul li');
    var TempListPhtUX = el.length;
    var TempListPhtUW = el.outerWidth(true) * TempListPhtUX;

    tg.parent().find('.pht_photos').stop().animate({ width: TempListPhtUW }, 'fast').css('display', 'block');
  }).mouseout(function () {
    var tg = $(this);

    tg.parent().find('.pht_photos').stop().animate({ width: 0 }, 500);
    setTimeout(function () { tg.find('.pht_photos').css('display', 'none') }, 500);
  })
});

//(모바일)상세정보 - 중고차 정보이용 시 주의사항 및 책임 한계
$(function(){
    var DetailSubj = $('.detail_nb .subj .plus_ico');

    DetailSubj.on('click', function(){
        var tg = $(this);
        tg.toggleClass('minus_ico');
        tg.parent().parent().find('.cont').toggle();
    });
});

//댓글
$(function(){
  var ReplyBt = $('.reply_area .answer_bt');
  var ReplyCont = $('.reply_area ul');

  ReplyBt.on('click', function(e){
    var tg = $(this);

    if (!$(this).hasClass('active')) {
      ReplyBt.removeClass('active');
      ReplyCont.filter(':visible').css('display', 'none');
      tg.addClass('active').parent().nextUntil('.reply_root').css('display', 'block');
    } else {
      tg.removeClass('active');
      tg.parent().nextUntil('.reply_root').css('display', 'none');
    }
  });
});

//상세보기 Tab
$(function(){
  var DetailTab = $('.detail_tab ul li');
  var DetailTabC = $('.detail_cont .cont');

  DetailTab.on('click', function(e){
    var tg = $(this);
    var tc = tg.find('> button');

    DetailTab.find('> button').removeClass('on');

    tc.addClass('on');

    i = tg.index();

    DetailTabC.css('z-index', '1');
    DetailTabC.eq(i).css('z-index', '8');
  });
});

//Layer Popup
function layer_open(obj) {
    var temp = $('#' + obj);
    var bg = temp.parent().parent().find(".bg").hasClass('bg');

    if(bg) {
        $('html, body').css('overflow-y','hidden');
        temp.parent().parent().show();
        temp.parent().css('overflow-y','auto');
    }

    temp.find('.ly_pop_cls').click(function(e){
        if(bg) {
            $('html, body, .ly_pop, .cont').removeAttr('style');
        }
        e.preventDefault();
    });

    temp.find('.ly_pop_cls_bt').click(function(e){
        if(bg) {
            $('html, body, .ly_pop, .cont').removeAttr('style');
        }
        e.preventDefault();
    });
}

//라디오 버튼, 체크박스 이미지화
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

function setupLabelTouch() {
  $(".label_check input").bind("click", function(){
    setupLabel3($(this));
  });
  $(".label_check input").bind("click", function(){
    setupLabel();
  });
  $(".label_radio input").bind("click", function(){
    setupLabel3($(this));
  });
  $(".label_radio input").bind("click", function(){
    setupLabel();
  });
  setupLabel();
};

$(function(){
  setupLabelTouch();
});

//이미지 rollover
$(function(){
  var TempPhotoImg = $('.temp_photo ul li');

  TempPhotoImg.mouseenter(function(){
	$(this).find('.temp_photo_img').after().append("<div class='over'></div>");
  }).mouseleave(function(e){
	$(this).find('.over').remove();
  });
});

//이전 등록내역 불러오기
$(function(){
    var CallBack_Bt = $('.call_back_bt');
    var CallBack_Cont = $('.temp_tbl.reg_prev');
    var CallBack_Close = $('.reg_prev_close');

    CallBack_Bt.on('click', function(e){
        CallBack_Cont.slideToggle('fast');
    });

    CallBack_Close.on('click', function(e){
        CallBack_Cont.slideToggle('fast');
    });
});

//(모바일)주의사항
$(function(){
    var CertiBt = $('.certi_bt');

    CertiBt.on('click', function(e){
        var tg = $(this);
        tg.parent().parent().parent().parent().parent('.ly_pop').hide();
    });
});

//결제완료 Tooltip
$(function(){
    var PayedBt = $('.state_b');
    var PayedTt = $('.payed_tt');
    var PayedClose = $('.bt_tt_close');

    PayedBt.on('click', function(){
        var tg = $(this);
        PayedTt.css('display','none');
        tg.next().show();
    });

    PayedClose.on('click', function(){
        var tg = $(this);
        tg.parent().hide();
    });
});