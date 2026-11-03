
let events = [];
let editIndex = -1;


// Collect and validate all form data
function collect_data() {

    let nameValid = validateName();
    let dateValid = validateDate();
    let venueValid = validateVenue();
    let priceValid = validatePrice();
    let capacityValid = validateCapacity();

    return nameValid && dateValid && venueValid &&
           priceValid && capacityValid;
}


// Validate Event Name
function validateName() {

    let name = document.getElementById("eventName").value.trim();
    let error = document.getElementById("NameError");

    if (name === "") {
        error.textContent = "Event name is required";
        return false;
    }

    if (name.length < 3) {
        error.textContent = "Name must contain at least 3 characters";
        return false;
    }

    error.textContent = "";
    return true;
}


// Validate Event Date
function validateDate() {

    let date = document.getElementById("eventDate").value;
    let error = document.getElementById("DateError");

    if (date === "") {
        error.textContent = "Event date is required";
        return false;
    }

    let selectedDate = new Date(date + "T00:00:00");
    let today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        error.textContent = "Please select a future date";
        return false;
    }

    error.textContent = "";
    return true;
}


// Validate Venue
function validateVenue() {

    let venue = document.getElementById("venue").value.trim();
    let error = document.getElementById("VenueError");

    if (venue === "") {
        error.textContent = "Venue is required";
        return false;
    }

    error.textContent = "";
    return true;
}


// Validate Ticket Price
function validatePrice() {

    let price = document.getElementById("ticketPrice").value;
    let error = document.getElementById("PriceError");

    if (price === "") {
        error.textContent = "Ticket price is required";
        return false;
    }

    if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
        error.textContent = "Price must be greater than zero";
        return false;
    }

    error.textContent = "";
    return true;
}


// Validate Event Capacity
function validateCapacity() {

    let capacity = document.getElementById("capacity").value;
    let error = document.getElementById("CapacityError");

    if (capacity === "") {
        error.textContent = "Event capacity is required";
        return false;
    }

    if (!Number.isInteger(Number(capacity)) || Number(capacity) <= 0) {
        error.textContent = "Capacity must be a positive whole number";
        return false;
    }

    error.textContent = "";
    return true;
}


// Add or Update Event
document.getElementById("eventForm").addEventListener("submit", function(event) {

    event.preventDefault();

    if (collect_data()) {

        if (editIndex === -1) {
            addEvent();
        } else {
            updateEvent();
        }

        this.reset();
        editIndex = -1;

        document.getElementById("submit").value = "Add Event";
    }

});


// Add Event
function addEvent() {

    let eventData = {
        name: document.getElementById("eventName").value.trim(),
        date: document.getElementById("eventDate").value,
        venue: document.getElementById("venue").value.trim(),
        price: document.getElementById("ticketPrice").value,
        capacity: document.getElementById("capacity").value
    };

    events.push(eventData);

    displayEvents();
}


// Display Events
function displayEvents() {

    let eventList = document.getElementById("eventList");
    let searchValue = document.getElementById("searchEvent").value.toLowerCase();

    eventList.innerHTML = "";

    let visibleEvents = events
        .map((event, index) => ({ event, index }))
        .filter(item => item.event.name.toLowerCase().includes(searchValue));

    visibleEvents.forEach(function(item) {

        let event = item.event;
        let index = item.index;

        let card = document.createElement("div");
        card.className = "event-card";

        let title = document.createElement("h4");
        title.textContent = event.name;

        let date = document.createElement("p");
        date.textContent = "Date: " + event.date;

        let venue = document.createElement("p");
        venue.textContent = "Venue: " + event.venue;

        let price = document.createElement("p");
        price.textContent = "Ticket Price: " + event.price;

        let capacity = document.createElement("p");
        capacity.textContent = "Capacity: " + event.capacity;

        let editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "edit-btn";
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function() {
            editEvent(index);
        });

        let deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            deleteEvent(index);
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

    document.getElementById("totalEvents").textContent =
        "Total Events: " + events.length;
}


// Edit Event
function editEvent(index) {

    let event = events[index];

    document.getElementById("eventName").value = event.name;
    document.getElementById("eventDate").value = event.date;
    document.getElementById("venue").value = event.venue;
    document.getElementById("ticketPrice").value = event.price;
    document.getElementById("capacity").value = event.capacity;

    editIndex = index;

    document.getElementById("submit").value = "Update Event";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Update Event
function updateEvent() {

    events[editIndex] = {
        name: document.getElementById("eventName").value.trim(),
        date: document.getElementById("eventDate").value,
        venue: document.getElementById("venue").value.trim(),
        price: document.getElementById("ticketPrice").value,
        capacity: document.getElementById("capacity").value
    };

    editIndex = -1;

    displayEvents();
}


// Delete Event
function deleteEvent(index) {

    let confirmDelete = confirm("Are you sure you want to delete this event?");

    if (confirmDelete) {

        events.splice(index, 1);

        if (editIndex === index) {
            document.getElementById("eventForm").reset();
            editIndex = -1;
            document.getElementById("submit").value = "Add Event";
        } else if (editIndex > index) {
            editIndex--;
        }

        displayEvents();
    }
}


// Search Events
document.getElementById("searchEvent").addEventListener("input", function() {
    displayEvents();
});


// Reset Form
document.getElementById("eventForm").addEventListener("reset", function() {

    editIndex = -1;

    document.getElementById("submit").value = "Add Event";

    document.querySelectorAll(".error").forEach(function(error) {
        error.textContent = "";
    });

});
