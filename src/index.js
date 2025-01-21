import "./styles.css";
import Todo from "./todoClass.js";
import todoCreate from "./todoCreate.js";
import todoRender from "./todoRender.js";

// sample task
const newTodo = new Todo("Pick up trash", "Just do it", "31 Jan 2025", "High", "Not started", ["Home", "Away"]);
todoRender(newTodo);

console.log(newTodo);

const addTaskButton = document.querySelector("#add-task-btn");
addTaskButton.addEventListener("click", todoCreate);