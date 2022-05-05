import { isSameDay, isSameMonth, isSameWeek, isSameYear } from 'date-fns';


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
    }

    get date(){
        return this.#taskDate;
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
}

Object.prototype.makeAndPush = function (label,task){
    this[label]=this[label]||[];
    this[label].push(task);
}






