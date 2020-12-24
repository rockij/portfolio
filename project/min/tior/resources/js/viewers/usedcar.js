function daySelect(id) {
    var tar = $('#' + id);
    var dayBody = tar.find('.dayselct .body');
    dayBody.find('li').removeClass('current').eq(0).addClass('current');
    // dayBody.find('li').removeClass('today').eq(0).addClass('today');
    dayBody.scrollLeft(0);
}

$(function () {
    // 일정확인 부분
    $(document).on('click', '.timeselct button', function () {
        var _this = $(this).parent();
        _this.parent().find('button').removeClass('selected');
        $(this).addClass('selected');
    });
    $(document).on('click', '.dayselct .body button', function () {
        var _this = $(this).parent();
        _this.parent().find('li').removeClass('current');
        _this.addClass('current');
    });
})