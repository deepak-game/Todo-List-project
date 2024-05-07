//Selecting all DOM Elements
const enterTaskEl = document.querySelector(".enter-task-name");
const displayTaskEl = document.querySelector(".todos-task");
const taskCounterEl = document.querySelector(".total-counter");
const taskStatusEl = document.querySelector(".task-status");
const addTaskBtn = document.querySelector(".add-task-btn");
const taskBtns = document.querySelectorAll(".task-btn");
const markAllTask = document.querySelector(".all-task");
const deletCompletedTaskBtn = document.querySelector(
  ".clear-completed-task-btn"
);

//EventListener on tk input
enterTaskEl.addEventListener("input", (e) => {
  if (e.target.value.trim().length) {
    addTaskBtn.style.display = "inline-block";
  } else {
    addTaskBtn.style.display = "none";
  }
});

//Event listener to add task
addTaskBtn.addEventListener("click", () => {
  displayTask(enterTaskEl.value);
  enterTaskEl.value = "";
  addTaskBtn.style.display = "none";
});

//clear completed task event listener
deletCompletedTaskBtn.addEventListener("click", clearCompletedTask);

//event lsitener to delete task

//Event listener on task button to make selected btn active
taskBtns.forEach((task) => {
  task.addEventListener("click", (e) => {
    changeActiveTaskBtn(e.target);
    updateTaskCount();
  });
});

//Function to update task
function displayTask(input) {
  // const li = `<li><input type="radio"/>${input}</li>`;
  const li = `<li class="entered-task">
    <input type="radio" />${input}
    <button class="delete-task-btn">X
    </button>
  </li>`;
  displayTaskEl.insertAdjacentHTML("beforeend", li);
  updateTaskCount();

  //code to handle selection and deselection
  const taskRadioBtns = document.querySelectorAll("input[type='radio']");
  taskRadioBtns[taskRadioBtns.length - 1].addEventListener("click", (e) => {
    const parentEl = e.target.parentElement;
    if (!parentEl.classList.contains("success")) {
      parentEl.classList.add("success");
      updateTaskCount();
      markAllTaskCompleted();
    } else {
      parentEl.classList.remove("success");
      e.target.checked = false;
      updateTaskCount();
      markAllTaskCompleted();
    }
  });

  //code to delete each task
  const deleteTaskBtns = document.querySelectorAll(".delete-task-btn");
  deleteTaskBtns[deleteTaskBtns.length - 1].addEventListener("click", (e) => {
    deleteTask(e.target);
  });
}

//function to delete task
function deleteTask(input) {
  const allTask = document.querySelectorAll("li");
  const parent = input.parentElement;
  allTask.forEach((task) => {
    if (task === parent) {
      task.remove();
      updateTaskCount();
    }
  });
}

//function to update task count
function taskStatusCount(input, status) {
  taskCounterEl.innerText = input;
  taskStatusEl.innerText = status;
}

//function to remove display style from task
function removeDisplay() {
  const allTask = document.querySelectorAll("li");
  allTask.forEach((task) => {
    task.style.display = "block";
  });
}

//function to change active task btn
function changeActiveTaskBtn(input) {
  taskBtns.forEach((task) => {
    if (task === input) {
      task.classList.add("active");
    } else {
      task.classList.remove("active");
    }
  });
}

//Function to update task count
function updateTaskCount() {
  const allTask = document.querySelectorAll("li");
  const activeTaskBtn = document.querySelector(".task-btn.active");

  if (activeTaskBtn.textContent === "Uncompleted") {
    displayUncompletedTask();
  } else if (activeTaskBtn.textContent === "Completed") {
    displayCompletedTask();
  } else {
    displayAllTask();
  }

  if (allTask.length === 0) {
    console.log("clear task");
    markAllTask.classList.remove("completed");
  }
}

//function to display uncompleted task
function displayUncompletedTask() {
  const allTask = document.querySelectorAll("li");
  removeDisplay();
  allTask.forEach((task) => {
    if (task.classList.contains("success")) {
      task.style.display = "none";
    }
  });

  const unCompTask = document.querySelectorAll("li:not(.success)");
  taskStatusCount(unCompTask.length, "task left");
}

//function to display completed task
function displayCompletedTask() {
  const allTask = document.querySelectorAll("li");
  removeDisplay();
  allTask.forEach((task) => {
    if (!task.classList.contains("success")) {
      task.style.display = "none";
    }
  });

  const compTask = document.querySelectorAll("li.success");
  taskStatusCount(compTask.length, "task completed");
}

//fuction to display all task
function displayAllTask() {
  const allTask = document.querySelectorAll("li");
  removeDisplay();
  taskStatusCount(allTask.length, "task total");
}

//fnction to mark all task completed
function markAllTaskCompleted() {
  const allTask = document.querySelectorAll("li");
  let taskCount = 0;
  allTask.forEach((task) => {
    if (task.classList.contains("success")) {
      taskCount++;
    }
  });

  if (taskCount === allTask.length) {
    markAllTask.classList.add("completed");
  } else {
    markAllTask.classList.remove("completed");
  }
}

//function to deleted completed task
function clearCompletedTask() {
  const allTask = document.querySelectorAll("li");
  allTask.forEach((task) => {
    if (task.classList.contains("success")) {
      task.remove();
      updateTaskCount();
    }
  });
}
