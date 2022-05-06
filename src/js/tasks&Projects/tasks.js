import { isSameDay, isSameMonth, isSameWeek, isSameYear } from 'date-fns';
import pubsub from '../pageActions/pubsub.js';



export default class Task{
    static AllTasks=[];

    #taskName;    
    #taskDate;

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
        console.log(Task.AllTasks);

        pubsub.publish('tasksChanged');
    }

    get date(){
        return this.#taskDate;
    }

    get name(){
        return this.#taskName;
    }

    static groupByDate(Tasks){
        const groups={};
        const requiredOrder=['Today','This Week','This Month','This Year','Coming Years ;)']
        for (const task of Tasks) {
            const comparingDates=[new Date(),task.date];

            if(isSameDay(...comparingDates))
                groups.makeAndPush(requiredOrder[0],task);
            else if(isSameWeek(...comparingDates))
                groups.makeAndPush(requiredOrder[1],task)
            else if(isSameMonth(...comparingDates))
                groups.makeAndPush(requiredOrder[2],task)
            else if(isSameYear(...comparingDates))
                groups.makeAndPush(requiredOrder[3],task)
            else
                groups.makeAndPush(requiredOrder[4],task)
        }
        return groups;
    }

    delete(){
        const i=Task.AllTasks.indexOf(this);
        Task.AllTasks.splice(i,1);
        pubsub.publish('tasksChanged');
    }
}

Object.defineProperty(Object.prototype, 'makeAndPush', {
    value: function (label,task){
        this[label]=this[label]||[];
        this[label].push(task);
    }
});