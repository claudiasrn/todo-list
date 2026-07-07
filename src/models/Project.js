export default class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.id = crypto.randomUUID();
  }

  addTask(task) {
    this.tasks.push(task);
  }
}