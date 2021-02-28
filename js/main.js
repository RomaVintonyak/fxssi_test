jQuery(document).ready(function () {
  "use script";
  //transform scroll script
  var moneyTop = $(".money__wraper").offset().top;
  var moneyHeight = $(".money__wraper").height();
  $(document).on("scroll", function () {
    if ($(this).scrollTop() >= moneyTop - moneyHeight) {
      $(".money__wraper").addClass("money__wraper--active");
    } else {
      $(".money__wraper").removeClass("money__wraper--active");
    }
  });
});
