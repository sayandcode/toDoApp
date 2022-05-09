import template2Node from "../utilities/template2Node.js";
import TaskTemplate from '../../fullRenders/taskTemplate.html';
import { Task } from '../tasks&Projects/tasks.js'
import { formatRelative } from "date-fns";
import { enIN } from "date-fns/locale";

const createTaskGroups= (function(){
    function generate(groupedTasks){
        if(Object.keys(groupedTasks).length===0)
            return '';
        
        const result=document.createDocumentFragment();
        for (const group in groupedTasks) { //for each group
            //create heading 
            const heading=document.createElement('h2');
            heading.textContent=group;

            //create taskGroup
            const taskGroup=document.createElement('ul');
            taskGroup.classList.add('taskGroup');
            
            //loop and add tasks
            console.log(groupedTasks);
            for (const taskID in groupedTasks[group]) {
                const task=groupedTasks[group][taskID];
                const template=template2Node(TaskTemplate);
                const relativeDate=formatRelative(task.date, new Date(),{locale:enIN});
                
                template.querySelector('li.task').key=task.id;
                template.querySelector('.taskName').textContent=task.name;
                template.querySelector('.deadline').textContent=`Deadline: ${relativeDate}`;
                if(task.status)
                    template.querySelector('.checkbox').classList.add('checked');

                //add Event Listeners
                template.querySelector('.checkbox').addEventListener('click',toggleCheck)
                template.querySelector('.deleteBtn').addEventListener('click',deleteTask)

                taskGroup.append(template);
            }
            result.append(heading,taskGroup)
        }
        return result;
    }
    
    function toggleCheck(e){
        this.classList.toggle('checked');
        Task.findById(e.target.parentNode.key).toggleDone();
    }

    function deleteTask(e){
        Task.findById(e.target.parentNode.key).delete();
    }

    return {
        generate
    }
})();

export default createTaskGroups;