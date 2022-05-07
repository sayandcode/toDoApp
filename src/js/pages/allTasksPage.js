import { Task } from '../tasks&Projects/tasks.js';

import createTaskGroups from './taskGroups.js';

const allTasksPage = createTaskGroups(Task.all);

export default allTasksPage;