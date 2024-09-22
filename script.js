// Function to renew a book and change its status
function renewBook(bookId) {
    let bookItem = document.getElementById(bookId);
    let statusElement = bookItem.querySelector('.status');

    // Change the text to 'Renewed'
    statusElement.textContent = "Renewed";
    statusElement.classList.remove('expiring', 'available');
    statusElement.classList.add('renewed');

    // Disable the Renew button after renewing
    let renewButton = bookItem.querySelector('.renew');
    renewButton.textContent = "Renewed";
    renewButton.disabled = true;
    renewButton.classList.add('disabled');

    // Optional: Display an alert
    alert("The book has been successfully renewed!");
}

// Function to return a book and remove it from the list
function returnBook(bookId) {
    let bookItem = document.getElementById(bookId);
    bookItem.style.display = 'none';  // Hide the book item (or remove it from DOM)
    alert("The book has been returned!");
}

// Function to check due dates and enable/disable renew buttons
function checkDueDates() {
    const today = new Date();
    const books = document.querySelectorAll('.book-item');
    
    books.forEach(book => {
        const dueDateStr = book.getAttribute('data-due-date');
        const dueDate = new Date(dueDateStr);
        const renewButton = book.querySelector('.renew');
        
        // Calculate the difference in days between today and the due date
        const diffTime = dueDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Enable renew button if the book is expiring within 3 days
        if (diffDays <= 3) {
            renewButton.disabled = false;
            renewButton.classList.add('active');
        } else {
            renewButton.disabled = true;
            renewButton.classList.remove('active');
        }
    });
}

// Function to search for books
function searchBooks() {
    let input = document.getElementById("search-input").value.toLowerCase();
    let bookItems = document.getElementsByClassName("book-item");

    // Loop through all book items and hide those that don't match the search query
    for (let i = 0; i < bookItems.length; i++) {
        let title = bookItems[i].getElementsByClassName("book-title")[0].textContent.toLowerCase();
        if (title.includes(input)) {
            bookItems[i].style.display = "";
        } else {
            bookItems[i].style.display = "none";
        }
    }
}

// Call checkDueDates when the page loads
window.onload = function() {
    checkDueDates();
};
