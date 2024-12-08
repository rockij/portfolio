<%Option Explicit%>
<%
'*******************************************************************************************
' �� �� �� �� ��	: ���� SelectBox ó���ϱ� ���� ajax ������
' ��    ��    ��	: �� �� ��
' ��    ��    ��	: 2014/07/31
' ��    ��    ��	:
' ��    ��    ��	:
' ��          ��	:
' ��  ��  ��  ��  : http://local.local.findall.co.kr/js/ajax/ajax_AreaCodeCombo.asp?Kind=1&Level=2&AreaCode=11&SelectVal=
'*******************************************************************************************

'charSet�� �����ؾ� ������ ���۽��� �۱��� ���� ������ �����մϴ�.
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
Dim reqKind                 : reqKind             = RequestFilter(Request("Kind"))              '## ����
Dim reqLevel                : reqLevel            = RequestFilter(Request("Level"))             '## Depth
Dim reqAreaCode             : reqAreaCode         = RequestFilter(Request("AreaCode"))          '## ��ȸ�� �����ڵ�
Dim reqSelectedVal          : reqSelectedVal      = RequestFilter(Request("SelectVal"))         '## ���õ� ����

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
