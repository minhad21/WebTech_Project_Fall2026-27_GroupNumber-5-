
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

    return validName && validateAgeResult && validateEmailResult &&
           validategender && validPhone && validCountry &&
           validUsername && validPassword;
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


function validatePhone()
{
    let Phone = document.getElementById("Phone").value.trim();

    if(Phone == "")
    {
        alert("Please Enter The Phone Number");
        return false;
    }
    else if(Phone.length < 10)
    {
        alert("Phone Number Must be at least 10 Digits");
        return false;
    }
    else
    {
        return true;
    }
}


function validateCountry()
{
    let Country = document.getElementById("Country").value;

    if(Country == "")
    {
        alert("Please Select Your Country");
        return false;
    }
    else
    {
        return true;
    }
}


function validateUsername()
{
    let Username = document.getElementById("username").value.trim();

    if(Username == "")
    {
        alert("Please Enter The Username");
        return false;
    }
    else if(Username.length < 4)
    {
        alert("Username Must be at least 4 Characters");
        return false;
    }
    else
    {
        return true;
    }
}


function validatePassword()
{
    let Password = document.getElementById("password").value;
    let ConfirmPassword = document.getElementById("confirmPassword").value;

    if(Password == "")
    {
        alert("Please Enter The Password");
        return false;
    }
    else if(Password.length < 6)
    {
        alert("Password Must be at least 6 Characters");
        return false;
    }
    else if(Password != ConfirmPassword)
    {
        alert("Password and Confirm Password Do Not Match");
        return false;
    }
    else
    {
        return true;
    }
}
