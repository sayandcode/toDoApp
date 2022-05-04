import {newTaskModal} from '../modals/newTaskModal.js';


function initializeWebsite(){
    listen();
}

function listen(){
    const FAB=document.getElementById('FAB');
    FAB.addEventListener('click',()=>{
        newTaskModal();
    });
}

export default initializeWebsite;