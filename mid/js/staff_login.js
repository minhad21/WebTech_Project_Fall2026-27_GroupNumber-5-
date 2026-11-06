
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

    // Get registered users
    let users = JSON.parse(localStorage.getItem("eventoraUsers")) || [];

    let found = false;

    // Check username/email and password
    for(let i = 0; i < users.length; i++)
    {
        if(users[i].username === username || users[i].email === username)
        {
            found = true;

            if(users[i].password === password && users[i].role === "Staff")
            {
                // Save current logged-in user
                localStorage.setItem("currentUser", JSON.stringify(users[i]));

                alert("Login successful!");

                window.location.href = "staff.html";
            }
            else if(users[i].password !== password)
            {
                document.getElementById("passwordError").innerHTML =
                "Incorrect password";
            }
            else
            {
                document.getElementById("usernameError").innerHTML =
                "This account is not a Staff account";
            }

            return false;
        }
    }

    // Username/email not found
    if(found === false)
    {
        document.getElementById("usernameError").innerHTML =
        "Username or Email not found!";
    }

    return false;
}
