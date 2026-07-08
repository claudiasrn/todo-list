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
}