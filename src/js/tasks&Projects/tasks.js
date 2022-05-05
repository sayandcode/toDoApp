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
        
        Task.AllTasks.push(this);
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
        for (const task of Tasks) {
            const comparingDates=[new Date(),task.date];

            if(isSameDay(...comparingDates))
                groups.makeAndPush('Today',task);
            else if(isSameWeek(...comparingDates))
                groups.makeAndPush('This Week',task)
            else if(isSameMonth(...comparingDates))
                groups.makeAndPush('This Month',task)
            else if(isSameYear(...comparingDates))
                groups.makeAndPush('This Year',task)
            else
                groups.makeAndPush('Coming Years ;)',task)
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