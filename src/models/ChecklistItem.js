export default class CheckListItem {
  constructor(name) {
    this.name = name;
    this.completed = false;
    this.id = crypto.randomUUID();
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}