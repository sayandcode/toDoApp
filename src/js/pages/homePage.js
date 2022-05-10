import { Task, TaskList } from "../tasks&Projects/tasks";
import createTaskGroups from "./taskGroups";

const homePage= function(){
    const allTasks=TaskList.groupByDate(Task.all);
    const indexOfPast=allTasks.findIndex(element=>element.name==='In the Past');
    if(indexOfPast!==-1)
        allTasks.splice(indexOfPast,1);
    return createTaskGroups.generate(allTasks.splice(0,2));
};

export default homePage;