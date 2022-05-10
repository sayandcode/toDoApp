import Project from '../tasks&Projects/projects.js';
import { TaskList } from '../tasks&Projects/tasks.js';
import createTaskGroups from './taskGroups.js';

let currProjID;

const individualProject = function(id){
    currProjID=id?id:currProjID;

    const proj=Project.findById(currProjID);
    const projTasks=proj.tasks;
    const groupedTasks=TaskList.groupByDate(projTasks)
    
    //logo Styling
    const logo=document.getElementById('logo');
    logo.textContent=proj.name;
    logo.className='icon';
    logo.style.setProperty('--optional-icon',`'\\${proj.icon}'`)

    return createTaskGroups.generate(groupedTasks);
};

export default individualProject;