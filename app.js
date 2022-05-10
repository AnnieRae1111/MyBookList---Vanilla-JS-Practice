//Book Class: Represents a book
//instiated a book object each time we create a bookk
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
    const StoredBooks = [
      {
        title: 'Book One',
        author: 'John Doe',
        isbn: '3434434',
      },
      {
        title: 'Book Two',
        author: 'Jane Doe',
        isbn: '45545',
      },
    ];

    const books = StoredBooks;
    console.log(StoredBooks);

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

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

//Store Class: Handles Storage / local storage in browser

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
    alert('please fill in all fields');
  } else {
    //instantiate bok
    const book = new Book(title, author, isbn);
    console.log(book);

    //add book to list
    UI.addBookToList(book);
    //passing book we created in event through UI method

    UI.clearFields();
  }
});

//Event: Remove Book
//use event propigation to target single book
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
});
