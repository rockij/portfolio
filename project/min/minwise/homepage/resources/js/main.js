function mainAction(){	
	var swiper = new Swiper('#mainSlide', {
		pagination: '#mainSlide .swiper-page',
		paginationClickable: true
	});	
	var swiper = new Swiper('#mainSrv', {
		pagination: '#mainSrv .swiper-page',
		autoplay: 3000,
		speed: 1000,
		loop: true,
		followFinger: false,
		onlyExternal: true,
		paginationClickable: true
	});
}