<%
'http://local.local.findall.co.kr/js/ajax/ajax_AutoSiseCode.asp?Code=0&Step=1
Session.CodePage = 949
Response.CharSet = "euc-kr"
Response.AddHeader "Pragma","no-cache"
Response.AddHeader "Expires","0"
%>
<!-- #include virtual = "/include/Odbc.inc" -->
<!-- #include virtual = "/include/Cm_Function.inc" -->
<%
Dim reqCode   : reqCode = GetEmptyChange(Request("Code"),0)
Dim reqStep   : reqStep = GetEmptyChange(Request("Step"),1)

Dim objCmd
Dim objRs
Dim ArrData
Dim i
%>
<%
DBOpen("ConnPaper")

  Set objCmd  = Server.CreateObject("Adodb.Command")
  Set objRs   = Server.CreateObject("ADODB.Recordset")

  With objCmd

    .ActiveConnection = ConnPaper
    .CommandText = "GET_F_CGS_AUTO_SISE_CODE_PROC"
    .CommandType = adCmdStoredProc

    .Parameters.Append .CreateParameter("@CODE" , adInteger,  adParamInput, 4,  reqCode)
    .Parameters.Append .CreateParameter("@STEP" , adTinyInt,  adParamInput, 1,  reqStep)
    Set objRs = .Execute()
  End with

  If Not objRs.Eof Then
    ArrData = objRs.GetRows
  End If
  
  objRs.Close
  
  Set objRs   = Nothing
  Set objCmd  = Nothing

DBClose("ConnPaper")
%>
<%
If IsArray(ArrData) Then

  For i = 0 To Ubound(ArrData,2)
    Response.Write "<option value="""& ArrData(0,i) &""">"& ArrData(1,i) &"</option>"
  Next

End If
%>