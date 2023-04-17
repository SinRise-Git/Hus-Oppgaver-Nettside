import { app } from "/javascript/firebaseconfig.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

const auth = getAuth(app);
const database = getDatabase(app);


submitData.addEventListener('click', async (e) => {

    var email = document.getElementById('gmail-signup').value;
    var password = document.getElementById('password-signup').value;
    var username = document.getElementById('username-signup').value;
    var rankSelect = document.getElementById('ranks');
    var rank = rankSelect.options[rankSelect.selectedIndex].value; 

    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const ip = data.ip;
    
    //sign up user
    createUserWithEmailAndPassword(auth, email, password, username)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ... user.uid
            set(ref(database, 'users/' + user.uid), {
                email: email,
                password: password,
                username: username,
                rank: rank,
                point: "0",
                ip: ip,
                
            })
                .then(() => {
                   document.getElementById("login-form").style.display = "block";
                   document.getElementById("signup-form").style.display = "none";
                   document.title = "Login";
                   const linkElement = document.querySelector('link[rel="icon"]');
                   linkElement.href = '/images/enter.png';
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    document.getElementById("error-message").innerHTML = errorMessage;

                });
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            if (errorMessage === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
              document.getElementById("error-message").innerHTML = "Error: Password should be at least 6 characters";
            } else if (errorMessage === "Firebase: Error (auth/invalid-email).") {
              document.getElementById("error-message").innerHTML = "Error: Not a valid email address";
            } else if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
            document.getElementById("error-message").innerHTML = "Error: Email already in use";
            } else {
              document.getElementById("error-message").innerHTML = errorMessage;
            }
          });
});
