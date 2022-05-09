import { Task,TaskList } from '../tasks&Projects/tasks.js';
import createTaskGroups from './taskGroups.js';

const allTasksPage = function(){
    const allTasks=TaskList.groupByDate(Task.all);
    return createTaskGroups.generate(allTasks);
};

export default allTasksPage;