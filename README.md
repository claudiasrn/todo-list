# Tasks
 
A todo list app built as part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-todo-list)'s JavaScript curriculum, styled after technical drafting / blueprint documents.
 
**[Live demo →](https://claudiasrn.github.io/todo-list/)**
 
## Features
 
- Create, rename, and delete projects, with one set as the default view
- Create, edit, and delete tasks with a title, description, due date, and priority (high / medium / low)
- Per-task checklists — add, complete, and remove individual checklist items
- Visual due-date states: overdue (**E**) and due-today (**T**) markers
- Persists everything to `localStorage`, including safe handling of a first-time visit with no saved data
- Fully responsive.
## Design
 
The interface borrows from architectural and engineering drawings — deep navy canvas, cyan accent lines, a graph-paper background, and a small "title block" in the header reporting live project/task counts, the way a real blueprint reports sheet number and revision.
 
**Typefaces:** [Big Shoulders Stencil](https://fonts.google.com/specimen/Big+Shoulders+Stencil) (headers), [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (labels, dates, buttons), [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) (descriptions), self-hosted via `@font-face`.
 
## Architecture
 
The app is split into four responsibilities, kept deliberately separate:
 
- **`models/`** — `Task`, `Project`, and `CheckListItem` classes. Pure data and the methods that mutate their own state; no DOM knowledge.
- **`state/`** — `Application`, the single source of truth for app-wide state (active project, default project, expanded task), plus `storage.js` for `localStorage` persistence, including rebuilding real class instances from the plain objects `JSON.parse` returns.
- **`ui/`** — one file per rendered piece (projects list, task list, task forms, expanded task view). Builds DOM, attaches its own event listeners, and always talks to `Application` rather than mutating models directly.
- Every mutation triggers one top-level `render()` call that wipes and rebuilds the UI from current state, keeping the DOM and data from ever drifting out of sync.
## Tech stack
 
- Vanilla JavaScript (ES modules), no framework
- [Webpack](https://webpack.js.org/) for bundling and dev server
- [date-fns](https://date-fns.org/) for date formatting and comparisons
- [Lucide](https://lucide.dev/) for icons
- `localStorage` (Web Storage API) for persistence
## Assignment requirements
 
Built to satisfy [The Odin Project's Todo List assignment](https://www.theodinproject.com/lessons/node-path-javascript-todo-list):
 
- Todos as dynamically created objects (via classes), with title, description, due date, priority, and a checklist
- Projects to group todos, with a default project for first-time users
- Application logic separated from DOM rendering
- View all projects, view todos within a project, expand a todo to see/edit details, delete a todo
- Persistence via `localStorage`, tolerant of missing or first-time data