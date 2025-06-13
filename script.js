let tasks = [];

const addTask = (currentTasks, title, description) => {
    if (!title) return currentTasks;
    const newTask = {
        title,
        description,
        completed: false
    };
    return [...currentTasks, newTask]; 
};

const toggleComplete = (currentTasks, indexToToggle) =>
    currentTasks.map((task, index) =>
        index === indexToToggle ? { ...task, completed: !task.completed } : task
);

const deleteTask = (currentTasks, indexToDelete) =>
    currentTasks.filter((_, index) => index !== indexToDelete); 

const editTask = (currentTasks, indexToEdit, newTitle, newDesc) =>
    currentTasks.map((task, index) => {
        if (index === indexToEdit) {
            return {
                ...task,
                title: newTitle !== null ? newTitle.trim() : task.title,
                description: newDesc !== null ? newDesc.trim() : task.description,
            };
        }
        return task;
    });
    
const renderTasksRecursive = (tasksToRender, listElement, index = 0) => {
    if (index >= tasksToRender.length) {
        return; 
    }

    const task = tasksToRender[index];
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";
    taskInfo.innerHTML = `<strong>${task.title}</strong><br>${task.description}`;

    const actions = document.createElement("div");
    actions.className = "actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.completed ? "Undo" : "Complete";
    toggleBtn.onclick = () => {
        tasks = toggleComplete(tasks, index);
        renderTasks();
    };
    
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
        const newTitle = prompt("Edit task title:", task.title);
        const newDesc = prompt("Edit task description:", task.description);
        tasks = editTask(tasks, index, newTitle, newDesc);
        renderTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
        tasks = deleteTask(tasks, index);
        renderTasks();
    };

    actions.appendChild(toggleBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(taskInfo);
    li.appendChild(actions);
    listElement.appendChild(li);

    renderTasksRecursive(tasksToRender, listElement, index + 1);
};

const renderTasks = () => {
    const list = document.getElementById("taskList");
    list.innerHTML = ""; 
    renderTasksRecursive(tasks, list);
};

const handleAddTask = () => {
    const title = document.getElementById("taskTitle").value.trim();
    const description = document.getElementById("taskDescription").value.trim();

    tasks = addTask(tasks, title, description); 
    renderTasks();

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
};

renderTasks();