import { Task } from "./task.js";
import { Project } from "./project.js";
import { projectRender } from "./project.js";

export const initialExamples = (taskArray, projectArray) => {
    // create a few sample tasks
    const makeFire = new Task ("Make fire in the fireplace", "Take wood form the shed", "2025-01-10", "High", "Ongoing", "general-tasks");
    const takeOutTrash = new Task ("Take out trash", "Take the trash to the curb", "2025-02-03", "Medium", "Not started", "general-tasks");
    const todoListApp = new Task("Todo List App", "Complete all the project requirements", "2025-02-28", "Medium", "Ongoing", "javascript-course")
    const threeDaysAWeekToGym = new Task("Go to gym 3 times/week", "Instructions are loud and clear in the title", "2025-03-31", "Medium", "Ongoing", "starting-strength");
    taskArray.push(makeFire, takeOutTrash, todoListApp, threeDaysAWeekToGym);

    // creating a few sample projects
    const generalProject = new Project ("general-tasks", "New tasks go here by default", "Ongoing", "No notes to add", taskArray.filter(task => task.project === "general-tasks"));
    projectRender(generalProject, projectArray, taskArray);

    const javaScriptProject = new Project("javascript-course", "JavaScript course in the TOP curriculum", "Ongoing", "No notes", taskArray.filter(task => task.project === "javascript-course"));
    projectRender(javaScriptProject, projectArray, taskArray);

    const startingStrengthProject = new Project("starting-strength", "Keeping up my gym NLP progress", "Ongoing", "Wrist pain has decreased", taskArray.filter(task => task.project === "starting-strength"));
    projectRender(startingStrengthProject, projectArray, taskArray);
}