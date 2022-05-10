import newTaskModal from '../modals/newTaskModal.js';
import newProjectModal from '../modals/newProjectModal.js'
import pubsub from "./pubsub.js";
import renderMethods from '../pages/renderMethods.js'
import generateNavbarProjects from '../pages/navbarProjects.js'
import contextMenu from './contextMenu.js';

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
        pubsub.publish('openProjectModal',this);
});
tabs.forEach(tab=>tab.addEventListener('click',function(){
    switchTab(this)
}));
pubsub.subscribe('individualProjectClicked',(id)=>{
    currTab='individualProject';
    renderRightSide(id);
})
pubsub.subscribe('tasksChanged',renderRightSide);
pubsub.subscribe('projectsChanged',renderNavbarProjects);
pubsub.subscribe('projectsChanged',renderRightSide);
pubsub.subscribe('hoverOptionsClicked',showContextMenu);
pubsub.subscribe('openProjectModal',newProjectModalFor);


function renderRightSide(id){
    rightSide.innerHTML='';
    rightSide.append(renderMethods[currTab](id));     //render new stuff
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
    rightSide.className=currTab;
    renderRightSide();
}

function showContextMenu(forClickedItem,[atPointX,atPointY]){
    //close any other context menus that are open
    const alreadyOpenMenu=document.querySelector('.contextMenu');
    if(alreadyOpenMenu)
        alreadyOpenMenu.remove();

    //make a new context menu
    contextMenu.create(forClickedItem,[atPointX,atPointY]);
    window.addEventListener('click',()=>contextMenu.remove(forClickedItem),{once:true});
}

function newProjectModalFor(This){
    newProjectModal.call(This);
}