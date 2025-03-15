document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');
  const taskInput = document.getElementById('new-task-description');
  const prioritySelect = document.getElementById('priority');
  const dueDateInput = document.getElementById('due-date');

  // Add event listener for form submission
  form.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission behavior

    // Get the task details from the input fields
    const taskDescription = taskInput.value.trim();
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;

    if (taskDescription) {
      // Create a new list item for the task
      const taskItem = document.createElement('li');
      taskItem.textContent = `${taskDescription} - Due: ${dueDate}`;

      // Set task color based on priority
      switch (priority) {
        case 'high':
          taskItem.style.color = 'red';
          break;
        case 'medium':
          taskItem.style.color = 'yellow';
          break;
        case 'low':
          taskItem.style.color = 'green';
          break;
      }

      // Add delete and edit buttons
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-button');
      
      deleteButton.addEventListener('click', function() {
        taskItem.remove();
      });

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('edit-button');

      editButton.addEventListener('click', function() {
        taskInput.value = taskDescription;
        dueDateInput.value = dueDate;
        prioritySelect.value = priority;
        taskItem.remove();
      });

      // Append the delete and edit buttons to the task item
      taskItem.appendChild(deleteButton);
      taskItem.appendChild(editButton);

      // Append the task item to the task list
      taskList.appendChild(taskItem);

      // Clear the input fields after adding the task
      taskInput.value = '';
      dueDateInput.value = '';
      prioritySelect.value = 'low';
    }
  });

  // Sorting functionality
  document.getElementById('sort-asc').addEventListener('click', function() {
    sortTasks('asc');
  });

  document.getElementById('sort-desc').addEventListener('click', function() {
    sortTasks('desc');
  });

  function sortTasks(order) {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
      const priorityA = a.style.color;
      const priorityB = b.style.color;

      const priorityMap = {
        'red': 3,
        'yellow': 2,
        'green': 1
      };

      if (order === 'asc') {
        return priorityMap[priorityA] - priorityMap[priorityB];
      } else {
        return priorityMap[priorityB] - priorityMap[priorityA];
      }
    });

    tasks.forEach(task => taskList.appendChild(task));
  }
});
