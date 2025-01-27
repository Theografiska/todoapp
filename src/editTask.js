import initialTaskCharacteristics from "./initialTaskCharacteristics";

const editTask = (taskDiv, taskObj, editBtn, expandBtn, taskInitialCharacteristics, taskExpandedCharacteristics) => {
    console.log(`Hi there`);
    editBtn.classList.add("hidden");
    expandBtn.classList.add("hidden");

    let editMode = true;

    if (editMode) {
        taskInitialCharacteristics.textContent = "";
        const titleDiv = document.createElement("div");
        titleDiv.className = "edit-row";
        const titleLabel = document.createElement("p");
        titleLabel.textContent = "Title: ";
        titleDiv.appendChild(titleLabel);
        const titleInput = document.createElement("input");
        titleInput.value = taskObj.title;
        titleDiv.appendChild(titleInput);
        taskInitialCharacteristics.appendChild(titleDiv);

        const statusDiv = document.createElement("div");
        statusDiv.className = "edit-row";
        const statusLabel = document.createElement("p");
        statusLabel.textContent = "Status: ";
        statusDiv.appendChild(statusLabel);
        const statusSelect = document.createElement("select");
        const statusArray = ["Not started", "Ongoing", "Completed"];
        let options = statusArray.map(item => `<option value="${item}">${item}</option>`).join(`\n`);
        statusSelect.innerHTML = options;        
        statusDiv.appendChild(statusSelect);
        taskInitialCharacteristics.appendChild(statusDiv); 

        const dueDateDiv = document.createElement("div");
        dueDateDiv.className = "edit-row";
        const dueDateLabel = document.createElement("p");
        dueDateLabel.textContent = "Due date: ";
        dueDateDiv.appendChild(dueDateLabel);
        const dueDateInput = document.createElement("input");
        dueDateInput.value = taskObj.dueDate;
        dueDateDiv.appendChild(dueDateInput);
        taskInitialCharacteristics.appendChild(dueDateDiv);

        // buttons to cancel or confirm edits
        const confirmSection = document.createElement("div");
        confirmSection.className = "task-edit-confirm-section";
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "cancel";
        confirmSection.appendChild(cancelBtn);

        const confirmBtn = document.createElement("button");
        confirmBtn.textContent = "confirm";
        confirmSection.appendChild(confirmBtn);

        // cancel button functionality (sets back to previous view)
        cancelBtn.addEventListener("click", () => {
            taskInitialCharacteristics.textContent = "";

            initialTaskCharacteristics(taskObj, taskInitialCharacteristics)

            editMode = false;
            cancelBtn.remove();
            confirmBtn.remove();
            editBtn.classList.remove("hidden");
            expandBtn.classList.remove("hidden");
        })
        
        // confirm button functionality (updates the task object and div)
        confirmBtn.addEventListener("click", () => {
            taskInitialCharacteristics.textContent = "";

            const newTitle = titleInput.value;
            taskObj.title = newTitle;
            const newStatus = statusSelect.value;
            taskObj.status = newStatus;
            const newDueDate = dueDateInput.value;
            taskObj.dueDate = newDueDate;

            initialTaskCharacteristics(taskObj, taskInitialCharacteristics);

            editMode = false;
            cancelBtn.remove()
            confirmBtn.remove();
            editBtn.classList.remove("hidden");
            expandBtn.classList.remove("hidden");
        })

        taskDiv.appendChild(confirmSection);
    }

}

export default editTask;