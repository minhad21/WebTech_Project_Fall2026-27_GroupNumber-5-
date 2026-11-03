let tickets = [
    {
        bookingRef: "EVT1001",
        customerName: "Purnima Barua",
        eventName: "Tech Innovation Summit",
        ticketQuantity: 2,
        checkInStatus: "Pending"
    },

    {
        bookingRef: "EVT1002",
        customerName: "Rifat Jahan Laboni",
        eventName: "Live Music Festival",
        ticketQuantity: 1,
        checkInStatus: "Checked In"
    },

    {
        bookingRef: "EVT1003",
        customerName: "Tanjil Ahmed Mihan",
        eventName: "Career Development Workshop",
        ticketQuantity: 3,
        checkInStatus: "Pending"
    }
];


document.getElementById("searchForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let bookingRef = document.getElementById("bookingRef").value.trim();

    let message = document.getElementById("message");

    let ticketDetails = document.getElementById("ticketDetails");

    let foundTicket = null;

    for (let i = 0; i < tickets.length; i++) {

        if (tickets[i].bookingRef === bookingRef) {

    if (foundTicket !== null) {

        message.innerHTML = "Ticket found successfully!";

        ticketDetails.hidden = false;

        document.getElementById("displayRef").innerHTML = foundTicket.bookingRef;
        document.getElementById("customerName").innerHTML = foundTicket.customerName;
        document.getElementById("eventName").innerHTML = foundTicket.eventName;
        document.getElementById("ticketQuantity").innerHTML = foundTicket.ticketQuantity;
        document.getElementById("checkInStatus").innerHTML = foundTicket.checkInStatus;
        
        let checkInBtn = document.getElementById("checkInBtn");

        if (foundTicket.checkInStatus === "Checked In") {
            checkInBtn.disabled = true;
            checkInBtn.innerHTML = "Already Checked In";
        }
        else {
            checkInBtn.disabled = false;
            checkInBtn.innerHTML = "Check In";
        }

        checkInBtn.onclick = function() {

            foundTicket.checkInStatus = "Checked In";

            document.getElementById("checkInStatus").innerHTML = "Checked In";

            message.innerHTML = "Customer checked in successfully!";

            checkInBtn.disabled = true;

            checkInBtn.innerHTML = "Already Checked In";
        };

    }

    else {

        message.innerHTML = "Ticket not found! Please enter a valid booking reference.";

        ticketDetails.hidden = true;
    }

});