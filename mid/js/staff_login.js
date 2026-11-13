let usernames = ["Purnima Barua", "Jeson Brein", "Eren Yeager"];
let passwords = ["Purnima@123", "Jeson@123", "Eren@123"];
function staffLoginUser()
{
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    let valid = true;

    // Clear previous errors
    document.getElementById("usernameError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";

    // Username validation
    if(username === "")
    {
        document.getElementById("usernameError").innerHTML = "Please enter your username or email";

        valid = false;
    }

    // Password validation
    if(password === "")
    {
        document.getElementById("passwordError").innerHTML = "Please enter your password";

        valid = false;
    }

    if(valid === false)
    {
        return false;
    }

    for(let i = 0; i < username.length; i++)
    {
        if(usernames[i] === username)
        {
            found = true;

            if(passwords[i] === password)
            {
                alert("Login successful!");
                window.location.href = "staff.html";
            }
            else
            {
                document.getElementById("passwordError").innerHTML = "Incorrect password";
            }
            return false;
        }
    }

    if(found === false)
    {
        document.getElementById("usernameError").innerHTML = "Username not found!";
    }

    return false;
}

    

