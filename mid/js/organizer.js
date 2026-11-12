
/* PAGE NAVIGATION */

let isLoggedIn = false;

function showPage(pageId) {

    // Protect organizer pages

    let protectedPages = [
        "organize",
        "my-events",
        "booking"
    ];

    if (protectedPages.includes(pageId) && !isLoggedIn) {
        pageId = "login";
    }

    // Hide all pages

    let pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    // Show selected page

    let selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    // Change navigation bar

    let publicNavbar = document.querySelector("#publicNavbar");
    let organizerNavbar = document.querySelector("#organizerNavbar");

    if (isLoggedIn) {
        publicNavbar.style.display = "none";
        organizerNavbar.style.display = "flex";
    } else {
        publicNavbar.style.display = "flex";
        organizerNavbar.style.display = "none";
    }

}


/* DEFAULT PAGE */

showPage("welcome");


/* FORM VALIDATION FUNCTION */

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

            showError(input, input.dataset.label + " is required.");

            isValid = false;
        }

    });

    return isValid;

}


/* SHOW ERROR MESSAGE */

function showError(input, message) {

    let error = document.createElement("small");

    error.className = "error-message";
    error.textContent = message;

    input.insertAdjacentElement("afterend", error);

}


/* REGISTRATION FORM */

let registrationForm = document.querySelector("#registrationForm");

registrationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!validateForm(registrationForm)) {
        return;
    }

    let organizationName = document.querySelector("#organizationName").value.trim();

    let ownerName = document.querySelector("#ownerName").value.trim();

    let email = document.querySelector("#email").value.trim();

    let phone = document.querySelector("#phone").value.trim();

    let organizerID = document.querySelector("#organizerID").value.trim();

    let password = document.querySelector("#password").value;

    let confirmPassword = document.querySelector("#confirmPassword").value;


    // Email validation

    if (!email.includes("@") || !email.includes(".")) {

        showError(
            document.querySelector("#email"),
            "Please enter a valid email address."
        );

        return;
    }


    // Password validation

    if (password.length < 6) {

        showError(
            document.querySelector("#password"),
            "Password must contain at least 6 characters."
        );

        return;
    }


    // Confirm password validation

    if (password !== confirmPassword) {

        showError(
            document.querySelector("#confirmPassword"),
            "Passwords do not match."
        );

        return;
    }


    // Check existing organizer ID

    let existingAccount = localStorage.getItem("organizerAccount");

    if (existingAccount) {

        let account = JSON.parse(existingAccount);

        if (account.organizerID === organizerID) {

            showError(
                document.querySelector("#organizerID"),
                "This Organizer ID is already registered."
            );

            return;
        }
    }


    // Save registration information

    let organizerAccount = {

        organizationName: organizationName,
        ownerName: ownerName,
        email: email,
        phone: phone,
        organizerID: organizerID,
        password: password

    };

    localStorage.setItem(
        "organizerAccount",
        JSON.stringify(organizerAccount)
    );


    alert("Registration successful! Please login.");

    registrationForm.reset();

    showPage("login");

});


/* LOGIN FORM */

let loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!validateForm(loginForm)) {
        return;
    }

    let loginID = document.querySelector("#loginID").value.trim();

    let loginPassword = document.querySelector("#loginPassword").value;


    // Get registered account

    let savedAccount = localStorage.getItem("organizerAccount");

    if (!savedAccount) {

        alert("No account found. Please create an account first.");

        return;
    }

    let account = JSON.parse(savedAccount);


    // Check login information

    if (
        loginID === account.organizerID &&
        loginPassword === account.password
    ) {

        alert("Login successful! Welcome to Eventora.");

        isLoggedIn = true;

        loginForm.reset();

        showPage("organize");

    } else {

        alert("Incorrect Organizer ID or Password. Please try again.");

    }

});


/* EVENT FORM */

let eventForm = document.querySelector("#eventForm");

eventForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!validateForm(eventForm)) {
        return;
    }

    let eventInputs = eventForm.querySelectorAll(
        "input, select, textarea"
    );

    let eventName = eventInputs[0].value.trim();
    let eventType = eventInputs[1].value;
    let eventDate = eventInputs[2].value;
    let eventTime = eventInputs[3].value;
    let eventVenue = eventInputs[4].value.trim();
    let guestNumber = eventInputs[5].value;
    let eventDescription = eventInputs[6].value.trim();


    // Add event to My Events

    let eventList = document.querySelector("#eventList");

    let eventCard = document.createElement("div");

    eventCard.className = "event-card";

    let heading = document.createElement("h3");
    heading.textContent = eventName;

    let details = document.createElement("p");

    details.textContent =
        "Type: " + eventType +
        " | Date: " + eventDate +
        " | Time: " + eventTime +
        " | Venue: " + eventVenue +
        " | Guests: " + guestNumber;

    let description = document.createElement("p");

    description.textContent = eventDescription;

    eventCard.appendChild(heading);
    eventCard.appendChild(details);
    eventCard.appendChild(description);

    if (eventList.querySelector("p")) {
        eventList.innerHTML = "";
    }

    eventList.appendChild(eventCard);


    alert("Event submitted successfully!");

    eventForm.reset();

    showPage("my-events");

});


/* LOGOUT */

function logout() {

    isLoggedIn = false;

    alert("You have logged out successfully.");

    showPage("welcome");

}
