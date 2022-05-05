import template2Node from "../utilities/template2Node.js";
import TaskTemplate from '../../fullRenders/taskTemplate.html';
import Task from '../tasks&Projects/tasks.js'
import { formatRelative } from "date-fns";

const allTasksPage= (function(){
    let groupedTasks;

    function generate(){
        groupedTasks=Task.groupByDate(Task.AllTasks);
        if(Object.keys(groupedTasks).length===0)
            return;
        
        for (const group in groupedTasks) { //for each group
            //create heading 
            var heading=document.createElement('h2');
            heading.textContent=group;
            heading.classList.add('hoverOptions');

            //create taskList
            var taskList=document.createElement('ul');
            taskList.classList.add('taskList');
            
            //loop and add tasks
            for (const task of groupedTasks[group]) {
                const template=template2Node(TaskTemplate);
                const relativeDate=formatRelative(task.date, new Date());

                template.querySelector('.taskName').textContent=task.name;
                template.querySelector('.deadline').textContent=`Deadline: ${relativeDate}`;
                template.querySelector('.deleteBtn').addEventListener('click',deleteTask)

                taskList.append(template);
            }
        }

        return [heading,taskList]
    }

    function deleteTask(e){
        const clickedTaskList=e.path[2];
        const clickedTask=e.path[1];
        const taskIndex=Array.from(clickedTaskList.children).indexOf(clickedTask)

        const groupName=clickedTaskList.previousElementSibling.textContent;
        
        const taskToBeDeleted=groupedTasks[groupName][taskIndex];
        taskToBeDeleted.delete();
    }

    return{
        generate
    }

})();

export default allTasksPage;