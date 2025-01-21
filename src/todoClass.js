export default class Todo {
    constructor(title, description, dueDate, priority, status, labels) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.labels = labels;
    }

    changeStatus(newStatus) {
        this.status = newStatus;
    }

    changePriority(newPriority) {
        this.priority = newPriority;
    }

    getDueDays() {
        const currentDate = new Date();
        // add function here
    }

    /*
    create functions to:
    1) add labels
    2) remove labels
    */
}

