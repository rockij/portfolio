<%
'*******************************************************************************************
' �� �� �� �� ��	: ���� ��ǥ �ҷ�����
' ��    ��    ��	: �� �� ��(stari@mediawill.com)
' ��    ��    ��	: 2013/08/07
' ��    ��    ��	:
' ��    ��    ��	:
' ��          ��	:
' ��  ��  ��  ��  : http://local.local.findall.co.kr/js/ajax/ajax_getMap.asp?Addr=���� ������ ���ﵿ 648
'*******************************************************************************************
%>
<!-- #include virtual = "/include/Const.inc" -->
<%
'CharSet�� �����ؾ� ������ ���۽��� �۱��� ���� ������ �����մϴ�.
Session.CodePage = 949
Response.CharSet = "euc-kr"
Response.AddHeader "Pragma","no-cache"
Response.AddHeader "Expires","0"
%>
<!-- #include virtual = "/include/Cm_Function.inc" -->
<!-- #include virtual = "/include/Map_Function.inc" -->
<%
Dim strAddr, strAddrSimple
Dim strTm128
Dim strWgs84
Dim arrTm128
Dim arrWgs84
Dim ResultHtml

strAddr = Unescape(Request("addr"))
strAddrSimple = Unescape(Request("addrSimple"))

If FnLen(strAddr) > 0 Then
  strWgs84 = Addr2Pos_LngLat(strAddr)

  If strWgs84 <> "" Then
    arrWgs84 = Split(strWgs84, "|^|")

    ResultHtml = "{""TM128_PosX"":""0"","
    ResultHtml = ResultHtml & """TM128_PosY"":""0"","
    ResultHtml = ResultHtml & """TM128_Addr"":"""","
    ResultHtml = ResultHtml & """WGS84_PosX"":""" & arrWgs84(0) & ""","
    ResultHtml = ResultHtml & """WGS84_PosY"":""" & arrWgs84(1) & ""","
    ResultHtml = ResultHtml & """WGS84_Addr"":""" & RequestFilter(arrWgs84(2)) & """"
    ResultHtml = ResultHtml & "}"
  Else  ' �ּ����� �޾ƿ��� ���� ��� ��/��/�����θ� ��ǥ�� �޴´�.
    strWgs84 = Addr2Pos_LngLat(strAddrSimple)

    arrWgs84 = Split(strWgs84, "|^|")

    ResultHtml = "{""TM128_PosX"":""0"","
    ResultHtml = ResultHtml & """TM128_PosY"":""0"","
    ResultHtml = ResultHtml & """TM128_Addr"":"""","
    ResultHtml = ResultHtml & """WGS84_PosX"":""" & arrWgs84(0) & ""","
    ResultHtml = ResultHtml & """WGS84_PosY"":""" & arrWgs84(1) & ""","
    ResultHtml = ResultHtml & """WGS84_Addr"":""" & RequestFilter(arrWgs84(2)) & """"
    ResultHtml = ResultHtml & "}"
  End If
End If

Response.Write ResultHtml
%>
