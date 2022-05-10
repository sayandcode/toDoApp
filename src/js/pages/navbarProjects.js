import Project from '../tasks&Projects/projects.js';
import slabTemplate from  '../../fullRenders/navbarProjectSlabTemplate.html';
import template2Node from '../utilities/template2Node.js';
import pubsub from '../pageActions/pubsub.js';

export default function generateNavbarProjects(){
    const allProjects=Project.all;
    if(Object.keys(allProjects).length===0)
        return '';

    const projectSlabs=document.createElement('ul');

    for(const project of Object.values(allProjects)){
        const template=template2Node(slabTemplate);
        //cache DOM
        const projSlab=template.querySelector('.projectSlab');
        const projName=template.querySelector('.projectName');
        const hoverOptions=template.querySelector('.hoverOptions');

        //values
        projName.textContent=project.name;
        projSlab.style.setProperty('--iconHex',`'\\${project.icon}'`);
        
        //eventListeners
        projName.addEventListener('click',function(){
            pubsub.publish('individualProjectClicked',project.id);
        })
        hoverOptions.addEventListener('click',function(event){
            event.stopPropagation();
            pubsub.publish('hoverOptionsClicked',[project.id,this]);
        })
    
        //and finally add the slab
        projectSlabs.append(template);
    }
    
    return projectSlabs;
}