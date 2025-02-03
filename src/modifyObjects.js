import { initialTaskCharacteristics, expandTask, renderTask } from "./task.js";
import { saveToStorage, loadFromStorage } from "./utils.js";
import { Project } from "./project.js";
import deleteImage from "./assets/close_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";

export const deleteTask = (taskDiv, taskObj, projectObj, taskArray, projectArray) => {
    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.className = "task-delete-btn";
    taskDeleteButton.style.background = `url(${deleteImage})`;

    taskDiv.style.position = "relative"; // this is necessary in order to properly position the delete and expand elements
    taskDiv.appendChild(taskDeleteButton);

    taskDeleteButton.addEventListener("click", () => {
        // removing task from project and the DOM
        /* const taskIndex = projectObj.tasks.indexOf(taskObj);
        projectObj.tasks.splice(taskIndex, 1); */
        projectObj.tasks = projectObj.tasks.filter(task => task !== taskObj);
        taskDiv.remove();

        // removing task from all tasks array
        const allTasksIndex = taskArray.findIndex(task => task.title === taskObj.title && task.description === taskObj.description);
        if (allTasksIndex !== -1) {
            taskArray.splice(allTasksIndex, 1);
        }
        console.log(taskArray);

        // removing the task from memory
        saveToStorage("tasksArray", taskArray);
        saveToStorage("projectsArray", projectArray);

    })
}

export const deleteProject = (projectDiv, projectObj, projectArray, taskArray) => {
    const projectDeleteButton = document.createElement("button");
    projectDeleteButton.className = "project-delete-btn";
    projectDeleteButton.style.background = `url(${deleteImage})`;

    projectDiv.style.position = "relative"; // this is necessary in order to properly position the delete and expand elements
    projectDiv.appendChild(projectDeleteButton);

    projectDeleteButton.addEventListener("click", () => {
        // removing all tasks from "all tasks" array
        const allProjectTasks = projectObj.tasks;
        allProjectTasks.forEach((task) => {
            const allTasksIndex = taskArray.indexOf(task);
            taskArray.splice(allTasksIndex, 1);
        })

        // removing project from project array and the DOM
        const projectIndex = projectArray.indexOf(projectObj);
        projectArray.splice(projectIndex, 1);
        projectDiv.remove();
    
        console.log(projectArray);
        console.log(taskArray);
    })
}

export const editTask = (taskDiv, taskObj, taskArray, projectArray, editBtn, expandBtn, taskInitialCharacteristics, taskExpandedCharacteristics) => {
    editBtn.classList.add("hidden");
    expandBtn.classList.add("hidden");

    let editMode = true;

    if (editMode) {
        taskInitialCharacteristics.textContent = "";

        const titleDiv = document.createElement("div");
        titleDiv.className = "edit-row";
        const titleLabel = document.createElement("p");
        titleLabel.textContent = "Title: ";
        titleDiv.appendChild(titleLabel);
        const titleInput = document.createElement("input");
        titleInput.value = taskObj.title;
        titleDiv.appendChild(titleInput);
        taskInitialCharacteristics.appendChild(titleDiv);

        const statusDiv = document.createElement("div");
        statusDiv.className = "edit-row";
        const statusLabel = document.createElement("p");
        statusLabel.textContent = "Status: ";
        statusDiv.appendChild(statusLabel);
        const previousStatus = taskObj.status; // selecting the previous choice as default option
        const statusSelect = document.createElement("select");
        const statusArray = ["Not started", "Ongoing", "Completed"];
        let statusOptions = statusArray.map(item => `<option value="${item}" ${item === previousStatus ? 'selected' : ''}>${item}</option>`).join(`\n`);
        statusSelect.innerHTML = statusOptions;        
        statusDiv.appendChild(statusSelect);
        taskInitialCharacteristics.appendChild(statusDiv); 

        const previousDueDate = taskObj.dueDate;

        const dueDateDiv = document.createElement("div");
        dueDateDiv.className = "edit-row";
        const dueDateLabel = document.createElement("p");
        dueDateLabel.textContent = "Due date: ";
        dueDateDiv.appendChild(dueDateLabel);
        const dueDateInput = document.createElement("input");
        dueDateInput.value = previousDueDate;
        dueDateInput.type = "date";  // to ensure it's a date picker
        dueDateDiv.appendChild(dueDateInput);
        taskInitialCharacteristics.appendChild(dueDateDiv);

        taskExpandedCharacteristics.textContent = "";

        const descriptionDiv = document.createElement("div");
        descriptionDiv.className = "edit-row";
        const descriptionLabel = document.createElement("p");
        descriptionLabel.textContent = "Description: ";
        descriptionDiv.appendChild(descriptionLabel);
        const descriptionInput = document.createElement("input");
        descriptionInput.value = taskObj.description;
        descriptionDiv.appendChild(descriptionInput);
        taskExpandedCharacteristics.appendChild(descriptionDiv);

        const priorityDiv = document.createElement("div");
        priorityDiv.className = "edit-row";
        const priorityLabel = document.createElement("p");
        priorityLabel.textContent = "Priority: ";
        priorityDiv.appendChild(priorityLabel);
        const prioritySelect = document.createElement("select");
        const previousPriority = taskObj.priority; // selecting the previous choice as default option
        const priorityArray = ["Low", "Medium", "High"];
        let priorityOptions = priorityArray.map(item => `<option value="${item}" ${item === previousPriority ? 'selected' : ''}>${item}</option>`).join(`\n`);
        prioritySelect.innerHTML = priorityOptions;        
        priorityDiv.appendChild(prioritySelect);
        taskExpandedCharacteristics.appendChild(priorityDiv);

        const projectRowDiv = document.createElement("div");
        projectRowDiv.className = "edit-row";
        const projectLabel = document.createElement("p");
        projectLabel.textContent = "Project: ";
        projectRowDiv.appendChild(projectLabel);
        const projectSelect = document.createElement("select");
        const previousProject = taskObj.project; // selecting the previous choice as default option
        let projectOptions = projectArray.map(item => `<option value="${item.title}" ${item.title === previousProject ? 'selected' : ''}>${item.title}</option>`).join(`\n`);
        projectSelect.innerHTML = projectOptions;        
        projectRowDiv.appendChild(projectSelect);
        taskExpandedCharacteristics.appendChild(projectRowDiv);

        const previousTask = taskObj; // this is needed later when changing the project

        // buttons to cancel or confirm edits
        const confirmSection = document.createElement("div");
        confirmSection.className = "task-edit-confirm-section";
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "cancel";
        confirmSection.appendChild(cancelBtn);

        const confirmBtn = document.createElement("button");
        confirmBtn.textContent = "confirm";
        confirmSection.appendChild(confirmBtn);

        // cancel button functionality (sets back to previous view)
        cancelBtn.addEventListener("click", () => {
            taskInitialCharacteristics.textContent = "";
            initialTaskCharacteristics(taskObj, taskInitialCharacteristics);

            taskExpandedCharacteristics.textContent = "";
            const taskDescription = document.createElement("p");
            taskDescription.textContent = taskObj.description;
            taskExpandedCharacteristics.appendChild(taskDescription);

            const taskPriority = document.createElement("p");
            taskPriority.textContent = `Priority: ${taskObj.priority}`;
            taskExpandedCharacteristics.appendChild(taskPriority);

            const taskProject = document.createElement("p");
            taskProject.textContent = `Project: #${taskObj.project}`;
            taskExpandedCharacteristics.appendChild(taskProject);

            editMode = false;
            cancelBtn.remove();
            confirmBtn.remove();
            editBtn.classList.remove("hidden");
            expandBtn.classList.remove("hidden");
        })
        
        // confirm button functionality (updates the task object and div)
        confirmBtn.addEventListener("click", () => {
            taskInitialCharacteristics.textContent = "";

            const newTitle = titleInput.value;
            taskObj.title = newTitle;
            const newStatus = statusSelect.value;
            taskObj.status = newStatus;
            const newDueDate = dueDateInput.value;
            taskObj.dueDate = newDueDate;

            initialTaskCharacteristics(taskObj, taskInitialCharacteristics);

            taskExpandedCharacteristics.textContent = "";

            const newDescription = descriptionInput.value;
            taskObj.description = newDescription;
            const newPriority = prioritySelect.value;
            taskObj.priority = newPriority;
            const newProject = projectSelect.value;
            taskObj.project = newProject;

            const taskDescription = document.createElement("p");
            taskDescription.textContent = taskObj.description;
            taskExpandedCharacteristics.appendChild(taskDescription);

            const taskPriority = document.createElement("p");
            taskPriority.textContent = `Priority: ${taskObj.priority}`;
            taskExpandedCharacteristics.appendChild(taskPriority);

            const taskProject = document.createElement("p");
            taskProject.textContent = `Project: #${taskObj.project}`;
            taskExpandedCharacteristics.appendChild(taskProject);

            // if project was changed -> render the task inside a new project
            if (previousProject !== newProject) {
                console.log("hi there");
                console.log(projectArray);

                // removing tasks from the current project 
                const previousProjectObj = projectArray.find((item) => item.title === previousProject);
                previousProjectObj.removeTask(previousTask);
                taskDiv.remove();

                // adding tasks to the new project
                const newProjectObj = projectArray.find((item) => item.title === taskObj.project);
                newProjectObj.addTask(taskObj);
                const newTaskDiv = document.createElement("div");
                newTaskDiv.className = "task mini";
                renderTask(newTaskDiv, taskObj, taskArray, projectArray);
                deleteTask(newTaskDiv, taskObj, newProjectObj, taskArray);
                const projectTaskArea = document.querySelector(`#${taskObj.project}-task-area`);
                projectTaskArea.appendChild(newTaskDiv);
            }

            editMode = false;
            cancelBtn.remove()
            confirmBtn.remove();
            editBtn.classList.remove("hidden");
            expandBtn.classList.remove("hidden");
        })

        taskDiv.appendChild(confirmSection);
    }

}