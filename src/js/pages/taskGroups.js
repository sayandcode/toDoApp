import template2Node from "../utilities/template2Node.js";
import TaskTemplate from '../../fullRenders/taskTemplate.html';
import { Task } from '../tasks&Projects/tasks.js'
import { formatRelative } from "date-fns";
import { enIN } from "date-fns/locale";
import pubsub from "../pageActions/pubsub.js";

const createTaskGroups= (function(){
    function generate(groupedTasks){
        if(Object.keys(groupedTasks).length===0)
            return '';
        
        const result=document.createDocumentFragment();
        for (const group of groupedTasks) { //for each group
            //create heading 
            const heading=document.createElement('div');
            const headingText=heading.appendChild(document.createElement('h2'));
            headingText.textContent=group.name;

            //add listener in case group has dedicated page
            if(group.id){
                headingText.style.cursor='pointer';
                const hoverOptions=heading.appendChild(document.createElement('span'));
                hoverOptions.className='hoverOptions';
                heading.classList.add('hoverOptionsParent');

                headingText.addEventListener('click',()=>pubsub.publish('individualProjectClicked',group.id));
                hoverOptions.addEventListener('click',function(event){
                    event.stopPropagation();
                    pubsub.publish('hoverOptionsClicked',[id,this]);
                })
            }

            //create taskGroup
            const taskGroup=document.createElement('ul');
            taskGroup.classList.add('taskGroup');
            
            //loop and add tasks
            for (const task of Object.values(group.tasks)) {
                const template=template2Node(TaskTemplate);
                const relativeDate=formatRelative(task.date, new Date(),{locale:enIN});
                const checkbox=template.querySelector('.checkbox');
                
                template.querySelector('.taskName').textContent=task.name;
                template.querySelector('.deadline').textContent=`Deadline: ${relativeDate}`;
                if(task.status)
                    checkbox.classList.add('checked');

                //add Event Listeners
                checkbox.addEventListener('click',toggleCheck.bind(checkbox,task.id))
                template.querySelector('.deleteBtn').addEventListener('click',deleteTask.bind(null,task.id))

                taskGroup.append(template);
            }
            result.append(heading,taskGroup)
        }
        return result;
    }
    
    function toggleCheck(id){
        this.classList.toggle('checked');
        Task.findById(id).toggleDone();
    }

    function deleteTask(id){
        Task.findById(id).delete();
    }

    return {
        generate
    }
})();

export default createTaskGroups;