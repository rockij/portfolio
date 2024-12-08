/****************** ±¤°í ºÒ·¯¿À±â ******************/
function SetLoadAd(vLineAdNo) {
  location.href = "Regist_Step2.asp?LineAdNo=" + vLineAdNo;
}

/****************** ÀÓ½ÃÀúÀå ******************/
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
           async: false,         // Ajax Åë½Å ³¡³¯¶§±îÁö Å¸ ÇÔ¼ö ½ÇÇà ¾ÈµÇ´Â ¿É¼Ç
           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',   // ÀÎÄÚµù ¹æ½Ä
           success: function (data) {                                          // ÀÀ´ä°á°ú¸¦ »Ñ·ÁÁØ´Ù.
             //$("#datatable").html(data);
             alert(data);
           }
           ,error : function(errMsg,a,b) {                                        // ¿¡·¯½Ã alert Ã¢À¸·Î ¿¡·¯ ¾Ë¸²
             alert("¿¡·¯:" + b);
           }
         });
  */
}

/****************** µô·¯/¾÷Ã¼Á¤º¸ ¼öÁ¤ÇÏ±â ******************/
function ModCompanyInfo() {
  var f = document.frmDealer;

  var FieldNm = $("#hidDealerAddressNm").val();

  if ($("#hidScode").val() == "S104") {         // ÀÚµ¿Â÷ µô·¯Á¤º¸
    if ($("#txtManageNumber").val().length == 0) {
      alert("[»ç¿øÁõ¹øÈ£]¸¦ ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtManageNumber").focus(); return;
    }
  }

  if ($("#selCity").val().length == 0) {
    alert("[" + FieldNm + "]À» ¼±ÅÃÇØ ÁÖ¼¼¿ä."); $("#selCity").focus(); return;
  }
  if ($("#selGu").val().length == 0) {
    alert("[" + FieldNm + "]À» ºüÁü¾øÀÌ ¼±ÅÃÇØ ÁÖ¼¼¿ä."); $("#selGu").focus(); return;
  }
  if ($("#selDong").val().length == 0) {
    alert("[" + FieldNm + "]À» ¼±ÅÃÇØ ÁÖ¼¼¿ä."); $("#selDong").focus(); return;
  }

  f.method = "post";
  f.action = "BizInfo_ModProc.asp";
  f.encoding = "multipart/form-data";
  f.submit();
}

/****************** Ä¶¸°´õ ******************/
function fnPopUpCalendar(idx) {
  $.datepicker.regional['ko'] = { closeText: '´İ±â', prevText: 'ÀÌÀü´Ş', nextText: '´ÙÀ½´Ş', currentText: '¿À´Ã', monthNames: ['1¿ù', '2¿ù', '3¿ù', '4¿ù', '5¿ù', '6¿ù', '7¿ù', '8¿ù', '9¿ù', '10¿ù', '11¿ù', '12¿ù'], monthNamesShort: ['1¿ù', '2¿ù', '3¿ù', '4¿ù', '5¿ù', '6¿ù', '7¿ù', '8¿ù', '9¿ù', '10¿ù', '11¿ù', '12¿ù'], dayNames: ['ÀÏ', '¿ù', 'È­', '¼ö', '¸ñ', '±İ', 'Åä'], dayNamesShort: ['ÀÏ', '¿ù', 'È­', '¼ö', '¸ñ', '±İ', 'Åä'], dayNamesMin: ['ÀÏ', '¿ù', 'È­', '¼ö', '¸ñ', '±İ', 'Åä'], weekHeader: 'Wk', dateFormat: 'yy-mm-dd', firstDay: 0, isRTL: false, duration: 200, showAnim: 'show', showMonthAfterYear: true, yearSuffix: '³â' }; $.datepicker.setDefaults($.datepicker.regional['ko']);
  /* jquery.ui.datepicker ¿É¼Ç¼³Á¤ÇÏ±â , ÀÚ¼¼ÇÑ ¿É¼ÇÀº API¹®¼­ Âü°í.*/
  $(idx).datepicker({
    showOn: "button", //ÀÌ¹ÌÁö·Î »ç¿ë , both : ¿¤¸®¸ÕÆ®¿Í ÀÌ¹ÌÁö µ¿½Ã»ç¿ë
    buttonImage: "http://image.findall.co.kr/FAImage/job/advertiser/btn/btn_calendar.gif", //¹öÆ°À¸·Î »ç¿ëÇÒ ÀÌ¹ÌÁö °æ·Î
    buttonImageOnly: true, //ÀÌ¹ÌÁö¸¸ º¸ÀÌ±â
    onSelect: function (date) {
      if (idx == "#txtRecuitEndDate") {
        changeStartDate();
      }
    }
  });
  //datepicker¿¡¼­ »ç¿ëÇÑ ÀÌ¹ÌÁö ¹öÆ° styleÀû¿ë
  $("img.ui-datepicker-trigger").attr("style", "margin-left:5px; vertical-align:middle; cursor:pointer;");
}

/****************** ÀÌ¹ÌÁö¾÷·Îµå ******************/
$("#fileimg").change(function () {
  var f = document.AdRegForm;
  var imgLimit = $("#hidImgLimit").val();

  $("#tmpfilenm").val($("#fileimg").val());
  if ($("#photolist li").length >= imgLimit) {
    alert("ÀÌ¹ÌÁö Ã·ºÎ´Â ÃÖ´ë " + imgLimit + "°³ ±îÁö °¡´ÉÇÕ´Ï´Ù.");
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
    alert("ÀÌ¹ÌÁö µî·ÏÀÌ ºÒ°¡ÇÑ ÇÃ·§Æû ÀÔ´Ï´Ù.");
    return;
  }

  $("#fileimg").replaceWith($("#fileimg").clone(true));
  f.target = "";
});

/****************** ÀÌ¹ÌÁö»èÁ¦ ******************/
function delImg(obj) {
  idx = $("#photolist").children("li").index($(obj).parent().parent())

  $("#photolist").children("li").eq(idx).remove();
  $("#filelist").children("input").eq(idx).remove();

  $("#RegImageCnt").text($("#photolist li").length);
}

/****************** Ãß°¡ÀÌ¹ÌÁö ³ëÃâ ******************/
function addPhotoList(filename) {
  $("#photolist").append("<li><div class='thum_img'><img src='" + filename + "'><button type='button' class='bg_reg reg_thum_del_bt' onclick='delImg(this,$(this).parent().index(this));return false;'></button></div></li>");

  $("#photolist").append("");
  $("#fileimg").val("");
  $("#filelist").append("<input type='hidden' name='files' value='" + filename + "'>")
  $("#tmpfilenm").val("");

  $("#RegImageCnt").text($("#photolist li").length);
}

/****************** Â÷·®Á¤º¸: »ö»ó ******************/
function SetCarColor() {
  $("#txtColor").val($("#sltColor").val());
}

/****************** ¿É¼Ç ¼±ÅÃ½Ã °áÁ¦»óÇ°Á¤º¸ ¼ÂÆÃ ******************/
function FnClickOpt(vObj) {

  // ´Ù·®µî·Ï±Ç Ã¼Å© ÇØÁ¦
  $(':radio[name="rdoFATCode"]:checked').prop("checked", false);

  var OptCode = vObj.value;
  var intOptTerm = $("#OptInfo_OptTerm" + OptCode).val();
  var PubTerm;

  // ³¯Â¥ Ç¥±â
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

  // °ÔÀçÁ¾·áÀÏÀÚ
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

  // Áß°í°Å·¡, ¹«·áµî·Ï ÀÌ¶ó¸é
  if ($("#hidGroupCd").val() == 10 && $(':radio[name="rdoOptCode"]:checked').val() == 0) {
    PubTerm = TodayYear + "/" + TodayMonth + "/" + TodayDay + " ~ " + "Á¾·á ½Ã ±îÁö";
  } else {
    PubTerm = TodayYear + "/" + TodayMonth + "/" + TodayDay + " ~ " + EndYear + "/" + EndMonth + "/" + EndDay + " (" + intOptTerm + "ÀÏ)";
  }

  // °áÁ¦»óÇ° ¼ÂÆÃ
  $("#PayInfo_OptName").text($("#OptInfo_Name" + OptCode).text());
  $("#PayInfo_OptTerm").text(PubTerm);
  $("#PayInfo_Desc").text($("#OptInfo_Desc" + OptCode).text());
  $("#PayInfo_Price").text($("#OptInfo_Price" + OptCode).text());
}

/****************** ´Ù·®µî·Ï±Ç ¼±ÅÃ½Ã °áÁ¦»óÇ°Á¤º¸ ¼ÂÆÃ ******************/
function FnClickOptFAT(vObj) {

  // ¿É¼Ç Ã¼Å© ÇØÁ¦
  $(':radio[name="rdoOptCode"]:checked').prop("checked", false);

  var OptCode = vObj.value;
  var intOptTerm = $("#OptInfo_FATTerm" + OptCode).val();
  var PubTerm;

  // ³¯Â¥ Ç¥±â
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

  // °ÔÀçÁ¾·áÀÏÀÚ
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

  PubTerm = TodayYear + "/" + TodayMonth + "/" + TodayDay + "~" + EndYear + "/" + EndMonth + "/" + EndDay + " (" + intOptTerm + "ÀÏ)";

  // °áÁ¦»óÇ° ¼ÂÆÃ
  $("#PayInfo_OptName").text($("#FATInfo_Name" + OptCode).text());
  $("#PayInfo_OptTerm").text(PubTerm);
  $("#PayInfo_Desc").text($("#FATInfo_Desc" + OptCode).text());
  //$("#PayInfo_Price").text($("#FATInfo_Price" + OptCode).text());
  $("#PayInfo_Price").text("0¿ø");

}

/****************** Validation Ã¼Å© ******************/
function formValidation() {
  var FormCode = $("#hidFormCode").val();         // ºĞ·ùº° ÆûÄÚµå
  var GroupCd = $("#hidGroupCd").val();           // ¼½¼ÇÄÚµå

  /*********** ÀÚµ¿Â÷ ***********/
  if (GroupCd == 12) {   // ÀÚµ¿Â÷

    // ºĞ·ùº° Validation
    if (FormCode == 10 || FormCode == 11) {    // ÀÚµ¿Â÷ ÆÇ¸Å / ¿ÀÅä¹ÙÀÌ ÆÇ¸Å
      // Â÷·®¹øÈ£
      if (FormCode == 10 && $("#txtCarNumber").val().length == 0) { alert("Â÷·®¹øÈ£¸¦ ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtCarNumber").focus(); return false; }
      if (!chkCarNo($("#txtCarNumber").val())) {  alert("Á¤»óÀûÀÎ Â÷·®¹øÈ£°¡ ¾Æ´Õ´Ï´Ù.\nÂ÷·®¹øÈ£¸¦ È®ÀÎÇØÁÖ¼¼¿ä."); $("#txtCarNumber").focus(); return false; }
      // ÆÇ¸Å°¡°İ
      if ($("#txtSalePrice").val().length == 0) { alert("ÆÇ¸Å°¡°İÀ» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtSalePrice").focus(); return false; }
      // Â÷·®¸í/Á¦Á¶»ç/¸ğµ¨
      if ($("#txtMaker").val().length == 0) { alert("Á¦Á¶»ç¸¦ ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtMaker").focus(); return false; }
      if ($("#txtModel").val().length == 0) { alert("¸ğµ¨¸íÀ» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtModel").focus(); return false; }
      if (FormCode == 10 && $("#txtClass").val().length == 0) { alert("µî±ŞÀ» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtClass").focus(); return false; }
      // ¿¬½Ä
      if ($("#sltMakeYear").val().length == 0) { alert("¿¬½ÄÀ» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#sltMakeYear").focus(); return false; }
      // ¿ù½Ä
      if ($("#sltMakeMonth").val().length == 0) { alert("¿ù½ÄÀ» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#sltMakeMonth").focus(); return false; }
      // º¯¼Ó±â
      if (!$(':radio[name="rdoTransMission"]:checked').is(":checked")) { alert("º¯¼Ó±â¸¦ ¼±ÅÃÇØ ÁÖ¼¼¿ä."); $("#divTransMission").focus(); return false; }
      // ¿¬·á
      if (!$(':radio[name="rdoFuel"]:checked').is(":checked")) { alert("¿¬·á¸¦ ¼±ÅÃÇØ ÁÖ¼¼¿ä."); $("#divFuel").focus(); return false; }
      // ¹è±â·®
      if ($("#txtDisplacement").val().length == 0) { alert("¹è±â·®À» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtDisplacement").focus(); return false; }
      // ÁÖÇà°Å¸®
      if ($("#txtMileage").val().length == 0) { alert("ÁÖÇà°Å¸®¸¦ ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtMileage").focus(); return false; }
      // »ö»ó
      if ($("#txtColor").val().length == 0) { alert("»ö»óÀ» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtColor").focus(); return false; }
      // »ç°í¿©ºÎ
      if (!$(':radio[name="rdoAccident"]:checked').is(":checked")) { alert("»ç°í¿©ºÎ¸¦ ¼±ÅÃÇØ ÁÖ¼¼¿ä."); $("#divAccident").focus(); return false; }
      // ÆÇ¸Å±¸ºĞ
      if (!$(':radio[name="rdoSaleKind"]:checked').is(":checked")) { alert("ÆÇ¸Å±¸ºĞÀ» ¼±ÅÃÇØ ÁÖ¼¼¿ä."); $("#divSaleKind").focus(); return false; }
    } else if (FormCode == 12) {    // ¿ÀÅä¹ÙÀÌ ±¸¸Å
      // ¸ÅÀÔ°¡°İ
      if ($("#txtBuyPrice").val().length == 0) { alert("¸ÅÀÔ°¡°İÀ» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtBuyPrice").focus(); return false; }
      // Á¦Á¶»ç/¸ğµ¨
      if ($("#txtMaker").val().length == 0) { alert("Á¦Á¶»ç¸¦ ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtMaker").focus(); return false; }
      if ($("#txtModel").val().length == 0) { alert("¸ğµ¨¸íÀ» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtModel").focus(); return false; }
    } else if (FormCode == 13 || FormCode == 14) {   // ¼­ºñ½º / »ó´ã
      // »ó´ã/¼­ºñ½º ³»¿ë
      if ($("#txtServiceName").val().length == 0) { alert("»ó´ã/¼­ºñ½º ³»¿ëÀ» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtServiceName").focus(); return false; }
    }
  /*********** »óÇ° ***********/
  } else if (GroupCd == 10) {
    // ¼ö·®
    if ($("#txtQuantity").val().length == 0) { alert("¼ö·®À» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtQuantity").focus(); return false; }
    if ($("#txtQuantity").val() == 0) { alert("ÆÇ¸Å¼ö·®Àº 1°³ ÀÌ»óºÎÅÍ µî·Ï °¡´ÉÇÕ´Ï´Ù."); $("#txtQuantity").val("");  $("#txtQuantity").focus(); return false; }
    // °Å·¡¹æ½Ä
    if (!$(':checkbox[name="chkTradeKind"]:checked').is(":checked")) { alert("°Å·¡¹æ½ÄÀ» 1°³ ÀÌ»ó ¼±ÅÃÇØ ÁÖ¼¼¿ä."); $("#divTradeKind").focus(); return false; }

    // ºĞ·ùº° Validation
    if (FormCode == 20) {   // ÆÇ¸Å
      // »óÇ°»óÅÂ
      if (!$(':checkbox[name="chkGoodsStatus"]:checked').is(":checked")) { alert("»óÇ°»óÅÂ¸¦ 1°³ ÀÌ»ó ¼±ÅÃÇØ ÁÖ¼¼¿ä."); $("#divGoodsStatus").focus(); return false; }
      // ÆÇ¸Å°¡°İ
      if (!$("#chkFreeF").is(":checked")) { // ¹«·á°¡ ¾Æ´Ï¶ó¸é
        if ($("#txtSalePrice").val().length == 0 || $("#txtSalePrice").val() < 1000) { alert("Á¤È®ÇÑ °¡°İÀ» ÀÔ·ÂÇØ ÁÖ¼¼¿ä.\n1000¿ø ÀÌ»óºÎÅÍ ÀÔ·ÂÇÒ ¼ö ÀÖ½À´Ï´Ù."); $("#txtSalePrice").focus(); return false; }
      }
    } else if (FormCode == 21) {  // ±¸¸Å
      // ¸ÅÀÔ°¡°İ
      if ($("#txtBuyPrice").val().length == 0) { alert("¸ÅÀÔ°¡°İÀ» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtBuyPrice").focus(); return false; }
    }
  /*********** ¼­ºñ½º ***********/
  } else if (GroupCd == 11) {

    // »ç¾÷ÀÚ¹øÈ£
    //if ($("#txtBizNumber").val().length == 0) { alert("»ç¾÷ÀÚ¹øÈ£¸¦ ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtBizNumber").focus(); return false; }

    // ºĞ·ùº° Validation
    if (FormCode == 31) {   // Áö¿ª¼Ò½Ä
      // ±â°£
      if ($("#txtSvcStartDate").val().length == 0) { alert("±â°£(½ÃÀÛÀÏ)ÀÏ ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtSvcStartDate").focus(); return false; }
      if ($("#txtSvcEndDate").val().length == 0) { alert("±â°£(Á¾·áÀÏ)ÀÏ ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtSvcEndDate").focus(); return false; }
    }
  }
/*
  // »çÁøµî·Ï
  if (!(FormCode == 13 || FormCode == 14 || FormCode == 30 || FormCode == 31)) {    // ÀÚµ¿Â÷: ¼­ºñ½º/»ó´ã, ¾÷¼ÒÈ«º¸: ¼­ºñ½º/Áö¿ª¼Ò½Ä À» Á¦¿ÜÇÑ ºĞ·ù¿¡¼± »çÁø¾÷·Îµå Ã¼Å©
    if ($("#photolist li").length == 0) { alert("»çÁøµî·ÏÀº ÇÊ¼ö ÀÔ´Ï´Ù."); $("#fileimg").focus(); return false; }
  }
*/
  // Á¦¸ñ
  if ($("#txtTitle").val().length == 0) { alert("Á¦¸ñÀ» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtTitle").focus(); return false; }
  // »ó¼¼Á¤º¸
  if ($("#txtExContents").val().length == 0) { alert("»ó¼¼³»¿ëÀ» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtExContents").focus(); return false; }
  // ¿¬¶ô¹æ¹ı
  if (!$(":checkbox[name='chkContactMethod']").is(":checked")) { alert("¿¬¶ô¹æ¹ıÀ» 1°³ ÀÌ»ó ¼±ÅÃÇØ ÁÖ¼¼¿ä."); $("#divContactMethod").focus(); return false; }
  // ¿¬¶ô¹æ¹ı: Ä«Ä«¿ÀÅå
  if ($("#chkContactMethod4").is(":checked") && $("#txtKakaoId").val().length == 0) { alert("Ä«Ä«¿ÀÅå ¾ÆÀÌµğ¸¦ ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); return false; }
  // Áö¿ª
  if ($("#selAreaA_1 option:selected").val().length == 0) { alert("Áö¿ªÀ» ¼±ÅÃÇØ ÁÖ¼¼¿ä."); $("#selAreaA_1").focus(); return false; }
  if ($("#txtAreaDetail_1").val().length > 0 && $("#hidPointChk").val() == "0" && $("#hidGPoint_X").val().length == 0) { alert("ÁöµµÀ§Ä¡¸¦ ¼±ÅÃÇØÁÖ¼¼¿ä."); $("#txtAreaDetail_1").focus(); return false; }

  // ±âº»ÁÖ¼Ò (´ÙÁßÁÖ¼Ò ÀÔ·ÂÀÌ ¾ø´Â °æ¿ì)
  //if ($("#selAreaA_1 option:selected").val().length == 0 && $("#hidCIAreaA").val().length == 0) { alert("ÁÖ¼ÒÁö°¡ ¾øÀ¸¸é µî·ÏÀÌ ºÒ°¡ÇÕ´Ï´Ù.\nÈ¸¿øÁ¤º¸ ¼öÁ¤À» ÅëÇØ ÁÖ¼Ò¸¦ ÀÔ·ÂÇØÁÖ¼¼¿ä."); return false; }
}

/****************** µî·Ï Submit ******************/
function AdRegSubmit() {
  var f = document.AdRegForm;

  // Validation Ã¼Å©
  if (formValidation(f) == false) { return; }
  //return;

  // À¯·á»óÇ° Ã¼Å©
  if (!$(':radio[name="rdoOptCode"]:checked').is(":checked") && !$(':radio[name="rdoFATCode"]:checked').is(":checked")) { alert("»óÇ°À» ¼±ÅÃÇØ ÁÖ¼¼¿ä."); $("#rdoOptCode40").focus(); return false; }

  // ÀÓ½ÃÀúÀå ¿©ºÎ ÃÊ±âÈ­ (SubmitÈÄ ´Ù½Ã ÀÓ½ÃÀúÀå Ã³¸®¸¦ À§ÇÔ)
  $("#hidTempSaveF").val("0");

  // Submit
  f.target    = "F_ACTION";
  f.method    = "post";
  f.encoding  = "multipart/form-data";
  f.action    = "/include/regist/TempSaveProc.asp";
  f.submit();
}

/****************** ±¤°íµî·Ï: °áÁ¦ÇÏ±â ******************/
function GoPayment() {
  var f = document.PayForm;
  var vTarget = "F_ACTION";

  // Çö±İ¿µ¼öÁõ Ç×¸ñ Ã¼Å©
  if ($(':radio[name="rdoTB_Kind"]:checked').val() == "0") {    // Çö±İ¿µ¼öÁõ ¹ßÇà½ÅÃ»½Ã
    if ($("#txtTB_BuyerName").val().length == 0) {
      alert("Çö±İ¿µ¼öÁõ ¹ßÇàÀ» À§ÇÑ ÀÌ¸§À» ÀÔ·ÂÇØÁÖ¼¼¿ä.");
      $("#txtTB_BuyerName").focus();
      return;
    }
    if ($("#sltTB_Phone1").val().length == 0 || $("#txtTB_Phone2").val().length == 0 || $("#txtTB_Phone3").val().length == 0) {
      alert("Çö±İ¿µ¼öÁõ ¹ßÇàÀ» À§ÇÑ ÈŞ´ëÆù¹øÈ£¸¦ ÀÔ·ÂÇØÁÖ¼¼¿ä.");
      $("#txtTB_BuyerName").focus();
      return;
    }
  } else if ($("#hidPersonalF").val() == '0' && $(':radio[name="rdoTB_Kind"]:checked').val() == "1") { // ¼¼±İ°è»ê¼­ ¹ßÇà½ÅÃ»½Ã (±â¾÷È¸¿ø)
    // È¸»ç¸í
    if ($("#txtTBI_CompanyName").val().length == 0) { alert("È¸»ç¸íÀ» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtTBI_CompanyName").focus(); return; }
    // ´ëÇ¥ÀÚ¸í
    if ($("#txtTBI_CEO").val().length == 0) { alert("´ëÇ¥ÀÚ¸íÀ» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtTBI_CEO").focus(); return; }
    // ¾÷ÅÂ
    if ($("#txtTBI_Type").val().length == 0) { alert("¾÷ÅÂ¸¦ ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtTBI_Type").focus(); return; }
    // Á¾¸ñ
    if ($("#txtTBI_Part").val().length == 0) { alert("Á¾¸ñÀ» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtTBI_Part").focus(); return; }
    // »ç¾÷Àå¼ÒÀçÁö
    if ($("#txtTBI_Address").val().length == 0) { alert("»ç¾÷Àå¼ÒÀçÁö¸¦ ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtTBI_Address").focus(); return; }
    // ´ã´çÀÚ¸í
    if ($("#txtTBI_Manager").val().length == 0) { alert("´ã´çÀÚ¸íÀ» ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtTBI_Manager").focus(); return; }
    // ÀÌ¸ŞÀÏ
    if ($('#txtTBI_Email').val().length == 0) {
      alert("ÀÌ¸ŞÀÏÀ» ÀÔ·ÂÇÏ¼¼¿ä!"); $('#txtTBI_Email').focus(); return; 
    } else {
      if ($('#txtTBI_Email').val().indexOf("@") + "" == "-1" || $('#txtTBI_Email').val().indexOf(".") + "" == "-1") { alert("ÀÌ¸ŞÀÏ ÁÖ¼Ò¸¦ ¿Ç¹Ù¸£°Ô ÀÔ·ÂÇØ ÁÖ¼¼¿ä!"); $('#txtTBI_Email').select();  return;
      }
    }

    // ÇÚµåÆù
    if ($("#sltTBI_Hphone1").val().length == 0) { alert("ÇÚµåÆù¹øÈ£¸¦ ºüÁü¾øÀÌ ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#sltTBI_Hphone1").focus(); return; }
    if ($("#txtTBI_Hphone2").val().length == 0) { alert("ÇÚµåÆù¹øÈ£¸¦ ºüÁü¾øÀÌ ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtTBI_Hphone2").focus(); return; }
    if ($("#txtTBI_Hphone3").val().length == 0) { alert("ÇÚµåÆù¹øÈ£¸¦ ºüÁü¾øÀÌ ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtTBI_Hphone3").focus(); return; }

    // ÀüÈ­¹øÈ£
    if ($("#sltTBI_Phone1").val().length == 0) { alert("ÀüÈ­¹øÈ£¸¦ ºüÁü¾øÀÌ ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#sltTBI_Phone1").focus(); return; }
    if ($("#txtTBI_Phone2").val().length == 0) { alert("ÀüÈ­¹øÈ£¸¦ ºüÁü¾øÀÌ ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtTBI_Phone2").focus(); return; }
    if ($("#txtTBI_Phone3").val().length == 0) { alert("ÀüÈ­¹øÈ£¸¦ ºüÁü¾øÀÌ ÀÔ·ÂÇØ ÁÖ¼¼¿ä."); $("#txtTBI_Phone3").focus(); return; }
    
    // »ç¾÷ÀÚ¹øÈ£ Ã¼Å©
    if ($('#txtTBI_BizNo1').val().length != 3) {  alert("»ç¾÷ÀÚ µî·Ï¹øÈ£1¸¦ ÀÔ·ÂÇÏ¼¼¿ä!"); $('#txtTBI_BizNo1').focus();  return;
    } else if ($('#txtTBI_BizNo2').val().length != 2) { alert("»ç¾÷ÀÚ µî·Ï¹øÈ£2¸¦ ÀÔ·ÂÇÏ¼¼¿ä!"); $('#txtTBI_BizNo2').focus();  return;
    } else if ($('#txtTBI_BizNo3').val().length != 5) { alert("»ç¾÷ÀÚ µî·Ï¹øÈ£3¸¦ ÀÔ·ÂÇÏ¼¼¿ä!"); $('#txtTBI_BizNo3').focus();  return;
    } else {  if (!isBizNo($('#txtTBI_BizNo1').val(), $('#txtTBI_BizNo2').val(), $('#txtTBI_BizNo3').val())) {  alert("»ç¾÷ÀÚµî·Ï¹øÈ£°¡ Àß¸ø ÀÔ·ÂµÇ¾ú½À´Ï´Ù.");  return; }
    }
  }

  // °áÁ¦ÇÏ±â ¹öÆ° ¼û±è
  $(".btb").hide();

  // Á¢¼ÓÀåºñ°¡ ¸ğ¹ÙÀÏ±â±â ¶Ç´Â Å©·Òºê¶ó¿ìÀúÀÎ °æ¿ì
  var agent = navigator.userAgent.toLowerCase();

  if ($("#hidDevice").val() == "M" || agent.indexOf("chrome") != -1) {  // ¸ğ¹ÙÀÏÀÌ³ª Å©·ÒÀÎ°æ¿ì
    vTarget = "_top";
  }

  // Submit
  f.action = "AdRegistProc.asp";
  f.target = vTarget;
  f.method = "post";
  f.submit();
}

/****************** ±¤°íµî·Ï: °áÁ¦¼ö´Ü ¼±ÅÃ ******************/
function FnChargeKind(vChargeKind) {
  if ($("#hidPersonalF").val() == 0) {   // ±â¾÷È¸¿øÀÌ¶ó¸é Çö±İ¿µ¼öÁõ ¹ßÇà½ÅÃ» ¸øÇÏµµ·Ï ¹«Á¶°Ç Disabled
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

/****************** ±¤°íµî·Ï: °áÁ¦Áõºù ¼±ÅÃ ******************/
function FnReceiptKind() {
  var vReceiptKind  = $(':radio[name="rdoTB_Kind"]:checked').val();
  var vChargeKind   = $(':radio[name="rdoChargeKind"]:checked').val();

  // Çö±İ¿µ¼öÁõ ¿Â¶óÀÎ ÀÔ±İ È®ÀÎ
  if (vReceiptKind == "0" && vChargeKind != "1") {
    alert("Çö±İ¿µ¼öÁõÀº ¿Â¶óÀÎÀÔ±İ¸¸ ½ÅÃ»°¡´É ÇÕ´Ï´Ù.");
    $(':radio[name="rdoTB_Kind"]:input[value="1"]').prop("checked", true);
    return;
  }

  if (vReceiptKind == "0") {    // Çö±İ¿µ¼öÁõ ¹ßÇà½ÅÃ»½Ã
    $("#ulReceiptInfo").show();
  } else {
    $("#ulReceiptInfo").hide();
  }
}

/****************** ±¤°íµî·Ï: ÀÌÀü´Ü°è ******************/
function GoBeforeStep() {
  var TsIdx = $("#hidTempSaveIdx").val();

  location.href = "Regist_Step2.asp?TsIdx=" + TsIdx;
}

/****************** ´Ù·®µî·Ï±Ç: ÀÌÀü´Ü°è ******************/
function GoBeforeStepFAT() {
  var f = document.PayForm;

  f.action = "Regist_FAT.asp";
  f.method = "post";
  f.submit();
}

/****************** ´Ù·®µî·Ï±Ç : ´Ù·®µî·Ï±Ç ¼±ÅÃ½Ã °áÁ¦»óÇ°Á¤º¸ ¼ÂÆÃ ******************/
function FnClickFAT(vFatId) {
  var strTerm;
  var intOptTerm = $("#sltFatTerm" + vFatId).val();

  // ³¯Â¥ Ç¥±â
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

  // °ÔÀçÁ¾·áÀÏÀÚ
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

  strTerm = TodayYear + "/" + TodayMonth + "/" + TodayDay + "~" + EndYear + "/" + EndMonth + "/" + EndDay + " (" + intOptTerm + "ÀÏ)";

  // »óÇ°¸í
  $("#SFAT_Name").text($("#tg_FATNm" + vFatId).text());
  // »óÇ°±â°£
  $("#SFAT_Term").text(strTerm);
  // »óÇ°³»¿ë
  $("#SFAT_Contents").text($("#tg_FATDesc" + vFatId).text());
  // »óÇ°°¡°İ
  $("#SFAT_Price").text($("#tg_FATPrice" + vFatId).text());

  $("#rdoFatId").val($("#hidFatID" + vFatId).val());
}

/****************** ´Ù·®µî·Ï±Ç: ±â°£ ¼±ÅÃ ******************/
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
    async: false,         // Ajax Åë½Å ³¡³¯¶§±îÁö Å¸ ÇÔ¼ö ½ÇÇà ¾ÈµÇ´Â ¿É¼Ç
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (result) {
      var arr = result.split("|");
      $("#rdoFatId").val(arr[0]);
      $("#hidFatID" + vId).val(arr[0]);
      $("#tg_FATPrice" + vId).html(arr[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<span>¿ø</span>");

      FnClickFAT(vId);
    }
  });
}

/****************** ´Ù·®µî·Ï±Ç: ´Ù·®µî·Ï±Ç °áÁ¦ÆäÀÌÁö·Î ÀÌµ¿ ******************/
function GoNextFAT(){

  if ($("#rdoFatId").val().length == 0) {
    alert("´Ù·®µî·Ï±Ç »óÇ°À» ¼±ÅÃÇØ ÁÖ¼¼¿ä.");
    return;
  }

  var f = document.FatForm;
  
  f.action = "Regist_FAT_Payment.asp";
  f.method = "post";
  f.submit();
}

/****************** ´Ù·®µî·Ï±Ç: °áÁ¦ÇÏ±â ******************/
function GoFATPayment() {
  var agent = navigator.userAgent.toLowerCase();

  var f = document.PayForm;
  var vTarget = "F_ACTION";

  // ¼¼±İ°è»ê¼­ Ç×¸ñ Ã¼Å©
  if ($(':radio[name="rdoTB_Kind"]:checked').val() == "0") {    // Çö±İ¿µ¼öÁõ ¹ßÇà½ÅÃ»½Ã
    if ($("#txtTB_BuyerName").val().length == 0) {
      alert("Çö±İ¿µ¼öÁõ ¹ßÇàÀ» À§ÇÑ ÀÌ¸§À» ÀÔ·ÂÇØÁÖ¼¼¿ä.");
      $("#txtTB_BuyerName").focus();
      return;
    }
    if ($("#sltTB_Phone1").val().length == 0 || $("#txtTB_Phone2").val().length == 0 || $("#txtTB_Phone3").val().length == 0) {
      alert("Çö±İ¿µ¼öÁõ ¹ßÇàÀ» À§ÇÑ ÈŞ´ëÆù¹øÈ£¸¦ ÀÔ·ÂÇØÁÖ¼¼¿ä.");
      $("#txtTB_BuyerName").focus();
      return;
    }
  }

  // °áÁ¦ÇÏ±â ¹öÆ° ¼û±è
  $(".btb").hide();

  // Á¢¼ÓÀåºñ°¡ ¸ğ¹ÙÀÏ±â±â ¶Ç´Â Å©·Òºê¶ó¿ìÀúÀÎ °æ¿ì
  if ($("#hidDevice").val() == "M" || agent.indexOf("chrome") != -1) {
    vTarget = "_top";
  }

  // Submit
  f.action = "FatRegistProc.asp";
  f.target = vTarget;
  f.method = "post";
  f.submit();
}

/****************** ±¤°í¼öÁ¤: Submit ******************/
function AdModSubmit() {
  var f = document.AdRegForm;

  // Validation Ã¼Å©
  if (formValidation(f) == false) { return; }

  // Submit
  f.target    = "_top";
  f.action    = "AdModifyProc.asp";
  f.encoding  = "multipart/form-data";
  f.method    = "post";
  f.submit();
}

/****************** ±¤°íµî·Ï: ÁöµµÈ®ÀÎ ******************/
function Fn_PointXY_Pop() {
  var AreaA       = $("#selAreaA_1").val();
  var AreaB       = $("#selAreaB_1").val();
  var AreaC       = $("#selAreaC_1").val();
  var AreaDetail  = $("#txtAreaDetail_1").val();

  if (AreaC.length == 0 || AreaDetail.length == 0) {
    alert("ÁÖ¼ÒÁö¸¦ ºüÁü¾øÀÌ ÀÔ·ÂÇØÁÖ¼¼¿ä.");
    return;
  }

  layer_open('Map_Pop');
  MapLoad('selAreaA_1', 'selAreaB_1', 'selAreaC_1', 'txtAreaDetail_1');
}

/****************** ½Ã¼¼°Ë»ö ******************/
function SearchMarketPrice() {
  layer_open('Price_Sc');
}

/****************** Â÷·®¹øÈ£ °Ë»ö ******************/
function SearchCarInfo() {
  if ($("#txtCarNumber").val().length == 0) {
    alert("Â÷·®¹øÈ£¸¦ ÀÔ·ÂÇØÁÖ¼¼¿ä.");
    $("#txtCarNumber").focus();
    return;
  }

  layer_open('Car_Num');
  alert("ÀÛ¾÷Àü");
}

/*************** Áß°íÂ÷ ½Ã¼¼ºĞ·ù ¼ÂÆÃ ***************/
function SetAutoSiseCode(vCode, vStep) {
  $.ajax({
    type: "POST",
    url: "/js/ajax/ajax_AutoSiseCode.asp",
    data: { Code: vCode, Step: vStep },
    dataType: 'html',
    async: false,         // Ajax Åë½Å ³¡³¯¶§±îÁö Å¸ ÇÔ¼ö ½ÇÇà ¾ÈµÇ´Â ¿É¼Ç
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

/*************** Áß°íÂ÷ ½Ã¼¼ºĞ·ù °Ë»ö ***************/
function SearchCarSise() {
  var SCode1 = $("#sltSiseCode1").val();
  var SCode2 = $("#sltSiseCode2").val();

  if (SCode2.length == 0) {
    alert("¸ğµ¨À» ¼±ÅÃÇØÁÖ¼¼¿ä.");
    return;
  }

  $.ajax({
    type: "POST",
    url: "/js/ajax/ajax_AutoSiseResult.asp",
    data: { SiseCode: SCode2 },
    dataType: 'html',
    async: false,         // Ajax Åë½Å ³¡³¯¶§±îÁö Å¸ ÇÔ¼ö ½ÇÇà ¾ÈµÇ´Â ¿É¼Ç
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (result) {
      $("#tbodySise").empty();
      $("#tbodySise").html(result);
    }
  });
}

/*************** Áöµµ API °ü·Ã : ½ÃÀÛ ***************/
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
    alert("ÁÖ¼ÒÁö¸¦ Á¤È®È÷ ÀÔ·ÂÇØÁÖ¼¼¿ä.");
    return;
  }

  if (areaA == "Àü±¹" || areaB == "ÀüÁö¿ª" || areaC == "ÀüÁö¿ª") {
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

          $("#map_view").html("<button type=\"button\" class=\"bt_type2 bt_whi map_reset_bt\" onclick=\"FnMapReset()\"><span class=\"bg_reg map_reset_ico\"></span>¸®¼Â</button><iframe id=\"ifmMap\" name=\"ifmMap\" src=\"/include/regist/MapView.asp?MapX=" + wgs84_posx + "&MapY=" + wgs84_posy + "&PoiNm=" + wgs84_addr + "&MapSizeW=" + iFrmWidth + "&MapSizeH=" + iFrmHeight + "&PageGbn=Regist\" width=\"" + iFrmWidth + "\" height=\"" + iFrmHeight + "\" scrolling=\"no\" frameborder=\"0\"></iframe>");
          $("input[name=hidGPoint_X]").val(wgs84_posx);
          $("input[name=hidGPoint_Y]").val(wgs84_posy);
        },
        error: function (xhr, status, error) {
          MapError('2');
        }
      })
    } else {
      alert("Àß¸øµÈ ÁÖ¼ÒÁö ÀÔ´Ï´Ù..");
      return;
    }
  } else {
    $("#map_view").html("<button type=\"button\" class=\"bt_type2 bt_whi map_reset_bt\" onclick=\"FnMapReset()\"><span class=\"bg_reg map_reset_ico\"></span>¸®¼Â</button><iframe id=\"ifmMap\" name=\"ifmMap\" src=\"/include/regist/MapView.asp?MapX=" + MapX + "&MapY=" + MapY + "&PoiNm=&MapSizeW=" + iFrmWidth + "&MapSizeH=" + iFrmHeight + "&PageGbn=Regist\" width=\"" + iFrmWidth + "\" height=\"" + iFrmHeight + "\" scrolling=\"no\" frameborder=\"0\"></iframe>");
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
    alert("ÁÖ¼Ò¸¦ ÀÔ·ÂÇØÁÖ½Ê½Ã¿À.");
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

// ÁÂÇ¥ ÀúÀå
function FnMapSave() {
  $("#hidPointChk").val("1");

  // ·¹ÀÌ¾î ´İ±â
  $('.ly_pop').hide();
  $('body').css('overflow-y', 'auto');
}

// ÁÂÇ¥ÀúÀå Ãë¼Ò
function FnMapCancel() {
  $("#hidGPoint_X").val($("#hidOrgGPoint_X").val());
  $("#hidGPoint_Y").val($("#hidOrgGPoint_Y").val());

  if($("#hidGPoint_X").val().length == 0 || $("#hidGPoint_X").val() == '0'){
    $("#hidPointChk").val("0");
  }

  // ·¹ÀÌ¾î ´İ±â
  $('.ly_pop').hide();
  $('body').css('overflow-y', 'auto');
}

// Áöµµ ¸®¼Â
function FnMapReset() {
  $('#ifmMap').get(0).contentDocument.location.reload();
}
/*************** Áöµµ API °ü·Ã : ³¡ ***************/

/****************** µô·¯Á¤º¸: ÁöµµÈ®ÀÎ ******************/
function Fn_PointXY_Dealer_Pop() {
  var AreaA = $("#selCity").val();
  var AreaB = $("#selGu").val();
  var AreaC = $("#selDong").val();
  var AreaDetail = $("#txtAddrDetail").val();

  if (AreaC.length == 0 || AreaDetail.length == 0) {
    alert("ÁÖ¼ÒÁö¸¦ ºüÁü¾øÀÌ ÀÔ·ÂÇØÁÖ¼¼¿ä.");
    return;
  }

  layer_open('Map_Pop');
  MapLoad('selCity', 'selGu', 'selDong', 'txtAddrDetail');
}

/****************** »ó¼¼ÁÖ¼Ò º¯°æ(onkeypress)½Ã ÁÂÇ¥ ÃÊ±âÈ­ ******************/
function FnAreaDetailChange(objX, objY) {
  $("#" + objX).val("");
  $("#" + objY).val("");
}

/****************** »çÁøµî·Ï ¹öÆ° Click Event ******************/
function fileBrowse() {
  // This works in IE only. Doesn't do jack in FF. :( 
  var browseField = $("#fileimg");
  browseField.click();
}

/****************** »ç¾÷ÀÚ ¹øÈ£ Ã¼Å© ******************/
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
  if (s_v1 == "206" && s_v2 == "85" && s_v3 == "26551") return false; //¹Ìµğ¾îÀª »ç¾÷ÀÚ µî·Ï¹øÈ£
  if (s_v1.length != 3) return false;
  if (s_v2.length != 2) return false;
  if (s_v3.length != 5) return false;

  var NoCheckNum = "1309516286,"; 	// Ã¼Å©¾ÈµÇ´Â »ç¾÷ÀÚ¹øÈ£ ¿¹¿ÜÃ³¸®

  if (NoCheckNum.indexOf(s_v1 + s_v2 + s_v3) >= 0) {
    return true;
  }

  var num = (s_v1 + s_v2 + s_v3); 	//»ç¾÷ÀÚµî·Ï¹øÈ£¸¦ ºÙÀÔ´Ï´Ù.
  var w_c, w_e, w_f, w_tot;

  w_c = num.charAt(8) * 5; 		// 9¹øÂ°ÀÚ¸®ÀÇ ¼ıÀÚ¿¡ 5¸¦ °öÇÑ´Ù.
  w_e = parseInt((w_c / 10), 10); 	// 10À¸·Î ³ª´©°í 10Áø¼ö ÇüÅÂÀÇ ¼ıÀÚÇüÀ¸·Î ..³ª´«¸ò
  w_f = w_c % 10; 					// 10À¸·Î ³ª´« ³ª¸ÓÁö.
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

  if (!(w_tot % 10)) {				// 10À¸·Î ³ª´©¾î Áö¸é true¸¦ ±×·¸Áö ¾ÊÀ¸¸é false
    return true;
  } else {
    return false;
  }
}

// Â÷·®¹øÈ£°¡ Á¤±Ô½Ä¿¡ ¸Â´ÂÁö Ã¼Å©
function chkCarNo(CarNo) {

  CarNo = CarNo.replace(/\s/g, ""); //°ø¹éÁ¦°Å

  var isGoodNo = false;
 
  // Çü½Ä1 Ã¼Å© : ÇÑ±Û2ÀÚ + 01~99 + ÇÑ±Û1ÀÚ + 00~99 + 00~99
  if (CarNo.match(/[°¡-ÆR]{2}[0-9]{1}[0-9]{1}[°¡-ÆR]{1}[0-9]{4}/g) == CarNo) {
    isGoodNo = true;
  }

  // Çü½Ä2 Ã¼Å© : 01~99 + ÇÑ±Û1ÀÚ +00~99 + 00~99
  if (CarNo.match(/[0-9]{1}[0-9]{1}[°¡-ÆR]{1}[0-9]{4}/g) == CarNo) {
    isGoodNo = true;
  }

  // Çü½Ä3 Ã¼Å© : ÀÓ + ¼ıÀÚ6ÀÚ¸®
  if (CarNo.match(/[ÀÓ]{1}[0-9]{6}/g) == CarNo) {
    isGoodNo = true;
  }

  return isGoodNo;
}

// ÁÖ¼ÒÁö Áßº¹ Ã¼Å©
function FnAreaSameCheck(obj,id) {
  var SelVal = obj.value;

  var AreaC1 = $("#selAreaC_1").val();
  var AreaC2 = $("#selAreaC_2").val();
  var AreaC3 = $("#selAreaC_3").val();

  // µÎ¹øÂ° Ãß°¡Áö¿ª Ã¼Å©½Ã
  if(id == 2){
    if (AreaC1 == SelVal) {
      alert("°°Àº Áö¿ªÀ» ¼±ÅÃÇÏ¼Ì½À´Ï´Ù. ´Ù¸¥ Áö¿ªÀ¸·Î Ãß°¡ÇØ ÁÖ¼¼¿ä");
      obj.value = "";
      return;
    }    
  }else{  // ¼¼¹øÂ° Ãß°¡Áö¿ª Ã¼Å©½Ã
    if (AreaC1 == SelVal || AreaC2 == SelVal) {
      alert("°°Àº Áö¿ªÀ» ¼±ÅÃÇÏ¼Ì½À´Ï´Ù. ´Ù¸¥ Áö¿ªÀ¸·Î Ãß°¡ÇØ ÁÖ¼¼¿ä");
      obj.value = "";
      return;
    }    
  }
}

// Áß°í°Å·¡ ÆÇ¸Å(¹«·á) Á¤Ã¥
function FnFreeCheck() {
  if ($("#chkFreeF").is(":checked")) {
    $("#txtSalePrice").val("");
    $("#txtSalePrice").prop("readonly", true);
    return;
  } else {
    $("#txtSalePrice").prop("readonly", false);
  }
}

// ¼º´ÉÁ¡°Ë±â·ÏºÎ ÀÌ¹ÌÁö »èÁ¦
function FnDelPerformanceDoc() {
  if(confirm("¼º´ÉÁ¡°Ë±â·ÏºÎ¸¦ »èÁ¦ÇÏ½Ã°Ú½À´Ï±î?\n(»èÁ¦µÈ ÆÄÀÏÀº º¹±¸°¡ ºÒ°¡´ÉÇÕ´Ï´Ù.)")){
    $("#hidPerformanceDoc_DelF").val("1");
    $("#ulPerformanceDoc").hide();
  }
}

//ÄŞ¸¶Âï±â
function comma(str) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

//ÄŞ¸¶Ç®±â
function uncomma(str) {
  str = String(str);
  return str.replace(/[^\d]+/g, '');
}

function inputNumberFormat(obj) {
  obj.value = comma(uncomma(obj.value));
}