const todoRender = (todo, taskArray, project) => {
    project.addTask(todo);
    taskArray.push(todo);

    /* const taskSection = document.querySelector("#task-section");

    // creating a new task
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    // adding a title
    const taskTitle = document.createElement("h3");
    taskTitle.className = "task-title"
    taskTitle.textContent = todo.title;
    taskDiv.appendChild(taskTitle);

    // adding a description
    const taskDescription = document.createElement("p");
    taskDescription.textContent = `${todo.description}`;
    taskDiv.appendChild(taskDescription);

    // adding a due date
    const taskDueDate = document.createElement("p");
    taskDueDate.textContent = `Due date: ${todo.dueDate}`;
    taskDiv.appendChild(taskDueDate);

    // adding a priority
    const taskPriority = document.createElement("p");
    taskPriority.textContent = `Priority: ${todo.priority}`;
    taskDiv.appendChild(taskPriority);

    // adding a status
    const taskStatus = document.createElement("p");
    taskStatus.textContent = `Status: ${todo.status}`;
    taskDiv.appendChild(taskStatus);

    // adding project
    const taskProject = document.createElement("p");
    taskProject.textContent = `Project: ${todo.project}`;
    taskDiv.appendChild(taskProject);

    // appending the task to the general task section
    taskSection.appendChild(taskDiv);
 */

}

export default todoRender;