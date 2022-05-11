import { isPast, isThisMonth, isThisWeek, isThisYear, isToday, isTomorrow } from 'date-fns';
import pubsub from '../pageActions/pubsub.js';
import { v4 as uuid } from 'uuid';
import Project from './projects.js';
import '../utilities/Custom Object Functions.js';
import storage from '../utilities/localStorage.js';


class TaskList{

    static groupByDate(tasks){
        const Tasks=Object.values(tasks);
        const groups=[];
        const requiredGroups=['In the Past','Today','Tomorrow','This Week','This Month','This Year','Coming Years ;)']
        const checkingFns=  [a=>isToday(a)?false:isPast(a),isToday,isTomorrow,isThisWeek,isThisMonth,isThisYear, ()=>true]
        
        for (const task of Tasks) {
            for (const i in requiredGroups) {
                if(!checkingFns[i](task.date))
                    continue;
                    
                const currGroupName=requiredGroups[i];
                let indexOfGroup=groups.findIndex(group=>group.name===currGroupName);
                //if the group doesnt exist add it to the end of groups array
                if (indexOfGroup===-1)  
                    indexOfGroup=groups.length;

                groups[indexOfGroup]=groups[indexOfGroup]||{name:currGroupName,tasks:{}};
                Object.assign(groups[indexOfGroup].tasks,{[task.id]:task})
                break;
            }
        }

        return groups;
    }
    
    constructor(){
        Object.defineProperty(this,'id',{
            value: uuid(),
            writable: false,
            enumerable: false,
        });
    }

    insertChronologically(currTask){
        //find the task with date just after this one, and splice it there.
        const insertPosition= this.findIndex(element=>(element.date-currTask.date)>0);
        if(insertPosition===-1)
            this[currTask.id]=currTask;
        else
            this.splice(insertPosition,0,[currTask.id,currTask]);
        pubsub.publish('taskListUpdated',this);
    }

    toJSON(){
        const result={};
        for(const [taskID,task] of Object.entries(this)){
            result[taskID]=task.toJSON();
        }
        return result
    }
}

class Task{
    
    static #AllTasks=new TaskList();

    static findById(id){
        return this.#AllTasks[id];
    }

    static get all(){   //wont expose the object, but will provide a copy that can be used by intended parties
        return Object.assign({},this.#AllTasks);
    }

    static #add(task){
        Task.#AllTasks.insertChronologically(task);
        pubsub.publish('updateAllTasksInStorage',Task.#AllTasks)
        pubsub.publish('tasksChanged');
    }

    static #remove(task){
        delete this.#AllTasks[task.id];
        pubsub.publish('updateAllTasksInStorage',Task.#AllTasks)
    }

    #taskName;    
    #taskDate;
    #taskID;
    #projectID;
    #done;

    constructor({taskName,taskDate,projectID,taskID,done}){
        this.#taskName=taskName;
        this.#taskDate=taskDate;
        this.#taskID=taskID?taskID:uuid();
        if(projectID){
            this.#projectID=projectID;
            Project.findById(projectID).addTask(this);
        }
        this.#done=done?done:false;
        Task.#add(this)
    }

    toJSON(){
        return {
            'taskName':this.#taskName,
            'taskDate':this.#taskDate,
            'taskID':this.#taskID,
            'projectID':this.#projectID,
            'done':this.#done
        };
    }

    get date(){
        return this.#taskDate;
    }

    get name(){
        return this.#taskName;
    }

    get status(){
        return this.#done;
    }

    get id(){
        return this.#taskID;
    }

    delete(){
        Task.#remove(this);
        if(this.#projectID)
            Project.findById(this.#projectID).removeTask(this);
        pubsub.publish('tasksChanged');
    }

    toggleDone(){
        this.#done= !this.#done;
        pubsub.publish('updateAllTasksInStorage',Task.all)
    }
}

export {
    Task,
    TaskList
}

/* LOCAL STORAGE STUFF */
// first search local Storage for previously stored allTasks
const storedAllTasks=storage.findAllTasks();

//if it exists, add every task in there to the current Task.#AllTasks object, by initializing each task
if (storedAllTasks)
    for(const task of Object.values(storedAllTasks)){
        task.taskDate=new Date(task.taskDate);
        new Task(task);
    }

pubsub.subscribe('updateAllTasksInStorage',storage.storeAllTasks);  

/* LOCAL STORAGE STUFF */