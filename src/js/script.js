/* eslint-disable no-unused-labels */
/* eslint-disable quotes */
/* eslint-disable for-direction */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */


const bookList = document.querySelector('.books-list');
const filters = document.querySelector('.filters');

const favoriteBooks = [];
const filtersArr = [];

const select = {
    templateOf: {
        bookList: '#template-book',
    },
};

const templates = {
    bookList: Handlebars.compile(document.querySelector(select.templateOf.bookList).innerHTML),

};

const render = function () {
    for (let bookId in dataSource.books) {
        const ratingBgc = determineRatingBgc(dataSource.books[bookId].rating);
        const ratingWidth = dataSource.books[bookId].rating * 10;

        dataSource.books[bookId].params = {
            ratingWidth: ratingWidth,
            ratingBgc: ratingBgc,
            rating: dataSource.books[bookId].rating
        };

        const generatedHTML = templates.bookList(dataSource.books[bookId]);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);

        bookList.appendChild(generatedDOM);
    }
};

const initActions = function () {
    const books = document.querySelectorAll('.book__image');

    for (const book of books) {
        const bookId = book.getAttribute('data-id');

        book.addEventListener('dblclick', function (event) {
            const clickedBook = event.target.offsetParent.classList.contains('book__image');
            if (clickedBook) {
                if (book.classList.contains('favorite')) {
                    book.classList.remove('favorite');
                    const indexOfBook = favoriteBooks.indexOf(bookId);
                    favoriteBooks.splice(indexOfBook, 1);
                } else {
                    book.classList.add('favorite');
                    favoriteBooks.push(bookId);
                }
            }
        });
        book.addEventListener('click', function (event) {
            event.preventDefault();
        });
    }
    // clickanie tekstu działa na dodawanie i odejmowanie w tablicy
    filters.addEventListener('click', function (event) {
        const clickedBook = event.target;
        if (clickedBook.getAttribute('type') === 'checkbox' && clickedBook.getAttribute('name') === 'filter' && clickedBook.tagName === 'INPUT') {}
        if (clickedBook.checked === true) {
            filtersArr.push(clickedBook.value);
        } else {
            const indexOfFilters = filtersArr.indexOf(clickedBook.value);
            filtersArr.splice(indexOfFilters, 1);
        }
        filterBooks();
    });
};
// DO przegadania
const filterBooks = function () {
    for (const book of dataSource.books) {
        const bookId = book.id;
        let shouldBeHidden = false;
        for (const filter of filtersArr) {
            if (!book.details[filter]) {
                shouldBeHidden = true;
                break;
            }
        }
        if (shouldBeHidden) {
            const book = document.querySelector(`.book__image[data-id="${bookId}"]`);
            book.classList.add('hidden');
        } else {
            const book = document.querySelector(`.book__image[data-id="${bookId}"]`);
            book.classList.remove('hidden');

        }
    }
};

const determineRatingBgc = function (rating) {
    if (rating < 6) {
        background = "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)";
    } else if (rating > 6 && rating <= 8) {
        background = "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)";
    } else if (rating > 8 && rating <= 9) {
        background = "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)";
    } else if (rating > 9) {
        background = "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)";
    }
    return background;
};


render();
initActions();

class BookList {
    constructor() {
        const thisBook = this;

    }
}

const app = new BookList();