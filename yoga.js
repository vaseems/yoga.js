/**
 * @license
 * yoga.js <https://yogajs.com/>
 * Released under MIT license <https://yogajs.com/license>
 * Copyright Vaseem Abbas Mohammed
 */

;(function(){

    var yoga = {
        ananthasana: {prototype: Array.prototype},
        salabhasana: {prototype: String.prototype},
        nadishodhana: {prototype: Number.prototype},
        balasana: {prototype: Boolean.prototype},
        dhyana: {prototype: Date.prototype},
        ekasana: {prototype: Object.prototype},
        matsyasana: {prototype: Function.prototype},
        virabhadrasana: {prototype: Window.prototype}
    };
    var MSG_NO_DIFFERENCE = "No Difference";

    var isArray = function(array){
      return typeof array == 'object' && (array) instanceof Array && !((array) instanceof Object);
    };

    var isObject = function(obj){
        return typeof array == 'object' && (array) instanceof Array && !((array) instanceof Object);
    };

    var contains = function(array, ele){
      return array.indexOf(ele) != -1;
    };

    yoga.ananthasana.contains = function(ele){
        return contains(this, ele);
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
        this.push.apply(this, a);
    };

    yoga.ananthasana.apply = function(operation){
        this.iterator();
        var result = [];
        while(this.hasNext()){
            result.push(operation.call(this, this.next()));
        }
        return result;
    };

    yoga.ananthasana.truthy = function(){
        var truths = [], falsy = [];
        this.iterator();
        while(this.hasNext()){
            var next = this.next();
            if(next){
                truths.push(next);
            }else{
                falsy.push(next);
            }
        }
        console.log(falsy);
        return truths;
    };

    yoga.ananthasana.difference = function(array){
        var difference = [];
        array.forEach(function(ele){
           contains(this, ele) && difference.push(ele);
        });

        this.forEach(function(ele){
            contains(array, ele) && difference.push(ele);
        });
        return difference.length == 0?MSG_NO_DIFFERENCE:difference;
    };

    yoga.ananthasana.differenceBy = function(array, operationBy){
        var difference = [];
        this.forEach(function(ele){
            contains(array, ele) && difference.push(ele);
        });
        return difference.length == 0?MSG_NO_DIFFERENCE:difference;
    };

    yoga.ekasana.size = function(){
        return Object.keys(this).length;
    };

    yoga.ekasana.entries = function(){
        var keys = Object.keys(this), i = 0, entries = [];
        while(i < keys.length){
            var entry = [];
            entry.push(keys[i]);
            entry.push(this[keys[i++]]);
            entries.push(entry);
        }
        return entries;
    };

    yoga.matsyasana.memoize = function(){
            var memo = {};
            var slice = Array.prototype.slice;
            var self = this;
            return function() {
                var args = slice.call(arguments);

                if (args in memo)
                    return memo[args];
                else
                    return (memo[args] = self.apply(this, args));
            }
    };

    yoga.virabhadrasana.isArray = function(obj){
        return isArray(obj);
    };

    yoga.virabhadrasana.isObject = function(obj){
        return isObject(obj);
    }

    Object.keys(yoga).forEach(function(asana){
        Object.keys(yoga[asana]).forEach(function(power){
            yoga[asana].prototype[power] = yoga[asana][power];
        });
    });
})();