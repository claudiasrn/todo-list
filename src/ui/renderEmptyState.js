export function renderEmptyState() {
    const container = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = "START YOUR FIRST PROJECT";

    const infoText = document.createElement("p");
    infoText.textContent = "Projects keep related tasks together. Give this one a name to lay down the first sheet";

    const button = document.createElement("button");
    button.textContent = "CREATE A PROJECT";

    const stateText = document.createElement("p");
    stateText.textContent = "NO PROJECTS ON FILE";

    container.append(title, infoText, button, stateText);
    return container;
}