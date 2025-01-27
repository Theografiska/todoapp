import createTask from "./createTask";
import renderTask from "./renderTask"
import expandTask from "./expandTask";
import deleteTask from "./deleteTask";
import deleteProject from "./deleteProject";
import taskPlus from "./assets/add_circle_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";
import edit from "./assets/edit_16dp_666666_FILL0_wght400_GRAD0_opsz20.svg"


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

            renderTask(taskDiv, currentTask);
            deleteTask(taskDiv, currentTask, project, taskArray) // event listener to remove task div from the DOM and allTasks array

            taskArea.appendChild(taskDiv);
        }

        tasksSection.appendChild(taskArea);
        console.log(project);


    } else {  // other projects are displayed as a project card 
        const newProjectDiv = document.createElement("div");
        newProjectDiv.className = "project";
        newProjectDiv.id = `${project.title}-div`;

        // adding the title, description, date, priority, status, notes
        const projectTitle = document.createElement("h3");
        projectTitle.className = "project-title";
        projectTitle.textContent = `#${project.title}`;
        newProjectDiv.appendChild(projectTitle);

        const projectDescription = document.createElement("p");
        projectDescription.textContent = `${project.description}`;
        newProjectDiv.appendChild(projectDescription);

        const projectStatus = document.createElement("p");
        projectStatus.textContent = `Status: ${project.status}`;
        newProjectDiv.appendChild(projectStatus);

        const projectNotes = document.createElement("p");
        projectNotes.textContent = `Notes: ${project.notes}`;
        newProjectDiv.appendChild(projectNotes);

        const projectTasksTitle = document.createElement("h3");
        projectTasksTitle.textContent = `Tasks:`;
        newProjectDiv.appendChild(projectTasksTitle);

        // task area
        const taskArea = document.createElement("div");
        taskArea.className = "task-area";
        taskArea.id = `${project.title}-task-area`
        

        for (let i = 0; i < project.tasks.length; i++) {
            // creating small versions of tasks
            const taskDiv = document.createElement("div");
            taskDiv.className = "task mini";

            const currentTask = project.tasks[i];
    
            renderTask(taskDiv, currentTask);   
            deleteTask(taskDiv, currentTask, project, taskArray)     
    
            taskArea.appendChild(taskDiv);
        }
        newProjectDiv.appendChild(taskArea);

        // add task button inside project view
        const addTaskBtn = document.createElement("button");
        addTaskBtn.className = "add-task-btn-class";
        const taskPlusImg = document.createElement("div");
        taskPlusImg.className = "task-plus";
        taskPlusImg.style.background = `url(${taskPlus})`;
        addTaskBtn.appendChild(taskPlusImg);
        const taskText = document.createElement("h4");
        taskText.textContent = "Add task";
        addTaskBtn.appendChild(taskText);
        newProjectDiv.appendChild(addTaskBtn);

        addTaskBtn.addEventListener("click", () => {
            createTask(taskArray, projectArray);
        })

        // edit button functionality
        const editProjectBtn = document.createElement("button");
        editProjectBtn.className = "edit-project-btn";
        editProjectBtn.style.background = `url(${edit})`;
        newProjectDiv.appendChild(editProjectBtn);
        
        /// delete button functionality
        deleteProject(newProjectDiv, project, projectArray, taskArray);

        projectsSection.appendChild(newProjectDiv);

        console.log(project);

    }
}

export default projectRender;