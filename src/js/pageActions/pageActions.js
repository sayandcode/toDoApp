import {newTaskModal} from '../modals/newTaskModal.js';
import pubsub from './pubsub.js';
import './UIStuff.js';

function initializeWebsite(){
    listen();
}

function listen(){
    const FAB=document.getElementById('FAB');
    const tabs=document.querySelectorAll('.tab');

    FAB.addEventListener('click',()=>{
        newTaskModal();
    });
    tabs.forEach(tab=>tab.addEventListener('click',function(){
        console.log('clickedOn',this);
        pubsub.publish('tabSwitched',this);
    }));
}

export default initializeWebsite;