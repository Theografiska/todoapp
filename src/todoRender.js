const todoRender = (todo) => {
    const taskSection = document.querySelector("#task-section");

    // creating a new task
    const newTaskDiv = document.createElement("div");
    newTaskDiv.className = "task";

    // adding a title
    const newTaskTitle = document.createElement("h3");
    newTaskTitle.className = "task-title"
    newTaskTitle.textContent = todo.title;
    newTaskDiv.appendChild(newTaskTitle);

    // adding a description
    const newTaskDescription = document.createElement("p");
    newTaskDescription.textContent = `${todo.description}`;
    newTaskDiv.appendChild(newTaskDescription);

    // adding a due date
    const newTaskDueDate = document.createElement("p");
    newTaskDueDate.textContent = `Due date: ${todo.dueDate}`;
    newTaskDiv.appendChild(newTaskDueDate);

    // adding a priority
    const newTaskPriority = document.createElement("p");
    newTaskPriority.textContent = `Priority: ${todo.priority}`;
    newTaskDiv.appendChild(newTaskPriority);

    // adding a status
    const newTaskStatus = document.createElement("p");
    newTaskStatus.textContent = `Status: ${todo.status}`;
    newTaskDiv.appendChild(newTaskStatus);

    // adding labels
    const newTaskLabels = document.createElement("p");
    newTaskLabels.textContent = `Labels: ${todo.labels}`;
    newTaskDiv.appendChild(newTaskLabels);

    // appending the task to the general task section
    taskSection.appendChild(newTaskDiv);
}

export default todoRender;