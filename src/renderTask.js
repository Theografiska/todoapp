import fullScreen from "./assets/fullscreen_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";
import minimize from "./assets/close_fullscreen_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";
import edit from "./assets/edit_16dp_666666_FILL0_wght400_GRAD0_opsz20.svg"

import initialTaskCharacteristics from "./initialTaskCharacteristics";
import expandTask from "./expandTask";
import deleteTask from "./deleteTask";

const renderTask = (taskDiv, taskObj) => {
    const taskInitialCharacteristics = document.createElement("div");

    initialTaskCharacteristics(taskObj, taskInitialCharacteristics);

    const expandButton = document.createElement("button");
    expandButton.style.background = `url(${fullScreen})`;
    expandButton.className = "task-expand-btn";
    taskDiv.appendChild(expandButton);

    const taskEditButton = document.createElement("button");
    taskEditButton.className = "task-edit-btn hidden";
    taskEditButton.style.background = `url(${edit})`;
    taskDiv.appendChild(taskEditButton);

    taskDiv.appendChild(taskInitialCharacteristics);

    const taskExpandedCharacteristics = document.createElement("div");
    taskExpandedCharacteristics.className = "task-expanded-characteristics";
    taskDiv.appendChild(taskExpandedCharacteristics);

    // listener for opening the full task view
    expandButton.addEventListener("click", () => {
        expandTask(taskDiv, taskObj, expandButton, taskEditButton, taskInitialCharacteristics, taskExpandedCharacteristics)
    })
}

export default renderTask;