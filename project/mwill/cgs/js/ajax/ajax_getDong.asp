<%Option Explicit%>
<%
'*******************************************************************************************
' �� �� �� �� ��	: �з� ����Ʈ���� ��,�� ���ý� ��,�� ó���ϱ����� ajax ������
' ��    ��    ��	: �赿�� (kdhwarfare@mediawill.com)
' ��    ��    ��	: 2009/09/18
' ��    ��    ��	:
' ��    ��    ��	:
' ��          ��	:
' ��  ��  ��  ��  :
'*******************************************************************************************

' charSet�� �����ؾ� ������ ���۽��� �۱��� ���� ������ �����մϴ�.
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

Dim reqMetro 	'## �����õ�
reqMetro = RequestFilter(Request("Metro")) : If reqMetro="" Or IsNull(reqMetro) Then reqMetro="" End If

Dim reqCity 	'## �����õ�
reqCity = RequestFilter(Request("City")) : If reqCity="" Or IsNull(reqCity) Then reqCity="" End If

Dim reqTarget '## ������ ���� ������ ��ü
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

Result = "<option value=''>��/��/��</option>"

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