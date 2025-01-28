import { deleteTask, editTask } from "./modifyObjects.js";

import fullScreen from "./assets/fullscreen_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";
import minimize from "./assets/close_fullscreen_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";

export class Task {
    constructor(title, description, dueDate, priority, status, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.project = project;
    }
}

export const initialTaskCharacteristics = (taskObj, taskInitialCharacteristicsDiv) => {
    const taskTitle = document.createElement("h3");
    taskTitle.className = "task-title";
    taskTitle.textContent = taskObj.title;
    taskInitialCharacteristicsDiv.appendChild(taskTitle);

    const taskStatus = document.createElement("div");
    taskStatus.className = "task-status";
    const taskStatusText = document.createElement("p");
    taskStatusText.textContent = `Status: ${taskObj.status}`;
    taskStatus.appendChild(taskStatusText);
    const taskStatusSymbol = document.createElement("div");
    taskStatusSymbol.className = "task-status-symbol";
    taskStatus.appendChild(taskStatusSymbol);
    taskInitialCharacteristicsDiv.appendChild(taskStatus);

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
    taskInitialCharacteristicsDiv.appendChild(taskDueDate);
}

export const expandTask = (taskDiv, taskObj, taskArray, projectArray, expandBtn, editBtn, taskInitialCharacteristics, taskExpandedCharacteristics) => {
    // listener for opening the full task view
    if (taskDiv.className === "task mini") {
        taskDiv.classList.remove("mini");
        editBtn.classList.remove("hidden");

        const taskDescription = document.createElement("p");
        taskDescription.textContent = taskObj.description;
        taskExpandedCharacteristics.appendChild(taskDescription);

        const taskPriority = document.createElement("p");
        taskPriority.textContent = `Priority: ${taskObj.priority}`;
        taskExpandedCharacteristics.appendChild(taskPriority);

        const taskProject = document.createElement("p");
        taskProject.textContent = `Project: #${taskObj.project}`;
        taskExpandedCharacteristics.appendChild(taskProject);

        expandBtn.style.background = `url(${minimize})`;

        // add functionality for editing data
        if (!editBtn.dataset.listener) {
            editBtn.addEventListener("click", () => {
                editTask(taskDiv, taskObj, taskArray, projectArray, editBtn, expandBtn, taskInitialCharacteristics, taskExpandedCharacteristics)
            })

            editBtn.dataset.listener = "true";
        }

    } else {
        taskDiv.classList.add("mini");
        editBtn.classList.add("hidden");
        expandBtn.style.background = `url(${fullScreen})`;
        taskExpandedCharacteristics.textContent = "";
    }
}

export const createTask = (taskArray, projectArray) => {
    // populating the select items through JavaScript
    let taskProjectSelect = document.querySelector("#task-project-input");
    let options = projectArray.map(item => `<option value="${item.title}">${item.title}</option>`).join(`\n`);
    taskProjectSelect.innerHTML = options;

    const taskDialog = document.querySelector("#task-dialog");
    taskDialog.showModal();
    taskDialog.style.display = "flex";

    // resetting the form
    const inputClass = document.querySelectorAll(".input-class");
    inputClass.forEach((item) => {
        item.value = "";
    })

    // close button to close the dialog
    const taskDialogCloseButton = document.querySelector("#task-dialog-close-btn");
    taskDialogCloseButton.addEventListener("click", () => {
        taskDialog.style.display = "none";
        taskDialog.close();
    });

    // submiting the dialog
    const taskDialogConfirmBtn = document.querySelector("#task-dialog-confirm-btn");

    if (!taskDialogConfirmBtn.dataset.listener) { // Checks if the listener already exists to avoid duplicates
        taskDialogConfirmBtn.addEventListener("click", (event) => {
            // preventing information sending event
            event.preventDefault(); 
    
            // capturing user inputs from dialog
            const title = document.querySelector("#task-title-input").value;
            const description = document.querySelector("#task-description-input").value;
            const dueDate = document.querySelector("#task-due-date-input").value;
            const priority = document.querySelector("#task-priority-input").value;
            const status = document.querySelector("#task-status-input").value;
            const taskProject = document.querySelector("#task-project-input").value;
    
            // creating a new task object
            const newTask = new Task(title, description, dueDate, priority, status, taskProject);
            const taskDiv = document.createElement("div");
            taskDiv.className = "task mini";

            const currentProject = projectArray.find((item) => item.title === taskProject);

            // adding the task to a project
            const projectTaskArea = document.querySelector(`#${taskProject}-task-area`);
            renderTask(taskDiv, newTask, taskArray, projectArray);
            deleteTask(taskDiv, newTask, currentProject, taskArray);
            currentProject.addTask(newTask);
                    
            projectTaskArea.appendChild(taskDiv);

            // adding the task to all tasks array
            taskArray.push(newTask);
            console.log(currentProject);
            console.log(taskArray)

            taskDialog.style.display = "none";

            // closing the dialog
            taskDialog.close();
        });

        // Mark the listener as added
        taskDialogConfirmBtn.dataset.listener = "true";
    }
}

export const renderTask = (taskDiv, taskObj, taskArray, projectArray) => {
    const taskInitialCharacteristics = document.createElement("div");

    initialTaskCharacteristics(taskObj, taskInitialCharacteristics);

    const expandButton = document.createElement("button");
    expandButton.style.background = `url(${fullScreen})`;
    expandButton.className = "task-expand-btn";
    taskDiv.appendChild(expandButton);

    const taskEditButton = document.createElement("button");
    taskEditButton.className = "task-edit-btn hidden";
    taskDiv.appendChild(taskEditButton);

    taskDiv.appendChild(taskInitialCharacteristics);

    const taskExpandedCharacteristics = document.createElement("div");
    taskExpandedCharacteristics.className = "task-expanded-characteristics";
    taskDiv.appendChild(taskExpandedCharacteristics);

    // listener for opening the full task view
    expandButton.addEventListener("click", () => {
        expandTask(taskDiv, taskObj, taskArray, projectArray, expandButton, taskEditButton, taskInitialCharacteristics, taskExpandedCharacteristics)
    })
}