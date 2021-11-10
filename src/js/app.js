import BookList from "./components/BookList.js";


const app = {
    initBooks: function () {
        const thisApp = this;

        thisApp.page = new BookList();
    },
    init: function () {
        const thisApp = this;

        thisApp.initBooks();
    },

};
app.init();