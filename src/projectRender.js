import expandTask from "./expandTask";

const projectRender = (project) => {
    const projectsSection = document.querySelector("#projects-section");

    // general tasks project (displayed as just general tasks):
    if (project.title === "General tasks") {
        const tasksSection = document.querySelector("#tasks-section");
        const taskArea = document.createElement("div");
        taskArea.className = "task-area";

        for (let i = 0; i < project.tasks.length; i++) {
            const taskDiv = document.createElement("div");
            taskDiv.className = "task mini";

            const currentTask = project.tasks[i];
            /* add module here taking into account task div, plus task object */

            expandTask(taskDiv, currentTask);
            
            // delete button functionality
            const taskDeleteButton = document.createElement("button");
            taskDeleteButton.textContent = "Delete task";
            taskDiv.appendChild(taskDeleteButton);

            taskDeleteButton.addEventListener("click", () => {
                const taskIndex = project.tasks.indexOf(currentTask);
                project.tasks.splice(taskIndex, 1);
                taskDiv.remove();
            })

            taskArea.appendChild(taskDiv);
        }

        tasksSection.appendChild(taskArea);

    // other projects are displayed properly 
    } else {
        const newProjectDiv = document.createElement("div");
        newProjectDiv.className = "project";

        // adding the title, description, date, priority, status, notes
        const projectTitle = document.createElement("h3");
        projectTitle.textContent = project.title;
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
        const projectTasksTitle = document.createElement("h3");
        projectTasksTitle.textContent = `Tasks:`;
        taskArea.appendChild(projectTasksTitle);
        for (let i = 0; i < project.tasks.length; i++) {
            // creating small versions of tasks
            const task = document.createElement("div");
            task.className = "mini task";
    
            // adding a title
            const taskTitle = document.createElement("h3");
            taskTitle.textContent = project.tasks[i].title;
            task.appendChild(taskTitle);
    
            // adding a status
            const taskStatus = document.createElement("p");
            taskStatus.textContent = `Status: ${project.tasks[i].status}`;
            task.appendChild(taskStatus);
    
            taskArea.appendChild(task);
        }

        newProjectDiv.appendChild(taskArea);
        projectsSection.appendChild(newProjectDiv);
    }
}

export default projectRender;