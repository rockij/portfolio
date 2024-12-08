<%
Session.CodePage = 949
Response.CharSet = "euc-kr"
Response.AddHeader "Pragma","no-cache"
Response.AddHeader "Expires","0"
%>
<!-- #include virtual = "/include/Cm_Function.inc" -->
<%
Dim reqGbn :  reqGbn = RequestFilter(Request("Gbn"))

Server.Execute("/batch/main/result/new_wrap_"& reqGbn &".inc")
%>