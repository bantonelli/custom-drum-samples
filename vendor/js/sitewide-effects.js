/**
 * Created by brandonantonelli on 12/10/14.
 */


(function () {


    var tb = $('.cds-navbar');
    var apptb = $('.appnav');
    var tbs = "top-bar-scrolled";

    $('.slide').scroll(function() {
      if($(this).scrollTop()) {
        tb.addClass(tbs);
        apptb.addClass(tbs);
      } else {
        tb.removeClass(tbs);
        apptb.removeClass(tbs);
      }
    });

    $("#e2").select2({
        formatNoMatches: function (term) {
            return "Whoops!! <br> Instrument Not Found!";
        }
    });

//    if (jQuery.browser.mobile == true) {
//        // Defined in landing-page.js
//        tapToTouch();
//
//        // For mobile Sidebar
//        $('.st-content').removeClass('z-index-fix');
//    }


})();
