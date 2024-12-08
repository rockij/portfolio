/**
 * 
 */

var DEFAULT_TIMER_VALUE = 180;			//본인 확인, ARS Waiting Timer 시간 초
var nextPwdPopupInterval = 200; 		//두번째 보안키패드 출력 Timer 시간 200ms
var pwdMaxLength = 6;					//보안키패드 문자열 길이
var secuKeyDisplayInterval = 500;		//페이지 로딩 후 보안 키패드 출력 대기 시간
var keyPadPollingInterval = 200;

var NAME_MIN_LEN = 1;
var BIRTH_MIN_LEN = 6;
var SEX_MIN_LEN = 1;
var PHONE_MIN_LEN = 10;
var CAPTCHA_MIN_LEN = 5;
var SMS_MIN_LEN = 6;
var ACCOUNT_MIN_LEN = 5;

var FStatus = {
					newAccount: 	0x00000001,
					resetPassword: 	0x00000010,
					setPassword: 	0x00000100,
					withdraw: 		0x00001000,
					setting:		0x00010000
				};


var selfAuthType = { 
						basic: 1, 	//휴대폰 본인 인증	 
						app: 2 		//간편 앱 방식 본인인증
					};

$.alertMessage = function(title, contents, alertObj) {
	$('#alertTitle').html(title);
	$('#alertContents').html(contents); 
	alertObj.show();
}

$.alertMessageCallback = function(title, contents, alertObj, callbackFunc) {
	$('#alertTitle').html(title);
	$('#alertContents').html(contents);
	
	var clickEvent = new Function(callbackFunc);
	alertObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset 
	alertObj.prop('onclick', '').click(clickEvent); 	//callback 함수 등록

	alertObj.show();
}

$.alertMessageCallbackEx = function(title, contents, alertObj, alertOkObj, callbackFunc) {
	$('#alertTitle').html(title);
	$('#alertContents').html(contents);
	
	var clickEvent = new Function(callbackFunc);
	alertOkObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset 
	alertOkObj.prop('onclick', '').click(clickEvent); 	//callback 함수 등록

	alertObj.show();
}


$.alertCallback = function(alertObj, alertOkObj, callbackFunc) {
	var clickEvent = new Function(callbackFunc);
	alertOkObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset 
	alertOkObj.prop('onclick', '').click(clickEvent); 	//callback 함수 등록

	alertObj.show();
}

$.promptMessage = function(title, contents, promptObj, promptOkObj, callbackFunc) {
	$('#promptTitle').html(title);
	$('#promptContents').html(contents);
	
	var clickEvent = new Function(callbackFunc);
	promptOkObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset 
	promptOkObj.prop('onclick', '').click(clickEvent); 	//callback 함수 등록

    promptObj.show(); 
}

$.promptMessageShort = function(promptObj, promptOkObj, callbackFunc) {
	var clickEvent = new Function(callbackFunc);
	promptOkObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset 
	promptOkObj.prop('onclick', '').click(clickEvent); 	//callback 함수 등록

    promptObj.show(); 
}

$.promptMessageEx = function(titleObj, contentsObj, title, contents, promptObj, promptOkObj, callbackFunc) {
	titleObj.html(title);
	contentsObj.html(contents);
	
	var clickEvent = new Function(callbackFunc);
	promptOkObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset 
	promptOkObj.prop('onclick', '').click(clickEvent); 	//callback 함수 등록

    promptObj.show(); 
}

var timerID;
var time = DEFAULT_TIMER_VALUE;

$.startTimer = function(type) {
	timeId = setInterval("$.runningTime('" + type + "')", 1000);
}

$.runningTime = function(type) {
	time--;
	$('#timer').text($.toMMSSTimeFormat());

	if ( time == 0 )
	{
		if ( type == 'ars' )
			$.alertMessage(errTitle.ars, errMsg.arsInputTimeout, $('#commonAlert'));
		else
			$.alertMessage(errTitle.selfAuth, errMsg.smsInputTimeout, $('#commonAlert'));
		
		clearInterval(timeId);
		return;
	}
	
}

$.toMMSSTimeFormat = function() {
	var hour;
	var min;
	var sec;

	hour = Math.floor(time / 3600);
	min = Math.floor( (time-(hour*3600)) / 60 );
	sec = time - (hour*3600) - (min*60);

	if(hour < 10) hour = "0" + hour;
	if(min < 10) min = "0" + min;
	if(sec < 10) sec = "0" + sec;

	return(min + ":" + sec);
}


/* INPUT Auto Focus */
$.inputAutoFocus =  function(actionInput, targetInput) {
    $(actionInput).keyup (function () {
        var sLimit = $(this).attr("maxlength");
        if (this.value.length >= sLimit) {
            $(targetInput).focus();
            return false;
        }
    });
}


$.isExprDigit = function(value) {
	var regExp = /^[0-9]+$/;
	if ( regExp.test(value.val()) )
		return false;
	
	return true;
}

$.isExprEmail = function(value) {
	var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; 
	if ( regExp.test(value.val()) )
		return false;
	
	return true;
}

$.isExprPhone = function(value) {
	var regExp = /^\d{2,3}-\d{3,4}-\d{4}$/; 
	if ( regExp.test(value.val()) )
		return false;
	
	return true;
}

$.isExprMobile = function(value) {
	var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
	if ( regExp.test(value.val()) )
		return false;
	
	return true;
}

$.isExprBirthDay = function(value) {
	var regExp = /[12][0-9]{3}-[01][0-9]-[0-3][0-9]/;
	var regExp2 = /[12][0-9]{3}[01][0-9][0-3][0-9]/;
	
	if ( regExp.test(value.val()) && regExp2.test(value.val()) )
		return false;
	
	return true;
} 

$.isExprBirthDayShort = function(value) {
	var regExp = /[0-9][0-9][0-1][0-9][0-3][0-9]/;
	if ( regExp.test(value.val()) )
		return false;
	
	return true;
} 

$.isExprSerialNum = function(value) {
	var regExp = /(012345)|(123456)|(234567)|(345678)|(456789)|(567890)|(678901)|(789012)|(890123)|(901234)/;
	if ( regExp.test(value.val()) )
		return false;
	
	return true;
} 

$.isExprMobileNo = function(value) {
	var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
	if ( regExp.test(value.val()) )
		return false;
	
	return true;
} 

$.isExprSex = function(value) {
	var regExp = /[1-4]/;
	if ( regExp.test(value.val()) )
		return false;
	
	return true;
} 

$.validPwd = function(value) {
	var val = value.val();
	
	if ( val.substring(0,3) == val.substring(3,6) )
	{
		return false;
	}
	else if ( 
				val.substring(0,2) == val.substring(2,4)
			|| 	val.substring(0,2) == val.substring(4,6)
			|| 	val.substring(2,4) == val.substring(4,6)
			)
	{
		return false;
	}
	else if ( $.isExprSerialNum(value) )
	{
		return false;
	}
		
	return true;
}

/* YYYYMMDD 형식이나 YYYY-MM-DD 형식 유효성 확인 */
$.isValidDate = function(value) {

	var bDateCheck = true;
	var Value = new String(value.val());
	
	var today = new Date();
	
    var arrDate = Value.replace(/-/g,'');
    var nYear = Number(arrDate.substring(0, 4));
    var nMonth = Number(arrDate.substring(4, 2));
    var nDay = Number(arrDate.substring(6, 8));

    if (nYear < 1900 || nYear > today.getFullYear())
    { 
        bDateCheck = false;
    }

    if (nMonth < 1 || nMonth > 12)
    { 
        bDateCheck = false;
    }

    var nMaxDay = new Date(new Date(nYear, nMonth, 1) - 86400000).getDate();
    if (nDay < 1 || nDay > nMaxDay)
    { 
        bDateCheck = false;
    }
    
    return bDateCheck;
}

$.addCommas = function(input){
	  // If the regex doesn't match, `replace` returns the string unmodified
	  return (input.toString()).replace(
	    // Each parentheses group (or 'capture') in this regex becomes an argument 
	    // to the function; in this case, every argument after 'match'
	    /^([-+]?)(0?)(\d+)(.?)(\d+)$/g, function(match, sign, zeros, before, decimal, after) {

	      // Less obtrusive than adding 'reverse' method on all strings
	      var reverseString = function(string) { return string.split('').reverse().join(''); };

	      // Insert commas every three characters from the right
	      var insertCommas  = function(string) { 

	        // Reverse, because it's easier to do things from the left
	        var reversed           = reverseString(string);

	        // Add commas every three characters
	        var reversedWithCommas = reversed.match(/.{1,3}/g).join(',');

	        // Reverse again (back to normal)
	        return reverseString(reversedWithCommas);
	      };

	      // If there was no decimal, the last capture grabs the final digit, so
	      // we have to put it back together with the 'before' substring
	      return sign + (decimal ? insertCommas(before) + decimal + after : insertCommas(before + after));
	    }
	  );
}


/* For Mobile */
$.closeSetting = function() {
	$.promptMessage(naviAlertTitle.settingPrev, naviAlertMsg.settingPrev, $('#commonPrompt'), $('#promptOk'), "$.closeWindow()");
}

$.closeOrder = function() {
	$.promptMessage(naviAlertTitle.orderEnd, naviAlertMsg.orderEnd, $('#commonPrompt'), $('#promptOk'), "$.closeWindow()");
}

$.closeWindow = function() {
	var sendPayForm  = document.sendPayForm;
	sendPayForm.method = 'POST';
	sendPayForm.action = 'payComplete.do';
	sendPayForm.submit();
}

$.prevSetting = function() {
	var sendPayForm  = document.sendPayForm;
	sendPayForm.method = 'POST';
	sendPayForm.action = 'manageAccount.do';
	sendPayForm.submit();
}

/* For PC */
$.closeWindowSetting = function() {
	$.promptMessage(naviAlertTitle.settingPrev, naviAlertMsg.settingPrev, $('#commonPrompt'), $('#promptOk'), "$.closePopupWindow()");
}

$.closeWindowOrder = function() {
	$.promptMessage(naviAlertTitle.orderEnd, naviAlertMsg.orderEnd, $('#commonPrompt'), $('#promptOk'), "$.closePopupWindow()");
}

$.closeProcess = function(msg) {
	$.promptMessage(naviAlertTitle.orderEnd, msg, $('#commonPrompt'), $('#promptOk'), "$.closePopupWindow()");
}

$.closePopupWindow = function() {
   	if ( window.opener != null ) 
   		window.close();
   	else
   		parent.closeLayerPopup();
}

$.closeAllPopupWindow = function() {
   	if ( window.opener != null ) 
   	{
   		window.close();
   		opener.closeAllPopup();
   	}
   	else
   		parent.closeAllLayerPopup();
}
