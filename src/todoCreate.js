import Todo from "./todoClass.js";
import todoRender from "./todoRender.js";

const todoCreate = () => {
    // opening up the dialog to get input for tasks
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
            const newTitle = document.querySelector("#title-input").value;
            const newDescription = document.querySelector("#description-input").value;
            const newDueDate = document.querySelector("#due-date-input").value;
            const newPriority = document.querySelector("#priority-input").value;
            const newStatus = document.querySelector("#status-input").value;
            const newLabels = document.querySelector("#labels-input").value;
    
            // creating a new task or todo
            const newTask = new Todo(newTitle, newDescription, newDueDate, newPriority, newStatus, newLabels);
            console.log(newTask);
            
            // rendering the new task
            todoRender(newTask); 

            // closing the dialog
            taskDialog.close();
        });

        // Mark the listener as added
        taskDialogConfirmBtn.dataset.listener = "true";
    }
}

export default todoCreate;