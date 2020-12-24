<%Option Explicit%>
<%
'*******************************************************************************************
' 단 위 업 무 명	: 지역 SelectBox 처리하기 위한 ajax 페이지
' 작    성    자	: 이 근 우
' 작    성    일	: 2014/07/31
' 수    정    자	:
' 수    정    일	:
' 내          용	:
' 주  의  사  항  : http://local.local.findall.co.kr/js/ajax/ajax_AreaCodeCombo.asp?Kind=1&Level=2&AreaCode=11&SelectVal=
'*******************************************************************************************

'charSet을 설정해야 데이터 전송시의 글깨짐 현상 방지가 가능합니다.
Session.CodePage = 949
Response.CharSet = "euc-kr"
Response.AddHeader "Pragma","no-cache"
Response.AddHeader "Expires","0"
%>
<!-- #include virtual = "/include/Odbc.inc" -->
<!-- #include virtual = "/include/Cm_Function.inc" -->
<%
Dim objCmd, objRs 
Dim i, arrArea
Dim reqKind                 : reqKind             = RequestFilter(Request("Kind"))              '## 구분
Dim reqLevel                : reqLevel            = RequestFilter(Request("Level"))             '## Depth
Dim reqAreaCode             : reqAreaCode         = RequestFilter(Request("AreaCode"))          '## 조회할 지역코드
Dim reqSelectedVal          : reqSelectedVal      = RequestFilter(Request("SelectVal"))         '## 선택된 지역

If reqKind <> "" And reqLevel <> "" Then

  DBOpen("ConnPaper")

    Set objCmd = Server.CreateObject("ADODB.Command")

    With objCmd
      .ActiveConnection = ConnPaper
      .CommandText = "GET_CM_AREA_COMBO_BOX_CODE_PROC"
      .CommandType = adCmdStoredProc
      .Parameters.Append .CreateParameter("@KIND"             , adTinyInt, adParamInput,  1, reqKind)
      .Parameters.Append .CreateParameter("@LEVEL"            , adTinyInt, adParamInput,  1, reqLevel)
      If reqAreaCode = "" Then
      .Parameters.Append .CreateParameter("@AREA_CODE"        , adInteger, adParamInput,  1, "0")
      Else
      .Parameters.Append .CreateParameter("@AREA_CODE"        , adInteger, adParamInput,  1, reqAreaCode)
      End If

      Set objRs = .Execute()

      If Not (objRs.Bof Or objRs.Eof) Then
        arrArea = objRs.getRows()      
      End If

      objRs.Close
      Set objRs = Nothing

    End With

    Set objCmd = Nothing

  DBClose("ConnPaper")

End If

If IsArray(arrArea) Then

	For i = 0 To UBound(arrArea, 2)
    If Trim(arrArea(0, i)) = reqSelectedVal Then
      Response.Write "<option value=""" & arrArea(0,i) & """ selected=""selected"">" & arrArea(1,i) & "</option>"
    Else
      Response.Write "<option value=""" & arrArea(0,i) & """>" & arrArea(1,i) & "</option>"
    End If
	Next

	Set arrArea = Nothing
  
End If
%>
