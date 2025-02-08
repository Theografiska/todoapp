import { renderTask } from "./task.js";
import { projectRender } from "./project.js";
import { deleteTask } from "./modifyObjects.js";
import { parseISO, isBefore } from 'date-fns';


export const filterTasks = (taskArray, projectArray) => {
    const mainContent = document.querySelector("#main-content");
    const sidebarTaskLinks = document.querySelectorAll(".sidebar-task-link");

    sidebarTaskLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const addTaskBtns = document.querySelectorAll(".add-task-btn");
            addTaskBtns.forEach((button) => {
                button.className = "add-task-btn hidden";
            })

            const addProjectBtns = document.querySelectorAll(".add-project-btn");
            addProjectBtns.forEach((button) => {
                button.className = "add-project-btn hidden";
            })

            mainContent.textContent = "";

            const filteredTasksHeader = document.createElement("h2");
            mainContent.appendChild(filteredTasksHeader);

            const filteredTasksSection = document.createElement("div");
            filteredTasksSection.className = "dynamic-task-section";

            const zeroTasksFunc = (taskStatus) => {
                const zeroTasksMessage = document.createElement("p");
                zeroTasksMessage.className = "zero-tasks-message";
                zeroTasksMessage.textContent = `There are currently no ${taskStatus} tasks available.`;
                filteredTasksSection.appendChild(zeroTasksMessage);
            }

            switch(link.id) {
                case "sidebar-my-tasks": 
                    filteredTasksHeader.textContent = "All tasks";

                    if (taskArray.length === 0) {
                        zeroTasksFunc("");
                    } else {
                        taskArray.forEach((task) => {
                            const taskDiv = document.createElement("div");
                            taskDiv.className = "task dynamic mini";
    
                            const currentProject = projectArray.find((item) => item.title === task.project);
                            renderTask(taskDiv, task, taskArray, projectArray);
                            deleteTask(taskDiv, task, currentProject, taskArray, projectArray);
                            
                            filteredTasksSection.appendChild(taskDiv);
                        })
                    }
                    mainContent.appendChild(filteredTasksSection);
                    break;
                case "sidebar-ongoing-tasks":
                    filteredTasksHeader.textContent = "Ongoing tasks";

                    if (taskArray.length === 0) {
                        zeroTasksFunc("ongoing");

                    } else {
                        let count = 0;
                        taskArray.forEach((task) => {
                            if (task.status === "Ongoing") {
                                const taskDiv = document.createElement("div");
                                taskDiv.className = "task dynamic mini";
    
                                const currentProject = projectArray.find((item) => item.title === task.project);
                                renderTask(taskDiv, task, taskArray, projectArray);
                                deleteTask(taskDiv, task, currentProject, taskArray, projectArray);
                                
                                filteredTasksSection.appendChild(taskDiv);
                                count += 1;
                            }
                        })

                        if (count === 0) {
                            zeroTasksFunc("ongoing");
                            }
                    }
                    
                    mainContent.appendChild(filteredTasksSection);
                    break;
                case "sidebar-not-started-tasks":
                    filteredTasksHeader.textContent = "Not started tasks";

                    if (taskArray.length === 0) {
                        zeroTasksFunc("not started");
                    } else {
                        let count = 0;
                        taskArray.forEach((task) => {
                            if (task.status === "Not started") {
                                const taskDiv = document.createElement("div");
                                taskDiv.className = "task dynamic mini";
    
                                const currentProject = projectArray.find((item) => item.title === task.project);
                                renderTask(taskDiv, task, taskArray, projectArray);
                                deleteTask(taskDiv, task, currentProject, taskArray, projectArray);
                                
                                filteredTasksSection.appendChild(taskDiv);
                                count += 1;
                            }
                        })

                        if (count === 0) {
                            zeroTasksFunc("not started");
                        }
                    }

                    mainContent.appendChild(filteredTasksSection);
                    break;
                case "sidebar-completed-tasks":
                    filteredTasksHeader.textContent = "Completed tasks";

                    if (taskArray.length === 0) {
                        zeroTasksFunc("completed");
                    } else {
                        let count = 0;
                        taskArray.forEach((task) => {
                            if (task.status === "Completed") {
                                const taskDiv = document.createElement("div");
                                taskDiv.className = "task dynamic mini";
    
                                const currentProject = projectArray.find((item) => item.title === task.project);
                                renderTask(taskDiv, task, taskArray, projectArray);
                                deleteTask(taskDiv, task, currentProject, taskArray, projectArray);
                                
                                filteredTasksSection.appendChild(taskDiv);
                                count += 1;
                            }
                        })

                        if (count === 0) {
                            zeroTasksFunc("completed");
                        }
                    }

                    mainContent.appendChild(filteredTasksSection);
                    break;
                case "sidebar-deadline-passed-tasks":
                    filteredTasksHeader.textContent = "Overdue tasks";

                    if (taskArray.length === 0) {
                        zeroTasksFunc("overdue");
                    } else {
                        let count = 0;
                        taskArray.forEach((task) => {
                            // Check if the due date has passed
                            const todayDate = new Date();
                            const dueDate = parseISO(task.dueDate); // Convert string to Date object
                            if (isBefore(dueDate, todayDate) && task.status !== "Completed") {
                                const taskDiv = document.createElement("div");
                                taskDiv.className = "task dynamic mini";

                                const currentProject = projectArray.find((item) => item.title === task.project);
                                renderTask(taskDiv, task, taskArray, projectArray);
                                deleteTask(taskDiv, task, currentProject, taskArray, projectArray);
                                
                                filteredTasksSection.appendChild(taskDiv);
                                count += 1;
                            }
                        })

                        if (count === 0) {
                            zeroTasksFunc("overdue");
                        }
                    }

                    mainContent.appendChild(filteredTasksSection);
                    break;
            }
        })
    })

    const sidebarProjectLinks = document.querySelectorAll(".sidebar-project-link");
    sidebarProjectLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const addTaskBtns = document.querySelectorAll(".add-task-btn");
            addTaskBtns.forEach((button) => {
                button.className = "add-task-btn hidden";
            })

            const addProjectBtns = document.querySelectorAll(".add-project-btn");
            addProjectBtns.forEach((button) => {
                button.className = "add-project-btn hidden";
            })

            mainContent.textContent = "";

            const filteredProjectsHeader = document.createElement("h2");
            mainContent.appendChild(filteredProjectsHeader);

            const filteredProjectsSection = document.createElement("div");
            filteredProjectsSection.className = "dynamic-projects-area";
            filteredProjectsSection.id = "projects-section";
            mainContent.appendChild(filteredProjectsSection);

            const zeroProjectsFunc = (projectStatus) => {
                const zeroProjectsMessage = document.createElement("p");
                zeroProjectsMessage.className = "zero-projects-message";
                zeroProjectsMessage.textContent = `There are currently no ${projectStatus} projects available.`;
                filteredProjectsSection.appendChild(zeroProjectsMessage);
            }

            switch(link.id) {
                case "sidebar-all-projects":
                    filteredProjectsHeader.textContent = "All projects";

                    if (projectArray.length === 1) { // 1 because general tasks is the non-deleteable project 
                        zeroProjectsFunc("");
                    } else {
                        projectArray.forEach((project) => {
                            if (project.title !== "general-tasks") {
                                projectRender(project, projectArray, taskArray);
                            }
                        })
                    }
                    break;
                case "sidebar-ongoing-projects": 
                    filteredProjectsHeader.textContent = "Ongoing projects";

                    if (projectArray.length === 1) {
                        zeroProjectsFunc("ongoing");
                    } else {
                        let ongoingCount = 0;
                        projectArray.forEach((project) => {
                            if (project.status === "Ongoing" && project.title !== "general-tasks") {
                                projectRender(project, projectArray, taskArray);

                                ongoingCount += 1;
                            }
                        }) 

                        if (ongoingCount === 0) {
                            zeroProjectsFunc("ongoing");
                        }
                    }

                    break;
                case "sidebar-not-started-projects":
                    filteredProjectsHeader.textContent = "Not started projects";

                    if (projectArray.length === 1) {
                        zeroProjectsFunc("not started");
                    } else {
                        let unstartedCount = 0;
                        projectArray.forEach((project) => {
                            if (project.status === "Not started" && project.title !== "general-tasks") {
                                projectRender(project, projectArray, taskArray);

                                unstartedCount += 1;
                            }
                        }) 

                        if (unstartedCount === 0) {
                            zeroProjectsFunc("not started");
                        }
                    }

                    break;
                case "sidebar-completed-projects":
                    filteredProjectsHeader.textContent = "Completed projects";

                    if (projectArray.length === 1) {
                        zeroProjectsFunc("completed");
                    } else {
                        let completedCount = 0;
                        projectArray.forEach((project) => {
                            if (project.status === "Completed" && project.title !== "general-tasks") {
                                projectRender(project, projectArray, taskArray);

                                completedCount += 1;
                            }
                        }) 

                        if (completedCount === 0) {
                            zeroProjectsFunc("completed");
                        }
                    }

                    break;
            }
        })
    })

}