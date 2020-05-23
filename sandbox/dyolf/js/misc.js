$(document).ready(function() {
  var popupgo = function() {
    var box = "#floyd";

    // Add the mask to body
    $("#mask").show();

    //Fade in the Popup
    setTimeout(function() {
      $(box).fadeIn(150);
    }, 400);

    return false;
  };

  // When clicking on the button close or the mask layer the popup closed
  $("#mask, #floyd").click(function() {
    $("#mask , #floyd").fadeOut(100, function() {
      $("#mask").hide();
    });
  });

  $(".go").click(function() {
    popupgo();
  });

  $(".lightbox").on("click", function(e) {
    e.preventDefault();
    var url =
      window.location.href +
      $(this)
        .find("img")
        .attr("src");
    console.log(url);

    $(".lightbox-modal")
      .find(".modal-dialog .modal-body img")
      .attr("src", url);
    $(".lightbox-modal").modal("show");
    $(".lightbox-modal").addClass("show");
  });
});
