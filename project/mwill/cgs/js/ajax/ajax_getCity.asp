<%Option Explicit%>
<%
'*******************************************************************************************
' �� �� �� �� ��	: �з� ����Ʈ���� ��,�� ���ý� ��,�� ó���ϱ����� ajax ������
' ��    ��    ��	: �赿�� (kdhwarfare@mediawill.com)
' ��    ��    ��	: 2009/09/18
' ��    ��    ��	:
' ��    ��    ��	:
' ��          ��	:
' ��  ��  ��  ��  : http://local.loacl.findall.co.kr/js/ajax/ajax_getCity.asp?Metro=����&selectedval=&target=frmEnt.selGu
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
Dim objCmd, Rs, SQL, i, arrCity
Dim strSelectedVal  : strSelectedVal = RequestFilter(Request("selectedval"))

Dim reqMetro '## �����õ�
reqMetro = RequestFilter(Request("Metro")) : If reqMetro="" Or IsNull(reqMetro) Then reqMetro="" End If

Dim reqTarget '## ������ ���� ������ ��ü
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

Result = "<option value=''>��/��/��</option>"

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