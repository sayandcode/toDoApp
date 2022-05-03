function newTaskModal(){
    //initialize
    const newTaskModal=document.getElementById('newTaskTemplate').content.cloneNode(true);
    document.body.insertBefore(newTaskModal, document.body.firstChild );

    //cache DOM
    const modal=document.querySelector('.modalBGOverlay');
    const submitBtn=document.querySelector('.modal .submitBtn');
    const cancelBtn=document.querySelector('.modal .cancelBtn');

    //listeners
    listen();

    function listen(){
        submitBtn.addEventListener('click', createTask)
        cancelBtn.addEventListener('click', closeModal);
    }
    
    function stopListening(){
        submitBtn.removeEventListener('click', createTask)
        cancelBtn.removeEventListener('click', closeModal);
    }

    function closeModal(){
        stopListening();
        modal.remove();
    }

    function createTask(){
        //to be made
    }
}

export{
    newTaskModal
}
