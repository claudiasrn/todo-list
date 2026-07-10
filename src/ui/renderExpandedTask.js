import { render } from "./render.js";
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

            if (listItem.completed) {
                doneBtn.classList.add("done-btn-completed");
                name.classList.add("name-completed");
                completedItems++;
            } else {
                doneBtn.classList.add("done-btn");
                name.classList.add("task-name");
            }

            container.append(doneBtn, name);
            checklist.append(container);
        }
        label.textContent = "CHECKLIST - " + task.checklist.length + "/" + completedItems;

        checklistElem.classList.add("checklist");
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

    const expandedContent = document.createElement("div");
    expandedContent.classList.add("expanded-content");

    const buttons = document.createElement("div");
    buttons.append(editBtn, deleteBtn)

    expandedContent.append(description, checklistElem, buttons);

    taskContainer.append(expandedContent);
}