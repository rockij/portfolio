function hasJqueryObject($elem) { return $elem.length > 0 }
var UI = UI || {};

var Utils = {
	getMediaQuery: function(type){
		return {
			pc: window.matchMedia("(min-width:1025px)"),
			tablet: window.matchMedia("(min-width:768px) and (max-width:1024px)"),
			mobile: window.matchMedia("all and (max-width:767px)")
		}[type];
	}
}

UI.matchMedia = {
    init: function() {
        var _this = this;
        var pcMQ = Utils.getMediaQuery('pc');
        var tabletMQ = Utils.getMediaQuery('tablet');

        if(pcMQ.matches) {
            _this.matchedIsPC();
        } else {
            tabletMQ.matches ? _this.matchedIsTablet() : _this.matchedIsMobile();
        }
        pcMQ.addListener(function(mql){
            document.location.reload();
            mql.matches && _this.matchedIsPC();
        });

        tabletMQ.addListener(function(mql){
            document.location.reload();
            mql.matches ? _this.matchedIsTablet() : pcMQ.matches ? _this.matchedIsPC() : _this.matchedIsMobile();
        });
    },
    matchedIsPC: function(){
        console.log('is PC');
        UI.motion.pcScroll();
    },
    matchedIsTablet: function(){
        console.log('is Tablet');
        UI.motion.pcScroll();
    },
    matchedIsMobile: function(){
        console.log('is Mobile');
        UI.motion.mScroll();
    }
}


UI.motion = {
    pcScroll: function() {
        
        var _this = this;
        _this.$animate = UI.$body.find(".animate");

        var sec1,sec2,sec3,sec4;
        var status;

        var handler = {
            sec1: function SEC1_ANIMATE() {
                var $container = $('#sec1'), tl = new TimelineMax();
                tl.add([
                    TweenMax.to($container.find('.titWrap .subTxt'), .7, {y:0, opacity:1}, 0.4),
                    TweenMax.to($container.find('.titWrap .txt'), .7, {y:0, opacity:1}, 0.4),
                    TweenMax.to($container.find('.btnWrap'), .7, {y:0, opacity:1, delay:.5}, 0.4),
                    TweenMax.to($container.find('.info_txt'), .7, {opacity:1, delay:.7}, 0.4),
                    TweenMax.to($container.find('.imgWrap .img02 .item'), .1, {opacity:1, ease:Power3.easeOut, delay:.8}),
                    TweenMax.to($container.find('.imgWrap .img01 .item'), .7, {y:0, opacity:1, ease:Power3.easeOut, delay:.8}, 0.4),
                    TweenMax.to($container.find('.imgWrap .txt'), .7, {opacity:1, delay:.8}, 0.4)
                ], '+=.3')
                .add([
                    TweenMax.to($container.find('.imgWrap .img01 .message01'), .8, {y:0, opacity:1, ease:Power3.easeOut, delay:.3}, 0.4),
                    TweenMax.to($container.find('.imgWrap .img01 .message01'), .5, {className:'+=on', delay:.3}),
                    TweenMax.to($container.find('.imgWrap .img01 .message02'), .8, {y:0, opacity:1, ease:Power3.easeOut, delay:.7}, 0.4)
                ], '-=.5');

            },
            sec2: function SEC2_ANIMATE() {
                var $container = $('#sec2'), tl = new TimelineMax();
                tl.add([
                    TweenMax.to($container.find(".titWrap"),  .7, { x:0, opacity:1, delay:.2}),
                    TweenMax.to($container.find(".infoList"),  .7, { x:0, opacity:1, delay:.2}),
                    TweenMax.to($container.find(".imgWrap"), .5, { scale:1, opacity:1,  delay:.2})
                ])
                .add([
                    TweenMax.staggerTo($container.find('.imgWrap .item'), .3, {y:0, opacity:1, ease:Linear.easeOut}, .2)
                ])
            },
            sec3: function SEC3_ANIMATE() {
                var $container = $('#sec3'), tl = new TimelineMax();
                tl.add([
                    TweenMax.to($container.find(".titWrap"),  .7, { x:0, opacity:1, delay:.2}),
                    TweenMax.to($container.find(".imgWrap .img02 .item"), .5, { y:11, opacity:1,  delay:.4})
                ])
                .add([
                    TweenMax.to($container.find(".bu02 .item"),  .3, { y:0, opacity:1}),
                    TweenMax.to($container.find(".bu01 .item"),  .5, { y:0, opacity:1, delay:.1})
                ])
            },
            sec4: function SEC2_ANIMATE() {
                var $container = $('#sec4'), tl = new TimelineMax();
                tl.add([
                    TweenMax.to($container.find(".titWrap"),  .7, { x:0, opacity:1, delay:.2})
                ])
                .add([
                    TweenMax.to($container.find(".itemList"),  .4, { y:0, opacity:1}),
                    TweenMax.to($container.find(".itemList02"),  .4, {y:0,opacity:1, delay:.3, onComplete:function(){
                        if(status) return;
                        status = true;
                        var _this = this,
                        per = 20;
                        setTimeout(function(){
                            $({animatedValue:0}).animate({animatedValue:per},{
                                duration: 500,
                                step: function(){
                                    UI.$body.find(".mcount").attr('per',Math.floor(this.animatedValue));
                                },
                                complete: function() {
                                    UI.$body.find(".mcount").attr('per',Math.floor(this.animatedValue));
                                }
                            });
                        });
                    }})
                ], '-=.5')
                .add([
                   TweenMax.to($("#sec4 .itemList02 .img02 .item"), .2, {y:0, opacity:1, delay:1}),
                   TweenMax.to($container.find('.itemList03 .img02 .item'), .1, {className:'+=on', delay:1.2})
                ])
            }
        }

        $(window).on("scroll", function(){
            var viewTop = $(this).scrollTop(),
                viewHeight = $(this).outerHeight(true) / 1.3,
                viewBottom = viewTop + viewHeight;

            _this.$animate.each(function(){
                var elementTop = $(this).offset().top,
                    elementHeight = $(this).outerHeight(),
                    elementBottom = elementTop + elementHeight;

                if(viewTop < elementBottom && viewBottom > elementTop) {
                    var id = $(this).attr('id');
                    handler[id]();
                }
            });
        }).trigger("scroll");
    },
    mScroll: function() {
        
        var _this = this;
        _this.$animate = UI.$body.find(".animate");

        var sec1,sec2,sec3,sec4;
        var status;

        var handler = {
            sec1: function SEC1_ANIMATE() {
                var $container = $('#sec1'), tl = new TimelineMax();
                tl.add([
                    TweenMax.to($container.find('.titWrap .subTxt'), .7, {y:0, opacity:1}, 0.4),
                    TweenMax.to($container.find('.titWrap .txt'), .7, {y:0, opacity:1}, 0.4),
                    TweenMax.to($container.find('.btnWrap'), .7, {y:0, opacity:1, delay:.5}, 0.4),
                    TweenMax.to($container.find('.imgWrap .img02 .item'), .1, {opacity:1, ease:Power3.easeOut, delay:.8}),
                    TweenMax.to($container.find('.imgWrap .img01 .item'), .7, {y:0, opacity:1, ease:Power3.easeOut, delay:.8}, 0.4),
                    TweenMax.to($container.find('.imgWrap .txt'), .7, {opacity:1, delay:.8}, 0.4)
                ])
                .add([
                    TweenMax.to($container.find('.imgWrap .img01 .message02'), .8, {y:0, opacity:1, ease:Power3.easeOut, delay:.2}, 0.4)
                ], '-=.5');

            },
            sec2: function SEC2_ANIMATE() {
                var $container = $('#sec2'), tl = new TimelineMax();
                tl.add([
                    TweenMax.to($container.find(".titWrap"),  .7, { y:0, opacity:1, delay:.2}),
                    TweenMax.to($container.find(".imgWrap"), .5, { scale:1, opacity:1,  delay:.5}),
                    TweenMax.staggerTo($container.find('.imgWrap .item'), .3, {y:0, opacity:1, ease:Linear.easeOut,  delay:.7}, .2),
                    TweenMax.to($container.find(".infoList"),  .7, { y:0, opacity:1, delay:1})
                ])
                .add([
                    
                ])
            },
            sec3: function SEC3_ANIMATE() {
                var $container = $('#sec3'), tl = new TimelineMax();
                tl.add([
                    TweenMax.to($container.find(".titWrap"),  .7, { y:0, opacity:1, delay:.2}),
                    TweenMax.to($container.find(".imgWrap .img02 .item"), .5, { y:0, opacity:1,  delay:.4})
                ])
                .add([
                    TweenMax.to($container.find(".bu02 .item"),  .3, { y:0, opacity:1}),
                    TweenMax.to($container.find(".bu01 .item"),  .5, { y:0, opacity:1, delay:.1})
                ])
            },
            sec4: function SEC2_ANIMATE() {
                var $container = $('#sec4'), tl = new TimelineMax();
                tl.add([
                    TweenMax.to($container.find(".titWrap"),  .7, { y:0, opacity:1, delay:.2})
                ])
                .add([
                    TweenMax.to($container.find(".itemList"),  .4, { y:0, opacity:1}),
                    TweenMax.to($container.find(".itemList02"),  .4, {y:0,opacity:1, delay:.3, onComplete:function(){
                        if(status) return;
                        status = true;
                        var _this = this,
                        per = 20;
                        setTimeout(function(){
                            $({animatedValue:0}).animate({animatedValue:per},{
                                duration: 500,
                                step: function(){
                                    UI.$body.find(".mcount").attr('per',Math.floor(this.animatedValue));
                                },
                                complete: function() {
                                    UI.$body.find(".mcount").attr('per',Math.floor(this.animatedValue));
                                }
                            });
                        });
                    }})
                ], '-=.5')
                .add([
                    TweenMax.to($("#sec4 .itemList02 .img02 .item"), .2, {y:0, opacity:1, delay:1}),
                    TweenMax.to($container.find('.itemList03 .img02 .item'), .1, {className:'+=on', delay:1.2})
                ])
            }
        }

        $(window).on("scroll", function(){
            var viewTop = $(this).scrollTop(),
                viewHeight = $(this).outerHeight(true) / 1.3,
                viewBottom = viewTop + viewHeight;

            _this.$animate.each(function(){
                var elementTop = $(this).offset().top,
                    elementHeight = $(this).outerHeight(),
                    elementBottom = elementTop + elementHeight;

                if(viewTop < elementBottom && viewBottom > elementTop) {
                    var id = $(this).attr('id');
                    handler[id]();
                }
            });
        }).trigger("scroll");
    }
}

UI.fixed = {
    init: function() {
        var _this = this;
        _this.$header = UI.$body.find("#header");
        var headerHeight = _this.$header.offset().top;
        $(window).on("scroll", function(){
            var st = $(this).scrollTop();
            if(st > 0) {
                _this.$header.addClass("fixed");
            } else {
                _this.$header.removeClass("fixed");
            }
        }).trigger("scroll");
    }
}

UI.acco = {
    init: function() {
        this.$accoWrap = UI.$body.find(".acco_list");
        this.$accoItem = this.$accoWrap.find(".item");
        this.$accoTit = this.$accoWrap.find(".tit");
        this.$accoTitActive = this.$accoWrap.find(".tit.on");
        this.$accoCont = this.$accoWrap.find(".cont");
        this.addEvents();
    },
    addEvents: function() {
        var _this = this;
        function handleToggle() {
            if($(this).hasClass('on')){
                _this.$accoCont.slideUp(200);
                _this.$accoItem.removeClass('on');
                $(this).removeClass('on');
            }else{
                _this.$accoCont.slideUp(200);
                _this.$accoTit.removeClass('on');
                _this.$accoItem.removeClass('on');
                $(this).parent().addClass('on')
                $(this).addClass('on').next().slideDown(200);
            }
        }
        _this.$accoTit.off('click.toggle').on('click.toggle', handleToggle);
    }
}

UI.ipFocus = {
    init: function() {
        this.$inputWrap = UI.$body.find(".ip_box");
        this.$ip = this.$inputWrap.find(".ip");
        this.addEvents();
    },
    addEvents: function() {
        var _this = this;
        _this.$ip.each(function(idx){
            var _input = $(this), _par = $(this).parent(), _wrap = $(this).parents(".ip_wrap");
            _input.on("focus", function () {
                _par.addClass('focus');
            }).on("blur", function (e) {
                _par.removeClass('focus');
                if(_par.children('textarea').length){
                    _par.addClass('textarea');
                }
                if(!$.trim($(this).val()) == "" ) {
                    _par.find('.lbl').hide();
                    _wrap.siblings(".btn").attr("disabled",false);
                }else{
                    _par.find('.lbl').show();
                    _wrap.siblings(".btn").attr("disabled",true);
                }
            }).blur();
            _input.on("keyup", function () {
                if(!$.trim($(this).val()) == "" ) {
                    _par.find('.lbl').hide();
                    _wrap.siblings(".btn").attr("disabled",false);
                }
            });
        });
    }
}

UI.selFocus = {
    init: function() {
        this.$inputWrap = UI.$body.find(".ip_box");
        this.$select = this.$inputWrap.find("select");
        this.addEvents();
    },
    addEvents: function() {
        var _this = this;
        _this.$select.each(function(idx){
            $(this).val(-1);
            var _input = $(this), _par = $(this).parent().parent();
			_input.on("focus", function () {
                _par.removeClass('in');
                _par.addClass('focus');
			}).on("blur", function (e) {
				if(!$(this).val() == "" ) {
                    _par.find('.lbl').removeClass('show');
                    _par.find('.lbl').hide();
                }else{
                    _par.find('.lbl').addClass('show');
                    _par.find('.lbl').show();
                }
                _par.addClass('in');
            }).blur();
            _input.on("change", function () {
                _par.find('.lbl').addClass('hide');
                _par.addClass('in');
                if(_par.hasClass('in') & _par.hasClass('focus')) {
                    _par.removeClass('in');
                }
            });
        });
    }
}
UI.dim = {
    on: function() {
        if(!$("#header").children(".dim").length) {
            $('body').css('overflow', 'hidden');
            $("#header").append("<div class='dim'></div>");
        }  
    },
    off: function() {
        $('body').css('overflow', '');
        $("#header").find(".dim").remove();
    }
}

UI.allMenu = {
    events: {
        CLICK_OPEN_ALL_MENU: "click.openAllMenu",
        CLICK_CLOSE_ALL_MENU: "click.closeAllMenu"
    },
    init: function() {
        this.$btnOpen = UI.$body.find(".btnAllMenuOpen");
        this.$allMenuWrap = UI.$body.find(".allMenuWrap");
        this.$btnClose = this.$allMenuWrap.find(".btnAllMenuClose");
        this.addEvents();

    },
    addEvents: function() {
        var _this = this;
        _this.$btnOpen.off(_this.events.CLICK_OPEN_ALL_MENU).on(_this.events.CLICK_OPEN_ALL_MENU, function(){
        _this.handleOpen();
        });
        _this.$btnClose.off(_this.events.CLICK_CLOSE_ALL_MENU).on(_this.events.CLICK_CLOSE_ALL_MENU, function(){
            _this.handleClose();
        });
    },
    handleOpen: function(){
        UI.dim.on();
        UI.allMenu.$allMenuWrap.css("display", "block");
        setTimeout( function() {
            UI.allMenu.$allMenuWrap.addClass("on");
        }, 100);
    },
    handleClose: function(){
        UI.allMenu.$allMenuWrap.removeClass("on");
        setTimeout( function() {
            UI.allMenu.$allMenuWrap.css("display", "none");
        }, 100);
        UI.dim.off();
        UI.allMenu.$btnOpen.focus();
    }

}

$(function(){
    UI.$window = $(window);
    UI.$body = $("body");
    UI.matchMedia.init();
    hasJqueryObject(UI.$body.find(".main")) && UI.fixed.init();
    hasJqueryObject(UI.$body.find(".acco_list")) && UI.acco.init();
    hasJqueryObject(UI.$body.find(".ip_box input")) && UI.ipFocus.init();
    hasJqueryObject(UI.$body.find(".ip_box textarea")) && UI.ipFocus.init();
    hasJqueryObject(UI.$body.find(".ip_box select")) && UI.selFocus.init();
    hasJqueryObject(UI.$body.find(".allMenuWrap")) && UI.allMenu.init();
    //공동인증 모션
    var $container = $('.certificate'), cert_tl = new TimelineMax();
    cert_tl.add([
        TweenMax.to($container.find(".img01"),  .5, { y:0, opacity:1}),
        TweenMax.to($container.find(".img02"),  .5, { scale:1, opacity:1,delay:.3})
    ]);

});
