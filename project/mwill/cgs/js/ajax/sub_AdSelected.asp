<%
'http://local.local.findall.co.kr/js/ajax/sub_AdSelected.asp?LineAdNo=0001236176080180
Session.CodePage = 949
Response.CharSet = "euc-kr"
Response.AddHeader "Pragma","no-cache"
Response.AddHeader "Expires","0"
%>
<!-- #include virtual = "/include/Cookie.inc" -->
<!-- #include virtual = "/include/Odbc.inc" -->
<!-- #include virtual = "/include/Cm_Function.inc" -->
<%
Dim reqLineAdNo   : reqLineAdNo = Request("LineAdNo")

Dim objCmd
%>
<%
If FnLen(Ck_UserId) > 0 Then  ' 로그인상태에서만 실행한다.

  DBOpen("ConnPaper")

    Set objCmd  = Server.CreateObject("Adodb.Command")

    With objCmd

      .ActiveConnection = ConnPaper
      .CommandText = "PUT_F_CGS_AD_SELECTED_PROC"
      .CommandType = adCmdStoredProc

      .Parameters.Append .CreateParameter("@LINEADNO"				, adChar,       adParamInput,   16,  reqLineAdNo)
      .Parameters.Append .CreateParameter("@USERID"				  , adVarChar,    adParamInput,   50,  Ck_UserId)
      .Execute()
    End with

    Set objCmd  = Nothing

  DBClose("ConnPaper")

End If
%>