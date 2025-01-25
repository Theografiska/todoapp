const expandTask = (taskDiv, taskObj) => {
    const taskTitle = document.createElement("h3");
    taskTitle.textContent = taskObj.title;
    taskDiv.appendChild(taskTitle);

    const taskDueDate = document.createElement("p");
    taskDueDate.textContent = `Deadline: ${taskObj.dueDate}`;
    taskDiv.appendChild(taskDueDate);

    const taskCharacteristics = document.createElement("div");
    taskCharacteristics.className = "task-characteristics";
    taskDiv.appendChild(taskCharacteristics);

    // changing taskDiv color based on task status
    switch(taskObj.status) {
        case 'Not started':
            taskDiv.style.backgroundColor = "lightgray";
            break;
        case 'Ongoing':
            taskDiv.style.backgroundColor = "#FFFFC2";
            break;
        case 'Completed':
            taskDiv.style.backgroundColor = "#B3C981";
            break;
    }

    const expandButton = document.createElement("button");
    expandButton.textContent = "Detailed view";
    taskDiv.appendChild(expandButton);

    // listener for opening the full task view
    expandButton.addEventListener("click", () => {
        if (taskDiv.className === "task mini") {
            taskDiv.classList.remove("mini");

            const taskDescription = document.createElement("p");
            taskDescription.textContent = taskObj.description;
            taskCharacteristics.appendChild(taskDescription);

            const taskPriority = document.createElement("p");
            taskPriority.textContent = `Priority: ${taskObj.priority}`;
            
            taskCharacteristics.appendChild(taskPriority);

            const taskStatus = document.createElement("p");
            taskStatus.textContent = `Status: ${taskObj.status}`;
            taskCharacteristics.appendChild(taskStatus);

            const taskProject = document.createElement("p");
            taskProject.textContent = `Project: #${taskObj.project}`;
            taskCharacteristics.appendChild(taskProject);

            expandButton.textContent = "Shrink";
        } else {
            taskDiv.classList.add("mini");
            expandButton.textContent = "Detailed view";
            taskCharacteristics.textContent = "";
        }
    })
}

export default expandTask;