import Task from './Task.js';

export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.id = crypto.randomUUID();
  }

  addTask(title, priority, description = "", dueDate = "", checklist = []) {
    this.tasks.push(new Task(title, priority,description, dueDate, checklist));
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}