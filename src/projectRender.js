import todoCreate from "./todoCreate";
import todoRender from "./todoRender";
import Todo from "./todoClass";
import taskDialog from "./taskDialog";

const projectRender = (project, projectArray, taskArray) => {
    const projectsSection = document.querySelector("#projects-section");

    // creating a new project
    const newProjectDiv = document.createElement("div");
    newProjectDiv.className = "project";

    // adding the title, description, date, priority, status, notes
    const projectTitle = document.createElement("h3");
    projectTitle.textContent = project.title;
    newProjectDiv.appendChild(projectTitle);

    const projectDescription = document.createElement("p");
    projectDescription.textContent = `Description: ${project.description}`;
    newProjectDiv.appendChild(projectDescription);

    const projectDueDate = document.createElement("p");
    projectDueDate.textContent = `Due date: ${project.dueDate}`;
    newProjectDiv.appendChild(projectDueDate);

    const projectPriority = document.createElement("p");
    projectPriority.textContent = `Priority: ${project.priority}`;
    newProjectDiv.appendChild(projectPriority);

    const projectStatus = document.createElement("p");
    projectStatus.textContent = `Status: ${project.status}`;
    newProjectDiv.appendChild(projectStatus);

    const projectNotes = document.createElement("p");
    projectNotes.textContent = `Notes: ${project.notes}`;
    newProjectDiv.appendChild(projectNotes);

    // task area
    const taskArea = document.createElement("div");
    const projectTasksTitle = document.createElement("h3");
    projectTasksTitle.textContent = `Tasks:`;
    taskArea.appendChild(projectTasksTitle);

    // button to add (or create) tasks inside a project card
    const addTasksInProject = document.createElement("button");
    addTasksInProject.textContent = "Add task";
    taskArea.appendChild(addTasksInProject);

    // Attach the event listener to the "Add task" button
    addTasksInProject.addEventListener("click", () => {
        taskDialog(project, taskArray);
    });

    newProjectDiv.appendChild(taskArea);

    for (let i = 0; i < project.tasks.length; i++) {
        // creating small versions of tasks
        const miniTask = document.createElement("div");
        miniTask.className = "mini task";

        // adding a title
        const miniTaskTitle = document.createElement("h3");
        miniTaskTitle.textContent = project.tasks[i].title;
        miniTask.appendChild(miniTaskTitle);

        // adding a status
        const miniTaskStatus = document.createElement("p");
        miniTaskStatus.textContent = `Status: ${project.tasks[i].status}`;
        miniTask.appendChild(miniTaskStatus);

        newProjectDiv.appendChild(miniTask);
    }

    // appending the Project to the general Project section
    projectsSection.appendChild(newProjectDiv);

    // Store reference to newProjectDiv in the Project instance
    project.newProjectDiv = newProjectDiv;

    projectArray.push(project);
}

export default projectRender;