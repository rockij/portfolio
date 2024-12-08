<%Option Explicit%>
<%
'*******************************************************************************************
' 단 위 업 무 명	: 분류 리스트에서 시,도 선택시 구,군 처리하기위한 ajax 페이지
' 작    성    자	: 김동협 (kdhwarfare@mediawill.com)
' 작    성    일	: 2009/09/18
' 수    정    자	:
' 수    정    일	:
' 내          용	:
' 주  의  사  항  :
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
Dim objCmd, Rs, SQL, i, arrDong

Dim strSelectedVal  : strSelectedVal = RequestFilter(Request("selectedval"))

Dim reqMetro 	'## 광역시도
reqMetro = RequestFilter(Request("Metro")) : If reqMetro="" Or IsNull(reqMetro) Then reqMetro="" End If

Dim reqCity 	'## 광역시도
reqCity = RequestFilter(Request("City")) : If reqCity="" Or IsNull(reqCity) Then reqCity="" End If

Dim reqTarget '## 생성한 값을 적용할 객체
reqTarget = RequestFilter(Request("target")) : If reqTarget="" Or IsNull(reqTarget) Then reqTarget = "" End If

If reqMetro<>"" And reqCity<>"" Then
	DBOpen("ConnPaper")
		Set objCmd = Server.CreateObject("ADODB.Command")
		With objCmd
			.ActiveConnection = ConnPaper
			.CommandText = "dbo.GET_F_MULTIDONG_LIST_PROC"
			.CommandType = adCmdStoredProc
			.Parameters.Append .CreateParameter("@METRO", adVarChar, adParamInput, 50, reqMetro)
			.Parameters.Append .CreateParameter("@CITY", adVarChar, adParamInput, 50, reqCity)

			Set Rs = .Execute()

				If Not(Rs.BOF Or Rs.EOF) Then
					arrDong = Rs.getRows()
					Rs.Close
				End If

			Set Rs = Nothing

		End With
		Set objCmd = Nothing
	DBClose("ConnPaper")

End If

Dim Result

Result = "<option value=''>동/읍/면</option>"

If IsArray(arrDong) Then

	For i=0 To UBound(arrDong,2)
    Result = Result & "<option value='" & arrDong(0, i) & "'"

    If Trim(arrDong(0, i)) = strSelectedVal Then
      Result = Result & "	selected = 'selected'"
	  End If

    Result = Result & ">" & arrDong(0, i) & "</option>"
	Next

	Set arrDong = Nothing

End If

Response.write Result
%>