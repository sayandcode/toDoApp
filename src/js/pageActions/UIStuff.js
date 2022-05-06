import newTaskModal from '../modals/newTaskModal.js';
import newProjectModal from '../modals/newProjectModal.js'
import pubsub from "./pubsub.js";
import renderMethods from '../pages/renderMethods.js'

//cache DOM
let currTab='allTasksTab';
const logo=document.getElementById('logo');
const rightSide = document.getElementById('rightSide');
const FAB=document.getElementById('FAB');
const tabs=document.querySelectorAll('.tab');
const newProjectFromNav=document.getElementById('newProjectFromNav');

//listening
FAB.addEventListener('click',newTaskModal);
newProjectFromNav.addEventListener('keydown',function(e){
    if(e.key ==='Enter')
        newProjectModal.call(this);
});
tabs.forEach(tab=>tab.addEventListener('click',function(){
    switchTab(this)
}));
pubsub.subscribe('tasksChanged',renderRightSide);

function renderRightSide(){
    //clear the page
    rightSide.innerHTML='';     

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