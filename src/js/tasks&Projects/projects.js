import { v4 as uuid } from 'uuid';
import pubsub from '../pageActions/pubsub';
import storage from '../utilities/localStorage';
import { TaskList } from './tasks';

export default class Project{
    static #AllProjects={};

    static findById(id){
        return this.#AllProjects[id];
    }

    static get all(){ //wont expose the object, but will provide a copy that can be used by intended parties
        return Object.assign({},this.#AllProjects);
    }

    static #add(project){
        Project.#AllProjects[project.id]=project;
        pubsub.publish('projectsChanged');
    }

    static #remove(project){
        delete this.#AllProjects[project.id];
        pubsub.publish('projectsChanged');
    }

    #projectName;
    #projectIcon;
    #projectID;
    #tasks;

    constructor({name,icon,id}){
        this.#projectName=name;
        this.#projectIcon=icon;
        this.#projectID=id?id:uuid();
        this.#tasks=new TaskList();

        Project.#add(this);
    }

    toJSON(){
        return {
            'name':this.#projectName,
            'icon':this.#projectIcon,
            'id':this.#projectID,
            // No need to add tasks of project, since the task knows its parent project, and will
            //add itself during its init
        };
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

    edit({name,icon}){
        this.#projectName=name;
        this.#projectIcon=icon;
        pubsub.publish('projectsChanged');
    }

    delete(){
        for (const id in this.#tasks){
            this.#tasks[id].delete();
        }
        Project.#remove(this);
    }
}