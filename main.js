window.onload = onLoad;

const library = [];
const libraryContainer = document.querySelector(".library");

function Book(title, author, pages, read) {
    if(!new.target) throw Error("Did not call book constructor with 'new' keyword");

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}
//============================================



// PAGE FUNCTIONS
function displayAllBooks() {
    libraryContainer.innerHTML = '';

    for (book of library) displayBook(book);
}
function displayBook(book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book')
    bookCard.id = book.id;


    // add information and buttons
    bookCard.appendChild(createInfoContainerElement('title', 'Title:', book.title));
    bookCard.appendChild(createInfoContainerElement('author', 'Author:', book.author));
    bookCard.appendChild(createInfoContainerElement('pages', 'Number of pages:', book.pages));
    
    const completed = book.read ? 'Yes' : 'No';
    bookCard.appendChild(createInfoContainerElement('read', 'Completed:', completed));

    bookCard.appendChild(createButtonContainerElement());

    // put into html
    libraryContainer.appendChild(bookCard);
}
function createInfoContainerElement(elementClass, header, text) {
    const container = document.createElement('div');
    const headerEl = document.createElement('h4');
    const textEl = document.createElement('p');

    headerEl.textContent = header;
    textEl.textContent = text;

    container.classList.add(elementClass);
    container.appendChild(headerEl);
    container.appendChild(textEl);

    return container;
}
function createButtonContainerElement() {
    const container = document.createElement('div');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    container.classList.add('buttons');
    editButton.classList.add('edit');
    deleteButton.classList.add('delete');

    editButton.textContent = 'Edit';
    deleteButton.textContent = 'Delete';

    container.appendChild(editButton);
    container.appendChild(deleteButton);

    return container;
}


function onLoad() {
    document.querySelector('#year').innerHTML = yearRange();
}

function yearRange() {
    const initYear = 2025;
    const curYear = new Date().getFullYear();
    if(curYear==initYear) return curYear;
    return `${initYear}-${curYear}`;
}

function test() {
    book = new Book("hobbit","tolkien",666,false);
    book2 = new Book("dune","aragorn",420,true);

    library.push(book, book2);
    library.push(book, book2);
    library.push(book, book2);

    displayAllBooks();

    console.log(library);
}