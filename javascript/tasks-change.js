document.addEventListener('DOMContentLoaded', function() {
    const allTasksBtn = document.getElementById("all-tasks");
    const confirmationBtn = document.getElementById("waiting-conformation");
    const finishedBtn = document.getElementById("finshed-tasks");
    const addtasksBtn = document.getElementById("add-task")
  
    const allTasksDiv = document.querySelector(".all-tasks");
    const confirmationDiv = document.querySelector(".confirmation");
    const finishedDiv = document.querySelector(".finished");
    const addtasksDiv = document.querySelector(".add-tasks")
  
    allTasksBtn.addEventListener("click", () => {
      allTasksDiv.style.display = "block";
      confirmationDiv.style.display = "none";
      finishedDiv.style.display = "none";
      addtasksDiv.style.display = "none";
    });
  
    confirmationBtn.addEventListener("click", () => {
      allTasksDiv.style.display = "none";
      confirmationDiv.style.display = "block";
      finishedDiv.style.display = "none";
      addtasksDiv.style.display = "none";
    });
  
    finishedBtn.addEventListener("click", () => {
      allTasksDiv.style.display = "none";
      confirmationDiv.style.display = "none";
      finishedDiv.style.display = "block";
      addtasksDiv.style.display = "none";
    });
    addtasksBtn.addEventListener("click", () => {
        allTasksDiv.style.display = "none";
        confirmationDiv.style.display = "none";
        finishedDiv.style.display = "none";
        addtasksDiv.style.display = "block";
    });
  
});



