class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}

class UI{
    addBookToList(book){
        const list = document.getElementById('book-list');
        // create tr
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;

        list.appendChild(row);
    }

    showAlert(message, className){
        // create div
        const div = document.createElement('div');
        // add class
        div.className = `alert ${className}`;
        // add text
        div.appendChild(document.createTextNode(message));
        // get parent
        const container = document.querySelector('.container');
        // get form
        const form = document.querySelector('#book-form');
        // insert alert
        container.insertBefore(div, form);

        setTimeout(function(){
        document.querySelector('.alert').remove();
        }, 2000)
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
    }
}

//Local storage class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')=== null){
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            //add book to ui
            ui.addBookToList(book);
        })
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book, index){
           if(book.isbn === isbn){
               books.splice(index, 1);
           }
        });
        localStorage.setItem('books',JSON.stringify(books));

    }
}


//DOM load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

//Event Listeners
document.getElementById('book-form').addEventListener('submit',

function(e){
    //get all values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    //instantiate Book constructor
    const book  = new Book(title, author, isbn);


    //instantiate UI constructor
    const ui = new UI(); 

    //validate
    if (title === ''|| author === '' || isbn ===''){

        ui.showAlert("Please fill in all fields","error" );
    }else{
            //add book to ui
            ui.addBookToList(book);

            // add to local storage
            Store.addBook(book);

            // show success
            ui.showAlert('Book Added successfully!', 'success');

            //clear field
            ui.clearFields();
    }

    
   

    e.preventDefault();
}); 

// Delete Event Listener
document.getElementById('book-list').addEventListener('click',
function(e){
const ui = new UI();

// delete book
ui.deleteBook(e.target);

// remove from LS
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

//show alert
ui.showAlert('Book removed successfully', 'success');

e.preventDefault();
}) 