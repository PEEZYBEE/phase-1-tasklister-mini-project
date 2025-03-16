document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.querySelector("#create-task-form");
  const taskListContainer = document.querySelector("#tasks");

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const taskDescription = document.querySelector("#new-task-description").value.trim();
    const assignedUser = document.querySelector("#task-user").value.trim();
    const dueDate = document.querySelector("#task-due-date").value.trim();
    const priority = document.querySelector("#task-priority").value;

    if (taskDescription === "") return; // Don't submit if no task description

    const newTaskItem = createTaskItem(taskDescription, assignedUser, dueDate, priority);
    taskListContainer.appendChild(newTaskItem);

    resetFormFields();
    sortTasksByPriority();
  });

  function createTaskItem(description, user, due, priority) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `<strong>${description}</strong> (Assigned to: ${user}, Due: ${due}) 
                          <button class="delete-btn">Delete</button> 
                          <button class="edit-btn">✏️</button>`;

    applyPriorityStyle(taskItem, priority);
    taskItem.dataset.priority = priority;

    addDeleteHandler(taskItem);
    addEditHandler(taskItem);

    return taskItem;
  }

  function applyPriorityStyle(taskItem, priority) {
    switch (priority) {
      case "high":
        taskItem.style.color = "red";
        break;
      case "medium":
        taskItem.style.color = "orange";
        break;
      case "low":
        taskItem.style.color = "green";
        break;
      default:
        taskItem.style.color = "black";
    }
  }

  function addDeleteHandler(taskItem) {
    taskItem.querySelector(".delete-btn").addEventListener("click", () => {
      taskItem.remove();
    });
  }

  function addEditHandler(taskItem) {
    taskItem.querySelector(".edit-btn").addEventListener("click", () => {
      const updatedDescription = prompt("Edit task:", taskItem.querySelector("strong").textContent);
      if (updatedDescription) {
        taskItem.querySelector("strong").textContent = updatedDescription;
      }
    });
  }

  function resetFormFields() {
    document.querySelector("#new-task-description").value = "";
    document.querySelector("#task-user").value = "";
    document.querySelector("#task-due-date").value = "";
  }

  function sortTasksByPriority() {
    const tasksArray = Array.from(taskListContainer.children);
    tasksArray.sort((a, b) => {
      const priorityLevels = { high: 1, medium: 2, low: 3 };
      return priorityLevels[a.dataset.priority] - priorityLevels[b.dataset.priority];
    });

    taskListContainer.innerHTML = "";
    tasksArray.forEach(task => taskListContainer.appendChild(task));
  }
});
