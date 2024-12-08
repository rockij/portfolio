/**
 * Common Message Javascript 
 */

var errTitle = { 
					selfAuth:	 		"본인인증 오류",
					agreement:	 		"약관동의 오류",
					ars:				"ARS 요청 오류",
					bankSelection:		"은행 선택 오류",
					passwordSelection:	"비밀번호 설정 오류",
					unknown:			"알 수 없는 오류"
			};


var errMsg = {
				nameInput:			"이름 입력값이 잘못되었습니다.",
				birthDayInput:		"생년월일(주민번호 앞자리) 입력값이 잘못되었습니다.",
				sexInput:			"성별(주민번호 뒤 첫자리) 입력값이 잘못되었습니다.",
				mobileNoInput:		"휴대폰번호 입력값이 잘못되었습니다.",
				mobileCoInput:		"통신사 정보가 잘못되었습니다.",
				captchaInput:		"캡챠 입력값이 잘못되었습니다.",
				smsAuthInput:		"SMS 인증번호 입력값이 잘못되었습니다.",
				smsInputTimeout:	"SMS 입력 시간이 초과되었습니다.",
				smsResend:			"인증번호 문자가 재발송 되었습니다.",
				arsInputTimeout:	"ARS 입력시간이 초과되었습니다.",
				accountInput:		"계좌번호가 잘못되었습니다.",
				passwordInput:		"비밀번호 숫자 6자리가 입력되지 않았습니다.",
				passwordInvalid:	"비밀번호가 유효하지 않습니다.<br> 중복 숫자, 생년월일, 휴대폰번호는<br> 사용할 수 없습니다.",
				passwordMismatch:	"결제 비밀번호가 일치하지 않습니다.",
				agreeAllCheck:		"약관에 동의해 주세요.",
				dualSelection:		"은행별 1개 계좌만 등록됩니다.<br> 다른 은행을 선택하시거나 계좌 삭제 후 다른 계좌로 등록하세요.",
				unknown:			"오류가 발생하였습니다."
			};

var alertTitle = {
				selfAuth:	 		"본인인증 알림",
				agreement:	 		"약관동의 알림",
				ars:				"ARS 알림",
				bankSelection:		"은행 알림",
				account:			"계좌 알림",
				passwordSelection:	"비밀번호 알림",
				withdraw:			"서비스 해지",
				unknown:			"기타 알림"
};

var alertMsg = {
				agreeAllCheck:			"모든 약관에 동의해야 서비스 이용이 가능합니다.",
				dualAccountCheck:		"은행별 1개의 계좌 등록이 가능합니다.<br> 다른 은행을 선택하시거나<br> 등록된 계좌를 삭제 후 등록하세요.",
				passwordIncorrect:		"결제 비밀번호가 일치하지 않습니다. #1 <br>다시 입 력해 주세요.<br>(비밀번호 5회 오류 시 본인인증 후 재설정)",
				notExistAccount:		"해당계좌가 존재하지 않습니다.",
				passwordMaxIncorrect:	"결제 비밀번호 5회 실패되어 초기화 되었습니다.<br> 휴대폰 본인인증 후 비밀번호를 재설정 하세요.",
				passwordPhoneMatch:		"휴대폰번호는 계좌 등록을 할 수 없습니다.<br>등록 가능한 계좌번호를 입력해 주세요.",
				passwordMismatch:		"비밀번호가 일치하지 않습니다.<br>다시 입력해 주세요.",
				accountInvalid:			"입력한 계좌는 등록이 불가능한 계좌번호 입니다.<br>다른 계좌번호를 입력해 주세요.",
				accountMismatch:		"해당계좌가 존재하지 않습니다.<br>계좌번호 확인 후 등록해 주세요.",
				accountDelete:			"계좌를 <br> 정말 삭제 하시겠습니까?",
				withdrawQuestion:		"편리한 간편계좌결제를 더 이상 이용하실 수 없습니다.<br> <span class='text-error'>정말 해지하시겠습니까?</span>",
				resetPassword:			"개인 정보 확인 및 보호를 위해 <br>휴대폰 본인인증 후 결제 비밀번호를 <br> 재설정 하실 수 있습니다.",
				accountAllDelete:		"마지막 계좌를 삭제하면,<br> 계좌 삭제 후 진행 중인 결제창이 닫힙니다.",
				withdrawMessage:		"간편결제 서비스가 해지되었습니다.<br>서비스를 이용해 주셔서 감사합니다."
};


var naviAlertTitle = {
					orderEnd: 		"",
					settingPrev:	"",
					stopProc:		""
};

var naviAlertMsg = {
					orderEnd:			"진행 중인 주문이 종료됩니다.<br> 주문을 취소하시겠습니까?",
					passwordEnd:		"비밀번호 설정이 중단되고 주문창이 종료됩니다.",
					arsPrevEnd:			"ARS 인증이 중단되고 주문창이 종료됩니다.",
					selfAuthPrev: 		"본인인증이 중단됩니다.",
					passwordPrev:		"비밀번호 설정이 중단됩니다.",
					passwordVerify:		"비밀번호 확인 중단됩니다.",
					arsPrev:			"ARS 인증이 중단됩니다.",
					selectBankPrev:		"은행 선택이 중단됩니다.",
					generalPrev:		"진행 중인 설정을 종료합니다.",
					settingPrev:		"설정을 종료합니다."
};
