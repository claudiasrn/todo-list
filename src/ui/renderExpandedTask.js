import CheckListItem from "../models/ChecklistItem.js";
import { render } from "./render.js";
import Task from "../models/Task.js";
import { renderTasks } from "./renderTasks.js";
import { renderEditTaskForm } from "./renderEditTaskForm.js";

export function renderExpandedTask(app, prj, task, taskContainer) {

    let completedItems = 0;
    
    const description = document.createElement("p");
    description.textContent = task.description;

    const checklistElem = document.createElement("div")
    if(task.checklist.length) {
        const label = document.createElement("p");

        const checklist = document.createElement("div");
        for (let listItem of task.checklist) {
            let container = document.createElement("div");

            let doneBtn = document.createElement("button");
            doneBtn.addEventListener("click", () => {
                listItem.toggleComplete();
                render(app);
            });

            let name = document.createElement("p");
            name.textContent = listItem.name;

            if (listItem.completed) completedItems++;

            container.append(doneBtn, name);
            checklist.append(container);
        }

        label.textContent = "CHECKLIST - " + task.checklist.length + "/" + completedItems;

        checklistElem.append(label, checklist);
    }

    const editBtn = document.createElement("button");
    editBtn.textContent = "EDIT";
    editBtn.addEventListener("click", () => {
        renderEditTaskForm(app, task);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "DELETE";
    deleteBtn.addEventListener("click", () => {
        prj.deleteTask(task.id)
        render(app);
    });

    taskContainer.append(description, checklistElem, editBtn, deleteBtn);
}