import fullScreen from "./assets/fullscreen_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";
import minimize from "./assets/close_fullscreen_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";
import edit from "./assets/edit_16dp_666666_FILL0_wght400_GRAD0_opsz20.svg"

import expandTask from "./expandTask";
import deleteTask from "./deleteTask";

const renderTask = (taskDiv, taskObj) => {
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

    const taskDueDate = document.createElement("p");
    taskDueDate.textContent = `Deadline: ${taskObj.dueDate}`;
    taskDiv.appendChild(taskDueDate);

    const expandButton = document.createElement("button");
    expandButton.style.background = `url(${fullScreen})`;
    expandButton.className = "task-expand-btn";
    taskDiv.appendChild(expandButton);

    const taskEditButton = document.createElement("button");
    taskEditButton.className = "task-edit-btn hidden";
    taskEditButton.style.background = `url(${edit})`;
    taskDiv.appendChild(taskEditButton);

    const taskCharacteristics = document.createElement("div");
    taskCharacteristics.className = "task-characteristics";
    taskDiv.appendChild(taskCharacteristics);

    // listener for opening the full task view
    expandButton.addEventListener("click", () => {
        expandTask(taskDiv, taskObj, expandButton, taskEditButton, taskCharacteristics)
    })
}

export default renderTask;