// PART 1: Predict and explain output (comments only)

console.log(a); // undefined (var is hoisted and initialized with undefined)
console.log(b); // ReferenceError (let is hoisted but in TDZ)
console.log(c); // ReferenceError (const is hoisted but in TDZ)

var a = 10;
let b = 20;
const c = 30;
// PART 2: Re-declaration behaviour

var a = 99; // allowed (var can be re-declared)

// let b = 88; // Error: cannot be re-declared in same scope

// const c = 77; // Error: cannot be re-declared or reassigned

// PART 3: Object behaviour

const user = { name: 'Asad' };

user.name = 'Ali'; // allowed (mutation of property)

// user = {}; // Error: Assignment to constant variable


// CORRECTED CODE VERSION
let a = 10;
let b = 20;
const c = 30;

console.log(a);
console.log(b);
console.log(c);

a = 99;
b = 88;

const userFixed = { name: 'Asad' };
userFixed.name = 'Ali';

console.log(userFixed);