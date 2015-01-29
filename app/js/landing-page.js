/**
 * Created by brandonantonelli on 11/16/14.
 */


var tapToTouch = function () {
    $('.flipper').on('tap', function(e) {
        $(this).toggleClass("hover");
    });
}



// Code for Changing slides
//    landingRow2.removeClass("down-low");
//    landingRow1.addClass("down-low");
//    landingRow2.removeClass("below");
//    landingRow2.addClass("on-top");
//    landingRow1.removeClass("on-top");
//    landingRow1.addClass("below");
//
//
//$('.frontpage-arrow a.icon-arrow-right').on("click", function() {
//
//    var landingRow1 = $("#slide-1");
//    var landingRow2 = $("#slide-2");
//
//    if (landingRow1.hasClass("on-top")) {
//        landingRow2.animate({ left: "0"}, 0, "linear", function() {
//            landingRow1.animate({left: "100%"}, 700, "easeInOutQuad", function () {
//                landingRow2.removeClass("below").addClass("on-top");
//                landingRow1.removeClass("on-top").addClass("below");
//            });
//        });
//    } else {
//        landingRow1.animate({ left: "0"}, 0, "linear", function() {
//            landingRow2.animate({left: "100%"}, 700, "easeInOutQuad", function () {
//                landingRow1.removeClass("below").addClass("on-top");
//                landingRow2.removeClass("on-top").addClass("below");
//            });
//        });
//    }
//});
//
//$('.frontpage-arrow a.icon-arrow-left').on("click", function() {
//
//    var landingRow1 = $("#slide-1");
//    var landingRow2 = $("#slide-2");
//
//    if (landingRow1.hasClass("on-top")) {
//        landingRow2.animate({ left: "0"}, 0, "linear", function() {
//            landingRow1.animate({left: "-100%"}, 700, "easeInOutQuad", function () {
//                landingRow2.removeClass("below").addClass("on-top");
//                landingRow1.removeClass("on-top").addClass("below");
//            });
//        });
//    } else {
//        landingRow1.animate({ left: "0"}, 0, "linear", function() {
//            landingRow2.animate({left: "-100%"}, 700, "easeInOutQuad", function () {
//                landingRow1.removeClass("below").addClass("on-top");
//                landingRow2.removeClass("on-top").addClass("below");
//            });
//        });
//    }
//});

//
//
//$('.step-container').live('touchstart', function(e){
//    $(this).addClass('hover');
//    //alert('alert');
//});
//
//$('.step-container').live('touchend', function(e){
//    $(this).removeClass('hover');
//    //alert('alert');
//});