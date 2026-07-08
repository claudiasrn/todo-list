export default class Task {
  constructor(title, priority, description, dueDate, checklist) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist;
    this.completed = false;
    this.id = crypto.randomUUID();
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  editTask(title, priority, description = "", dueDate = "", checklist = []) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist;
  }

  addChecklistItem(name) {
    this.checklist.push(new ListItem(name));
  }

  deleteChecklistItem(id) {
     this.checklist = this.checklist.filter((i) => i.id !== id);
  }
}