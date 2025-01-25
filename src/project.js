export default class Project {
    constructor(title, description, status, notes, tasks = []) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.notes = notes;
        this.tasks = tasks;
        this.newProjectDiv = null; // Placeholder for the div reference
    }

    addTask(task) {
        this.tasks.push(task);
    }
}
