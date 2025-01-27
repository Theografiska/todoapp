import Task from "./task";
import renderTask from "./renderTask";
import deleteTask from "./deleteTask";

const createTask = (taskArray, projectArray) => {
    // populating the select items through JavaScript
    let taskProjectSelect = document.querySelector("#task-project-input");
    let options = projectArray.map(item => `<option value="${item.title}">${item.title}</option>`).join(`\n`);
    taskProjectSelect.innerHTML = options;

    const taskDialog = document.querySelector("#task-dialog");
    taskDialog.showModal();
    taskDialog.style.display = "flex";

    // resetting the form
    const inputClass = document.querySelectorAll(".input-class");
    inputClass.forEach((item) => {
        item.value = "";
    })

    // close button to close the dialog
    const taskDialogCloseButton = document.querySelector("#task-dialog-close-btn");
    taskDialogCloseButton.addEventListener("click", () => {
        taskDialog.style.display = "none";
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
            const newTask = new Task(title, description, dueDate, priority, status, taskProject);
            const taskDiv = document.createElement("div");
            taskDiv.className = "task mini";

            const currentProject = projectArray.find((item) => item.title === taskProject);

            // adding the task to a project
            const projectTaskArea = document.querySelector(`#${taskProject}-task-area`);
            renderTask(taskDiv, newTask);
            deleteTask(taskDiv, newTask, currentProject);
            currentProject.addTask(newTask);
                    
            projectTaskArea.appendChild(taskDiv);

            // adding the task to all tasks array
            taskArray.push(newTask);
            console.log(currentProject);
            console.log(taskArray)

            taskDialog.style.display = "none";

            // closing the dialog
            taskDialog.close();
        });

        // Mark the listener as added
        taskDialogConfirmBtn.dataset.listener = "true";
    }


}

export default createTask;