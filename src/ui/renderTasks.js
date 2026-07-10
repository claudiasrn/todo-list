import { renderTaskForm } from "./renderTaskForm.js";
import { render } from "./render.js"
import { renderExpandedTask } from "./renderExpandedTask.js";
import { format, isPast, isToday } from "date-fns";
import { createElement, ChevronDown, ChevronUp } from "lucide";

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
        date.textContent = task.dueDate ? format(new Date(task.dueDate), "MMM dd").toUpperCase() : "";

        const dueDateObj = task.dueDate ? new Date(task.dueDate) : null;
        const isExpired = dueDateObj && isPast(dueDateObj) && !isToday(dueDateObj) && !task.completed;
        const isDueToday = dueDateObj && isToday(dueDateObj) && !task.completed;

        let expiredMark = document.createElement("p");

        if (isExpired) {
            expiredMark.textContent = "E";
            date.classList.add("expired");
            expiredMark.classList.add("expired");
        } else if (isDueToday) {
            expiredMark.textContent = "T";
            date.classList.add("expires-today");
            expiredMark.classList.add("expires-today");
        }

        let priority = document.createElement("p");
        priority.textContent = task.priority.toUpperCase();
        priority.classList.add("priority");
        priority.dataset.priority = task.priority; 

        const isExpanded = task.id === app.expandedTaskId;

        let toggleBtn = document.createElement("button");
        const toggleIcon = createElement(isExpanded ? ChevronUp : ChevronDown, {
            width: 16,
            height: 16,
        });
        toggleBtn.append(toggleIcon);
        toggleBtn.addEventListener("click", () => {
            app.toggleExpandedTask(task.id);
            render(app);
        });

        const leftPart = document.createElement("div");
        const rightPart = document.createElement("div");

        if (task.completed) {
            doneBtn.classList.add("done-btn-completed");
            name.classList.add("name-completed");
            rightPart.append(toggleBtn);
        } else {
            doneBtn.classList.add("done-btn");
            name.classList.add("task-name");
            rightPart.append(date, expiredMark, priority, toggleBtn);
        }

        leftPart.append(doneBtn, name);
        taskContainer.append(leftPart, rightPart);

        if (isExpanded) {
            taskContainer.classList.add("expanded");
            renderExpandedTask(app, prj, task, taskContainer);
        }

        tasksContainer.append(taskContainer);

        if (task.completed) completed++;
    }

    const status = document.createElement("p");
    status.textContent = prj.tasks.length + " TASKS / " + completed + " COMPLETE"

    const addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "NEW TASK";
    addTaskBtn.addEventListener("click", () => {
        renderTaskForm(app, prj);
    });

    const topPart = document.createElement("div");
    topPart.append(status, addTaskBtn);
    topPart.classList.add("top-part");

    tasksContainer.classList.add("tasks-container");

    container.append(topPart, tasksContainer);
    container.classList.add("tasks");

    return container;
}