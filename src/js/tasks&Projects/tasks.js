import { isPast, isThisMonth, isThisWeek, isThisYear, isToday, isTomorrow } from 'date-fns';
import pubsub from '../pageActions/pubsub.js';

export default class Task{
    static AllTasks=[];

    static groupByDate(Tasks){
        const groups={};
        const requiredOrder=['In the Past','Today','Tomorrow','This Week','This Month','This Year','Coming Years ;)']
        const checkingFns=  [a=>isToday(a)?false:isPast(a),isToday,isTomorrow,isThisWeek,isThisMonth,isThisYear, ()=>true]
        for (const task of Tasks) {

            for (const i in requiredOrder) {
                if(checkingFns[i](task.date)){
                    groups.makeOrPush(requiredOrder[i],task)
                    break;
                }
            }
        }
        return groups;
    }

    #taskName;    
    #taskDate;
    #done=false;

    constructor(name,date,project){
        this.#taskName=name;
        this.#taskDate=date;
        if(project)
            project.addTask(this);
        
        //find the task with date just after this one, and splice it there.
        const insertPosition= Task.AllTasks.findIndex(element=>(element.date-this.#taskDate)>0);
        if(insertPosition===-1)
            Task.AllTasks.push(this)
        else
            Task.AllTasks.splice(insertPosition,0,this);

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

    delete(){
        const i=Task.AllTasks.indexOf(this);
        Task.AllTasks.splice(i,1);
        pubsub.publish('tasksChanged');
    }

    toggleDone(){
        this.#done= !this.#done;
    }
}

Object.defineProperty(Object.prototype, 'makeOrPush', {
    value: function (newKey,item){
        this[newKey]=this[newKey]||[];
        this[newKey].push(item);
    }
});