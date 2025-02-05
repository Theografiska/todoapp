import { initialTaskCharacteristics, renderTask } from "./task.js";
import { deleteTask } from "./modifyObjects.js";
import { saveToStorage, loadFromStorage } from './utils.js';

import fullScreen from "./assets/fullscreen_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";
import minimize from "./assets/close_fullscreen_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";

export const filterTasks = (taskArray, projectArray) => {
    const mainContent = document.querySelector("#main-content");
    const allSidebarLinks = document.querySelectorAll(".sidebar-link");

    allSidebarLinks.forEach((link) => {
        link.addEventListener("click", () => {
            switch(link.id) {
                case "sidebar-dashboard": 
                    /* populating the page as default */
                    break;
                case "sidebar-my-tasks": 
                    mainContent.textContent = "";

                    const allTasksHeader = document.createElement("h2");
                    allTasksHeader.textContent = "All tasks";
                    mainContent.appendChild(allTasksHeader);

                    const taskSection = document.createElement("div");
                    taskSection.className = "dynamic-task-section";

                    taskArray.forEach((task) => {
                        const taskDiv = document.createElement("div");
                        taskDiv.className = "task mini dynamic";

                        const currentProject = projectArray.find((item) => item.title === task.project);
                        renderTask(taskDiv, task, taskArray, projectArray);
                        deleteTask(taskDiv, task, currentProject, taskArray, projectArray);
                        
                        taskSection.appendChild(taskDiv);
                    })
                    mainContent.appendChild(taskSection);
                    break;
                case "sidebar-ongoing-tasks":
                    mainContent.textContent = "";
                    const ongoingTasksHeader = document.createElement("h2");
                    ongoingTasksHeader.textContent = "Ongoing tasks";
                    mainContent.appendChild(ongoingTasksHeader);
                    break;
                case "sidebar-not-started-tasks":
                    break;
                case "sidebar-completed-tasks":
                    break;
                case "sidebar-deadline-passed-tasks":
                    break;
                case "sidebar-archived-tasks":
                    break;
            }
        })
    })

}