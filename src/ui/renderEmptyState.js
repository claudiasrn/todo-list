import { renderProjectForm } from "./renderProjectForm.js";

export function renderEmptyState(app) {
    const container = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = "START YOUR FIRST PROJECT";

    const infoText = document.createElement("p");
    infoText.textContent = "Projects keep related tasks together. Give this one a name to lay down the first sheet";

    const createBtn = document.createElement("button");
    createBtn.textContent = "CREATE A PROJECT";
    createBtn.addEventListener("click", () => {
        renderProjectForm(app);
    });

    const stateText = document.createElement("p");
    stateText.textContent = "NO PROJECTS ON FILE";

    container.append(title, infoText, createBtn, stateText);
    return container;
}