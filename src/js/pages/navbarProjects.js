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
        
        //values
        template.querySelector('.projectName').textContent=thisProject.name;
        template.querySelector('.projectSlab').key=id;
        template.querySelector('.projectSlab').style.setProperty('--iconHex',`'${thisProject.icon}'`);
        
        //eventListeners
        template.querySelector('.projectName').addEventListener('click',function(){
            pubsub.publish('projectSlabClicked');
        })
        template.querySelector('.hoverOptions').addEventListener('click',function(event){
            event.stopPropagation();    //in order to stop any subsequent events from firing
            
            const boundingRect=this.getBoundingClientRect();
            const x=boundingRect.left+(boundingRect.width/2);
            const y=boundingRect.top+(boundingRect.height/2);
            
            this.classList.add('clicked');
            pubsub.publish('hoverOptionsClicked',[this.parentNode,[`${x}px`,`${y}px`]]);
        })

        projectSlabs.append(template);
    });
    return projectSlabs;
}