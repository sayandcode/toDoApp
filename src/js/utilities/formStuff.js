function fixFormsBug(e){
    e.stopImmediatePropagation();   //chrome double submit bug
    e.preventDefault();             //dont run GET method and change url
}

function createTaskFromInputs(event){
    fixFormsBug(event);
    const name=document.getElementById('taskName').value;
    const date=new Date(document.getElementById('taskDateTime').value);
    const project=document.getElementById('chooseProject').value||undefined;

    return [name,date,project]
}

function createProjectFromInputs(event){
    fixFormsBug(event);
    const name=document.getElementById('projName').value;
    const selectedIcon=document.querySelector('input[type="radio"][name="iconSelector"]:checked');
    const iconHex=selectedIcon?selectedIcon.value:undefined;
    
    return [name,iconHex];
}

export{
    createTaskFromInputs,
    createProjectFromInputs
}