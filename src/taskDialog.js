import Todo from "./todoClass";
import todoRender from "./todoRender";

const taskDialog = (taskArray, project) => {
    // Open the modal (in case it was closed before)
    const taskDialog = document.querySelector("#task-dialog");
    taskDialog.showModal();

    // Close button event to close the modal
    const taskDialogCloseButton = document.querySelector("#task-dialog-close-btn");
    taskDialogCloseButton.addEventListener("click", () => {
        taskDialog.close();
    });

    // Confirm button event for submitting the task
    const taskDialogConfirmBtn = document.querySelector("#task-dialog-confirm-btn");
    taskDialogConfirmBtn.addEventListener("click", (event) => {
        event.preventDefault();

        // Capture user input from the modal
        const title = document.querySelector("#task-title-input").value;
        const description = document.querySelector("#task-description-input").value;
        const dueDate = document.querySelector("#task-due-date-input").value;
        const priority = document.querySelector("#task-priority-input").value;
        const status = document.querySelector("#task-status-input").value;
        const taskProject = document.querySelector("#task-project-input").value;

        // Create the new task
        const newTask = new Todo(title, description, dueDate, priority, status, taskProject);
        console.log(newTask);

        // Render the task to the project
        todoRender(newTask, taskArray, project);

        // Close the modal after adding the task
        taskDialog.close();
    });
}

export default taskDialog;