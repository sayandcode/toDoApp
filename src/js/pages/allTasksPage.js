import template2Node from "../utilities/template2Node.js";
import TaskTemplate from '../../fullRenders/taskTemplate.html';
import Task from '../tasks&Projects/tasks.js'

const allTasksPage= (function(){
    
    function generate(){
        const groupedTasks=Task.groupByDate(Task.AllTasks);
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
                taskList.append(template2Node(TaskTemplate));
            }
        }

        return [heading,taskList]
    }

    return{
        generate
    }

})();

export default allTasksPage;