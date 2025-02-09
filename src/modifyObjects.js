import { initialTaskCharacteristics, renderTask, checklistFunc } from "./task.js";
import { saveToStorage } from "./utils.js";
import deleteImage from "./assets/close_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";
import edit from "./assets/edit_16dp_666666_FILL0_wght400_GRAD0_opsz20.svg";

export const deleteTask = (taskDiv, taskObj, projectObj, taskArray, projectArray) => {
    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.className = "task-delete-btn";
    taskDeleteButton.style.background = `url(${deleteImage})`;

    taskDiv.style.position = "relative"; // this is necessary in order to properly position the delete and expand elements
    taskDiv.appendChild(taskDeleteButton);

    taskDeleteButton.addEventListener("click", () => {
        // removing task from project and the DOM
        projectObj.removeTask(taskObj);
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
        // removing the project's tasks from "all tasks" array
        projectObj.tasks.forEach((task) => {
            const allTasksIndex = taskArray.findIndex(item => item.title === task.title && item.description === task.description);
            if (allTasksIndex !== -1) {
                taskArray.splice(allTasksIndex, 1);
            }        
        });

        // removing project from project array and the DOM
        const projectIndex = projectArray.findIndex(item => item.title === projectObj.title);
        if (projectIndex !== -1) {
            projectArray.splice(projectIndex, 1);
        }
        projectDiv.remove();
    
        console.log(projectArray);
        console.log(taskArray);

        // removing the project from memory
        saveToStorage("tasksArray", taskArray);
        saveToStorage("projectsArray", projectArray);
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
        titleInput.setAttribute("minlength", "3");  // Set minimum length
        titleInput.setAttribute("maxlength", "30"); // Set maximum length
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
        descriptionDiv.className = "edit-row text-area";
        const descriptionLabel = document.createElement("p");
        descriptionLabel.textContent = "Description: ";
        descriptionDiv.appendChild(descriptionLabel);
        const descriptionInput = document.createElement("textarea");
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
        const previousTitle = taskObj.title;

        // buttons to cancel or confirm edits
        const confirmSection = document.createElement("div");
        confirmSection.className = "task-edit-confirm-section";

        const cancelBtn = document.createElement("button");
        cancelBtn.className = "cancel-btn";
        cancelBtn.textContent = "cancel";
        confirmSection.appendChild(cancelBtn);

        const confirmBtn = document.createElement("button");
        confirmBtn.className = "confirm-btn";
        confirmBtn.textContent = "confirm";
        confirmSection.appendChild(confirmBtn);

        taskDiv.appendChild(confirmSection);

        // cancel button functionality (sets back to previous view)
        cancelBtn.addEventListener("click", () => {
            taskInitialCharacteristics.textContent = "";
            initialTaskCharacteristics(taskObj, taskInitialCharacteristics, taskArray, projectArray);

            taskExpandedCharacteristics.textContent = "";

            const taskDescription = document.createElement("p");
            taskDescription.textContent = `Description: ${taskObj.description}`;
            taskExpandedCharacteristics.appendChild(taskDescription);

            const taskPriority = document.createElement("p");
            taskPriority.textContent = `Priority: ${taskObj.priority}`;
            taskExpandedCharacteristics.appendChild(taskPriority);

            checklistFunc(taskExpandedCharacteristics, taskObj);

            const taskProject = document.createElement("p");
            taskProject.textContent = `#${taskObj.project}`;
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

            initialTaskCharacteristics(taskObj, taskInitialCharacteristics, taskArray, projectArray);

            taskExpandedCharacteristics.textContent = "";

            const newDescription = descriptionInput.value;
            taskObj.description = newDescription;
            const newPriority = prioritySelect.value;
            taskObj.priority = newPriority;
            const newProject = projectSelect.value;
            taskObj.project = newProject;

            const taskDescription = document.createElement("p");
            taskDescription.textContent = `Description: ${taskObj.description}`;
            taskExpandedCharacteristics.appendChild(taskDescription);

            const taskPriority = document.createElement("p");
            taskPriority.textContent = `Priority: ${taskObj.priority}`;
            taskExpandedCharacteristics.appendChild(taskPriority);

            checklistFunc(taskExpandedCharacteristics, taskObj);

            const taskProject = document.createElement("p");
            taskProject.textContent = `#${taskObj.project}`;
            taskExpandedCharacteristics.appendChild(taskProject);

            // Now explicitly update the corresponding task in taskArray
            const taskIndex = taskArray.findIndex((task) => task.title === previousTitle);
            console.log("Previous task title:", previousTitle);
            console.log("Previous task index:", taskIndex);
            if (taskIndex !== -1) {
                Object.assign(taskArray[taskIndex], taskObj); // Updates properties without replacing reference
            }

            // if task was assigned to a new project -> render the task inside a new project
            if (previousProject !== newProject) {
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

            // updating memory
            saveToStorage("tasksArray", taskArray);
            saveToStorage("projectsArray", projectArray);

            editMode = false;
            cancelBtn.remove()
            confirmBtn.remove();
            editBtn.classList.remove("hidden");
            expandBtn.classList.remove("hidden");
        })
    }
}

export const projectStatusFunc = (projectObj, projectArray, projectMainSectionDiv) => {
    const projectStatus = document.createElement("div");
    projectStatus.className = "project-status";

    const projectStatusText = document.createElement("p");
    projectStatusText.textContent = `Status: ${projectObj.status}`;
    projectStatus.appendChild(projectStatusText);

    const projectStatusSymbol = document.createElement("div");
    projectStatusSymbol.className = "project-status-symbol";
    projectStatus.appendChild(projectStatusSymbol);

    projectMainSectionDiv.appendChild(projectStatus);

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

            projectObj.changeStatus(projectObj.status);
            console.log(projectArray);

            // Explicitly update the project array
            const projectIndex = projectArray.findIndex(project => project.title === projectObj.title && project.description === projectObj.description);
            if (projectIndex !== -1) {
                Object.assign(projectArray[projectIndex], projectObj); // Updates properties without replacing reference
            }

            // updating the memory
            saveToStorage("projectsArray", projectArray);
        })
    });
}

export const editProject = (projectDiv, projectObj, projectArray, taskArray, projectMainSectionDiv) => {
    const projectEditButton = document.createElement("button");
    projectEditButton.className = "edit-project-btn";
    projectEditButton.style.background = `url(${edit})`;
    projectDiv.style.position = "relative"; // this is necessary in order to properly position the delete and expand elements
    projectDiv.appendChild(projectEditButton);

    projectEditButton.addEventListener("click", () => {
        projectEditButton.classList.add("hidden");

        let editMode = true;

        if (editMode) {
            projectMainSectionDiv.textContent = "";

            const previousProject = projectObj;
            const previousTitle = previousProject.title;

            const titleDiv = document.createElement("div");
            titleDiv.className = "edit-row";
            const titleLabel = document.createElement("p");
            titleLabel.textContent = "Title: ";
            titleDiv.appendChild(titleLabel);
            const titleInput = document.createElement("input");
            titleInput.value = projectObj.title;
            titleInput.setAttribute("minlength", "3");  // Set minimum length
            titleInput.setAttribute("maxlength", "30"); // Set maximum length
            titleDiv.appendChild(titleInput);
            projectMainSectionDiv.appendChild(titleDiv);

            const descriptionDiv = document.createElement("div");
            descriptionDiv.className = "edit-row text-area";
            const descriptionLabel = document.createElement("p");
            descriptionLabel.textContent = "Description: ";
            descriptionDiv.appendChild(descriptionLabel);
            const descriptionInput = document.createElement("textarea");
            descriptionInput.value = projectObj.description;
            descriptionDiv.appendChild(descriptionInput);
            projectMainSectionDiv.appendChild(descriptionDiv);

            const statusDiv = document.createElement("div");
            statusDiv.className = "edit-row";
            const statusLabel = document.createElement("p");
            statusLabel.textContent = "Status: ";
            statusDiv.appendChild(statusLabel);
            const previousStatus = projectObj.status; // selecting the previous choice as default option
            const statusSelect = document.createElement("select");
            const statusArray = ["Not started", "Ongoing", "Completed"];
            let statusOptions = statusArray.map(item => `<option value="${item}" ${item === previousStatus ? 'selected' : ''}>${item}</option>`).join(`\n`);
            statusSelect.innerHTML = statusOptions;        
            statusDiv.appendChild(statusSelect);
            projectMainSectionDiv.appendChild(statusDiv); 

            const notesDiv = document.createElement("div");
            notesDiv.className = "edit-row text-area";
            const notesLabel = document.createElement("p");
            notesLabel.textContent = "Notes: ";
            notesDiv.appendChild(notesLabel);
            const notesTextarea = document.createElement("textarea");
            notesTextarea.value = projectObj.notes;
            notesDiv.appendChild(notesTextarea);
            projectMainSectionDiv.appendChild(notesDiv);

            // buttons to cancel or confirm edits
            const confirmSection = document.createElement("div");
            confirmSection.className = "task-edit-confirm-section";
            const cancelBtn = document.createElement("button");
            cancelBtn.className = "cancel-btn";
            cancelBtn.textContent = "cancel";
            confirmSection.appendChild(cancelBtn);

            const confirmBtn = document.createElement("button");
            confirmBtn.className = "confirm-btn";
            confirmBtn.textContent = "confirm";
            confirmSection.appendChild(confirmBtn);

            projectMainSectionDiv.appendChild(confirmSection);

            // cancel button functionality (sets back to previous view)
            cancelBtn.addEventListener("click", () => {
                projectMainSectionDiv.textContent = "";

                const projectTitle = document.createElement("h3");
                projectTitle.className = "project-title";
                projectTitle.textContent = `#${projectObj.title}`;
                projectMainSectionDiv.appendChild(projectTitle);

                const projectDescription = document.createElement("p");
                projectDescription.textContent = `${projectObj.description}`;
                projectMainSectionDiv.appendChild(projectDescription);

                projectStatusFunc(projectObj, projectArray, projectMainSectionDiv);

                const projectNotes = document.createElement("p");
                projectNotes.textContent = `Notes: ${projectObj.notes}`;
                projectMainSectionDiv.appendChild(projectNotes);

                editMode = false;
                cancelBtn.remove();
                confirmBtn.remove();
                projectEditButton.classList.remove("hidden");

                console.log(projectArray);
                console.log(taskArray);
            });

            // confirm button functionality (updates the task object and div)
            confirmBtn.addEventListener("click", () => {
                projectMainSectionDiv.textContent = "";

                const newTitle = titleInput.value;
                const formattedTitle = newTitle.toLowerCase().replace(/\s+/g, '-'); // formating the project #like-this
                projectObj.title = formattedTitle;

                const newDescription = descriptionInput.value;
                projectObj.description = newDescription;

                const newStatus = statusSelect.value;
                projectObj.status = newStatus;

                const newNotes = notesTextarea.value;
                projectObj.notes = newNotes;

                const projectTitle = document.createElement("h3");
                projectTitle.className = "project-title";
                projectTitle.textContent = `#${formattedTitle}`;
                projectMainSectionDiv.appendChild(projectTitle);

                const projectDescription = document.createElement("p");
                projectDescription.textContent = `${projectObj.description}`;
                projectMainSectionDiv.appendChild(projectDescription);

                projectStatusFunc(projectObj, projectArray, projectMainSectionDiv);

                const projectNotes = document.createElement("p");
                projectNotes.textContent = `Notes: ${projectObj.notes}`;
                projectMainSectionDiv.appendChild(projectNotes);

                // Now explicitly update the corresponding project in projectArray
                const projectIndex = projectArray.findIndex((project) => project.title === newTitle);
                if (projectIndex !== -1) {
                    Object.assign(projectArray[projectIndex], projectObj); // Updates properties without replacing reference
                }

                // updating the project names in tasks in taskArray
                taskArray.forEach((task) => {
                    if (task.project === previousTitle) {
                        task.project = formattedTitle;
                    }
                })

                // updating memory
                saveToStorage("tasksArray", taskArray);
                saveToStorage("projectsArray", projectArray);

                editMode = false;
                cancelBtn.remove()
                confirmBtn.remove();
                projectEditButton.classList.remove("hidden");

                console.log(projectArray);
                console.log(taskArray);
            });
        }
    })
}