/****************** 광고 불러오기 ******************/
function SetLoadAd(vLineAdNo) {
  location.href = "Regist_Step2.asp?LineAdNo=" + vLineAdNo;
}

/****************** 임시저장 ******************/
function SetTempSave() {
  var f = document.AdRegForm;

  $("#hidTempSaveF").val("1");

  f.target    = "F_ACTION";
  f.method    = "post";
  f.encoding  = "multipart/form-data";
  f.action    = "/include/regist/TempSaveProc.asp";
  f.submit();
  /*
  $.ajax({ url: '/include/regist/TempSaveProc.asp',
           type: 'POST',
           data: $("#AdRegForm").serialize(),
           dataType: 'text',
           async: false,         // Ajax 통신 끝날때까지 타 함수 실행 안되는 옵션
           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',   // 인코딩 방식
           success: function (data) {                                          // 응답결과를 뿌려준다.
             //$("#datatable").html(data);
             alert(data);
           }
           ,error : function(errMsg,a,b) {                                        // 에러시 alert 창으로 에러 알림
             alert("에러:" + b);
           }
         });
  */
}

/****************** 딜러/업체정보 수정하기 ******************/
function ModCompanyInfo() {
  var f = document.frmDealer;

  var FieldNm = $("#hidDealerAddressNm").val();

  if ($("#hidScode").val() == "S104") {         // 자동차 딜러정보
    if ($("#txtManageNumber").val().length == 0) {
      alert("[사원증번호]를 입력해 주세요."); $("#txtManageNumber").focus(); return;
    }
  }

  if ($("#selCity").val().length == 0) {
    alert("[" + FieldNm + "]을 선택해 주세요."); $("#selCity").focus(); return;
  }
  if ($("#selGu").val().length == 0) {
    alert("[" + FieldNm + "]을 빠짐없이 선택해 주세요."); $("#selGu").focus(); return;
  }
  if ($("#selDong").val().length == 0) {
    alert("[" + FieldNm + "]을 선택해 주세요."); $("#selDong").focus(); return;
  }

  f.method = "post";
  f.action = "BizInfo_ModProc.asp";
  f.encoding = "multipart/form-data";
  f.submit();
}

/****************** 캘린더 ******************/
function fnPopUpCalendar(idx) {
  $.datepicker.regional['ko'] = { closeText: '닫기', prevText: '이전달', nextText: '다음달', currentText: '오늘', monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], dayNames: ['일', '월', '화', '수', '목', '금', '토'], dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'], dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], weekHeader: 'Wk', dateFormat: 'yy-mm-dd', firstDay: 0, isRTL: false, duration: 200, showAnim: 'show', showMonthAfterYear: true, yearSuffix: '년' }; $.datepicker.setDefaults($.datepicker.regional['ko']);
  /* jquery.ui.datepicker 옵션설정하기 , 자세한 옵션은 API문서 참고.*/
  $(idx).datepicker({
    showOn: "button", //이미지로 사용 , both : 엘리먼트와 이미지 동시사용
    buttonImage: "http://image.findall.co.kr/FAImage/job/advertiser/btn/btn_calendar.gif", //버튼으로 사용할 이미지 경로
    buttonImageOnly: true, //이미지만 보이기
    onSelect: function (date) {
      if (idx == "#txtRecuitEndDate") {
        changeStartDate();
      }
    }
  });
  //datepicker에서 사용한 이미지 버튼 style적용
  $("img.ui-datepicker-trigger").attr("style", "margin-left:5px; vertical-align:middle; cursor:pointer;");
}

/****************** 이미지업로드 ******************/
$("#fileimg").change(function () {
  var f = document.AdRegForm;
  var imgLimit = $("#hidImgLimit").val();

  $("#tmpfilenm").val($("#fileimg").val());
  if ($("#photolist li").length >= imgLimit) {
    alert("이미지 첨부는 최대 " + imgLimit + "개 까지 가능합니다.");
    $("#fileimg").replaceWith($("#fileimg").clone(true));
    $("#tmpfilenm").val("");
    $("#fileimg").val("");
    return;
  }

  f.target = "F_ACTION";
  f.method = "post";
  f.encoding = "multipart/form-data";
  f.action = "/include/regist/ImageUploadProc.asp";
  try {
    f.submit();
  } catch (e) {
    alert("이미지 등록이 불가한 플랫폼 입니다.");
    return;
  }

  $("#fileimg").replaceWith($("#fileimg").clone(true));
  f.target = "";
});

/****************** 이미지삭제 ******************/
function delImg(obj) {
  idx = $("#photolist").children("li").index($(obj).parent().parent())

  $("#photolist").children("li").eq(idx).remove();
  $("#filelist").children("input").eq(idx).remove();

  $("#RegImageCnt").text($("#photolist li").length);
}

/****************** 추가이미지 노출 ******************/
function addPhotoList(filename) {
  $("#photolist").append("<li><div class='thum_img'><img src='" + filename + "'><button type='button' class='bg_reg reg_thum_del_bt' onclick='delImg(this,$(this).parent().index(this));return false;'></button></div></li>");

  $("#photolist").append("");
  $("#fileimg").val("");
  $("#filelist").append("<input type='hidden' name='files' value='" + filename + "'>")
  $("#tmpfilenm").val("");

  $("#RegImageCnt").text($("#photolist li").length);
}

/****************** 차량정보: 색상 ******************/
function SetCarColor() {
  $("#txtColor").val($("#sltColor").val());
}

/****************** 옵션 선택시 결제상품정보 셋팅 ******************/
function FnClickOpt(vObj) {

  // 다량등록권 체크 해제
  $(':radio[name="rdoFATCode"]:checked').prop("checked", false);

  var OptCode = vObj.value;
  var intOptTerm = $("#OptInfo_OptTerm" + OptCode).val();
  var PubTerm;

  // 날짜 표기
  var TodayYear, TodayMonth, TodayDay;
  var EndYear, EndMonth, EndDay;

  var Today = new Date();
  var EndDate = new Date(Date.parse(Today) + intOptTerm * 1000 * 60 * 60 * 24);

  TodayYear = Today.getFullYear();

  if (Today.getMonth() < 10) {
    TodayMonth = '0' + (Today.getMonth() + 1);
  } else {
    TodayMonth = Today.getMonth() + 1;
  }
  if (Today.getDate() < 10) {
    TodayDay = '0' + Today.getDate();
  } else {
    TodayDay = Today.getDate();
  }

  // 게재종료일자
  EndYear = EndDate.getFullYear();

  if (EndDate.getMonth() < 10) {
    EndMonth = '0' + (EndDate.getMonth() + 1);
  } else {
    EndMonth = EndDate.getMonth() + 1;
  }
  if (EndDate.getDate() < 10) {
    EndDay = '0' + EndDate.getDate();
  } else {
    EndDay = EndDate.getDate();
  }

  // 중고거래, 무료등록 이라면
  if ($("#hidGroupCd").val() == 10 && $(':radio[name="rdoOptCode"]:checked').val() == 0) {
    PubTerm = TodayYear + "/" + TodayMonth + "/" + TodayDay + " ~ " + "종료 시 까지";
  } else {
    PubTerm = TodayYear + "/" + TodayMonth + "/" + TodayDay + " ~ " + EndYear + "/" + EndMonth + "/" + EndDay + " (" + intOptTerm + "일)";
  }

  // 결제상품 셋팅
  $("#PayInfo_OptName").text($("#OptInfo_Name" + OptCode).text());
  $("#PayInfo_OptTerm").text(PubTerm);
  $("#PayInfo_Desc").text($("#OptInfo_Desc" + OptCode).text());
  $("#PayInfo_Price").text($("#OptInfo_Price" + OptCode).text());
}

/****************** 다량등록권 선택시 결제상품정보 셋팅 ******************/
function FnClickOptFAT(vObj) {

  // 옵션 체크 해제
  $(':radio[name="rdoOptCode"]:checked').prop("checked", false);

  var OptCode = vObj.value;
  var intOptTerm = $("#OptInfo_FATTerm" + OptCode).val();
  var PubTerm;

  // 날짜 표기
  var TodayYear, TodayMonth, TodayDay;
  var EndYear, EndMonth, EndDay;

  var Today = new Date();
  var EndDate = new Date(Date.parse(Today) + intOptTerm * 1000 * 60 * 60 * 24);

  TodayYear = Today.getFullYear();

  if (Today.getMonth() < 10) {
    TodayMonth = '0' + (Today.getMonth() + 1);
  } else {
    TodayMonth = Today.getMonth() + 1;
  }
  if (Today.getDate() < 10) {
    TodayDay = '0' + Today.getDate();
  } else {
    TodayDay = Today.getDate();
  }

  // 게재종료일자
  EndYear = EndDate.getFullYear();

  if (EndDate.getMonth() < 10) {
    EndMonth = '0' + (EndDate.getMonth() + 1);
  } else {
    EndMonth = EndDate.getMonth() + 1;
  }
  if (EndDate.getDate() < 10) {
    EndDay = '0' + EndDate.getDate();
  } else {
    EndDay = EndDate.getDate();
  }

  PubTerm = TodayYear + "/" + TodayMonth + "/" + TodayDay + "~" + EndYear + "/" + EndMonth + "/" + EndDay + " (" + intOptTerm + "일)";

  // 결제상품 셋팅
  $("#PayInfo_OptName").text($("#FATInfo_Name" + OptCode).text());
  $("#PayInfo_OptTerm").text(PubTerm);
  $("#PayInfo_Desc").text($("#FATInfo_Desc" + OptCode).text());
  //$("#PayInfo_Price").text($("#FATInfo_Price" + OptCode).text());
  $("#PayInfo_Price").text("0원");

}

/****************** Validation 체크 ******************/
function formValidation() {
  var FormCode = $("#hidFormCode").val();         // 분류별 폼코드
  var GroupCd = $("#hidGroupCd").val();           // 섹션코드

  /*********** 자동차 ***********/
  if (GroupCd == 12) {   // 자동차

    // 분류별 Validation
    if (FormCode == 10 || FormCode == 11) {    // 자동차 판매 / 오토바이 판매
      // 차량번호
      if (FormCode == 10 && $("#txtCarNumber").val().length == 0) { alert("차량번호를 입력해 주세요."); $("#txtCarNumber").focus(); return false; }
      if (!chkCarNo($("#txtCarNumber").val())) {  alert("정상적인 차량번호가 아닙니다.\n차량번호를 확인해주세요."); $("#txtCarNumber").focus(); return false; }
      // 판매가격
      if ($("#txtSalePrice").val().length == 0) { alert("판매가격을 입력해 주세요."); $("#txtSalePrice").focus(); return false; }
      // 차량명/제조사/모델
      if ($("#txtMaker").val().length == 0) { alert("제조사를 입력해 주세요."); $("#txtMaker").focus(); return false; }
      if ($("#txtModel").val().length == 0) { alert("모델명을 입력해 주세요."); $("#txtModel").focus(); return false; }
      if (FormCode == 10 && $("#txtClass").val().length == 0) { alert("등급을 입력해 주세요."); $("#txtClass").focus(); return false; }
      // 연식
      if ($("#sltMakeYear").val().length == 0) { alert("연식을 입력해 주세요."); $("#sltMakeYear").focus(); return false; }
      // 월식
      if ($("#sltMakeMonth").val().length == 0) { alert("월식을 입력해 주세요."); $("#sltMakeMonth").focus(); return false; }
      // 변속기
      if (!$(':radio[name="rdoTransMission"]:checked').is(":checked")) { alert("변속기를 선택해 주세요."); $("#divTransMission").focus(); return false; }
      // 연료
      if (!$(':radio[name="rdoFuel"]:checked').is(":checked")) { alert("연료를 선택해 주세요."); $("#divFuel").focus(); return false; }
      // 배기량
      if ($("#txtDisplacement").val().length == 0) { alert("배기량을 입력해 주세요."); $("#txtDisplacement").focus(); return false; }
      // 주행거리
      if ($("#txtMileage").val().length == 0) { alert("주행거리를 입력해 주세요."); $("#txtMileage").focus(); return false; }
      // 색상
      if ($("#txtColor").val().length == 0) { alert("색상을 입력해 주세요."); $("#txtColor").focus(); return false; }
      // 사고여부
      if (!$(':radio[name="rdoAccident"]:checked').is(":checked")) { alert("사고여부를 선택해 주세요."); $("#divAccident").focus(); return false; }
      // 판매구분
      if (!$(':radio[name="rdoSaleKind"]:checked').is(":checked")) { alert("판매구분을 선택해 주세요."); $("#divSaleKind").focus(); return false; }
    } else if (FormCode == 12) {    // 오토바이 구매
      // 매입가격
      if ($("#txtBuyPrice").val().length == 0) { alert("매입가격을 입력해 주세요."); $("#txtBuyPrice").focus(); return false; }
      // 제조사/모델
      if ($("#txtMaker").val().length == 0) { alert("제조사를 입력해 주세요."); $("#txtMaker").focus(); return false; }
      if ($("#txtModel").val().length == 0) { alert("모델명을 입력해 주세요."); $("#txtModel").focus(); return false; }
    } else if (FormCode == 13 || FormCode == 14) {   // 서비스 / 상담
      // 상담/서비스 내용
      if ($("#txtServiceName").val().length == 0) { alert("상담/서비스 내용을 입력해 주세요."); $("#txtServiceName").focus(); return false; }
    }
  /*********** 상품 ***********/
  } else if (GroupCd == 10) {
    // 수량
    if ($("#txtQuantity").val().length == 0) { alert("수량을 입력해 주세요."); $("#txtQuantity").focus(); return false; }
    if ($("#txtQuantity").val() == 0) { alert("판매수량은 1개 이상부터 등록 가능합니다."); $("#txtQuantity").val("");  $("#txtQuantity").focus(); return false; }
    // 거래방식
    if (!$(':checkbox[name="chkTradeKind"]:checked').is(":checked")) { alert("거래방식을 1개 이상 선택해 주세요."); $("#divTradeKind").focus(); return false; }

    // 분류별 Validation
    if (FormCode == 20) {   // 판매
      // 상품상태
      if (!$(':checkbox[name="chkGoodsStatus"]:checked').is(":checked")) { alert("상품상태를 1개 이상 선택해 주세요."); $("#divGoodsStatus").focus(); return false; }
      // 판매가격
      if (!$("#chkFreeF").is(":checked")) { // 무료가 아니라면
        if ($("#txtSalePrice").val().length == 0 || $("#txtSalePrice").val() < 1000) { alert("정확한 가격을 입력해 주세요.\n1000원 이상부터 입력할 수 있습니다."); $("#txtSalePrice").focus(); return false; }
      }
    } else if (FormCode == 21) {  // 구매
      // 매입가격
      if ($("#txtBuyPrice").val().length == 0) { alert("매입가격을 입력해 주세요."); $("#txtBuyPrice").focus(); return false; }
    }
  /*********** 서비스 ***********/
  } else if (GroupCd == 11) {

    // 사업자번호
    //if ($("#txtBizNumber").val().length == 0) { alert("사업자번호를 입력해 주세요."); $("#txtBizNumber").focus(); return false; }

    // 분류별 Validation
    if (FormCode == 31) {   // 지역소식
      // 기간
      if ($("#txtSvcStartDate").val().length == 0) { alert("기간(시작일)일 입력해 주세요."); $("#txtSvcStartDate").focus(); return false; }
      if ($("#txtSvcEndDate").val().length == 0) { alert("기간(종료일)일 입력해 주세요."); $("#txtSvcEndDate").focus(); return false; }
    }
  }
/*
  // 사진등록
  if (!(FormCode == 13 || FormCode == 14 || FormCode == 30 || FormCode == 31)) {    // 자동차: 서비스/상담, 업소홍보: 서비스/지역소식 을 제외한 분류에선 사진업로드 체크
    if ($("#photolist li").length == 0) { alert("사진등록은 필수 입니다."); $("#fileimg").focus(); return false; }
  }
*/
  // 제목
  if ($("#txtTitle").val().length == 0) { alert("제목을 입력해 주세요."); $("#txtTitle").focus(); return false; }
  // 상세정보
  if ($("#txtExContents").val().length == 0) { alert("상세내용을 입력해 주세요."); $("#txtExContents").focus(); return false; }
  // 연락방법
  if (!$(":checkbox[name='chkContactMethod']").is(":checked")) { alert("연락방법을 1개 이상 선택해 주세요."); $("#divContactMethod").focus(); return false; }
  // 연락방법: 카카오톡
  if ($("#chkContactMethod4").is(":checked") && $("#txtKakaoId").val().length == 0) { alert("카카오톡 아이디를 입력해 주세요."); return false; }
  // 지역
  if ($("#selAreaA_1 option:selected").val().length == 0) { alert("지역을 선택해 주세요."); $("#selAreaA_1").focus(); return false; }
  if ($("#txtAreaDetail_1").val().length > 0 && $("#hidPointChk").val() == "0" && $("#hidGPoint_X").val().length == 0) { alert("지도위치를 선택해주세요."); $("#txtAreaDetail_1").focus(); return false; }

  // 기본주소 (다중주소 입력이 없는 경우)
  //if ($("#selAreaA_1 option:selected").val().length == 0 && $("#hidCIAreaA").val().length == 0) { alert("주소지가 없으면 등록이 불가합니다.\n회원정보 수정을 통해 주소를 입력해주세요."); return false; }
}

/****************** 등록 Submit ******************/
function AdRegSubmit() {
  var f = document.AdRegForm;

  // Validation 체크
  if (formValidation(f) == false) { return; }
  //return;

  // 유료상품 체크
  if (!$(':radio[name="rdoOptCode"]:checked').is(":checked") && !$(':radio[name="rdoFATCode"]:checked').is(":checked")) { alert("상품을 선택해 주세요."); $("#rdoOptCode40").focus(); return false; }

  // 임시저장 여부 초기화 (Submit후 다시 임시저장 처리를 위함)
  $("#hidTempSaveF").val("0");

  // Submit
  f.target    = "F_ACTION";
  f.method    = "post";
  f.encoding  = "multipart/form-data";
  f.action    = "/include/regist/TempSaveProc.asp";
  f.submit();
}

/****************** 광고등록: 결제하기 ******************/
function GoPayment() {
  var f = document.PayForm;
  var vTarget = "F_ACTION";

  // 현금영수증 항목 체크
  if ($(':radio[name="rdoTB_Kind"]:checked').val() == "0") {    // 현금영수증 발행신청시
    if ($("#txtTB_BuyerName").val().length == 0) {
      alert("현금영수증 발행을 위한 이름을 입력해주세요.");
      $("#txtTB_BuyerName").focus();
      return;
    }
    if ($("#sltTB_Phone1").val().length == 0 || $("#txtTB_Phone2").val().length == 0 || $("#txtTB_Phone3").val().length == 0) {
      alert("현금영수증 발행을 위한 휴대폰번호를 입력해주세요.");
      $("#txtTB_BuyerName").focus();
      return;
    }
  } else if ($("#hidPersonalF").val() == '0' && $(':radio[name="rdoTB_Kind"]:checked').val() == "1") { // 세금계산서 발행신청시 (기업회원)
    // 회사명
    if ($("#txtTBI_CompanyName").val().length == 0) { alert("회사명을 입력해 주세요."); $("#txtTBI_CompanyName").focus(); return; }
    // 대표자명
    if ($("#txtTBI_CEO").val().length == 0) { alert("대표자명을 입력해 주세요."); $("#txtTBI_CEO").focus(); return; }
    // 업태
    if ($("#txtTBI_Type").val().length == 0) { alert("업태를 입력해 주세요."); $("#txtTBI_Type").focus(); return; }
    // 종목
    if ($("#txtTBI_Part").val().length == 0) { alert("종목을 입력해 주세요."); $("#txtTBI_Part").focus(); return; }
    // 사업장소재지
    if ($("#txtTBI_Address").val().length == 0) { alert("사업장소재지를 입력해 주세요."); $("#txtTBI_Address").focus(); return; }
    // 담당자명
    if ($("#txtTBI_Manager").val().length == 0) { alert("담당자명을 입력해 주세요."); $("#txtTBI_Manager").focus(); return; }
    // 이메일
    if ($('#txtTBI_Email').val().length == 0) {
      alert("이메일을 입력하세요!"); $('#txtTBI_Email').focus(); return; 
    } else {
      if ($('#txtTBI_Email').val().indexOf("@") + "" == "-1" || $('#txtTBI_Email').val().indexOf(".") + "" == "-1") { alert("이메일 주소를 옳바르게 입력해 주세요!"); $('#txtTBI_Email').select();  return;
      }
    }

    // 핸드폰
    if ($("#sltTBI_Hphone1").val().length == 0) { alert("핸드폰번호를 빠짐없이 입력해 주세요."); $("#sltTBI_Hphone1").focus(); return; }
    if ($("#txtTBI_Hphone2").val().length == 0) { alert("핸드폰번호를 빠짐없이 입력해 주세요."); $("#txtTBI_Hphone2").focus(); return; }
    if ($("#txtTBI_Hphone3").val().length == 0) { alert("핸드폰번호를 빠짐없이 입력해 주세요."); $("#txtTBI_Hphone3").focus(); return; }

    // 전화번호
    if ($("#sltTBI_Phone1").val().length == 0) { alert("전화번호를 빠짐없이 입력해 주세요."); $("#sltTBI_Phone1").focus(); return; }
    if ($("#txtTBI_Phone2").val().length == 0) { alert("전화번호를 빠짐없이 입력해 주세요."); $("#txtTBI_Phone2").focus(); return; }
    if ($("#txtTBI_Phone3").val().length == 0) { alert("전화번호를 빠짐없이 입력해 주세요."); $("#txtTBI_Phone3").focus(); return; }
    
    // 사업자번호 체크
    if ($('#txtTBI_BizNo1').val().length != 3) {  alert("사업자 등록번호1를 입력하세요!"); $('#txtTBI_BizNo1').focus();  return;
    } else if ($('#txtTBI_BizNo2').val().length != 2) { alert("사업자 등록번호2를 입력하세요!"); $('#txtTBI_BizNo2').focus();  return;
    } else if ($('#txtTBI_BizNo3').val().length != 5) { alert("사업자 등록번호3를 입력하세요!"); $('#txtTBI_BizNo3').focus();  return;
    } else {  if (!isBizNo($('#txtTBI_BizNo1').val(), $('#txtTBI_BizNo2').val(), $('#txtTBI_BizNo3').val())) {  alert("사업자등록번호가 잘못 입력되었습니다.");  return; }
    }
  }

  // 결제하기 버튼 숨김
  $(".btb").hide();

  // 접속장비가 모바일기기 또는 크롬브라우저인 경우
  var agent = navigator.userAgent.toLowerCase();

  if ($("#hidDevice").val() == "M" || agent.indexOf("chrome") != -1) {  // 모바일이나 크롬인경우
    vTarget = "_top";
  }

  // Submit
  f.action = "AdRegistProc.asp";
  f.target = vTarget;
  f.method = "post";
  f.submit();
}

/****************** 광고등록: 결제수단 선택 ******************/
function FnChargeKind(vChargeKind) {
  if ($("#hidPersonalF").val() == 0) {   // 기업회원이라면 현금영수증 발행신청 못하도록 무조건 Disabled
    $("#rdoTB_Kind0").prop("disabled", true);
  }else{
    if (vChargeKind != 1) {
      $("#rdoTB_Kind0").prop("disabled", true);
      $("#rdoTB_Kind1").prop("checked", true);
      FnReceiptKind();
    } else {
      $("#rdoTB_Kind0").prop("disabled", false);
    }
  }
}

/****************** 광고등록: 결제증빙 선택 ******************/
function FnReceiptKind() {
  var vReceiptKind  = $(':radio[name="rdoTB_Kind"]:checked').val();
  var vChargeKind   = $(':radio[name="rdoChargeKind"]:checked').val();

  // 현금영수증 온라인 입금 확인
  if (vReceiptKind == "0" && vChargeKind != "1") {
    alert("현금영수증은 온라인입금만 신청가능 합니다.");
    $(':radio[name="rdoTB_Kind"]:input[value="1"]').prop("checked", true);
    return;
  }

  if (vReceiptKind == "0") {    // 현금영수증 발행신청시
    $("#ulReceiptInfo").show();
  } else {
    $("#ulReceiptInfo").hide();
  }
}

/****************** 광고등록: 이전단계 ******************/
function GoBeforeStep() {
  var TsIdx = $("#hidTempSaveIdx").val();

  location.href = "Regist_Step2.asp?TsIdx=" + TsIdx;
}

/****************** 다량등록권: 이전단계 ******************/
function GoBeforeStepFAT() {
  var f = document.PayForm;

  f.action = "Regist_FAT.asp";
  f.method = "post";
  f.submit();
}

/****************** 다량등록권 : 다량등록권 선택시 결제상품정보 셋팅 ******************/
function FnClickFAT(vFatId) {
  var strTerm;
  var intOptTerm = $("#sltFatTerm" + vFatId).val();

  // 날짜 표기
  var TodayYear, TodayMonth, TodayDay;
  var EndYear, EndMonth, EndDay;

  var Today = new Date();
  var EndDate = new Date(Date.parse(Today) + intOptTerm * 1000 * 60 * 60 * 24);

  TodayYear = Today.getFullYear();

  if (Today.getMonth() < 10) {
    TodayMonth = '0' + (Today.getMonth() + 1);
  } else {
    TodayMonth = Today.getMonth() + 1;
  }
  if (Today.getDate() < 10) {
    TodayDay = '0' + Today.getDate();
  } else {
    TodayDay = Today.getDate();
  }

  // 게재종료일자
  EndYear = EndDate.getFullYear();

  if (EndDate.getMonth() < 10) {
    EndMonth = '0' + (EndDate.getMonth() + 1);
  } else {
    EndMonth = EndDate.getMonth() + 1;
  }
  if (EndDate.getDate() < 10) {
    EndDay = '0' + EndDate.getDate();
  } else {
    EndDay = EndDate.getDate();
  }

  strTerm = TodayYear + "/" + TodayMonth + "/" + TodayDay + "~" + EndYear + "/" + EndMonth + "/" + EndDay + " (" + intOptTerm + "일)";

  // 상품명
  $("#SFAT_Name").text($("#tg_FATNm" + vFatId).text());
  // 상품기간
  $("#SFAT_Term").text(strTerm);
  // 상품내용
  $("#SFAT_Contents").text($("#tg_FATDesc" + vFatId).text());
  // 상품가격
  $("#SFAT_Price").text($("#tg_FATPrice" + vFatId).text());

  $("#rdoFatId").val($("#hidFatID" + vFatId).val());
}

/****************** 다량등록권: 기간 선택 ******************/
function SetFatId(obj, vId) {
  var objValue = obj.value;
  var vGroupCd = $("#hidGroupCd").val();

  $("#rdoFatId" + vId).prop("checked", true);
  $(".label_radio").removeClass("r_on");
  $("#label_radio" + vId).addClass("r_on");

  $.ajax({
    type: "POST",
    url: "/js/ajax/ajax_FAT_PriceResult.asp",
    data: { GroupCd: vGroupCd, StCnt: vId, OptTerm: objValue },
    dataType: 'html',
    async: false,         // Ajax 통신 끝날때까지 타 함수 실행 안되는 옵션
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (result) {
      var arr = result.split("|");
      $("#rdoFatId").val(arr[0]);
      $("#hidFatID" + vId).val(arr[0]);
      $("#tg_FATPrice" + vId).html(arr[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<span>원</span>");

      FnClickFAT(vId);
    }
  });
}

/****************** 다량등록권: 다량등록권 결제페이지로 이동 ******************/
function GoNextFAT(){

  if ($("#rdoFatId").val().length == 0) {
    alert("다량등록권 상품을 선택해 주세요.");
    return;
  }

  var f = document.FatForm;
  
  f.action = "Regist_FAT_Payment.asp";
  f.method = "post";
  f.submit();
}

/****************** 다량등록권: 결제하기 ******************/
function GoFATPayment() {
  var agent = navigator.userAgent.toLowerCase();

  var f = document.PayForm;
  var vTarget = "F_ACTION";

  // 세금계산서 항목 체크
  if ($(':radio[name="rdoTB_Kind"]:checked').val() == "0") {    // 현금영수증 발행신청시
    if ($("#txtTB_BuyerName").val().length == 0) {
      alert("현금영수증 발행을 위한 이름을 입력해주세요.");
      $("#txtTB_BuyerName").focus();
      return;
    }
    if ($("#sltTB_Phone1").val().length == 0 || $("#txtTB_Phone2").val().length == 0 || $("#txtTB_Phone3").val().length == 0) {
      alert("현금영수증 발행을 위한 휴대폰번호를 입력해주세요.");
      $("#txtTB_BuyerName").focus();
      return;
    }
  }

  // 결제하기 버튼 숨김
  $(".btb").hide();

  // 접속장비가 모바일기기 또는 크롬브라우저인 경우
  if ($("#hidDevice").val() == "M" || agent.indexOf("chrome") != -1) {
    vTarget = "_top";
  }

  // Submit
  f.action = "FatRegistProc.asp";
  f.target = vTarget;
  f.method = "post";
  f.submit();
}

/****************** 광고수정: Submit ******************/
function AdModSubmit() {
  var f = document.AdRegForm;

  // Validation 체크
  if (formValidation(f) == false) { return; }

  // Submit
  f.target    = "_top";
  f.action    = "AdModifyProc.asp";
  f.encoding  = "multipart/form-data";
  f.method    = "post";
  f.submit();
}

/****************** 광고등록: 지도확인 ******************/
function Fn_PointXY_Pop() {
  var AreaA       = $("#selAreaA_1").val();
  var AreaB       = $("#selAreaB_1").val();
  var AreaC       = $("#selAreaC_1").val();
  var AreaDetail  = $("#txtAreaDetail_1").val();

  if (AreaC.length == 0 || AreaDetail.length == 0) {
    alert("주소지를 빠짐없이 입력해주세요.");
    return;
  }

  layer_open('Map_Pop');
  MapLoad('selAreaA_1', 'selAreaB_1', 'selAreaC_1', 'txtAreaDetail_1');
}

/****************** 시세검색 ******************/
function SearchMarketPrice() {
  layer_open('Price_Sc');
}

/****************** 차량번호 검색 ******************/
function SearchCarInfo() {
  if ($("#txtCarNumber").val().length == 0) {
    alert("차량번호를 입력해주세요.");
    $("#txtCarNumber").focus();
    return;
  }

  layer_open('Car_Num');
  alert("작업전");
}

/*************** 중고차 시세분류 셋팅 ***************/
function SetAutoSiseCode(vCode, vStep) {
  $.ajax({
    type: "POST",
    url: "/js/ajax/ajax_AutoSiseCode.asp",
    data: { Code: vCode, Step: vStep },
    dataType: 'html',
    async: false,         // Ajax 통신 끝날때까지 타 함수 실행 안되는 옵션
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (result) {
      if (vStep == 1) {
        $("#sltSiseCode1").append(result);
      } else {
        $("#sltSiseCode2").empty();
        $("#sltSiseCode2").append(result);
      }
    }
  });
}

/*************** 중고차 시세분류 검색 ***************/
function SearchCarSise() {
  var SCode1 = $("#sltSiseCode1").val();
  var SCode2 = $("#sltSiseCode2").val();

  if (SCode2.length == 0) {
    alert("모델을 선택해주세요.");
    return;
  }

  $.ajax({
    type: "POST",
    url: "/js/ajax/ajax_AutoSiseResult.asp",
    data: { SiseCode: SCode2 },
    dataType: 'html',
    async: false,         // Ajax 통신 끝날때까지 타 함수 실행 안되는 옵션
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (result) {
      $("#tbodySise").empty();
      $("#tbodySise").html(result);
    }
  });
}

/*************** 지도 API 관련 : 시작 ***************/
function MapLoad(AreaA, AreaB, AreaC, AreaDetail) {
  var Result = false;
  var areaA = "";
  var areaB = "";
  var areaC = "";
  var areaDetail = $("#" + AreaDetail).val();
  var addr = "";
  var iFrmWidth = $("#hidMapFrameWidth").val();
  var iFrmHeight = $("#hidMapFrameHeight").val();
  var MapX = $("input[name=hidGPoint_X]").val();
  var MapY = $("input[name=hidGPoint_Y]").val();
  var MapSetYN = $("input[name=hidPointChk]").val();

  if ($("#" + AreaA).val() != "") { areaA = $("#" + AreaA + " option:selected").text(); }
  if ($("#" + AreaB).val() != "") { areaB = $("#" + AreaB + " option:selected").text(); }
  if ($("#" + AreaC).val() != "") { areaC = $("#" + AreaC + " option:selected").text(); }

  if (areaA != "" && areaB != "" && areaC != "" && areaDetail != "") {
    addr = areaA + " " + areaB + " " + areaC + " " + areaDetail;
  } else {
    alert("주소지를 정확히 입력해주세요.");
    return;
  }

  if (areaA == "전국" || areaB == "전지역" || areaC == "전지역") {
    $("#map_layer1").hide();
    return;
  }

//$("#txtTitle").val(escape(addr));

  if (MapX == "" || MapX == 0) {
    if (addr != "") {
      $.ajax({
        url: "/js/ajax/ajax_getMap.asp",
        type: "POST",
        dataType: 'json',
        data: { addr: escape(addr), addrSimple: escape(areaA + " " + areaB + " " + areaC) },
        success: function (data) {
          var tm128_posx = data.TM128_PosX;
          var tm128_posy = data.TM128_PosY;
          var tm128_addr = data.TM128_Addr;
          var wgs84_posx = data.WGS84_PosX;
          var wgs84_posy = data.WGS84_PosY;
          var wgs84_addr = data.WGS84_Addr;

          $("#map_view").html("<button type=\"button\" class=\"bt_type2 bt_whi map_reset_bt\" onclick=\"FnMapReset()\"><span class=\"bg_reg map_reset_ico\"></span>리셋</button><iframe id=\"ifmMap\" name=\"ifmMap\" src=\"/include/regist/MapView.asp?MapX=" + wgs84_posx + "&MapY=" + wgs84_posy + "&PoiNm=" + wgs84_addr + "&MapSizeW=" + iFrmWidth + "&MapSizeH=" + iFrmHeight + "&PageGbn=Regist\" width=\"" + iFrmWidth + "\" height=\"" + iFrmHeight + "\" scrolling=\"no\" frameborder=\"0\"></iframe>");
          $("input[name=hidGPoint_X]").val(wgs84_posx);
          $("input[name=hidGPoint_Y]").val(wgs84_posy);
        },
        error: function (xhr, status, error) {
          MapError('2');
        }
      })
    } else {
      alert("잘못된 주소지 입니다..");
      return;
    }
  } else {
    $("#map_view").html("<button type=\"button\" class=\"bt_type2 bt_whi map_reset_bt\" onclick=\"FnMapReset()\"><span class=\"bg_reg map_reset_ico\"></span>리셋</button><iframe id=\"ifmMap\" name=\"ifmMap\" src=\"/include/regist/MapView.asp?MapX=" + MapX + "&MapY=" + MapY + "&PoiNm=&MapSizeW=" + iFrmWidth + "&MapSizeH=" + iFrmHeight + "&PageGbn=Regist\" width=\"" + iFrmWidth + "\" height=\"" + iFrmHeight + "\" scrolling=\"no\" frameborder=\"0\"></iframe>");
  }
}

function MapError(ErrNum) {
  $("input[name=hidGPoint_X]").val("");
  $("input[name=hidGPoint_Y]").val("");
  $("#hidPointChk").val("0");

  if ($("#ifmMap").length > 0) {
    $("#ifmMap").attr("src", "");
  }
}

/*
function MapUserOpen(AreaA, AreaB, AreaC, AreaDetail, iPopWidth, iPopHeight, RetTm128_X, RetTm128_Y, RetWgs84_X, RetWgs84_Y) {
  var areaA = $("select[name=" + AreaA + "] option:selected").text();
  var areaB = $("select[name=" + AreaB + "] option:selected").text();
  var areaC = $("select[name=" + AreaC + "] option:selected").text();
  var areaDetail = $("input[name=" + AreaDetail + "]").val();
  var addr = areaA + " " + areaB + " " + areaC + " " + areaDetail;
  var base_addr = areaA + " " + areaB + " " + areaC;
  var MapX = $("input[name=" + RetWgs84_X + "]").val();
  var MapY = $("input[name=" + RetWgs84_Y + "]").val();
  var url = "/job/map/Map_Job.asp?Addr=" + addr + "&BaseAddr=" + base_addr + "&MapSizeW=" + iPopWidth + "&MapSizeH=" + iPopHeight + "&RetTm128_X=" + RetTm128_X + "&RetTm128_Y=" + RetTm128_Y + "&RetWgs84_X=" + RetWgs84_X + "&RetWgs84_Y=" + RetWgs84_Y + "&MapX=" + MapX + "&MapY=" + MapY;

  if (areaA != "" && areaB != "" && areaC != "" && areaDetail != "") {
    window.open(url, "FindallMap", "scroll=no, bar=no, width=570, height=590");
  } else {
    alert("주소를 입력해주십시오.");
    return;
  }
}
*/

function MapReLoad(val, Addr) {
  var posx = $("input[name=hidGPoint_X]").val();
  var posy = $("input[name=hidGPoint_Y]").val();
  var width = $("#hidMapFrameWidth").val();
  var height = $("#hidMapFrameHeight").val();

  if (val == "Popup") {
    $("#map_layer1 .area").html(Addr);
  }

  $("#map_layer1").show();
  $("#map_view").html("<iframe id=\"ifmMap\" name=\"ifmMap\" src=\"/include/regist/MapView.asp?MapX=" + posx + "&MapY=" + posy + "&PoiNm=&MapSizeW=" + width + "&MapSizeH=" + height + "&PageGbn=Regist\" width=\"" + width + "\" height=\"" + height + "\" scrolling=\"no\" frameborder=\"0\"></iframe>");
}

// 좌표 저장
function FnMapSave() {
  $("#hidPointChk").val("1");

  // 레이어 닫기
  $('.ly_pop').hide();
  $('body').css('overflow-y', 'auto');
}

// 좌표저장 취소
function FnMapCancel() {
  $("#hidGPoint_X").val($("#hidOrgGPoint_X").val());
  $("#hidGPoint_Y").val($("#hidOrgGPoint_Y").val());

  if($("#hidGPoint_X").val().length == 0 || $("#hidGPoint_X").val() == '0'){
    $("#hidPointChk").val("0");
  }

  // 레이어 닫기
  $('.ly_pop').hide();
  $('body').css('overflow-y', 'auto');
}

// 지도 리셋
function FnMapReset() {
  $('#ifmMap').get(0).contentDocument.location.reload();
}
/*************** 지도 API 관련 : 끝 ***************/

/****************** 딜러정보: 지도확인 ******************/
function Fn_PointXY_Dealer_Pop() {
  var AreaA = $("#selCity").val();
  var AreaB = $("#selGu").val();
  var AreaC = $("#selDong").val();
  var AreaDetail = $("#txtAddrDetail").val();

  if (AreaC.length == 0 || AreaDetail.length == 0) {
    alert("주소지를 빠짐없이 입력해주세요.");
    return;
  }

  layer_open('Map_Pop');
  MapLoad('selCity', 'selGu', 'selDong', 'txtAddrDetail');
}

/****************** 상세주소 변경(onkeypress)시 좌표 초기화 ******************/
function FnAreaDetailChange(objX, objY) {
  $("#" + objX).val("");
  $("#" + objY).val("");
}

/****************** 사진등록 버튼 Click Event ******************/
function fileBrowse() {
  // This works in IE only. Doesn't do jack in FF. :( 
  var browseField = $("#fileimg");
  browseField.click();
}

/****************** 사업자 번호 체크 ******************/
function isBizNo(s_v1, s_v2, s_v3) {
  if (s_v1 == "" || s_v2 == "" || s_v3 == "") return false;
  if (s_v1 == "000" && s_v2 == "00" && s_v3 == "00000") return false;
  if (s_v1 == "111" && s_v2 == "11" && s_v3 == "11119") return false;
  if (s_v1 == "222" && s_v2 == "22" && s_v3 == "22227") return false;
  if (s_v1 == "333" && s_v2 == "33" && s_v3 == "33336") return false;
  if (s_v1 == "444" && s_v2 == "44" && s_v3 == "44444") return false;
  if (s_v1 == "555" && s_v2 == "55" && s_v3 == "55551") return false;
  if (s_v1 == "666" && s_v2 == "66" && s_v3 == "66661") return false;
  if (s_v1 == "777" && s_v2 == "77" && s_v3 == "77770") return false;
  if (s_v1 == "888" && s_v2 == "88" && s_v3 == "88888") return false;
  if (s_v1 == "999" && s_v2 == "99" && s_v3 == "99997") return false;
  if (s_v1 == "114" && s_v2 == "86" && s_v3 == "65854") return false;
  if (s_v1 == "220" && s_v2 == "85" && s_v3 == "06677") return false;
  if (s_v1 == "220" && s_v2 == "85" && s_v3 == "11898") return false;
  if (s_v1 == "220" && s_v2 == "85" && s_v3 == "18376") return false;
  if (s_v1 == "220" && s_v2 == "85" && s_v3 == "24826") return false;
  if (s_v1 == "409" && s_v2 == "20" && s_v3 == "49208") return false;
  if (s_v1 == "304" && s_v2 == "81" && s_v3 == "15063") return false;
  if (s_v1 == "502" && s_v2 == "20" && s_v3 == "99079") return false;
  if (s_v1 == "105" && s_v2 == "87" && s_v3 == "07255") return false;
  if (s_v1 == "617" && s_v2 == "81" && s_v3 == "48252") return false;
  if (s_v1 == "123" && s_v2 == "12" && s_v3 == "12345") return false;
  if (s_v1 == "206" && s_v2 == "85" && s_v3 == "26551") return false; //미디어윌 사업자 등록번호
  if (s_v1.length != 3) return false;
  if (s_v2.length != 2) return false;
  if (s_v3.length != 5) return false;

  var NoCheckNum = "1309516286,"; 	// 체크안되는 사업자번호 예외처리

  if (NoCheckNum.indexOf(s_v1 + s_v2 + s_v3) >= 0) {
    return true;
  }

  var num = (s_v1 + s_v2 + s_v3); 	//사업자등록번호를 붙입니다.
  var w_c, w_e, w_f, w_tot;

  w_c = num.charAt(8) * 5; 		// 9번째자리의 숫자에 5를 곱한다.
  w_e = parseInt((w_c / 10), 10); 	// 10으로 나누고 10진수 형태의 숫자형으로 ..나눈몫
  w_f = w_c % 10; 					// 10으로 나눈 나머지.
  w_tot = num.charAt(0) * 1;
  w_tot += num.charAt(1) * 3;
  w_tot += num.charAt(2) * 7;
  w_tot += num.charAt(3) * 1;
  w_tot += num.charAt(4) * 3;
  w_tot += num.charAt(5) * 7;
  w_tot += num.charAt(6) * 1;
  w_tot += num.charAt(7) * 3;
  w_tot += num.charAt(9) * 1;
  w_tot += (w_e + w_f);

  if (!(w_tot % 10)) {				// 10으로 나누어 지면 true를 그렇지 않으면 false
    return true;
  } else {
    return false;
  }
}

// 차량번호가 정규식에 맞는지 체크
function chkCarNo(CarNo) {

  CarNo = CarNo.replace(/\s/g, ""); //공백제거

  var isGoodNo = false;
 
  // 형식1 체크 : 한글2자 + 01~99 + 한글1자 + 00~99 + 00~99
  if (CarNo.match(/[가-힣]{2}[0-9]{1}[0-9]{1}[가-힣]{1}[0-9]{4}/g) == CarNo) {
    isGoodNo = true;
  }

  // 형식2 체크 : 01~99 + 한글1자 +00~99 + 00~99
  if (CarNo.match(/[0-9]{1}[0-9]{1}[가-힣]{1}[0-9]{4}/g) == CarNo) {
    isGoodNo = true;
  }

  // 형식3 체크 : 임 + 숫자6자리
  if (CarNo.match(/[임]{1}[0-9]{6}/g) == CarNo) {
    isGoodNo = true;
  }

  return isGoodNo;
}

// 주소지 중복 체크
function FnAreaSameCheck(obj,id) {
  var SelVal = obj.value;

  var AreaC1 = $("#selAreaC_1").val();
  var AreaC2 = $("#selAreaC_2").val();
  var AreaC3 = $("#selAreaC_3").val();

  // 두번째 추가지역 체크시
  if(id == 2){
    if (AreaC1 == SelVal) {
      alert("같은 지역을 선택하셨습니다. 다른 지역으로 추가해 주세요");
      obj.value = "";
      return;
    }    
  }else{  // 세번째 추가지역 체크시
    if (AreaC1 == SelVal || AreaC2 == SelVal) {
      alert("같은 지역을 선택하셨습니다. 다른 지역으로 추가해 주세요");
      obj.value = "";
      return;
    }    
  }
}

// 중고거래 판매(무료) 정책
function FnFreeCheck() {
  if ($("#chkFreeF").is(":checked")) {
    $("#txtSalePrice").val("");
    $("#txtSalePrice").prop("readonly", true);
    return;
  } else {
    $("#txtSalePrice").prop("readonly", false);
  }
}

// 성능점검기록부 이미지 삭제
function FnDelPerformanceDoc() {
  if(confirm("성능점검기록부를 삭제하시겠습니까?\n(삭제된 파일은 복구가 불가능합니다.)")){
    $("#hidPerformanceDoc_DelF").val("1");
    $("#ulPerformanceDoc").hide();
  }
}

//콤마찍기
function comma(str) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

//콤마풀기
function uncomma(str) {
  str = String(str);
  return str.replace(/[^\d]+/g, '');
}

function inputNumberFormat(obj) {
  obj.value = comma(uncomma(obj.value));
}