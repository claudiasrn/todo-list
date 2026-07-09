import CheckListItem from './ChecklistItem.js';

export default class Task {
  constructor(title, priority, description = "", dueDate = null, checklist = [], completed = false, id = crypto.randomUUID()) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist;
    this.completed = completed;
    this.id = id;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  editTask(title, priority, description = "", dueDate = null) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  addChecklistItem(name) {
    this.checklist.push(new CheckListItem(name));
  }

  deleteChecklistItem(id) {
     this.checklist = this.checklist.filter((i) => i.id !== id);
  }

  static fromJSON(task) {
    const checklist = task.checklist.map( (i) => CheckListItem.fromJSON(i) );
    return new Task(task.title, task.priority, task.description, task.dueDate, checklist, task.completed, task.id);
  }
}