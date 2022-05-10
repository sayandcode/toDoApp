import pubsub from '../pageActions/pubsub.js';
import Project from '../tasks&Projects/projects.js';
import createTaskGroups from './taskGroups.js';

const projectPage= function(){
    const template=document.createDocumentFragment();
    
    const allprojects=[];
    for(const id of Project.allIDs){
        const proj=Project.findById(id);
        allprojects.push({
            name:proj.name,
            tasks:proj.tasks,
            id
        });
    }

    if(allprojects.length!==0)
        template.appendChild(createTaskGroups.generate(allprojects))

    const newProjCard=document.createElement('div');
    newProjCard.textContent='New Project ➕';
    newProjCard.className='newProjectCard';
    newProjCard.addEventListener('click',()=>pubsub.publish('openProjectModal',this))

    template.appendChild(newProjCard)

    return template;
};

export default projectPage;