// book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//ui constructor
function UI(){

}
//add book to UI
UI.prototype.addBookToList = function(book){
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

// show alert
UI.prototype.showAlert = function(message, className){

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

// delete book
UI.prototype.deleteBook= function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

//clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
    
}

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

    ui.deleteBook(e.target);

    //show alert
    ui.showAlert('Book removed successfully', 'success');

    e.preventDefault();
})