$(() => {
  switchTheme(currentTheme);

  $("#header_mode_toggle, #hidden_menu_header_toggle_switch").on(
    "click",
    () => {
      let newTheme = getOppositeTheme(currentTheme);
      switchTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    },
  );
});

const Theme = {
  LIGHT: "light",
  DARK: "dark",
};

let currentTheme = getCurrentTheme();

function getCurrentTheme() {
  let localStorageTheme = localStorage.getItem("theme");

  if (localStorageTheme) {
    return localStorageTheme;
  }

  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    return Theme.LIGHT;
  } else {
    return Theme.DARK;
  }
}

function getOppositeTheme(theme) {
  return theme == Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
}

function switchTheme(newTheme) {
  let previousTheme = getOppositeTheme(newTheme);

  //theme attr
  localStorage.setItem("theme", newTheme);
  // $('html').attr({'theme': version})

  //text-color
  $(":root").css("color", `var(--${newTheme}-theme-text-color)`);

  //header
  updateHeaderStyles(previousTheme, newTheme);

  //hidden_menu
  $(".hidden_menu").css(
    "background",
    `var(--${newTheme}-theme-principle-form-background-color)`,
  );

  //section
  updateSectionStyles(newTheme);

  //circle
  updateCircleStyles(previousTheme, newTheme);

  //form
  updateFormStyles(newTheme);

  //input_form
  $(".form_input > input").css({
    background: `var(--${newTheme}-theme-section-background-color)`,
    color: `var(--${newTheme}-theme-text-color)`,
    "border-color": `var(--${newTheme}-theme-input-border-color)`,
  });

  //tags
  $(".content7-cases-case-tags-tag").css(
    "background",
    `var(--${newTheme}-theme-tags-color)`,
  );

  //logo and img
  updateLogoAndImgStyles(previousTheme, newTheme);

  //mode_toggle
  updateToggleStyles(previousTheme, newTheme);

  currentTheme = newTheme;
}

const updateHeaderStyles = (previousTheme, newTheme) => {
  $(".header").css(
    "background",
    `var(--${newTheme}-theme-header-background-color)`,
  );
  $("#header_third_link").addClass(`header_third_link_${newTheme}_background`);
  $("#header_third_link").addClass(`header_third_link_${newTheme}_text_color`);
  $("#header_third_link").removeClass(
    `header_third_link_${previousTheme}_background`,
  );
  $("#header_third_link").removeClass(
    `header_third_link_${previousTheme}_text_color`,
  );
};

const updateSectionStyles = (newTheme) => {
  $(".section").css(
    "background",
    `var(--${newTheme}-theme-section-background-color)`,
  );
  $("html").css(
    "background",
    `var(--${newTheme}-theme-section-background-color)`,
  );
  $(".footer").css(
    "background",
    `var(--${newTheme}-theme-section-background-color)`,
  );
};

const updateCircleStyles = (previousTheme, newTheme) => {
  $(".content2_right ul > li > div").css(
    "background",
    `var(--${newTheme}-theme-circles-color)`,
  );
  $(".content7-second-block-item-figure").addClass(
    `content7-second-block-item-figure-${newTheme}-color`,
  );
  $(".content7-second-block-item-figure").removeClass(
    "content7-second-block-item-figure-default-color",
  );
  $(".content7-second-block-item-figure").removeClass(
    `content7-second-block-item-figure-${previousTheme}-color`,
  );
};

const updateFormStyles = (newTheme) => {
  $(".content7-first-block").css(
    "background",
    `var(--${newTheme}-theme-form-color)`,
  );
  $(".content3_right_wrap").css(
    "background",
    `var(--${newTheme}-theme-form-color)`,
  );
  $(".content4_bottom_carousel_item").css(
    "background",
    `var(--${newTheme}-theme-form-color)`,
  );
  $(".content7-cases-case").css(
    "background",
    `var(--${newTheme}-theme-form-color)`,
  );
};

const updateLogoAndImgStyles = (previousTheme, newTheme) => {
  // Управление логотипами партнеров
  $(`#avsn_${previousTheme}_logo`).css("display", "none");
  $(`#avsn_${newTheme}_logo`).css("display", "block");
  $(`#komatsu_${previousTheme}_logo`).css("display", "none");
  $(`#komatsu_${newTheme}_logo`).css("display", "block");
  $(`#header_button_${previousTheme}`).css("display", "none");
  $(`#header_button_${newTheme}`).css("display", "block");
  $(`#hidden_menu_header_button_${newTheme}`).css("display", "block");
  $(`#hidden_menu_header_button_${previousTheme}`).css("display", "none");
};

const updateToggleStyles = (previousTheme, newTheme) => {
  $(`#header_mode_toggle #header_toggle_${newTheme}`).css("display", "block");
  $(`#header_mode_toggle #header_toggle_${previousTheme}`).css(
    "display",
    "none",
  );
  $(`#header_mode_toggle`).addClass(
    `header_mode_toggle_background_${newTheme}`,
  );
  $(`#header_mode_toggle`).removeClass(
    `header_mode_toggle_background_${previousTheme}`,
  );
  $(`#hidden_menu_header_toggle_switch`).addClass(
    `hidden_menu_header_toggle_switch_color_${newTheme}`,
  );
  $(`#hidden_menu_header_toggle_switch`).removeClass(
    `hidden_menu_header_toggle_switch_color_${previousTheme}`,
  );
  $(`#hidden_menu_header_toggle_switch`).removeClass(
    `hidden_menu_header_toggle_switch_color_default`,
  );
  $(`#hidden_toggle_${newTheme}`).css("display", "block");
  $(`#hidden_toggle_${previousTheme}`).css("display", "none");
};
