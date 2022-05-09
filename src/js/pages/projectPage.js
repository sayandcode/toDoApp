import Project from '../tasks&Projects/projects.js';
import createTaskGroups from './taskGroups.js';

const projectPage= function(){
    const allprojects=[];
    for(const id of Project.allIDs){
        const proj=Project.findById(id);
        allprojects.push({name:proj.name,tasks:proj.tasks});
    }
    console.log(allprojects);
    return createTaskGroups.generate(allprojects);
};

export default projectPage;