// footer import
function footImport(tar,href,w){
    $("#"+tar).load(href);
    setTimeout(function(){
        $('.global_footer').css('width',w);
    }, 100);
}
function footImportPop(href,w,h){
    setTimeout(function(){
        $('.btn_info').on('click', function () {
            window.open(href, '_blank', 'toolbar=no,scrollbars=yes,resizable=no,top=0,left=0,width='+w+',height='+h+'');
        });
    }, 100);
}

// 사업자정보 약관탭
function cpinfoTab(t){
    var ly = $('[class*=ly_cpinfo_]');
    var tar = ly.find('#terms-'+t);
    ly.find('.list_terms').hide();
    ly.find('.tabs button').removeClass('active');
    ly.find('.tabs button[data-com='+t+']').addClass('active');
    ly.find('.list .tel').hide();
    ly.find('.list .tel[data-com='+t+']').show();
    tar.show();
    // console.log(tar);
}

// 약관탭
function termsTab(tar,n){
    var idx = n-1;
    $('.global_terms .tabs button').removeClass('on');
    $('.global_terms .tabs li:eq('+idx+') button').addClass('on');
    $('.global_terms pre').hide();
    $('.global_terms #'+tar).show();
    // console.log(idx)
}

// 약관 상단 간격
function termsHeader(title){
    var g = $('.global_terms'),
        th = g.find('.head').outerHeight();
    g.find('.content').css({paddingTop:th+20});
    g.find('.head h1 strong').text(title);
}

// popup
var scrollHeight = 0;
scrollHeight = $(document).scrollTop();
function popupOpen(obj,ty,timer){
    var tar = $('#mw-'+obj);        
    $('body').css('overflow', 'hidden');
    function mwOpen(){
        if(timer >= 0){
            setTimeout(function(){
                if(tar.hasClass('popBtm')){
                    tar.addClass('show');
                }else{
                    tar.show().addClass('show');
                }
            }, timer);
        }else{
            tar.show().addClass('show');
            if(tar.hasClass('ndim')){
                tar.css('left',0);
            }
            tar.find('.content').scrollTop(0);
        }
        // 영역 외 클릭 닫기
        tar.click(function(e){
            if(!$(this).hasClass('ndim')){
                if(!$('[class*="ly"]').find('.wrap').has(e.target).length) {
                    if($(this).hasClass('popBtm')){
                        $('body').css('overflow', '');
                        $('[class*="ly"]').removeClass('show');
                        window.onscroll=function(){};
                    }else{
                        popupClose(obj,'mw');
                    }
                }
            }
        });
    }
    function mwOpenFix(){        
        if(timer >= 0){
            setTimeout(function(){
                if(tar.hasClass('popBtm')){
                    tar.addClass('show');
                }else{
                    tar.show().addClass('show');
                }
            }, timer);
        }else{
            tar.show().addClass('show');
            if(tar.hasClass('ndim')){
                tar.css('left',0);
            }
            tar.find('.content').scrollTop(0);
        }
        // 영역 외 클릭 닫기
        tar.click(function(e){
            if(!$(this).hasClass('ndim')){
                if(!$('[class*="ly"]').find('.wrap').has(e.target).length) {
                    popupClose(obj,'mwf');
                }
            }
        });
        scrollHeight = $(document).scrollTop();
        $('#wrap').css('position', 'fixed');
        $('#wrap').css('top', - scrollHeight);
    }
    if( ty === 'pc' ){ //pc
        tar.show();
    }else if( ty === 'mw'){ //mobile 기본
        mwOpen();
        var x=window.scrollX, y=window.scrollY;
        window.onscroll=function(){window.scrollTo(x, y)};
    }else if( ty === 'mwb'){
        mwOpen();
        $('html,body').css('position','fixed');
    }else if( ty === 'mwf'){ //mobile > #wrap을 fixed 시키는 방식
        mwOpenFix();
    }
}
function popupClose(obj,ty){
    var tar = $('#mw-'+obj);
    $('body').css('overflow', '');
    if( ty === 'pc' ){
        tar.hide().removeClass('show');
    }else if( ty === 'mw' ){
        if(tar.hasClass('popBtm')){
            tar.removeClass('show');
        }else{
            tar.hide().removeClass('show');;
        }
        $('html,body').css('position','');
        window.onscroll=function(){};
    }else if( ty === 'mwf' ){
        if(tar.hasClass('popBtm')){
            tar.removeClass('show');
        }else{
            tar.hide().removeClass('show');;
        }        
        $('#wrap').css('top',0);
        $('#wrap').css('position','relative');
        $(document).scrollTop(scrollHeight);
    }
}
