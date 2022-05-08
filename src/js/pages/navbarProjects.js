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
            pubsub.publish('hoverOptionsClicked',this.parentNode.className);
        })

        projectSlabs.append(template);
    });
    return projectSlabs;
}