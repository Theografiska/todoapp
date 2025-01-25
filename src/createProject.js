import Project from "./project";
import projectRender from "./projectRender";

const createProject = (projectArray, taskArray) => {
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
    
            // creating a new project object
            const newProject = new Project(formattedTitle, description, status, notes);
            
            // rendering the new project and adding to the project array
            projectRender(newProject, projectArray, taskArray);

            projectDialog.style.display = "none";

            // closing the dialog
            projectDialog.close();
        });

        // Mark the listener as added
        projectDialogConfirmBtn.dataset.listener = "true";
    }
}

export default createProject;