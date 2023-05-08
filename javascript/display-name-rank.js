// Import the Firebase SDKs you need
import { app } from "/Hus-Oppgaver-Nettside/javascript/firebaseconfig.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

// Initialize Firebase
const db = getDatabase(app);

// Retrieve the uid from local storage
const uid = localStorage.getItem("uid");

// Retrieve the user data from the Firebase Realtime Database
const userRef = ref(db, `users/${uid}`);
onValue(userRef, (snapshot) => {
    const userData = snapshot.val();

    // Save the username and rank to local storage
    localStorage.setItem("username", userData.username);
    localStorage.setItem("rank", userData.rank);
});


logoutbutton.addEventListener('click', async (e) => {
    window.location.href = 'login-signup.html';
    localStorage.removeItem("uid");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("rank")   
});







