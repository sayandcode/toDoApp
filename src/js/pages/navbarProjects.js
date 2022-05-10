import Project from '../tasks&Projects/projects.js';
import slabTemplate from  '../../fullRenders/navbarProjectSlabTemplate.html';
import template2Node from '../utilities/template2Node.js';
import pubsub from '../pageActions/pubsub.js';

export default function generateNavbarProjects(){
    const allProjectIDs=Project.allIDs;
    if(allProjectIDs.length===0)
        return '';

    const projectSlabs=document.createElement('ul');
    allProjectIDs.forEach(id=>{
        const thisProject=Project.findById(id);
        const template=template2Node(slabTemplate);

        //cache DOM
        const projSlab=template.querySelector('.projectSlab');
        const projName=template.querySelector('.projectName');
        const hoverOptions=template.querySelector('.hoverOptions');

        //values
        projName.textContent=thisProject.name;
        projSlab.style.setProperty('--iconHex',`'\\${thisProject.icon}'`);
        
        //eventListeners
        projName.addEventListener('click',function(){
            pubsub.publish('individualProjectClicked',id);
        })
        hoverOptions.addEventListener('click',function(event){
            event.stopPropagation();
            pubsub.publish('hoverOptionsClicked',[id,this]);
        })

        projectSlabs.append(template);
    });
    return projectSlabs;
}