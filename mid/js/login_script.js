
function loginUser()
{
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let role = document.getElementById("role").value;

    let valid = true;

    // Clear previous errors
    document.getElementById("usernameError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("roleError").innerHTML = "";


    // Username validation
    if(username === "")
    {
        document.getElementById("usernameError").innerHTML =
        "Please enter your username or email";

        valid = false;
    }


    // Password validation
    if(password === "")
    {
        document.getElementById("passwordError").innerHTML =
        "Please enter your password";

        valid = false;
    }


    // Role validation
    if(role === "")
    {
        document.getElementById("roleError").innerHTML =
        "Please select your role";

        valid = false;
    }


    // Check validation
    if(valid === true)
    {
        if(role === "customer")
        {
            window.location.href = "customer_dashboard.html";
        }

        else if(role === "organizer")
        {
            window.location.href = "organizer.html";
        }

        else if(role === "staff")
        {
            window.location.href = "staff.html";
        }

        else if(role === "admin")
        {
            window.location.href = "Admin.html";
        }
    }

    return false;
}
