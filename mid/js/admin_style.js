// ---------- 1. Summary Update ----------
function validateSummary(event)
{
    event.preventDefault();

    let users = document.getElementById("totalUsers").value;
    let events = document.getElementById("totalEvents").value;
    let bookings = document.getElementById("totalBookings").value;
    let Error = document.getElementById("summaryMessage");

    if(users === "" || events === "" || bookings === "")
    {
        Error.innerHTML = "Please Fill All Summary Fields";
        Error.className = "error";
        return false;
    }
    else if(Number(users) < 0 || Number(events) < 0 || Number(bookings) < 0)
    {
        Error.innerHTML = "Values Cannot Be Negative";
        Error.className = "error";
        return false;
    }
    else
    {
        Error.innerHTML = "Summary Updated: Users " + users + ", Events " + events + ", Bookings " + bookings;
        Error.className = "success";
        return true;
    }
}

function clearSummary()
{
    let Error = document.getElementById("summaryMessage");
    Error.innerHTML = "";
    Error.className = "";
}


// ---------- 2. Approve / Reject ----------
function changeStatus(button, newStatus)
{
    let row = button.parentElement.parentElement;
    let statusCell = row.querySelector(".status");

    statusCell.innerHTML = newStatus;
    statusCell.className = "status " + newStatus.toLowerCase();
}

function approveEvent()
{
    changeStatus(this, "Approved");
}

function rejectEvent()
{
    changeStatus(this, "Rejected");
}


// ---------- 3. Category Delete ----------
function deleteCategory()
{
    let row = this.parentElement.parentElement;
    row.remove();

    let Error = document.getElementById("message");
    Error.innerHTML = "Category Deleted";
    Error.className = "success";
}


// ---------- 4. Category Add ----------
function addCategory(event)
{
    event.preventDefault();

    let name = document.getElementById("categoryName").value.trim();
    let Error = document.getElementById("message");

    if(name == "")
    {
        Error.innerHTML = "Category Name Is Required";
        Error.className = "error";
        return false;
    }

    let table = document.getElementById("categoryList");

    let row = document.createElement("tr");

    let nameCell = document.createElement("td");
    nameCell.innerHTML = name;

    let actionCell = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "deleteBtn";
    deleteButton.addEventListener("click", deleteCategory);

    actionCell.appendChild(deleteButton);
    row.appendChild(nameCell);
    row.appendChild(actionCell);
    table.appendChild(row);

    Error.innerHTML = "Category Added: " + name;
    Error.className = "success";
    document.getElementById("categoryName").value = "";
    return true;
}


// ---------- Event Listeners ----------
document.getElementById("summaryForm").addEventListener("submit", validateSummary);
document.getElementById("summaryForm").addEventListener("reset", clearSummary);
document.getElementById("categoryForm").addEventListener("submit", addCategory);

let approveButtons = document.querySelectorAll(".approveBtn");
for(let i = 0; i < approveButtons.length; i++)
{
    approveButtons[i].addEventListener("click", approveEvent);
}

let rejectButtons = document.querySelectorAll(".rejectBtn");
for(let i = 0; i < rejectButtons.length; i++)
{
    rejectButtons[i].addEventListener("click", rejectEvent);
}

let deleteButtons = document.querySelectorAll(".deleteBtn");
for(let i = 0; i < deleteButtons.length; i++)
{
    deleteButtons[i].addEventListener("click", deleteCategory);
}