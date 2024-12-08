<%
'http://local.local.findall.co.kr/js/ajax/ajax_AutoSiseResult.asp?SiseCode=111193
Session.CodePage = 949
Response.CharSet = "euc-kr"
Response.AddHeader "Pragma","no-cache"
Response.AddHeader "Expires","0"
%>
<!-- #include virtual = "/include/Odbc.inc" -->
<!-- #include virtual = "/include/Cm_Function.inc" -->
<%
Dim reqSiseCode   : reqSiseCode = GetEmptyChange(Request("SiseCode"),0)

Dim objCmd
Dim objRs
Dim ArrData
Dim i

Dim strRs_LastUpdateDt

Dim intRs_SISEID    : intRs_SISEID  = 0
Dim intRs_CODENM3   : intRs_CODENM3 = 1
Dim intRs_GEAR      : intRs_GEAR    = 2
Dim intRs_PRICE     : intRs_PRICE   = 3
Dim intRs_YEAR_1    : intRs_YEAR_1  = 4
Dim intRs_YEAR_2    : intRs_YEAR_2  = 5
Dim intRs_YEAR_3    : intRs_YEAR_3  = 6
Dim intRs_YEAR_4    : intRs_YEAR_4  = 7
Dim intRs_YEAR_5    : intRs_YEAR_5  = 8
Dim intRs_YEAR_6    : intRs_YEAR_6  = 9
Dim intRs_YEAR_7    : intRs_YEAR_7  = 10
Dim intRs_YEAR_8    : intRs_YEAR_8  = 11
Dim intRs_YEAR_9    : intRs_YEAR_9  = 12
Dim intRs_YEAR_10   : intRs_YEAR_10 = 13
%>
<%
DBOpen("ConnPaper")

  Set objCmd  = Server.CreateObject("Adodb.Command")
  Set objRs   = Server.CreateObject("ADODB.Recordset")

  With objCmd

    .ActiveConnection = ConnPaper
    .CommandText = "GET_F_CGS_AUTO_SISE_RESULT_PROC"
    .CommandType = adCmdStoredProc

    .Parameters.Append .CreateParameter("@CODE" , adInteger,  adParamInput, 4,  reqSiseCode)
    Set objRs = .Execute()

  End with

  If Not objRs.Eof Then
    strRs_LastUpdateDt = objRs("LAST_UPDATE")
  End If

  Set objRs = objRs.NextRecordSet

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
    Response.Write "<tr>"&vblf
    Response.Write "  <td class=""col_tit"">"& ArrData(intRs_CODENM3,i) &"</td>"&vblf
    Response.Write "  <td class=""col_price"">"& ArrData(intRs_GEAR,i) &"<br>"& ArrData(intRs_PRICE,i) &"</td>"&vblf
    Response.Write "  <td class=""col_h"">"& ArrData(intRs_YEAR_7,i) &"</td>"&vblf
    Response.Write "  <td class=""col_h"">"& ArrData(intRs_YEAR_6,i) &"</td>"&vblf
    Response.Write "  <td class=""col_h"">"& ArrData(intRs_YEAR_5,i) &"</td>"&vblf
    Response.Write "  <td class=""col_h"">"& ArrData(intRs_YEAR_4,i) &"</td>"&vblf
    Response.Write "  <td class=""col_h"">"& ArrData(intRs_YEAR_3,i) &"</td>"&vblf
    Response.Write "  <td class=""col_v"">"& ArrData(intRs_YEAR_2,i) &"</td>"&vblf
    Response.Write "  <td class=""col_v"">"& ArrData(intRs_YEAR_1,i) &"</td>"&vblf
    Response.Write "</tr>"&vblf
  Next

End If
%>