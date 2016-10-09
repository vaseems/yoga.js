/**
 * Created by vabbasmoha on 10/2/16.
 */
(function(){

    var yoga = {
        ananthasana: {type: Array},
        salabhasana: {type: String},
        nadishodhana: {type: Number},
        balasana: {type: Boolean},
        dhyana: {type: Date},
        ekasana: {type: Object}
    };

    yoga.ananthasana.iterator = function(){
        var pos = 0;
        this.hasNext = function(){
            return this.length > pos;
        };
        this.next = function(){
            return this[pos++];
        };
        return this;
    };

    yoga.ananthasana.concat = function(a){
        a.iterator();
        while(a.hasNext()){
            this.push(a.next());
        }
    };

    yoga.ananthasana.apply = function(operation){
        this.iterator();
        var result = [];
        while(this.hasNext()){
            result.push(operation.call(this, this.next()));
        }
        return result;
    };

    yoga.ekasana.size = function(){
      return Object.keys(this).length;
    };

    yoga.ekasana.entries = function(){
        var keys = Object.keys(this), i=0, entries= [];
        while(i < keys.length){
            var entry = [];
            entry.push(keys[i]);
            entry.push(this[keys[i++]]);
            entries.push(entry);
        }
        return entries;
    };

    Object.keys(yoga).forEach(function(asana){
        Object.keys(yoga[asana]).forEach(function(power){
            yoga[asana].type.prototype[power] = yoga[asana][power];
        });
    });
})();