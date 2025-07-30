window.onload = onLoad;

const library = [];


function Book(title, author, pages, read) {
    if(!new.target) throw Error("Did not call book constructor with 'new' keyword");

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
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

    console.log(library);
}