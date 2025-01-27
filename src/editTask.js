
const editTask = (taskDiv, taskObj, editBtn) => {
    console.log(`Hi there`);
    editBtn.classList.add("hidden");

    let editMode = true;

    if (editMode) {

    }

    // buttons to cancel or confirm edits
    const confirmSection = document.createElement("div");
    confirmSection.className = "task-edit-confirm-section";
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "cancel";
    confirmSection.appendChild(cancelBtn);

    const confirmBtn = document.createElement("button");
    confirmBtn.textContent = "confirm";
    confirmSection.appendChild(confirmBtn);

    cancelBtn.addEventListener("click", () => {
        editMode = false;
        cancelBtn.remove();
        confirmBtn.remove();
        editBtn.classList.remove("hidden");
    })

    confirmBtn.addEventListener("click", () => {
        editMode = false;
        cancelBtn.remove()
        confirmBtn.remove();
        editBtn.classList.remove("hidden");
    })

    taskDiv.appendChild(confirmSection);

}

export default editTask;