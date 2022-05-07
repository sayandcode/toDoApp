import { v4 as uuid } from 'uuid';
import { TaskList } from './tasks';

export default class Project{
    static #AllProjects={};

    static findById(id){
        return this.#AllProjects[id];
    }

    static get allIDs(){
        return [...Object.keys(this.#AllProjects)];
    }

    #projectName;
    #projectIcon;
    #projectID;
    #tasks;

    constructor(name,icon='\\f0ae'){
        this.#projectName=name;
        this.#projectIcon=icon;
        this.#projectID=uuid();
        this.#tasks=new TaskList();

        Project.#AllProjects[this.#projectID]=this;
    }

    get name(){
        return this.#projectName;
    }

    addTask(newTask){
        this.#tasks.insertChronologically(newTask);
    }
}