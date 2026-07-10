import { renderProjectForm } from "./renderProjectForm.js";
import { render } from "./render.js"

let openPanel = null;
let openManageBtn = null;

document.addEventListener("click", (event) => {
    if (!openPanel) return;
    if (!openPanel.contains(event.target) && event.target !== openManageBtn) {
        openPanel.style.display = "none";
        openPanel = null;
        openManageBtn = null;
    }
});

export function renderProjects(app) {
    const container = document.createElement("div");
    
    for (let project of app.projects) {
        let projectRow = document.createElement("div");

        let buttonRow = document.createElement("div");
        buttonRow.classList.add("button-row");

        let button = document.createElement("button");
        button.textContent = project.id === app.defaultProjectId
            ? "★ " + project.name.toUpperCase()
            : project.name.toUpperCase();
        button.addEventListener("click", () => {
            app.activeProjectId = project.id;
            app.expandedTaskId = null;
            render(app);
        });
        buttonRow.append(button);

        if (project.id === app.getActiveProjectId()) {
            let manageBtn = document.createElement("button");
            manageBtn.classList.add("manageBtn");

            manageBtn.textContent = "⋮";

            let panel = buildManagePanel(app, project, button);
            panel.classList.add("panel");
            panel.style.display = "none";

            manageBtn.addEventListener("click", (event) => {
                event.stopPropagation();
                const isOpen = panel.style.display !== "none";
                panel.style.display = isOpen ? "none" : "flex";
                openPanel = isOpen ? null : panel;
                openManageBtn = isOpen ? null : manageBtn;
            });

            buttonRow.append(manageBtn);
            projectRow.append(buttonRow, panel);
            projectRow.classList.add("active");
        } else {
            projectRow.append(buttonRow);
        }

        container.append(projectRow);
    }

    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "+ PROJECT";
    addProjectButton.classList.add("add-project-btn");
    container.append(addProjectButton);
    addProjectButton.addEventListener("click", () => {
        renderProjectForm(app);
    });

    container.classList.add("projects");
    return container;
}

function buildManagePanel(app, project, button) {
    const panel = document.createElement("div");

    const renameLabel = document.createElement("p");
    renameLabel.textContent = "RENAME PROJECT";

    const renameInput = document.createElement("input");
    renameInput.type = "text";
    renameInput.value = project.name;
    renameInput.addEventListener("input", () => {
        app.renameProject(project.id, renameInput.value);
        button.textContent = project.id === app.defaultProjectId
            ? "★ " + renameInput.value.toUpperCase()
            : renameInput.value.toUpperCase();
    });
    renameInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            render(app);
        }
    });

    const defaultBtn = document.createElement("button");
    const isDefault = project.id === app.defaultProjectId;
    defaultBtn.textContent = isDefault ? "★ DEFAULT PROJECT" : "SET AS DEFAULT";
    defaultBtn.disabled = isDefault;
    defaultBtn.addEventListener("click", () => {
        app.changeDefaultProject(project.id);
        render(app);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "DELETE PROJECT";
    deleteBtn.addEventListener("click", () => {
        const confirmed = confirm(`Delete "${project.name}"? This will also delete all its tasks.`);
        if (!confirmed) return;
        app.deleteProject(project.id);
        render(app);
    });

    panel.append(renameLabel, renameInput, defaultBtn, deleteBtn);
    return panel;
}