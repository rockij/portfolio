<%
'http://local.local.findall.co.kr/js/ajax/ajax_FAT_PriceResult.asp?GroupCd=12&StCnt=5&OptTerm=30
Session.CodePage = 949
Response.CharSet = "euc-kr"
Response.AddHeader "Pragma","no-cache"
Response.AddHeader "Expires","0"
%>
<!-- #include virtual = "/include/Odbc.inc" -->
<!-- #include virtual = "/include/Cm_Function.inc" -->
<%
Dim reqGroupCd    : reqGroupCd  = Request("GroupCd")
Dim reqStCnt      : reqStCnt    = Request("StCnt")
Dim reqOptTerm    : reqOptTerm  = Request("OptTerm")

Dim objCmd
Dim objRs
Dim ArrData
Dim i

Dim intFAT_ID
Dim intOPT_PRICE
%>
<%
DBOpen("ConnPaper")

  Set objCmd  = Server.CreateObject("Adodb.Command")
  Set objRs   = Server.CreateObject("ADODB.Recordset")

  With objCmd

    .ActiveConnection = ConnPaper
    .CommandText = "GET_F_CGS_FAT_SELECT_PRICE_PROC"
    .CommandType = adCmdStoredProc

    .Parameters.Append .CreateParameter("@GROUP_CD"     , adTinyInt,    adParamInput, 1,  reqGroupCd)
    .Parameters.Append .CreateParameter("@STANDARD_CNT" , adInteger,    adParamInput, 4,  reqStCnt)
    .Parameters.Append .CreateParameter("@OPT_TERM"     , adSmallInt,   adParamInput, 2,  reqOptTerm)
    Set objRs = .Execute()

  End with

  If Not objRs.Eof Then
    intFAT_ID     = objRs("FAT_ID")
    intOPT_PRICE  = objRs("OPT_PRICE")
  End If

  objRs.Close
  
  Set objRs   = Nothing
  Set objCmd  = Nothing

DBClose("ConnPaper")
%>
<%
Response.Write intFAT_ID &"|"& intOPT_PRICE
%>