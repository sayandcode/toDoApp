import Project from "../tasks&Projects/projects";
import { Task } from "../tasks&Projects/tasks";
import pubsub from "./pubsub";

const contextMenu=(function(){
    const options={
        project:[
            {
                label:'Edit Project',
                fn:editProject,
            },
            {
                label:'Delete',
                fn:deleteProject,
            },
       ],
    }
    function create(forID,[atPointX,atPointY]){
        const itemType=findType(forID);

        const container=document.createElement('ul');
        container.classList.add('contextMenu');
        container.style.setProperty('--x-pos',atPointX)
        container.style.setProperty('--y-pos',atPointY)

        for(const option of options[itemType]){
            const li=document.createElement('li');
            li.textContent= option.label;
            li.addEventListener('click',()=>option.fn(forID));
            container.appendChild(li);
        }
        document.body.append(container);
        return container;
    }

    function closeAll(){
        const openMenu=document.querySelector('.contextMenu');
        if(openMenu){
            openMenu.parentElement.classList.remove('clicked');    //make the hoverOptions on hover only
            openMenu.remove();  
        }
    }

    function findType(id){
        if (Project.findById(id))
            return 'project';
        else if (Task.findById(id))
            return 'task';
    }

    function editProject(id){
        const proj=Project.findById(id);
        pubsub.publish('openProjectModal',proj)
    }

    function deleteProject(id){
        Project.findById(id).delete();
    }



    return{
        create,
        closeAll
    }
})();



export default contextMenu;