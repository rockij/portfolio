
$(function(){

    // 마지막 장면 이미지 스크롤
    stepLastScroll = function(){
        $('.scroll-icon').show().addClass('on');
        $('.scroll-icon').parent().bind('mousewheel DOMMouseScroll', function(e) {
            var img = $(this).parent().find('img'), btm = img.height() - 600;
            if($('.scroll-icon').hasClass('on')){
                img.css({'transform':'translate(0,-'+btm+'px)'});
                $('.scroll-icon').fadeOut();
            }
            if( $(this).parents('html').hasClass('ie9') ){
                img.css('margin-top',-btm);
            }
        });
    },

    // 동그라미 로딩 스텝에 찾아가기
    stepPassTarget = function(idx){
        $('.stepPass').removeClass().addClass('loader-pulse stepPass m'+idx);
        $('.visual img').css('margin-top','');
    },

    // ie브라우저 일때 동그라미 로딩 모션 off-on
    ieTransNone = function(){
        $('.ie .stepPass').css({'transition-duration':'0s'});
        setTimeout(function() {
            $('.ie .stepPass').css({'transition-duration':''});
        },100);
    },

    // 탭별 조건 지정
    stepCondition = function(name,count){

        // gage 프로세스 크기
        var gageTotal = {
            g3 : '<li></li><li></li><li></li>',
            g4 : '<li></li><li></li><li></li><li></li>',
            g5 : '<li></li><li></li><li></li><li></li><li></li>',
            g6 : '<li></li><li></li><li></li><li></li><li></li><li></li>',
        };

        // items
        var title = $('.'+name).find('.caption h4'),
            text = $('.'+name).find('.caption p'),
            list = $('.'+name).find('.caption ul'),
            img = $('.'+name).find('.visual img'),
            caption = $('.'+name).find('.caption'),
            dim = $('.dim'),
            path = $('.stepPath h3');

        // reset
        $('.gagebar ul li').remove();
        $('.scroll-icon').hide().removeClass('on');
        $('img').css({'transform':''});
        if(count == 1){
            uiCommon.layer.close('updatePopup');
            dim.hide();
            $('.stepGo').hide();
            $('.stepPass').fadeIn();
            $('.caption').attr('data-num','01');
            stepPassTarget(1);
        }

        // 서비스가입
        if(name === 'serviceJoin'){
            $('.gagebar').attr('gage-total',6);
            $('.gagebar ul').append(gageTotal.g6);
            //step1
            if(count == 1){
                title.html(msgSvj.title1);
                text.html(msgSvj.text1);
                caption.attr('data-num','01');
                path.attr('data-step','01');
                img.attr('src','../../assets/images/service/exhall/'+msgSvj.img1+'.png');
                stepPassTarget(1);
            //step2
            }else if(count == 2){
                title.html(msgSvj.title2);
                text.html(msgSvj.text2);
                img.attr('src','../../assets/images/service/exhall/'+msgSvj.img21+'.png');
                caption.attr('data-num','02');
                path.attr('data-step','02');
                $('.stepGo').attr('step-num','1'); // click시 step1
            }else if(count == 3){
                img.attr('src','../../assets/images/service/exhall/'+msgSvj.img22+'.png');
            //step3
            }else if(count == 6){
                title.html(msgSvj.title3);
                text.html(msgSvj.text3);
                caption.attr('data-num','03');
                path.attr('data-step','03');
                img.attr('src','../../assets/images/service/exhall/'+msgSvj.img3+'.png');
                $('.stepGo').attr('step-num','2'); // click시 step2
            //step4
            }else if(count == 7){
                title.html(msgSvj.title4);
                text.html(msgSvj.text4);
                caption.attr('data-num','04');
                path.attr('data-step','04');
                img.attr('src','../../assets/images/service/exhall/'+msgSvj.img4+'.png');
                $('.stepGo').attr('step-num','6'); // click시 step3
            //step5
            }else if(count == 8){
                title.html(msgSvj.title5);
                text.html(msgSvj.text5);
                caption.attr('data-num','05');
                path.attr('data-step','05');
                img.attr('src','../../assets/images/service/exhall/'+msgSvj.img5+'.png');
                $('.stepGo').attr('step-num','7'); // click시 step4
            //step6
            }else if(count == 10){
                title.html(msgSvj.title6);
                text.html(msgSvj.text6);
                caption.attr('data-num','06');
                path.attr('data-step','06');
                img.attr('src','../../assets/images/service/exhall/'+msgSvj.img61+'.png');
                $('.stepGo').attr('step-num','8'); // click시 step5
            }else if(count == 11){
                img.attr('src','../../assets/images/service/exhall/'+msgSvj.img62+'.png');
            }
        }

        // 기관등록
        if(name === 'serviceAgency'){
            $('.gagebar').attr('gage-total',6);
            $('.gagebar ul').append(gageTotal.g6);
            // step1
            if(count == 1){
                title.html(msgAgc.title1);
                text.html(msgAgc.text1);
                caption.attr('data-num','01');
                path.attr('data-step','01');
                img.attr('src','../../assets/images/service/exhall/'+msgAgc.img1+'.png');
            // step2
            }else if(count == 2){
                title.html(msgAgc.title2);
                text.html(msgAgc.text2);
                caption.attr('data-num','02');
                path.attr('data-step','02');
                img.attr('src','../../assets/images/service/exhall/'+msgAgc.img2+'.png');
                $('.stepGo').attr('step-num','1'); // 이전버튼 1설정
            // step3
            }else if(count == 3){
                title.html(msgAgc.title3);
                text.html(msgAgc.text3);
                caption.attr('data-num','03');
                path.attr('data-step','03');
                img.attr('src','../../assets/images/service/exhall/'+msgAgc.img31+'.png');
                $('.stepGo').attr('step-num','2'); // 이전버튼 2설정
            }else if(count == 4){
                img.attr('src','../../assets/images/service/exhall/'+msgAgc.img32+'.png');
            // step4
            }else if(count == 5){
                title.html(msgAgc.title4);
                text.html(msgAgc.text4);
                caption.attr('data-num','04');
                path.attr('data-step','04');
                img.attr('src','../../assets/images/service/exhall/'+msgAgc.img41+'.png');
                $('.stepGo').attr('step-num','3'); // 이전버튼 2설정
            }else if(count == 7){
                img.attr('src','../../assets/images/service/exhall/'+msgAgc.img42+'.png');
            // step5
            }else if(count == 8){
                title.html(msgAgc.title5);
                text.html(msgAgc.text5);
                caption.attr('data-num','05');
                path.attr('data-step','05');
                img.attr('src','../../assets/images/service/exhall/'+msgAgc.img5+'.png');
                $('.stepGo').attr('step-num','5'); // 이전버튼 2설정
            // step6
            }else if(count == 9){
                title.html(msgAgc.title6);
                text.html(msgAgc.text6);
                caption.attr('data-num','06');
                path.attr('data-step','06');
                img.attr('src','../../assets/images/service/exhall/'+msgAgc.img6+'.png');
                $('.stepGo').attr('step-num','8'); // click시 step6
                setTimeout(function() {
                    $('.stepPass').fadeOut();
                },500);
            }
        }

        // 통합계좌조회
        if(name === 'accountSearch'){
            $('.gagebar').attr('gage-total',3);
            $('.gagebar ul').append(gageTotal.g3);
            // step1
            if(count == 1){
                title.html(msgAcs.title1);
                text.html(msgAcs.text1);
                list.html(msgAcs.list1);
                caption.attr('data-num','01');
                path.attr('data-step','01');
                img.attr('src','../../assets/images/service/exhall/'+msgAcs.img1+'.png');
            }else if(count == 2){
                dim.show();
                uiCommon.layer.open('updatePopup');
                setTimeout(function() {
                    dim.hide();
                    uiCommon.layer.close('updatePopup');
                    $('.stepPass').trigger('click');
                },1500);
                img.attr('src','../../assets/images/service/exhall/'+msgAcs.img1+'.png');
            // step2
            }else if(count == 3){
                title.html(msgAcs.title2);
                text.html(msgAcs.text2);
                list.html('');
                caption.attr('data-num','02');
                path.attr('data-step','02');
                img.attr('src','../../assets/images/service/exhall/'+msgAcs.img1+'.png');
                $('.stepGo').attr('step-num','1'); // 이전버튼 1설정
            // step3
            }else if(count == 4){
                title.html(msgAcs.title3);
                text.html(msgAcs.text3);
                caption.attr('data-num','03');
                path.attr('data-step','03');
                img.attr('src','../../assets/images/service/exhall/'+msgAcs.img3+'.png');
                $('.stepGo').attr('step-num','3'); // 이전버튼 2설정
                stepLastScroll();
            }
        }

        // 카드한도조회
        if(name === 'cardLimit'){
            $('.gagebar').attr('gage-total',3);
            $('.gagebar ul').append(gageTotal.g3);
            // step1
            if(count == 1){
                title.html(msgCls.title1);
                text.html(msgCls.text1);
                caption.attr('data-num','01');
                path.attr('data-step','01');
                img.attr('src','../../assets/images/service/exhall/'+msgCls.img1+'.png');
            // step2
            }else if(count == 2){
                title.html(msgCls.title2);
                text.html(msgCls.text2);
                caption.attr('data-num','02');
                path.attr('data-step','02');
                img.attr('src','../../assets/images/service/exhall/'+msgCls.img21+'.png');
                $('.stepGo').attr('step-num','1'); // 이전버튼 1설정
            }else if(count == 3){
                img.attr('src','../../assets/images/service/exhall/'+msgCls.img22+'.png');
            }else if(count == 4){
                dim.show();
                uiCommon.layer.open('updatePopup');
                setTimeout(function() {
                    dim.hide();
                    uiCommon.layer.close('updatePopup');
                    $('.stepPass').trigger('click');
                },1500);
            }else if(count == 5){
                title.html(msgCls.title2);
                text.html(msgCls.text2);
                caption.attr('data-num','03');
                path.attr('data-step','03');
                img.attr('src','../../assets/images/service/exhall/'+msgCls.img3+'.png');
                $('.stepGo').attr('step-num','2'); // 이전버튼 2설정
            }
        }

        // 카드승인내역
        if(name === 'cardSkiplst'){
            $('.gagebar').attr('gage-total',4);
            $('.gagebar ul').append(gageTotal.g4);
            // step1
            if(count == 1){
                title.html(msgCsl.title1);
                text.html(msgCsl.text1);
                caption.attr('data-num','01');
                path.attr('data-step','01');
                img.attr('src','../../assets/images/service/exhall/'+msgCsl.img11+'.png');
            }else if(count == 2){
                img.attr('src','../../assets/images/service/exhall/'+msgCsl.img12+'.png');
            // step2
            }else if(count == 3){
                title.html(msgCsl.title2);
                text.html(msgCsl.text2);
                caption.attr('data-num','02');
                path.attr('data-step','02');
                img.attr('src','../../assets/images/service/exhall/'+msgCsl.img21+'.png');
                $('.stepGo').attr('step-num','1'); // 이전버튼 1설정
            }else if(count == 4){
                img.attr('src','../../assets/images/service/exhall/'+msgCsl.img22+'.png');
            }else if(count == 6){
                dim.show();
                uiCommon.layer.open('updatePopup');
                setTimeout(function() {
                    dim.hide();
                    uiCommon.layer.close('updatePopup');
                    $('.stepPass').trigger('click');
                },1500);
                img.attr('src','../../assets/images/service/exhall/'+msgCsl.img21+'.png');
            // step3
            }else if(count == 7){
                title.html(msgCsl.title3);
                text.html(msgCsl.text3);
                caption.attr('data-num','03');
                path.attr('data-step','03');
                img.attr('src','../../assets/images/service/exhall/'+msgCsl.img21+'.png');
                $('.stepGo').attr('step-num','3'); // 이전버튼 2설정
            }else if(count == 8){
                img.attr('src','../../assets/images/service/exhall/'+msgCsl.img21+'.png');
            }else if(count == 9){
                title.html(msgCsl.title4);
                text.html(msgCsl.text4);
                caption.attr('data-num','04');
                path.attr('data-step','04');
                img.attr('src','../../assets/images/service/exhall/'+msgCsl.img4+'.png');
                $('.stepGo').attr('step-num','7'); // 이전버튼 3설정
                stepLastScroll();
            }
        }

        // 카드청구내역
        if(name === 'cardClaimlst'){
            $('.gagebar').attr('gage-total',4);
            $('.gagebar ul').append(gageTotal.g4);
            // step1
            if(count == 1){
                title.html(msgCcl.title1);
                text.html(msgCcl.text1);
                caption.attr('data-num','01');
                path.attr('data-step','01');
                img.attr('src','../../assets/images/service/exhall/'+msgCcl.img11+'.png');
            }else if(count == 2){
                img.attr('src','../../assets/images/service/exhall/'+msgCcl.img12+'.png');
            // step2
            }else if(count == 3){
                title.html(msgCcl.title2);
                text.html(msgCcl.text2);
                caption.attr('data-num','02');
                path.attr('data-step','02');
                img.attr('src','../../assets/images/service/exhall/'+msgCcl.img21+'.png');
                $('.stepGo').attr('step-num','1'); // 이전버튼 1설정
            }else if(count == 4){
                img.attr('src','../../assets/images/service/exhall/'+msgCcl.img22+'.png');
            }else if(count == 5){
                dim.show();
                uiCommon.layer.open('updatePopup');
                setTimeout(function() {
                    dim.hide();
                    uiCommon.layer.close('updatePopup');
                    $('.stepPass').trigger('click');
                },1500);
                img.attr('src','../../assets/images/service/exhall/'+msgCcl.img21+'.png');
            // step3
            }else if(count == 6){
                title.html(msgCcl.title3);
                text.html(msgCcl.text3);
                caption.attr('data-num','03');
                path.attr('data-step','03');
                $('.stepGo').attr('step-num','3'); // 이전버튼 2설정
                img.attr('src','../../assets/images/service/exhall/'+msgCcl.img21+'.png');
            // step4
            }else if(count == 8){
                title.html(msgCcl.title4);
                text.html(msgCcl.text4);
                caption.attr('data-num','04');
                path.attr('data-step','04');
                img.attr('src','../../assets/images/service/exhall/'+msgCcl.img4+'.png');
                $('.stepGo').attr('step-num','6'); // 이전버튼 3설정
                stepLastScroll();
            }
        }

        // 자금일보
        if(name === 'fundReport'){
            $('.gagebar').attr('gage-total',4);
            $('.gagebar ul').append(gageTotal.g4);
            // step1
            if(count == 1){
                title.html(msgFrt.title1);
                text.html(msgFrt.text1);
                caption.attr('data-num','01');
                path.attr('data-step','01');
                img.attr('src','../../assets/images/service/exhall/'+msgFrt.img1+'.png');
            // step2
            }else if(count == 2){
                title.html(msgFrt.title2);
                text.html(msgFrt.text2);
                caption.attr('data-num','02');
                path.attr('data-step','02');
                img.attr('src','../../assets/images/service/exhall/'+msgFrt.img21+'.png');
                $('.stepGo').attr('step-num','1'); // 이전버튼 1설정
            }else if(count == 3){
                img.attr('src','../../assets/images/service/exhall/'+msgFrt.img22+'.png');
            // step3
            }else if(count == 5){
                title.html(msgFrt.title3);
                text.html(msgFrt.text3);
                caption.attr('data-num','03');
                path.attr('data-step','03');
                img.attr('src','../../assets/images/service/exhall/'+msgFrt.img21+'.png');
                $('.stepGo').attr('step-num','2'); // 이전버튼 1설정
            }else if(count == 6){
                img.attr('src','../../assets/images/service/exhall/'+msgFrt.img31+'.png');
            }else if(count == 7){
                img.attr('src','../../assets/images/service/exhall/'+msgFrt.img32+'.png');
            // step4
            }else if(count == 9){
                title.html(msgFrt.title4);
                text.html(msgFrt.text4);
                caption.attr('data-num','04');
                path.attr('data-step','04');
                img.attr('src','../../assets/images/service/exhall/'+msgFrt.img21+'.png');
                $('.stepGo').attr('step-num','5'); // 이전버튼 3설정
            }
        }

        // 자금수지
        if(name === 'fundBalance'){
            $('.gagebar').attr('gage-total',5);
            $('.gagebar ul').append(gageTotal.g5);
            // step1
            if(count == 1){
                title.html(msgFbc.title1);
                text.html(msgFbc.text1);
                caption.attr('data-num','01');
                path.attr('data-step','01');
                img.attr('src','../../assets/images/service/exhall/'+msgFbc.img1+'.png');
            // step2
            }else if(count == 2){
                title.html(msgFbc.title2);
                text.html(msgFbc.text2);
                caption.attr('data-num','02');
                path.attr('data-step','02');
                img.attr('src','../../assets/images/service/exhall/'+msgFbc.img21+'.png');
                $('.stepGo').attr('step-num','1'); // 이전버튼 1설정
            }else if(count == 3){
                img.attr('src','../../assets/images/service/exhall/'+msgFbc.img22+'.png');
            }else if(count == 4){
                img.attr('src','../../assets/images/service/exhall/'+msgFbc.img23+'.png');
            }else if(count == 5){
                img.attr('src','../../assets/images/service/exhall/'+msgFbc.img24+'.png');
            // step3
            }else if(count == 7){
                title.html(msgFbc.title3);
                text.html(msgFbc.text3);
                caption.attr('data-num','03');
                path.attr('data-step','03');
                img.attr('src','../../assets/images/service/exhall/'+msgFbc.img3+'.png');
                $('.stepGo').attr('step-num','2'); // 이전버튼 2설정
            // step4
            }else if(count == 8){
                title.html(msgFbc.title4);
                text.html(msgFbc.text4);
                caption.attr('data-num','04');
                path.attr('data-step','04');
                img.attr('src','../../assets/images/service/exhall/'+msgFbc.img4+'.png');
                $('.stepGo').attr('step-num','7'); // 이전버튼 3설정
            // step5
            }else if(count == 11){
                title.html(msgFbc.title5);
                text.html(msgFbc.text5);
                caption.attr('data-num','05');
                path.attr('data-step','05');
                img.attr('src','../../assets/images/service/exhall/'+msgFbc.img51+'.png');
                $('.stepGo').attr('step-num','8'); // 이전버튼 4설정
            }else if(count == 12){
                img.attr('src','../../assets/images/service/exhall/'+msgFbc.img52+'.png');
                stepLastScroll();
            }
        }

        // 자금모으기 실행
        if(name === 'fundRaising'){
            $('.gagebar').attr('gage-total',5);
            $('.gagebar ul').append(gageTotal.g5);
            // step1
            if(count == 1){
                title.html(msgFre.title1);
                text.html(msgFre.text1);
                caption.attr('data-num','01');
                path.attr('data-step','01');
                img.attr('src','../../assets/images/service/exhall/'+msgFre.img11+'.png');
            }else if(count == 2){
                img.attr('src','../../assets/images/service/exhall/'+msgFre.img12+'.png');
            // step2
            }else if(count == 3){
                title.html(msgFre.title2);
                text.html(msgFre.text2);
                caption.attr('data-num','02');
                path.attr('data-step','02');
                $('.stepGo').attr('step-num','1'); // 이전버튼 1설정
            // step3
            }else if(count == 5){
                title.html(msgFre.title3);
                text.html(msgFre.text3);
                caption.attr('data-num','03');
                path.attr('data-step','03');
                img.attr('src','../../assets/images/service/exhall/'+msgFre.img12+'.png');
                $('.stepGo').attr('step-num','3'); // 이전버튼 2설정
            // step4
            }else if(count == 8){
                title.html(msgFre.title4);
                text.html(msgFre.text4);
                caption.attr('data-num','04');
                path.attr('data-step','04');
                img.attr('src','../../assets/images/service/exhall/'+msgFre.img4+'.png');
                $('.stepGo').attr('step-num','5'); // 이전버튼 3설정
            // step5
            }else if(count == 10){
                title.html(msgFre.title5);
                text.html(msgFre.text5);
                caption.attr('data-num','05');
                path.attr('data-step','05');
                img.attr('src','../../assets/images/service/exhall/'+msgFre.img5+'.png');
                $('.stepGo').attr('step-num','8'); // 이전버튼 4설정
            }
        }

        // 자금모으기그룹 설정
        if(name === 'fundGroup'){
            $('.gagebar').attr('gage-total',4);
            $('.gagebar ul').append(gageTotal.g4);
            // step1
            if(count == 1){
                title.html(msgFrs.title1);
                text.html(msgFrs.text1);
                caption.attr('data-num','01');
                path.attr('data-step','01');
                img.attr('src','../../assets/images/service/exhall/'+msgFrs.img1+'.png');
            // step2
            }else if(count == 2){
                title.html(msgFrs.title2);
                text.html(msgFrs.text2);
                caption.attr('data-num','02');
                path.attr('data-step','02');
                img.attr('src','../../assets/images/service/exhall/'+msgFrs.img21+'.png');
                $('.stepGo').attr('step-num','1'); // 이전버튼 1설정
            }else if(count == 4){
                img.attr('src','../../assets/images/service/exhall/'+msgFrs.img22+'.png');
                // step3
            }else if(count == 5){
                title.html(msgFrs.title3);
                text.html(msgFrs.text3);
                caption.attr('data-num','03');
                path.attr('data-step','03');
                $('.stepGo').attr('step-num','2'); // 이전버튼 2설정
                img.attr('src','../../assets/images/service/exhall/'+msgFrs.img22+'.png');
            }else if(count == 7){
                img.attr('src','../../assets/images/service/exhall/'+msgFrs.img3+'.png');
            }else if(count == 8){
                title.html(msgFrs.title4);
                text.html(msgFrs.text4);
                caption.attr('data-num','04');
                path.attr('data-step','04');
                img.attr('src','../../assets/images/service/exhall/'+msgFrs.img4+'.png');
                $('.stepGo').attr('step-num','5'); // 이전버튼 3설정
            }
        }

        console.log(name,count);
    },

    // 스텝별 안에 내용 설정 (활성화이름, 시작순서, 전체길이)
    exhallStep = function(name,start,max){
        $('.content').removeClass().addClass('content '+name);
        stepCondition(name,start);
        $('.subTab2 a').bind('click', function() {
            ieTransNone();
            $('.subTab2 a').removeClass('on').removeAttr('title','협재 탭');
            $(this).addClass('on').attr('title','협재 탭');
        });
        // 초기설정(탭선택)
        if(start === 0){
            $("#num").val(start+1);
            $("#name").val(name);
            $("#max").val(max);
            $('.gagebar').attr('gage-interval',start+1);
            count = 1;
            stepCondition(name,count);
        }else{
            // 이전단계로
            $('#num').val(1);            
            $('.'+name+' .stepGo').bind('click', function(e) {
                e.preventDefault();
                var idx = $(this).attr('step-num'),
                    name = $("#name").val();
                $('.stepPass').fadeIn();
                $('.gagebar').attr('gage-interval', idx);
                $("#num").val(idx);
                $('.scroll-icon').removeClass('on');
                count = idx;
                ieTransNone();
                stepPassTarget(idx);
                stepCondition(name,count);
            });
            // 다음스텝으로 넘어가는 버튼
            $('.'+name+' .stepPass').bind('click', function(e) {
                e.preventDefault();
                var name = $("#name").val(),
                    max = $("#max").val(),
                    num = $("#num").val(),
                    num = $("#num").val(num*1+1),
                    count = $("#num").val();
                $(this).addClass('m'+count);
                $('.gagebar').attr('gage-interval',count);
                $('.stepGo').css('display','inline-block');
                stepCondition(name,count);
                if(count == max){
                    setTimeout(function() {
                        $(e.target).fadeOut();
                    },150);
                }
            });
        }
    }

});