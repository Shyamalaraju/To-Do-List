const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const clearButton = document.getElementById("clear-button");

function AddTask() {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    li.textContent = inputBox.value;
    
    let span = document.createElement("span");
    span.innerHTML = '<i class="fa-solid fa-trash" style="color: red;"></i>';
    
    // Delete button click event
    span.addEventListener("click", function () {
      li.remove();
      saveData();
    });

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
  document.querySelectorAll("li span").forEach(span => {
    span.addEventListener("click", function () {
      span.parentElement.remove();
      saveData();
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
