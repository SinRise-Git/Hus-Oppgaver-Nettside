import { app } from "/javascript/firebaseconfig.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";


logoutbutton.addEventListener('click', async (e) => {
    window.location.href = 'login-signup.html';
    localStorage.removeItem("uid");
    localStorage.removeItem("isLoggedIn");
});

