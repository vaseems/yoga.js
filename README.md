# superjs
###Javascript library which powers javascript

SuperJS adds power to JavaScript. Meaning, it enhances the functionality
 of the existing objects, instead of creating new scope and manipulate
 objects.

## Array Concat

`var a = [10, 20, 30];`


`var b = [40, 50, 60];`

`a.concat(b);`

## Array Iterator

`var a = [10, 20, 30];`


`a.iterator();`


`while(a.hasNext()){
    console.log(a.next());
}`

## Object Entries

`var a = { foo: "bar", baz: 42 };
a.entries();`    // [ ['foo', 'bar'], ['baz', 42] ]
