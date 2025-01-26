import deleteImage from "./assets/close_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";

const deleteTask = (taskDiv, taskObj, project, taskArray) => {
    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.className = "task-delete-btn";
    taskDeleteButton.style.background = `url(${deleteImage})`;

    taskDiv.style.position = "relative"; // this is necessary in order to properly position the delete and expand elements
    taskDiv.appendChild(taskDeleteButton);

    taskDeleteButton.addEventListener("click", () => {
        // removing task from project and the DOM
        const taskIndex = project.tasks.indexOf(taskObj);
        project.tasks.splice(taskIndex, 1);
        taskDiv.remove();

        // removing task from all tasks array
        const allTasksIndex = taskArray.indexOf(taskObj);
        taskArray.splice(allTasksIndex, 1);
        console.log(taskArray);
    })
}

export default deleteTask;