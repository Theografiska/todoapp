import "./styles.css";
import { createTask } from "./task.js";
import {  createProject } from "./project.js";
import { initialExamples } from "./initialExamples.js";

const allTasks = [];
localStorage.setItem('tasksArray', JSON.stringify(allTasks));
const tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];

const allProjects = [];
localStorage.setItem('projectsArray', JSON.stringify(allProjects));
const projectsArray = JSON.parse(localStorage.getItem('projectsArray')) || [];

// populating the page with dummy data

initialExamples(tasksArray, projectsArray);
localStorage.setItem('tasksArray', JSON.stringify(tasksArray)); // Update storage
localStorage.setItem('projectsArray', JSON.stringify(projectsArray)); // Update storage

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