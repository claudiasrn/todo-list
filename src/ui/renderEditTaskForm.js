import {render} from "./render.js"

const editTaskDialog = document.querySelector("#edit-task-dialog");
const editTaskForm = document.querySelector("#edit-task-form");
const editTaskSubmitBtn = editTaskForm.querySelector('button[type="submit"]');
const titleInput = editTaskForm.querySelector('input[name="title"]');
const descriptionInput = editTaskForm.querySelector('textarea[name="description"]');
const dueDateInput = editTaskForm.querySelector('input[name="due-date"]');
const checklistInput = editTaskForm.querySelector('#edit-checklist-item-input');
const addChecklistItemBtn = editTaskForm.querySelector('#edit-checklist-item-btn');
const checkListItems = editTaskForm.querySelector('#edit-checklist-items');

let task;
let application;

document.querySelector("#cancel-edit-btn").addEventListener("click", () => {
    editTaskDialog.close();
    editTaskForm.reset();
});

editTaskForm.addEventListener("input", () => {
    editTaskSubmitBtn.disabled = !editTaskForm.checkValidity();
});

editTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const description = descriptionInput.value;
    const dueDate = dueDateInput.value || null;
    const priority = editTaskForm.querySelector('input[name="priority"]:checked').value;

    task.editTask(title, priority, description, dueDate);

    editTaskDialog.close();
    editTaskForm.reset();

    render(application);
});

checklistInput.addEventListener("input", () => {
    addChecklistItemBtn.disabled = checklistInput.value.trim() === "";
});


addChecklistItemBtn.addEventListener("click", () => {
    if (checklistInput.value === "") return; 

    let name = checklistInput.value;
    task.addChecklistItem(name);
    checklistInput.value = "";
    addChecklistItemBtn.disabled = true;

    renderChecklist();
});

function renderChecklist() {
    checkListItems.innerHTML = "";

    if (task.checklist.length === 0) {
        let emptyText = document.createElement("p");
        emptyText.textContent = "No items yet.";
        emptyText.classList.add("checklist-empty");
        checkListItems.append(emptyText);
        return;
    }

    for (let item of task.checklist) {
        let container = document.createElement("div");

        let checkListItemElem = document.createElement("p");
        checkListItemElem.textContent = item.name;
        container.append(checkListItemElem);

        let deleteListItemBtn = document.createElement("button");
        deleteListItemBtn.textContent = "-";
        container.append(deleteListItemBtn);
        deleteListItemBtn.addEventListener("click", () => {
            task.deleteChecklistItem(item.id);
            renderChecklist();
        });

        checkListItems.append(container);
    }
}

export function renderEditTaskForm(app, t) {
    application = app;
    task =t;

    titleInput.value = task.title;
    descriptionInput.value = task.description;
    dueDateInput.value = task.dueDate ?? "";
    editTaskForm.querySelector(`input[value="${task.priority}"]`).checked = true;

    editTaskDialog.showModal();
    renderChecklist();
}