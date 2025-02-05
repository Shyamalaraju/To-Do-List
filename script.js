const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const clearButton = document.getElementById("clear-button");

function AddTask() {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    li.textContent = inputBox.value;

    // Create span to hold both edit and delete buttons
    let span = document.createElement("span");

    // Create edit icon
    let editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen");
    editIcon.style.color = "orange";
    editIcon.addEventListener("click", function () {
      const newTask = prompt("Edit your task:", li.textContent);
      if (newTask) {
        li.firstChild.textContent = newTask;
        saveData();
      }
    });

    // Create delete icon
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash");
    deleteIcon.style.color = "red";
    deleteIcon.addEventListener("click", function () {
      li.remove();
      saveData();
    });

    // Append edit and delete icons to the span
    span.appendChild(editIcon);
    span.appendChild(deleteIcon);

    // Append the span to the li
    li.appendChild(span);
    listContainer.appendChild(li);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  }
});

function saveData() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}

// Load saved data on page refresh
function showTask() {
  listContainer.innerHTML = localStorage.getItem("tasks") || "";

  // Re-attach delete event listeners after reloading
  document.querySelectorAll("li span i").forEach(icon => {
    icon.addEventListener("click", function () {
      const li = icon.parentElement.parentElement;
      li.remove();
      saveData();
    });
  });

  // Re-attach edit event listeners after reloading
  document.querySelectorAll("li span i.fa-pen").forEach(icon => {
    icon.addEventListener("click", function () {
      const li = icon.parentElement.parentElement;
      const newTask = prompt("Edit your task:", li.firstChild.textContent);
      if (newTask) {
        li.firstChild.textContent = newTask;
        saveData();
      }
    });
  });
}

// Function to clear all tasks
function clearAllTasks() {
  localStorage.removeItem("tasks");
  listContainer.innerHTML = "";
}

// Attach event listener to clear button
clearButton.addEventListener("click", clearAllTasks);

showTask();
