import Todo from "./todoClass.js";
import todoRender from "./todoRender.js";

const todoCreate = () => {
    // opening up the dialog to get input for tasks
    const dialog = document.querySelector("dialog");
    dialog.showModal();

    // resetting the form
    const inputClass = document.querySelectorAll(".input-class");
    inputClass.forEach((item) => {
        item.value = "";
    })

    // close button to close the dialog
    const closeButton = document.querySelector("#close-btn");
    closeButton.addEventListener("click", () => {
        dialog.close();
    });

    // submiting the dialog
    const confirmBtn = document.querySelector("#confirm-btn");

    if (!confirmBtn.dataset.listener) { // Checks if the listener already exists to avoid duplicates
        confirmBtn.addEventListener("click", (event) => {
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
            dialog.close();
        });

        // Mark the listener as added
        confirmBtn.dataset.listener = "true";
    }
}

export default todoCreate;