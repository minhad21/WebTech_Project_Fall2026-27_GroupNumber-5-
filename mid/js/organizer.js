
/* Page Navigation */

function showPage(pageId) {

    let pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    let selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

}


/* Default Page */

showPage("welcome");


/* Form Validation Function */

function validateForm(form) {

    let inputs = form.querySelectorAll("input, select, textarea");
    let isValid = true;

    inputs.forEach(function(input) {

        // Remove previous error message
        let oldError = input.nextElementSibling;

        if (oldError && oldError.classList.contains("error-message")) {
            oldError.remove();
        }

        // Check empty fields
        if (input.value.trim() === "") {

            let error = document.createElement("small");

            error.className = "error-message";
            error.textContent = input.dataset.label + " is required.";

            input.insertAdjacentElement("afterend", error);

            isValid = false;
        }

    });

    return isValid;
}


/* Registration Form */

let registrationForm = document.querySelector("#registrationForm");

registrationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!validateForm(registrationForm)) {
        return;
    }

    let inputs = registrationForm.querySelectorAll("input");

    let password = inputs[5].value;
    let confirmPassword = inputs[6].value;

    if (!inputs[2].value.includes("@")) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    alert("Registration submitted successfully!");

    registrationForm.reset();

    showPage("login");

});


/* Login Form */

let loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!validateForm(loginForm)) {
        return;
    }

    alert("Login functionality will be connected next.");

});


/* Event Form */

let eventForm = document.querySelector("#eventForm");

eventForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!validateForm(eventForm)) {
        return;
    }

    alert("Event submitted successfully!");

    eventForm.reset();

    showPage("my-events");

});
