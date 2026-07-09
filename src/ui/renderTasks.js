import { renderTaskForm } from "./renderTaskForm.js";
import Task from "../models/Task.js";
import { render } from "./render.js"
import { renderExpandedTask } from "./renderExpandedTask.js";

export function renderTasks(app, prj) {
    let completed = 0;

    const container = document.createElement("div");
    
    const tasksContainer = document.createElement("div");
    for (let task of prj.tasks) {
        let taskContainer = document.createElement("div");

        let doneBtn = document.createElement("button");
        doneBtn.addEventListener("click", () => {
            task.toggleComplete();
            render(app);
        });

        let name = document.createElement("p");
        name.textContent = task.title.toUpperCase();

        let date = document.createElement("p");
        date.textContent = task.dueDate.toUpperCase();

        let priority = document.createElement("p");
        priority.textContent = task.priority.toUpperCase();

        const isExpanded = task.id === app.expandedTaskId;

        let toggleBtn = document.createElement("button");
        toggleBtn.textContent = isExpanded ? "^" : "⌄";
        toggleBtn.addEventListener("click", () => {
            app.toggleExpandedTask(task.id);
            render(app);
        });

        taskContainer.append(doneBtn, name, date, priority, toggleBtn);

        if (isExpanded) {
            renderExpandedTask(app, prj, task, taskContainer);
        }

        tasksContainer.append(taskContainer);

        if (task.completed) completed++;
    }

    const status = document.createElement("p");
    status.textContent = prj.tasks.length + " TASKS /" + completed + " COMPLETE"

    const addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "NEW TASK";
    addTaskBtn.addEventListener("click", () => {
        renderTaskForm(app, prj);
    });

    container.append(status, addTaskBtn, tasksContainer);

    return container;
}