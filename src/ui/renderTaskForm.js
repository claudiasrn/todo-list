import {render} from "./render.js"
import CheckListItem from "../models/ChecklistItem.js";

const addTaskDialog = document.querySelector("#add-task-dialog");
const addTaskForm = document.querySelector("#add-task-form");
const addTaskSubmitBtn = addTaskForm.querySelector('button[type="submit"]');
const titleInput = addTaskForm.querySelector('input[name="title"]');
const descriptionInput = addTaskForm.querySelector('textarea[name="description"]');
const dueDateInput = addTaskForm.querySelector('input[name="due-date"]');
const checklistInput = addTaskForm.querySelector('#add-checklist-item-input');
const addChecklistItemBtn = addTaskForm.querySelector('#add-checklist-item-btn');
const checkListItems = addTaskForm.querySelector('#add-checklist-items');

let project;
let application;
let checkList = [];

document.querySelector("#cancel-add-task-btn").addEventListener("click", () => {
    addTaskDialog.close();
    addTaskForm.reset();
    addChecklistItemBtn.disabled = true;

    checkList = [];
    renderChecklist();
});

addTaskForm.addEventListener("input", () => {
    addTaskSubmitBtn.disabled = !addTaskForm.checkValidity();
});

addTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const description = descriptionInput.value;
    const dueDate = dueDateInput.value;
    const priority = addTaskForm.querySelector('input[name="priority"]:checked').value;

    project.addTask(title, priority, description, dueDate, checkList);

    addTaskDialog.close();
    addTaskForm.reset();
    addChecklistItemBtn.disabled = true;

    checkList = [];
    renderChecklist();

    render(application);
});

checklistInput.addEventListener("input", () => {
    addChecklistItemBtn.disabled = checklistInput.value.trim() === "";
});

checklistInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addChecklistItemBtn.click();
    }
});

addChecklistItemBtn.addEventListener("click", () => {
    if (checklistInput.value === "") return; 

    let name = checklistInput.value;
    let checkListItem = new CheckListItem(name)
    checkList.push(checkListItem);
    checklistInput.value = "";
    addChecklistItemBtn.disabled = true;

    renderChecklist();
});

function renderChecklist() {
    checkListItems.innerHTML = "";

    if (checkList.length === 0) {
        let emptyText = document.createElement("p");
        emptyText.textContent = "No items yet.";
        emptyText.classList.add("checklist-empty");
        checkListItems.append(emptyText);
        return;
    }

    for (let item of checkList) {
        let container = document.createElement("div");

        let deleteListItemBtn = document.createElement("button");
        deleteListItemBtn.textContent = "-";
        deleteListItemBtn.addEventListener("click", () => {
            checkList = checkList.filter((i) => i.id !== item.id);
            renderChecklist();
        });

        let checkListItemElem = document.createElement("p");
        checkListItemElem.textContent = item.name;
        container.append(checkListItemElem, deleteListItemBtn);

        checkListItems.append(container);
    }
}

export function renderTaskForm(app, prj) {
    application = app;
    project = prj;
    renderChecklist(); 
    addTaskDialog.showModal();
}

