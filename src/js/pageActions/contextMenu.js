const contextMenu=(function(){
    const options={
        projectSlab:{
            'Edit Project':()=>alert('Edited'),
            'Delete':()=>alert('Deleted'),
        },
    }
    function render(stuff){
        console.log(options[stuff]);
    }
    return{
        render
    }
})();



export default contextMenu;