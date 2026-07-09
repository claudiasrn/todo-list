import Application from "./state/Application.js"
import { render } from "./ui/render.js"
import "./styles/style.css"

const app = new Application();
app.loadState();
render(app);