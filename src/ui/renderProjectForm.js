import {render} from "./render.js"

const addProjectDialog = document.querySelector("#add-project-dialog");
const addProjectForm = document.querySelector("#add-project-form");
const addProjectSubmitBtn = addProjectForm.querySelector('button[type="submit"]');
const nameInput = document.querySelector('input[name="name"]');

let application;

document.querySelector("#cancel-add-btn").addEventListener("click", () => {
    addProjectDialog.close();
    addProjectForm.reset();
    addProjectSubmitBtn.disabled = true;
});

addProjectForm.addEventListener("input", () => {
    addProjectSubmitBtn.disabled = !addProjectForm.checkValidity();
});

addProjectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value;
    application.addProject(name);

    addProjectDialog.close();
    addProjectForm.reset();
    addProjectSubmitBtn.disabled = true;

    render(application);
});

export function renderProjectForm(app) {
    application = app;
    addProjectDialog.showModal();
    nameInput.focus();
}