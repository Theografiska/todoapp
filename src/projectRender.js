const projectRender = (project) => {
    const projectsSection = document.querySelector("#projects-section");

    // creating a new project
    const newProjectDiv = document.createElement("div");
    newProjectDiv.className = "project";

    // adding a title
    const newProjectTitle = document.createElement("h3");
    newProjectTitle.textContent = project.title;
    newProjectDiv.appendChild(newProjectTitle);

    // adding a description
    const newProjectDescription = document.createElement("p");
    newProjectDescription.textContent = `Description: ${project.description}`;
    newProjectDiv.appendChild(newProjectDescription);

    // adding a due date
    const newProjectDueDate = document.createElement("p");
    newProjectDueDate.textContent = `Due date: ${project.dueDate}`;
    newProjectDiv.appendChild(newProjectDueDate);

    // adding a priority
    const newProjectPriority = document.createElement("p");
    newProjectPriority.textContent = `Priority: ${project.priority}`;
    newProjectDiv.appendChild(newProjectPriority);

    // adding a status
    const newProjectStatus = document.createElement("p");
    newProjectStatus.textContent = `Status: ${project.status}`;
    newProjectDiv.appendChild(newProjectStatus);

    // adding tasks
    const newProjectTasks = document.createElement("h3");
    newProjectTasks.textContent = `Tasks:`;
    newProjectDiv.appendChild(newProjectTasks);

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

    // adding notes
    const newProjectNotes = document.createElement("p");
    newProjectNotes.textContent = `Notes: ${project.notes}`;
    newProjectDiv.appendChild(newProjectNotes);

    // appending the Project to the general Project section
    projectsSection.appendChild(newProjectDiv);
}

export default projectRender;