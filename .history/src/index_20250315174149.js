document.addEventListener("DOMContentLoaded", () => {
  // Select form and task list
  const form = document.querySelector("#create-task-form");
  const taskList = document.querySelector("#tasks");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    // Select input values
    const taskInput = document.querySelector("#new-task-description");
    const userInput = document.querySelector("#task-user");
    const dueDateInput = document.querySelector("#task-due-date");
    const priorityInput = document.querySelector("#task-priority");

    const taskText = taskInput.value.trim();
    const userText = userInput.value.trim();
    const dueDateText = dueDateInput.value.trim();
    const priorityValue = priorityInput.value;

    if (taskText === "") return; // Prevent empty tasks

    // Create a new list item
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${taskText}</strong> (User: ${userText}, Due: ${dueDateText}) <button class="delete-btn">❌</button> <button class="edit-btn">✏️</button>`;

    // Apply priority color
    if (priorityValue === "high") listItem.style.color = "red";
    if (priorityValue === "medium") listItem.style.color = "orange";
    if (priorityValue === "low") listItem.style.color = "green";

    listItem.dataset.priority = priorityValue; // Store priority for sorting
    taskList.appendChild(listItem);

    // Clear input fields after submission
    taskInput.value = "";
    userInput.value = "";
    dueDateInput.value = "";

    // Delete task functionality
    listItem.querySelector(".delete-btn").addEventListener("click", () => {
      listItem.remove();
    });

    // Edit task functionality
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
