function hidden_menu_enable() {
  $(".hidden_menu").css("display", "flex");
  $("#root").css("opacity", 0);
  $("header").css("opacity", 0);
}

function hidden_menu_disable() {
  $(".hidden_menu").css("display", "none");
  $("#root").css("opacity", 1);
  $("header").css("opacity", 1);
}

$(document).ready(() => {
  $("#header_button_light, #header_button_dark").on(
    "click",
    hidden_menu_enable,
  );
  $(
    "#hidden_menu_header_button_dark, #hidden_menu_header_button_light,  .hidden_menu_links h2",
  ).on("click", hidden_menu_disable);
});
