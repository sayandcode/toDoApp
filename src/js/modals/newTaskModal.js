import {createTaskFromInputs} from '../formStuff.js'

function newTaskModal(){
    //initialize
    const newTaskModal=document.getElementById('newTaskTemplate').content.cloneNode(true);
    document.body.insertBefore(newTaskModal, document.body.firstChild );

    //cache DOM
    const modal=document.querySelector('.modalBGOverlay');
    const form=modal.querySelector('form');
    const submitBtn=document.querySelector('.modal .submitBtn');
    const cancelBtn=document.querySelector('.modal .cancelBtn');

    //listeners
    listen();

    function listen(){
        form.addEventListener('submit', createTask);
        cancelBtn.addEventListener('click', closeModal);
    }
    
    function stopListening(){
        form.removeEventListener('click', createTask)
        cancelBtn.removeEventListener('click', closeModal);
    }

    function closeModal(){
        stopListening();
        modal.remove();
    }

    function createTask(event){
        const userInputs=createTaskFromInputs(event);
        console.log(...userInputs);
    }
}

export{
    newTaskModal
}
