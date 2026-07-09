import { renderTasks } from "./renderTasks.js";
import { renderProjectForm } from "./renderProjectForm.js";
import Application from "../state/Application.js"
import {render} from "./render.js"

export function renderProjects(app) {
    const container = document.createElement("div");
    
    for (let project of app.projects) {
        let button = document.createElement("button");
        button.textContent = project.name;
        container.append(button);

        button.addEventListener("click", () => {
            app.activeProjectId = project.id;
            render(app);
        });
    }

    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "+ PROJECT";
    container.append(addProjectButton);

    addProjectButton.addEventListener("click", () => {
        renderProjectForm(app);
    });

    return container;
}