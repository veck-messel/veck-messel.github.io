const indexSections = new Map([
    ['.section2', 'about.html'],
    ['.section3', 'principles.html'],
    ['.section4', 'technology.html'],
    ['.section5', 'cases.html'],
    ['.section6', 'conversation_form.html'],
]);

$(document).ready(() => {
    indexSections.forEach((value, key) => {
        $(key).load('src/html/index_sections/' + value);
    })
})
