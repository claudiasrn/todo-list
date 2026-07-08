import Project from '../models/Project.js';
import { saveToStorage, loadFromStorage } from './storage.js';

export default class App {
  projects = [];
  activeProjectId = 0;
  defaultProjectId = 0;

  addProject(name) {
    this.projects.push(new Project(name));
    saveToStorage("projects", this.projects);
  }

  deleteProject(id) {
    this.projects = this.projects.filter((p) => p.id !== id);
    this.activeProjectId = 0;
    saveToStorage("projects", this.projects);
  }

  changeDefaultProject(id) {
    this.defaultProjectId = this.findProjectById(id).id
    saveToStorage("defaultProjectId", this.defaultProjectId);
  }

  findProjectById(id) {
    return this.projects.find((p) => p.id === id);
  }

}