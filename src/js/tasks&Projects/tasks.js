import { isPast, isThisMonth, isThisWeek, isThisYear, isToday, isTomorrow } from 'date-fns';
import pubsub from '../pageActions/pubsub.js';
import { v4 as uuid } from 'uuid';
import Project from './projects.js';
import '../utilities/Custom Object Functions.js'

class TaskList{
    static #AllTaskLists={};
    
    static findById(Id){
        return this.#AllTaskLists[Id];
    }

    static groupByDate(taskListID){
        const Tasks=TaskList.findById(taskListID);
        const groups={};
        const requiredGroups=['In the Past','Today','Tomorrow','This Week','This Month','This Year','Coming Years ;)']
        const checkingFns=  [a=>isToday(a)?false:isPast(a),isToday,isTomorrow,isThisWeek,isThisMonth,isThisYear, ()=>true]
        
        for (const taskID in Tasks) {
            for (const i in requiredGroups) {
                if(checkingFns[i](Tasks[taskID].date)){
                    groups.makeOrPush(Tasks[taskID],requiredGroups[i])
                    break;
                }
            }
        }

        return groups;
    }
    
    constructor(){
        Object.defineProperty(this,'ID',{
            value: uuid(),
            writable: false,
            enumerable: false,
        })
        TaskList.#AllTaskLists[this.ID]=this;
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

    static get all(){   //wont expose the object, but will provide a reference that can be used by intended parties
        return this.#AllTasks.ID;
    }

    static remove(task){
        delete this.#AllTasks[task.id];
        pubsub.publish('tasksChanged');
    }

    #taskName;    
    #taskDate;
    #taskID;
    #done=false;

    constructor(name,date,projID){
        this.#taskName=name;
        this.#taskDate=date;
        this.#taskID=uuid();
        if(projID)
            Project.findById(projID).addTask(this);
        
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
        Task.remove(this)
    }

    toggleDone(){
        this.#done= !this.#done;
    }
}

export {
    Task,
    TaskList
}

