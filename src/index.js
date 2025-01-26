import "./styles.css";
import createTask from "./createTask";
import createProject from "./createProject";
import initialExamples from "./initialExamples";

const allTasks = [];
const allProjects = [];

// populating the page with dummy data
initialExamples(allTasks, allProjects);

const addTaskButtons = document.querySelectorAll(".add-task-btn-class");
addTaskButtons.forEach((button) => {
    button.addEventListener("click", () => {
        createTask(allTasks, allProjects);
    })
})

const addProjectButton = document.querySelector("#add-project-btn");
addProjectButton.addEventListener("click", () => {
    createProject(allProjects, allTasks);
})
