
function collect_data()
{
    let validName = validateName();
    let validateAgeResult = validAge();
    let validateEmailResult = validEmail();
    let validategender = validateGender();
    let validPhone = validatePhone();
    let validCountry = validateCountry();
    let validUsername = validateUsername();
    let validPassword = validatePassword();
    let validateDOB = validateDateOfBirth();
    let validAddress = validateAddress();

    if(validName && validateAgeResult && validateEmailResult &&
       validategender && validPhone && validCountry &&
       validUsername && validPassword && validateDOB && validAddress)
    {
        alert("Registration Successful!");

        window.location.href = "customer_dashboard.html";

        return false;
    }

    return false;
}


function validateName()
{
    let Cname = document.getElementById("customerName").value.trim();
    let Error = document.getElementById("NameError");

    if(Cname == "")
    {
        Error.innerHTML = "Enter The Name";
        return false;
    }
    else if(Cname.length < 6)
    {
        Error.innerHTML = "Name Must be at least 6 Char";
        return false;
    }
    else
    {
        Error.innerHTML = "Customer Name: " + Cname;
        return true;
    }
}


function validAge()
{
    let CAge = Number(document.getElementById("customerAge").value);
    let ErrorAge = document.getElementById("AgeError");

    if(document.getElementById("customerAge").value === "")
    {
        ErrorAge.innerHTML = "Please Enter The Age";
        return false;
    }
    else if(CAge < 1 || CAge > 100)
    {
        ErrorAge.innerHTML = "Age Must be Within the Limit";
        return false;
    }
    else
    {
        ErrorAge.innerHTML = "Customer Age: " + CAge;
        return true;
    }
}


function validEmail()
{
    let Email = document.getElementById("customerEmail").value.trim();
    let Error = document.getElementById("EmailError");
    let regexpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(Email === "")
    {
        Error.innerHTML = "Please Enter The Email";
        return false;
    }
    else if(!regexpression.test(Email))
    {
        Error.innerHTML = "Please Enter The Right Email Format";
        return false;
    }
    else
    {
        Error.innerHTML = "Customer Email: " + Email;
        return true;
    }
}


function validateGender()
{
    let genders = document.querySelectorAll('input[name="gender"]');
    let GenderError = document.getElementById("GenderError");
    let selectGender = "";

    for(let i = 0; i < genders.length; i++)
    {
        if(genders[i].checked)
        {
            selectGender = genders[i].value;
            break;
        }
    }

    if(selectGender == "")
    {
        GenderError.innerHTML = "Please Select the Gender";
        return false;
    }
    else
    {
        GenderError.innerHTML = "Gender: " + selectGender;
        return true;
    }
}

function validateDateOfBirth()
{
    let DOB = document.getElementById("DOB").value;
    let DOBError = document.getElementById("DOBError");

    if(DOB == "")
    {
        DOBError.innerHTML = "Please Select Your Date of Birth";
        return false;
    }
    else
    {
        DOBError.innerHTML = "Date of Birth: " + DOB;
        return true;
    }
}

function validatePhone()
{
    let phone = Number(document.getElementById("Phone").value);
    let phoneError = document.getElementById("PhoneError");

    if(document.getElementById("Phone").value === "")
    {
        phoneError.innerHTML = "Please Enter The Phone Number";
        return false;
    }
    else if(phone < 1000000000 || phone > 9999999999)
    {
        phoneError.innerHTML = "Phone Number Must be 10 Digits";
        return false;
    }
    else
    {
        phoneError.innerHTML = "Customer Phone: " + phone;
        return true;
    }
}

function validateAddress()
{
    let Address = document.getElementById("Address").value.trim();
    let AddressError = document.getElementById("AddressError");

    if(Address == "")
    {
        AddressError.innerHTML = "Please Enter Your Address";
        return false;
    }
    else
    {
        AddressError.innerHTML = "Customer Address: " + Address;
        return true;
    }
}

function validateCountry()
{
    let Country = document.getElementById("Country").value;
    let CountryError = document.getElementById("CountryError");

    if(Country == "")
    {
        CountryError.innerHTML = "Please Select Your Country";
        return false;
    }
    else
    {
        CountryError.innerHTML = "Customer Country: " + Country;
        return true;
    }
}


function validateUsername()
{
    let Username = document.getElementById("username").value.trim();
    let UsernameError = document.getElementById("UsernameError");

    if(Username == "")
    {
        UsernameError.innerHTML = "Please Enter The Username";
        return false;
    }
    else if(Username.length < 4)
    {
        UsernameError.innerHTML = "Username Must be at least 4 Characters";
        return false;
    }
    else
    {
        UsernameError.innerHTML = "Customer Username: " + Username;
        return true;
    }
}


function validatePassword()
{
    let Password = document.getElementById("password").value;
    let ConfirmPassword = document.getElementById("confirmPassword").value;
    let PasswordError = document.getElementById("PasswordError");
    let ConfirmPasswordError = document.getElementById("ConfirmPasswordError");

    if(Password == "")
    {
        PasswordError.innerHTML = "Please Enter The Password";
        return false;
    }
    else if(Password.length < 6)
    {
        PasswordError.innerHTML = "Password Must be at least 6 Characters";
        return false;
    }
    else if(Password != ConfirmPassword)
    {
        PasswordError.innerHTML = "Password and Confirm Password Do Not Match";
        ConfirmPasswordError.innerHTML = "Password and Confirm Password Do Not Match";
        return false;
    }
    else
    {
        PasswordError.innerHTML = "Customer Password: " + Password;
        ConfirmPasswordError.innerHTML = "Customer Confirm Password: " + ConfirmPassword;
        return true;
    }
}

