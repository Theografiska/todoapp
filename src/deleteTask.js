const deleteTask = (taskDiv, taskObj, project, taskArray) => {
    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.textContent = "Delete task";
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