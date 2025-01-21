import Todo from "./todoClass.js";
import todoRender from "./todoRender.js";

const todoCreate = () => {
    const taskSection = document.querySelector("#task-section");

    // opening up the dialog to get input for tasks
    const dialog = document.querySelector("dialog");
    dialog.showModal();

    // close button to close the dialog
    const closeButton = document.querySelector("#close-btn");
    closeButton.addEventListener("click", () => {
        dialog.close();
    });

    // submiting the dialog
    const confirmBtn = document.querySelector("#confirm-btn");
    confirmBtn.addEventListener("click", (event) => {
        // capturing user imputs from dialog
        const newTitle = document.querySelector("#title-input").value;
        const newDescription = document.querySelector("#description-input").value;
        const newDueDate = document.querySelector("#due-date-input").value;
        const newPriority = document.querySelector("#priority-input").value;
        const newStatus = document.querySelector("#status-input").value;
        const newLabels = document.querySelector("#status-input").value;

        // creating a new task or todo
        const newTask = new Todo(newTitle, newDescription, newDueDate, newPriority, newStatus, newLabels);
        console.log(newTask);

        todoRender(newTask); 

        // preventing information sending event
        event.preventDefault(); 
        dialog.close();
    })
    
}

export default todoCreate;