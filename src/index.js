import "./styles.css";
import { Task, ChecklistItem, createTask } from "./task.js";
import { Project, createProject } from "./project.js";
import { createInitialExamples, loadInitialExamples } from "./initialExamples.js";
import { filterTasks } from "./filterTasks.js";
import { loadFromStorage } from "./utils.js";

// Retrieve tasks from localStorage and reconstruct them as Task instances
const tasksArray = loadFromStorage('tasksArray').map(
    task => new Task(task.title, task.description, task.dueDate, task.priority, task.status, task.project, 
        task.checklist.map(item => new ChecklistItem(item.title, item.status)))
);

// Retrieve projects from localStorage and reconstruct them as Project instances
const projectsArray = loadFromStorage('projectsArray').map(
    project => new Project(project.title, project.description, project.status, project.notes, 
        project.tasks.map(task => new Task(task.title, task.description, task.dueDate, task.priority, task.status, task.project, 
            task.checklist.map(item => new ChecklistItem(item.title, item.status))))
    )
);

// populating the page with dummy data (if no previous data)
if (projectsArray.length === 0) {
    createInitialExamples(tasksArray, projectsArray);
} 

loadInitialExamples(tasksArray, projectsArray);

// ability to filter sidebar tasks
filterTasks(tasksArray, projectsArray);

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