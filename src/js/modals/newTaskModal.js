import newTaskModalTemplate from '../../fullRenders/modalNewTask.html';
import template2Node from '../utilities/template2Node.js';

import {createTaskFromInputs} from '../utilities/formStuff.js';
import Task from '../tasks&Projects/tasks.js';
import { add, format } from 'date-fns';

function newTaskModal(){
    //initialize
    const newTaskModal=template2Node(newTaskModalTemplate);
    document.body.insertBefore(newTaskModal, document.body.firstChild );

    //cache DOM
    const modal=document.querySelector('.modalBGOverlay');
    const form=modal.querySelector('form');
    const datePicker=document.getElementById('taskDateTime');
    const cancelBtn=document.querySelector('.modal .cancelBtn');

    //default value
    const defaultTaskDate=add(new Date(),{days:1}); 
    datePicker.value = format(defaultTaskDate,"yyyy-MM-dd'T'hh:mm");

    //listeners
    listen();


    function listen(){
        form.addEventListener('submit', createTask);
        cancelBtn.addEventListener('click', closeModal);
    }
    
    function stopListening(){
        form.removeEventListener('submit', createTask)
        cancelBtn.removeEventListener('click', closeModal);
    }

    function closeModal(){
        stopListening();
        modal.remove();
    }

    function createTask(event){
        const userInputs=createTaskFromInputs(event);
        new Task(...userInputs);
        closeModal();
    }
}

export{
    newTaskModal
}
