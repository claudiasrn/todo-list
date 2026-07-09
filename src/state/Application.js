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

    if (this.defaultProjectId === null) {
        this.defaultProjectId = project.id;
    }
  }

  deleteProject(id) {
    this.projects = this.projects.filter((p) => p.id !== id);
    this.activeProjectId = null;

    if (id === this.defaultProjectId) {
      if (this.projects.length <= 0) {
        this.defaultProjectId = null;
      } else {
        this.defaultProjectId = this.projects[0].id;
      }
    }
  }

  changeDefaultProject(id) {
    this.defaultProjectId = this.findProjectById(id).id
  }

  getActiveProjectId() {
    return this.activeProjectId ?? this.defaultProjectId;
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

  renameProject(id, name) {
    this.findProjectById(id).rename(name);
  }

}