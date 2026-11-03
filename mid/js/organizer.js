let events = [];
let editIndex = -1;

const eventForm = document.querySelector("#eventForm");
const eventName = document.querySelector("#eventName");
const eventDate = document.querySelector("#eventDate");
const eventVenue = document.querySelector("#eventVenue");
const eventPrice = document.querySelector("#eventPrice");
const eventCapacity = document.querySelector("#eventCapacity");

const eventList = document.querySelector("#eventList");
const searchEvent = document.querySelector("#searchEvent");
const totalEvents = document.querySelector("#totalEvents");
const emptyMessage = document.querySelector("#emptyMessage");
const submitBtn = document.querySelector("#submitBtn");
const formLegend = document.querySelector("#formLegend");
const logoutBtn = document.querySelector("#logoutBtn");

function clearErrors() {
    document.querySelector("#NameError").textContent = "";
    document.querySelector("#DateError").textContent = "";
    document.querySelector("#VenueError").textContent = "";
    document.querySelector("#PriceError").textContent = "";
    document.querySelector("#CapacityError").textContent = "";
}

function validateForm() {
    clearErrors();

    let valid = true;

    if (eventName.value.trim() === "") {
        document.querySelector("#NameError").textContent =
            "Please enter the event name.";
        valid = false;
    }

    if (eventDate.value === "") {
        document.querySelector("#DateError").textContent =
            "Please select an event date.";
        valid = false;
    } else if (eventDate.value < new Date().toISOString().split("T")[0]) {
        document.querySelector("#DateError").textContent =
            "Event date cannot be in the past.";
        valid = false;
    }

    if (eventVenue.value.trim() === "") {
        document.querySelector("#VenueError").textContent =
            "Please enter the event venue.";
        valid = false;
    }

    if (eventPrice.value === "" || Number(eventPrice.value) < 0) {
        document.querySelector("#PriceError").textContent =
            "Please enter a valid ticket price.";
        valid = false;
    }

    if (
        eventCapacity.value === "" ||
        Number(eventCapacity.value) < 1 ||
        !Number.isInteger(Number(eventCapacity.value))
    ) {
        document.querySelector("#CapacityError").textContent =
            "Capacity must be a positive whole number.";
        valid = false;
    }

    return valid;
}

function resetForm() {
    eventForm.reset();
    clearErrors();

    editIndex = -1;
    submitBtn.value = "Add Event";
    formLegend.textContent = "Add New Event";
}

eventForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    let eventData = {
        name: eventName.value.trim(),
        date: eventDate.value,
        venue: eventVenue.value.trim(),
        price: Number(eventPrice.value),
        capacity: Number(eventCapacity.value)
    };

    if (editIndex === -1) {
        events.push(eventData);
    } else {
        events[editIndex] = eventData;
    }

    resetForm();
    displayEvents();
});

function displayEvents() {
    eventList.innerHTML = "";

    let searchText = searchEvent.value.trim().toLowerCase();

    let filteredEvents = events.filter(function (event) {
        return (
            event.name.toLowerCase().includes(searchText) ||
            event.venue.toLowerCase().includes(searchText)
        );
    });

    totalEvents.textContent = "Total Events: " + events.length;

    if (filteredEvents.length === 0) {
        let message = document.createElement("p");

        if (events.length === 0) {
            message.textContent = "No events added yet.";
        } else {
            message.textContent = "No matching events found.";
        }

        eventList.appendChild(message);
        return;
    }

    filteredEvents.forEach(function (event) {
        let originalIndex = events.indexOf(event);

        let card = document.createElement("div");
        card.className = "event-card";

        let title = document.createElement("h4");
        title.textContent = event.name;

        let date = document.createElement("p");
        date.textContent = "Date: " + event.date;

        let venue = document.createElement("p");
        venue.textContent = "Venue: " + event.venue;

        let price = document.createElement("p");
        price.textContent = "Ticket Price: BDT " + event.price;

        let capacity = document.createElement("p");
        capacity.textContent = "Capacity: " + event.capacity + " people";

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";
        editButton.type = "button";

        editButton.addEventListener("click", function () {
            editEvent(originalIndex);
        });

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", function () {
            deleteEvent(originalIndex);
        });

        card.appendChild(title);
        card.appendChild(date);
        card.appendChild(venue);
        card.appendChild(price);
        card.appendChild(capacity);
        card.appendChild(editButton);
        card.appendChild(deleteButton);

        eventList.appendChild(card);
    });
}

function editEvent(index) {
    let event = events[index];

    eventName.value = event.name;
    eventDate.value = event.date;
    eventVenue.value = event.venue;
    eventPrice.value = event.price;
    eventCapacity.value = event.capacity;

    editIndex = index;

    submitBtn.value = "Update Event";
    formLegend.textContent = "Edit Event";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function deleteEvent(index) {
    let confirmDelete = confirm("Are you sure you want to delete this event?");

    if (confirmDelete) {
        events.splice(index, 1);

        if (editIndex === index) {
            resetForm();
        }

        displayEvents();
    }
}

searchEvent.addEventListener("input", function () {
    displayEvents();
});

eventForm.addEventListener("reset", function () {
    setTimeout(function () {
        resetForm();
    }, 0);
});

logoutBtn.addEventListener("click", function () {
    let confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {
        window.location.href = "login.html";
    }
});

displayEvents();