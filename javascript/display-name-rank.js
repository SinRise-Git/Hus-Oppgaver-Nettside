import { app } from "/Hus-Oppgaver-Nettside/javascript/firebaseconfig.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

const db = getDatabase(app);
const uid = localStorage.getItem("uid");
const userRef = ref(db, `users/${uid}`);

if (!localStorage.getItem("username")){
  onValue(userRef, (snapshot) => {
    const userData = snapshot.val();
    console.log("userData", userData);
    localStorage.setItem('username',  userData.username);
    document.querySelector(".username").innerHTML = localStorage.getItem("username");
  });
} else { 
  document.querySelector(".username").innerHTML = localStorage.getItem("username");
}


logoutbutton.addEventListener('click', async (e) => {
    window.location.href = 'login-signup.html';
    localStorage.removeItem("uid");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("rank")

});

