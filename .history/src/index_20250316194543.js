document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#create-task-form");
  const taskList = document.querySelector("#tasks");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    
    const taskInput = document.querySelector("#new-task-description");
    const userInput = document.querySelector("#task-user");
    const dueDateInput = document.querySelector("#task-due-date");
    const priorityInput = document.querySelector("#task-priority");

    const taskText = taskInput.value.trim();
    const userText = userInput.value.trim();
    const dueDateText = dueDateInput.value.trim();
    const priorityValue = priorityInput.value;

    if (taskText === "") return; // Prevent empty tasks

    
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${taskText}</strong> (User: ${userText}, Due: ${dueDateText}) <button class="delete-btn">❌</button> <button class="edit-btn">✏️</button>`;

    
    if (priorityValue === "high") listItem.style.color = "red";
    if (priorityValue === "medium") listItem.style.color = "orange";
    if (priorityValue === "low") listItem.style.color = "green";

    listItem.dataset.priority = priorityValue; 
    taskList.appendChild(listItem);

    
    taskInput.value = "";
    userInput.value = "";
    dueDateInput.value = "";

    
    listItem.querySelector(".delete-btn").addEventListener("click", () => {
      listItem.remove();
    });

  
    listItem.querySelector(".edit-btn").addEventListener("click", () => {
      const newTaskText = prompt("Edit task:", taskText);
      if (newTaskText) {
        listItem.querySelector("strong").textContent = newTaskText;
      }
    });

    // Sort tasks after each addition
    sortTasks();
  });

  // Sorting function (ascending by priority)
  function sortTasks() {
    const tasksArray = Array.from(taskList.children);
    tasksArray.sort((a, b) => {
      const priorityLevels = { high: 1, medium: 2, low: 3 };
      return priorityLevels[a.dataset.priority] - priorityLevels[b.dataset.priority];
    });

    taskList.innerHTML = ""; // Clear and re-add sorted tasks
    tasksArray.forEach(task => taskList.appendChild(task));
  }
});
