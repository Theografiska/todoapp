const todoRender = (todo, taskArray, project) => {
    project.addTask(todo);
    taskArray.push(todo);
}

export default todoRender;