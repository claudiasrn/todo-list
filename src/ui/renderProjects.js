export function renderProjects(projects) {
    const container = document.createElement("div");
    
    for (let project of projects) {
        let button = document.createElement("button");
        button.textContent = project.name;
        container.append(button);
    }

    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "+ PROJECT";
    container.append(addProjectButton);

    return container;
}