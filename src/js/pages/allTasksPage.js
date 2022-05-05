import template2Node from "../utilities/template2Node.js";
import TaskTemplate from '../../fullRenders/allTasks.html';
import Task from '../tasks&Projects/tasks.js'

const allTasksPage= (function(){


    function generate(){
        console.log(Task.groupByDate(Task.AllTasks));
    }

    return{
        generate
    }

})();

export default allTasksPage;