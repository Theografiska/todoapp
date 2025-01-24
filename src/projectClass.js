export default class Project {
    constructor(title, description, dueDate, priority, status, notes, tasks) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.notes = notes;
        this.tasks = tasks;
        this.newProjectDiv = null; // Placeholder for the div reference
    }

    addTask(task) {
        this.tasks.push(task); 

        const miniTask = document.createElement("div");
        miniTask.className = "mini task";

        const miniTaskTitle = document.createElement("h3");
        miniTaskTitle.textContent = task.title;
        miniTask.appendChild(miniTaskTitle);

        const miniTaskStatus = document.createElement("p");
        miniTaskStatus.textContent = `Status: ${task.status}`;
        miniTask.appendChild(miniTaskStatus);

        if (this.newProjectDiv) {
            this.newProjectDiv.appendChild(miniTask);
        } else {
            console.error("newProjectDiv is not defined for this project.");
        }    
    }
}
