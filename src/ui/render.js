import { renderProjects } from "./renderProjects.js";
import { renderEmptyState } from "./renderEmptyState.js";
import { renderTasks } from "./renderTasks.js";
import { saveToStorage } from "../state/storage.js";
import { renderHeader } from "./renderHeader.js";

const app = document.querySelector("#app");

export function render(application) {
    app.innerHTML = "";

    saveToStorage("projects", application.projects);
    saveToStorage("defaultProjectId", application.defaultProjectId);

    if (application.projects.length <= 0) {
        app.append( renderEmptyState(application) );
    } else {
        app.append( renderHeader(application) );
        app.append( renderProjects(application) );

        const activeProject = application.findProjectById(application.getActiveProjectId());
        app.append( renderTasks(application, activeProject) );
    }
}