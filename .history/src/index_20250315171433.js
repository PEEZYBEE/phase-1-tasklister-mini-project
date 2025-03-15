document.addEventListener("DOMContentLoaded", () => {
  // your code here
  const form = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');
  const taskInput = document.getElementById('new-task-description');

  // Add event listener for form submission
  form.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission behavior

    // Get the task description from the input field
    const taskDescription = taskInput.value.trim();

    if (taskDescription) {
      // Create a new list item for the task
      const taskItem = document.createElement('li');
      taskItem.textContent = taskDescription;

      // Optionally, add a delete button to each task
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-button');
      
      // Event listener to delete the task
      deleteButton.addEventListener('click', function() {
        taskItem.remove();
      });

      // Append the delete button to the task item
      taskItem.appendChild(deleteButton);

      // Append the task item to the task list
      taskList.appendChild(taskItem);

      // Clear the input field after adding the task
      taskInput.value = '';
    }
  });
});
