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

    /* TASK SECTION START*/
    //find and show if there are any tasks
    const taskSection=document.createDocumentFragment();
    {
        const allTasks=TaskList.groupByDate(Task.all);
        const indexOfPast=allTasks.findIndex(element=>element.name==='In the Past');
        if(indexOfPast!==-1)
            allTasks.splice(indexOfPast,1);

        const displayedTasks=allTasks.slice(0,2);
        
        if(displayedTasks.length!==0){
            taskSection.appendChild(createTaskGroups.generate(displayedTasks));
            
            //add a link to all tasks
            const home2allTasks=document.createElement('h2');
            home2allTasks.classList.add('navigate2diffSection','icon');
            home2allTasks.id='home2allTasks';
            home2allTasks.addEventListener('click',()=>pubsub.publish('tabSwitched','allTasksTab'));
            home2allTasks.textContent='All Tasks';
            taskSection.appendChild(home2allTasks);
        }
    }
    result.appendChild(taskSection);
    /* TASK SECTION END*/


    /* PROJECT SECTION START*/
    //find and show if there are any projects, otherwise return ''
    const projectSection=document.createDocumentFragment();
    {
        const allProjects=Project.all;
        if(Object.keys(allProjects).length===0)
            return result;  //result contains only task section at this point
    
        projectSection.appendChild(template2Node(homePageProjectSectionTemplate));

        projectSection.querySelector('#home2projects').addEventListener('click',()=>pubsub.publish('tabSwitched','projectsTab'));
    
        const projectCards=projectSection.querySelector('.projectCards');
        for(const project of Object.values(allProjects)){
            const projectCard=template2Node(projectCardTemplate);
    
            //cacheDOM
            const projectName=projectCard.querySelector('.projectName');
            
            //enter values
            projectName.textContent=project.name;
            projectCard.querySelector('.noOfTasks').textContent=`${findRemainingTasks(project)} tasks left`;
            projectCard.querySelector('.nextDeadline').textContent=findNextDeadline(project);
    
            //add event listeners
            projectName.addEventListener('click',()=>pubsub.publish('individualProjectClicked',project.id));
    
            projectCards.appendChild(projectCard);
        }
    
        //add 'new Project card' to end of projectCards
        const newProjCard=document.createElement('div');
        newProjCard.textContent='New Project ➕';
        newProjCard.className='newProjectCard';
        newProjCard.addEventListener('click',()=>pubsub.publish('openProjectModal',this));
        projectCards.appendChild(newProjCard);
    }
    result.appendChild(projectSection);
    /* PROJECT SECTION END*/

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
    const taskDates=Object.values(project.tasks).reduce((comingDates,task)=>{
        if ( isFuture(task.date) && !task.status )
            comingDates.push(task.date);
        return comingDates;
    },[]);
    if(taskDates.length===0)
        return 'No deadlines';
    
    const earliest=taskDates.reduce((earliestDate,thisDate)=>{
        return isBefore(thisDate,earliestDate)? thisDate : earliestDate;
    })

    return `Next Deadline: ${formatRelative(earliest, new Date(),{locale:enIN})}`;
}

export default homePage;