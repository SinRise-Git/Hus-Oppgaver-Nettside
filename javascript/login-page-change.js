function showLoginForm(){
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
    document.title = "Login";
    // Get the link element
    const linkElement = document.querySelector('link[rel="icon"]');

    // Change the href attribute to the new image path
    linkElement.href = '/images/enter.png';
}

function showSignupForm(){
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
    document.title = "Signup";
     // Get the link element
     const linkElement = document.querySelector('link[rel="icon"]');

     // Change the href attribute to the new image path
     linkElement.href = '/images/add-user.png';
}
