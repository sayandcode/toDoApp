import pubsub from "./pubsub.js";
import renderMethods from '../pages/renderMethods.js'
import Task from "../tasks&Projects/tasks.js";

//cache DOM
const logo=document.getElementById('logo');
const rightSide = document.getElementById('rightSide');
let currTab='allTasksTab';

//listening
pubsub.subscribe('tasksChanged',renderRightSide);
pubsub.subscribe('tabSwitched',switchTab)

function renderRightSide(){
    rightSide.innerHTML='';     //clear the page

    //render new stuff
    const newRightSideContent=renderMethods[currTab]();
    if(newRightSideContent){
        rightSide.append(newRightSideContent);
        rightSide.classList.remove('empty');
    }
    else
        rightSide.classList.add('empty');
};

function switchTab(clickedTab){
    if(currTab===clickedTab.id)
        return;
    currTab=clickedTab.id;
    logo.textContent= (currTab==='homeTab')? 'To Do App' : clickedTab.textContent;
    renderRightSide();
}