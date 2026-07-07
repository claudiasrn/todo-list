import Project from '../models/Project.js';

export default class App {
  projects = [];
  activeProjectId = 0;

  addProject(name) {
    this.projects.push(new Project(name));
  }

  deleteProject(id) {
    this.projects = this.projects.filter((p) => p.id !== id);
    this.activeProjectId = 0;
  }

}