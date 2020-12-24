(function(window){
	var captcha = window.captcha = {};
	var captcha_init = captcha.init = {};
	var OBJ = {};
	var MSG = {}; 
	captcha.captcharCertType = ''
	captcha.phoneNo = '';
	captcha_init.event = function(spec,msg){
		var object = spec || {};
		var message = msg || {};
		OBJ = default_obj(object);	
		MSG = default_msg(message);	
		event.excute();
	}
	captcha.setSafeNum = function(data){
		event.setSafeNum(data);
	}
	captcha.getNewCaptcha = function(url){
		api.getNewCaptcha(url);
	}
	captcha.close = function(){
		event.close();
	}
	
	
	
	var callDefaultObjList = function(){
		var defaultObjList =  {
			submit_captcha : $("#submit_captcha")
			,new_safe_num : $('#newSafeNum')
			,modal : $('#modal2')
			,answer_captcha : $('#answer_captcha')
			,img_captcha : $('#img_captcha')
			,safeNumCancel : $('#safeNumCancel')
			,e_requestBtn : $('#e_requestBtn')
			,requestBtn : $('#requestBtn')
			,close : $('.close')
			,section_stepB : $('#section_stepB') 
		}
		return defaultObjList;
	}
	
	// 디폴트 문구 각 페이지별로 수정 가능
	var defaultMsg = {
		   MESG_VALID_AUTH_INPUT : "올바른 보안문자를 입력해주세요.",
		   MESG_VALID_AUTH_INPUT_02 : "보안인증을 완료해주세요."
	}
	
	/*
	* 새로운 객체(that)에다가 디폴트 객체나 문구를 바인딩 시켜서 새로운 객체 리턴한다.
	* spec 객체에 값이 있으면 우선시 되고 없으면 디폴트 객체 값을 반영
	* 
	*/
	var default_obj = function(spec){
		var that = {};
		var call_obj = callDefaultObjList();
		for(key in call_obj) {
			
			var str = call_obj[key];
			that[key] = function(str){
				return spec[key] || str;	
			}(str);
		}
		return that;
	}	

	var default_msg = function(spec){
		var that = {};	
		for(key in defaultMsg) {
			
			var str = defaultMsg[key];
			that[key] = function(str){
				return spec[key] || str;	
			}(str);
		}
		return that;
	}
	
	var event = {
		excute : function(){
			event.init();
		},
		init : function(){
			//캡차 입력후 전송버튼 클릭. 각페이지마다 해당하는 버튼 tirgger를 건다.
			OBJ.submit_captcha.click(function() {
				if($("#g-recaptcha").length > 0) {
					var v = grecaptcha.getResponse();
					if(v.length == 0) {
						alert(defaultMsg.MESG_VALID_AUTH_INPUT_02)
						return false;
					}
				} else {
					if(!OBJ.answer_captcha.val()){
						alert(defaultMsg.MESG_VALID_AUTH_INPUT)
						return false;
					}
				}
				//홈페이지에서 가입과 해지 인증문자가 발송이 한페이지에 존재하기때문에
				if(captcha.captcharCertType == 'E'){
					OBJ.e_requestBtn.trigger('click');
				}else{					
					OBJ.requestBtn.trigger('click');
				}
				return false;
			});
			OBJ.new_safe_num.click(function(){
				var url ='/create/captcha.json';
				api.getNewCaptcha(url);
				return false;
			});
			OBJ.safeNumCancel.click(function(){
				location.reload();
				return false;
			});
		},
		//캡차설정
		setSafeNum : function(data){
			OBJ.modal.trigger('click');
			OBJ.answer_captcha.val("");
			OBJ.answer_captcha.focus();
//			OBJ.img_captcha.attr("src", "/captcha.png?t=" + captcha.cert0 + "&v=" + captcha.cert1);		
			
			captcha.phoneNo = data.result.phoneNo
			var d = new Date();
			var n = d.getMilliseconds();
			OBJ.img_captcha.attr("src", "/captcha.png?t=" + captcha.phoneNo+"&v="+ n);				
		}
		,close : function(){
			OBJ.section_stepB.hide();
//			OBJ.close.trigger('click');
			$('#mask, .window').hide();
			OBJ.answer_captcha.val("");
			
		}
	}
	var api = {
		getNewCaptcha : function(url){
			$.post(url, {'phoneNo' :captcha.phoneNo}, function(data){
				
				if('Y' == data.isSuccess){
					event.setSafeNum(data);
	    		}else{
	    			alert(data.errorMessage);
	    		}
	    	},'json');
			
		}
	}
})(window);


