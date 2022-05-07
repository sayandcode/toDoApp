import { isPast, isThisMonth, isThisWeek, isThisYear, isToday, isTomorrow } from 'date-fns';
import pubsub from '../pageActions/pubsub.js';
import { v4 as uuid } from 'uuid';
import Project from './projects.js';
import '../utilities/Custom Object Functions.js'


export default class Task{
    static #AllTasks={};

    static groupByDate(Tasks=this.#AllTasks){
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

    static insertChronologically(currTask){
        //find the task with date just after this one, and splice it there.
        const insertPosition= this.#AllTasks.findIndex(element=>(element.date-currTask.date)>0);
        if(insertPosition===-1)
            this.#AllTasks[currTask.id]=currTask;
        else
            this.#AllTasks.splice(insertPosition,0,[currTask.id,currTask]);
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
        
        Task.insertChronologically(this);
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

