import { deleteTask, editTask } from "./modifyObjects.js";
import { Project } from "./project.js";
import { format, parseISO, isBefore } from 'date-fns';
import { loadFromStorage, saveToStorage } from './utils.js';

import fullScreen from "./assets/fullscreen_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";
import minimize from "./assets/close_fullscreen_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";
import calendar from "./assets/calendar_month_20dp_F0F0F0_FILL0_wght400_GRAD0_opsz20.svg";

export class Task {
    constructor(title, description, dueDate, priority, status, project, checklist = []) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.project = project;
        this.checklist = checklist;
    }

    changeStatus(newStatus) {
        this.status = newStatus;
    }

    addChecklistItem(item) {
        this.checklist.push(item);
    }

    removeChecklistItem(item) {
        const itemIndex = this.checklist.indexOf(item);
        this.checklist.splice(itemIndex, 1);
    }
}

export class ChecklistItem {
    constructor(title, status) {
        this.title = title;
        this.status = status;
    }

    changeStatus(newStatus) {
        this.status = newStatus;
    }
}

export const initialTaskCharacteristics = (taskObj, taskInitialCharacteristicsDiv, taskArray, projectArray) => {
    const taskTitle = document.createElement("h3");
    taskTitle.className = "task-title";
    taskTitle.textContent = taskObj.title;
    taskInitialCharacteristicsDiv.appendChild(taskTitle);

    const taskStatus = document.createElement("div");
    taskStatus.className = "task-status";
    const taskStatusSymbol = document.createElement("div");
    taskStatusSymbol.className = "task-status-symbol";
    taskStatus.appendChild(taskStatusSymbol);
    const taskStatusText = document.createElement("p");
    taskStatusText.textContent = `${taskObj.status}`;
    taskStatus.appendChild(taskStatusText);
    taskInitialCharacteristicsDiv.appendChild(taskStatus);

    // changing taskStatusSymbol color based on task status
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
    const taskDueDateDiv = document.createElement("div");
    taskDueDateDiv.className = "task-duedate-div";

    const taskCalElement = document.createElement("div");
    taskCalElement.className = "task-calendar-image";
    taskCalElement.style.background = `url(${calendar})`;

    const taskDueDatePara = document.createElement("p");
    const formattedDate = format(parseISO(taskObj.dueDate), "MMM dd, yyyy"); // "Jan 29, 2025"
    taskDueDatePara.innerHTML = `<span>${formattedDate}</span>`; // Wrap date in a span
    
    // Check if the due date has passed
    const todayDate = new Date();
    const dueDate = parseISO(taskObj.dueDate); // Convert string to Date object
    
    if (isBefore(dueDate, todayDate) && taskObj.status !== "Completed") {
        taskDueDatePara.querySelector("span").style.color = "red"; // Apply red color only to the date
    } else {
        taskDueDatePara.querySelector("span").style.color = "white";
    }
    taskDueDateDiv.appendChild(taskCalElement);
    taskDueDateDiv.appendChild(taskDueDatePara);
    taskInitialCharacteristicsDiv.appendChild(taskDueDateDiv);

    // task status should be changed by clicking on the symbol
    taskStatusSymbol.addEventListener("click", () => {
        taskStatusText.textContent = "Status: ";
        taskStatusSymbol.className = "task-status-symbol hidden";
        taskStatus.className = "edit-row status-change";

        const previousStatus = taskObj.status; // selecting the previous choice as default option
        const statusArray = ["Not started", "Ongoing", "Completed"];

        const statusSelect = document.createElement("select");
        statusArray.forEach(status => {
            let option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            if (status === previousStatus) option.selected = true;
            statusSelect.appendChild(option);
        });
    
        taskStatus.appendChild(statusSelect);

        // When status changes, update text and revert to normal display
        statusSelect.addEventListener("change", () => {
            taskObj.changeStatus(statusSelect.value);

            // Explicitly update the task array
            const taskIndex = taskArray.findIndex(task => task.title === taskObj.title && task.description === taskObj.description);
            if (taskIndex !== -1) {
                taskArray[taskIndex] = taskObj;  // Ensure the task is updated in the array
            }
            statusSelect.remove();
            taskStatusSymbol.className = "task-status-symbol";
            taskStatusText.textContent = `${taskObj.status}`;
            taskStatus.className = "edit-row"; // Restore original styling

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

            if (isBefore(dueDate, todayDate) && taskObj.status !== "Completed") {
                taskDueDatePara.querySelector("span").style.color = "red"; // Apply red color only to the date
            } else {
                taskDueDatePara.querySelector("span").style.color = "white";
            }

            /* taskObj.changeStatus(taskObj.status); */
            console.log(taskArray, projectArray);

            // updating the memory
            saveToStorage("tasksArray", taskArray);
            saveToStorage("projectsArray", projectArray);
        });
    })
}

export const checklistFunc = (taskExpandedCharacteristics, taskObj) => {
    const taskChecklistFieldset = document.createElement("fieldset");
    taskChecklistFieldset.className = "checkbox-fieldset";

    const taskCheckListLegend = document.createElement("legend");
    taskCheckListLegend.textContent = "Checklist";
    taskChecklistFieldset.appendChild(taskCheckListLegend);

    const taskChecklistArea = document.createElement("div");
    taskChecklistArea.className = "task-checklist-area";
    taskChecklistFieldset.appendChild(taskChecklistArea);

    taskExpandedCharacteristics.appendChild(taskChecklistFieldset);
    
    // Retrieve tasks and projects from localStorage
    const tasksArray = loadFromStorage('tasksArray').map(task => new Task(
        task.title, task.description, task.dueDate, task.priority, task.status, task.project, 
        task.checklist.map(item => new ChecklistItem(item.title, item.status))
    ));

    const projectsArray = loadFromStorage('projectsArray').map(project => new Project(
        project.title, project.description, project.status, project.notes, 
        project.tasks.map(task => new Task(
            task.title, task.description, task.dueDate, task.priority, task.status, task.project, 
            task.checklist.map(item => new ChecklistItem(item.title, item.status))
        ))
    ));

    let checkboxId = 1;

    // Clear existing checklist items to avoid duplication when adding new ones
    const existingChecklistDivs = taskChecklistFieldset.querySelectorAll(".checklist-item");
    existingChecklistDivs.forEach(item => item.remove());

    // Create existing checklist items
    taskObj.checklist.forEach((item) => {
        const checklistDiv = document.createElement("div");
        checklistDiv.className = "checklist-item"; // Optional: style for individual checklist items
        
        const checklistInput = document.createElement("input");
        checklistInput.type = "checkbox";
        checklistInput.id = `checkbox-${checkboxId}`;
        
        checklistInput.checked = item.status === "Completed";

        checklistInput.addEventListener("change", () => {
            item.status = checklistInput.checked ? "Completed" : "Not completed";
            console.log(`Updated status of "${item.title}": ${item.status}`);

            // Update tasksArray and projectsArray accordingly
            const taskIndex = tasksArray.findIndex(task => task.title === taskObj.title);
            if (taskIndex !== -1) {
                const task = tasksArray[taskIndex];
                const checklistItemIndex = task.checklist.findIndex(checklistItem => checklistItem.title === item.title);
                if (checklistItemIndex !== -1) {
                    task.checklist[checklistItemIndex].status = item.status;
                }
            }

            const projectIndex = projectsArray.findIndex(project => project.tasks.some(task => task.title === taskObj.title));
            if (projectIndex !== -1) {
                const project = projectsArray[projectIndex];
                const taskInProjectIndex = project.tasks.findIndex(task => task.title === taskObj.title);
                if (taskInProjectIndex !== -1) {
                    const taskInProject = project.tasks[taskInProjectIndex];
                    const checklistItemIndex = taskInProject.checklist.findIndex(checklistItem => checklistItem.title === item.title);
                    if (checklistItemIndex !== -1) {
                        taskInProject.checklist[checklistItemIndex].status = item.status;
                    }
                }
            }

            saveToStorage("tasksArray", tasksArray);
            saveToStorage("projectsArray", projectsArray);
        });

        checklistDiv.appendChild(checklistInput);

        const checklistLabel = document.createElement("label");
        checklistLabel.htmlFor = `checkbox-${checkboxId}`;
        checklistLabel.textContent = item.title;
        checklistDiv.appendChild(checklistLabel);

        // Create Remove Button (Small "x")
        const removeButton = document.createElement("button");
        removeButton.textContent = "x";
        removeButton.className = "remove-checklist-item"; // Optional: style for the button
        removeButton.addEventListener("click", () => {
            // Remove item from the task's checklist
            taskObj.removeChecklistItem(item);
            checklistDiv.remove();

            // Update tasksArray and projectsArray
            const taskIndex = tasksArray.findIndex(task => task.title === taskObj.title);
            if (taskIndex !== -1) {
                tasksArray[taskIndex].removeChecklistItem(item);
            }

            const projectIndex = projectsArray.findIndex(project => project.tasks.some(task => task.title === taskObj.title));
            if (projectIndex !== -1) {
                const project = projectsArray[projectIndex];
                const taskInProjectIndex = project.tasks.findIndex(task => task.title === taskObj.title);
                if (taskInProjectIndex !== -1) {
                    project.tasks[taskInProjectIndex].removeChecklistItem(item);
                }
            }

            saveToStorage("tasksArray", tasksArray);
            saveToStorage("projectsArray", projectsArray);
        });
        checklistDiv.appendChild(removeButton);

        taskChecklistArea.appendChild(checklistDiv);

        checkboxId += 1;
    });

    // Create input field for new checklist item and add button
    const newItemInput = document.createElement("input");
    newItemInput.type = "text";
    newItemInput.placeholder = "Enter new checklist item";
    newItemInput.className = "new-checklist-input";

    const addChecklistButton = document.createElement("button");
    addChecklistButton.textContent = "Add item";
    addChecklistButton.className = "add-checklist-btn";

    addChecklistButton.addEventListener("click", () => {
        const newItemTitle = newItemInput.value.trim();
        if (newItemTitle) {
            const newItem = new ChecklistItem(newItemTitle, "Not completed");
            taskObj.addChecklistItem(newItem);

            // Update tasksArray and projectsArray
            const taskIndex = tasksArray.findIndex(task => task.title === taskObj.title);
            if (taskIndex !== -1) {
                tasksArray[taskIndex].addChecklistItem(newItem);
            }

            const projectIndex = projectsArray.findIndex(project => project.tasks.some(task => task.title === taskObj.title));
            if (projectIndex !== -1) {
                const project = projectsArray[projectIndex];
                const taskInProjectIndex = project.tasks.findIndex(task => task.title === taskObj.title);
                if (taskInProjectIndex !== -1) {
                    project.tasks[taskInProjectIndex].addChecklistItem(newItem);
                }
            }

            saveToStorage("tasksArray", tasksArray);
            saveToStorage("projectsArray", projectsArray);

            // Directly append the new item to the existing fieldset without reloading the entire list
            const checklistDiv = document.createElement("div");
            checklistDiv.className = "checklist-item";
            
            const checklistInput = document.createElement("input");
            checklistInput.type = "checkbox";
            checklistInput.checked = false;

            checklistDiv.appendChild(checklistInput);

            const checklistLabel = document.createElement("label");
            checklistLabel.textContent = newItemTitle;
            checklistDiv.appendChild(checklistLabel);

            // Create the remove button for the new item
            const removeButton = document.createElement("button");
            removeButton.textContent = "x";
            removeButton.className = "remove-checklist-item";
            removeButton.addEventListener("click", () => {
                taskObj.removeChecklistItem(newItem);

                saveToStorage("tasksArray", tasksArray);
                saveToStorage("projectsArray", projectsArray);

                // Directly remove the item from the fieldset
                checklistDiv.remove();
            });
            checklistDiv.appendChild(removeButton);

            taskChecklistArea.appendChild(checklistDiv);

            // Clear the input field after adding the item
            newItemInput.value = '';
        }
    });

    taskChecklistFieldset.appendChild(newItemInput);
    taskChecklistFieldset.appendChild(addChecklistButton);
};


export const expandTask = (taskDiv, taskObj, taskArray, projectArray, expandBtn, editBtn, taskInitialCharacteristics, taskExpandedCharacteristics) => {
    // listener for opening the full task view
    if (taskDiv.className === "task mini" || taskDiv.className === "task dynamic mini") {
        taskDiv.classList.remove("mini");
        editBtn.classList.remove("hidden");

        const taskDescription = document.createElement("p");
        taskDescription.textContent = `Description: ${taskObj.description}`;
        taskExpandedCharacteristics.appendChild(taskDescription);

        const taskPriority = document.createElement("p");
        taskPriority.textContent = `Priority: ${taskObj.priority}`;
        taskExpandedCharacteristics.appendChild(taskPriority);

        checklistFunc(taskExpandedCharacteristics, taskObj);

        const taskProject = document.createElement("p");
        taskProject.className = "task-project-p";
        taskProject.textContent = `#${taskObj.project}`;
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
    const taskDialog = document.querySelector("#task-dialog");
    taskDialog.showModal();
    taskDialog.style.display = "flex";

    // populating the project select items in the form with JavaScript
    let taskProjectSelect = document.querySelector("#task-project-input");
    let options = projectArray.map(item => `<option value="${item.title}">${item.title}</option>`).join(`\n`);
    taskProjectSelect.innerHTML = options;

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
            const checklist = [];
            
            // Check if all required fields are filled
            if (!title || !description || !dueDate || !taskProject) {
                alert("Please fill out all required fields.");
                return; // Stop the function here if any required field is empty
            }

            // creating a new task object
            const newTask = new Task(title, description, dueDate, priority, status, taskProject, checklist);
            const taskDiv = document.createElement("div");
            taskDiv.className = "task mini";

            const currentProject = projectArray.find((item) => item.title === taskProject);

            // adding the task to a project
            const projectTaskArea = document.querySelector(`#${taskProject}-task-area`);
            renderTask(taskDiv, newTask, taskArray, projectArray);
            deleteTask(taskDiv, newTask, currentProject, taskArray, projectArray);
            currentProject.addTask(newTask);
                    
            projectTaskArea.appendChild(taskDiv);

            // adding the task to all tasks array
            taskArray.push(newTask);
            console.log(currentProject);
            console.log(taskArray) 

            saveToStorage("tasksArray", taskArray);
            saveToStorage("projectsArray", projectArray);

             // Refresh the page *before* the modal closes
            setTimeout(() => {
                location.reload();
            }, 100); // Delay to ensure UI updates are seen

            // closing the dialog
            taskDialog.style.display = "none";
            taskDialog.close();
        });

        // Mark the listener as added
        taskDialogConfirmBtn.dataset.listener = "true";
    }
}

export const renderTask = (taskDiv, taskObj, taskArray, projectArray) => {
    const taskInitialCharacteristics = document.createElement("div");
    taskInitialCharacteristics.className = "task-initial-char";

    initialTaskCharacteristics(taskObj, taskInitialCharacteristics, taskArray, projectArray);

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