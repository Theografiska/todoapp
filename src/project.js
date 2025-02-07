import taskPlus from "./assets/add_circle_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";
import { format, parseISO, isBefore } from 'date-fns';

import { createTask, renderTask } from "./task.js";
import { deleteTask, deleteProject, editProject } from "./modifyObjects.js";
import { saveToStorage } from "./utils.js";

export class Project {
    constructor(title, description, status, notes, tasks = []) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.notes = notes;
        this.tasks = tasks;
        this.newProjectDiv = null; // Placeholder for the div reference
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task) {
        const taskIndex = this.tasks.indexOf(task);
        this.tasks.splice(taskIndex, 1);
    }

    changeStatus(newStatus) {
        this.status = newStatus;
    }
}

export const createProject = (projectArray, taskArray) => {
    const projectDialog = document.querySelector("#project-dialog");
    projectDialog.showModal();
    projectDialog.style.display = "flex";

    // resetting the form
    const inputClass = document.querySelectorAll(".input-class");
    inputClass.forEach((item) => {
        item.value = "";
    })

    // close button to close the dialog
    const projectDialogCloseButton = document.querySelector("#project-dialog-close-btn");
    projectDialogCloseButton.addEventListener("click", () => {
        projectDialog.style.display = "none";
        projectDialog.close();
    });

    // submitting the dialog
    const projectDialogConfirmBtn = document.querySelector("#project-dialog-confirm-btn");

    if (!projectDialogConfirmBtn.dataset.listener) { // Checks if the listener already exists to avoid duplicates
        projectDialogConfirmBtn.addEventListener("click", (event) => {
            // preventing information sending event
            event.preventDefault(); 
    
            // capturing user inputs from dialog
            const title = document.querySelector("#project-title-input").value;
            const formattedTitle = title.toLowerCase().replace(/\s+/g, '-'); // formating the project #like-this
            const description = document.querySelector("#project-description-input").value;
            const status = document.querySelector("#project-status-input").value;
            const notes = document.querySelector("#project-notes-input").value;

            // Check if all required fields are filled
            if (!title || !description || !status || !notes) {
                alert("Please fill out all required fields.");
                return; // Stop the function here if any required field is empty
            }
    
            // creating a new project object
            const newProject = new Project(formattedTitle, description, status, notes);
            
            // rendering the new project and adding to the project array
            projectRender(newProject, projectArray, taskArray);
            // adding the project to all projects array
            projectArray.push(newProject);
            console.log(projectArray);
            saveToStorage("projectsArray", projectArray);

            projectDialog.style.display = "none";

            // closing the dialog
            projectDialog.close();
        });

        // Mark the listener as added
        projectDialogConfirmBtn.dataset.listener = "true";
    }
}

export const projectRender = (projectObj, projectArray, taskArray) => {

    const projectsSection = document.querySelector("#projects-section");
    // general tasks project (displayed as just general tasks):
    if (projectObj.title === "general-tasks") {
        const tasksSection = document.querySelector("#tasks-section");
        const taskArea = document.createElement("div");
        taskArea.id = `${projectObj.title}-task-area`
        taskArea.className = "task-area";

        for (let i = 0; i < projectObj.tasks.length; i++) {
            const taskDiv = document.createElement("div");
            taskDiv.className = "task mini";

            const currentTask = projectObj.tasks[i];

            renderTask(taskDiv, currentTask, taskArray, projectArray);
            deleteTask(taskDiv, currentTask, projectObj, taskArray, projectArray) // event listener to remove task div from the DOM and allTasks array

            taskArea.appendChild(taskDiv);
        }

        tasksSection.appendChild(taskArea);
        console.log(projectObj);


    } else {  // other projects are displayed as a project card 
        const newProjectDiv = document.createElement("div");
        newProjectDiv.className = "project";
        newProjectDiv.id = `${projectObj.title}-div`;

        // adding the title, description, date, priority, status, notes
        const projectMainSection = document.createElement("div");

        const projectTitle = document.createElement("h3");
        projectTitle.className = "project-title";
        projectTitle.textContent = `#${projectObj.title}`;
        projectMainSection.appendChild(projectTitle);

        const projectDescription = document.createElement("p");
        projectDescription.textContent = `${projectObj.description}`;
        projectMainSection.appendChild(projectDescription);

        const projectStatus = document.createElement("div");
        projectStatus.className = "project-status";
        const projectStatusText = document.createElement("p");
        projectStatusText.textContent = `Status: ${projectObj.status}`;
        projectStatus.appendChild(projectStatusText);
        const projectStatusSymbol = document.createElement("div");
        projectStatusSymbol.className = "project-status-symbol";
        projectStatus.appendChild(projectStatusSymbol);
        projectMainSection.appendChild(projectStatus);

        // changing projectStatusSymbol based on project status
        switch(projectObj.status) {
            case 'Not started':
            projectStatusSymbol.style.backgroundColor = "lightgray";
            break;
        case 'Ongoing':
            projectStatusSymbol.style.backgroundColor = "yellow";
            break;
        case 'Completed':
            projectStatusSymbol.style.backgroundColor = "green";
            break;
        }

        // project status should be changeable with click:
        projectStatusSymbol.addEventListener("click", () => {
            projectStatus.textContent = "";
            projectStatus.className = "edit-row status-change";

            const statusLabel = document.createElement("p");
            statusLabel.textContent = "Status: ";
            projectStatus.appendChild(statusLabel);

            const previousStatus = projectObj.status;
            const statusArray = ["Not started", "Ongoing", "Completed"];

            const statusSelect = document.createElement("select");
            statusArray.forEach(status => {
                let option = document.createElement("option");
                option.value = status;
                option.textContent = status;
                if (status === previousStatus) option.selected = true;
                statusSelect.appendChild(option);
            });

            projectStatus.appendChild(statusSelect);

            // When status changes, update text and revert to normal display
            statusSelect.addEventListener("change", () => {
                projectObj.status = statusSelect.value;
                projectStatus.textContent = `Status: ${projectObj.status}`;
                projectStatus.className = "edit-row"; // Restore original styling
                projectStatus.appendChild(projectStatusSymbol);

                // changing taskDiv color based on task status
                switch(projectObj.status) {
                    case 'Not started':
                        projectStatusSymbol.style.backgroundColor = "lightgray";
                        break;
                    case 'Ongoing':
                        projectStatusSymbol.style.backgroundColor = "yellow";
                        break;
                    case 'Completed':
                        projectStatusSymbol.style.backgroundColor = "green";
                        break;
                }
            })

            projectObj.changeStatus(projectObj.status);
            console.log(taskArray, projectArray);

            // updating the memory
            saveToStorage("projectsArray", projectArray);
        });

        const projectNotes = document.createElement("p");
        projectNotes.textContent = `Notes: ${projectObj.notes}`;
        projectMainSection.appendChild(projectNotes);

        newProjectDiv.appendChild(projectMainSection);

        const projectTasksTitle = document.createElement("h3");
        projectTasksTitle.textContent = `Tasks:`;
        newProjectDiv.appendChild(projectTasksTitle);

        // task area
        const taskArea = document.createElement("div");
        taskArea.className = "task-area";
        taskArea.id = `${projectObj.title}-task-area`
        

        for (let i = 0; i < projectObj.tasks.length; i++) {
            // creating small versions of tasks
            const taskDiv = document.createElement("div");
            taskDiv.className = "task mini";

            const currentTask = projectObj.tasks[i];
    
            renderTask(taskDiv, currentTask, taskArray, projectArray);   
            deleteTask(taskDiv, currentTask, projectObj, taskArray, projectArray)     
    
            taskArea.appendChild(taskDiv);
        }
        newProjectDiv.appendChild(taskArea);

        // add task button inside project view
        const addTaskBtn = document.createElement("button");
        addTaskBtn.className = "add-task-btn";
        const taskPlusImg = document.createElement("div");
        taskPlusImg.className = "task-plus";
        taskPlusImg.style.background = `url(${taskPlus})`;
        addTaskBtn.appendChild(taskPlusImg);
        const taskText = document.createElement("h4");
        taskText.textContent = "Add task";
        addTaskBtn.appendChild(taskText);
        newProjectDiv.appendChild(addTaskBtn);

        addTaskBtn.addEventListener("click", () => {
            createTask(taskArray, projectArray);
        })

        // edit button functionality
        editProject(newProjectDiv, projectObj, projectArray, taskArray, projectMainSection);
        
        /// delete button functionality
        deleteProject(newProjectDiv, projectObj, projectArray, taskArray);

        projectsSection.appendChild(newProjectDiv);

        console.log(projectObj);
    }
}