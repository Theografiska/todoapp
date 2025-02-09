import { Task, ChecklistItem } from "./task.js";
import { Project } from "./project.js";
import { projectRender } from "./project.js";
import { saveToStorage, loadFromStorage} from "./utils.js";

export const createInitialExamples = (taskArray, projectArray) => {
    if (taskArray.length < 1 && projectArray.length < 1) {
        // create a few sample tasks
        const visitDentist = new Task ("Make a dentist appointment", "Make an appointment to visit dentist during February", "2025-02-28", "High", "Not started", "general-tasks", [new ChecklistItem("Pick a dentist", "Not completed"), new ChecklistItem("Block time in calendar", "Not completed")]);
        const ironShirts = new Task ("Iron shirts", "Iron all the collared shirts", "2025-02-03", "low", "Not started", "general-tasks", [new ChecklistItem("Iron all the shirts", "Not completed")]);
        const researchJobMarket = new Task ("Research job market", "Make a list of interesting companies and their requirements", "2025-03-31", "Medium", "Ongoing", "general-tasks", [new ChecklistItem("Search Linkedin", "Completed"), new ChecklistItem("Search top startups homepages", "Not completed")]);
        const todoListApp = new Task("Todo List App", "Complete all the project requirements", "2025-02-28", "Medium", "Completed", "javascript-course", [new ChecklistItem("Build main logic", "Not completed"), new ChecklistItem("Make it responsive to mobile", "Not completed"), new ChecklistItem("Refactor code – get rid of repetitive stuff", "Not completed")]);
        const threeDaysAWeekToGym = new Task("Go to gym 3 times/week", "On average, go to the gym 3x per week during February", "2025-02-28", "Medium", "Ongoing", "starting-strength", []);
        taskArray.push(visitDentist, ironShirts, researchJobMarket, todoListApp, threeDaysAWeekToGym);
        saveToStorage("tasksArray", taskArray);

        // creating a few sample projects
        const generalProject = new Project ("general-tasks", "New tasks go here by default", "Ongoing", "No notes to add", taskArray.filter(task => task.project === "general-tasks"));
        const javaScriptProject = new Project("javascript-course", "JavaScript course in the TOP curriculum", "Ongoing", "No notes", taskArray.filter(task => task.project === "javascript-course"));
        const startingStrengthProject = new Project("starting-strength", "Keeping up my gym NLP progress", "Ongoing", "Wrist pain has decreased", taskArray.filter(task => task.project === "starting-strength"));
        projectArray.push(generalProject, javaScriptProject, startingStrengthProject);
        saveToStorage("projectsArray", projectArray);
    }
}

export const loadInitialExamples = (taskArray, projectArray) => {
    // Retrieve from storage and reconstruct instances
    taskArray = loadFromStorage('tasksArray').map(
        task => new Task(task.title, task.description, task.dueDate, task.priority, task.status, task.project, task.checklist)
    );

    projectArray = loadFromStorage('projectsArray').map(
        project => new Project(project.title, project.description, project.status, project.notes, 
            project.tasks.map(task => new Task(task.title, task.description, task.dueDate, task.priority, task.status, task.project, task.checklist))
        )
    );

    projectArray.forEach((project) => {
        projectRender(project, projectArray, taskArray);
    })
}