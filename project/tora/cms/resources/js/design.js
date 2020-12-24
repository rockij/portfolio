// plugin setting
$(function(){
	$.fn.extend({
		select: function (options) {
			return this.each(function () {
				var $select = $(this).find('select');
				$select.children('option:selected').attr('data-selected',1);
				$select.on('change', function () {
					var $this = $(this),
					$label = $this.siblings('label'),
					$selected = $this.children('option:selected');
					$label.text($selected.text());
					if ($selected.attr('data-selected')!=1) {
						$label.addClass('chk');
					} else {
						$label.removeClass('chk');
					}
				});
			});
		},
		placeholder: function (options) {			
			var i_text = $('.placeholder>label').next('.i_text');
			$('.placeholder>label').css('position','absolute');
			i_text.focus(function(){
				console.log(1);
				$(this).prev('label').css('visibility','hidden');
			}).blur(function(){
				if($(this).val() == ''){
					$(this).prev('label').css('visibility','visible');
				} else {
					$(this).prev('label').css('visibility','hidden');
				}
			}).change(function(){
				if($(this).val() == ''){
					$(this).prev('label').css('visibility','visible');
				} else {
					$(this).prev('label').css('visibility','hidden');
				}
			}).blur();
		},
		file: function (options) {
			var fileTarget = $('.filebox .upload_hidden');
			fileTarget.on('change', function(){
				if(window.FileReader){
					var filename = $(this)[0].files[0].name;
				} else {
					var filename = $(this).val().split('/').pop().split('\\').pop();
				}
				$(this).siblings('.upload_name').val(filename);
			});
		},
     });
});

$(function(){
	// form
	$('.select').select();
	$('.placeholder').placeholder();
	$('.filebox').file();
	// 레이어팝업 닫기
	$('.popcls').on('click', function () {
		$('.ly_pop').hide();
	});
	// 조직도 열고,닫기
	$('.list_group .btn_control').on('click', function () {
		$('.list_group>ul>li').removeClass('open');
		$(this).parent().addClass('open');
	});
	// 달력선택
	$('.tbl_type td.cal>button').on('click', function () {		
		var del = $('.tbl_type td.cal>button').parent();
		if($(this).parent().hasClass('selected')){
			del.removeClass('selected');
			$(this).parent().removeClass('selected');
		}else{
			del.removeClass('selected');
			$(this).parent().addClass('selected');
		}
	});
	// input 입력시 sub 리스트	
	$('.btn_srchlist').on('click', function () {
		$(this).parent().find('.scroll').show();
	});
});