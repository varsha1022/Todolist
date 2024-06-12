// Load tasks from storage when the page loads
window.onload = function () {
  let savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    document.getElementById("tasks").innerHTML = savedTasks;
    attachDeleteEvents();
  }
};

// Function to attach delete events to the delete buttons
function attachDeleteEvents() {
  let deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach(function (button) {
    button.onclick = function () {
      button.parentElement.remove();
      saveTasks(); // Save tasks after deletion
    };
  });
}

// Function to save tasks to local storage
function saveTasks() {
  let tasksContainer = document.getElementById("tasks").innerHTML;
  localStorage.setItem("tasks", tasksContainer);
}

document.querySelector("#add").onclick = function () {
  let taskInput = document.querySelector("#taskInput").value;
  if (taskInput.length === 0) {
    alert("Please enter a task.");
    return;
  }

  let tasksContainer = document.querySelector("#tasks");

  // Create a new task div
  let taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  // Create a checkbox
  let checkboxElement = document.createElement("input");
  checkboxElement.type = "checkbox";

  // Add event listener to toggle text decoration
  checkboxElement.addEventListener("change", function () {
    if (checkboxElement.checked) {
      taskNameSpan.style.textDecoration = "line-through";
    } else {
      taskNameSpan.style.textDecoration = "none";
    }
    saveTasks(); // Save tasks after checkbox state change
  });

  // Create a span for task name
  let taskNameSpan = document.createElement("span");
  taskNameSpan.textContent = taskInput;

  // Add click event listener to task name to toggle text decoration
  taskNameSpan.addEventListener("click", function () {
    if (checkboxElement.checked) {
      taskNameSpan.style.textDecoration = "none";
      checkboxElement.checked = false;
    } else {
      taskNameSpan.style.textDecoration = "line-through";
      checkboxElement.checked = true;
    }
    saveTasks(); // Save tasks after text decoration change
  });

  // Create a button for deleting task
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("bi", "bi-trash");
  deleteButton.appendChild(deleteIcon);

  deleteButton.onclick = function () {
    // Remove the parent taskDiv when the delete button is clicked
    tasksContainer.removeChild(taskDiv);
    saveTasks(); // Save tasks after deletion
  };

  // Append elements to task div
  taskDiv.appendChild(checkboxElement);
  taskDiv.appendChild(taskNameSpan);
  taskDiv.appendChild(deleteButton);

  // Append task div to tasks container
  tasksContainer.appendChild(taskDiv);

  // Clear the input field
  document.querySelector("#taskInput").value = "";

  attachDeleteEvents(); // Attach delete events to newly added delete buttons
  saveTasks(); // Save tasks after addition
};

// Functionality for the "Save" button
document.querySelector("#save").onclick = function () {
  // You can add functionality here to save tasks or perform other actions
  alert("Tasks saved!");
};
