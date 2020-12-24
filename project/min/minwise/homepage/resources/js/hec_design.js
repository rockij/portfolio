window.onload = function() {
    //탭메뉴
    $('.tabMenu .tabBtn').on('click', function() {
        $('.tabMenu .tabBtn').removeClass('active');
        $(this).addClass('active');
        var tabId = $(this).attr('data-tab');
        $('.tabWrap .tabCont').removeClass('active');
        $('#' + tabId).addClass('active');
    })
    
    // 파일첨부 파일명
    $('.file .uploadBtn').on('change', function() {
        var fileName;
        if(window.FileReader) {
            fileName = $(this)[0].files[0].name;
        }
        // console.log(fileName);
        $('.fileInfo .fileName').val(fileName);
    })

    // 파일첨부 x 버튼
    $('.fileInfo .delBtn').on('click', function() {
        $('.fileInfo .fileName').val(null); //text 입력값 제거
        $('.file .uploadBtn').val(null); // 현재 파일 입력값 제거
    })
}