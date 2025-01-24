import Project from "./projectClass.js";
import projectRender from "./projectRender.js";

const projectCreate = (projectArray, taskArray) => {
    // opening up the dialog to get input for tasks
    const projectDialog = document.querySelector("#project-dialog");
    projectDialog.showModal();

    // resetting the form
    const inputClass = document.querySelectorAll(".input-class");
    inputClass.forEach((item) => {
        item.value = "";
    })

    // close button to close the dialog
    const projectDialogCloseButton = document.querySelector("#project-dialog-close-btn");
    projectDialogCloseButton.addEventListener("click", () => {
        projectDialog.close();
    });

    // submiting the dialog
    const projectDialogConfirmButton = document.querySelector("#project-dialog-confirm-btn");

    if (!projectDialogConfirmButton.dataset.listener) { // Checks if the listener already exists to avoid duplicates
        projectDialogConfirmButton.addEventListener("click", (event) => {
            // preventing information sending event
            event.preventDefault(); 
    
            // capturing user inputs from dialog
            const projectTitle = document.querySelector("#project-title-input").value;
            const projectDescription = document.querySelector("#project-description-input").value;
            const projectDueDate = document.querySelector("#project-due-date-input").value;
            const projectPriority = document.querySelector("#project-priority-input").value;
            const projectStatus = document.querySelector("#project-status-input").value;
            const projectTasks = [];
            const projectNotes = document.querySelector("#project-notes-input").value;
    
            // creating a new task or todo
            const newProject = new Project(projectTitle, projectDescription, projectDueDate, projectPriority, projectStatus, projectTasks, projectNotes);
            console.log(newProject);
            
            // rendering the new task
            projectRender(newProject, projectArray, taskArray); 

            // closing the dialog
            projectDialog.close();
        });

        // Mark the listener as added
        projectDialogConfirmButton.dataset.listener = "true";
    }
}

export default projectCreate;