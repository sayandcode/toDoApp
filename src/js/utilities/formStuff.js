function fixFormsBug(e){
    e.stopImmediatePropagation();   //chrome double submit bug
    e.preventDefault();             //dont run GET method and change url
}

function createTaskFromInputs(event){
    fixFormsBug(event);

    const name=document.getElementById('taskName').value;
    const date=document.getElementById('taskDateTime').value;
    const project=document.getElementById('chooseProject').value||undefined;

    return [name,date,project]
}

export{
    createTaskFromInputs
}