import "./styles.css";
import Todo from "./todoClass.js";
import todoCreate from "./todoCreate.js";
import todoRender from "./todoRender.js";

import Project from "./projectClass.js";
import projectRender from "./projectRender.js";
import projectCreate from "./projectCreate.js";

// all active tasks
const allTasks = [];

// all active projects
const allProjects = [];

// sample task
const newTodo = new Todo("Pick up trash", "Take the trash bag to the curb and leave it there", "31 Jan 2025", "High", "Not started", "general");
todoRender(newTodo);
console.log(newTodo);

const addTaskButton = document.querySelector("#add-task-btn");
addTaskButton.addEventListener("click", todoCreate);

// sample project
const tasks = [newTodo, newTodo];
const newProject = new Project("JavaScript Course", "Just the description", "31st January", "High", "Ongoing", tasks, "Notes");
projectRender(newProject);

const addProjectButton = document.querySelector("#add-project-btn");
addProjectButton.addEventListener("click", projectCreate);









/* 
Todo: 
- project creation module
- populate labels dynamically, based on the array of projects
- ability to change priority

*/