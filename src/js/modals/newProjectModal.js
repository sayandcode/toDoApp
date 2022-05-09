import newProjectModalTemplate from '../../fullRenders/modalNewProj.html';
import template2Node from '../utilities/template2Node.js';
import Project from '../tasks&Projects/projects.js'
import {createProjectFromInputs} from '../utilities/formStuff.js';

export default function newProjectModal(){
    //initialize
    const newProjectModal=template2Node(newProjectModalTemplate);
    document.body.insertBefore(newProjectModal, document.body.firstChild);

    //cache DOM
    const modal=document.querySelector('.modalBGOverlay');
    const form=modal.querySelector('form');
    const projName=modal.querySelector('#projName');
    const iconSelector=form.querySelector('.iconSelector');
    const cancelBtn=modal.querySelector('.cancelBtn');

    //create Icons
    const icons={
        partyIcon: 'f79f',
        birthdayIcon: 'f1fd',
        schoolIcon: 'f19d',
        workIcon: 'f0b1',
        wrenchIcon: 'f0ad'
    }
    for(const icon in icons){
        const radioBtn=document.createElement('input');
        const radioLabel=document.createElement('label');

        const radioAttrs={type:'radio',name:'iconSelector',id:icon,value:icons[icon]};
        for(const attr in radioAttrs)
            radioBtn.setAttribute(attr,radioAttrs[attr]);

        const labelAttrs={class:"icon",for:icon};
        for(const attr in labelAttrs)
            radioLabel.setAttribute(attr,labelAttrs[attr]);
        radioLabel.style.setProperty('--iconHex',`'\\${icons[icon]}'`);

        iconSelector.append(radioBtn,radioLabel);
    }

    /* default values */
    switch (this.constructor.name){
        case 'HTMLInputElement':
            projName.value=this.value;
            this.value='';  //clear the nav input box
            break;

        case 'Project':
            var project=this;
            projName.value=this.name;
            const selectedIcon=iconSelector.querySelector(`input[value="${this.icon}"]`);
            if (selectedIcon)
                selectedIcon.checked=true;
            break;
    }

    //listeners
    listen();


    function listen(){
        form.addEventListener('submit', createOrEditProject);
        cancelBtn.addEventListener('click', closeModal);
    }
    
    function stopListening(){
        form.removeEventListener('submit', createOrEditProject)
        cancelBtn.removeEventListener('click', closeModal);
    }

    function closeModal(){
        stopListening();
        modal.remove();
    }

    function createOrEditProject(event){
        const userInputs=createProjectFromInputs(event);
        if(!project)
            new Project(...userInputs);
        else
            project.edit(...userInputs);
        closeModal();
    }
}