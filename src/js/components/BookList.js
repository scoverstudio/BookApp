import {
    templates
} from '../settings.js';
import {
    utils
} from '../utils.js';
import {
    dataSource
} from '../data.js';


class BookList {
    constructor() {
        const thisBook = this;

        thisBook.determineRatingBgc();
        thisBook.getElements();
        thisBook.initData();
        thisBook.filterBooks();
        thisBook.initActions();

    }

    initData() {
        const thisBook = this;
        this.data = dataSource.books;

        for (let bookId in this.data) {
            const ratingBgc = thisBook.determineRatingBgc(dataSource.books[bookId].rating);
            const ratingWidth = dataSource.books[bookId].rating * 10;

            dataSource.books[bookId].params = {
                ratingWidth: ratingWidth,
                ratingBgc: ratingBgc,
                rating: dataSource.books[bookId].rating
            };

            const generatedHTML = templates.bookList(dataSource.books[bookId]);
            const generatedDOM = utils.createDOMFromHTML(generatedHTML);

            thisBook.bookList.appendChild(generatedDOM);
        }
    }

    getElements() {
        const thisBook = this;

        thisBook.bookList = document.querySelector('.books-list');
        thisBook.filtersArr = [];
        thisBook.filters = document.querySelector('.filters');

    }

    initActions() {
        const thisBook = this;
        const books = document.querySelectorAll('.book__image');

        const favoriteBooks = [];
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

            thisBook.filters.addEventListener('click', function (event) {
                const clickedBook = event.target;
                if (clickedBook.getAttribute('type') === 'checkbox' && clickedBook.getAttribute('name') === 'filter' && clickedBook.tagName === 'INPUT') {
                    if (clickedBook.checked === true) {
                        thisBook.filtersArr.push(clickedBook.value);
                    } else {
                        const indexOfFilters = thisBook.filtersArr.indexOf(clickedBook.value);
                        thisBook.filtersArr.splice(indexOfFilters, 1);
                    }
                }
                thisBook.filterBooks();
            });
        }
    }
    filterBooks() {
        const thisBook = this;

        for (const book of dataSource.books) {
            const bookId = book.id;
            let shouldBeHidden = false;
            for (const filter of thisBook.filtersArr) {
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
    }
    determineRatingBgc(rating) {
        const thisBook = this;
        if (rating < 6) {
            thisBook.background = "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)";
        } else if (rating > 6 && rating <= 8) {
            thisBook.background = "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)";
        } else if (rating > 8 && rating <= 9) {
            thisBook.background = "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)";
        } else if (rating > 9) {
            thisBook.background = "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)";
        }
        return thisBook.background;
    }
}

export default BookList;