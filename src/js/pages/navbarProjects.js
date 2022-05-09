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
        const projName=template.querySelector('.projectName');
        const projSlab=template.querySelector('.projectSlab');
        const hoverOptions=template.querySelector('.hoverOptions');

        //values
        projName.textContent=thisProject.name;
        projSlab.key=id;
        projSlab.style.setProperty('--iconHex',`'\\${thisProject.icon}'`);
        
        //eventListeners
        projName.addEventListener('click',function(){
            pubsub.publish('projectSlabClicked');
        })
        hoverOptions.addEventListener('click',function(event){
            event.stopPropagation();    //in order to stop any subsequent events from firing

            const boundingRect=this.getBoundingClientRect();
            const x=boundingRect.left+(boundingRect.width/2);
            const y=boundingRect.top+(boundingRect.height/2);
            
            pubsub.publish('hoverOptionsClicked',[this.parentNode,[`${x}px`,`${y}px`]]);
        })

        projectSlabs.append(template);
    });
    return projectSlabs;
}