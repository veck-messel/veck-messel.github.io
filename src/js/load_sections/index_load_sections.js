const indexSections = new Map([
  [".hidden_menu", "hidden_menu.html"],
  [".header", "header.html"],
  [".section1", "preview.html"],
  [".section2", "about.html"],
  [".section3", "principles.html"],
  [".section4", "technology.html"],
  [".section5", "cases.html"],
  [".section6", "partners.html"],
  [".section7", "conversation_form.html"],
  [".footer", "footer.html"],
]);

$(document).on("DOMContentLoaded", () => {
  indexSections.forEach((value, key) => {
    $(key).load("src/html/index_sections/" + value);
  });
});
