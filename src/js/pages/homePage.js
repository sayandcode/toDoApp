import Project from "../tasks&Projects/projects";
import { Task, TaskList } from "../tasks&Projects/tasks";
import createTaskGroups from "./taskGroups";
import template2Node from "../utilities/template2Node";
import homePageProjectSectionTemplate from '../../fullRenders/homePageProjectSectionTemplate.html';
import projectCardTemplate from '../../fullRenders/projectCardTemplate.html';
import { formatRelative, isBefore, isFuture } from "date-fns";
import { enIN } from "date-fns/locale";
import pubsub from "../pageActions/pubsub";

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
    
    //find and show if there are any projects, otherwise return ''
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

    //add 'new Project card' to end of projectCards
    const newProjCard=document.createElement('div');
    newProjCard.textContent='New Project ➕';
    newProjCard.className='newProjectCard';
    newProjCard.addEventListener('click',()=>pubsub.publish('openProjectModal',this));
    projectCards.appendChild(newProjCard);

    //and finally return the result
    return result;
};

function findRemainingTasks(project){
    let count=0;
    for(const task of Object.values(project.tasks)){
        count+= (task.status==false)? 1:0;
    }
    return count;
}

function findNextDeadline(project){
    console.log(Object.values(project.tasks))
    const taskDates=Object.values(project.tasks).reduce((comingDates,task)=>{
        if ( isFuture(task.date) && !task.status )
            comingDates.push(task.date);
        return comingDates;
    },[]);
    console.log(taskDates);
    if(taskDates.length===0)
        return 'No deadlines';
    
    const earliest=taskDates.reduce((earliestDate,thisDate)=>{
        return isBefore(thisDate,earliestDate)? thisDate : earliestDate;
    })

    return `Next Deadline: ${formatRelative(earliest, new Date(),{locale:enIN})}`;
}

export default homePage;