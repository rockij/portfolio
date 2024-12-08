<%Option Explicit%>
<%
'*******************************************************************************************
' 단 위 업 무 명	: 분류 리스트에서 시,도 선택시 구,군 처리하기위한 ajax 페이지
' 작    성    자	: 김동협 (kdhwarfare@mediawill.com)
' 작    성    일	: 2009/09/18
' 수    정    자	:
' 수    정    일	:
' 내          용	:
' 주  의  사  항  : http://local.loacl.findall.co.kr/js/ajax/ajax_getCity.asp?Metro=서울&selectedval=&target=frmEnt.selGu
'*******************************************************************************************

' charSet을 설정해야 데이터 전송시의 글깨짐 현상 방지가 가능합니다.
	Response.Buffer		=	TRUE
	Response.Expires	=	-1

	Session.CodePage = 949
	Response.CharSet = "euc-kr"
	Response.AddHeader "Pragma","no-cache"
	Response.AddHeader "Expires","0"
	Response.AddHeader "Cache-Control","no-cache"
%>
<!-- #include virtual = "/include/Odbc.inc" -->
<!-- #include virtual = "/include/Cm_Function.inc" -->
<%
Dim objCmd, Rs, SQL, i, arrCity
Dim strSelectedVal  : strSelectedVal = RequestFilter(Request("selectedval"))

Dim reqMetro '## 광역시도
reqMetro = RequestFilter(Request("Metro")) : If reqMetro="" Or IsNull(reqMetro) Then reqMetro="" End If

Dim reqTarget '## 생성한 값을 적용할 객체
reqTarget = RequestFilter(Request("target")) : If reqTarget="" Or IsNull(reqTarget) Then reqTarget = "" End If

If reqMetro<>"" Then
	DBOpen("ConnPaper")
		Set objCmd = Server.CreateObject("ADODB.Command")
		With objCmd
			.ActiveConnection = ConnPaper
			.CommandText = "dbo.GET_F_CITY_LIST_PROC"
			.CommandType = adCmdStoredProc
			.Parameters.Append .CreateParameter("@METRO", adChar, adParamInput, 4, reqMetro)

			Set Rs = .Execute()

			If Not(Rs.BOF Or Rs.EOF) Then
				arrCity = Rs.getRows()
			End If

			Rs.Close
			Set Rs = Nothing

		End With
		Set objCmd = Nothing
	DBClose("ConnPaper")

End If

Dim Result

Result = "<option value=''>시/군/구</option>"

If IsArray(arrCity) Then

	For i=0 To UBound(arrCity,2)
        Result = Result & "<option value='" & arrCity(0, i) & "'"

        If Trim(arrCity(0, i)) = strSelectedVal Then
            Result = Result & "	selected = 'selected'"
	    End If

        Result = Result & ">" & arrCity(0, i) & "</option>"
	Next

	Set arrCity = Nothing

End If

Response.write Result
%>