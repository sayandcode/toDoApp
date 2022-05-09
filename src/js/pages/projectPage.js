import Project from '../tasks&Projects/projects.js';
import createTaskGroups from './taskGroups.js';

const projectPage= function(){
    
    return createTaskGroups.generate({});
};

export default projectPage;