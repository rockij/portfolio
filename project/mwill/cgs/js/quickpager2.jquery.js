//-------------------------------------------------
//		Quick Pager jquery plugin
//		Created by dan@geckonm.com
//		www.geckonewmedia.com
//
//		Add prev and next link to page navigation.
//		modified by wonchan.lee@gmail.com
//		twitter.com/chanlee
//-------------------------------------------------

(function ($) {

  $.fn.quickPager = function (options) {

    var defaults = {
      pageSize: 10,
      naviSize: 5,
      currentPage: 1,
      holder: ""
    };

    var options = $.extend(defaults, options);

    //leave this
    var selector = $(this);
    var totalRecords = $(this).children().length;
    var pageCounter = 1;

    selector.children().each(function (i) {
      if (i < pageCounter * options.pageSize && i >= (pageCounter - 1) * options.pageSize) {
        $(this).addClass("page" + pageCounter);
      } else {
        $(this).addClass("page" + (pageCounter + 1));
        pageCounter++;
      }
    });

    //show/hide the appropriate regions
    selector.children().hide();
    $(".page" + options.currentPage).show();

    //first check if there is more than one page. If so, build nav
    if (pageCounter > 1) {
      //Build pager navigation
      var pageNav = "<ul class='pageNav'>";
      for (i = 1; i <= pageCounter; i++) {
        if (i == options.currentPage) {
          pageNav += "<li class=\"currentPage pageNav" + i + "\"'><a rel='" + i + "' href='#'>" + i + "</a></li>";
        } else {
          pageNav += "<li class='pageNav" + i + "'><a rel='" + i + "' href='#'>" + i + "</a></li>";
        }
        // 1 2 ... 4 5 next prev 6 ... 10 next prev 11.... 20 next prev ... next ...
        if (0 == (i % options.naviSize)) {
          pageNav += "<li class='next-" + (i + 1) + "'><a rel='" + (i + 1) + "' href='#'><img src='http://image.findall.co.kr/FAImage/PaperNew/btn/page_next.gif' name='next'><font color='white'>next</font></a></li>";
          pageNav += "<li class='prev-" + i + "'><a rel='" + i + "' href='#'><font color='white'>prev</font><img src='http://image.findall.co.kr/FAImage/PaperNew/btn/page_prev.gif' name='next'></a></li>";
        }
      }

      pageNav += "</ul>";

      if (options.holder == "") {
        selector.after(pageNav);
      } else {
        $(options.holder).append(pageNav);
      }

      var start = 1;
      var end = options.naviSize;

      // all hide and show start to end page with navigation.
      $('.pageNav').children().hide();
      for (i = start; i <= end; i++) {
        if (i == end) {
          $('.prev-' + i).hide();
          $('.next-' + (i + 1)).show();
        } else if (i == start) {
          $('.next-' + (i + 1)).hide();
          $('.prev-' + i).show();
        }
        $('.pageNav' + i).show();
      }

      $('.currentPage').show();

      //pager navigation behaviour
      $(".pageNav a").live("click", function () {
        //grab the REL attribute
        var clickedLink = $(this).attr("rel");
        if ($(this).text() == 'prev') {
          end = Math.ceil(clickedLink / options.naviSize) * options.naviSize;
          start = end - options.naviSize + 1;

          $('.pageNav').children().hide();
          for (i = start; i <= end; i++) {
            if (i == end) {
              $('.prev-' + i).hide();
              $('.next-' + (i + 1)).show();
            } else if (i == start) {
              $('.next-' + (i + 1)).hide();
              $('.prev-' + (i - 1)).show();
            }
            $('.pageNav' + i).show();
          }

        } else if ($(this).text() == 'next') {
          start = Math.floor(clickedLink / options.naviSize) * options.naviSize + 1;
          end = start + (options.naviSize - 1);
          $('.pageNav').children().hide();
          for (i = start; i <= end; i++) {
            if (i == end) {
              $('.prev-' + i).hide();
              $('.next-' + (i + 1)).show();
            } else if (i == start) {
              $('.next-' + (i + 1)).hide();
              $('.prev-' + (i - 1)).show();
            }
            $('.pageNav' + i).show();
          }
        }

        options.currentPage = clickedLink;
        //remove current current (!) page
        $("li.currentPage").removeClass("currentPage");
        //Add current page highlighting
        $("ul.pageNav").find("a[rel='" + clickedLink + "']").parent("li").addClass("currentPage");
        //$(this).parent("li").addClass("currentPage");
        //hide and show relevant links
        selector.children().hide();
        selector.find(".page" + clickedLink).show();

        return false;
      });
    }
  }
})(jQuery);


function MoPaging(vPage, vPageCount) {

  if (vPage >= 1 && vPage <= vPageCount) {
    var intPrevPage = parseInt(vPage) - 1;
    var intNextPage = parseInt(vPage) + 1;

    var PageMini = "";
    PageMini += "<button type='button' class='bt_prev' onclick='MoPaging(" + intPrevPage + "," + vPageCount + ")'><span class='bg_common bt_prev_arrow'><span>이전</span></span></button>";
    PageMini += "<span><strong id='strongCurrentPage'>" + vPage + "</strong> / " + vPageCount + "</span>";
    PageMini += "<button type='button' class='bt_next' onclick='MoPaging(" + intNextPage + "," + vPageCount + ")'><span class='bg_common bt_next_arrow'><span>다음</span></span></button>";

    $(".page_mini").html(PageMini);

    $(".pageme").find("tbody").children().hide();
    $(".pageme").find(".page" + vPage).show();
  }
}