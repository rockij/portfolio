<%
'http://local.local.findall.co.kr/js/ajax/reg_CategorySelect.asp?GroupCd=12&Code=0&Step=1
Session.CodePage = 949
Response.CharSet = "euc-kr"
Response.AddHeader "Pragma","no-cache"
Response.AddHeader "Expires","0"
%>
<!-- #include virtual = "/include/Odbc.inc" -->
<!-- #include virtual = "/include/Cm_Function.inc" -->
<%
Dim reqLGroupCd   : reqLGroupCd = Request("GroupCd")
Dim reqCode       : reqCode     = GetEmptyChange(Request("Code"),0)
Dim reqStep       : reqStep     = GetEmptyChange(Request("Step"),1)

Dim reqStepOrg    : reqStepOrg  = reqStep

Dim objCmd
Dim objRs
Dim ArrData
Dim i
Dim strSelctedClass
%>
<%
If reqStepOrg = 3 Then
  strSelctedClass = "bg_reg reg_selected"
Else
  strSelctedClass = "bg_reg reg_arrow"& reqStepOrg
End If
%>
<%
DBOpen("ConnPaper")

  Set objCmd  = Server.CreateObject("Adodb.Command")
  Set objRs   = Server.CreateObject("ADODB.Recordset")

  With objCmd

    .ActiveConnection = ConnPaper
    .CommandText = "GET_F_CGS_SELECT_FINDCODE_PROC"
    .CommandType = adCmdStoredProc

    .Parameters.Append .CreateParameter("@GROUP_CD"       , adTinyInt, adParamInput,   1,   reqLGroupCd)
    .Parameters.Append .CreateParameter("@CODE"           , adInteger, adParamInput,   4,   reqCode)
    .Parameters.Append .CreateParameter("@STEP"           , adTinyInt, adParamInput,   1,   reqStep)

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

  reqStep = reqStep + 1
  reqStep = Cstr(reqStep)

  For i = 0 To Ubound(ArrData,2)
    Response.Write "<li id=""liCate_"& ArrData(0,i) &"""><button type=""button"" onclick=""SetFindCode("+ reqLGroupCd +", "& ArrData(0,i) &", "+ reqStep +")"">"& ArrData(1,i) &"<span class="""& strSelctedClass &"""></span></button></li>"&vblf
  Next
    
End If
%>