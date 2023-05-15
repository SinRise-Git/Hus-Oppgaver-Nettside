import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

// Initialize Firebase app with your credentials
import { app } from "/Hus-Oppgaver-Nettside/javascript/firebaseconfig.js";

// Get a reference to the users collection in your Firebase Realtime Database
const database = getDatabase(app);
const usersRef = ref(database, 'users');


// Retrieve the data and update the leaderboard table
onValue(usersRef, (snapshot) => {
  const leaderboard = [];
  snapshot.forEach((childSnapshot) => {
    const childData = childSnapshot.val();
    leaderboard.push({ username: childData.username, points: childData.point });
  });

  // Sort the leaderboard data by points in descending order
  leaderboard.sort((a, b) => b.points - a.points);

  // Update the leaderboard table with the top 6 sorted data
  const tableBody = document.querySelector('#points-leaderboard-table-body');
  tableBody.innerHTML = '';
  leaderboard.slice(0, 6).forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.username}</td>
      <td>${user.points}</td>
    `;
    tableBody.appendChild(row);
  });
}, {
  orderByChild: 'point' // Order the data by the 'point' key
});


onValue(usersRef, (snapshot) => {
  const leaderboard = [];
  snapshot.forEach((childSnapshot) => {
    const childData = childSnapshot.val();
    leaderboard.push({ username: childData.username, tasksDone: childData.tasksDone });
  });
  
  // Sort the leaderboard data by tasks done in descending order
  leaderboard.sort((a, b) => b.tasksDone - a.tasksDone);

  // Update the leaderboard table with the top 6 sorted data
  const tableBody = document.querySelector('#tasksdone-leaderboard-table-body');
  tableBody.innerHTML = '';
  leaderboard.slice(0, 6).forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.username}</td>
      <td>${user.tasksDone}</td>
    `;
    tableBody.appendChild(row);
  });
}, {
  orderByChild: 'tasksDone' // Order the data by the 'tasksDone' key
});

const pointsBtn = document.getElementById("point-leaderboard-btn");
const tasksdoneBtn = document.getElementById("tasksdone-leaderboard-btn");
const pointsBtnNew = document.getElementById("point-leaderboard-btn-new");
const tasksdoneBtnNew = document.getElementById("tasksdone-leaderboard-btn-new");
const pointsDiv = document.querySelector(".leaderboard-points");
const tasksdoneDiv = document.querySelector(".leaderboard-tasksdone");

pointsBtn.addEventListener("click", () => {
  pointsDiv.style.display = "block";
  tasksdoneDiv.style.display = "none";
});

tasksdoneBtn.addEventListener("click", () => {
  pointsDiv.style.display = "none";
  tasksdoneDiv.style.display = "block";
});

pointsBtnNew.addEventListener("click", () => {
  pointsDiv.style.display = "block";
  tasksdoneDiv.style.display = "none";
});

tasksdoneBtnNew.addEventListener("click", () => {
  pointsDiv.style.display = "none";
  tasksdoneDiv.style.display = "block";
});