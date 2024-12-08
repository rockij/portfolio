var KAKAOTALK_APP_ID = 'cc43602a69d56c4faf83c139b261a4c0'

Kakao.init(KAKAOTALK_APP_ID);

// SNS ����
function SNS_Send(service) {
	var linkURL = "";
	var Contents = document.getElementById("snsCONTENTS").value.substring(0,110);
	var Url = document.getElementById("snsShortURL").value;

	if (service == "F") {	// facebook
		linkURL = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(Url);
		window.open(linkURL, 'facebook', 'toolbar=no,status=no,width=640,height=320,directories=no,scrollbars=no,location=no,resizable=yes,menubar=no,screenX=10,left=50,screenY=10,top=10');
	} else if (service == "T") { // twitter
		linkURL = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(Contents) + "&url=" + encodeURIComponent(Url);
		window.open(linkURL, 'twitter', 'toolbar=no,status=no,width=550,height=250,directories=no,scrollbars=auto,location=no,resizable=no,menubar=no,screenX=10,left=50,screenY=10,top=10');
	} else if (service == "K") { // kakaostory
		executeKakaoStoryLink()
	} else if (service == "S") { // kakaoTalk
		executeKakaoTalk()
	}
}

function executeKakaoTalk()	{
	var Contents = document.getElementById("snsCONTENTS").value;
	var Url = document.getElementById("snsShortURL").value;

  Kakao.Link.sendTalkLink({
  	label: Contents + '\n' + Url
  });
}

function executeKakaoStoryLink() {
	var Contents = document.getElementById("snsCONTENTS").value;
	var Url = document.getElementById("snsShortURL").value;

	// �α��� â�� ���ϴ�.
	Kakao.Auth.login({
		success: function (authObj) {
			// �α��� ������, API�� ȣ���մϴ�.
			Kakao.API.request({
				url: "/v1/api/story/linkinfo",
				data: {
					url: Url
				}
			}).then(function (res) {
				// ���� API ȣ���� ������ ��� ���� API�� ȣ���մϴ�.
				return Kakao.API.request({
					url: "/v1/api/story/post/link",
					data: {
						content: Contents,
						link_info: res
					}
				});
			}).then(function (res) {
				return Kakao.API.request({
					url: "/v1/api/story/mystory",
					data: { id: res.id }
				});
			}).then(function (res) {
				//alert(JSON.stringify(res));
			}, function (err) {
				//alert(JSON.stringify(err));
			});
		},
		fail: function (err) {
			//alert(JSON.stringify(err))
		}
	});
};


function setCmtInput(comment, step, cmtidx) {
	$("#cmtComment").val(comment);
	$("#cmtStep").val(step);
	$("#cmtIdx").val(cmtidx);

	if ($("#cmtComment").val().length > 0) {
		cmtInput();
	} else {
		alert("������ �Է��� �ּ���.");
	}
}

function cmtInput() {
	$.post("/sub/commentInsert.asp", { "lineadno": $("#cmtLineadno").val(), "comment": escape($("#cmtComment").val()), "step": $("#cmtStep").val(), "cmtidx": $("#cmtIdx").val() },
			function (data) {
				if (data == "1") {
					if ($("#cmtStep").val() == "1") {
						alert("����� ��ϵǾ����ϴ�.");
					} else {
						alert("����� ��ϵǾ����ϴ�.");
					}
					location.reload();
				}
			}, "json");
}


function setCmtDel(step, cmtidx, replycnt) {
	$("#cmtStep").val(step);
	$("#cmtIdx").val(cmtidx);
	$("#cmtReplyCnt").val(replycnt);

	var msg;

	if ( step == "1" && replycnt> 0 )	{
		msg = "��� ���� ��, ��۵� ��� �����˴ϴ�.\n������ �����Ͻðڽ��ϱ�?";
	}	else {
    msg = "������ �����Ͻðڽ��ϱ�?";
	}

	var ret = confirm(msg);
	if ( ret )	{
		cmtDel();
	}
}

function cmtDel() {
	$.post("/sub/commentDelete.asp", { "step": $("#cmtStep").val(), "idx": $("#cmtIdx").val(), "replycnt": $("#cmtReplyCnt").val() },
			function (data) {
				if (data == "1") {
					if ($("#cmtStep").val() == "1") {
						alert("����� �����Ǿ����ϴ�.");
					} else {
						alert("����� �����Ǿ����ϴ�.");
					}
					location.reload();
				}
			}, "json");
}

// ���� ���ϱ�
function FnAdSelectedNonToggle(vLineAdNo) {
	var ret;
	cnt = $("#scrapcnt").val();

	if (cnt > 0) {
		ret = confirm("�� ��Ͽ��� �����Ͻðڽ��ϱ�?");
		if ( ret == false )
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
			if (cnt == 0) {
				ret = confirm("�ش� ������ �� �߽��ϴ�.\n�� ����� Ȯ���Ͻðڽ��ϱ�?")
				if (ret) {
					location.href = "/mypage/scrapmaglist.asp";
				}
				$("#scrap_btn").text("�� �����ϱ�");
				$("#scrapcnt").val('1');
			} else {
				$("#scrap_btn").text("�� �ϱ�");
				$("#scrapcnt").val('0');
			}
		}
	});
}

function onSuccess(json, status) {
	alert("�Ű������� �Ϸ� �Ǿ����ϴ�.");
	$('.ly_pop').hide();
	$('body').css('overflow-y', 'auto');
}

function frmBadCHK() {
  var f = document.frBadAD;

  if (f.callInfo.value == "") {
    alert("����ó�� �Է��� �ּ���.");
    f.callInfo.focus();
    return false;
  }

  if (f.ReasonCode.value == "") {
    alert("�Ű������ ������ �ּ���.");
    f.ReasonCode.focus();
    return false;
  }

  if (f.txtContents.value == "") {
    alert("�Ű����� �Է��� �ּ���.");
    f.txtContents.focus();
    return false;
  }
}

function fn_keyCHK(obj) {
	// ���Խ� - �̸��� ��ȿ�� �˻�
	var regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	// ���Խ� -��ȭ��ȣ ��ȿ�� �˻�
	var regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;

	var txt1 = "�޴��� ��ȣ�� ��ȿ���� �ʽ��ϴ�";
	var txt2 = "�̸��� �ּҰ� ��ȿ���� �ʽ��ϴ�";

	if (obj.value != "") {
		if (obj.value.indexOf("@") == -1) {
			if (!regPhone.test(obj.value.replace(/-/gi, ""))) { alert(txt1); obj.focus(); return false; }
		} else {
			if (!regEmail.test(obj.value)) { alert(txt2); obj.focus(); return false; }
		}
	}
}

function ReportBadAd() {
  if (frmBadCHK() != false) {
    //�ѱ����ڵ� ��ȯ
    var param = $("#frBadAD").serialize().replace(/=([^&]*)/g,
        function ($0, $1) {
            return "=" + escape(decodeURIComponent($1).replace(/\n/g, "\r\n"))
        })

    $.ajax({
        type: "POST",
        url: "/sub/badad/BadADProc.asp",
        cache: false,
        data: param,
        success: onSuccess
    });
  }
}

function onSuccess(json, status) {
	alert("�Ű������� �Ϸ� �Ǿ����ϴ�.");
	$('.ly_pop').hide();
	$('body').css('overflow-y', 'auto');
}

//����ó ���� Ŭ��
function goPhoneView() {
	$("#phone_text").show();
	$("#phone_img").hide();
}

// ����� �����ϱ�
function Contact_Send(service) {
	var tmphPhone = ""; // �ڵ��� ���ԽĿ� �´���
	var tmpPhone = ""; // �Ϲ���ȭ�� �ڵ��� ���ԽĿ� �´���
	var phones = $("#phone_mobile").val();
	var arrPhone = phones.split(",");

	for (var i = 0; i < arrPhone.length; i++) {
		arrPhone[i] = arrPhone[i].replace(/^\s*/, '').replace(/\s*$/, '');
		if (arrPhone[i].match(/(01[016789]{1}|02|0[3-9]{1}[0-9]{1})\-[0-9]{3,4}\-[0-9]{4}/g) != arrPhone[i]) {
			//
		} else {
			tmpPhone = arrPhone[i];
			break;
		}
	}

	for (var i = 0; i < arrPhone.length; i++) {
		arrPhone[i] = arrPhone[i].replace(/^\s*/, '').replace(/\s*$/, '');
		if (arrPhone[i].match(/01[016789]\-[0-9]{3,4}\-[0-9]{4}/g) != arrPhone[i]) {
			//
		} else {
			tmphPhone = arrPhone[i];
			break;
		}
	}

	if (service == "T") {	// ��ȭ�ϱ�
		if (tmpPhone != "") {
			window.location.href = 'tel:' + tmpPhone;
		} else {
			alert("��ȭ��ȭ ������ ��ȭ��ȣ�� �����ϴ�.");
		}
	} else if (service == "S") { // SMS
		if (tmphPhone!=""){
			window.location.href = 'sms://' + tmpPhone;
		} else {
			alert("���ڼ��� ������ �ڵ��� ��ȣ�� �����ϴ�.");
		}
	} else if (service == "K") { // kakaoTalk
		executeKakaoTalk();
	}
}

function SendSms() {
	if (frmSmsCHK() != false) {
		//�ѱ����ڵ� ��ȯ
		var param = $("#frmSMS").serialize().replace(/=([^&]*)/g,
        function ($0, $1) {
        	return "=" + escape(decodeURIComponent($1).replace(/\n/g, "\r\n"))
        })

		$.ajax({
			type: "POST",
			url: "/sub/sms/SMSProc.asp",
			cache: false,
			data: param,
			success: function (result) {
				if (result == 0) {
					alert('���� �޽����� ���½��ϴ�.');
					$('.ly_pop').hide();
					$('body').css('overflow-y', 'auto');
				} else if ( result == 1 ) {
					alert('���� 10���� ���� �޽����� �̹� ����Ͽ����ϴ�.');
					$('.ly_pop').hide();
					$('body').css('overflow-y', 'auto');
				} else {
					alert('���� �޽��� �߼� ���� �߻�\n��� �� �ٽ� �̿��Ͻñ� �ٶ��ϴ�.');
					$('.ly_pop').hide();
					$('body').css('overflow-y', 'auto');
				}
			}
		});
	}
}

function frmSmsCHK() {
	var f = document.frmSMS;

	if (f.SND_NO.value == "") {
		alert("ȸ���� ����ó�� Ȯ���� �ּ���");
		return false;
	}

	var tmphPhone = ""; // �ڵ��� ���ԽĿ� �´���
	var phones = $("#phone_mobile").val();
	var arrPhone = phones.split(",");

	for (var i = 0; i < arrPhone.length; i++) {
		arrPhone[i] = arrPhone[i].replace(/^\s*/, '').replace(/\s*$/, '');
		if (arrPhone[i].match(/01[016789]\-[0-9]{3,4}\-[0-9]{4}/g) != arrPhone[i]) {
			//
		} else {
			tmphPhone = arrPhone[i];
			break;
		}
	}

	f.RCV_NO.value = tmphPhone;

	if (f.RCV_NO.value == "") {
		alert("���ڼ��� ������ �ڵ��� ��ȣ�� �����ϴ�.");
		return false;
	}
}

// ���� URL �����
function FnMakeShortUrl(oriUrl) {
	$.ajax({
		type: "POST",
		url: "/sub/MakeShortUrl.asp",
		data: { url: oriUrl },
		success: function (result) {
			$("#snsShortURL").val(result.URL);
		},
		dataType: "json",
		error: function (request, status, error) {
			alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
		}
	});
}
