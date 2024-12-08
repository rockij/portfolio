/****************** ���� �ҷ����� ******************/
function SetLoadAd(vLineAdNo) {
  location.href = "Regist_Step2.asp?LineAdNo=" + vLineAdNo;
}

/****************** �ӽ����� ******************/
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
           async: false,         // Ajax ��� ���������� Ÿ �Լ� ���� �ȵǴ� �ɼ�
           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',   // ���ڵ� ���
           success: function (data) {                                          // �������� �ѷ��ش�.
             //$("#datatable").html(data);
             alert(data);
           }
           ,error : function(errMsg,a,b) {                                        // ������ alert â���� ���� �˸�
             alert("����:" + b);
           }
         });
  */
}

/****************** ����/��ü���� �����ϱ� ******************/
function ModCompanyInfo() {
  var f = document.frmDealer;

  var FieldNm = $("#hidDealerAddressNm").val();

  if ($("#hidScode").val() == "S104") {         // �ڵ��� ��������
    if ($("#txtManageNumber").val().length == 0) {
      alert("[�������ȣ]�� �Է��� �ּ���."); $("#txtManageNumber").focus(); return;
    }
  }

  if ($("#selCity").val().length == 0) {
    alert("[" + FieldNm + "]�� ������ �ּ���."); $("#selCity").focus(); return;
  }
  if ($("#selGu").val().length == 0) {
    alert("[" + FieldNm + "]�� �������� ������ �ּ���."); $("#selGu").focus(); return;
  }
  if ($("#selDong").val().length == 0) {
    alert("[" + FieldNm + "]�� ������ �ּ���."); $("#selDong").focus(); return;
  }

  f.method = "post";
  f.action = "BizInfo_ModProc.asp";
  f.encoding = "multipart/form-data";
  f.submit();
}

/****************** Ķ���� ******************/
function fnPopUpCalendar(idx) {
  $.datepicker.regional['ko'] = { closeText: '�ݱ�', prevText: '������', nextText: '������', currentText: '����', monthNames: ['1��', '2��', '3��', '4��', '5��', '6��', '7��', '8��', '9��', '10��', '11��', '12��'], monthNamesShort: ['1��', '2��', '3��', '4��', '5��', '6��', '7��', '8��', '9��', '10��', '11��', '12��'], dayNames: ['��', '��', 'ȭ', '��', '��', '��', '��'], dayNamesShort: ['��', '��', 'ȭ', '��', '��', '��', '��'], dayNamesMin: ['��', '��', 'ȭ', '��', '��', '��', '��'], weekHeader: 'Wk', dateFormat: 'yy-mm-dd', firstDay: 0, isRTL: false, duration: 200, showAnim: 'show', showMonthAfterYear: true, yearSuffix: '��' }; $.datepicker.setDefaults($.datepicker.regional['ko']);
  /* jquery.ui.datepicker �ɼǼ����ϱ� , �ڼ��� �ɼ��� API���� ����.*/
  $(idx).datepicker({
    showOn: "button", //�̹����� ��� , both : ������Ʈ�� �̹��� ���û��
    buttonImage: "http://image.findall.co.kr/FAImage/job/advertiser/btn/btn_calendar.gif", //��ư���� ����� �̹��� ���
    buttonImageOnly: true, //�̹����� ���̱�
    onSelect: function (date) {
      if (idx == "#txtRecuitEndDate") {
        changeStartDate();
      }
    }
  });
  //datepicker���� ����� �̹��� ��ư style����
  $("img.ui-datepicker-trigger").attr("style", "margin-left:5px; vertical-align:middle; cursor:pointer;");
}

/****************** �̹������ε� ******************/
$("#fileimg").change(function () {
  var f = document.AdRegForm;
  var imgLimit = $("#hidImgLimit").val();

  $("#tmpfilenm").val($("#fileimg").val());
  if ($("#photolist li").length >= imgLimit) {
    alert("�̹��� ÷�δ� �ִ� " + imgLimit + "�� ���� �����մϴ�.");
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
    alert("�̹��� ����� �Ұ��� �÷��� �Դϴ�.");
    return;
  }

  $("#fileimg").replaceWith($("#fileimg").clone(true));
  f.target = "";
});

/****************** �̹������� ******************/
function delImg(obj) {
  idx = $("#photolist").children("li").index($(obj).parent().parent())

  $("#photolist").children("li").eq(idx).remove();
  $("#filelist").children("input").eq(idx).remove();

  $("#RegImageCnt").text($("#photolist li").length);
}

/****************** �߰��̹��� ���� ******************/
function addPhotoList(filename) {
  $("#photolist").append("<li><div class='thum_img'><img src='" + filename + "'><button type='button' class='bg_reg reg_thum_del_bt' onclick='delImg(this,$(this).parent().index(this));return false;'></button></div></li>");

  $("#photolist").append("");
  $("#fileimg").val("");
  $("#filelist").append("<input type='hidden' name='files' value='" + filename + "'>")
  $("#tmpfilenm").val("");

  $("#RegImageCnt").text($("#photolist li").length);
}

/****************** ��������: ���� ******************/
function SetCarColor() {
  $("#txtColor").val($("#sltColor").val());
}

/****************** �ɼ� ���ý� ������ǰ���� ���� ******************/
function FnClickOpt(vObj) {

  // �ٷ���ϱ� üũ ����
  $(':radio[name="rdoFATCode"]:checked').prop("checked", false);

  var OptCode = vObj.value;
  var intOptTerm = $("#OptInfo_OptTerm" + OptCode).val();
  var PubTerm;

  // ��¥ ǥ��
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

  // ������������
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

  // �߰�ŷ�, ������ �̶��
  if ($("#hidGroupCd").val() == 10 && $(':radio[name="rdoOptCode"]:checked').val() == 0) {
    PubTerm = TodayYear + "/" + TodayMonth + "/" + TodayDay + " ~ " + "���� �� ����";
  } else {
    PubTerm = TodayYear + "/" + TodayMonth + "/" + TodayDay + " ~ " + EndYear + "/" + EndMonth + "/" + EndDay + " (" + intOptTerm + "��)";
  }

  // ������ǰ ����
  $("#PayInfo_OptName").text($("#OptInfo_Name" + OptCode).text());
  $("#PayInfo_OptTerm").text(PubTerm);
  $("#PayInfo_Desc").text($("#OptInfo_Desc" + OptCode).text());
  $("#PayInfo_Price").text($("#OptInfo_Price" + OptCode).text());
}

/****************** �ٷ���ϱ� ���ý� ������ǰ���� ���� ******************/
function FnClickOptFAT(vObj) {

  // �ɼ� üũ ����
  $(':radio[name="rdoOptCode"]:checked').prop("checked", false);

  var OptCode = vObj.value;
  var intOptTerm = $("#OptInfo_FATTerm" + OptCode).val();
  var PubTerm;

  // ��¥ ǥ��
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

  // ������������
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

  PubTerm = TodayYear + "/" + TodayMonth + "/" + TodayDay + "~" + EndYear + "/" + EndMonth + "/" + EndDay + " (" + intOptTerm + "��)";

  // ������ǰ ����
  $("#PayInfo_OptName").text($("#FATInfo_Name" + OptCode).text());
  $("#PayInfo_OptTerm").text(PubTerm);
  $("#PayInfo_Desc").text($("#FATInfo_Desc" + OptCode).text());
  //$("#PayInfo_Price").text($("#FATInfo_Price" + OptCode).text());
  $("#PayInfo_Price").text("0��");

}

/****************** Validation üũ ******************/
function formValidation() {
  var FormCode = $("#hidFormCode").val();         // �з��� ���ڵ�
  var GroupCd = $("#hidGroupCd").val();           // �����ڵ�

  /*********** �ڵ��� ***********/
  if (GroupCd == 12) {   // �ڵ���

    // �з��� Validation
    if (FormCode == 10 || FormCode == 11) {    // �ڵ��� �Ǹ� / ������� �Ǹ�
      // ������ȣ
      if (FormCode == 10 && $("#txtCarNumber").val().length == 0) { alert("������ȣ�� �Է��� �ּ���."); $("#txtCarNumber").focus(); return false; }
      if (!chkCarNo($("#txtCarNumber").val())) {  alert("�������� ������ȣ�� �ƴմϴ�.\n������ȣ�� Ȯ�����ּ���."); $("#txtCarNumber").focus(); return false; }
      // �ǸŰ���
      if ($("#txtSalePrice").val().length == 0) { alert("�ǸŰ����� �Է��� �ּ���."); $("#txtSalePrice").focus(); return false; }
      // ������/������/��
      if ($("#txtMaker").val().length == 0) { alert("�����縦 �Է��� �ּ���."); $("#txtMaker").focus(); return false; }
      if ($("#txtModel").val().length == 0) { alert("�𵨸��� �Է��� �ּ���."); $("#txtModel").focus(); return false; }
      if (FormCode == 10 && $("#txtClass").val().length == 0) { alert("����� �Է��� �ּ���."); $("#txtClass").focus(); return false; }
      // ����
      if ($("#sltMakeYear").val().length == 0) { alert("������ �Է��� �ּ���."); $("#sltMakeYear").focus(); return false; }
      // ����
      if ($("#sltMakeMonth").val().length == 0) { alert("������ �Է��� �ּ���."); $("#sltMakeMonth").focus(); return false; }
      // ���ӱ�
      if (!$(':radio[name="rdoTransMission"]:checked').is(":checked")) { alert("���ӱ⸦ ������ �ּ���."); $("#divTransMission").focus(); return false; }
      // ����
      if (!$(':radio[name="rdoFuel"]:checked').is(":checked")) { alert("���Ḧ ������ �ּ���."); $("#divFuel").focus(); return false; }
      // ��ⷮ
      if ($("#txtDisplacement").val().length == 0) { alert("��ⷮ�� �Է��� �ּ���."); $("#txtDisplacement").focus(); return false; }
      // ����Ÿ�
      if ($("#txtMileage").val().length == 0) { alert("����Ÿ��� �Է��� �ּ���."); $("#txtMileage").focus(); return false; }
      // ����
      if ($("#txtColor").val().length == 0) { alert("������ �Է��� �ּ���."); $("#txtColor").focus(); return false; }
      // �����
      if (!$(':radio[name="rdoAccident"]:checked').is(":checked")) { alert("����θ� ������ �ּ���."); $("#divAccident").focus(); return false; }
      // �Ǹű���
      if (!$(':radio[name="rdoSaleKind"]:checked').is(":checked")) { alert("�Ǹű����� ������ �ּ���."); $("#divSaleKind").focus(); return false; }
    } else if (FormCode == 12) {    // ������� ����
      // ���԰���
      if ($("#txtBuyPrice").val().length == 0) { alert("���԰����� �Է��� �ּ���."); $("#txtBuyPrice").focus(); return false; }
      // ������/��
      if ($("#txtMaker").val().length == 0) { alert("�����縦 �Է��� �ּ���."); $("#txtMaker").focus(); return false; }
      if ($("#txtModel").val().length == 0) { alert("�𵨸��� �Է��� �ּ���."); $("#txtModel").focus(); return false; }
    } else if (FormCode == 13 || FormCode == 14) {   // ���� / ���
      // ���/���� ����
      if ($("#txtServiceName").val().length == 0) { alert("���/���� ������ �Է��� �ּ���."); $("#txtServiceName").focus(); return false; }
    }
  /*********** ��ǰ ***********/
  } else if (GroupCd == 10) {
    // ����
    if ($("#txtQuantity").val().length == 0) { alert("������ �Է��� �ּ���."); $("#txtQuantity").focus(); return false; }
    if ($("#txtQuantity").val() == 0) { alert("�Ǹż����� 1�� �̻���� ��� �����մϴ�."); $("#txtQuantity").val("");  $("#txtQuantity").focus(); return false; }
    // �ŷ����
    if (!$(':checkbox[name="chkTradeKind"]:checked').is(":checked")) { alert("�ŷ������ 1�� �̻� ������ �ּ���."); $("#divTradeKind").focus(); return false; }

    // �з��� Validation
    if (FormCode == 20) {   // �Ǹ�
      // ��ǰ����
      if (!$(':checkbox[name="chkGoodsStatus"]:checked').is(":checked")) { alert("��ǰ���¸� 1�� �̻� ������ �ּ���."); $("#divGoodsStatus").focus(); return false; }
      // �ǸŰ���
      if (!$("#chkFreeF").is(":checked")) { // ���ᰡ �ƴ϶��
        if ($("#txtSalePrice").val().length == 0 || $("#txtSalePrice").val() < 1000) { alert("��Ȯ�� ������ �Է��� �ּ���.\n1000�� �̻���� �Է��� �� �ֽ��ϴ�."); $("#txtSalePrice").focus(); return false; }
      }
    } else if (FormCode == 21) {  // ����
      // ���԰���
      if ($("#txtBuyPrice").val().length == 0) { alert("���԰����� �Է��� �ּ���."); $("#txtBuyPrice").focus(); return false; }
    }
  /*********** ���� ***********/
  } else if (GroupCd == 11) {

    // ����ڹ�ȣ
    //if ($("#txtBizNumber").val().length == 0) { alert("����ڹ�ȣ�� �Է��� �ּ���."); $("#txtBizNumber").focus(); return false; }

    // �з��� Validation
    if (FormCode == 31) {   // �����ҽ�
      // �Ⱓ
      if ($("#txtSvcStartDate").val().length == 0) { alert("�Ⱓ(������)�� �Է��� �ּ���."); $("#txtSvcStartDate").focus(); return false; }
      if ($("#txtSvcEndDate").val().length == 0) { alert("�Ⱓ(������)�� �Է��� �ּ���."); $("#txtSvcEndDate").focus(); return false; }
    }
  }
/*
  // �������
  if (!(FormCode == 13 || FormCode == 14 || FormCode == 30 || FormCode == 31)) {    // �ڵ���: ����/���, ����ȫ��: ����/�����ҽ� �� ������ �з����� �������ε� üũ
    if ($("#photolist li").length == 0) { alert("��������� �ʼ� �Դϴ�."); $("#fileimg").focus(); return false; }
  }
*/
  // ����
  if ($("#txtTitle").val().length == 0) { alert("������ �Է��� �ּ���."); $("#txtTitle").focus(); return false; }
  // ������
  if ($("#txtExContents").val().length == 0) { alert("�󼼳����� �Է��� �ּ���."); $("#txtExContents").focus(); return false; }
  // �������
  if (!$(":checkbox[name='chkContactMethod']").is(":checked")) { alert("��������� 1�� �̻� ������ �ּ���."); $("#divContactMethod").focus(); return false; }
  // �������: īī����
  if ($("#chkContactMethod4").is(":checked") && $("#txtKakaoId").val().length == 0) { alert("īī���� ���̵� �Է��� �ּ���."); return false; }
  // ����
  if ($("#selAreaA_1 option:selected").val().length == 0) { alert("������ ������ �ּ���."); $("#selAreaA_1").focus(); return false; }
  if ($("#txtAreaDetail_1").val().length > 0 && $("#hidPointChk").val() == "0" && $("#hidGPoint_X").val().length == 0) { alert("������ġ�� �������ּ���."); $("#txtAreaDetail_1").focus(); return false; }

  // �⺻�ּ� (�����ּ� �Է��� ���� ���)
  //if ($("#selAreaA_1 option:selected").val().length == 0 && $("#hidCIAreaA").val().length == 0) { alert("�ּ����� ������ ����� �Ұ��մϴ�.\nȸ������ ������ ���� �ּҸ� �Է����ּ���."); return false; }
}

/****************** ��� Submit ******************/
function AdRegSubmit() {
  var f = document.AdRegForm;

  // Validation üũ
  if (formValidation(f) == false) { return; }
  //return;

  // �����ǰ üũ
  if (!$(':radio[name="rdoOptCode"]:checked').is(":checked") && !$(':radio[name="rdoFATCode"]:checked').is(":checked")) { alert("��ǰ�� ������ �ּ���."); $("#rdoOptCode40").focus(); return false; }

  // �ӽ����� ���� �ʱ�ȭ (Submit�� �ٽ� �ӽ����� ó���� ����)
  $("#hidTempSaveF").val("0");

  // Submit
  f.target    = "F_ACTION";
  f.method    = "post";
  f.encoding  = "multipart/form-data";
  f.action    = "/include/regist/TempSaveProc.asp";
  f.submit();
}

/****************** ������: �����ϱ� ******************/
function GoPayment() {
  var f = document.PayForm;
  var vTarget = "F_ACTION";

  // ���ݿ����� �׸� üũ
  if ($(':radio[name="rdoTB_Kind"]:checked').val() == "0") {    // ���ݿ����� �����û��
    if ($("#txtTB_BuyerName").val().length == 0) {
      alert("���ݿ����� ������ ���� �̸��� �Է����ּ���.");
      $("#txtTB_BuyerName").focus();
      return;
    }
    if ($("#sltTB_Phone1").val().length == 0 || $("#txtTB_Phone2").val().length == 0 || $("#txtTB_Phone3").val().length == 0) {
      alert("���ݿ����� ������ ���� �޴�����ȣ�� �Է����ּ���.");
      $("#txtTB_BuyerName").focus();
      return;
    }
  } else if ($("#hidPersonalF").val() == '0' && $(':radio[name="rdoTB_Kind"]:checked').val() == "1") { // ���ݰ�꼭 �����û�� (���ȸ��)
    // ȸ���
    if ($("#txtTBI_CompanyName").val().length == 0) { alert("ȸ����� �Է��� �ּ���."); $("#txtTBI_CompanyName").focus(); return; }
    // ��ǥ�ڸ�
    if ($("#txtTBI_CEO").val().length == 0) { alert("��ǥ�ڸ��� �Է��� �ּ���."); $("#txtTBI_CEO").focus(); return; }
    // ����
    if ($("#txtTBI_Type").val().length == 0) { alert("���¸� �Է��� �ּ���."); $("#txtTBI_Type").focus(); return; }
    // ����
    if ($("#txtTBI_Part").val().length == 0) { alert("������ �Է��� �ּ���."); $("#txtTBI_Part").focus(); return; }
    // ����������
    if ($("#txtTBI_Address").val().length == 0) { alert("������������ �Է��� �ּ���."); $("#txtTBI_Address").focus(); return; }
    // ����ڸ�
    if ($("#txtTBI_Manager").val().length == 0) { alert("����ڸ��� �Է��� �ּ���."); $("#txtTBI_Manager").focus(); return; }
    // �̸���
    if ($('#txtTBI_Email').val().length == 0) {
      alert("�̸����� �Է��ϼ���!"); $('#txtTBI_Email').focus(); return; 
    } else {
      if ($('#txtTBI_Email').val().indexOf("@") + "" == "-1" || $('#txtTBI_Email').val().indexOf(".") + "" == "-1") { alert("�̸��� �ּҸ� �ǹٸ��� �Է��� �ּ���!"); $('#txtTBI_Email').select();  return;
      }
    }

    // �ڵ���
    if ($("#sltTBI_Hphone1").val().length == 0) { alert("�ڵ�����ȣ�� �������� �Է��� �ּ���."); $("#sltTBI_Hphone1").focus(); return; }
    if ($("#txtTBI_Hphone2").val().length == 0) { alert("�ڵ�����ȣ�� �������� �Է��� �ּ���."); $("#txtTBI_Hphone2").focus(); return; }
    if ($("#txtTBI_Hphone3").val().length == 0) { alert("�ڵ�����ȣ�� �������� �Է��� �ּ���."); $("#txtTBI_Hphone3").focus(); return; }

    // ��ȭ��ȣ
    if ($("#sltTBI_Phone1").val().length == 0) { alert("��ȭ��ȣ�� �������� �Է��� �ּ���."); $("#sltTBI_Phone1").focus(); return; }
    if ($("#txtTBI_Phone2").val().length == 0) { alert("��ȭ��ȣ�� �������� �Է��� �ּ���."); $("#txtTBI_Phone2").focus(); return; }
    if ($("#txtTBI_Phone3").val().length == 0) { alert("��ȭ��ȣ�� �������� �Է��� �ּ���."); $("#txtTBI_Phone3").focus(); return; }
    
    // ����ڹ�ȣ üũ
    if ($('#txtTBI_BizNo1').val().length != 3) {  alert("����� ��Ϲ�ȣ1�� �Է��ϼ���!"); $('#txtTBI_BizNo1').focus();  return;
    } else if ($('#txtTBI_BizNo2').val().length != 2) { alert("����� ��Ϲ�ȣ2�� �Է��ϼ���!"); $('#txtTBI_BizNo2').focus();  return;
    } else if ($('#txtTBI_BizNo3').val().length != 5) { alert("����� ��Ϲ�ȣ3�� �Է��ϼ���!"); $('#txtTBI_BizNo3').focus();  return;
    } else {  if (!isBizNo($('#txtTBI_BizNo1').val(), $('#txtTBI_BizNo2').val(), $('#txtTBI_BizNo3').val())) {  alert("����ڵ�Ϲ�ȣ�� �߸� �ԷµǾ����ϴ�.");  return; }
    }
  }

  // �����ϱ� ��ư ����
  $(".btb").hide();

  // ������� ����ϱ�� �Ǵ� ũ�Һ������� ���
  var agent = navigator.userAgent.toLowerCase();

  if ($("#hidDevice").val() == "M" || agent.indexOf("chrome") != -1) {  // ������̳� ũ���ΰ��
    vTarget = "_top";
  }

  // Submit
  f.action = "AdRegistProc.asp";
  f.target = vTarget;
  f.method = "post";
  f.submit();
}

/****************** ������: �������� ���� ******************/
function FnChargeKind(vChargeKind) {
  if ($("#hidPersonalF").val() == 0) {   // ���ȸ���̶�� ���ݿ����� �����û ���ϵ��� ������ Disabled
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

/****************** ������: �������� ���� ******************/
function FnReceiptKind() {
  var vReceiptKind  = $(':radio[name="rdoTB_Kind"]:checked').val();
  var vChargeKind   = $(':radio[name="rdoChargeKind"]:checked').val();

  // ���ݿ����� �¶��� �Ա� Ȯ��
  if (vReceiptKind == "0" && vChargeKind != "1") {
    alert("���ݿ������� �¶����Աݸ� ��û���� �մϴ�.");
    $(':radio[name="rdoTB_Kind"]:input[value="1"]').prop("checked", true);
    return;
  }

  if (vReceiptKind == "0") {    // ���ݿ����� �����û��
    $("#ulReceiptInfo").show();
  } else {
    $("#ulReceiptInfo").hide();
  }
}

/****************** ������: �����ܰ� ******************/
function GoBeforeStep() {
  var TsIdx = $("#hidTempSaveIdx").val();

  location.href = "Regist_Step2.asp?TsIdx=" + TsIdx;
}

/****************** �ٷ���ϱ�: �����ܰ� ******************/
function GoBeforeStepFAT() {
  var f = document.PayForm;

  f.action = "Regist_FAT.asp";
  f.method = "post";
  f.submit();
}

/****************** �ٷ���ϱ� : �ٷ���ϱ� ���ý� ������ǰ���� ���� ******************/
function FnClickFAT(vFatId) {
  var strTerm;
  var intOptTerm = $("#sltFatTerm" + vFatId).val();

  // ��¥ ǥ��
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

  // ������������
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

  strTerm = TodayYear + "/" + TodayMonth + "/" + TodayDay + "~" + EndYear + "/" + EndMonth + "/" + EndDay + " (" + intOptTerm + "��)";

  // ��ǰ��
  $("#SFAT_Name").text($("#tg_FATNm" + vFatId).text());
  // ��ǰ�Ⱓ
  $("#SFAT_Term").text(strTerm);
  // ��ǰ����
  $("#SFAT_Contents").text($("#tg_FATDesc" + vFatId).text());
  // ��ǰ����
  $("#SFAT_Price").text($("#tg_FATPrice" + vFatId).text());

  $("#rdoFatId").val($("#hidFatID" + vFatId).val());
}

/****************** �ٷ���ϱ�: �Ⱓ ���� ******************/
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
    async: false,         // Ajax ��� ���������� Ÿ �Լ� ���� �ȵǴ� �ɼ�
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (result) {
      var arr = result.split("|");
      $("#rdoFatId").val(arr[0]);
      $("#hidFatID" + vId).val(arr[0]);
      $("#tg_FATPrice" + vId).html(arr[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<span>��</span>");

      FnClickFAT(vId);
    }
  });
}

/****************** �ٷ���ϱ�: �ٷ���ϱ� ������������ �̵� ******************/
function GoNextFAT(){

  if ($("#rdoFatId").val().length == 0) {
    alert("�ٷ���ϱ� ��ǰ�� ������ �ּ���.");
    return;
  }

  var f = document.FatForm;
  
  f.action = "Regist_FAT_Payment.asp";
  f.method = "post";
  f.submit();
}

/****************** �ٷ���ϱ�: �����ϱ� ******************/
function GoFATPayment() {
  var agent = navigator.userAgent.toLowerCase();

  var f = document.PayForm;
  var vTarget = "F_ACTION";

  // ���ݰ�꼭 �׸� üũ
  if ($(':radio[name="rdoTB_Kind"]:checked').val() == "0") {    // ���ݿ����� �����û��
    if ($("#txtTB_BuyerName").val().length == 0) {
      alert("���ݿ����� ������ ���� �̸��� �Է����ּ���.");
      $("#txtTB_BuyerName").focus();
      return;
    }
    if ($("#sltTB_Phone1").val().length == 0 || $("#txtTB_Phone2").val().length == 0 || $("#txtTB_Phone3").val().length == 0) {
      alert("���ݿ����� ������ ���� �޴�����ȣ�� �Է����ּ���.");
      $("#txtTB_BuyerName").focus();
      return;
    }
  }

  // �����ϱ� ��ư ����
  $(".btb").hide();

  // ������� ����ϱ�� �Ǵ� ũ�Һ������� ���
  if ($("#hidDevice").val() == "M" || agent.indexOf("chrome") != -1) {
    vTarget = "_top";
  }

  // Submit
  f.action = "FatRegistProc.asp";
  f.target = vTarget;
  f.method = "post";
  f.submit();
}

/****************** �������: Submit ******************/
function AdModSubmit() {
  var f = document.AdRegForm;

  // Validation üũ
  if (formValidation(f) == false) { return; }

  // Submit
  f.target    = "_top";
  f.action    = "AdModifyProc.asp";
  f.encoding  = "multipart/form-data";
  f.method    = "post";
  f.submit();
}

/****************** ������: ����Ȯ�� ******************/
function Fn_PointXY_Pop() {
  var AreaA       = $("#selAreaA_1").val();
  var AreaB       = $("#selAreaB_1").val();
  var AreaC       = $("#selAreaC_1").val();
  var AreaDetail  = $("#txtAreaDetail_1").val();

  if (AreaC.length == 0 || AreaDetail.length == 0) {
    alert("�ּ����� �������� �Է����ּ���.");
    return;
  }

  layer_open('Map_Pop');
  MapLoad('selAreaA_1', 'selAreaB_1', 'selAreaC_1', 'txtAreaDetail_1');
}

/****************** �ü��˻� ******************/
function SearchMarketPrice() {
  layer_open('Price_Sc');
}

/****************** ������ȣ �˻� ******************/
function SearchCarInfo() {
  if ($("#txtCarNumber").val().length == 0) {
    alert("������ȣ�� �Է����ּ���.");
    $("#txtCarNumber").focus();
    return;
  }

  layer_open('Car_Num');
  alert("�۾���");
}

/*************** �߰��� �ü��з� ���� ***************/
function SetAutoSiseCode(vCode, vStep) {
  $.ajax({
    type: "POST",
    url: "/js/ajax/ajax_AutoSiseCode.asp",
    data: { Code: vCode, Step: vStep },
    dataType: 'html',
    async: false,         // Ajax ��� ���������� Ÿ �Լ� ���� �ȵǴ� �ɼ�
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

/*************** �߰��� �ü��з� �˻� ***************/
function SearchCarSise() {
  var SCode1 = $("#sltSiseCode1").val();
  var SCode2 = $("#sltSiseCode2").val();

  if (SCode2.length == 0) {
    alert("���� �������ּ���.");
    return;
  }

  $.ajax({
    type: "POST",
    url: "/js/ajax/ajax_AutoSiseResult.asp",
    data: { SiseCode: SCode2 },
    dataType: 'html',
    async: false,         // Ajax ��� ���������� Ÿ �Լ� ���� �ȵǴ� �ɼ�
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (result) {
      $("#tbodySise").empty();
      $("#tbodySise").html(result);
    }
  });
}

/*************** ���� API ���� : ���� ***************/
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
    alert("�ּ����� ��Ȯ�� �Է����ּ���.");
    return;
  }

  if (areaA == "����" || areaB == "������" || areaC == "������") {
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

          $("#map_view").html("<button type=\"button\" class=\"bt_type2 bt_whi map_reset_bt\" onclick=\"FnMapReset()\"><span class=\"bg_reg map_reset_ico\"></span>����</button><iframe id=\"ifmMap\" name=\"ifmMap\" src=\"/include/regist/MapView.asp?MapX=" + wgs84_posx + "&MapY=" + wgs84_posy + "&PoiNm=" + wgs84_addr + "&MapSizeW=" + iFrmWidth + "&MapSizeH=" + iFrmHeight + "&PageGbn=Regist\" width=\"" + iFrmWidth + "\" height=\"" + iFrmHeight + "\" scrolling=\"no\" frameborder=\"0\"></iframe>");
          $("input[name=hidGPoint_X]").val(wgs84_posx);
          $("input[name=hidGPoint_Y]").val(wgs84_posy);
        },
        error: function (xhr, status, error) {
          MapError('2');
        }
      })
    } else {
      alert("�߸��� �ּ��� �Դϴ�..");
      return;
    }
  } else {
    $("#map_view").html("<button type=\"button\" class=\"bt_type2 bt_whi map_reset_bt\" onclick=\"FnMapReset()\"><span class=\"bg_reg map_reset_ico\"></span>����</button><iframe id=\"ifmMap\" name=\"ifmMap\" src=\"/include/regist/MapView.asp?MapX=" + MapX + "&MapY=" + MapY + "&PoiNm=&MapSizeW=" + iFrmWidth + "&MapSizeH=" + iFrmHeight + "&PageGbn=Regist\" width=\"" + iFrmWidth + "\" height=\"" + iFrmHeight + "\" scrolling=\"no\" frameborder=\"0\"></iframe>");
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
    alert("�ּҸ� �Է����ֽʽÿ�.");
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

// ��ǥ ����
function FnMapSave() {
  $("#hidPointChk").val("1");

  // ���̾� �ݱ�
  $('.ly_pop').hide();
  $('body').css('overflow-y', 'auto');
}

// ��ǥ���� ���
function FnMapCancel() {
  $("#hidGPoint_X").val($("#hidOrgGPoint_X").val());
  $("#hidGPoint_Y").val($("#hidOrgGPoint_Y").val());

  if($("#hidGPoint_X").val().length == 0 || $("#hidGPoint_X").val() == '0'){
    $("#hidPointChk").val("0");
  }

  // ���̾� �ݱ�
  $('.ly_pop').hide();
  $('body').css('overflow-y', 'auto');
}

// ���� ����
function FnMapReset() {
  $('#ifmMap').get(0).contentDocument.location.reload();
}
/*************** ���� API ���� : �� ***************/

/****************** ��������: ����Ȯ�� ******************/
function Fn_PointXY_Dealer_Pop() {
  var AreaA = $("#selCity").val();
  var AreaB = $("#selGu").val();
  var AreaC = $("#selDong").val();
  var AreaDetail = $("#txtAddrDetail").val();

  if (AreaC.length == 0 || AreaDetail.length == 0) {
    alert("�ּ����� �������� �Է����ּ���.");
    return;
  }

  layer_open('Map_Pop');
  MapLoad('selCity', 'selGu', 'selDong', 'txtAddrDetail');
}

/****************** ���ּ� ����(onkeypress)�� ��ǥ �ʱ�ȭ ******************/
function FnAreaDetailChange(objX, objY) {
  $("#" + objX).val("");
  $("#" + objY).val("");
}

/****************** ������� ��ư Click Event ******************/
function fileBrowse() {
  // This works in IE only. Doesn't do jack in FF. :( 
  var browseField = $("#fileimg");
  browseField.click();
}

/****************** ����� ��ȣ üũ ******************/
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
  if (s_v1 == "206" && s_v2 == "85" && s_v3 == "26551") return false; //�̵���� ����� ��Ϲ�ȣ
  if (s_v1.length != 3) return false;
  if (s_v2.length != 2) return false;
  if (s_v3.length != 5) return false;

  var NoCheckNum = "1309516286,"; 	// üũ�ȵǴ� ����ڹ�ȣ ����ó��

  if (NoCheckNum.indexOf(s_v1 + s_v2 + s_v3) >= 0) {
    return true;
  }

  var num = (s_v1 + s_v2 + s_v3); 	//����ڵ�Ϲ�ȣ�� ���Դϴ�.
  var w_c, w_e, w_f, w_tot;

  w_c = num.charAt(8) * 5; 		// 9��°�ڸ��� ���ڿ� 5�� ���Ѵ�.
  w_e = parseInt((w_c / 10), 10); 	// 10���� ������ 10���� ������ ���������� ..������
  w_f = w_c % 10; 					// 10���� ���� ������.
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

  if (!(w_tot % 10)) {				// 10���� ������ ���� true�� �׷��� ������ false
    return true;
  } else {
    return false;
  }
}

// ������ȣ�� ���ԽĿ� �´��� üũ
function chkCarNo(CarNo) {

  CarNo = CarNo.replace(/\s/g, ""); //��������

  var isGoodNo = false;
 
  // ����1 üũ : �ѱ�2�� + 01~99 + �ѱ�1�� + 00~99 + 00~99
  if (CarNo.match(/[��-�R]{2}[0-9]{1}[0-9]{1}[��-�R]{1}[0-9]{4}/g) == CarNo) {
    isGoodNo = true;
  }

  // ����2 üũ : 01~99 + �ѱ�1�� +00~99 + 00~99
  if (CarNo.match(/[0-9]{1}[0-9]{1}[��-�R]{1}[0-9]{4}/g) == CarNo) {
    isGoodNo = true;
  }

  // ����3 üũ : �� + ����6�ڸ�
  if (CarNo.match(/[��]{1}[0-9]{6}/g) == CarNo) {
    isGoodNo = true;
  }

  return isGoodNo;
}

// �ּ��� �ߺ� üũ
function FnAreaSameCheck(obj,id) {
  var SelVal = obj.value;

  var AreaC1 = $("#selAreaC_1").val();
  var AreaC2 = $("#selAreaC_2").val();
  var AreaC3 = $("#selAreaC_3").val();

  // �ι�° �߰����� üũ��
  if(id == 2){
    if (AreaC1 == SelVal) {
      alert("���� ������ �����ϼ̽��ϴ�. �ٸ� �������� �߰��� �ּ���");
      obj.value = "";
      return;
    }    
  }else{  // ����° �߰����� üũ��
    if (AreaC1 == SelVal || AreaC2 == SelVal) {
      alert("���� ������ �����ϼ̽��ϴ�. �ٸ� �������� �߰��� �ּ���");
      obj.value = "";
      return;
    }    
  }
}

// �߰�ŷ� �Ǹ�(����) ��å
function FnFreeCheck() {
  if ($("#chkFreeF").is(":checked")) {
    $("#txtSalePrice").val("");
    $("#txtSalePrice").prop("readonly", true);
    return;
  } else {
    $("#txtSalePrice").prop("readonly", false);
  }
}

// �������˱�Ϻ� �̹��� ����
function FnDelPerformanceDoc() {
  if(confirm("�������˱�Ϻθ� �����Ͻðڽ��ϱ�?\n(������ ������ ������ �Ұ����մϴ�.)")){
    $("#hidPerformanceDoc_DelF").val("1");
    $("#ulPerformanceDoc").hide();
  }
}

//�޸����
function comma(str) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

//�޸�Ǯ��
function uncomma(str) {
  str = String(str);
  return str.replace(/[^\d]+/g, '');
}

function inputNumberFormat(obj) {
  obj.value = comma(uncomma(obj.value));
}