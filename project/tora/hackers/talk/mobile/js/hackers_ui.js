//Layer Popup
function layer_open(obj) {
    var temp = $('#' + obj);
    var bg = temp.parent().parent().find(".bg").hasClass('bg');

    if(bg) {
        $('html, body').css('overflow-y','hidden');
        temp.parent().show();
        temp.css('overflow-y','auto');
    }

    temp.find('.lybtn_x').click(function(e){
        if(bg) {
			$('html, body').removeAttr('style');
			temp.parent().hide();
			temp.removeAttr('style');
        }
        e.preventDefault();
    });

	temp.find('.lybtn_x2').click(function(e){
        if(bg) {
			$('html, body').removeAttr('style');
			temp.parent().hide();
			temp.removeAttr('style');
        }
        e.preventDefault();
    });
}
	
$(function(){
	//Checkbox
	$(".checkbox").on('click', function(){
		if ($(".checkbox").find("input").length){
			$("label").each(function(){ 
				$(this).removeClass("on");
			});
			$("input:checked").each(function(){ 
				$(this).next("label").addClass("on");
			});
		}
	});

	//Sex
	$('.sex').each(function(){ 
		$('.sex li').on('click', function(){
			$(this).parent().find('li').removeClass();
			$(this).addClass("active");
		});
	});

	//Toggle
	$('.btn_toggle').click(function(){
		$(this).html(function(o,c){
			return ($('.cont_toggle').is(':visible') ? '<span class="txt">열기</span><span class="btn_comm btn_close"></span>' : '<span class="txt">접기</span><span class="btn_comm btn_open"></span>');
		});
		$(this).parent().next('.cont_toggle').toggle();
	});

	//Toggle2
	$('.btn_toggle2').click(function(){
		$(this).html(function(o,c){
			return ($('.cont_toggle2').is(':visible') ? '<span class="txt">열기</span><span class="btn_comm btn_close"></span>' : '<span class="txt">접기</span><span class="btn_comm btn_open"></span>');
		});
		$(this).parent().next('.cont_toggle2').toggle();
	});

	//Toggle3
	$('.btn_toggle3').click(function(){
		$(this).html(function(o,c){
			return ($('.cont_toggle3').is(':visible') ? '<span class="btn_comm btn_open2"></span>' : '<span class="btn_comm btn_close2"></span>');
		});
		$(this).parent().parent().find('.cont_toggle3').toggle();
	});

	//Toggle4
	$('.btn_mp3_more').click(function(){
		$(this).html(function(o,c){
			return ($('.btn_mp3_list').is(':visible') ? '<span class="btn_comm open"></span>' : '<span class="btn_comm close"></span>');
		});
		$(this).next('.btn_mp3_list').toggle();
	});

	//Toggle5
	$('.btn_add_explan_x').click(function(){
		$(this).parent('.add_explan').hide();
	});

	//Toggle6
	$('.btn_toggle4').click(function(){
		$(this).html(function(o,c){
			return ($('.cont_toggle4').is(':visible') ? '<span class="btn_comm btn_open3"></span>' : '<span class="btn_comm btn_close3"></span>');
		});
		$(this).parent().parent().find('.cont_toggle4').toggle();
	});

	//Toggle7
	$('.btn_toggle5').click(function(){
		$(this).html(function(o,c){
			return ($('.cont_toggle5').is(':visible') ? '자세히보기 <span class="btn_comm btn_open3"></span>' : '접기 <span class="btn_comm btn_close3"></span>');
		});
		$(this).parent().parent().find('.cont_toggle5').toggle();
	});

	//Find Id, Password
	$('.chk_control').click(function() {
		var control = $(this).parent().parent().parent().find('.row');
		control.toggle();
	});

	//Scroll Top
	$(function(){
	    var sNav = $('.scroll_nav > ul > li');
	    var sCont = $('.scroll_cont > section');

	    sNav.click(function(e){
	    	e.preventDefault();
	    	
	    	var tg = $(this);
	    	var i = tg.index();
	       	var currentSection = sCont.eq(i);
	    	var sct = currentSection.offset().top - 50;
	
			$('html, body').stop().animate({scrollTop:sct});
	    });
	    
	    $(window).scroll(function(){
	    	var sct = $(window).scrollTop();

	    	sCont.each(function(){
	    		var tg = $(this);
	    		var i = tg.index();
				
	    		if(tg.offset().top - 50 <= sct){
	    			sNav.removeClass('active');
	    			sNav.eq(i).addClass('active');
	    		}
	    	});
	    });
	});

	//Aside Service
	$(function(){
	    var serviceTab = $('.service_tab > ul > li');
	    var serviceCont = $('.service_conts > .cont');

		serviceTab.on('click', function(e){
			var tg = $(this);
			i = tg.index();

			serviceTab.removeClass('active');
			tg.addClass('active');

			serviceCont.css('display','none');
			serviceCont.eq(i).css('display','block');
		});
	});

	//Aside Service2
	$('.btn_service_arrow').click(function(){
		$(this).html(function(o,c){
			return ($('.all_service ul li dl dd ul').is(':visible') ? '<span class="aside_comm ico_service_arrow"></span>' : '<span class="aside_comm ico_service_arrow2"></span>');
		});
		$(this).parent().next().find('ul').toggle();
	});

	//Aside Service3
	$('.btn_service_star').click(function(){
		$(this).find('.ico_service_star').toggleClass('active');
	});

	//Family Site
	$('.btn_triangle_down').click(function(){
		$(this).html(function(o,c){
			return ($('.family_site').is(':visible') ? '<span class="triangle_down"></span>' : '<span class="triangle_up"></span>');
		});
		$(this).next().toggle();
	});
});