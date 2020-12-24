//common
$(function () {
	$(".tblst th:first-child, .tblst td:first-child").addClass("brl0");
	$(".tblst2 th:first-child, .tblst2 td:first-child").addClass("brl0");
	$(".tblst tr.even td:first-child").addClass("first");
	$(".main_ct .bbs_set tr:first-child th, .main_ct .bbs_set tr:first-child td").addClass("brt0");
});

//tree menu
$(function($){
	var tree = $('.tree');
	var togglePlus = '<button type="button" class="toggle plus">+</button>';
	var toggleMinus = '<button type="button" class="toggle minus">-</button>';	
	// defalt
	tree.find('li>ul').css('display','none');
	tree.find('ul>li:last-child').addClass('last');
	tree.find('li>ul:hidden').parent('li').prepend(togglePlus);
	tree.find('li>ul:visible').parent('li').prepend(toggleMinus);	
	// active
	tree.find('li.active').parents('li').addClass('open');
	tree.find('li.open').parents('li').addClass('open');
	tree.find('li.open>.toggle').text('-').removeClass('plus').addClass('minus');
	tree.find('li.open>ul').slideDown(100);	
	// click toggle
	$('.tree .toggle').click(function(){
		t = $(this);
		t.parent('li').toggleClass('open');
		if(t.parent('li').hasClass('open')){
			t.text('-').removeClass('plus').addClass('minus');
			t.parent('li').find('>ul').slideDown(100);			
		} else {
			t.text('+').removeClass('minus').addClass('plus');
			t.parent('li').find('>ul').slideUp(100);
		}
	});
	//tree control
	$('.tree-set .bt-control').click(function(){
		$(this).toggleClass('active');
		tree.toggle();
		return false;
	});
});

//layer popup
function layer_open(obj) {
	var temp = $("#" + obj);
	var bg = temp.parent().find(".bg").hasClass("bg");
	if(bg){
		temp.parent().show();
	}
	$(".bg").click(function(e){
		$(".ly_pop").hide();
		e.preventDefault();
	});
}
function layer_open_cls(){
	$(".ly_pop").hide();
}
