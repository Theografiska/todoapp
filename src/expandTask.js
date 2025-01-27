import fullScreen from "./assets/fullscreen_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";
import minimize from "./assets/close_fullscreen_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";
import edit from "./assets/edit_16dp_666666_FILL0_wght400_GRAD0_opsz20.svg";

import editTask from "./editTask";

const expandTask = (taskDiv, taskObj, expandBtn, editBtn, taskInitialCharacteristics, taskExpandedCharacteristics) => {
    // listener for opening the full task view
    if (taskDiv.className === "task mini") {
        taskDiv.classList.remove("mini");
        editBtn.classList.remove("hidden");

        const taskDescription = document.createElement("p");
        taskDescription.textContent = taskObj.description;
        taskExpandedCharacteristics.appendChild(taskDescription);

        const taskPriority = document.createElement("p");
        taskPriority.textContent = `Priority: ${taskObj.priority}`;
        taskExpandedCharacteristics.appendChild(taskPriority);

        const taskProject = document.createElement("p");
        taskProject.textContent = `Project: #${taskObj.project}`;
        taskExpandedCharacteristics.appendChild(taskProject);

        expandBtn.style.background = `url(${minimize})`;

        // add functionality for editing data
        if (!editBtn.dataset.listener) {
            editBtn.addEventListener("click", () => {
                editTask(taskDiv, taskObj, editBtn, expandBtn, taskInitialCharacteristics, taskExpandedCharacteristics)
            })

            editBtn.dataset.listener = "true";
        }

    } else {
        taskDiv.classList.add("mini");
        editBtn.classList.add("hidden");
        expandBtn.style.background = `url(${fullScreen})`;
        taskExpandedCharacteristics.textContent = "";
    }
}

export default expandTask;