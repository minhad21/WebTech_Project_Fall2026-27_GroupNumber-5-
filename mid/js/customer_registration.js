
function collect_data()
{
    let validName = validateName();
    let validAge = validAgeFunc();
    let validEmail = validateEmail();
    let validGender = validateGender();
    let validDOB = validateDOB();
    let validPhone = validatePhone();
    let validAddress = validateAddress();
    let validCountry = validateCountry();
    let validUsername = validateUsername();
    let validPassword = validatePassword();
    let validConfirmPassword = validateConfirmPassword();

    if(validName && validAge && validEmail && validGender &&
       validDOB && validPhone && validAddress && validCountry &&
       validUsername && validPassword && validConfirmPassword)
    {
        alert("Registration Successful!");
        return false;
    }
    else
    {
        return false;
    }
}


function validateName()
{
    let name = document.getElementById("Name").value.trim();
    let Error = document.getElementById("NameError");

    if(name == "")
    {
        Error.innerHTML = "Name is required";
        return false;
    }
    else
    {
        Error.innerHTML = "Valid Name: " + name;
        return true;
    }
}


function validAgeFunc()
{
    let age = Number(document.getElementById("Age").value);
    let Error = document.getElementById("AgeError");

    if(document.getElementById("Age").value == "")
    {
        Error.innerHTML = "Age is required";
        return false;
    }
    else if(age <= 18 || age >= 55)
    {
        Error.innerHTML = "Enter age between 18 and 55";
        return false;
    }
    else
    {
        Error.innerHTML = "Valid Age: " + age;
        return true;
    }
}


function validateEmail()
{
    let email = document.getElementById("Email").value.trim();
    let Error = document.getElementById("EmailError");

    if(email == "")
    {
        Error.innerHTML = "Email is required";
        return false;
    }
    else if(!email.includes("@") || !email.includes("."))
    {
        Error.innerHTML = "Enter a valid email";
        return false;
    }
    else
    {
        Error.innerHTML = "Valid Email: " + email;
        return true;
    }
}


function validateGender()
{
    let Error = document.getElementById("GenderError");

    let male = document.getElementById("Male");
    let female = document.getElementById("Female");

    if(male.checked == false && female.checked == false)
    {
        Error.innerHTML = "Please select your gender";
        return false;
    }
    else
    {
        if(male.checked)
        {
            Error.innerHTML = "Selected Gender: Male";
        }
        else
        {
            Error.innerHTML = "Selected Gender: Female";
        }

        return true;
    }
}


function validateDOB()
{
    let dob = document.getElementById("DOB").value;
    let Error = document.getElementById("DOBError");

    if(dob == "")
    {
        Error.innerHTML = "Date of birth is required";
        return false;
    }
    else if(new Date(dob) >= new Date())
    {
        Error.innerHTML = "Enter a valid date of birth";
        return false;
    }
    else
    {
        Error.innerHTML = "Valid Date of Birth: " + dob;
        return true;
    }
}


function validatePhone()
{
    let phone = document.getElementById("Phone").value.trim();
    let Error = document.getElementById("PhoneError");

    if(phone == "")
    {
        Error.innerHTML = "Phone number is required";
        return false;
    }
    else if(!/^01[3-9][0-9]{8}$/.test(phone))
    {
        Error.innerHTML = "Enter a valid 11-digit phone number";
        return false;
    }
    else
    {
        Error.innerHTML = "Valid Phone: " + phone;
        return true;
    }
}


function validateAddress()
{
    let address = document.getElementById("Address").value.trim();
    let Error = document.getElementById("AddressError");

    if(address == "")
    {
        Error.innerHTML = "Address is required";
        return false;
    }
    else
    {
        Error.innerHTML = "Valid Address: " + address;
        return true;
    }
}


function validateCountry()
{
    let country = document.getElementById("Country").value;
    let Error = document.getElementById("CountryError");

    if(country == "")
    {
        Error.innerHTML = "Please select a country";
        return false;
    }
    else
    {
        Error.innerHTML = "Selected Country: " + country;
        return true;
    }
}


function validateUsername()
{
    let username = document.getElementById("username").value.trim();
    let Error = document.getElementById("UsernameError");

    if(username == "")
    {
        Error.innerHTML = "Username is required";
        return false;
    }
    else
    {
        Error.innerHTML = "Valid Username: " + username;
        return true;
    }
}


function validatePassword()
{
    let password = document.getElementById("password").value;
    let Error = document.getElementById("PasswordError");

    if(password == "")
    {
        Error.innerHTML = "Password is required";
        return false;
    }
    else if(password.length < 6)
    {
        Error.innerHTML = "Password must be at least 6 characters";
        return false;
    }
    else
    {
        Error.innerHTML = "Password is valid";
        return true;
    }
}


function validateConfirmPassword()
{
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let Error = document.getElementById("ConfirmPasswordError");

    if(confirmPassword == "")
    {
        Error.innerHTML = "Please confirm your password";
        return false;
    }
    else if(password != confirmPassword)
    {
        Error.innerHTML = "Passwords do not match";
        return false;
    }
    else
    {
        Error.innerHTML = "Password matched successfully";
        return true;
    }
}


function resetForm()
{
    let errors = [
        "NameError", "AgeError", "EmailError", "GenderError",
        "DOBError", "PhoneError", "AddressError", "CountryError",
        "UsernameError", "PasswordError", "ConfirmPasswordError"
    ];

    for(let i = 0; i < errors.length; i++)
    {
        document.getElementById(errors[i]).innerHTML = "";
    }
}
