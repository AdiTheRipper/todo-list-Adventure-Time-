// select DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// create an empty array to store tasks
let tasks = [];

// create a function to render tasks to the DOM
function renderTasks() {
    // clear the task list
    taskList.innerHTML = '';
  
    // loop through the tasks array and create a new <li> element
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      const taskContainer = document.createElement('div');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.complete;
      checkbox.addEventListener('change', () => {
        toggleComplete(index);
      });
  
      // add the checkbox to the task container
      taskContainer.appendChild(checkbox);
  
      // add the task name to the task container
      const taskName = document.createElement('span');
      taskName.innerText = task.name;
      taskContainer.appendChild(taskName);
  
      // apply the 'complete' class to the task container if the task is complete
      if (task.complete) {
        taskContainer.classList.add('complete');
      }
  
      // add the task container to the <li> element
      li.appendChild(taskContainer);
  
      // create an 'Edit' button
      const editBtn = document.createElement('button');
      editBtn.classList.add('edit');
      editBtn.innerText = '📝';
      editBtn.addEventListener('click', () => {
        editTask(index);
      });
  
      // create a 'Delete' button
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = '❌';
      deleteBtn.addEventListener('click', () => {
        deleteTask(index);
      });
  
      // add the buttons to the <li> element
      const buttonsContainer = document.createElement('div');
      buttonsContainer.classList.add('buttons-container');
      buttonsContainer.appendChild(editBtn);
      buttonsContainer.appendChild(deleteBtn);
      li.appendChild(buttonsContainer);
  
      // append the <li> element to the task list
      taskList.appendChild(li);
    });
  }
  

// create a function to add a task
function addTask(event) {
  event.preventDefault();

  // get the value of the task input
  const taskName = taskInput.value.trim();

  // return if task name is empty
  if (!taskName) {
    return;
  }

  // add the task to the tasks array
  tasks.push({
    name: taskName,
    complete: false,
  });

  // reset the task input
  taskInput.value = '';

  // render the tasks to the DOM
  renderTasks();
}

// create a function to delete a task
function deleteTask(index) {
  // remove the task from the tasks array
  tasks.splice(index, 1);

  // render the tasks to the DOM
  renderTasks();
}

// create a function to edit a task
function editTask(index) {
  // get the current task from the tasks array
  const task = tasks[index];

  // prompt the user for a new task name
  const newTaskName = prompt('Enter a new task name:', task.name);
 // update the task name if the user entered a new name
  if (newTaskName) {
    task.name = newTaskName.trim();
  }

  // render the tasks to the DOM
  renderTasks();
}

// create a function to toggle a task's completeness
function toggleComplete(index) {
  // toggle the 'complete' property of the task
  tasks[index].complete = !tasks[index].complete;

  // render the tasks to the DOM
  renderTasks();
}

// add event listeners
addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    const index = Array.from(taskList.children).indexOf(event.target);
    toggleComplete(index);
  }
});
