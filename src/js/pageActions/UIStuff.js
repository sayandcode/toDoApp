import newTaskModal from '../modals/newTaskModal.js';
import newProjectModal from '../modals/newProjectModal.js'
import pubsub from "./pubsub.js";
import renderMethods from '../pages/renderMethods.js'
import generateNavbarProjects from '../pages/navbarProjects.js'

//cache DOM
let currTab='allTasksTab';
const logo=document.getElementById('logo');
const rightSide = document.getElementById('rightSide');
const FAB=document.getElementById('FAB');
const tabs=document.querySelectorAll('.tab');
const newProjectFromNav=document.getElementById('newProjectFromNav');
const navbarProjects=document.getElementById('projectsTab').parentElement;
const projectsTab=document.getElementById('projectsTab');


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
pubsub.subscribe('projectsChanged',renderNavbarProjects);


function renderRightSide(){
    rightSide.innerHTML='';    //clear the page 
    rightSide.append(renderMethods[currTab]());     //render new stuff
};

function renderNavbarProjects(){
    //protect the 'project' and newProjectFromNav nodes
    projectsTab.remove();
    newProjectFromNav.remove();
    
    navbarProjects.innerHTML='';

    navbarProjects.append(projectsTab);    
    navbarProjects.append(generateNavbarProjects())
    navbarProjects.append(newProjectFromNav)

}

function switchTab(clickedTab){
    if(currTab===clickedTab.id)
        return;
    currTab=clickedTab.id;
    logo.textContent= (currTab==='homeTab')? 'To Do App' : clickedTab.textContent;
    renderRightSide();
}