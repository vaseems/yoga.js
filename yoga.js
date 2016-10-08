/**
 * Created by vabbasmoha on 10/2/16.
 */
var yogajs = Object.create({}, {});

Array.prototype.iterator = function(){
    var pos = 0;
    this.hasNext = function(){
        return this.length > pos;
    };
    this.next = function(){
        return this[pos++];
    };
    return this;
};

Array.prototype.concat = function(a){
    a.iterator();
    while(a.hasNext()){
        this.push(a.next());
    }
};

Array.prototype.apply = function(operation){
    this.iterator();
    var result = [];
    while(this.hasNext()){
        result.push(operation.call(this, this.next()));
    }
    return result;
}

Object.prototype.entries = function(){
    var keys = Object.keys(this), i=0, entries= [];
    while(i < keys.length){
        var entry = [];
        entry.push(keys[i]);
        entry.push(this[keys[i++]]);
        entries.push(entry);
    }
    return entries;
};
