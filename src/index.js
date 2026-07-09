import Application from "./state/Application.js"
import { render } from "./ui/render.js"

const app = new Application();
app.loadState();
render(app);