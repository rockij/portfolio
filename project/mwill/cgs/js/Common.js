// �߰� �̹������
function FnExImageView(vLineAdNo, id) {
  alert("�۾���");
}

// ���� ���ϱ� (����Ʈ)
function FnAdSelected(vLineAdNo) {
  var tg = $("#btnAdSelect_" + vLineAdNo);

  $.ajax({
    type: "POST",
    url: "/js/ajax/sub_AdSelected.asp",
    data: { LineAdNo: vLineAdNo },
    dataType: 'html',
    async: false,         // Ajax ��� ���������� Ÿ �Լ� ���� �ȵǴ� �ɼ�
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (result) {
      // ����� Toggle
      if (tg.hasClass('active')) {
        tg.removeClass("active");
      } else {
        tg.addClass("active");
      }
    }
  });
}

// ���� ���ϱ� (MyPage > ����)
function FnAdSelectedCancel(vLineAdNo) {

  if (!confirm("�ش籤�� ������ �Ͻðڽ��ϱ�?")) {
    return;
  }
  
  $.ajax({
    type: "POST",
    url: "/js/ajax/sub_AdSelected.asp",
    data: { LineAdNo: vLineAdNo },
    dataType: 'html',
    async: false,         // Ajax ��� ���������� Ÿ �Լ� ���� �ȵǴ� �ɼ�
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (result) {
      location.reload();
    }
  });
}

// �ؽ�Ʈ�ڽ��� ���ڸ� �Է¹ޱ�
function keyIntCheck() {
  var keyValue = event.keyCode;

  if ((keyValue <= 95 || keyValue >= 106) && (keyValue <= 47 || keyValue >= 58) && keyValue != 8 && keyValue != 9 && keyValue != 46 && keyValue != 37 && keyValue != 39 && keyValue != 13 && keyValue) {
    if (keyValue != 110) { // .(��)�� ����ó�� (�Ҽ��� ���)
      alert("���ڸ� �Է��� �� �ֽ��ϴ�");
      event.srcElement.value = '';
      event.srcElement.focus();
      return false;
    }
  }
}

// �ּҰ�������: ��/��
function getCity(inVal, targetObj, sVal, targetObj2) {
  var strUrl = "/js/ajax/ajax_getCity.asp?Metro=" + inVal + "&selectedval=" + sVal + "&target=" + targetObj;

  $.ajax({
    type: "get",
    url: strUrl,
    dataType: "html",
    async: false,         // Ajax ��� ���������� Ÿ �Լ� ���� �ȵǴ� �ɼ�
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
    $("select[name=" + objName2[1] + "]").empty().append("<option value=''>��/��/��</option>");
  } else {
    $("select[name=" + targetObj2.name + "]").empty().append("<option value=''>��/��/��</option>");
  }
}

// �ּҰ�������: ��
function getDong(inVal, inVal2, targetObj, sVal) {
  var strUrl = "/js/ajax/ajax_getDong.asp?Metro=" + inVal + "&City=" + inVal2 + "&selectedval=" + sVal + "&target=" + targetObj;

  $.ajax({
    type: "get",
    url: strUrl,
    dataType: "html",
    async: false,         // Ajax ��� ���������� Ÿ �Լ� ���� �ȵǴ� �ɼ�
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

// �Է±��ڼ� ��Ȳ/����
function InputCharCount(val, CountObj, MaxLength) {
  var len = val.value.length;
  if (len >= (MaxLength + 1)) {
    val.value = val.value.substring(0, (MaxLength));
  } else {
    $("#" + CountObj).text(len);
  }
}

// �̹��� ������¡
function imgcheck(imgObj, bool, iwidth, iheight) {
	var imgWidth = iwidth;    //** ���� �̹��� ����
	var imgHeight = iheight;  //** ���� �̹��� ���̰�

	if (bool) //** �̹����� �ε��� �� �Ǿ������
	{
		var O_Width = imgObj.width; //** �̹����� ���� ��
		var O_Height = imgObj.height; //** �̹����� ���� ����
		var ReWidth = O_Width; //** ��ȭ�� �� ���� ����
		var ReHeight = O_Height; //** ��ȭ�� ���� ���� ����

		if (ReWidth > imgWidth) {
			ReWidth = imgWidth;
			ReHeight = (O_Height * ReWidth) / O_Width;
		}

		if (ReHeight > imgHeight) {
			ReWidth = (ReWidth * imgHeight) / ReHeight;
			ReHeight = imgHeight;
		}

		//** ó��
		imgObj.width = ReWidth;
		imgObj.height = ReHeight;
		imgObj.alt = ReWidth + ',' + ReHeight;
	} else {              //** �̹����� �ش� ��ο� ���� �ε� ������ ���������
		//** �Ⱥ��̰� ��Ÿ�� ��Ʈ�� ó��
		imgObj.style.display = 'none';
	}
}

// ����ó��
function FnListOrder() {
  var SelVal = $("#sltOrder").val();
  var GoUrl = $("#hidParam").val();

  location.href = GoUrl + "&Order=" + SelVal;
}