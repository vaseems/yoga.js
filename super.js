/**
 * Created by vabbasmoha on 10/2/16.
 */
Array.prototype.iterator = function iterator(){
    int pos = 0;
    this.hasNext(){
        return this.length > pos;
    }
    this.next(){
        return this[pos];
    }
    return obj;
};

