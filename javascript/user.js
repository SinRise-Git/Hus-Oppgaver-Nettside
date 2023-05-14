import { app } from "/Hus-Oppgaver-Nettside/javascript/firebaseconfig.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

// Get a reference to the database service
const db = getDatabase(app);

const uid = localStorage.getItem("uid");

// Get the user's username from the database and display it in the UI
const userRefUsername = ref(db, `users/${uid}/username`);
const userRefEmail = ref(db, `users/${uid}/email`);
const userRefRank = ref(db, `users/${uid}/rank`);
const userRefPoints = ref(db, `users/${uid}/point`);
const userRefTasksdone= ref(db, `users/${uid}/tasksDone`);

onValue(userRefUsername, (snapshot) => {
  const username = snapshot.val();
  document.getElementById("username").textContent = username;
});

onValue(userRefEmail, (snapshot) => {
    const email = snapshot.val();
    document.getElementById("email").textContent = email;
  });

onValue(userRefRank, (snapshot) => {
    const rank = snapshot.val();
    document.getElementById("rank").textContent = rank;
});

onValue(userRefPoints, (snapshot) => {
    const points = snapshot.val();
    document.getElementById("points").textContent = points;
});

onValue(userRefTasksdone, (snapshot) => {
    const tasksdone = snapshot.val();
    document.getElementById("tasks").textContent = tasksdone;
});

