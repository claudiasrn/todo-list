export function renderTasks(tasks) {
    const container = document.createElement("div");
    
    for (let task of tasks) {
        let taskContainer = document.createElement("div");

        let doneBtn = document.createElement("button");

        let name = document.createElement("p");
        name.textContent = task.title.toUpperCase();

        let date = document.createElement("p");
        date.textContent = task.dueDate.toUpperCase();

        let priority = document.createElement("p");
        priority.textContent = task.priority.toUpperCase();

        let openBtn = document.createElement("button");
        openBtn.textContent = "⌄"

        taskContainer.append(doneBtn, name, date, priority, openBtn);
        container.append(taskContainer);
    }

    return container;
}