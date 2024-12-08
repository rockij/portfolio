var KAKAOTALK_APP_ID = 'cc43602a69d56c4faf83c139b261a4c0'

Kakao.init(KAKAOTALK_APP_ID);

// SNS 연동
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

	// 로그인 창을 띄웁니다.
	Kakao.Auth.login({
		success: function (authObj) {
			// 로그인 성공시, API를 호출합니다.
			Kakao.API.request({
				url: "/v1/api/story/linkinfo",
				data: {
					url: Url
				}
			}).then(function (res) {
				// 이전 API 호출이 성공한 경우 다음 API를 호출합니다.
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
		alert("내용을 입력해 주세요.");
	}
}

function cmtInput() {
	$.post("/sub/commentInsert.asp", { "lineadno": $("#cmtLineadno").val(), "comment": escape($("#cmtComment").val()), "step": $("#cmtStep").val(), "cmtidx": $("#cmtIdx").val() },
			function (data) {
				if (data == "1") {
					if ($("#cmtStep").val() == "1") {
						alert("댓글이 등록되었습니다.");
					} else {
						alert("답글이 등록되었습니다.");
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
		msg = "댓글 삭제 시, 답글도 모두 삭제됩니다.\n정말로 삭제하시겠습니까?";
	}	else {
    msg = "정말로 삭제하시겠습니까?";
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
						alert("댓글이 삭제되었습니다.");
					} else {
						alert("답글이 삭제되었습니다.");
					}
					location.reload();
				}
			}, "json");
}

// 광고 찜하기
function FnAdSelectedNonToggle(vLineAdNo) {
	var ret;
	cnt = $("#scrapcnt").val();

	if (cnt > 0) {
		ret = confirm("찜 목록에서 삭제하시겠습니까?");
		if ( ret == false )
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
			if (cnt == 0) {
				ret = confirm("해당 정보를 찜 했습니다.\n찜 목록을 확인하시겠습니까?")
				if (ret) {
					location.href = "/mypage/scrapmaglist.asp";
				}
				$("#scrap_btn").text("찜 해제하기");
				$("#scrapcnt").val('1');
			} else {
				$("#scrap_btn").text("찜 하기");
				$("#scrapcnt").val('0');
			}
		}
	});
}

function onSuccess(json, status) {
	alert("신고접수가 완료 되었습니다.");
	$('.ly_pop').hide();
	$('body').css('overflow-y', 'auto');
}

function frmBadCHK() {
  var f = document.frBadAD;

  if (f.callInfo.value == "") {
    alert("연락처를 입력해 주세요.");
    f.callInfo.focus();
    return false;
  }

  if (f.ReasonCode.value == "") {
    alert("신고사유를 선택해 주세요.");
    f.ReasonCode.focus();
    return false;
  }

  if (f.txtContents.value == "") {
    alert("신고내용을 입력해 주세요.");
    f.txtContents.focus();
    return false;
  }
}

function fn_keyCHK(obj) {
	// 정규식 - 이메일 유효성 검사
	var regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	// 정규식 -전화번호 유효성 검사
	var regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;

	var txt1 = "휴대폰 번호가 유효하지 않습니다";
	var txt2 = "이메일 주소가 유효하지 않습니다";

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
    //한글인코딩 변환
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
	alert("신고접수가 완료 되었습니다.");
	$('.ly_pop').hide();
	$('body').css('overflow-y', 'auto');
}

//연락처 보기 클릭
function goPhoneView() {
	$("#phone_text").show();
	$("#phone_img").hide();
}

// 모바일 연락하기
function Contact_Send(service) {
	var tmphPhone = ""; // 핸드폰 정규식에 맞는지
	var tmpPhone = ""; // 일반전화나 핸드폰 정규식에 맞는지
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

	if (service == "T") {	// 전화하기
		if (tmpPhone != "") {
			window.location.href = 'tel:' + tmpPhone;
		} else {
			alert("전화통화 가능한 전화번호가 없습니다.");
		}
	} else if (service == "S") { // SMS
		if (tmphPhone!=""){
			window.location.href = 'sms://' + tmpPhone;
		} else {
			alert("문자수신 가능한 핸드폰 번호가 없습니다.");
		}
	} else if (service == "K") { // kakaoTalk
		executeKakaoTalk();
	}
}

function SendSms() {
	if (frmSmsCHK() != false) {
		//한글인코딩 변환
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
					alert('문자 메시지를 보냈습니다.');
					$('.ly_pop').hide();
					$('body').css('overflow-y', 'auto');
				} else if ( result == 1 ) {
					alert('금일 10건의 문자 메시지를 이미 사용하였습니다.');
					$('.ly_pop').hide();
					$('body').css('overflow-y', 'auto');
				} else {
					alert('문자 메시지 발송 에러 발생\n잠시 후 다시 이용하시기 바랍니다.');
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
		alert("회원의 연락처를 확인해 주세요");
		return false;
	}

	var tmphPhone = ""; // 핸드폰 정규식에 맞는지
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
		alert("문자수신 가능한 핸드폰 번호가 없습니다.");
		return false;
	}
}

// 단축 URL 만들기
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
