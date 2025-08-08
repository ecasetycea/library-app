window.onload = onLoad;

const library = [];
const libraryContainer = document.querySelector(".library");
const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modal .modalTitle");
const modalFinishEditBtn = document.querySelector("#finishEditBtn");
const modalCancelEditBtn = document.querySelector("#cancelEditBtn");
const modalBookTitle = document.querySelector('#bookTitle');
const modalBookAuthor = document.querySelector('#bookAuthor');
const modalBookPages = document.querySelector('#bookPages');
const modalBookRead = document.querySelector('#bookRead');
let modalCurrentBookId = '';


function Book(title, author, pages, read) {
    if(!new.target) throw Error("Did not call book constructor with 'new' keyword");

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}
//============================================


// LIBRARY
function displayAllBooks() {
    for (book of library) displayBook(book);
}
function displayBook(book) { //Add book card to library
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
function createInfoContainerElement(elementClass, header, text) { // Info for card
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
function createButtonContainerElement() { //Buttons for card
    const container = document.createElement('div');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    container.classList.add('buttons');

    editButton.classList.add('edit');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', editBook)
    
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteBook);

    container.appendChild(editButton);
    container.appendChild(deleteButton);

    return container;
}
function findBook(bookID) { //Returns reference to a book with ID
    for (let i=0; i<library.length; i++) {
        if(library[i].id===bookID) return library[i];
    }
    return false;
}
function showAddModal() {
    modalCurrentBookId = '';
    modalTitle.textContent = `Add Book`;
    modalFinishEditBtn.textContent = 'Add Book';

    modalBookTitle.value = '';
    modalBookAuthor.value = '';
    modalBookPages.value = '';
    modalBookRead.checked = false;

    modal.showModal();
}
function showEditModal(bookID) {
    const book = findBook(bookID);
    
    if(!book) throw Error(`Cannot find book with id ${bookID} in library array`);
    modalCurrentBookId = bookID;

    modalTitle.textContent = `Edit Book - ${book.title}`;
    modalFinishEditBtn.textContent = 'Finish Editing';

    modalBookTitle.value = book.title;
    modalBookAuthor.value = book.author;
    modalBookPages.value = book.pages;
    modalBookRead.checked = book.read;

    modal.showModal();
}

// EVENT HANDLING
function editBook(e) {
    const book = e.target.parentElement.parentElement;

    showEditModal(book.id);
}
function deleteBook(e) {
    const book = e.target.parentElement.parentElement;
    
    for (let i=0; i<library.length; i++) {
        if(library[i].id===book.id) {
            library.splice(i,1);
            break;
            //i--;
        }
    }

    update();
}
function saveLibrary(e) { //TODO
    console.log("requested save");
}
function clearLibrary(e) {
    library.splice(0);
    update();
}
function addListeners() {
    document.querySelector('#add').addEventListener('click',showAddModal);
    document.querySelector('#save').addEventListener('click',saveLibrary);
    document.querySelector('#clear').addEventListener('click',clearLibrary);
    modalCancelEditBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.close();
    })
    modalFinishEditBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const required = document.querySelector('.requiredWarning');
        
        //reset warning for incomplete input
        required.style = '';
        
        if(!isModalValid(modalBookTitle, modalBookAuthor, modalBookPages)) { //handle no input
            required.style = 'color: red;';
            return;
        }

        //Dynamically handle adding new book vs editing
        //to avoid having two dialogs in html
        if(modalTitle.textContent[0]==='E') {
            const book = findBook(modalCurrentBookId);

            if(!book) throw Error("couldn't find book with id");

            book.title = modalBookTitle.value;
            book.author = modalBookAuthor.value;
            book.pages = Number(modalBookPages.value);
            book.read = modalBookRead.checked;
        }
        else if(modalTitle.textContent[0]==='A') {
            addBook(modalBookTitle.value, modalBookAuthor.value, Number(modalBookPages.value), modalBookRead.checked);
        }
        update();
        modal.close();
    });
    modal
}
function isModalValid(title, author, pages) {
    if(title.value==='' || author.value==='' || pages.value==='')
        return false;

    return true;
}
// GENERAL
function addBook(title, author, pages, read) {
    book = new Book(title, author, pages, read);
    library.push(book);
}
function update() {
    libraryContainer.innerHTML = '';
    displayAllBooks();
}

function onLoad() {
    document.querySelector('#year').innerHTML = yearRange();
    addListeners();


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
    //library.push(book, book2);
    //library.push(book, book2);

    update();

    console.log(library);
}