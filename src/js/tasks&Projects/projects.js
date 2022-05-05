class Project{
    static AllProjects=[];

    #projectName;
    #projectIcon;
    #tasks;

    constructor(name){
        this.#projectName=name;
        this.#projectIcon=icon;
        this.#tasks=[];
        Project.AllProjects.push(this);
    }

    addTask(newTask){
        this.#tasks.push(newTask);
    }
}