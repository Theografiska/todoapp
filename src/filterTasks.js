import { renderTask } from "./task.js";
import { projectRender } from "./project.js";
import { deleteTask } from "./modifyObjects.js";
import { parseISO, isBefore } from 'date-fns';


export const filterTasks = (taskArray, projectArray) => {
    const mainContent = document.querySelector("#main-content");
    const headingsSection = document.querySelector("#headings-section");

    const tasksSection = document.querySelector("#tasks-section");
    const mainTasksArea = document.querySelector("#main-tasks-area");
    const ongoingTasks = document.querySelector("#ongoing-tasks");
    const notStartedTasks = document.querySelector("#not-started-tasks");
    const completedTasks = document.querySelector("#completed-tasks");
    const overdueTasks = document.querySelector("#overdue-tasks");

    const projectsHeader = document.querySelector("#projects-header");
    const projectsSection = document.querySelector("#projects-section");
    const mainProjectsArea = document.querySelector("#main-projects-area");
    const ongoingProjects = document.querySelector("#ongoing-projects");
    const notStartedProjects = document.querySelector("#not-started-projects");
    const completedProjects = document.querySelector("#completed-projects");

    const sidebarTaskLinks = document.querySelectorAll(".sidebar-task-link");

    const clearHtml = () => {
        headingsSection.textContent = "";
        mainTasksArea.textContent = "";
        ongoingTasks.textContent = ""
        notStartedTasks.textContent = ""
        completedTasks.textContent = ""
        overdueTasks.textContent = ""

        projectsHeader.textContent = "";
        projectsSection.textContent = "";
    }    

    // filtering tasks
    sidebarTaskLinks.forEach((link) => {
        link.addEventListener("click", () => {
            // temporary fix for the add task and project buttons
            const addTaskBtn = document.querySelector("#add-task-btn-sidebar");
            addTaskBtn.className = "hidden";
            const addProjectBtn = document.querySelector("#add-project-btn-sidebar");
            addProjectBtn.className = "hidden";

            clearHtml();
            const filteredTasksHeader = document.createElement("h2");
            headingsSection.appendChild(filteredTasksHeader);

            const filteredTasksSection = document.createElement("div");
            filteredTasksSection.className = "dynamic-task-section";

            const zeroTasksFunc = (taskStatus) => {
                const zeroTasksMessage = document.createElement("p");
                zeroTasksMessage.className = "zero-tasks-message";
                zeroTasksMessage.textContent = `There are currently no ${taskStatus} tasks available.`;
                filteredTasksSection.appendChild(zeroTasksMessage);
            }

            switch(link.id) {
                case "sidebar-my-tasks":  // showing all tasks by section
                    filteredTasksHeader.textContent = "All tasks";

                    const ongoingHeader = document.createElement("h3");
                    ongoingHeader.textContent = "Ongoing tasks";
                    ongoingTasks.appendChild(ongoingHeader);
                    const ongoingContainer = document.createElement("div");
                    ongoingContainer.className = "dynamic-task-section";
                    ongoingTasks.appendChild(ongoingContainer);

                    const notStartedHeader = document.createElement("h3");
                    notStartedHeader.textContent = "Not started tasks";
                    notStartedTasks.appendChild(notStartedHeader);
                    const notStartedContainer = document.createElement("div");
                    notStartedContainer.className = "dynamic-task-section";
                    notStartedTasks.appendChild(notStartedContainer);

                    const completedHeader = document.createElement("h3");
                    completedHeader.textContent = "Completed tasks";
                    completedTasks.appendChild(completedHeader);
                    const completedContainer = document.createElement("div");
                    completedContainer.className = "dynamic-task-section";
                    completedTasks.appendChild(completedContainer);

                    if (taskArray.length === 0) {
                        zeroTasksFunc("");
                    } else {
                        taskArray.forEach((task) => {
                            const taskDiv = document.createElement("div");
                            taskDiv.className = "task dynamic mini";

                            if (task.status === "Ongoing") {
                                const currentProject = projectArray.find((item) => item.title === task.project);
                                renderTask(taskDiv, task, taskArray, projectArray);
                                deleteTask(taskDiv, task, currentProject, taskArray, projectArray);

                                ongoingContainer.appendChild(taskDiv);
                            
                            } else if (task.status === "Not started") {
                                const currentProject = projectArray.find((item) => item.title === task.project);
                                renderTask(taskDiv, task, taskArray, projectArray);
                                deleteTask(taskDiv, task, currentProject, taskArray, projectArray);

                                notStartedContainer.appendChild(taskDiv);
                            
                            } else if (task.status === "Completed") {
                                const currentProject = projectArray.find((item) => item.title === task.project);
                                renderTask(taskDiv, task, taskArray, projectArray);
                                deleteTask(taskDiv, task, currentProject, taskArray, projectArray);

                                completedContainer.appendChild(taskDiv);
                            }                            
                        })
                    }
                    break;
                case "sidebar-ongoing-tasks":
                    filteredTasksHeader.textContent = "Tasks > Ongoing";

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
                    mainTasksArea.appendChild(filteredTasksSection);
                    break;
                case "sidebar-not-started-tasks":
                    filteredTasksHeader.textContent = "Tasks > Not started";

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

                    mainTasksArea.appendChild(filteredTasksSection);
                    break;
                case "sidebar-completed-tasks":
                    filteredTasksHeader.textContent = "Tasks > Completed";

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

                    mainTasksArea.appendChild(filteredTasksSection);
                    break;
                case "sidebar-deadline-passed-tasks":
                    filteredTasksHeader.textContent = "Tasks > Overdue";

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

                    mainTasksArea.appendChild(filteredTasksSection);
                    break;
            }
        })
    })

    // filtering projects
    const sidebarProjectLinks = document.querySelectorAll(".sidebar-project-link");
    sidebarProjectLinks.forEach((link) => {
        link.addEventListener("click", () => {
            // temporary fix for the add task and project buttons
            const addTaskBtn = document.querySelector("#add-task-btn-sidebar");
            addTaskBtn.className = "hidden";
            const addProjectBtn = document.querySelector("#add-project-btn-sidebar");
            addProjectBtn.className = "hidden";

            clearHtml();

            const zeroProjectsFunc = (projectStatus) => {
                const zeroProjectsMessage = document.createElement("p");
                zeroProjectsMessage.className = "zero-projects-message";
                zeroProjectsMessage.textContent = `There are currently no ${projectStatus} projects available.`;
                projectsSection.appendChild(zeroProjectsMessage);
            }

            switch(link.id) {
                case "sidebar-all-projects":
                    projectsHeader.textContent = "All projects";

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
                projectsHeader.textContent = "Projects > Ongoing";

                    if (projectArray.length === 1) {
                        zeroProjectsFunc("ongoing");
                    } else {
                        let count = 0;
                        projectArray.forEach((project) => {
                            if (project.status === "Ongoing" && project.title !== "general-tasks") {
                                projectRender(project, projectArray, taskArray);

                                count += 1;
                            }
                        }) 

                        if (count === 0) {
                            zeroProjectsFunc("ongoing");
                        }
                    }
                    break;

                case "sidebar-not-started-projects":
                    projectsHeader.textContent = "Projects > Not started";

                    if (projectArray.length === 1) {
                        zeroProjectsFunc("not started");
                    } else {
                        let count = 0;
                        projectArray.forEach((project) => {
                            if (project.status === "Not started" && project.title !== "general-tasks") {
                                projectRender(project, projectArray, taskArray);

                                count += 1;
                            }
                        }) 

                        if (count === 0) {
                            zeroProjectsFunc("not started");
                        }
                    }
                    break;

                case "sidebar-completed-projects":
                    projectsHeader.textContent = "Projects > Completed";

                    if (projectArray.length === 1) {
                        zeroProjectsFunc("completed");
                    } else {
                        let count = 0;
                        projectArray.forEach((project) => {
                            if (project.status === "Completed" && project.title !== "general-tasks") {
                                projectRender(project, projectArray, taskArray);

                                count += 1;
                            }
                        }) 

                        if (count === 0) {
                            zeroProjectsFunc("completed");
                        }
                    }
                    break;
            }
        })
    })

}