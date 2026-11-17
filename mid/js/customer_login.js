
function customerLoginUser()
{
    let validUsername = validateUsername();
    let validPassword = validatePassword();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;

    let Error = document.getElementById("loginError");

    Error.innerHTML = "";

    if(validUsername && validPassword)
    {
        if(username == "emon" && password == "123456")
        {
            alert("Login Successful!");

            window.location.href = "customer_dashboard.html";
        }
        else
        {
            Error.innerHTML = "Invalid Username or Password";
            return false;
        }
    }

    return false;
}


// Username Validation
function validateUsername()
{
    let username = document.getElementById("username").value.trim();
    let Error = document.getElementById("usernameError");

    if(username == "")
    {
        Error.innerHTML = "Username is required";
        return false;
    }
    else
    {
        Error.innerHTML = "username:"+username;
        return true;
    }
}


// Password Validation
function validatePassword()
{
    let password = document.getElementById("password").value;
    let Error = document.getElementById("passwordError");

    if(password == "")
    {
        Error.innerHTML = "Password is required";
        return false;
    }
    else
    {
        Error.innerHTML = "password:"+password;
        return true;
    }
}

function resetForm()
{
    document.getElementById("usernameError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("loginError").innerHTML = "";
}