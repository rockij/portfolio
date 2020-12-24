function setAreaA() {
  for (var cnt = 2; cnt <= 3; cnt++) {
    $("#selAreaA_" + cnt).empty().append('<option value="">-- 시/도 --</option>');
    $("#selAreaB_" + cnt).empty().append('<option value="">-- 시/군/구 --</option>');
    $("#selAreaC_" + cnt).empty().append('<option value="">-- 동/읍/면 --</option>');
    $("#selAreaC_" + cnt).prop("disabled", false);
    $("#txtAreaDetail_" + cnt).val("");
    $("#txtAreaDetail_" + cnt).prop("disabled", false);
    $("#strAreaCode" + cnt + "_BF").val("");
    $("#hidAreaA_" + cnt).val("");
    $("#p_Area" + cnt).css("display", "none");
  }

  $("#txtAreaDetail_1").val("");
  $("#intHopeAreaCnt").val("1");
}

function getSelectAreaA(obj, cnt, strValue, strText, selectVal) {
  var strAreaA_1 = $("#strArea1_BF").val();
  var strAreaA_2 = $("#hidAreaA_2").val();
  var strAreaA_3 = $("#hidAreaA_3").val();
  var strAreaA_Flag = true;

  if ($("#hidFormType").val() == "PaperMod") {
    if (strAreaA_2 != "" && strAreaA_1 != strAreaA_2) {
      strText = strAreaA_2;
    } else if (strAreaA_3 != "" && strAreaA_1 != strAreaA_3) {
      strText = strAreaA_3;
    }
  }

  $("#" + obj + cnt).empty();
  $("#" + obj + cnt).html("<option value=\"\">-- 시/도 --</option><option value=\"" + strValue + "\" selected>" + strText + "</option>");
  $("#hidAreaNM_A" + cnt).val(strText);

  if (selectVal != "") {
    selectVal = selectVal.substring(0, 4);
  }

  if (cnt == 2) {
    getAreaCodeB(1, 2, strValue, selectVal, 'selAreaB_2', 'selAreaC_2');
  } else if (cnt == 3) {
    getAreaCodeB(1, 2, strValue, selectVal, 'selAreaB_3', 'selAreaC_3');
  }
}

function getAreaCodeB(Kind, Level, AreaCode, SelectVal, TargetObj1, TargetObj2) {
  var strUrl = "/js/ajax/ajax_AreaCodeCombo.asp?Kind=" + Kind + "&Level=" + Level + "&AreaCode=" + AreaCode + "&SelectVal=" + SelectVal;

  FnAreaCodeAjax(Level, strUrl, TargetObj1, TargetObj2);
}

function getAreaCodeC(Kind, Level, AreaCode, SelectVal, TargetObj1) {
  var strUrl = "/js/ajax/ajax_AreaCodeCombo.asp?Kind=" + Kind + "&Level=" + Level + "&AreaCode=" + AreaCode + "&SelectVal=" + SelectVal;

  FnAreaCodeAjax(Level, strUrl, TargetObj1, '');
}

function FnAreaCodeAjax(Level, Url, TargetObj1, TargetObj2) {

  $.ajax({
    type: "get",
    url: Url,
    dataType: "html",
    async: false,
    success: function (data) {
      if (Level == 2) {
        $("#" + TargetObj1).html("<option value=\"\">-- 시/군/구 --</option>");
        $("#" + TargetObj1).append(data);
        $("#" + TargetObj2).html("<option value=\"\">-- 동/읍/면 --</option>");
      } else if (Level == 3) {
        $("#" + TargetObj1).html("<option value=\"\">-- 동/읍/면 --</option>");
        $("#" + TargetObj1).append(data);
      }
    }
  });

}

function Fn_PointXY_Pop(pos_x, pos_y) {
  var f = document.frmEnt;
  var win;
  //var siVal = f.selAreaA_1.value;
  //var guVal = f.selAreaB_1.value;
  //var dongVal = f.selAreaC_1.value;

  var siVal = $("#selAreaA_1 option:selected").text();
  var guVal = $("#selAreaB_1 option:selected").text();
  var dongVal = $("#selAreaC_1 option:selected").text();

  if (siVal == '세종') {
    siVal = '세종특별자치시';
    guVal = '';
  }

  var strAddr = escape(siVal + " " + guVal + " " + dongVal + " " + f.txtAreaDetail_1.value);

  if (f.selAreaA_1.value == "") {
    alert("주소(시/도)를 선택해 주세요.");
    f.selAreaA_1.focus();
    return;
  }

  if (f.selAreaB_1.value == "") {
    alert("주소(구)를 선택해 주세요.");
    f.selAreaB_1.focus();
    return;
  }

  if (f.selAreaA_1.value != "세종") {
    if (f.selAreaC_1.value == "") {
      alert("주소(동)를 선택해 주세요.");
      f.selAreaC_1.focus();
      return;
    }
  }

  if (!f.txtAreaDetail_1.value.replace(/\s*/, "")) {
    alert("상세 주소를 입력해 주세요.");
    f.txtAreaDetail_1.focus();
    return;
  }

  //주소 변경여부에 따라 지도창 분기처리
  if (f.strArea1_BF.value == f.selAreaA_1.value && f.strArea2_BF.value == f.selAreaB_1.value && f.strArea3_BF.value == f.selAreaC_1.value && f.strAreaDetail_BF.value == f.txtAreaDetail_1.value) {
    url = "/pop/admag/Map.asp?strAddr=" + strAddr + "&POS_X=" + pos_x + "&POS_Y=" + pos_y;
  } else {
    url = "/pop/admag/Map.asp?strAddr=" + strAddr;
  }

  win = window.open(url, 'map', 'width=573px !important, width=555px,height=668px,toobar=no,scrollbars=auto,menubar=no,status=no ,directories=no,');
  win.focus();
}


function Fn_AddArea(SelID, HopeAreaCntNm, objNow1, objNow2, objNow3) {
  var cnt = parseInt($("#" + HopeAreaCntNm).val());
  var tmpid = "";

  if ($("#" + objNow1 + cnt).val() == "전국") {
    alert("근무지역을 ‘전국’ 선택하시면, 다른 지역을 함께 선택할 수 없습니다.");
    return;
  }

  if (cnt >= 3) {
    alert("더 이상 추가 할 수 없습니다.");
    return;
  } else {

    //if ($("#" + objNow1 + cnt).val() == "" || $("#" + objNow2 + cnt).val() == "" || $("#" + objNow3 + cnt).val() == "") {
    //  alert("추가하기 전에 지역을 선택해주세요.");
    //  return;
    //}

    if (cnt == 2) {
      $("#idAreaDel" + cnt).empty();
    }

    cnt += 1;
    tmpid = SelID + cnt;

    $("#" + tmpid).css("display", "block");
    $("#" + HopeAreaCntNm).val(cnt);
  }
}

function Fn_DelArea(SelID, intHopeAreaCnt) {
  var cnt = parseInt($("#" + intHopeAreaCnt).val());
  var tmpid = "";

  if (cnt > 1) {
    if (cnt == 3) {
      $("#idAreaDel" + (parseInt(cnt) - 1)).html("<span class=\"adddel\" id=\"idAreaDel<% =i %>\"><input type=\"button\" value=\"삭제\" class=\"bt_s c_red txt_w\" onclick=\"Fn_DelArea('p_Area','intHopeAreaCnt');return false;\"></span>");
    }

    tmpid = SelID + cnt;
    $("#selAreaA_" + cnt + " option:eq(0)").prop("selected", "selected");
    $("#selAreaB_" + cnt).empty().append('<option value="">-- 시/군/구 --</option>');
    $("#selAreaC_" + cnt).empty().append('<option value="">-- 동/읍/면 --</option>');
    $("#selAreaC_" + cnt).prop("disabled", false);
    $("#txtAreaDetail_" + cnt).prop("disabled", false);
    $("#txtAreaDetail_" + cnt).val("");
    $("#" + tmpid).css("display", "none");
    cnt -= 1;
    $("#" + intHopeAreaCnt).val(cnt);
  } else {
    alert("더 이상 삭제할 수 없습니다.");
    return;
  }
}

//전지역일 경우 disable 처리
function setAllArea(Level, Val, Cnt) {
  if (Val == "00" || Val == "0000") {
    Val = "0";
  }

  if (Level == "1") {
    $("#selAreaC_" + Cnt).prop("disabled", false);
    $("#txtAreaDetail_" + Cnt).prop("disabled", false);
  } else if (Level == "2") {
    if (Val == "0") {
      $("#selAreaC_" + Cnt).prop("disabled", true);
      $("#txtAreaDetail_" + Cnt).val("");
      $("#txtAreaDetail_" + Cnt).prop("disabled", true);
    } else {
      $("#selAreaC_" + Cnt).prop("disabled", false);
      $("#txtAreaDetail_" + Cnt).prop("disabled", false);
    }
  } else if (Level == "3") {
    if (Val == "0") {
      $("#txtAreaDetail_" + Cnt).val("");
      $("#txtAreaDetail_" + Cnt).prop("disabled", true);
    } else {
      $("#txtAreaDetail_" + Cnt).prop("disabled", false);
    }
  }
}

function Fn_ConfirmAreaB(val, num) {
  var cnt = 0;
  var tmpIdA = "";
  var thisIdA = "";
  var tmpIdB = "";
  var thisIdB = "";
  var tmpIdC = "";
  var thisIdC = "";
  var forflag = true;
  var forflag2 = true;

  for (var i = 1; i <= $("#intHopeAreaCnt").val(); i++) {
    tmpIdA = "selAreaA_" + i;
    thisIdA = "selAreaA_" + num;
    tmpIdB = "selAreaB_" + i;
    thisIdB = "selAreaB_" + num;
    tmpIdC = "selAreaC_" + i;
    thisIdC = "selAreaC_" + num;
    thisIdDetail = "txtAreaDetail_" + num;

    if ($("#" + tmpIdB).val() == "전지역" && $("#" + thisIdB).val() == "전지역") {
      if (i != num && $("#" + tmpIdA).val() == $("#" + thisIdA).val() && $("#" + tmpIdB).val() == $("#" + thisIdB).val()) {
        cnt++;
      }
    }
  }

  if (cnt != 0) {
    alert("같은 지역을 선택하셨습니다.\n다시 선택해 주세요.");
    $("#" + thisIdB).val("");
    $("#" + thisIdC).prop("disabled", false);
    $("#" + thisIdC).empty().append('<option value="">-- 동/읍/면 --</option>');
    $("#" + thisIdDetail).prop("disabled", false);
    $("#" + thisIdB).focus();
    return;
  }
}

function Fn_ConfirmArea(val, num) {
  var cnt = 0;
  var tmpIdA = "";
  var thisIdA = "";
  var tmpIdB = "";
  var thisIdB = "";
  var tmpIdC = "";
  var thisIdC = "";
  var forflag = true;
  var forflag2 = true;

  for (var i = 1; i <= $("#intHopeAreaCnt").val(); i++) {
    tmpIdA = "selAreaA_" + i;
    thisIdA = "selAreaA_" + num;
    tmpIdB = "selAreaB_" + i;
    thisIdB = "selAreaB_" + num;
    tmpIdC = "selAreaC_" + i;
    thisIdC = "selAreaC_" + num;

    if (i != num && $("#" + tmpIdB).val() == $("#" + thisIdB).val() && $("#" + tmpIdC).val() == $("#" + thisIdC).val()) {
      cnt++;
    }
  }

  if (cnt != 0) {
    alert("같은 지역을 선택하셨습니다.\n다시 선택해 주세요.");
    $("#" + thisIdC).val("");
    $("#" + thisIdC).focus();
    return;
  }
}