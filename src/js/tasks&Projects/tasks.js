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
}