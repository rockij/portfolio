/**
 * Common javascript for 
 * Version 1.0
 * Copyright (C) 2012 by Bbokkun All right reserved.
 * 
 * USING PLUGIN LIST
 * jquery-1.6.1.js
 * jquery.blockUI.js
 * jquery.ui.datepicker.modified.js
 * jquery-ui-1.8.11.custom.min.js
 * jquery-ui-1.8.11.custom.css
 * jquery-extends.js
 * jquery.alphanumeric.js
 * ui.datepicker-ko.js
 */

$.extend({
	URLEncode:function(c){var o='';var x=0;c=c.toString();var r=/(^[a-zA-Z0-9_.]*)/;
	while(x<c.length){var m=r.exec(c.substr(x));
	 if(m!=null && m.length>1 && m[1]!=''){o+=m[1];x+=m[1].length;
	 }else{if(c[x]==' ')o+='+';else{var d=c.charCodeAt(x);var h=d.toString(16);
	 o+='%'+(h.length<2?'0':'')+h.toUpperCase();}x++;}}return o;},
	URLDecode:function(s){var o=s;var b,t;var r=/(%[^%]{2})/;
	while((m=r.exec(o))!=null && m.length>1 && m[1]!=''){b=parseInt(m[1].substr(1),16);
	t=String.fromCharCode(b);o=o.replace(m[1],t);}return o;},
	addParam:function(p,n,v){if(p.length==0){p+=n+'='+v;}else{if(typeof v!='undefined'){p+='&'+n+'='+v;}}return p;},
	UTF8CharByteSize:function(ch){if (ch == null || ch.length == 0) {return 0;}var charCode = ch.charCodeAt(0);
	if(charCode <= 0x00007F) {return 1;} else if (charCode <= 0x0007FF) {return 2;} 
	else if(charCode<=0x00FFFF) {return 3;} else {return 4;}},
	UTF8ByteCount:function(str){if (str==null||str.length==0){return 0;}var size=0;
	for(var i=0;i<str.length;i++) {size += $.UTF8CharByteSize(str.charAt(i));}return size;},
	charByteSizeOnlyEng:function(ch){if(ch==null||ch.length==0){return 0;}var charCode=ch.charCodeAt(0);
	if(escape(ch).length<4){return 1;}else{return 0;}},
	charByteSizeOnlyKor:function(ch){if(ch==null||ch.length==0){return 0;}var charCode=ch.charCodeAt(0);
	if(escape(ch).length>4){return 2;}else{return 0;}},
	byteCount:function(str){if(str==null||str.length==0){return 0;}var size=0;
	for(var i=0;i<str.length;i++){size+=($.charByteSizeOnlyEng(str.charAt(i))+$.charByteSizeOnlyKor(str.charAt(i)));}return size;}, 
	byteCountOnlyEng:function(str){if(str==null||str.length==0){return 0;}var size=0;
	for(var i=0;i<str.length;i++){size+=$.charByteSizeOnlyEng(str.charAt(i));}return size;},
	byteCountOnlyKor:function(str){if(str==null||str.length==0){return 0;}var size=0;
	for(var i=0;i<str.length;i++){size+=$.charByteSizeOnlyKor(str.charAt(i));}return size;}
});

function HashMap(){
	var obj = [];
	function find(key){
		var i = obj.length;
		while(i--){
			var curr = obj[i];
			if(curr[0]===key){
				return i;
			}
		}
		return null;
	}
	var d = function dictionary(key,value){
		var index = find(key);
		if(value){
			if(index !=null){
				obj.splice(index,1);
			}
			obj.push([key,value]);
		}else{
			if(index !=null){
				return obj[index][1];
			}
		}
	} ;
	d.size = function(){
		return obj.length;
	} ;
	d.del = function(key){
		obj.splice(find(key), 1);
	} ;
	d.each=function(func){
		for(var i=0; i<obj.length; i++){
			var item = obj[i];func(item[0],item[1]);
		};
	} ;
	return d;
}

/**
 * 배열오브젝트 중 max 값을 가져온다.
 * $("a").max(function() {return $(this).width(); })
 */
$.fn.max = function(selector) { 
    return Math.max.apply(Math, this.map(function(index, el){return selector.apply(el);}).get() ); 
}

/**
 * 배열오브젝트 중 min 값을 가져온다.
 * $("a").min(function() {return $(this).width(); });
 */
$.fn.min = function(selector) { 
    return Math.min.apply(Math, this.map(function(index, el) { return selector.apply(el); }).get() );
}

/**
 * 왼쪽과 오른쪽의 공백을 제거한다.
 */
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/gi,"");
};

/**
 * 해당문자를 목적문자로 치환한다.
 * @param s 치환될 문자열
 * @param t 목적 문자열
 * ex) var str = str.replaceAll('-'.'');
 */
String.prototype.replaceAll = function(s,t){
	return s.replace('/'+s+'/gi', t);
};

/**
 * email 형식 검사
 * @param s 검사할 문자열
 * @returns Boolean
 */
function cfn_checkEmail(s) {
	var mailexp = /[a-z0-9]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/i;
	return mailexp.test(s);
}

/**
 * 주민등록번호 검사
 * @param n
 * @returns Boolean
 */
function cfn_checkSocialCode(n)
{
	var sum=0;
	var w=2;
  
	if(rnum.length!=13) return false;
 
	for(i=0;i<12;i++) {
		sum += parseInt(rnum.charAt(i))*w;
		w++;
		if(w>9) w=2;
	}

	result =(11-(sum%11))%10;
	if(result==rnum.charAt(12))
		return true;
	else
		return false;
}

/**
 * 올바른 주민등록번호인지 확인
 * 
 * @param ssn 검사할 주민등록번호
 * @param clear 주민번호에 기타문자열 삭제후 검사
 * @returns {Boolean}
 */
function cfn_isSsn(ssn, clear) {
	if (clear === true) {
		ssn = ssn.replace(/[^\d]/, '');
		ssn = ssn.replace(/-/gi, '');
	}
	
	if (!/\d{13}/.test(ssn))
		return false;

	var sum = 0;
	for (var i=0; i<12; i++) {
		sum += (i%8+2) * parseInt(ssn.charAt(i));
	}
	
	var checksum = (11 - (sum % 11)) % 10;
	
	return ssn.substring(12) == checksum;
}

/**
 * 사업자등록번호 확인
 * 
 * @param ssn 검사할 사업자등록번호
 * @param clear 사업자등록번호에 기타문자열 삭제후 검사
 * @returns {Boolean}
 */
function cfn_isVenCod(vencod, clear) {
	if (clear === true) {
		vencod = vencod.replace(/[^\d]/, '');
		vencod = vencod.replace(/-/gi, '');
	}
	
	if (!/\d{10}/.test(vencod))
		return false;
	
	var sum = 0;
	var getlist =new Array(10);
	var chkvalue =new Array("1","3","7","1","3","7","1","3","5");
	for(var i=0; i<10; i++) { getlist[i] = vencod.substring(i, i+1); }
	for(var i=0; i<9; i++) { sum += getlist[i]*chkvalue[i]; }
	sum = sum + parseInt((getlist[8]*5)/10);
	var sidliy = sum % 10;
	var sidchk = 0;
	if(sidliy != 0) { sidchk = 10 - sidliy; }
	else { sidchk = 0; }
	
	return sidchk == getlist[9];
}

/**
 * 개행문자를 <br /> 태그로 바꾼다.
 * @param s
 * @returns
 */
function nl2br(s){
	if(s!=null)return s.replace(/\n/g, "<br />");
	else return '';
}

/**
 * 테이블 클릭시 TR에 하이라이트를 준다.
 * @param tblId 테이블ID
 * @param cls css클래스명
 * @param bgc background-color (ex:#DCBCCF)
 * @returns
 */
function cfn_highlightTr(tblId,cls,bgc){
	$("#"+tblId+" tbody tr").live("click", function(event){
	    var $tr = $(this).closest("tr");
	    if(typeof bgc=='undefined'||bgc==''){bgc='#EAEAEA';}
	    if(typeof cls!='undefined'&&cls!=''){
	    	//remove any selected siblings 
		    $tr.siblings().removeClass(cls);
		    //toggle current row
		    $tr.toggleClass(cls);
	    }else if(typeof bgc!='undefined'&&bgc!=''){
	    	$("#"+tblId+" tbody tr").each(function(){
	    		$(this).css({'background-color' : ''});
	    	});
	    	$tr.css({'background-color' : bgc});
	    }
	}).css({'cursor' : 'pointer'});
}

/**
 * Ajax 파일 다운로드
 * @param url 
 * @param data 파라메터 데이터
 * @param method submit방식(get/post)
 * ex) $.newCreateFormSubmit("/kis/fileDownload",'propPath=templeteFiles.fileDownload&fileName=dmReturnTemplete.xlsx',"post" );
 * ex2) $.newCreateFormSubmit("/kis/send/dmhist/sendFileDownload",$('#frm').serializeForm(),"post" );
 */
$.newCreateFormSubmit = function(url, data, method){
    // url과 data를 입력받음
    if( url && data ){ 
        // data 는  string 또는 array/object 를 파라미터로 받는다.
        data = typeof data == 'string' ? data : $.param(data);
        // 파라미터를 form의  input으로 만든다.
        var inputs = '';
        $.each(data.split('&'), function(){ 
            var pair = this.split('=');
            inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ decodeURIComponent((pair[1]+'').replace(/\+/g, '%20')) +'" />'; 
        });
        // request를 보낸다.
        $('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
        .appendTo('body').submit().remove();
    };
};

/**
 * ajax 로딩
 * @param m 보여줄 메세지
 * ex) 사용할 jsp페이지에 추가 : <script type="text/javascript">cfn_showAjaxLoading();</script>
 * Using jquery.blockUI.js
 */
function cfn_showAjaxLoading(m) {
//	m = m || '로딩중입니다.';

	var layer = $('#loading');
	if (layer.length == 0) {
		layer = $('<div id="loading" style="width:32px"><img src="/common/images/common/ajax-loader.gif"/></div>').appendTo(document.body)
		.css("position","absolute")
		.css("top", Math.max(0, (($(window).height() - layer.outerHeight()) / 2) + $(window).scrollTop()) + "px")
		.css("left", Math.max(0, (($(window).width() - layer.outerWidth()) / 2) + $(window).scrollLeft()) + "px")
		.hide();
	}

	$(document).ajaxStart(function() {
		$('#loading').show().block({ 
			message: null,
			baseZ:-1,
			bindEvents:false,
			overlayCSS:{backgroundColor:'',oapcity:0}
		});
	}).ajaxStop(function() {
		$('#loading').hide().unblock();
	});
}

/**
 * form에 숫자만입력 가능하게 한다.
 * @param commaYn 3자리 콤마사용여부
 * ex) <form:input path="birthDay" cssClass="isNumeric" size="6" maxlength="6"/>
 */
function cfn_isNumeric(commaYn){
	var regExp = /[^0-9]/g;
	$(".isNumeric").css("imeMode","disabled").bind("keypress",function(e){
		if((e.keyCode<8||e.keyCode>9)&&(e.keyCode<48||e.keyCode>57)){return false;}
		else{if(commaYn=='Y')$(this).val(cfn_commify($(this).val()));}
	}).keyup(function(){
		var formVal = $(this).val();
		if(formVal!=null&&formVal!=''){
			$(this).val(formVal.replace(regExp,''));
			if(commaYn=='Y')$(this).val(cfn_commify($(this).val()));
		}
	});
}

/**
 * 숫자만 가능하게.
 * @param on 오브젝트명
 * @param mx 최대 자리수
 * @param ac 허용할 문자열
 * Using jquery.alphanumeric.js
 * ex) cfn_onlyNumeric('bond_coll_fee1_view',10);
 * ex) cfn_onlyNumeric('bond_coll_fee1_view',10,'-');
 */
function cfn_onlyNumeric(on,mx,ac){
	if(typeof mx=="undefined"||mx==""||mx<=0){
		if(typeof ac=="undefined"||ac==""){
			$('input[name='+on+']').numeric();
		}else{
			$('input[name='+on+']').numeric({allow:ac});
		}
	}else{
		if(typeof ac=="undefined"||ac==""){
			$('input[name='+on+']').attr("maxlength",mx).numeric();
		}else{
			$('input[name='+on+']').attr("maxlength",mx).numeric({allow:ac});
		}
	}
}

/**
 * 천단위 금액 콤마 찍기
 * @param n 숫자
 * ex) $("#tot1").text(cfn_commify($("#tot1").text()));
 */
function cfn_commify(n){
	var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
	n += '';  // 숫자를 문자열로 변환

	while (reg.test(n))
		n = n.replace(reg, '$1' + ',' + '$2');

	return n;
}

/**
 * object 공백 체크
 * ex) if(cfn_isEmpty($('#'+objId)))
 */
function cfn_isEmpty(obj) {
	if (obj == null)
		return true;

	if (typeof obj != "object") {
		if (typeof obj == "undefined")
			return true;
		if (obj == "")
			return true;
	}else if (typeof obj != "string") {
		if($(obj).val()=="")
			return true;
	}

	return false;
}

//var popupMap = new HashMap();
/**
 * 공통팝업
 * @param pu 팝업url
 * @param pn 팝업명
 * @param pw 팝업가로사이즈
 * @param ph 팝업세로사이즈
 * @param sc 스크롤여부(yes/no)
 * ex) var w = cfn_comPopup(url, "팝업명", 700, 520, 'yes');
 */
function cfn_comPopup(pu,pn,pw,ph,sc){

	var popWin;
	var sw=screen.width;	// 화면 넓이
	var sh=screen.height;	// 화면 높이
	var ml=(sw-pw)/2;	//left 위치
	var mt=(sh-ph)/2;	//top 위치
	
	if(typeof pu=="undefined"||pu==""){pu='about:blank';}
	if(typeof sc=="undefined"||sc==""){sc='no';}
	var po='width='+pw+'px,height='+ph+'px,top='+mt+'px,left='+ml+'px,resizable=no,scrollbars='+sc;
	
	// 같은창이 있을 경우, 창을 닫았다가 새롭게 열도록 한다.
//	try{
//		popupMap(pn).close();	// get popup Object and close
//		popupMap.del(pn);	// delete popupMap
//	}catch(e){}
	popWin = window.open(pu,pn,po);
	popWin.focus();
//	if(typeof popWin!="undefined" && popWin!= null){
//		popWin.focus();
//		popupMap(pn,popWin);	// put object
//	}
	
	return popWin;
}

/**
 * 쿠키 명으로 쿠키를 가져온다.
 * @param s 쿠키명
 * @returns
 */
function cfn_getCookie(s) {
	var strArg = new String(s + "=");
	var nArgLen, nCookieLen, nEnd;
	var i = 0, j;

	nArgLen    = strArg.length;
	nCookieLen = document.cookie.length;

	if(nCookieLen > 0) {
		while(i < nCookieLen) {
			j = i + nArgLen;
			if(document.cookie.substring(i, j) == strArg) {
				nEnd = document.cookie.indexOf (";", j);

				if(nEnd == -1) nEnd = document.cookie.length;
					return unescape(document.cookie.substring(j, nEnd));
			}

			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0)
				break;
		}
	}

	return("");
}

/**
 * 최대자리수를 체크하여 리턴시킨다. 
 * @param on 오브젝트명
 * @param mx 최대 자리수
 */
function cfn_setCheckMaxlength(on,mx){
	$('input[name='+on+']').keyup(function(e){
		if (e.which != 13 && e.which != 8) {
			var str = $.trim($(this).val());
			var length = str.length;
			var byteCnt = $.byteCount(str);
			var engByteCnt = $.byteCountOnlyEng(str);
			var hanByteCnt = $.byteCountOnlyKor(str)/2;
			
			if(byteCnt>mx){
				alert("최대 자리수 "+mx+"을 초과했습니다.");

				// 마지막에 들어온 키코드 이벤트.
				if(e.which>128){
					length-=1;
					byteCnt-=2;
				}else{
					length-=1;
					byteCnt-=1;
				}
				
				// TODO: 지금은 도저히 생각이 안난다..-_-; 로직개선은 나중에 다시해야지.				
//				alert(str.length+"::"+byteCnt+"::"+engByteCnt+"::"+hanByteCnt+"::"+m);
				var subStringCnt = byteCnt;

				if(subStringCnt>=mx){
					subStringCnt = mx-hanByteCnt;
				}
				$(this).val(str.substring(0,subStringCnt));
				$(this).focus();
				
				return;
			}
		}
	});
}

/**
 * 날짜 선택상자를 띄운다.
 * @param on 오브젝트명
 * @param mx 최대 자리수
 * Using(순서대로 import할것.) jquery-ui-1.8.11.custom.css, jquery-ui-1.8.9.custom.min.js, jquery.blockUI.js, jquery.ui.datepicker.modified.js, jquery.alphanumeric.js, ui.datepicker-ko.js
 * ex) $(document).ready(function() { cfn_datepicker('start_dt',onSelectFunctionName); });
 */
function cfn_datepicker(ds, fn) {
	$("#" + ds).datepicker({
		beforeShow : function(){
			//alert(); 
		},
		showOn : "button",
		buttonId : ds+"Img",
		buttonText : $("#" + ds).attr("title"),
		buttonImage : "/static/js/jquery/img/month_icon.gif", // 버튼이미지에 사용할 이미지 경로
		buttonImageOnly : true, // 버튼이미지를 나오게 한다.
		//monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월','9월', '10월', '11월', '12월' ], // 월 한글로 출력
		//dayNamesMin : [ '일', '월', '화', '수', '목', '금', '토' ], // 요일 한글로 출력
		dateFormat : 'yy-mm-dd', // 데이터 포멧형식
		// minDate: '-3M', //오늘 부터 3달전까지만 선택 할 수 있다.
		// maxDate: '+36M', //오늘 부터 36개월후까지만 선택 할 수 있다.
		changeYear : true, // 년별로 선택 할 수 있다.
		changeMonth : true, // 달별로 선택 할 수 있다.
		showMonthAfterYear : true, // 년 뒤에 월 표시
		showOtherMonths : false, // 이번달 달력안에 상/하 빈칸이 있을경우 전달/다음달 일로 채워준다.
		selectOtherMonths : true,
		numberOfMonths : 1, // 오늘부터 3달치의 달력을 보여준다.
		showButtonPanel : false, // 오늘 날짜로 돌아가는 버튼 및 닫기 버튼을 생성한다.
		onSelect : fn
	})
	.attr("maxlength","10").numeric({allow:"-"})
	.bind("keypress",function(e){
		var val = $(this).val().replace(/[^0-9]/g,'');		
		if(val.length==8){
			year = val.substr(0,4);
			month = val.substr(4,2);
			day = val.substr(6,2);
			$(this).val(year+'-'+month+'-'+day);
		}
	}).trigger("keypress");
	
	$(".ui-datepicker-trigger").css('margin', '4px');
	$(".ui-datepicker-trigger").mouseover(function() {
		$(this).css('cursor', 'pointer');
	});
}

/**
 * 날짜(월) 선택상자를 띄운다.
 * @param on 오브젝트명
 * @param mx 최대 자리수
 * Using jquery-extends.js, jquery-ui-1.8.9.custom.min.js, jquery.blockUI.js, jquery.ui.datepicker.modified.js, ui.datepicker-ko.js
 * ex) cfn_datepickerMonth('start_dt');
 */
function cfn_datepickerMonth(ds, fn){
	$("#" + ds).datepicker({
		monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월','9월', '10월', '11월', '12월' ], // 월 한글로 출력
		buttonId : ds+"Img",
		buttonText : $("#" + ds).attr("title"),
		buttonImage : "/static/js/jquery/img/month_icon.gif", // 버튼이미지에 사용할 이미지 경로
		dateFormat : 'yy-mm', // 데이터 포멧형식
		// minDate: '-3M', //오늘 부터 3달전까지만 선택 할 수 있다.
		// maxDate: '+36M', //오늘 부터 36개월후까지만 선택 할 수 있다.
		changeYear : true, // 년별로 선택 할 수 있다.
		changeMonth : true, // 달별로 선택 할 수 있다.
		showMonthAfterYear : true, // 년 뒤에 월 표시

        onClose: function(dateText, inst) {
            var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
            $(this).val($.datepicker.formatDate('yy-mm', new Date(year, month, 1)));
        }
    })
    .attr("maxlength","7").numeric({allow:"-"})
    .bind("keypress",function(e){
		var val = $(this).val().replace(/[^0-9]/g,'');		
		if(val.length==6){
			year = val.substr(0,4);
			month = val.substr(4,2);
			$(this).val(year+'-'+month);
		}
	}).trigger("keypress");

	$("#" + ds).focus(function () {
        $(".ui-datepicker-calendar").hide();
        $("#ui-datepicker-div").position({
            my: "center top",
            at: "center bottom",
            of: $(this)
        });
    });
}

/**
 * 날짜 형식 검사
 * @param stObjId 시작일자 오브젝트id
 * @param edObjId 종료일자 오브젝트id
 * ex) cfn_dateCheck('start_dt','end_dt');
 */
function cfn_dateCheck(stObjId,edObjId){
	var rtn = true;
	var stval = cfn_dateDiv(stObjId,'');
	var edval = cfn_dateDiv(edObjId,'');

	dateValid("day",stObjId);
	dateValid("day",edObjId);

	if(stval!=''&&edval!=''){
		if(parseInt(stval)>parseInt(edval)){
			rtn = false;
		}
	}else{
		$('#'+stObjId).val('');
		$('#'+edObjId).val('');
	}
	return rtn;
}

/**
 * 날짜 타입 포맷을 한다.
 * ex) cfn_setDateMask('start_dt','-');
 * ex) cfn_setDateMask('start_dt','');
 */
function cfn_setDateMask(objId,maskchar){
	var $o;
	
	if(cfn_isEmpty($('#'+objId))) {
		return '';
	}else {
		$o = $('#'+objId);
	}
	$o.val(cfn_dateDiv(objId,maskchar));
}

/**
 * 날짜 타입 포맷을 한다.
 * ex) cfn_dateDiv('start_dt','-');
 * ex) cfn_dateDiv('start_dt','');
 */
function cfn_dateDiv(objId,maskchar){
	var expNum = /[^0-9]/g;
	var year=month=day=val = '';
	var $o;
	
	if(cfn_isEmpty($('#'+objId))) {
		return '';
	}else {
		$o = $('#'+objId);
		val = $o.val().replace(/[^0-9]/g,'');
	}
	
	if(val.length==6){
		year = val.substr(0,4);
		month = val.substr(4,2);
		val = year+maskchar+month;
	}
	else if(val.length==8){
		year = val.substr(0,4);
		month = val.substr(4,2);
		day = val.substr(6,2);
		val = year+maskchar+month+maskchar+day;
	}
	
	return val;
}

/**
 * 날짜 형식 체크
 * 
 */
function dateValid(tp,oId){
	var rtn = true;
	var expDay = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
	var expMonth = /^(19|20)\d{2}-(0[1-9]|1[012])$/;
	
	if($('#'+oId).val()!=''){
		if(tp=="day"){
			if(!expDay.test($('#'+oId).val())){
				alert("날짜 형식이 올바르지 않습니다. \n\n YYYY-MM-DD 형식으로 입력하세요.");
				//rtn = false;
				return;
			}
		}else if(tp=="month"){
			if(!expMonth.test($('#'+oId).val())){
				alert("날짜 형식이 올바르지 않습니다. \n\n YYYY-MM 형식으로 입력하세요.");
				//rtn = false;
				return;
			}
		}
	}
	//return rtn;
}

/**
 * 공통 파일 다운로드
 * 
 */
function fn_downloadFile(fileName, fileType, keyNum, date, pFileEnc) {
	if(keyNum==null || typeof keyNum=="undefined"){
		keyNum = "";
	}
	if(date==null || typeof date=="undefined"){
		date = "";
	}
	if(pFileEnc==null || typeof pFileEnc=="undefined"){
		pFileEnc = "";
	}
	$("#fileDownload").remove();
	$("body").append("<iframe id='fileDownload' width='0' height='0' />");
	$("#fileDownload")[0].src = encodeURI("/common/downloadFile.do?fileName=" + fileName + "&fileType=" + fileType + "&keyNum=" + keyNum + "&date=" + date + "&pFileEnc=" + pFileEnc);
}

// 상태 관리를 위한 global 변수
var G_COMMON = {};

// AJAX Callback 함수를 위한 변수
var ajaxCallback;

/**
 * AJAX Submit
 * 
 * @param targetUrl Target URL
 * @param params Parameters
 * @param callback Callback function
 * @param disable disable flag
 * @return void
 */
function gfn_ajaxSubmit(targetUrl, params, callback, disable, type) {

	if(disable!=false) {
		G_COMMON.ajaxSourceObject = gfn_getEventSource(G_COMMON.lastEvent);
		$(G_COMMON.ajaxSourceObject).attr("disabled", true);
	}
	params["AJAX_PARAM"] = "ajax";
	
	ajaxCallback = callback;
	
	$.ajax({
		url:targetUrl,
		type:'POST',
		data:params,
		async: type,
		dataType:'xml',
		timeout:0,
		error:gfn_ajaxSubmitErrorHandler,
		success:gfn_ajaxSubmitCallback
	});
}

/**
 * AJAX Error Handler
 * 
 * @param XMLHttpRequest XMLHttpRequest
 * @param textStatus Status
 * @param errorThrown Error
 * @return void
 */
function gfn_ajaxSubmitErrorHandler(XMLHttpRequest, textStatus, errorThrown) {

	$(G_COMMON.ajaxSourceObject).attr("disabled", false);

	if(textStatus=="parsererror") {
		alert("서버에서 에러가 발생하였습니다. 관리자에게 문의하십시오.");
	} else if(textStatus=="error") {
		alert("서버가 응답하지 않습니다. 관리자에게 문의하십시오.");
	} else {
		alert("[" + textStatus + "]");
	}
}

/**
 * AJAX Callback function
 * 
 * @param xml 서버에서 수신한 XML 데이터
 * @return void
 */
function gfn_ajaxSubmitCallback(xml) {
	
	$(G_COMMON.ajaxSourceObject).attr("disabled", false);
	
	var sessionCheck = "";
	
	if(sessionCheck=="false") {
		alert("세션이 만료되어 로그인 페이지로 이동합니다.");

		if(opener) {
			opener.top.location.href = "/";
			self.close();
		} else {
			top.location.href = "/";
		}
	} else {
		ajaxCallback(xml);
	}
}

/**
 * event를 발생시킨 Event Source를 리턴
 * 
 * @param evt event
 */
function gfn_getEventSource(evt) {
	if(evt.target) return evt.target;
	else return evt.srcElement;
};

// 숫자만 입력
function gfn_enterNumeric(objEle, strValue){
	if (isNaN(strValue)){
		alert ('숫자만 입력 가능합니다');
		objEle.value = '';
		return;
	}
}

//엑셀 파일 체크(file : 파일 이름) file확장자
function gfn_fileCheck(file, fileType){
    var src = getFileType(file);
    if(typeof fileType=='undefined'||fileType=='' 
    	|| fileType == "xls"){
	    if(!(src.toLowerCase() == "xls")){
	        return false;
	    }
    }else{
    	if(!(src.toLowerCase() == fileType)){
    		return false;
    	}
    }
    return true;
}

function getFileType(filePath){
    var index = -1;
        index = filePath.lastIndexOf('.');
    var type = "";
    if(index != -1){
        type = filePath.substring(index+1, filePath.len);
    }else{
        type = "";
    }
    return type;
}

/* 글자수 제한 */	
function fn_checkLen(obj, lenObj, maxlen){		
	var comments = $("#"+obj).val() ;
	var commentsLength = comments.length ;
	var len = 0;
	
	var keepCommentsLength = 0 ;	
	
	for(var i=0 ; i<commentsLength ; i++) {
        var c = escape(comments.charAt(i));
        if(c.length == 1) len ++;
        else if(c.indexOf("%u") != -1) len += 2;
        else if(c.indexOf("%") != -1) len += c.length/3;
        
        if(len >= Number(maxlen) ){
        	keepCommentsLength = i ;
        }
    }
	
	/*
	if(len >= Number(maxlen) ){
		alert("총 " + maxlen + "byte를 넘을 수 없습니다.");
		$("#"+obj).val(comments.substring(0, keepCommentsLength));
		$("#"+lenObj).text(maxlen);
		return len ;
	}	
	*/	
	$("#"+lenObj).text(len);
	
	return len ;
}


/**
 * AJAX 호출 결과 XML을 Select Box Option에 추가
 * 
 * @param objId Select Box ID
 * @param xml XML Data
 * @param nameAndValue Name, Value로 사용할 Element Name
 * @param selectedValue 선택된 값
 */
function gfn_setSelectBox(objId, xml, nameAndValue, selectedValue) {
	var obj = $("#" + objId);
	
	var nameAndValueArr = nameAndValue.split(",");
	var nameElementName = nameAndValueArr[0];
	var valueElementName = nameAndValueArr[1];
	
	// option 삭제
	obj.empty();

	// option 추가
	$(xml).find("item").each(function() {
		var item = $(this);

   		//cfDebug($("value", item).text() + "/" + $("text", item).text());
		
		// 조회조건 유지
		var selected = "";
		
		if(selectedValue && selectedValue==$(valueElementName, item).text()) {
			selected = "selected";
		}
		
   		var option = "<option value='" + $(valueElementName, item).text() + "' " + selected + ">"
   		           + $(nameElementName, item).text()
                   + "</option>";
   		
		obj.append(option);
	});
}


/**
 * URL체크 로직
 * 
 * @param objId Input Box ID
 */
function gfn_checkUrlBox(objId) {
	if($("#"+objId).val().indexOf("http://") == 0 || $("#"+objId).val().indexOf("https://") == 0){
		return true;
	}else{
		$("#"+objId).focus();
		return false;
	}
}

/**
 * 첨부파일 확장자 추출
 * 
 * @param 첨부파일 이름
 */
function gfn_getFileType(filePath){
    var index = -1
        index = filePath.lastIndexOf('.');
    var type = "";

    if(index != -1){
        type = filePath.substring(index+1, filePath.len);
    }else{
        type = "";
    }
    return type;
}

/**
 * 메뉴 전체보기
 * 
 * @param 메뉴 전체보기
 */
function totalmenu(){
	if(document.getElementById('sitemap_box').style.display=="block"){
		document.getElementById('sitemap_box').style.display="none";
	}else{
		document.getElementById('sitemap_box').style.display="block";
	}
}

/**
 * 메뉴 전체보기
 * 
 * @param 내용에 0, 0.0, 0.00을 -로 치환한다 
 */
function gfn_isEmptyG(){
	$(".isEmptyG").each(function(){
		var content = $(this).text();
		if( content == '0' || content == '0.0' || content == '0.00' || content == ''){
			$(this).text('- ');
		}
	});
}

function gfn_layer(){
	var layerWindow = $('.mw_layer');
	layerWindow.addClass('open');
}

function gfn_ofLayer(){
	var layerWindow = $('.mw_layer');
	layerWindow.removeClass('open');
}

/**
 * 오랜 시간 처리 시 대기중 화면 처리
 * 
 */
function gfn_layerGrid() {
	var str = "<div class='mw_layer'>\n"; 
	str += "<div class='bg'></div>\n";
//	str += "<div id='layer' align='center' style='height: 48px'>\n";
//	str += "<b style='color:#DD332B'></b><br/></div>\n";
//	str += "</div>";
	
	str += "<div id='totalnew_wrap'>\n";  
	str += "  	<div id='totalnew'>\n";      
	str += "    	<div>\n";  
	str += "      		<div id='profileDiv' style='display: none;'>\n"; 
	str += "        		<img src='/static/images/portal/company/layer2.png' alt='Home' title='Home' onclick='javascript:fn_showDiv();' />\n"; 
	str += "      		</div>\n"; 
	str += "    	</div>\n"; 
	str += "  </div>\n"; 
	str += "</div>\n"; 
	
	$("body").append(str);
}
