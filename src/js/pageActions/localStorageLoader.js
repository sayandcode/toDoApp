import storage from '../utilities/localStorage.js';
import { Task } from '../tasks&Projects/tasks.js';
import Project from '../tasks&Projects/projects.js';
import pubsub from './pubsub.js';

//add projects first so that any containing tasks will be able to reference it during init

/* PROJECTS LOAD START*/
// first search local Storage for previously stored allProjects
const storedAllProjects=storage.findAllProjects();

//if it exists, add every project in there to the current Task.#AllProjects object, by initializing 
//each project using its constructor
if (storedAllProjects)
    for(const project of Object.values(storedAllProjects)){
        new Project(project);
    }

//when project is updated internally, update in the storage
pubsub.subscribe('projectsChanged',()=>storage.storeAllProjects(Project.all));  
/* PROJECTS LOAD END*/

/* TASKS LOAD START */
// first search local Storage for previously stored allTasks
const storedAllTasks=storage.findAllTasks();

//if it exists, add every task in there to the current Task.#AllTasks 
//object, by initializing each task using its constructor
if (storedAllTasks)
    for(const task of Object.values(storedAllTasks))
        new Task(task);    

pubsub.subscribe('tasksChanged',()=>storage.storeAllTasks(Task.all));
/* TASKS LOAD END */
