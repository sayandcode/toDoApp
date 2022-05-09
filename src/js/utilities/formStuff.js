import Project from "../tasks&Projects/projects";

function fixFormsBug(e){
    e.stopImmediatePropagation();   //chrome double submit bug
    e.preventDefault();             //dont run GET method and change url
}

function createTaskFromInputs(event){
    fixFormsBug(event);
    const name=document.getElementById('taskName').value;
    const date=new Date(document.getElementById('taskDateTime').value);
    const projID=document.getElementById('chooseProject').value;

    return [name,date,projID]
}

function createProjectFromInputs(event){
    fixFormsBug(event);
    const name=document.getElementById('projName').value;
    const selectedIcon=document.querySelector('input[type="radio"][name="iconSelector"]:checked');
    const iconHex=selectedIcon?selectedIcon.value:'f0ae';
    
    return [name,iconHex];
}

export{
    createTaskFromInputs,
    createProjectFromInputs
}