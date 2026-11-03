
console.log("admin_style.js Connected");


function validateAdminForm()
{
   
    let nameOk     = validateName("AdminName", "NameError");
    let idOk       = validatePattern("AdminID", "AdminIDError", "Admin ID", /^ADM-[0-9]{4}$/, "ADM-1234");
    let emailOk    = validateEmail("AdminEmail", "EmailError");
    let phoneOk    = validatePhone("AdminPhone", "PhoneError");
    let genderOk   = validateRadio("gender", "GenderError", "Gender");
    let roleOk     = validateSelect("AdminRole", "RoleError", "Admin role");
    let permitOk   = validateCheckbox("permission", "PermissionError", "permission", 1);
    let userOk     = validateUsername("UserName", "UserNameError");
    let passwordOk = validatePassword("Password", "PasswordError");
    let confirmOk  = validateConfirmPassword("Password", "ConfirmPassword", "ConfirmError");

    let isValid = nameOk && idOk && emailOk && phoneOk && genderOk && roleOk &&
                  permitOk && userOk && passwordOk && confirmOk;

    showResult(isValid, "Admin registered successfully!");

    
    return false;
}



let summaryForm = document.getElementById("summaryForm");


summaryForm.addEventListener("submit", function (event)
{
    event.preventDefault();      // stop the page from reloading

    let users    = document.getElementById("totalUsers").value.trim();
    let events   = document.getElementById("totalEvents").value.trim();
    let bookings = document.getElementById("totalBookings").value.trim();
    let message  = document.getElementById("summaryMessage");

    if (users === "" || events === "" || bookings === "")
    {
        message.className = "error";
        message.innerHTML = "Please fill in all three fields";
        return;
    }

   
    let values = [users, events, bookings];
    for (let i = 0; i < values.length; i++)
    {
        let number = Number(values[i]);
        if (!Number.isInteger(number) || number < 0)
        {
            message.className = "error";
            message.innerHTML = "Values must be whole numbers (0 or more)";
            return;
        }
    }

    message.className = "success";
    message.innerHTML = "Summary updated: " + users + " users, " + events +
                        " events, " + bookings + " bookings";
});

// Clear button: also remove the message
summaryForm.addEventListener("reset", function ()
{
    let message = document.getElementById("summaryMessage");
    message.className = "";
    message.innerHTML = "";
});


let categoryForm = document.getElementById("categoryForm");
let categoryList = document.getElementById("categoryList");
let categoryMessage = document.getElementById("message");


categoryForm.addEventListener("submit", function (event)
{
    event.preventDefault();

    let input = document.getElementById("categoryName");
    let name = input.value.trim();

    if (name === "")
    {
        categoryMessage.className = "error";
        categoryMessage.innerHTML = "Please enter a category name";
        return;
    }
    if (name.length < 3)
    {
        categoryMessage.className = "error";
        categoryMessage.innerHTML = "Category name must be at least 3 characters";
        return;
    }
    if (!/^[A-Za-z ]+$/.test(name))
    {
        categoryMessage.className = "error";
        categoryMessage.innerHTML = "Category name can contain only letters and spaces";
        return;
    }

    // the same category cannot be added twice (row 0 is the heading row)
    for (let i = 1; i < categoryList.rows.length; i++)
    {
        let oldName = categoryList.rows[i].cells[0].textContent.trim();
        if (oldName.toLowerCase() === name.toLowerCase())
        {
            categoryMessage.className = "error";
            categoryMessage.innerHTML = "This category already exists";
            return;
        }
    }

    
    let row = categoryList.insertRow(-1);
    row.insertCell(0).textContent = name;

    let deleteButton = document.createElement("button");
    deleteButton.className = "deleteBtn";
    deleteButton.textContent = " Delete ";
    row.insertCell(1).appendChild(deleteButton);

    categoryMessage.className = "success";
    categoryMessage.textContent = "Category added: " + name;
    input.value = "";
});


categoryList.addEventListener("click", function (event)
{
    if (event.target.classList.contains("deleteBtn"))
    {
        let row = event.target.closest("tr");
        let name = row.cells[0].textContent.trim();
        row.remove();

        categoryMessage.className = "success";
        categoryMessage.textContent = "Category deleted: " + name;
    }
});