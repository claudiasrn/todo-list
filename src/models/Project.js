import Task from './Task.js';

export default class Project {
  constructor(name, tasks = [], id = crypto.randomUUID()) {
    this.name = name;
    this.tasks = tasks;
    this.id = id;
  }

  addTask(title, priority, description = "", dueDate = "", checklist = []) {
    this.tasks.push(new Task(title, priority,description, dueDate, checklist));
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  static fromJSON(project) {
    const tasks = project.tasks.map( (t) => Task.fromJSON(t) );
    return new Project(project.name, tasks, project.id);
  }
}