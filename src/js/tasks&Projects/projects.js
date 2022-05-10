import { v4 as uuid } from 'uuid';
import pubsub from '../pageActions/pubsub';
import { TaskList } from './tasks';

export default class Project{
    static #AllProjects={};

    static findById(id){
        return this.#AllProjects[id];
    }

    static get all(){ //wont expose the object, but will provide a copy that can be used by intended parties
        return Object.assign({},this.#AllProjects);
    }

    static remove(project){
        delete this.#AllProjects[project.id];
        pubsub.publish('projectsChanged');
    }

    #projectName;
    #projectIcon;
    #projectID;
    #tasks;

    constructor(name,icon){
        this.#projectName=name;
        this.#projectIcon=icon;
        this.#projectID=uuid();
        this.#tasks=new TaskList();

        Project.#AllProjects[this.#projectID]=this;
        pubsub.publish('projectsChanged');
    }

    get name(){
        return this.#projectName;
    }

    get icon(){
        return this.#projectIcon;
    }

    get id(){
        return this.#projectID;
    }

    get tasks(){
        return Object.assign({},this.#tasks);
    }

    addTask(newTask){
        this.#tasks.insertChronologically(newTask);
    }

    removeTask(task){
        delete this.#tasks[task.id];
    }

    edit(name,icon){
        this.#projectName=name;
        this.#projectIcon=icon;
        pubsub.publish('projectsChanged');
    }

    delete(){
        Project.remove(this);
        for (const id in this.#tasks){
            this.#tasks[id].delete();
        }
    }
}