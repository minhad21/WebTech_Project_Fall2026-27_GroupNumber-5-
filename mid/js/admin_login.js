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
