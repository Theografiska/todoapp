import Todo from "./todoClass.js";
import todoRender from "./todoRender.js";

const todoCreate = (taskArray, project) => {
    return new Promise((resolve) => {
        const taskDialog = document.querySelector("#task-dialog");
        taskDialog.showModal();

        // resetting the form
        const inputClass = document.querySelectorAll(".input-class");
        inputClass.forEach((item) => {
            item.value = "";
        })

        // close button to close the dialog
        const taskDialogCloseButton = document.querySelector("#task-dialog-close-btn");
        taskDialogCloseButton.addEventListener("click", () => {
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
                const newTask = new Todo(title, description, dueDate, priority, status, taskProject);
                
                // Resolve the promise with the new task
                resolve(newTask);

                // rendering the new task
/*                 todoRender(newTask, taskArray, project);
 */ 
                // adding the task under relevant project


                // closing the dialog
                taskDialog.close();
            });

            // Mark the listener as added
            taskDialogConfirmBtn.dataset.listener = "true";
        }
    })
}

export default todoCreate;