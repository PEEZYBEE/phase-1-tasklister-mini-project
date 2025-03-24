const form = document.getElementById('create-task-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const taskDescription = document.getElementById('new-task-description').value;

  if (taskDescription.trim() !== '') {
    const li = document.createElement('li');
    li.textContent = taskDescription;

    const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    li.remove();  // Remove the task when clicked
  });

  li.appendChild(deleteButton);
  const taskList = document.getElementById('tasks');
  taskList.appendChild(li);

  document.getElementById('new-task-description').value = '';
  } else {
    alert('Please enter a task description');
  }
});