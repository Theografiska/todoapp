import "./styles.css";

import Task from "./task";
import createTask from "./createTask";

import Project from "./project";
import createProject from "./createProject";
import projectRender from "./projectRender";

// all active tasks and projects
const allTasks = [];
const allProjects = [];

// create a few sample tasks
const makeFire = new Task ("Make fire in the fireplace", "Take wood form the shed", "24.01.2025", "High", "Completed", "general-tasks");
const takeOutTrash = new Task ("Take out trash", "Take the trash to the curb", "25.01.2025", "Medium", "Not started", "general-tasks");
const todoListApp = new Task("Todo List App", "Complete all the project requirements", "31.01.2025", "Medium", "Ongoing", "javascript-course")
const threeDaysAWeekToGym = new Task("Go to gym 3 times/week", "Instructions are loud and clear in the title", "31.01.2025", "Medium", "Ongoing", "starting-strength");

allTasks.push(makeFire, takeOutTrash);
allTasks.push(todoListApp);
allTasks.push(threeDaysAWeekToGym);

// project for general tasks
const generalFiltered = allTasks.filter(task => task.project === "general-tasks");
const generalProject = new Project ("general-tasks", "New tasks go here by default", "Ongoing", "No notes to add", generalFiltered);
projectRender(generalProject, allProjects, allTasks);

// JavaScript Course project
const javascriptFiltered = allTasks.filter(task => task.project === "javascript-course");
const javaScriptProject = new Project("javascript-course", "JavaScript course in the TOP curriculum", "Ongoing", "No notes", javascriptFiltered);
projectRender(javaScriptProject, allProjects, allTasks);

// Starting Strength Course project
const startingStrengthFiltered = allTasks.filter(task => task.project === "starting-strength");
const startingStrengthProject = new Project("starting-strength", "Keeping up my gym NLP progress", "Ongoing", "Wrist pain has decreased", startingStrengthFiltered);
projectRender(startingStrengthProject, allProjects, allTasks);

// create tasks/projects buttons and listeners: 
const addTaskButton = document.querySelector("#add-task-btn");
addTaskButton.addEventListener("click", () => {
    createTask(allTasks, allProjects);
})

const addProjectButton = document.querySelector("#add-project-btn");
addProjectButton.addEventListener("click", () => {
    createProject(allProjects, allTasks);
})
