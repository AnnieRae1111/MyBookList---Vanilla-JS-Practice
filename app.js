//Book Class: Represents a book
//instiated a book object each time we create a bookk
//adding static key word allows you to direclty call a method with out having to instiantiate the class of that method first

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI Class: Handle UI tasks
class UI {
  static displayBooks() {
    //static keyword
    //makes method static // don't have to instantiate
    const books = Store.getBooks();

    //loop through all books in the array and call method add book to list
    books.forEach((book) => {
      console.log(book.title, 'title');
      UI.addBookToList(book);
    });
    //calling method on each book in array
  }

  static addBookToList(book) {
    //creating a row to add to the table
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class="btn btn-danger btn-sm delete">X</td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      //we want the parent = whole row which is 'tr'
      el.parentElement.parentElement.remove();
      //removing the parent element of the parent element which is the 'tr' tag or whole row
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    //appending text to the div
    const container = document.querySelector('.container');
    //parent element = container
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    setTimeout(() => {
      document.querySelector('.alert').remove();
      //remove anything that has the class of alert
    }, 3000);
    //insert div before form that we selected above
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

//Store Class: Handles Storage / local storage in browser
//to deal with storage of our data/ books
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      //if there is no item of books in local storage
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
      //will be stored as a string so need to do json.parse
    }
    return books;
    //return whatever is in books
  }

  static addBook(book) {
    const books = Store.getBooks();
    //getting the books in local storage
    books.push(book);
    //adding on new book
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
        //splicing at that books index, and remove 1 book
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  //get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  //validate/make sure all fields are filled in
  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    //instantiate bok
    const book = new Book(title, author, isbn);
    console.log(book);

    //add book to list
    UI.addBookToList(book);
    //passing book we created in event through UI method

    //add Book to Storage
    Store.addBook(book);

    //show success alert
    UI.showAlert('Book added', 'success');

    //clear fileds
    UI.clearFields();
  }
});

//Event: Remove Book
//use event propigation to target single book
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);

  //show remove success message
  UI.showAlert('Book removed', 'success');
});
