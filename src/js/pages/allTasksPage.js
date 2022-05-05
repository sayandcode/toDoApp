const allTasksPage= (function(){
    function generate(){
        const placeholder = document.createElement('p');
        placeholder.textContent='Placeholder';
        return placeholder;
    }

    return{
        generate
    }

})();

export default allTasksPage;