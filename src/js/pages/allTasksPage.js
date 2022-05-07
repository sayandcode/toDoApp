import template2Node from "../utilities/template2Node.js";
import TaskTemplate from '../../fullRenders/taskTemplate.html';
import {Task} from '../tasks&Projects/tasks.js'
import { formatRelative } from "date-fns";
import { enIN } from "date-fns/locale";

const allTasksPage= (function(){
    let groupedTasks;

    function generate(){
        groupedTasks=Task.groupByDate();
        if(Object.keys(groupedTasks).length===0)
            return;
        
        const result=document.createDocumentFragment();
        for (const group in groupedTasks) { //for each group
            //create heading 
            const heading=document.createElement('h2');
            heading.textContent=group;

            //create taskList
            const taskList=document.createElement('ul');
            taskList.classList.add('taskList');
            
            //loop and add tasks
            for (const task of groupedTasks[group]) {
                const template=template2Node(TaskTemplate);
                const relativeDate=formatRelative(task.date, new Date(),{locale:enIN});

                template.querySelector('.taskName').textContent=task.name;
                template.querySelector('.deadline').textContent=`Deadline: ${relativeDate}`;
                if(task.status)
                    template.querySelector('.checkbox').classList.add('checked');

                //add Event Listeners
                template.querySelector('.checkbox').addEventListener('click',toggleCheck)
                template.querySelector('.deleteBtn').addEventListener('click',deleteTask)

                taskList.append(template);
            }
            result.append(heading,taskList)
        }
        return result;
    }
    
    function clickedTask(e){
        const task=e.path[1];
        const clickedTaskList=e.path[2];
        const taskIndex=Array.from(clickedTaskList.children).indexOf(task)

        const groupName=clickedTaskList.previousElementSibling.textContent;
        
        return groupedTasks[groupName][taskIndex];
    }
    
    function toggleCheck(e){
        this.classList.toggle('checked');
        clickedTask(e).toggleDone();
    }

    function deleteTask(e){
        clickedTask(e).delete();
    }

    return{
        generate
    }

})();

export default allTasksPage;