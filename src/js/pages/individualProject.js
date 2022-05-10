import Project from '../tasks&Projects/projects.js';
import { TaskList } from '../tasks&Projects/tasks.js';
import createTaskGroups from './taskGroups.js';

let currProjID;

const individualProject = function(id){
    currProjID=id?id:currProjID;

    const projTasks=Project.findById(currProjID).tasks;
    const groupedTasks=TaskList.groupByDate(projTasks)
    return createTaskGroups.generate(groupedTasks);
};

export default individualProject;