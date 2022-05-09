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
    function create(forClickedItem,[atPointX,atPointY]){
        forClickedItem.querySelector('.hoverOptions').classList.add('clicked');   //make the hoverOptions persistent
        const itemType=findType(forClickedItem.key);

        const container=document.createElement('ul');
        container.classList.add('contextMenu');
        container.style.setProperty('--x-pos',atPointX)
        container.style.setProperty('--y-pos',atPointY)

        for(const option of options[itemType]){
            const li=document.createElement('li');
            li.textContent= option.label;
            li.addEventListener('click',()=>option.fn(container.parentNode.key));
            container.appendChild(li);
        }
        forClickedItem.append(container);
        return container;
    }

    function remove(forClickedItem){
        forClickedItem.querySelector('.contextMenu').remove();  
        forClickedItem.querySelector('.hoverOptions').classList.remove('clicked');    //make the hoverOptions on hover only

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
        remove
    }
})();



export default contextMenu;