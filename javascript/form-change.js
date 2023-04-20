function showLoginForm(){
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
    document.title = "Login";
    const linkElement = document.querySelector('link[rel="icon"]');
    linkElement.href = '/images/enter.png';
    document.getElementById("form-box").style.height = "450px"; 
}

function showSignupForm(){
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
    document.title = "Signup";
    const linkElement = document.querySelector('link[rel="icon"]');
    linkElement.href = '/images/add-user.png';
    document.getElementById("form-box").style.height = "550px"; 
}


