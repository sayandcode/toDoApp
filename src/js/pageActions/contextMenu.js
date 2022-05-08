const contextMenu=(function(){
    const options={
        projectSlab:[
            {
                label:'Edit Project',
                fn:()=>{alert('Hi')}},
            {
                label:'Delete',
                fn:()=>{alert('Deleted')}
            },
       ],
    }
    function create(forClickedItem,[atPointX,atPointY]){
        const itemType=forClickedItem.className;
        
        const container=document.createElement('ul');
        container.classList.add('contextMenu');
        container.style.setProperty('--x-pos',atPointX)
        container.style.setProperty('--y-pos',atPointY)
        
        for(const option of options[itemType]){
            const li=document.createElement('li');
            li.textContent= option.label;
            li.addEventListener('click',option.fn);
            container.appendChild(li);
        }
        forClickedItem.append(container);
        return container;
    }

    return{
        create,
    }
})();



export default contextMenu;