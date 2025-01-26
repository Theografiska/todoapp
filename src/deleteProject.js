import deleteImage from "./assets/close_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";

const deleteProject = (projectDiv, projectObj, projectArray, taskArray) => {
    const projectDeleteButton = document.createElement("button");
    projectDeleteButton.className = "project-delete-btn";
    projectDeleteButton.style.background = `url(${deleteImage})`;

    projectDiv.style.position = "relative"; // this is necessary in order to properly position the delete and expand elements
    projectDiv.appendChild(projectDeleteButton);

    projectDeleteButton.addEventListener("click", () => {
        // removing all tasks from "all tasks" array
        const allProjectTasks = projectObj.tasks;
        allProjectTasks.forEach((task) => {
            const allTasksIndex = taskArray.indexOf(task);
            taskArray.splice(allTasksIndex, 1);
        })

        // removing project from project array and the DOM
        const projectIndex = projectArray.indexOf(projectObj);
        projectArray.splice(projectIndex, 1);
        projectDiv.remove();
    
        console.log(projectArray);
        console.log(taskArray);
    })
}

export default deleteProject;