//빠른설정 메뉴 슬라이드 실행
function directMenuOn(){
	$('#directMenu').flexslider({
		animation: "slide",
		animationSpeed:600,
		slideshowSpeed:3000,
		pausePlay: false,
		directionNav: true,
		controlNav:false,
		slideshow:false 
	});									
}
//빠른설정메뉴 open
$(".direct-menu > li.setting a").click(function() {
	$('.direct-menu-wide').show();
	directMenuOn();
	return false;
});
//빠른설정메뉴 상세 버튼 설정
var directMenuCtl = $(".anchor-set menu li a");
var defaults = { max: 5 };
directMenuCtl.click(function() {	
	$(this).parent().toggleClass("selected");
	var dirctslct = $(".anchor-set menu li.selected");	
	if(dirctslct.length >= defaults.max){
		$(".direct-menu").removeClass("bgon1").removeClass("bgon2").removeClass("bgon3").removeClass("bgon4").addClass("bgon5");		
		$(".anchor-set menu li").not($(".selected")).each(function() {
			$(this).children("a").hide();
			$(this).addClass("none");
		});
		alert("빠른메뉴 설정은 " + defaults.max + "개까지 선택가능합니다.");
	}else if(dirctslct.length == 1){
		$(".direct-menu").removeClass("bgon2").removeClass("bgon3").removeClass("bgon4").removeClass("bgon5").addClass("bgon1");
	}else if(dirctslct.length == 2){
		$(".direct-menu").removeClass("bgon1").removeClass("bgon3").removeClass("bgon4").removeClass("bgon5").addClass("bgon2");
	}else if(dirctslct.length == 3){
		$(".direct-menu").removeClass("bgon1").removeClass("bgon2").removeClass("bgon4").removeClass("bgon5").addClass("bgon3");
	}else if(dirctslct.length == 4){
		$(".direct-menu").removeClass("bgon1").removeClass("bgon2").removeClass("bgon3").removeClass("bgon5").addClass("bgon4");
	}else{
		directMenuCtl.parent().removeClass("none");
		directMenuCtl.parent().children().show("a");
	}
	if($(this).parent().hasClass("bt1")){
		$(".direct-menu li:nth-child(1)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt2")){
		$(".direct-menu li:nth-child(2)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt3")){
		$(".direct-menu li:nth-child(3)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt4")){
		$(".direct-menu li:nth-child(4)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt5")){
		$(".direct-menu li:nth-child(5)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt6")){
		$(".direct-menu li:nth-child(6)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt7")){
		$(".direct-menu li:nth-child(7)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt8")){
		$(".direct-menu li:nth-child(8)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt9")){
		$(".direct-menu li:nth-child(9)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt10")){
		$(".direct-menu li:nth-child(10)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt11")){
		$(".direct-menu li:nth-child(11)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt12")){
		$(".direct-menu li:nth-child(12)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt13")){
		$(".direct-menu li:nth-child(13)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt14")){
		$(".direct-menu li:nth-child(14)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt15")){
		$(".direct-menu li:nth-child(15)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt16")){
		$(".direct-menu li:nth-child(16)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt17")){
		$(".direct-menu li:nth-child(17)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt18")){
		$(".direct-menu li:nth-child(18)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt19")){
		$(".direct-menu li:nth-child(19)").toggleClass("selected");
	}else if($(this).parent().hasClass("bt20")){
		$(".direct-menu li:nth-child(20)").toggleClass("selected");
	}
	return false;
});
//빠른설정메뉴 닫기
$(".anchor-set .link a.cls").click(function() {
	$('.direct-menu-wide').hide();
	return false;
});
$(document).ready(function(){
	//중간 제일 큰 배너
	$('#mainRoll').flexslider({
		animation: "slide",
		animationSpeed:600,
		slideshowSpeed:3000,
		pausePlay: false,
		directionNav: false,
		controlNav:true,
		slideshow:true
	});
	//하단 좌측 배너
	$('#slidebn').flexslider({
		animation: "slide",
		animationSpeed:600,
		slideshowSpeed:3000,
		pausePlay: false,
		directionNav: true,
		controlNav: false,
		slideshow: false
	});
	//하단 우측 배너
	$('#localnav').flexslider({
		animation: "slide",
		animationSpeed:600,
		slideshowSpeed:3000,
		pausePlay: false,
		directionNav: true,
		controlNav: false,
		slideshow: false
	});
	$("#slidebn li a:first-child").addClass("ml0");
});