const initialTaskCharacteristics = (taskObj, taskInitialCharacteristicsDiv) => {
    const taskTitle = document.createElement("h3");
    taskTitle.className = "task-title";
    taskTitle.textContent = taskObj.title;
    taskInitialCharacteristicsDiv.appendChild(taskTitle);

    const taskStatus = document.createElement("div");
    taskStatus.className = "task-status";
    const taskStatusText = document.createElement("p");
    taskStatusText.textContent = `Status: ${taskObj.status}`;
    taskStatus.appendChild(taskStatusText);
    const taskStatusSymbol = document.createElement("div");
    taskStatusSymbol.className = "task-status-symbol";
    taskStatus.appendChild(taskStatusSymbol);
    taskInitialCharacteristicsDiv.appendChild(taskStatus);

    // changing taskDiv color based on task status
    switch(taskObj.status) {
        case 'Not started':
            taskStatusSymbol.style.backgroundColor = "lightgray";
            break;
        case 'Ongoing':
            taskStatusSymbol.style.backgroundColor = "yellow";
            break;
        case 'Completed':
            taskStatusSymbol.style.backgroundColor = "green";
            break;
    }

    const taskDueDate = document.createElement("p");
    taskDueDate.textContent = `Deadline: ${taskObj.dueDate}`;
    taskInitialCharacteristicsDiv.appendChild(taskDueDate);
}

export default initialTaskCharacteristics;