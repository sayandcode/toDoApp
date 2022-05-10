import newTaskModal from '../modals/newTaskModal.js';
import newProjectModal from '../modals/newProjectModal.js'
import pubsub from "./pubsub.js";
import renderMethods from '../pages/renderMethods.js'
import generateNavbarProjects from '../pages/navbarProjects.js'
import contextMenu from './contextMenu.js';

//cache DOM
let currTab='homeTab';
const logo=document.getElementById('logo');
const rightSide = document.getElementById('rightSide');
const FAB=document.getElementById('FAB');
const tabs=document.querySelectorAll('.tab');
const newProjectFromNav=document.getElementById('newProjectFromNav');
const navbarProjects=document.getElementById('projectsTab').parentElement;
const projectsTab=document.getElementById('projectsTab');

//initialize
switchTab(currTab);

//listening
FAB.addEventListener('click',newTaskModal);
newProjectFromNav.addEventListener('keydown',function(e){
    if(e.key ==='Enter')
        pubsub.publish('openProjectModal',this);
});
tabs.forEach(tab=>tab.addEventListener('click',function(){
    switchTab(this.id)
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
    // if(currTab===clickedTab.id)  //not needed for some reason
    //     return;

    currTab=clickedTab;

    //logo reset
    logo.textContent= (currTab==='homeTab')? 'To Do App' : document.getElementById(currTab).textContent;
    logo.style.removeProperty('--optional-icon');
    logo.className='';

    rightSide.className=currTab;
    
    renderRightSide();
}

function showContextMenu(forID,clickedItem){

    //find click position X and Y
    const boundingRect=clickedItem.getBoundingClientRect();
    const x=`${boundingRect.left+(boundingRect.width/2)}px`;
    const y=`${boundingRect.top+(boundingRect.height/2)}px`;
    
    contextMenu.closeAll();                 //close any other context menus that are open
    clickedItem.classList.add('clicked');   //make the hoverOptions persistent

    contextMenu.create(forID,[x,y]);    //make a new context menu
    
    window.addEventListener('click',contextMenu.closeAll,{once:true});
}

function newProjectModalFor(This){
    newProjectModal.call(This);
}