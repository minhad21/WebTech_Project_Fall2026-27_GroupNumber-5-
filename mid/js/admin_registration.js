
function getAdmins()
{
    try
    {
        let saved = localStorage.getItem("eventoraAdmins");
        if(saved)
        {
            return JSON.parse(saved);
        }
    }
    catch(e)
    {
    }
    return [];
}

function saveAdmins(admins)
{
    try
    {
        localStorage.setItem("eventoraAdmins", JSON.stringify(admins));
        return true;
    }
    catch(e)
    {
        return false;
    }
}



function validateRegistration()
{
    let validName = validateFullName();
    let validEmailResult = validateEmail();
    let validPhoneResult = validatePhone();
    let validUser = validateRegUserName();
    let validPass = validateRegPassword();
    let validConfirm = validateConfirmPassword();

    let Result = document.getElementById("RegisterResult");
    Result.textContent = "";

    if(validName && validEmailResult && validPhoneResult && validUser && validPass && validConfirm)
    {
        let admins = getAdmins();

        admins.push({
            name: document.getElementById("FullName").value.trim(),
            email: document.getElementById("AdminEmail").value.trim(),
            phone: document.getElementById("AdminPhone").value.trim(),
            username: document.getElementById("RegUserName").value.trim(),
            password: document.getElementById("RegPassword").value
        });

        if(saveAdmins(admins))
        {
            Result.className = "success";
            Result.textContent = "Registration Successful. Taking you to the login page...";
            setTimeout(function () { window.location.href = "admin_login.html"; }, 1500);
        }
        else
        {
            Result.className = "error";
            Result.textContent = "Could Not Save The Account In This Browser";
        }
    }

    
    return false;
}


function validateFullName()
{
    let Name = document.getElementById("FullName").value.trim();
    let Error = document.getElementById("FullNameError");

    if(Name == "")
    {
        Error.textContent = "Enter The Full Name";
        return false;
    }
    else if(Name.length < 3)
    {
        Error.textContent = "Name Must Be At Least 3 Characters";
        return false;
    }
    else
    {
        Error.textContent = "";
        return true;
    }
}


function validateEmail()
{
    let Email = document.getElementById("AdminEmail").value.trim();
    let Error = document.getElementById("EmailError");
    let regexpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(Email === "")
    {
        Error.textContent = "Please Enter The Email";
        return false;
    }
    else if(!regexpression.test(Email))
    {
        Error.textContent = "Please Enter The Right Email Format";
        return false;
    }
    else
    {
        Error.textContent = "";
        return true;
    }
}


function validatePhone()
{
    let Phone = document.getElementById("AdminPhone").value.trim();
    let Error = document.getElementById("PhoneError");
    let regexpression = /^01[0-9]{9}$/;

    if(Phone === "")
    {
        Error.textContent = "Please Enter The Phone Number";
        return false;
    }
    else if(!regexpression.test(Phone))
    {
        Error.textContent = "Phone Must Be 11 Digits And Start With 01";
        return false;
    }
    else
    {
        Error.textContent = "";
        return true;
    }
}


function validateRegUserName()
{
    let Username = document.getElementById("RegUserName").value.trim();
    let Error = document.getElementById("RegUserNameError");

    if(Username == "")
    {
        Error.textContent = "Please Enter The Username";
        return false;
    }
    else if(Username.length < 4 || Username.length > 15)
    {
        Error.textContent = "Username Must Be 4 To 15 Characters";
        return false;
    }
    else
    {
        
        let admins = getAdmins();
        for(let i = 0; i < admins.length; i++)
        {
            if(admins[i].username.toLowerCase() === Username.toLowerCase())
            {
                Error.textContent = "This Username Is Already Taken";
                return false;
            }
        }

        Error.textContent = "";
        return true;
    }
}


function validateRegPassword()
{
    let Password = document.getElementById("RegPassword").value;
    let Error = document.getElementById("RegPasswordError");

    if(Password == "")
    {
        Error.textContent = "Please Enter The Password";
        return false;
    }
    else if(Password.length < 8)
    {
        Error.textContent = "Password Must Be At Least 8 Characters";
        return false;
    }
    else if(!/[A-Z]/.test(Password) || !/[a-z]/.test(Password) || !/[0-9]/.test(Password))
    {
        Error.textContent = "Password Needs An Uppercase Letter, A Lowercase Letter And A Number";
        return false;
    }
    else
    {
        Error.textContent = "";
        return true;
    }
}


function validateConfirmPassword()
{
    let Password = document.getElementById("RegPassword").value;
    let Confirm = document.getElementById("ConfirmPassword").value;
    let Error = document.getElementById("ConfirmError");

    if(Confirm == "")
    {
        Error.textContent = "Please Confirm The Password";
        return false;
    }
    else if(Password != Confirm)
    {
        Error.textContent = "Password And Confirm Password Do Not Match";
        return false;
    }
    else
    {
        Error.textContent = "";
        return true;
    }
}


function clearRegisterErrors()
{
    let ids = ["FullNameError", "EmailError", "PhoneError", "RegUserNameError",
               "RegPasswordError", "ConfirmError", "RegisterResult"];

    for(let i = 0; i < ids.length; i++)
    {
        document.getElementById(ids[i]).textContent = "";
    }
}
