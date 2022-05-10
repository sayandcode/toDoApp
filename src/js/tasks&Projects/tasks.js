import { isPast, isThisMonth, isThisWeek, isThisYear, isToday, isTomorrow } from 'date-fns';
import pubsub from '../pageActions/pubsub.js';
import { v4 as uuid } from 'uuid';
import Project from './projects.js';
import '../utilities/Custom Object Functions.js'

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
        })
    }

    insertChronologically(currTask){
        //find the task with date just after this one, and splice it there.
        const insertPosition= this.findIndex(element=>(element.date-currTask.date)>0);
        if(insertPosition===-1)
            this[currTask.id]=currTask;
        else
            this.splice(insertPosition,0,[currTask.id,currTask]);
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

    static remove(task){
        delete this.#AllTasks[task.id];
    }

    #taskName;    
    #taskDate;
    #taskID;
    #projID;
    #done=false;

    constructor(name,date,projID){
        this.#taskName=name;
        this.#taskDate=date;
        this.#taskID=uuid();
        if(projID){
            this.#projID=projID;
            Project.findById(projID).addTask(this);
        }
        
        Task.#AllTasks.insertChronologically(this);
        pubsub.publish('tasksChanged');
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
        Task.remove(this);
        if(this.#projID)
            Project.findById(this.#projID).removeTask(this);
        pubsub.publish('tasksChanged');
    }

    toggleDone(){
        this.#done= !this.#done;
    }
}

export {
    Task,
    TaskList
}

