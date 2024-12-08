$(document).ready(function() {	

	//select all the a tag with name equal to modal
	$('a[name=modal]').click(function(e) {
		openModal(e,this, null);
	
	});
	
	$('a[name=modal2]').click(function(e) {
		
		openModal(e,this,'.dialog2');
	
	});
	
	var openModal = function(e, that, objId){
		//Cancel the link behavior
		e.preventDefault();
		//Get the A tag
		var id = $(that).attr('href');
		if(objId){
			id = objId;
		}
		
	
		//Get the screen height and width
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
	
		//Set height and width to mask to fill up the whole screen
		$('#mask').css({'width':maskWidth,'height':maskHeight});
		
		//transition effect		
		$('#mask').fadeIn(500);	
		$('#mask').fadeTo("slow",0.7);	
	
		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();
              
		//Set the popup window to center
		$(id).css('top',  winH/2-$(id).height()/2);
		$(id).css('left', winW/2-$(id).width()/2);
	
		//transition effect
		$(id).fadeIn(800); 
		
		
	}
	//if close button is clicked
	$('.window .close').click(function (e) {
		//Cancel the link behavior
		e.preventDefault();
		$('#mask, .window').hide();
	});		
	
	//if mask is clicked
	$('#mask').click(function () {
		$(this).hide();
		$('.window').hide();
	});
	//window resize			
	$(window).resize(function () {
	 
 		var box = $('#boxes .window');
 
        //Get the screen height and width
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();
      
        //Set height and width to mask to fill up the whole screen
        $('#mask').css({'width':maskWidth,'height':maskHeight});
               
        //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();

        //Set the popup window to center
        box.css('top',  winH/2 - box.height()/2);
        box.css('left', winW/2 - box.width()/2);
        
        
     //   alert($('#wrap').css("max-width"));
	});
	
	//상시 공지사항 가져오기
	var url = '/sep/customer/notice/list.json';
	$.post(url, {}, function(data){    
		if('Y' == data.isSuccess){
			$.each(data.result.resultVOs, function(index, data){
		//		console.log(index +':::' + data.title);
				if(index === 0 ){
					$('#sect_top_noti .notice a').text(data.title);
				}
				return;
			});
			
		}else{
			alert(data.errorMessage);
		}
	},'json');
	
	var clickMenuSectPw = function(){
		$('#sect_navi .snb_02 li').each(function(){
			$(this).removeClass('on');	
		});
		$('#menu_sect_pw').addClass('on');
		moveScroll('#sect_pw', '#header');
	}
	var clickMenuSectEnd = function(){
		$('#sect_navi .snb_02 li').each(function(){
			$(this).removeClass('on');	
		});
		$('#menu_sect_end').addClass('on');
		moveScroll('#sect_end', '#header');
	}
	var clickMenuSectJoin = function(){
		$('#sect_navi .snb_02 li').each(function(){
			$(this).removeClass('on');	
		});
		$('#menu_sect_join').addClass('on');
		moveScroll('#sect_join', '#header');
		return false;
	}
	var clickMenuSectInfo = function(){
		$('#menu_sect_info_use').removeClass('on');
		$('#menu_sect_info').addClass('on');
		moveScroll('#sect_info', '#header');
	}
	var clickMenuSectInfoUse = function(){
		$('#menu_sect_info').removeClass('on');
		$('#menu_sect_info_use').addClass('on');
		moveScroll('#sec_join_meth', '#header');
	}
	var clickMainAppDownload = function(){
		moveScroll('#sect_main03', '#header');
	}
	
	//모바일용 메뉴 클릭
	if (document.documentElement.clientWidth < 600) {
		$('.gnb .gnb_list').hide();
    	// scripts
		$('#service_info').click(function(){
			if($('.gnb .snb_01').css('display') === 'none'){
				$('.gnb .gnb_list').hide();
				$('.gnb .snb_01').show();
			}else{
				$('.gnb .snb_01').hide();
			}
			
			return false;
		})
		$('#service_use').click(function(){
			if($('.gnb .snb_02').css('display') === 'none'){
				$('.gnb .gnb_list').hide();
				$('.gnb .snb_02').show();
			}else{
				$('.gnb .snb_02').hide();
			}
			return false;
		})
		$('#service_custom').click(function(){
			if($('.gnb .snb_03').css('display') === 'none'){
				$('.gnb .gnb_list').hide();
				$('.gnb .snb_03').show();
			}else{
				$('.gnb .snb_03').hide();
			}
			return false;
		})
		
	}else{
		//메뉴_페이지스크롤
//		$("#menu_sect_pw").click(function(e) {
//			clickMenuSectPw();
//		});
//		$("#menu_sect_end").click(function(e) {
//			clickMenuSectEnd();
//		});
//		$("#menu_sect_join").click(function(e) {
//			clickMenuSectJoin();
//		});
//		$("#menu_sect_info").click(function(e) {
//			clickMenuSectInfo();
//		});
//		$("#menu_sect_info_use").click(function(e) {
//			clickMenuSectInfoUse();
//		});	
		
		var currentGnbOnId = '';
		$('.gnb_list').each(function(){
			if($(this).css('display') === 'block'){
				currentGnbOnId = $(this).attr('id');
			}
		})
		//마우스 오버시 서버 메뉴 보이게
		$("#service_info").mouseenter(function() {
			$('.gnb_list').hide();
			$('.snb_01').show();
		});
		$("#service_use").mouseenter(function() {
			$('.gnb_list').hide();
			$('.snb_02').show();
		});
		$("#service_custom").mouseenter(function() {
			$('.gnb_list').hide();
			$('.snb_03').show();
		});
		$("#header").mouseleave(function() {
			$('.gnb_list').hide();
			$('#'+currentGnbOnId).show();
		});
		//페이지 이동을 위한 
//		var loc = location.href;
//		var movePage = loc.split('#')[1];
//		if(movePage){
//			setTimeout(function() {
//				if(movePage ==='mainAppDownload'){
//					clickMainAppDownload();
//				}else{
//					
//					$('#'+movePage).trigger('click');
//				}
//			}, 300);
//		}
	}
	
	var infoUrl = '/sep/info';
	var serviceUrl = '/sep/serviceUse';
	var loc = location.href;
	var moveUrl = loc.split('#')[0];
	var movePage = loc.split('#')[1];
	
	
	var callCurrentUrlInfo = function(){
		loc = location.href;
		moveUrl = loc.split('#')[0];
		movePage = loc.split('#')[1];
		if(!movePage){
			movePage = 3;
		}
	}
	//메뉴 클릭 공통(S)
	$("#menu_sect_info").click(function(e) {
		if(movePage && moveUrl.indexOf(infoUrl) > 0){
			clickMenuSectInfo();
		}else{				
			location.href = '/sep/info#1';
		}
		return false;
	});
	$("#menu_sect_info_use").click(function(e) {
		if(movePage && moveUrl.indexOf(infoUrl) > 0){
			clickMenuSectInfoUse();
		}else{				
			location.href = '/sep/info#2';
		}
		return false;
	});	

	$("#menu_sect_join").click(function(e) {
		callCurrentUrlInfo();
		if(movePage && moveUrl.indexOf(serviceUrl) > 0 ){
			clickMenuSectJoin();
		}else{				
			location.href = '/sep/serviceUse#3';
		}
		
		return false;
	});
	
	$("#menu_sect_pw").click(function(e) {
		callCurrentUrlInfo();
		if(movePage && moveUrl.indexOf(serviceUrl) > 0){
			clickMenuSectPw();
		}else{				
			location.href = '/sep/serviceUse#4';
		}
		return false;
	});
	
	$("#menu_sect_end").click(function(e) {
		callCurrentUrlInfo();
//		console.log(movePage +' '+ moveUrl.indexOf(serviceUrl));
		if(movePage && moveUrl.indexOf(serviceUrl) > 0){
			clickMenuSectEnd();
		}else{				
			location.href = '/sep/serviceUse#5';
		}
		return false;
		
	});

	
	//앱다운로드 스크롤(S)
	$(".mainAppDownload").click(function(e) {
		clickMainAppDownload();
	});	
	$(".serviveUseAppDownload").click(function(e) {
	
		location.href = '/#mainAppDownload';
		return false;
	});	
	$("#resetPassword").click(function(e) {
		$('.close').trigger("click");
		clickMenuSectPw();
	});	
	
	
//	if(loc.split('#')[0] === 'http://localhost:8080/sep/info' && !movePage){
//	//	alert(1);
//		clickMenuSectInfo();
//	}
	if(movePage){
		setTimeout(function() {
//			if(movePage ==='menu_sect_info'){
			if(movePage ==='1' && moveUrl.indexOf(infoUrl)){
		//		clickMenuSectInfo();  스크롤이 끝나기 전에는 작동하지 않는 현상때문에 각페이지 첫번째는 스크롤 처리를 하지 않음
//			}else if(movePage ==='menu_sect_info_use'){
			}else if(movePage ==='2' && moveUrl.indexOf(infoUrl)){
				clickMenuSectInfoUse();
			}else if(movePage ==='3' && moveUrl.indexOf(serviceUrl)){
		//		clickMenuSectJoin();	스크롤이 끝나기 전에는 작동하지 않는 현상때문에 각페이지 첫번째는 스크롤 처리를 하지 않음
			}else if(movePage ==='4' && moveUrl.indexOf(serviceUrl)){
				clickMenuSectPw();
			}else if(movePage ==='5' && moveUrl.indexOf(serviceUrl)){
				clickMenuSectEnd();		
			}else if(movePage ==='mainAppDownload'){
				clickMainAppDownload();
			}
			
		}, 100);
	}
	//메뉴 클릭 공통(E)
	
	
	
	

	
//	var moveScroll = function(obj1, obj2){
//		
//		var curScroll = {x:getScrollX(), y:getScrollY()};
//		TweenMax.to(curScroll, 1, {y:($(obj1).offset().top) - $(obj2).height(), onUpdate:function() { window.scrollTo(curScroll.x, curScroll.y); },  ease:Cubic.easeInOut});
//	}
//	
//	var getScrollX = function() {
//		return (window.pageXOffset != null) ? window.pageXOffset : (document.documentElement.scrollLeft != null) ? document.documentElement.scrollLeft : document.body.scrollLeft;
//	}
//	//returns the current vertical scroll position
//	var getScrollY = function() {
//		return (window.pageYOffset != null) ? window.pageYOffset : (document.documentElement.scrollTop != null) ? document.documentElement.scrollTop : document.body.scrollTop;
//	}



});

