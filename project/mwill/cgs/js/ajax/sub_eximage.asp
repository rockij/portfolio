<%
'http://local.local.findall.co.kr/js/ajax/sub_eximage.asp?LineAdNo=0001236176080180&GroupCd=12
Session.CodePage = 949
Response.CharSet = "euc-kr"
Response.AddHeader "Pragma","no-cache"
Response.AddHeader "Expires","0"
%>
<!-- #include virtual = "/include/Odbc.inc" -->
<!-- #include virtual = "/include/Cm_Function.inc" -->
<%
Dim reqLineAdNo   : reqLineAdNo = Request("LineAdNo")
Dim reqGroupCd    : reqGroupCd  = Request("GroupCd")

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
    .CommandText = "GET_F_CGS_AD_EXIMAGE_PROC"
    .CommandType = adCmdStoredProc

    .Parameters.Append .CreateParameter("@GROUP_CD"       , adTinyInt, adParamInput,   1,   reqGroupCd)
    .Parameters.Append .CreateParameter("@LINEADNO"				, adChar,    adParamInput,   16,  reqLineAdNo)
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
    Response.Write "<li><a href=""javascript:FnExImageView('"& reqLineAdNo &"',"& i &");""><img src="""& ArrData(0,i) &""" alt=""""></a></li>"
  Next

End If
%>