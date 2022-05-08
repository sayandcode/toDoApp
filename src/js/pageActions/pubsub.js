const pubsub=(function(){
    const events={};
    function subscribe(eventName,fn){
        events.makeOrPush(fn,eventName);
    }
    function unsubscribe(eventName,fn){
        const i=events[eventName].indexOf(fn); //check if an event is there
        if(i!==-1) //dont remove the whole event, just the one function that was supposed to be called
            events[eventName].splice(i,1);
    }
    function publish(eventName,data){
        if(events[eventName])
            events[eventName].forEach(fn=>{
                if (Array.isArray(data))
                    return fn(...data);
                else
                    return fn(data);
        });
    }
    return{
        subscribe,
        unsubscribe,
        publish
    }
})()

export default pubsub;