let loginbtn = document.getElementById("loginbtn");
let username = document.getElementById("username");
let password = document.getElementById("password");
let loginMessage = document.getElementById("loginMessage");
let totalbooks = document.getElementById("totalbooks");
let availablebooks = document.getElementById("availablebooks");
let issuedbooks = document.getElementById("issuedbooks");
let saveButtons = document.querySelectorAll(".save-btn");
let issueButtons = document.querySelectorAll(".issue-btn");
let savedbooksContainer = document.getElementById("savedbooks");
let issueTitle = document.getElementById("issueTitle");
let issueAuthor = document.getElementById("issueAuthor");
let issueCategory = document.getElementById("issueCategory");
let studentName = document.getElementById("studentName");
let studentId = document.getElementById("studentId");
let mobile = document.getElementById("mobile");
let issueDate = document.getElementById("issueDate");
let dueDate = document.getElementById("dueDate");
let issueConfirm = document.getElementById("issueConfirm");
let issueMessage = document.getElementById("issueMessage");
let issuedBooksContainer =document.getElementById("issuedBooksContainer");
let searchInput =document.getElementById("searchInput");
let searchBtn =document.getElementById("searchBtn");
let searchResult =document.getElementById("searchResult");
let addBookBtn =document.getElementById("addBookBtn");
if (loginbtn) {
    loginbtn.addEventListener("click", function () {
        if (username.value == "" || password.value == "") {
            loginMessage.innerText = "Please enter Username and Password";
        }
        else if (username.value != "lakshmi") {
            loginMessage.innerText = "invalid Username";
        }
        else if (password.value != "0404") {
            loginMessage.innerText = "invalid Password";
        }
        else {
            loginMessage.innerText = "login Successfull";
            window.location.href = "dash.html";
        }
    });
}
saveButtons.forEach(function (button) {
    let title = button.dataset.title;
    let savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
    let alreadySaved = savedBooks.some(function (book) {
            return book.title === title;
        });
    if (alreadySaved) {
        button.innerText = "✅ Saved";
    }
    else {
        button.innerText = "🔖 Save";
    }
    button.addEventListener("click", function () {
        let savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
        let book = {
            title: button.dataset.title,
            author: button.dataset.author,
            category: button.dataset.category,
            image: button.dataset.image
        };
        let alreadySaved = savedBooks.some(function (item) {
                return item.title === book.title;
            });
        if (!alreadySaved) {
            savedBooks.push(book);
            localStorage.setItem("savedBooks",JSON.stringify(savedBooks));
        }
        button.innerText = "✅ Saved";
    });
});
if (savedbooksContainer) {
    let savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
    let uniqueBooks = [];
    savedBooks.forEach(function (book) {
        if (!uniqueBooks.some(function (item) {
            return item.title === book.title;
        })) {
            uniqueBooks.push(book);
        }
    });
    localStorage.setItem("savedBooks",JSON.stringify(uniqueBooks));
    savedbooksContainer.innerHTML = "";
    uniqueBooks.forEach(function (book) {
        savedbooksContainer.innerHTML += `
            <div class="book-card">
                <img src="${book.image}">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.category}</p>
                <button
                    class="remove-saved"
                    data-title="${book.title}">
                    ❌ Remove
                </button>
            </div>`;
    });
    let removeButtons = savedbooksContainer.querySelectorAll(".remove-saved");
    removeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            let title = button.dataset.title;
            let savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
            savedBooks = savedBooks.filter(function (book) {
                return book.title !== title;
            });
            localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
            button.parentElement.remove();
        });
    });
}
issueButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        let book = {
            title: button.dataset.title,
            author: button.dataset.author,
            category: button.dataset.category,
            image: button.dataset.image
        };
        localStorage.setItem("issueBook",JSON.stringify(book));
        window.location.href = "issue.html";
    });
});
if (issueTitle && issueAuthor && issueCategory) {
    let issueBook = JSON.parse(localStorage.getItem("issueBook"));
    if (issueBook) {
        issueTitle.innerText = issueBook.title;
        issueAuthor.innerText = issueBook.author;
        issueCategory.innerText = issueBook.category;
    }
}
if (issueConfirm) {
    issueConfirm.addEventListener("click", function () {

        if (studentName.value === "" ||studentId.value === "" ||mobile.value === "" ||issueDate.value === "" ||dueDate.value === "") {
            issueMessage.innerText =
                "Please fill all details";
            return;
        }
        let issueBook = JSON.parse(localStorage.getItem("issueBook"));
        if (!issueBook) {
            issueMessage.innerText = "No book selected";
            return;
        }
        let issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];
        let issuedBook = {
            title: issueBook.title,
            author: issueBook.author,
            category: issueBook.category,
            image: issueBook.image,
            studentName: studentName.value,
            studentId: studentId.value,
            mobile: mobile.value,
            issueDate: issueDate.value,
            dueDate: dueDate.value,
            status: "Issued"
        };
        issuedBooks.push(issuedBook);
        localStorage.setItem("issuedBooks",JSON.stringify(issuedBooks));
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.forEach(function (book) {
            if (book.title === issueBook.title) {
                book.status = "Issued";
            }
        });
        localStorage.setItem("books",JSON.stringify(books));
        localStorage.removeItem("issueBook");
        issueMessage.innerText ="✅ Book Issued Successfully!";
        setTimeout(function () {
            window.location.href = "issued.html";
        }, 700);
    });
}
if (issuedBooksContainer) {
    let issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];
    if (issuedBooks.length === 0) {
        issuedBooksContainer.innerHTML = `<div class="empty-issued"><div class="empty-icon">📚</div><h2>No Issued Books</h2><p>There are currently no books issued.</p></div>`;
    }
    else {
        issuedBooksContainer.innerHTML = 
            `<div class="issued-card">
                <table class="issued-table">
                    <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Author</th>
                            <th>Student Name</th>
                            <th>Student ID</th>
                            <th>Mobile</th>
                            <th>Issue Date</th>
                            <th>Due Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${issuedBooks.map(function (book) {
                            return `
                                <tr>
                                    <td>${book.title}</td>                               
                                    <td>${book.author}</td>
                                    <td>${book.studentName}</td>
                                    <td>${book.studentId}</td>
                                    <td>${book.mobile}</td>
                                    <td>${book.issueDate}</td>
                                    <td>${book.dueDate}</td>
                                    <td><span class="status issued">🔴 ISSUED</span></td>
                                </tr>`;
                        }).join("")}
                    </tbody>
                </table>
            </div>`;
    }
}
let returnBooksContainer = document.getElementById("returnBooksContainer");
if (returnBooksContainer) {
    let issuedBooks =JSON.parse(localStorage.getItem("issuedBooks")) || [];
    let returnedBooks =JSON.parse(localStorage.getItem("returnedBooks")) || [];
    let allBooks = [...issuedBooks,...returnedBooks ];
    if (allBooks.length === 0) {
        returnBooksContainer.innerHTML = `<div class="empty-issued"><div class="empty-icon">📚</div><h2>No Books</h2><p>There are no books available for return.</p></div>`;
    }
    else {
        returnBooksContainer.innerHTML = `
            <div class="return-container">
                ${allBooks.map(function (book) {
                    let originalIndex =issuedBooks.findIndex(function (item) {
                            return (item.title === book.title &&item.studentId === book.studentId &&item.issueDate === book.issueDate );
                        });
                    return `
                        <div class="return-card">
                            <img src="${book.image}" alt="${book.title}">
                            <h3>${book.title}</h3>
                            <p><strong>Author:</strong>${book.author}</p>
                            <p><strong>Student:</strong>${book.studentName}</p>
                            <p><strong>Student ID:</strong>${book.studentId}</p>
                            <p><strong> Issue Date:</strong>${book.issueDate}</p>
                            <p><strong>Due Date:</strong>${book.dueDate}</p>
                            ${
                                book.status === "Returned"
                                ?
                                `<button class="return-btn returned-btn" disabled>✅ Returned </button>`
                                :
                                `<button class="return-btn" data-index="${originalIndex}">🔄 Return</button>`
                            }
                        </div>`;
                }).join("")}
            </div>`;
        let returnButtons = document.querySelectorAll(".return-btn:not(.returned-btn)");
        returnButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                let index = Number(button.dataset.index);
                let issuedBooks =JSON.parse(localStorage.getItem("issuedBooks")) || [];
                let returnedBooks = JSON.parse(localStorage.getItem("returnedBooks")) || [];
                let book = issuedBooks[index];
                if (!book) {
                    return;
                }
                book.status = "Returned";
                returnedBooks.push(book);
                localStorage.setItem("returnedBooks",JSON.stringify(returnedBooks)
                );
                issuedBooks.splice(index, 1);
                localStorage.setItem("issuedBooks",JSON.stringify(issuedBooks));
                let books = JSON.parse(localStorage.getItem("books")) || [];
                books.forEach(function (mainBook) {
                    if (mainBook.title == book.title) {
                        mainBook.status = "Available";
                    }
                });
                localStorage.setItem("books", JSON.stringify(books));
                location.reload();
            });
        });
    }
}
if (searchInput && searchBtn && searchResult) {
    function searchBook() {
        let searchText = searchInput.value.trim().toLowerCase();
        if (searchText === "") {
            searchResult.innerHTML = `
                <div class="not-found">
                    <h2>🔍 Search for a book</h2>
                    <p>Enter a book name to search.</p>
                </div>`;
            return;
        }
        let books = JSON.parse(localStorage.getItem("books")) || [];
        let foundBook = books.find(function (book) {
                return (book.title && book.title.toLowerCase().trim() === searchText);
            });
        if (!foundBook) {
            searchResult.innerHTML = `
                <div class="not-found">
                    <h2>📕 Book Not Available </h2>
                    <p>This book is not available in our library.</p>
                </div>`;
            return;
        }
        searchResult.innerHTML = `
            <div class="search-result-card">
                <img src="${foundBook.image}" alt="${foundBook.title}">
                <div class="search-result-info">
                    <h2>📖 ${foundBook.title}</h2>
                    <p><strong>Author:</strong>${foundBook.author}</p>
                    <p><strong>Category:</strong>${foundBook.category}</p>
                    <span class="search-status available">🟢 Available</span>
                </div>
            </div>`;
    }
    searchBtn.addEventListener("click",searchBook);
    searchInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                searchBook();
            }
        }
    );
}
function displayRecentBooks() {
    let recentBooks = document.getElementById("recentBooks");
    if (!recentBooks) {
        return;
    }
    let books =JSON.parse(localStorage.getItem("books")) || [];
    if (books.length === 0) {
        recentBooks.innerHTML = '<p class="empty">No books added yet.</p>';
        return;
    }
    recentBooks.innerHTML = "";
    books.slice(-2).reverse().forEach(function (book) {
        let row = document.createElement("div");
        row.className = "recent-book-row";
        row.innerHTML = `
            <span> ${book.title}</span>
            <span> ${book.author}</span>
            <span> ${book.status || "Available"}</span>`;
            recentBooks.appendChild(row);
    });
}
displayRecentBooks();
let dashboardBooks =JSON.parse(localStorage.getItem("books")) || [];
let totalElement =document.getElementById("totalbooks");
let issuedElement = document.getElementById("issuedbooks");
if (totalElement) {
    totalElement.innerText =dashboardBooks.length;
}
if (issuedElement) {
    let issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];
    issuedElement.innerText = issuedBooks.length;
}
let bookContainer = document.querySelector(".book-container");
if (bookContainer && !savedbooksContainer) {
    let books =JSON.parse(localStorage.getItem("books")) || [];
    let existingTitles = [];
    document.querySelectorAll(".book-card .save-btn").forEach(function (button) {
        existingTitles.push(
            button.dataset.title.trim()
        );
    });
    books.forEach(function (book) {
        if (!existingTitles.includes(book.title)) {
            let card =document.createElement("div");
            card.className = "book-card";
            card.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <h3>📖 ${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.category}</p>
                <p>${book.description || ""}</p>
                <div class="book-buttons">
                    <button
                        class="save-btn"
                        data-title="${book.title}"
                        data-author="${book.author}"
                        data-category="${book.category}"
                        data-image="${book.image}">
                        🔖 Save
                    </button>
                    <button
                        class="issue-btn"
                        data-title="${book.title}"
                        data-author="${book.author}"
                        data-category="${book.category}"
                        data-image="${book.image}">
                        📕 Issue Book
                    </button>
                </div>`;
            bookContainer.appendChild(card);
            let saveButton =card.querySelector(".save-btn");
            saveButton.addEventListener("click",function () {
                    let savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
                    let alreadySaved = savedBooks.some(function (item) {
                            return item.title === book.title;
                        });
                    if (!alreadySaved) {
                        savedBooks.push(book);
                        localStorage.setItem("savedBooks",JSON.stringify(savedBooks));
                    }
                    saveButton.innerText ="✅ Saved";
                }
            );
            let issueButton = card.querySelector(".issue-btn");
            issueButton.addEventListener("click",function () {
                    localStorage.setItem("issueBook",JSON.stringify(book));
                    window.location.href = "issue.html";
                }
            );
        }
    });
}
document.getElementById("addBookBtn").addEventListener("click", function () {
    let imageFile = document.getElementById("bookImage").files[0];
    let bookName = document.getElementById("bookName").value.trim();
    let bookAuthor = document.getElementById("bookAuthor").value.trim();
    let bookCategory = document.getElementById("bookCategory").value.trim();
    let bookDescription = document.getElementById("bookDescription").value.trim();
    if (!imageFile || !bookName || !bookAuthor || !bookCategory || !bookDescription) {
        alert("Please fill all book details.");
        return;
    }
    let reader = new FileReader();
    reader.onload = function (event) {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        let newBook = {
            title: bookName,
            author: bookAuthor,
            category: bookCategory,
            description: bookDescription,
            image: event.target.result,
            status: "Available"
        };
books.push(newBook);
localStorage.setItem("books", JSON.stringify(books));
let customBooks = JSON.parse(localStorage.getItem("customBooks")) || [];
customBooks.push(newBook);
localStorage.setItem("customBooks", JSON.stringify(customBooks));
        window.location.href = "book.html";
    };
    reader.readAsDataURL(imageFile);
});