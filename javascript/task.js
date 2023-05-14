import { app } from "/Hus-Oppgaver-Nettside/javascript/firebaseconfig.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, getDoc} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { getDatabase, ref, runTransaction} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

const db = getFirestore(app);
const database = getDatabase(app);

const tasksCollection = collection(db, "tasks");
const awaitingCollection = collection(db, "awaiting");
const completedCollection = collection(db, "completed");


// get references to HTML elements
const taskNameInput = document.getElementById("task-name");
const taskDescriptionInput = document.getElementById("task-description");
const taskPointsInput = document.getElementById("task-points");
const submitTaskForm = document.getElementById("submit-task-form");
const taskList = document.getElementById("task-list");
const awaitingList = document.getElementById("awaiting-list");
const completedList = document.getElementById("completed-list");


submitTaskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const taskName = taskNameInput.value;
  const taskDescription = taskDescriptionInput.value;
  const taskPoints = parseInt(taskPointsInput.value);
  const usernameLocal = localStorage.getItem("username");

  try {
    // add task to the Firestore collection
    const docRef = await addDoc(tasksCollection, {
      taskName, 
      taskDescription,
      taskPoints,
      dateCreated: new Date(),
      createdBy: usernameLocal
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
      awaitconfirmButton.textContent = "Done with task"; 
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
            await addDoc(collection(db, "awaiting"), { ...taskData, completedBy: localStorage.getItem("username"), completedByUid: localStorage.getItem("uid"), }); 
            // Delete the task from the "tasks" collection
            await deleteDoc(taskRef);
            // Remove the task item element from the task list in the DOM
            taskList.removeChild(taskItem);
          }
        } catch (e) {
          console.error("Error moving document: ", e);
        }
      });
      const taskDate = new Date(task.dateCreated.toDate()); // convert timestamp to JavaScript Date object
      const timeDiff = Math.floor((Date.now() - taskDate) / 1000 / 60); // calculate time difference in minutes
      const hours = Math.floor(timeDiff / 60);
      const minutes = timeDiff % 60;
      const timeSinceCreated = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minute${minutes > 1 ? 's' : ''}` : `${minutes} minute${minutes > 1 ? 's' : ''}`;
     
      taskItem.textContent = `Task name: ${task.taskName} - Description: ${task.taskDescription} - Points: ${task.taskPoints}  - Created by: ${task.createdBy} - Time since created: ${timeSinceCreated}`;
      taskItem.appendChild(awaitconfirmButton);
      taskItem.appendChild(deleteButton); // append the delete button to the task item element
      taskList.appendChild(taskItem);
    }
  });
});

onSnapshot(awaitingCollection, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      const awaiting = change.doc.data();
      const awaitingItem = document.createElement("li");
      const confirmButton = document.createElement("button");
      const deleteButton = document.createElement("button");
      const notButton = document.createElement("button");
      confirmButton.textContent = "Confirm Task";
      notButton.textContent = "Not completed";
      deleteButton.textContent = "Delete";
      confirmButton.setAttribute("class", "confirmButton");
      notButton.setAttribute("class", "notButton");
      deleteButton.setAttribute("class", "deleteButton");
      
      deleteButton.addEventListener("click", async (e) => {
        try {
          await deleteDoc(doc(db, "awaiting", change.doc.id));
          awaitingList.removeChild(awaitingItem);
        } catch (e) {
          console.error("Error deleting document: ", e);
        }
      });

      confirmButton.addEventListener("click", async (e) => {
        try {
          if (change && change.doc) {
            const taskRef = doc(db, "awaiting", change.doc.id);
            const taskSnapshot = await getDoc(taskRef);
            if (taskSnapshot.exists()) {
              const taskData = taskSnapshot.data();
              const completedByUid = taskData.completedByUid;
              const points = taskData.taskPoints;

              // Add the task data to the "completed" collection
              await addDoc(collection(db, "completed"), taskData);
              // Delete the task from the "awaiting" collection
              await deleteDoc(taskRef);
              awaitingList.removeChild(awaitingItem);
      
              // Update the user's points in the Realtime Database
              const userRef = ref(database, 'users/' + completedByUid);
              await runTransaction(userRef, (userData) => {
                if (userData) {
                  userData.point += points;
                  userData.tasksDone += 1;
                }
                return userData;
              });
            }
          }
        } catch (e) {
          console.error("Error moving document: ", e);
        }
      });

      notButton.addEventListener("click", async (e) => {
        try {
          const taskRef = doc(db, "awaiting", change.doc.id);
          const taskSnapshot = await getDoc(taskRef);
          if (taskSnapshot.exists()) {
            const taskData = taskSnapshot.data();
            // Remove the completedBy and completedByUid fields
            delete taskData.completedBy;
            delete taskData.completedByUid;
            // Add the task data to the "tasks" collection
            await addDoc(collection(db, "tasks"), taskData);
            // Delete the task from the "awaiting" 
            
            await deleteDoc(taskRef);
            // Remove the task item element from the task list in the DOM
            awaitingList.removeChild(awaitingItem);
          }
        } catch (e) {
          console.error("Error moving document: ", e);
        }
      });
      
      awaitingItem.textContent = `Name: ${awaiting.taskName} - Description: ${awaiting.taskDescription} - Points: ${awaiting.taskPoints} - Completed by: ${awaiting.completedBy} - Created by: ${awaiting.createdBy}`;
      awaitingItem.appendChild(confirmButton);
      awaitingItem.appendChild(notButton);
      awaitingItem.appendChild(deleteButton);
      awaitingList.appendChild(awaitingItem);
      
    }
  });
});

onSnapshot(completedCollection, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      const completed = change.doc.data();
      const completedItem = document.createElement("li");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute("class", "deleteButton");
      deleteButton.addEventListener("click", async (e) => {
        try {
          await deleteDoc(doc(db, "completed", change.doc.id));
          completedList.removeChild(completedItem);
        } catch (e) {
          console.error("Error deleting document: ", e);
        }
      });
      completedItem.textContent = `Task name: ${completed.taskName} - Description: ${completed.taskDescription} - Points: ${completed.taskPoints} - Completed by: ${completed.completedBy} - Created by: ${completed.createdBy}`;
      completedItem.appendChild(deleteButton);
      completedList.appendChild(completedItem);
    }
  });
});
