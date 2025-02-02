import "./styles.css";
import { createTask } from "./task.js";
import {  createProject } from "./project.js";
import { initialExamples } from "./initialExamples.js";

const tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];
const projectsArray = JSON.parse(localStorage.getItem('projectsArray')) || [];

// populating the page with dummy data

initialExamples(tasksArray, projectsArray);

const addTaskButtons = document.querySelectorAll(".add-task-btn");
addTaskButtons.forEach((button) => {
    button.addEventListener("click", () => {
        createTask(tasksArray, projectsArray);
    });
});

const addProjectButton = document.querySelectorAll(".add-project-btn");
addProjectButton.forEach((button) => {
    button.addEventListener("click", () => {
    createProject(projectsArray, tasksArray);
    });
}); 