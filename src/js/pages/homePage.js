import Project from "../tasks&Projects/projects";
import { Task, TaskList } from "../tasks&Projects/tasks";
import createTaskGroups from "./taskGroups";

const homePage= function(){
    const template=document.createDocumentFragment()

    //find and show if there are any tasks
    const allTasks=TaskList.groupByDate(Task.all);
    const indexOfPast=allTasks.findIndex(element=>element.name==='In the Past');
    if(indexOfPast!==-1)
        allTasks.splice(indexOfPast,1);

    const displayedTasks=allTasks.slice(0,2);
    
    if(displayedTasks.length!==0)
        template.appendChild(createTaskGroups.generate(displayedTasks));
    

    return template;
};

export default homePage;