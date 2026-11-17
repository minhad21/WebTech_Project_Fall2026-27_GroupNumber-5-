// ---------- Summary Form ----------
function validateSummaryForm()
{
    let validUsers = validateCount("TotalUsers", "UsersError", "Total Users");
    let validEvents = validateCount("TotalEvents", "EventsError", "Total Events");
    let validBookings = validateCount("TotalBookings", "BookingsError", "Total Bookings");

    let Result = document.getElementById("SummaryResult");

    if(validUsers && validEvents && validBookings)
    {
        Result.className = "success";
        Result.textContent = "Summary Updated: Users " + document.getElementById("TotalUsers").value +
                             ", Events " + document.getElementById("TotalEvents").value +
                             ", Bookings " + document.getElementById("TotalBookings").value;
    }
    else
    {
        Result.textContent = "";
    }

    // always false, so the page does not reload
    return false;
}


function validateCount(inputId, errorId, label)
{
    let value = document.getElementById(inputId).value.trim();
    let Error = document.getElementById(errorId);

    if(value === "")
    {
        Error.textContent = "Please Enter " + label;
        return false;
    }
    else if(Number(value) < 0)
    {
        Error.textContent = label + " Cannot Be Negative";
        return false;
    }
    else if(!Number.isInteger(Number(value)))
    {
        Error.textContent = label + " Must Be A Whole Number";
        return false;
    }
    else
    {
        Error.textContent = "";
        return true;
    }
}


function clearSummaryErrors()
{
    document.getElementById("UsersError").textContent = "";
    document.getElementById("EventsError").textContent = "";
    document.getElementById("BookingsError").textContent = "";
    document.getElementById("SummaryResult").textContent = "";
}


// ---------- Category Form ----------
function addCategory()
{
    let name = document.getElementById("CategoryName").value.trim();
    let Error = document.getElementById("CategoryError");
    let Message = document.getElementById("CategoryMessage");
    let table = document.getElementById("categoryList");

    Message.textContent = "";

    if(name === "")
    {
        Error.textContent = "Category Name Is Required";
        return false;
    }
    else if(name.length < 3)
    {
        Error.textContent = "Category Name Must Be At Least 3 Characters";
        return false;
    }

    // do not allow the same category twice
    let rows = table.getElementsByTagName("tr");
    for(let i = 1; i < rows.length; i++)
    {
        if(rows[i].cells[0].textContent.toLowerCase() === name.toLowerCase())
        {
            Error.textContent = "This Category Already Exists";
            return false;
        }
    }

    Error.textContent = "";

    let row = document.createElement("tr");

    let nameCell = document.createElement("td");
    nameCell.textContent = name;

    let actionCell = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteBtn";
    deleteButton.type = "button";
    deleteButton.setAttribute("onclick", "deleteCategory(this)");

    actionCell.appendChild(deleteButton);
    row.appendChild(nameCell);
    row.appendChild(actionCell);
    table.appendChild(row);

    Message.className = "success";
    Message.textContent = "Category Added: " + name;
    document.getElementById("CategoryName").value = "";

    // always false, so the page does not reload
    return false;
}


function deleteCategory(button)
{
    let row = button.parentElement.parentElement;
    let name = row.cells[0].textContent;
    row.remove();

    let Message = document.getElementById("CategoryMessage");
    Message.className = "success";
    Message.textContent = "Category Deleted: " + name;
}
