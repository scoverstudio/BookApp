export const select = {
    templateOf: {
        bookList: '#template-book',
    },
};

export const templates = {
    bookList: Handlebars.compile(document.querySelector(select.templateOf.bookList).innerHTML),

};