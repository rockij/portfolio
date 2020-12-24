// 맞춤정보
$(function() {
    mainSlide = new Swiper('.swiper-container', {
        autoplay: {
        	delay: 2000,
        	disableOnInteraction: false
        },
        speed: 500,
        init: false,
        loop: true,
        slideToClickedSlide: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        slidesPerView: 1,
        spaceBetween: 0,
        initialSlide: 0
    });
    $('html,body').css('overflow','hidden');
});

// 신용정보
$('.range .per').each(function(){
    var $this = $(this),
        per = $this.attr('per');
        $this.css('width',per*.1+'%'),
        wsize = $this.parent().width();
    $this.css({'background-size':''+ wsize+'px 100%'});
    if(per == 1000){
        $this.find('i').css({'margin-right':'0'});
    }
    if($this.hasClass('num')){        
        $this.parent().addClass('num');
        $({animatedValue:0}).animate({animatedValue:per},{
            duration: 1000,
            step: function(){
                $this.attr('per',Math.floor(this.animatedValue));
            },
            complete: function() {
                $this.attr('per',Math.floor(this.animatedValue));
            }
        });
    }else if($this.hasClass('case')){
        $this.parent().addClass('case');
        if($this.attr('per') <= 200 || $this.attr('per') < 300){
            $this.attr('per', '우려');
        }else if($this.attr('per') <= 400 || $this.attr('per') < 500){
            $this.attr('per', '다소 우려');
        }else if($this.attr('per') <= 600 || $this.attr('per') < 700){
            $this.attr('per', '보통');
        }else if($this.attr('per') <= 800 || $this.attr('per') < 900){
            $this.attr('per', '우수');
        }else if($this.attr('per') <= 1000){
            $this.attr('per', '매우 우수');
        }
    }
});

$('.weight .per').each(function(){
    var $this = $(this),
        per = $this.attr('per'),
        parent = $this.parent().parent(),
        count = parent.find('.count');
        setTimeout(function() {
            $this.css({'transform':'translateX(-50%) rotate('+(-90+per*.18)+'deg)'});
		}, 100);
    if($this.hasClass('num')){
        parent.addClass('num');
        $({animatedValue:0}).animate({animatedValue:per},{
            duration: 1000,
            step: function(){
                count.text(Math.floor(this.animatedValue));
            },
            complete: function() {
                count.text(Math.floor(this.animatedValue));
            }
        });
    }else if($this.hasClass('case')){
        parent.addClass('case');
        if($this.attr('per') <= 200 || $this.attr('per') < 300){
            count.text('우려');
        }else if($this.attr('per') <= 400 || $this.attr('per') < 500){
            count.text('다소 우려');
        }else if($this.attr('per') <= 600 || $this.attr('per') < 700){
            count.text('보통');
        }else if($this.attr('per') <= 800 || $this.attr('per') < 900){
            count.text('우수');
        }else if($this.attr('per') <= 1000){
            count.text('매우 우수');
        }
    }
});