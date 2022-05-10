import Project from "../tasks&Projects/projects";
import { Task, TaskList } from "../tasks&Projects/tasks";
import createTaskGroups from "./taskGroups";
import template2Node from "../utilities/template2Node";
import homePageProjectSectionTemplate from '../../fullRenders/homePageProjectSectionTemplate.html';
import projectCardTemplate from '../../fullRenders/projectCardTemplate.html';

const homePage= function(){
    const result=document.createDocumentFragment()

    //find and show if there are any tasks
    const allTasks=TaskList.groupByDate(Task.all);
    const indexOfPast=allTasks.findIndex(element=>element.name==='In the Past');
    if(indexOfPast!==-1)
        allTasks.splice(indexOfPast,1);

    const displayedTasks=allTasks.slice(0,2);
    
    if(displayedTasks.length!==0)
        result.appendChild(createTaskGroups.generate(displayedTasks));
    
    //find and show if there are any projects
    const allProjects=Project.all;
    if(Object.keys(allProjects).length===0)
        return result;

    result.appendChild(template2Node(homePageProjectSectionTemplate));

    const projectCards=result.querySelector('.projectCards');
    for(const project of Object.values(allProjects)){
        const projectCard=template2Node(projectCardTemplate);
        
        projectCard.querySelector('.projectName').textContent=project.name;
        projectCard.querySelector('.noOfTasks').textContent=`${findRemainingTasks(project)} tasks left`;
        projectCard.querySelector('.nextDeadline').textContent=findNextDeadline(project);

        projectCards.appendChild(projectCard);
    }

    return result;
};

function findRemainingTasks(project){
    return '1';
}

function findNextDeadline(project){
    return '2nd March';
}

export default homePage;