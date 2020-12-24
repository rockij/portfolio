<%
'*******************************************************************************************
' 단 위 업 무 명	: 지도 좌표 불러오기
' 작    성    자	: 이 근 우(stari@mediawill.com)
' 작    성    일	: 2013/08/07
' 수    정    자	:
' 수    정    일	:
' 내          용	:
' 주  의  사  항  : http://local.local.findall.co.kr/js/ajax/ajax_getMap.asp?Addr=서울 강남구 역삼동 648
'*******************************************************************************************
%>
<!-- #include virtual = "/include/Const.inc" -->
<%
'CharSet을 설정해야 데이터 전송시의 글깨짐 현상 방지가 가능합니다.
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
  Else  ' 주소지를 받아오지 못한 경우 시/구/동으로만 좌표를 받는다.
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
