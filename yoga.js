/**
 * @license
 * yoga.js <https://yogajs.com/>
 * Released under MIT license <https://yogajs.com/license>
 * Copyright Vaseem Abbas Mohammed
 */

;!function(){

    var yoga = {
        ananthasana: {prototype: Array.prototype},
        salabhasana: {prototype: String.prototype},
        nadishodhana: {prototype: Number.prototype},
        balasana: {prototype: Boolean.prototype},
        makarasana: {prototype: Math},
        dhyana: {prototype: Date.prototype},
        ekasana: {prototype: Object.prototype},
        matsyasana: {prototype: Function.prototype},
        virabhadrasana: {prototype: Window.prototype}
    };

    var MSG_NO_DIFFERENCE = "No Difference";

    var isArray = function(array){
      return typeof array == 'object' && (array) instanceof Array;
    };

    var isObject = function(obj){
        return typeof obj == 'object' && (obj) instanceof Object && !((obj) instanceof Array);
    };

    function isNumber(arg) {
        return typeof arg === 'number' && arg === arg;
    }


    var contains = function(arr, ele){
      return arr.indexOf(ele) != -1;
    };

    var shallowCopy = function(array){
        return Array.prototype.slice.call(array);
    };

    var setConstant = function(value){
        return {
            enumerable: false,
            configurable: false,
            writable: false,
            value: value
        };
    };

    var inspect = (array) => {
        return array.length == 0?MSG_NO_array:array.length==1?array[0]:array;
    }

    /*
     * Array
     * */

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
        return truths;
    };

    yoga.ananthasana.difference = function(array){
        var difference = [];
        var _self = this;
        if(!isArray(array)){console.error("TypeError: Passed parameter is not an Array");return inspect(_self);}
        array.forEach((ele) => {
            !_self.contains(ele) && difference.push(ele);
        });
        this.forEach((ele) => {
            !array.contains(ele) && !difference.contains(ele) && difference.push(ele);
        });
        return inspect(difference);
    };

    //TODO
    yoga.ananthasana.differenceBy = function(array, operationBy){
        var difference = [];
        this.forEach(function(ele){
            array.contains(ele) && difference.push(ele);
        });
        return inspect(difference);
    };

    /*
     * Object
     * */

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

    yoga.ekasana.template = (template, ele) => {
        "use strict";
        this.keys.forEach()
    };

    /*
     * Math Object
     *
     */
    yoga.makarasana.add = function(){
        var args = [...arguments];
        return args.reduce((total, num) => {
            return total + num;
        });
    };


    /*
     * Function
     * */

    yoga.matsyasana.memoize = function(context){
        var self = this.name;
        var obj = (context || window)[self];
        obj = () => {
            var args = shallowCopy(arguments),
                cache = obj.cache || (obj.cache = {});
            return cache[args] ||  (cache[args] = obj.apply(this, args));
        };
    };

    yoga.matsyasana.curry = function(){
        var args = shallowCopy(arguments, 1);
        var self = this;
        return () => {
          return self.apply(this, args.concat(
              shallowCopy(arguments, 0)
          ));
        };
    };

    /*
    * Window
    * */


    Object.defineProperties(yoga.virabhadrasana, {
        "GET"       : setConstant("GET"),
        "POST"      : setConstant("POST"),
        "PUT"       : setConstant("PUT"),
        "DELETE"    : setConstant("DELETE")
    });

    yoga.virabhadrasana.isArray = function(obj){
        return isArray(obj);
    };

    yoga.virabhadrasana.isObject = function(obj){
        return isObject(obj);
    };

    yoga.virabhadrasana.$http = (function $http(url){

        var core = {

            ajax: function (method, url, args) {

                var promise = new Promise( function (resolve, reject) {

                    var client = new XMLHttpRequest();
                    var uri = url;

                    if (args && (method === 'POST' || method === 'PUT')) {
                        uri += '?';
                        var argcount = 0;
                        for (var key in args) {
                            if (args.hasOwnProperty(key)) {
                                if (argcount++) {
                                    uri += '&';
                                }
                                uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                            }
                        }
                    }

                    client.open(method, uri);
                    client.send();

                    client.onload = () => {
                        if (this.status >= 200 && this.status < 300) {
                            resolve(this.response);
                        } else {
                            reject(this.statusText);
                        }
                    };
                    client.onerror = function () {
                        reject(this.statusText);
                    };
                });

                // Return the promise
                return promise;
            }
        };

        // Adapter pattern
        return {
            'get': function(args) {
                return core.ajax('GET', url, args);
            },
            'post': function(args) {
                return core.ajax('POST', url, args);
            },
            'put': function(args) {
                return core.ajax('PUT', url, args);
            },
            'delete': function(args) {
                return core.ajax('DELETE', url, args);
            }
        };
    })();


    Object.keys(yoga).forEach((asana) => {
        Object.keys(yoga[asana]).forEach((power) => {
            if(power != 'prototype'){
                yoga[asana].prototype[power] = yoga[asana][power];
            }

        });
    });
}();