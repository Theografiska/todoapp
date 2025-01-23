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

// sample task #1
const finishTodoApp = new Todo("Finish todo list app", "Complete all the minimum requirements and publish the solution to Github", "27 Jan 2025", "Medium", "Ongoing", "JavaScript Course");
allTasks.push(finishTodoApp);
todoRender(finishTodoApp);
console.log(finishTodoApp);

// sample task #2
const goToGym = new Todo("Go to the gym", "Do a strength workout", "24 Jan 2025", "Low", "Not started", "Starting Strength");
allTasks.push(goToGym);
todoRender(goToGym);
console.log(goToGym);

// add new tasks button and listener: 
const addTaskButton = document.querySelector("#add-task-btn");
addTaskButton.addEventListener("click", todoCreate);

// sample project #1
const tasks = [finishTodoApp];
const javaScriptProject = new Project("JavaScript Course", "The Odin Project's course for Intermediate JavaScript skills", "31st January", "High", "Ongoing", tasks, "So far so good, a bit tought to keep up my 20+ hours weekly practice goal.");
projectRender(javaScriptProject);

// sample project #2
const gymTasks = [goToGym];
const startingStrengthProject = new Project("Starting Strength", "The gym program for linear progression", "31st March", "Medium", "Not started", gymTasks, "Current progress is minimal");
projectRender(startingStrengthProject);

// add new project button and listner:
const addProjectButton = document.querySelector("#add-project-btn");
addProjectButton.addEventListener("click", projectCreate);









/* 
Todo: 
- project creation module
- populate labels dynamically, based on the array of projects
- ability to change priority

*/