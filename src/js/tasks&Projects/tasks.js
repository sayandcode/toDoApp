export default class Task{
    #name;    
    #date;
    #project;

    constructor(name,date,project){
        this.#name=name;
        this.#date=date;
        this.#project=project;
        Task.AllTasks.push(this);
    }

    static AllTasks=[];

}