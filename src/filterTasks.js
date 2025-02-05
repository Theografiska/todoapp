import { initialTaskCharacteristics, renderTask } from "./task.js";
import { projectRender } from "./project.js";
import { deleteTask } from "./modifyObjects.js";
import { saveToStorage, loadFromStorage } from './utils.js';
import { format, parseISO, isBefore } from 'date-fns';

import fullScreen from "./assets/fullscreen_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";
import minimize from "./assets/close_fullscreen_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";

export const filterTasks = (taskArray, projectArray) => {
    const mainContent = document.querySelector("#main-content");
    const sidebarTaskLinks = document.querySelectorAll(".sidebar-task-link");

    sidebarTaskLinks.forEach((link) => {
        link.addEventListener("click", () => {
            switch(link.id) {
                case "sidebar-my-tasks": 
                    mainContent.textContent = "";

                    const allTasksHeader = document.createElement("h2");
                    allTasksHeader.textContent = "All tasks";
                    mainContent.appendChild(allTasksHeader);

                    const allTasksSection = document.createElement("div");
                    allTasksSection.className = "dynamic-task-section";

                    taskArray.forEach((task) => {
                        const taskDiv = document.createElement("div");
                        taskDiv.className = "task mini dynamic";

                        const currentProject = projectArray.find((item) => item.title === task.project);
                        renderTask(taskDiv, task, taskArray, projectArray);
                        deleteTask(taskDiv, task, currentProject, taskArray, projectArray);
                        
                        allTasksSection.appendChild(taskDiv);
                    })
                    mainContent.appendChild(allTasksSection);
                    break;
                case "sidebar-ongoing-tasks":
                    mainContent.textContent = "";
                    const ongoingTasksHeader = document.createElement("h2");
                    ongoingTasksHeader.textContent = "Ongoing tasks";
                    mainContent.appendChild(ongoingTasksHeader);

                    const ongoingTasksSection = document.createElement("div");
                    ongoingTasksSection.className = "dynamic-task-section";

                    taskArray.forEach((task) => {
                        if (task.status === "Ongoing") {
                            const taskDiv = document.createElement("div");
                            taskDiv.className = "task mini dynamic";

                            const currentProject = projectArray.find((item) => item.title === task.project);
                            renderTask(taskDiv, task, taskArray, projectArray);
                            deleteTask(taskDiv, task, currentProject, taskArray, projectArray);
                            
                            ongoingTasksSection.appendChild(taskDiv);
                        }
                    })
                    mainContent.appendChild(ongoingTasksSection);
                    break;
                case "sidebar-not-started-tasks":
                    mainContent.textContent = "";
                    const notStartedTasksHeader = document.createElement("h2");
                    notStartedTasksHeader.textContent = "Not started tasks";
                    mainContent.appendChild(notStartedTasksHeader);

                    const notStartedTasksSection = document.createElement("div");
                    notStartedTasksSection.className = "dynamic-task-section";

                    taskArray.forEach((task) => {
                        if (task.status === "Not started") {
                            const taskDiv = document.createElement("div");
                            taskDiv.className = "task mini dynamic";

                            const currentProject = projectArray.find((item) => item.title === task.project);
                            renderTask(taskDiv, task, taskArray, projectArray);
                            deleteTask(taskDiv, task, currentProject, taskArray, projectArray);
                            
                            notStartedTasksSection.appendChild(taskDiv);
                        }
                    })
                    mainContent.appendChild(notStartedTasksSection);
                    break;
                case "sidebar-completed-tasks":
                    mainContent.textContent = "";
                    const completeddTasksHeader = document.createElement("h2");
                    completeddTasksHeader.textContent = "Completed tasks";
                    mainContent.appendChild(completeddTasksHeader);

                    const completedTasksSection = document.createElement("div");
                    completedTasksSection.className = "dynamic-task-section";

                    taskArray.forEach((task) => {
                        if (task.status === "Completed") {
                            const taskDiv = document.createElement("div");
                            taskDiv.className = "task mini dynamic";

                            const currentProject = projectArray.find((item) => item.title === task.project);
                            renderTask(taskDiv, task, taskArray, projectArray);
                            deleteTask(taskDiv, task, currentProject, taskArray, projectArray);
                            
                            completedTasksSection.appendChild(taskDiv);
                        }
                    })
                    mainContent.appendChild(completedTasksSection);
                    break;
                case "sidebar-deadline-passed-tasks":
                    mainContent.textContent = "";
                    const deadlinePassedTasksHeader = document.createElement("h2");
                    deadlinePassedTasksHeader.textContent = "Deadline passed tasks";
                    mainContent.appendChild(deadlinePassedTasksHeader);

                    const deadlinePassedTasksSection = document.createElement("div");
                    deadlinePassedTasksSection.className = "dynamic-task-section";

                    taskArray.forEach((task) => {
                        // Check if the due date has passed
                        const todayDate = new Date();
                        const dueDate = parseISO(task.dueDate); // Convert string to Date object
                        if (isBefore(dueDate, todayDate) && task.status !== "Completed") {
                            const taskDiv = document.createElement("div");
                            taskDiv.className = "task mini dynamic";

                            const currentProject = projectArray.find((item) => item.title === task.project);
                            renderTask(taskDiv, task, taskArray, projectArray);
                            deleteTask(taskDiv, task, currentProject, taskArray, projectArray);
                            
                            deadlinePassedTasksSection.appendChild(taskDiv);
                        }
                    })
                    mainContent.appendChild(deadlinePassedTasksSection);
                    break;
            }
        })
    })

    const sidebarProjectLinks = document.querySelectorAll(".sidebar-project-link");
    sidebarProjectLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mainContent.textContent = "";
            const projectsSection = document.createElement("div");
            projectsSection.className = "dynamic-projects-area";
            projectsSection.id = "projects-section";
            mainContent.appendChild(projectsSection);
            switch(link.id) {
                case "sidebar-all-projects":
                    const allProjectsHeader = document.createElement("h2");
                    allProjectsHeader.textContent = "All projects";
                    projectsSection.appendChild(allProjectsHeader);

                    projectArray.forEach((project) => {
                        if (project.title !== "general-tasks") {
                            projectRender(project, projectArray, taskArray);
                        }
                    })
                    break;
                case "sidebar-ongoing-projects": 
                    const ongoingProjectsHeader = document.createElement("h2");
                    ongoingProjectsHeader.textContent = "Ongoing projects";
                    projectsSection.appendChild(ongoingProjectsHeader);

                    projectArray.forEach((project) => {
                        if (project.status === "Ongoing" && project.title !== "general-tasks") {
                            projectRender(project, projectArray, taskArray);
                        }
                    }) 
                    break;
                case "sidebar-not-started-projects":
                    const notStartedProjectsHeader = document.createElement("h2");
                    notStartedProjectsHeader.textContent = "Not started projects";
                    projectsSection.appendChild(notStartedProjectsHeader);

                    projectArray.forEach((project) => {
                        if (project.status === "Not started" && project.title !== "general-tasks") {
                            projectRender(project, projectArray, taskArray);
                        }
                    }) 
                    break;
                case "sidebar-completed-projects":
                    const completedProjectsHeader = document.createElement("h2");
                    completedProjectsHeader.textContent = "Completed projects";
                    projectsSection.appendChild(completedProjectsHeader);

                    projectArray.forEach((project) => {
                        if (project.status === "Completed" && project.title !== "general-tasks") {
                            projectRender(project, projectArray, taskArray);
                        }
                    }) 
                    break;
            }
        })
    })

}