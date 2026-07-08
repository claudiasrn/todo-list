export default class CheckListItem {
  constructor(name, completed = false, id = crypto.randomUUID()) {
    this.name = name;
    this.completed = completed;
    this.id = id;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  static fromJSON(checklistItem) {
    return new CheckListItem(checklistItem.name, checklistItem.completed, checklistItem.id);
  }
}