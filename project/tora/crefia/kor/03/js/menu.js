jQuery(function($){
	
	// Side Menu
	var menu_v = $('div.lnbMenu');
	var sItem = menu_v.find('>ul>li');
	var ssItem = menu_v.find('>ul>li>ul>li');
	var lastEvent = null;
	
	sItem.find('>ul').css('display','none');
	menu_v.find('>ul>li>ul>li[class=active]').parents('li').attr('class','active');
	menu_v.find('>ul>li[class=active]').find('>ul').css('display','block');

	function menu_vToggle(event){
		var t = $(this);
		
		if (this == lastEvent) return false;
		lastEvent = this;
		setTimeout(function(){ lastEvent=null }, 200);
		
		if (t.next('ul').is(':hidden')) {
			sItem.find('>ul').slideUp(100);
			t.next('ul').slideDown(100);
		} else if(!t.next('ul').length) {
			sItem.find('>ul').slideUp(100);
		} else {
			t.next('ul').slideUp(100);
		}
		
		if (t.parent('li').hasClass('active')){
			t.parent('li').removeClass('active');
		} else {
			sItem.removeClass('active');
			t.parent('li').addClass('active');
		}
	}
// left메뉴의 onclick이벤트를 방해해서 주석처리함. bbok. 130217	sItem.find('>a').click(menu_vToggle).focus(menu_vToggle);
	
	function subMenuActive(){
		ssItem.removeClass('active');
		$(this).parent(ssItem).addClass('active');
	}; 
// left메뉴의 onclick이벤트를 방해해서 주석처리함. bbok. 130217	ssItem.find('>a').click(subMenuActive).focus(subMenuActive);
	
	//icon
	menu_v.find('>ul>li>ul').prev('a').append('<span class="i"></span>');
});



// global navigation
function gNaviCtl(t)	{
	var target = "sNavi0" + t;
	for(var i=1; i<=9; i++)	{
		try{
		var a = "sNavi0" + i;
			if (document.getElementById(a) != null)
			{
				document.getElementById(a).style.display='none';
				document.getElementById('mNaviImg0'+i).src='/static/images/portal/common/gnb_0'+i+'_off.gif';
			}
		}catch(e){

	    }
	}
	try{
		document.getElementById(target).style.display='inline';
		document.getElementById('mNaviImg0'+t).src='/static/images/portal/common/gnb_0'+t+'_on.gif';
	}catch(e){

	}

}
	
	

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}



//gnb2
var check_mun = 1;
function top2menuView(a) //2차메뉴보기
{
	//alert(check_mun);
	if(!(check_mun ==0)){
	if(this.id){
		eidStr = this.id;
		eidNum=eidStr.substring(eidStr.lastIndexOf("m",eidStr.length)+1,eidStr.length);
		a = parseInt(eidNum);
	}
	top2menuHideAll();
	top1Menu = document.getElementById("top1m"+a);
	top2Menu = document.getElementById("top2m"+a);
	//if(a<10){ann='0'+a;} else {ann=''+a;}
	ann=a;
	if (a=0) { //메인은2차메뉴활성화안함
	} else {
		if (top1Menu) {
			top1Menu.getElementsByTagName("img")[0].src="./img/common/topmenu" + ann + "on.gif";
			if (top2Menu) { top2Menu.style.display = 'inline'; }
		}
	}
} else {
	check_mun = 1;
	
}
}

function top2menuHide(a) //2차메뉴감추기
{
	if(this.id){
		eidStr = this.id;
		eidNum=eidStr.substring(eidStr.lastIndexOf("m",eidStr.length)+1,eidStr.length);
		a = parseInt(eidNum);
	}
	top2menuHideAll();
	top1Menu = document.getElementById("top1m"+a);
	top2Menu = document.getElementById("top2m"+a);
	top1MenuCurr = document.getElementById("top1m<?=$d1n?>");
	top2MenuCurr = document.getElementById("top2m<?=$d1n?>");
	//if(a<10){ann='0'+a;} else {ann=''+a;}
	ann=a;
	if (top1Menu) {
		top1Menu.getElementsByTagName("img")[0].src="./img/common/topmenu" + ann + "off.gif";
		if (top2Menu) { top2Menu.style.display = 'none'; }
		if (top1MenuCurr) { top1MenuCurr.getElementsByTagName("img")[0].src = "./img/common/topmenu<?=$d1n?>off.gif"; }
		if (top2MenuCurr) { top2MenuCurr.style.display = 'inline'; }
	}
}

function top2menuHideAll() //2차메뉴모두감추기
{
	top1menuEl = document.getElementById("top1menu").getElementsByTagName("ul");
	for (i=1;i<=top1menuEl.length;i++)
	{
		top1Menu = document.getElementById("top1m"+i);
		top2Menu = document.getElementById("top2m"+i);
		//if(i<10){inn='0'+i;} else {inn=''+i;}
		inn=i;
		if (top1Menu) {
			top1Menu.getElementsByTagName("img")[0].src="./img/common/topmenu<?=$d1n?>off.gif"; 
			if (top2Menu) { top2Menu.style.display = 'inline'; }
		}
	}
}

function initTopMenu() {
 	top1menuEl = document.getElementById("top1menu").getElementsByTagName("ul");
	for (i=1;i<=top1menuEl.length;i++){
		top1Menu = document.getElementById("top1m"+i);
		top2Menu = document.getElementById("top2m"+i);
		if (top1Menu) {
			top1Menu.onmouseover = top1Menu.onfocus = top2menuView;
			top1Menu.onmouseout = top2menuHide;
			if (top2Menu) {
				top2Menu.onmouseover = top2Menu.onfocus = top2menuView;
				top2Menu.onmouseout = top2menuHide;
			}
		}
	}
}
function top2Dep(a,b){
	var str = document.getElementById("top2m"+a).getElementsByTagName("a")[b];
}




// 이미지 오버 공통 함수
function imgOver(oImg){
 var reg = new RegExp('_off');
 oImg.src = oImg.src.replace(reg,'_on');
}
// 이미지 아웃 공통 함수
function imgOut(oImg){
 var reg = new RegExp('_on');
 oImg.src = oImg.src.replace(reg,'_off');
}

