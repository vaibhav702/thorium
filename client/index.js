// console.log("loaded");
let addBtn = document.getElementById('addBtn');

// Adding an event listener to my "Add Book" button. 

addBtn.addEventListener("click", function (event) {
    // console.log("You submitted the form");
    // Getting the values entered by the user 
    let bookName = document.getElementById("bookName").value;
    let author = document.getElementById("Author").value;
    let fiction = document.getElementById("Fiction");
    let programming = document.getElementById("Computer Programming");
    let cooking = document.getElementById("Cooking");
    let Login = document.getElementById("Login");
    let signIn = document.getElementById("sign in");
    let signup = document.getElementById("signup");



    if (fiction.checked) {
        checkedValue = fiction.value;
    }

    else if (programming.checked) {
        checkedValue = programming.value;
    }

    else if (cooking.checked) {
        checkedValue = cooking.value;
    }


    // Validating the form 

    if (bookName.length <= 3 || author.length <= 3) {
        let message = document.getElementById('msg');
        message.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Invalid Values</strong> 
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
      </div>`

        setTimeout(() => {
            message.innerHTML = ''
        }, 4000);
    }

    else {

        // console.log(bookName, author, checkedValue);

        // Displaying Values

        let tableBody = document.getElementById("tableBody");

        tableBody.innerHTML += `
    <tr>              
        <td>${bookName}</td>
        <td>${author}</td>
        <td>${checkedValue}</td>
    </tr>
    `





        // Clearing the values
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();

        // Adding a success message 
        let message = document.getElementById('msg');
        message.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Addded a book successfully</strong> 
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
      </div>
        `

        setTimeout(() => {
            message.innerHTML = ''
        }, 4000);




        event.preventDefault();
    }
})

// Adding a search functionality 
// Used Jquery, rest of the site is made using pure JavaScript

let inputS = document.getElementById("searchVal");
$(inputS).keyup(function () {
    // console.log(inputS.value);


    if (inputS.value == "") {
        // console.log("Value is null") 
        $("td").removeClass("background");

    }

    else {
        setTimeout(() => {
            let inputVal = inputS.value;
            $("td:contains('" + inputVal + "')").addClass("background");
        }, 2000);
    }
})