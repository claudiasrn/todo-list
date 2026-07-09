import Project from '../models/Project.js';
import {loadFromStorage} from './storage.js';

export default class App {
  projects = [];
  activeProjectId = null;
  defaultProjectId = null;
  expandedTaskId = null;

  addProject(name) {
    let project = new Project(name)
    this.projects.push(project);
    this.activeProjectId = project.id;
  }

  deleteProject(id) {
    this.projects = this.projects.filter((p) => p.id !== id);
    this.activeProjectId = null;
  }

  changeDefaultProject(id) {
    this.defaultProjectId = this.findProjectById(id).id
  }

  findProjectById(id) {
    return this.projects.find((p) => p.id === id);
  }

  loadState() {
    const rawProjects = loadFromStorage("projects") ?? [];
    this.projects = rawProjects.map( p => Project.fromJSON(p) );
    this.defaultProjectId = loadFromStorage("defaultProjectId") ?? null;
  }

  toggleExpandedTask(id) {
    this.expandedTaskId = this.expandedTaskId === id ? null : id;
  }

}