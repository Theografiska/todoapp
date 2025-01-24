import "./styles.css";
import Todo from "./todoClass.js";
import todoCreate from "./todoCreate.js";
import todoRender from "./todoRender.js";

import Project from "./projectClass.js";
import projectRender from "./projectRender.js";
import projectCreate from "./projectCreate.js";

// all active tasks and projects
const allTasks = [];
const allProjects = [];

// create tasks/projects bbuttons and listeners: 
const addTaskButton = document.querySelector("#add-task-btn");
addTaskButton.addEventListener("click", () => todoCreate(allTasks, defaultProject)); 

const addProjectButton = document.querySelector("#add-project-btn");
addProjectButton.addEventListener("click", () => projectCreate(allProjects));

// default project
const defaultProject = new Project("General tasks", "Tasks go here by default", "N/A", "N/A", "N/A", "N/A", []);
projectRender(defaultProject, allProjects, allTasks)

// sample project #1
const javaScriptProject = new Project("JavaScript Course", "The Odin Project's course for Intermediate JavaScript skills", "31st January", "High", "Ongoing", "So far so good, a bit tought to keep up my 20+ hours weekly practice goal.", []);
projectRender(javaScriptProject, allProjects, allTasks);

// sample project #2
const startingStrengthProject = new Project("Starting Strength", "The gym program for linear progression", "31st March", "Medium", "Not started", "Current progress is minimal", []);
projectRender(startingStrengthProject, allProjects);

// sample task #1
const finishTodoApp = new Todo("Finish todo list app", "Complete all the minimum requirements and publish the solution to Github", "27 Jan 2025", "Medium", "Ongoing", "JavaScript Course");
todoRender(finishTodoApp, allTasks, javaScriptProject);

// sample task #2
const goToGym = new Todo("Go to the gym", "Do a strength workout", "24 Jan 2025", "Low", "Not started", "Starting Strength");
todoRender(goToGym, allTasks, startingStrengthProject);

// adding a new task to a project
startingStrengthProject.addTask(goToGym);

console.log(allTasks);
console.log(allProjects);




/* 
Todo: 
- project creation module
- populate labels dynamically, based on the array of projects
- ability to change priority

*/