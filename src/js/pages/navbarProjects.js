import Project from '../tasks&Projects/projects.js';
import slabTemplate from  '../../fullRenders/navbarProjectSlabTemplate.html';
import template2Node from '../utilities/template2Node.js';

export default function generateNavbarProjects(){
    const allProjectIDs=Project.allIDs;
    if(allProjectIDs.length===0)
        return '';

    const projectSlabs=document.createElement('ul');
    allProjectIDs.forEach(id=>{
        const thisProject=Project.findById(id);
        const slab=template2Node(slabTemplate);
        slab.querySelector('.projectName').textContent=thisProject.name;
        slab.key=id;
        projectSlabs.append(slab);
    });
    return projectSlabs;
}