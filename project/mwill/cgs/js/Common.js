// 추가 이미지뷰어
function FnExImageView(vLineAdNo, id) {
  alert("작업전");
}

// 광고 찜하기 (리스트)
function FnAdSelected(vLineAdNo) {
  var tg = $("#btnAdSelect_" + vLineAdNo);

  $.ajax({
    type: "POST",
    url: "/js/ajax/sub_AdSelected.asp",
    data: { LineAdNo: vLineAdNo },
    dataType: 'html',
    async: false,         // Ajax 통신 끝날때까지 타 함수 실행 안되는 옵션
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (result) {
      // 찜상태 Toggle
      if (tg.hasClass('active')) {
        tg.removeClass("active");
      } else {
        tg.addClass("active");
      }
    }
  });
}

// 광고 찜하기 (MyPage > 찜목록)
function FnAdSelectedCancel(vLineAdNo) {

  if (!confirm("해당광고를 찜해제 하시겠습니까?")) {
    return;
  }
  
  $.ajax({
    type: "POST",
    url: "/js/ajax/sub_AdSelected.asp",
    data: { LineAdNo: vLineAdNo },
    dataType: 'html',
    async: false,         // Ajax 통신 끝날때까지 타 함수 실행 안되는 옵션
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (result) {
      location.reload();
    }
  });
}

// 텍스트박스내 숫자만 입력받기
function keyIntCheck() {
  var keyValue = event.keyCode;

  if ((keyValue <= 95 || keyValue >= 106) && (keyValue <= 47 || keyValue >= 58) && keyValue != 8 && keyValue != 9 && keyValue != 46 && keyValue != 37 && keyValue != 39 && keyValue != 13 && keyValue) {
    if (keyValue != 110) { // .(점)은 예외처리 (소수점 허용)
      alert("숫자만 입력할 수 있습니다");
      event.srcElement.value = '';
      event.srcElement.focus();
      return false;
    }
  }
}

// 주소가져오기: 시/구
function getCity(inVal, targetObj, sVal, targetObj2) {
  var strUrl = "/js/ajax/ajax_getCity.asp?Metro=" + inVal + "&selectedval=" + sVal + "&target=" + targetObj;

  $.ajax({
    type: "get",
    url: strUrl,
    dataType: "html",
    async: false,         // Ajax 통신 끝날때까지 타 함수 실행 안되는 옵션
    success: function (data) {
      if (targetObj.name == null) {
        var objName = targetObj.split('.');
        $("select[name=" + objName[1] + "]").empty().append(data);
      } else {
        $("select[name=" + targetObj.name + "]").empty().append(data);
      }
    }
  });

  if (targetObj2.name == null) {
    var objName2 = targetObj2.split('.');
    $("select[name=" + objName2[1] + "]").empty().append("<option value=''>동/읍/면</option>");
  } else {
    $("select[name=" + targetObj2.name + "]").empty().append("<option value=''>동/읍/면</option>");
  }
}

// 주소가져오기: 동
function getDong(inVal, inVal2, targetObj, sVal) {
  var strUrl = "/js/ajax/ajax_getDong.asp?Metro=" + inVal + "&City=" + inVal2 + "&selectedval=" + sVal + "&target=" + targetObj;

  $.ajax({
    type: "get",
    url: strUrl,
    dataType: "html",
    async: false,         // Ajax 통신 끝날때까지 타 함수 실행 안되는 옵션
    success: function (data) {
      if (targetObj.name == null) {
        var objName = targetObj.split('.');
        $("select[name=" + objName[1] + "]").empty().append(data);
      }
      else {
        $("select[name=" + targetObj.name + "]").empty().append(data);
      }
    }
  });
}

// 입력글자수 현황/제한
function InputCharCount(val, CountObj, MaxLength) {
  var len = val.value.length;
  if (len >= (MaxLength + 1)) {
    val.value = val.value.substring(0, (MaxLength));
  } else {
    $("#" + CountObj).text(len);
  }
}

// 이미지 리사이징
function imgcheck(imgObj, bool, iwidth, iheight) {
	var imgWidth = iwidth;    //** 설정 이미지 폭값
	var imgHeight = iheight;  //** 설정 이미지 높이값

	if (bool) //** 이미지가 로딩이 다 되었을경우
	{
		var O_Width = imgObj.width; //** 이미지의 실제 폭
		var O_Height = imgObj.height; //** 이미지의 실제 높이
		var ReWidth = O_Width; //** 변화된 폭 저장 변수
		var ReHeight = O_Height; //** 변화된 높이 저장 변수

		if (ReWidth > imgWidth) {
			ReWidth = imgWidth;
			ReHeight = (O_Height * ReWidth) / O_Width;
		}

		if (ReHeight > imgHeight) {
			ReWidth = (ReWidth * imgHeight) / ReHeight;
			ReHeight = imgHeight;
		}

		//** 처리
		imgObj.width = ReWidth;
		imgObj.height = ReHeight;
		imgObj.alt = ReWidth + ',' + ReHeight;
	} else {              //** 이미지가 해당 경로에 없어 로딩 에러가 생겼을경우
		//** 안보이게 스타일 시트로 처리
		imgObj.style.display = 'none';
	}
}

// 정렬처리
function FnListOrder() {
  var SelVal = $("#sltOrder").val();
  var GoUrl = $("#hidParam").val();

  location.href = GoUrl + "&Order=" + SelVal;
}