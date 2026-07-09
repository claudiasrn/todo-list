export function renderHeader(app) {
    const header = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = "TASKS";

    const openTaskCount = app.projects.reduce((count, project) => {
        return count + project.tasks.filter((task) => !task.completed).length;
    }, 0);

    const titleBlock = document.createElement("div");
    titleBlock.append(
        buildField("PROJECTS", String(app.projects.length).padStart(2, "0")),
        buildField("OPEN TASKS", String(openTaskCount).padStart(2, "0")),
        buildField("DATE", new Date())
    );

    header.append(title, titleBlock);
    return header;
}

function buildField(label, value) {
    const field = document.createElement("div");

    const labelElem = document.createElement("p");
    labelElem.textContent = label;

    const valueElem = document.createElement("p");
    valueElem.textContent = value;

    field.append(labelElem, valueElem);
    return field;
}