import fullScreen from "./assets/fullscreen_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";
import minimize from "./assets/close_fullscreen_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";

const expandTask = (taskDiv, taskObj) => {
    const taskTitle = document.createElement("h3");
    taskTitle.className = "task-title";
    taskTitle.textContent = taskObj.title;
    taskDiv.appendChild(taskTitle);

    const taskStatus = document.createElement("div");
    taskStatus.className = "task-status";
    const taskStatusText = document.createElement("p");
    taskStatusText.textContent = `Status: ${taskObj.status}`;
    taskStatus.appendChild(taskStatusText);
    const taskStatusSymbol = document.createElement("div");
    taskStatusSymbol.className = "task-status-symbol";
    taskStatus.appendChild(taskStatusSymbol);
    taskDiv.appendChild(taskStatus);

    const taskDueDate = document.createElement("p");
    taskDueDate.textContent = `Deadline: ${taskObj.dueDate}`;
    taskDiv.appendChild(taskDueDate);

    const taskCharacteristics = document.createElement("div");
    taskCharacteristics.className = "task-characteristics";
    taskDiv.appendChild(taskCharacteristics);

    // changing taskDiv color based on task status
    switch(taskObj.status) {
        case 'Not started':
            taskStatusSymbol.style.backgroundColor = "lightgray";
            break;
        case 'Ongoing':
            taskStatusSymbol.style.backgroundColor = "yellow";
            break;
        case 'Completed':
            taskStatusSymbol.style.backgroundColor = "green";
            break;
    }

    const expandButton = document.createElement("button");
    expandButton.style.background = `url(${fullScreen})`;
    expandButton.className = "task-expand-btn";

    taskDiv.appendChild(expandButton);

    // listener for opening the full task view
    expandButton.addEventListener("click", () => {
        if (taskDiv.className === "task mini") {
            taskDiv.classList.remove("mini");

            const taskDescription = document.createElement("p");
            taskDescription.textContent = taskObj.description;
            taskCharacteristics.appendChild(taskDescription);

            const taskPriority = document.createElement("p");
            taskPriority.textContent = `Priority: ${taskObj.priority}`;
            
            taskCharacteristics.appendChild(taskPriority);

            const taskProject = document.createElement("p");
            taskProject.textContent = `Project: #${taskObj.project}`;
            taskCharacteristics.appendChild(taskProject);

            expandButton.style.background = `url(${minimize})`;
        } else {
            taskDiv.classList.add("mini");
            expandButton.style.background = `url(${fullScreen})`;
            taskCharacteristics.textContent = "";
        }
    })
}

export default expandTask;