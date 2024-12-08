
$(document).ready(function() {	

	//mNavi
	$('#gnb li ul').hide(); 
	$('.gnbsubline').hide(); 
	$('#gnb li').mouseover(function(){
		
		$('#gnb li ul').show(); 
		$('.gnbsubline').show();
	});
	$('#gnb li').mouseout(function(){		
		$('#gnb li ul').hide(); 
		$('.gnbsubline').hide();
	});	

	// lnb
	$('#lnb li ul').hide();
	$('#lnb li').mouseover(function(){		
		$('#lnb li ul').show(); 		
	});
	$('#lnb li').mouseout(function(){		
		$('#lnb li ul').hide(); 		
	});	

	//language
	$('.language_list').hide();
	$('.language').mouseover(function(){		
		$('.language_list').show(); 		
	});
	$('.language').mouseout(function(){		
		$('.language_list').hide(); 		
	});	

	//familySite
	$('.familySite_list').hide();
	$('.familySite').mouseover(function(){		
		$('.familySite_list').show(); 		
	});
	$('.familySite').mouseout(function(){		
		$('.familySite_list').hide(); 		
	});


	
	// quick
	$("#quick").mouseenter(function () {
		$( "#quick" ).animate({right: 0}, 500 );
	}).mouseleave(function () {
		$( "#quick" ).animate({right: '-90px'}, 500 );	
	});

	//faq	
	$(".faq_q").click(function () {
		if ($(this).hasClass("on") == true) {
			$(".faq_answer" + $(this).attr("data-id")).hide();
			$(this).removeClass("on");			
		}

		else {
			$(".faq_q").removeClass("on");
			$(".faq_answer").hide();
			$(".faq_answer" + $(this).attr("data-id")).show();
			$(this).addClass("on");
		}
	});	

	//selectbox - common
	$(".selectS").mouseenter(function () {
		$(".selectS .option").show();
		$(".selectS .option ul li").click(function () {
			$(".selectS .tit").text($(".sc" + $(this).attr("data-id")).text())
			$('#keyname').val($(this).attr("data-va"));
			$(".selectS .option").hide();				
		});
	}).mouseleave(function () {
		$(".selectS .option").hide();	
	});

	//selectbox - 년도
	$("#year").mouseenter(function () {
		$("#year .option").show();
		$("#year .option ul li").click(function () {
			$("#year .tit").text($(".year" + $(this).attr("data-id")).text())
			$("#year .option").hide();				
		});
	}).mouseleave(function () {
		$("#year .option").hide();	
	});

	//selectbox - search
	$(".selectSearch").mouseenter(function () {
		$(".selectSearch .option").show();
		$(".selectSearch .option ul li").click(function () {
			$(".selectSearch .tit").text($(".sh" + $(this).attr("data-id")).text())
			$(".selectSearch .option").hide();				
		});
	}).mouseleave(function () {
		$(".selectSearch .option").hide();	
	});


	//selectbox - selectA
	$("#selA").mouseenter(function () {
		$("#selA .option").show();
		$("#selA .option ul li").click(function () {
			$("#selA .tit").text($(".selA" + $(this).attr("data-id")).text())
			$("#selA .option").hide();				
		});
	}).mouseleave(function () {
		$("#selA .option").hide();	
	});

	//selectbox - selectB
	$("#selB").mouseenter(function () {
		$("#selB .option").show();
		$("#selB .option ul li").click(function () {
			$("#selB .tit").text($(".selB" + $(this).attr("data-id")).text())
			$("#selB .option").hide();				
		});
	}).mouseleave(function () {
		$("#selB .option").hide();	
	});

	//selectbox - selectC
	$("#selC").mouseenter(function () {
		$("#selC .option").show();
		$("#selC .option ul li").click(function () {
			$("#selC .tit").text($(".selC" + $(this).attr("data-id")).text())
			$("#selC .option").hide();				
		});
	}).mouseleave(function () {
		$("#selC .option").hide();	
	});

	$('.btnSearchS').click(function () {
		if($('#key').val()==''){
			alert('검색어를 입력하세요.');
			return false;
		}else{
			document.kfm.submit();
		}
	});

	
});


