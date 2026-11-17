// ---------- Storage helpers (localStorage is only used as demo data, no backend) ----------
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


// ---------- Registration ----------
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

    // always false, so the page does not reload
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
        // do not allow the same username twice
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


// ---------- Login ----------
function validateLogin()
{
    let Username = document.getElementById("LoginUserName").value.trim();
    let Password = document.getElementById("LoginPassword").value;
    let UserError = document.getElementById("LoginUserNameError");
    let PassError = document.getElementById("LoginPasswordError");
    let Result = document.getElementById("LoginResult");

    UserError.textContent = "";
    PassError.textContent = "";
    Result.textContent = "";

    let ok = true;

    if(Username == "")
    {
        UserError.textContent = "Please Enter The Username";
        ok = false;
    }

    if(Password == "")
    {
        PassError.textContent = "Please Enter The Password";
        ok = false;
    }

    if(!ok)
    {
        return false;
    }

    // check the saved admin accounts
    let admins = getAdmins();
    let found = false;

    for(let i = 0; i < admins.length; i++)
    {
        if(admins[i].username.toLowerCase() === Username.toLowerCase() && admins[i].password === Password)
        {
            found = true;
            Username = admins[i].username;
            break;
        }
    }

    if(!found)
    {
        Result.className = "error";
        Result.textContent = "Wrong Username Or Password. Please Register First If You Have No Account.";
        return false;
    }

    try
    {
        sessionStorage.setItem("adminLoggedIn", Username);
    }
    catch(e)
    {
    }

    Result.className = "success";
    Result.textContent = "Login Successful";
    window.location.href = "admin.html";

    // always false, the redirect above opens the dashboard
    return false;
}


function clearLoginErrors()
{
    let ids = ["LoginUserNameError", "LoginPasswordError", "LoginResult"];

    for(let i = 0; i < ids.length; i++)
    {
        document.getElementById(ids[i]).textContent = "";
    }
}


// ---------- Dashboard page (runs on admin.html) ----------
function checkLogin()
{
    let user = null;

    try
    {
        user = sessionStorage.getItem("adminLoggedIn");
    }
    catch(e)
    {
    }

    if(!user)
    {
        window.location.href = "admin_login.html";
        return;
    }

    document.getElementById("WelcomeText").textContent = "Welcome, Admin " + user + "!";
}


function logout()
{
    try
    {
        sessionStorage.removeItem("adminLoggedIn");
    }
    catch(e)
    {
    }

    // after logout, go back to the Home page
    window.location.href = "index.html";
}
