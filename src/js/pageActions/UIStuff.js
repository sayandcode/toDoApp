import pubsub from "./pubsub.js";
import renderMethods from '../pages/renderMethods.js'

//cache DOM
const rightSide = document.getElementById('rightSide');
let currTab='allTasksTab';

//listening
pubsub.subscribe('tasksChanged',renderRightSide);
pubsub.subscribe('tabSwitched',switchTab)

function renderRightSide(){
    console.log('changedTo',currTab)//which tab are we on?
    const newRightSideContent=renderMethods[currTab]();
    rightSide.appendChild(newRightSideContent);
};

function switchTab(clickedTab){
    if(currTab===clickedTab.id)
        return;
    currTab=clickedTab.id;
    renderRightSide();
}

function emptyPage(){
    rightSide.innerHTML='';
    rightSide.className='empty';
}