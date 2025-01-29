import "./styles.css";
import { createTask } from "./task.js";
import {  createProject } from "./project.js";
import { initialExamples } from "./initialExamples.js";

const allTasks = [];
const allProjects = [];

// populating the page with dummy data
initialExamples(allTasks, allProjects);

const addTaskButtons = document.querySelectorAll(".add-task-btn");
addTaskButtons.forEach((button) => {
    button.addEventListener("click", () => {
        createTask(allTasks, allProjects);
    })
})

const addProjectButton = document.querySelector("#add-project-btn");
addProjectButton.addEventListener("click", () => {
    createProject(allProjects, allTasks);
})
