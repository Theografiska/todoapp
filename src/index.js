import "./styles.css";
import Task from "./task";
import Project from "./project";
import projectRender from "./projectRender";

// all active tasks and projects
const allTasks = [];
const allProjects = [];

// create a few general tasks
const makeFire = new Task ("Make fire in the fireplace", "Take wood form the shed", "25.01.2025", "High", "Not started", "general-tasks");
const takeOutTrash = new Task ("Take out trash", "Take the trash to the curb", "25.01.2025", "Medium", "Not started", "general-tasks");
allTasks.push(makeFire, takeOutTrash);

// create a few JavaScript tasks
const todoListApp = new Task("Todo List App", "Complete all the project requirements", "31.01.2025", "Medium", "Ongoing", "javascript-course")
allTasks.push(todoListApp);

// project for general tasks
const generalFiltered = allTasks.filter(task => task.project === "general-tasks");
const generalProject = new Project ("General tasks", "New tasks go here by default", "Ongoing", "No notes to add", generalFiltered);
projectRender(generalProject);

// JavaScript Course project
const javascriptFiltered = allTasks.filter(task => task.project === "javascript-course");
const javaScriptProject = new Project("JavaScript course", "JavaScript course in the TOP curriculum", "Ongoing", "No notes", javascriptFiltered);
projectRender(javaScriptProject);

// create tasks/projects buttons and listeners: 
const addTaskButton = document.querySelector("#add-task-btn");

const addProjectButton = document.querySelector("#add-project-btn");

