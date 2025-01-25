import expandTask from "./expandTask";
import deleteTask from "./deleteTask";

const projectRender = (project, projectArray, taskArray) => {
    // adding the project to all projects array
    projectArray.push(project);
    console.log(projectArray);

    const projectsSection = document.querySelector("#projects-section");
    // general tasks project (displayed as just general tasks):
    if (project.title === "general-tasks") {
        const tasksSection = document.querySelector("#tasks-section");
        const taskArea = document.createElement("div");
        taskArea.id = `${project.title}-task-area`
        taskArea.className = "task-area";

        for (let i = 0; i < project.tasks.length; i++) {
            const taskDiv = document.createElement("div");
            taskDiv.className = "task mini";

            const currentTask = project.tasks[i];

            expandTask(taskDiv, currentTask);  // populates the task div and adds event listener for more detailed view button functionality 
            deleteTask(taskDiv, currentTask, project, taskArray) // event listener to remove task div from the DOM and allTasks array

            taskArea.appendChild(taskDiv);
        }

        tasksSection.appendChild(taskArea);
        console.log(project);

    // other projects are displayed as a project card 
    } else {
        const newProjectDiv = document.createElement("div");
        newProjectDiv.className = "project";
        newProjectDiv.id = `${project.title}-div`;

        // adding the title, description, date, priority, status, notes
        const projectTitle = document.createElement("h3");
        projectTitle.className = "project-title";
        projectTitle.textContent = `#${project.title}`;
        newProjectDiv.appendChild(projectTitle);

        const projectDescription = document.createElement("p");
        projectDescription.textContent = `Description: ${project.description}`;
        newProjectDiv.appendChild(projectDescription);

        const projectStatus = document.createElement("p");
        projectStatus.textContent = `Status: ${project.status}`;
        newProjectDiv.appendChild(projectStatus);

        const projectNotes = document.createElement("p");
        projectNotes.textContent = `Notes: ${project.notes}`;
        newProjectDiv.appendChild(projectNotes);

        // task area
        const taskArea = document.createElement("div");
        taskArea.id = `${project.title}-task-area`
        const projectTasksTitle = document.createElement("h3");
        projectTasksTitle.textContent = `Tasks:`;
        taskArea.appendChild(projectTasksTitle);
        for (let i = 0; i < project.tasks.length; i++) {
            // creating small versions of tasks
            const taskDiv = document.createElement("div");
            taskDiv.className = "task mini";

            const currentTask = project.tasks[i];
    
            expandTask(taskDiv, currentTask);   
            deleteTask(taskDiv, currentTask, project, taskArray)     
    
            taskArea.appendChild(taskDiv);
        }
        newProjectDiv.appendChild(taskArea);
        projectsSection.appendChild(newProjectDiv);

        console.log(project);

    }
}

export default projectRender;