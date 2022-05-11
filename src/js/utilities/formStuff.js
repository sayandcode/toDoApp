import Project from "../tasks&Projects/projects";

function fixFormsBug(e){
    e.stopImmediatePropagation();   //chrome double submit bug
    e.preventDefault();             //dont run GET method and change url
}

function createTaskFromInputs(event){
    fixFormsBug(event);
    const taskName=document.getElementById('taskName').value;
    const taskDate=new Date(document.getElementById('taskDateTime').value);
    const projectID=document.getElementById('chooseProject').value;

    return {taskName,taskDate,projectID}
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