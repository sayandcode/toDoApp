Object.defineProperty(Object.prototype, 'makeOrPush', {
    value: function (item,newKey){
        this[newKey]=this[newKey]||[];
        this[newKey].push(item);
    }
});

Object.defineProperty(Object.prototype, 'findIndex', {
    value: function (condition){
        const entriesArray=Object.entries(this)
        for(const i in entriesArray){
            if(condition(entriesArray[i][1]))
                return i;
        }
        //if you run through the whole thing without a match
        return -1;
    }
});

Object.defineProperty(Object.prototype, 'splice', {
    value: function (start, deleteCount, [itemName,item]){
        const entriesArray=Object.entries(this);
        switch (arguments.length){
            case 1:
                entriesArray.splice(start);
            case 2:
                entriesArray.splice(start,deleteCount);
            case 3:
                entriesArray.splice(start,deleteCount,[itemName,item]);
        }
        //change the value internally just like an array splice method
        //clear the obj and enter everything
        for(const key in this){
            if(this.hasOwnProperty(key))
                delete this[key];
        }
        Object.assign(this,Object.fromEntries(entriesArray));
    }
});