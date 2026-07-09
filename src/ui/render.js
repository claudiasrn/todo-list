import Application from "../state/Application.js";
import { renderProjects } from "./renderProjects.js";
import { renderEmptyState } from "./renderEmptyState.js";
import { renderTasks } from "./renderTasks.js";
import { saveToStorage } from "../state/storage.js";

const app = document.querySelector("#app");

export function render(application) {
    let activeProject;
    app.innerHTML = "";

    saveToStorage("projects", application.projects);
    saveToStorage("defaultProjectId", application.defaultProjectId)
    
    if (application.projects.length <= 0) {
        app.append( renderEmptyState(application) );
    } else {
        app.append( renderProjects(application) );

        if (application.activeProjectId !== null){
            activeProject = application.findProjectById(application.activeProjectId);
        } else {
            activeProject = application.findProjectById(application.defaultProjectId);
        }

        app.append( renderTasks(application, activeProject) );
    }
}