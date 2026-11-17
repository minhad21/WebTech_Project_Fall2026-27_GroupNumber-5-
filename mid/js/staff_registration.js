function collect_data()
{
    // Getting values from the form
    let name = document.getElementById("Name").value.trim();
    let age = document.getElementById("Age").value;
    let email = document.getElementById("Email").value.trim();
    let gender = document.querySelector('input[name="gender"]:checked');
    let dob = document.getElementById("DOB").value;
    let phone = document.getElementById("Phone").value.trim();
    let address = document.getElementById("Address").value.trim();
    let country = document.getElementById("Country").value;
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let valid = true;

    // Clearing previous error messages
    let errors = [
        "NameError", "AgeError", "EmailError", "GenderError",
        "DOBError", "PhoneError", "AddressError", "CountryError",
        "UsernameError", "PasswordError", "ConfirmPasswordError"
    ];

    for (let i = 0; i < errors.length; i++)
    {
        document.getElementById(errors[i]).innerHTML = "";
    }

    if (name === "")
    {
        document.getElementById("NameError").innerHTML = "Name is required";
        valid = false;
    }

    if (age === "" || age <= 18 || age >= 55)
    {
        document.getElementById("AgeError").innerHTML = "Enter an age between 18 and 55";
        valid = false;
    }

    if (email === "")
    {
        document.getElementById("EmailError").innerHTML = "Email is required";
        valid = false;
    }
    else if (!email.includes("@") || !email.includes("."))
    {
        document.getElementById("EmailError").innerHTML = "Enter a valid email";
        valid = false;
    }

    if (gender === null)
    {
        document.getElementById("GenderError").innerHTML = "Please select your gender";
        valid = false;
    }

    if (dob === "")
    {
        document.getElementById("DOBError").innerHTML = "Date of birth is required";
        valid = false;
    }
    else if (new Date(dob) >= new Date())
    {
        document.getElementById("DOBError").innerHTML = "Enter a valid date of birth";
        valid = false;
    }

    if (phone === "")
    {
        document.getElementById("PhoneError").innerHTML = "Phone number is required";
        valid = false;
    }
    else if (!/^01[3-9][0-9]{8}$/.test(phone))
    {
       document.getElementById("PhoneError").innerHTML = "Enter a valid 11-digit phone number";

       valid = false;
    }

    if (address === "")
    {
        document.getElementById("AddressError").innerHTML = "Address is required";
        valid = false;
    }

    if (country === "")
    {
        document.getElementById("CountryError").innerHTML = "Please select a country";
        valid = false;
    }

    if (username === "")
    {
        document.getElementById("UsernameError").innerHTML = "Username is required";
        valid = false;
    }

    if (password === "")
    {
        document.getElementById("PasswordError").innerHTML = "Password is required";
        valid = false;
    }
    else if (password.length < 6)
    {
        document.getElementById("PasswordError").innerHTML = "Password must be at least 6 characters";
        valid = false;
    }

    if (confirmPassword === "")
    {
        document.getElementById("ConfirmPasswordError").innerHTML = "Please confirm your password";
        valid = false;
    }
    else if (password !== confirmPassword)
    {
        document.getElementById("ConfirmPasswordError").innerHTML = "Passwords do not match";
        valid = false;
    }

    if (valid === false)
    {
        return false;
    }

    window.location.href = "login.html";

    return false;
}
