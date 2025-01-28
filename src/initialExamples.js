import { Task } from "./task.js";
import { Project } from "./project.js";
import { projectRender } from "./project.js";

export const initialExamples = (taskArray, projectArray) => {
    // create a few sample tasks
    const makeFire = new Task ("Make fire in the fireplace", "Take wood form the shed", "24.01.2025", "High", "Completed", "general-tasks");
    const takeOutTrash = new Task ("Take out trash", "Take the trash to the curb", "25.01.2025", "Medium", "Not started", "general-tasks");
    const todoListApp = new Task("Todo List App", "Complete all the project requirements", "31.01.2025", "Medium", "Ongoing", "javascript-course")
    const threeDaysAWeekToGym = new Task("Go to gym 3 times/week", "Instructions are loud and clear in the title", "31.01.2025", "Medium", "Ongoing", "starting-strength");
    taskArray.push(makeFire, takeOutTrash, todoListApp, threeDaysAWeekToGym);

    // creating a few sample projects
    const generalProject = new Project ("general-tasks", "New tasks go here by default", "Ongoing", "No notes to add", taskArray.filter(task => task.project === "general-tasks"));
    projectRender(generalProject, projectArray, taskArray);

    const javaScriptProject = new Project("javascript-course", "JavaScript course in the TOP curriculum", "Ongoing", "No notes", taskArray.filter(task => task.project === "javascript-course"));
    projectRender(javaScriptProject, projectArray, taskArray);

    const startingStrengthProject = new Project("starting-strength", "Keeping up my gym NLP progress", "Ongoing", "Wrist pain has decreased", taskArray.filter(task => task.project === "starting-strength"));
    projectRender(startingStrengthProject, projectArray, taskArray);
}