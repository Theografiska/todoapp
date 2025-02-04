import "./styles.css";
import { Task, createTask } from "./task.js";
import {  Project, createProject } from "./project.js";
import { createInitialExamples, loadInitialExamples } from "./initialExamples.js";
import { format } from 'date-fns';

// Retrieve tasks from localStorage and reconstruct them as Task instances
const tasksArray = JSON.parse(localStorage.getItem('tasksArray') || '[]').map(
    task => new Task(task.title, task.description, task.dueDate, task.priority, task.status, task.project)
);

// Retrieve projects from localStorage and reconstruct them as Project instances
const projectsArray = JSON.parse(localStorage.getItem('projectsArray') || '[]').map(
    project => new Project(project.title, project.description, project.status, project.notes, 
        project.tasks.map(task => new Task(task.title, task.description, task.dueDate, task.priority, task.status, task.project))
    )
);

// populating the page with dummy data (if no previous data)
if (projectsArray.length < 1) {
    createInitialExamples(tasksArray, projectsArray);
} 

loadInitialExamples(tasksArray, projectsArray);

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