// ==========================
// TASK DATA STORAGE
// ==========================
let tasks = [];

// ==========================
// ADD TASK
// ==========================
function addTask() {
    try {
        const taskInput = document.getElementById("taskInput");
        const taskText = taskInput.value.trim();

        // Exception handling requirement
        if (taskText === "") {
            throw new Error("Task cannot be empty.");
        }

        // Add task object (better structure than plain string)
        const task = {
            id: Date.now(),
            name: taskText,
            completed: false
        };

        tasks.push(task);

        taskInput.value = "";

        displayTasks();

        Swal.fire("Success", "Task added successfully!", "success");

    } catch (error) {
        Swal.fire("Error", error.message, "error");
    }
}

// ==========================
// DISPLAY TASKS
// ==========================
function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");

        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <span>${task.name}</span>
            <div>
                <button onclick="toggleTask(${task.id})">✔</button>
                <button onclick="deleteTask(${task.id})">🗑</button>
            </div>
        `;

        taskList.appendChild(li);
    });

    showStats();
}

// ==========================
// DELETE TASK
// ==========================
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    displayTasks();
}

// ==========================
// TOGGLE COMPLETE
// ==========================
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });

    displayTasks();
}

// ==========================
// ES6 FUNCTION DEMO (FILTER)
// ==========================
function getCompletedTasks() {
    return tasks.filter(task => task.completed);
}

// ==========================
// ES6 FUNCTION DEMO (MAP)
// ==========================
function getTaskNames() {
    return tasks.map(task => task.name);
}

// ==========================
// ES6 FUNCTION DEMO (REDUCE)
// ==========================
function countTasks() {
    return tasks.reduce((total) => total + 1, 0);
}

// ==========================
// RECURSION EXAMPLE
// (Counts tasks recursively)
// ==========================
function recursiveCount(index = 0) {
    if (index >= tasks.length) {
        return 0;
    }
    return 1 + recursiveCount(index + 1);
}

// ==========================
// SHOW STATS
// ==========================
function showStats() {
    console.log("Total tasks:", countTasks());
    console.log("Completed tasks:", getCompletedTasks().length);
    console.log("Recursive count:", recursiveCount());
}