import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDxL7KzN_6XnYUg1KNkZaZm8Ry3HjczLwY",
  authDomain: "hus-oppgaver.firebaseapp.com",
  databaseURL: "https://hus-oppgaver-default-rtdb.firebaseio.com",
  projectId: "hus-oppgaver",
  storageBucket: "hus-oppgaver.appspot.com",
  messagingSenderId: "226057982465",
  appId: "1:226057982465:web:2b0c1bd1634a0f6f98e600",
  measurementId: "G-B6MMTHKWLE"
};

// initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const tasksCollection = collection(db, "tasks");

// get references to HTML elements
const taskNameInput = document.getElementById("task-name");
const taskDescriptionInput = document.getElementById("task-description");
const taskPointsInput = document.getElementById("task-points");
const taskList = document.getElementById("task-list");
const List = document.getElementById("task-list");
const submitTaskForm = document.getElementById("submit-task-form");

submitTaskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const taskName = taskNameInput.value;
  const taskDescription = taskDescriptionInput.value;
  const taskPoints = parseInt(taskPointsInput.value);

  try {
    // add task to the Firestore collection
    const docRef = await addDoc(tasksCollection, {
      taskName, 
      taskDescription,
      taskPoints,
      dateCreated: new Date(),
      createdBy: "Brage"
    });
    console.log("Document written with ID: ", docRef.id);
    
    // clear the input fields
    taskNameInput.value = "";
    taskDescriptionInput.value = "";
    taskPointsInput.value = "";
  
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

// listen to real-time changes to the tasks collection
onSnapshot(tasksCollection, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      const task = change.doc.data();
      const taskItem = document.createElement("li");
      const deleteButton = document.createElement("button"); // create delete button element
      const awaitconfirmButton = document.createElement("button"); // create delete button element
      awaitconfirmButton.textContent = "Done with task"; 7
      deleteButton.textContent = "Delete"; // set text content of the button
      deleteButton.setAttribute("class", `deleteButton`); // add class to the delete button
      awaitconfirmButton.setAttribute("class", `awaitconfirm`); // add class to the awaitconfirm button
      deleteButton.addEventListener("click", async (e) => { // add click event listener to the button
        try {
          await deleteDoc(doc(db, "tasks", change.doc.id)); // delete the corresponding task document from the Firestore collection
          taskList.removeChild(taskItem); // remove the task item element from the task list in the DOM
        } catch (e) {
          console.error("Error deleting document: ", e);
        }
      });
      awaitconfirmButton.addEventListener("click", async (e) => {
        try {
          const taskRef = doc(db, "tasks", change.doc.id);
          const taskSnapshot = await getDoc(taskRef);
          if (taskSnapshot.exists()) {
            const taskData = taskSnapshot.data();
            // Add the task data to the "awaiting" collection
            await addDoc(collection(db, "awaiting"), taskData);
            // Delete the task from the "tasks" collection
            await deleteDoc(taskRef);
            // Remove the task item element from the task list in the DOM
            taskList.removeChild(taskItem);
          }
        } catch (e) {
          console.error("Error moving document: ", e);
        }
      });      
      taskItem.textContent = `${task.taskName} - ${task.taskDescription} - ${task.taskPoints} points - Created by ${task.createdBy} - ID: ${change.doc.id} `;
      taskItem.appendChild(awaitconfirmButton);
      taskItem.appendChild(deleteButton); // append the delete button to the task item element
      taskList.appendChild(taskItem);
    }
  });
});
