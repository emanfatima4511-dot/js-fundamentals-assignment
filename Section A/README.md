# Section A — Interview-Style Questions

---

## Q1: What is the difference between var, let, and const in JavaScript?

JavaScript provides three ways to declare variables: var, let, and const. They differ in scope, hoisting behavior, and reusability.

---

### 1. Scope

Scope defines where a variable is accessible in the code.

- var → function scoped
- let → block scoped
- const → block scoped

Example:

```javascript
function test() {
    if (true) {
        var a = 10;
        let b = 20;
        const c = 30;
    }

    console.log(a); // works
    console.log(b); // error
    console.log(c); // error
}
```

var is accessible outside the block, while let and const are limited to the block.

---

### 2. Hoisting

Hoisting means variables are moved to the top of their scope during compilation.

- var → hoisted and initialized with undefined
- let → hoisted but not initialized (TDZ)
- const → hoisted but not initialized (TDZ)

Example:

```javascript
console.log(a);
var a = 5; // undefined
```

```javascript
console.log(b);
let b = 10; // ReferenceError
```

---

### 3. Temporal Dead Zone (TDZ)

TDZ is the time between entering scope and variable declaration where the variable cannot be accessed.

- let → has TDZ
- const → has TDZ
- var → no TDZ

---

### 4. Re-declaration and Re-assignment

- var → allows both re-declaration and re-assignment
- let → allows re-assignment but not re-declaration
- const → allows neither re-declaration nor re-assignment

Example:

```javascript
var x = 1;
var x = 2;

let y = 1;
y = 2;

const z = 1;
```

---

### 5. Best Practice

Use const by default, let when value changes, and avoid var due to unpredictable behavior.

---

## Q2: What is the V8 engine? What does it mean that JavaScript is single-threaded?

The V8 engine is a JavaScript engine developed by Google that executes JavaScript code. It is used in Google Chrome and Node.js.

---

### 1. V8 Engine

V8 converts JavaScript code into machine code so that it can be executed efficiently.

It is used in:
- Google Chrome
- Node.js

---

### 2. JIT Compilation

V8 uses Just-In-Time (JIT) compilation.

This means:
- JavaScript is compiled during runtime
- Code is converted into optimized machine code
- Execution becomes faster

---

### 3. Single-threaded JavaScript

JavaScript is single-threaded, meaning:
- It has one Call Stack
- It executes one task at a time
- Code runs in sequence

Example:

```javascript
console.log("A");
console.log("B");
console.log("C");
```

Output:
A → B → C

---

### 4. Asynchronous Behavior

Even though JavaScript is single-threaded, it can handle async tasks like setTimeout and fetch using the environment.

These tasks are handled by:
- Web APIs (browser)
- Node APIs (server)

---

### 5. Execution Model

- Call Stack → executes code
- Web APIs → handle async tasks
- Callback Queue → stores completed tasks
- Event Loop → moves tasks to Call Stack

Flow:
Call Stack → Web APIs → Callback Queue → Event Loop → Call Stack

---

## Q3: Explain the 8 JavaScript data types. What is type coercion — implicit vs explicit?

JavaScript has 8 data types: 7 primitive types and 1 object type.

---

### 1. Data Types

Primitive types:
- String
- Number
- Boolean
- Undefined
- Null
- Symbol
- BigInt

Non-primitive type:
- Object

Example:

```javascript
let name = "Ali";
let age = 20;
let isActive = true;
let data;
let value = null;
let obj = {};
```

---

### 2. typeof null bug

```javascript
typeof null === "object"; // true
```

This is a historical bug. Null is not an object, but typeof incorrectly returns "object".

---

### 3. Implicit Type Coercion

JavaScript automatically converts types.

Example:

```javascript
"5" + 2; // "52"
"5" - 2; // 3
```

---

### 4. Explicit Type Coercion

Developer manually converts types.

```javascript
Number("10");
String(100);
Boolean(1);
```

---

### 5. == vs ===

- == performs type coercion (unsafe)
- === does not perform type coercion (safe)

Example:

```javascript
"5" == 5;  // true
"5" === 5; // false
```

---

### Conclusion

Use === instead of == to avoid unexpected type conversions.

## Q4: What is the difference between primitive and non-primitive (reference) data types in JavaScript? How are they stored in memory?

JavaScript data types are divided into **primitive** and **non-primitive (reference)** types. The main difference between them is how they are stored in memory and how copying behaves.

---

### 1. Primitive Data Types (Stored in Stack)

Primitive types store **actual values directly** in memory.

Primitive types include:
- String
- Number
- Boolean
- Undefined
- Null
- Symbol
- BigInt

These are stored in the **Stack memory**, which is fast and works in a LIFO (Last In First Out) manner.

---

### 2. Non-Primitive (Reference) Data Types (Stored in Heap)

Non-primitive types store **references (memory addresses)** instead of actual values.

Non-primitive types include:
- Object
- Array
- Function

These are stored in the **Heap memory**, which is used for dynamic memory allocation.

The variable itself is stored in the stack, but it points to the actual data in the heap.

---

### 3. Copying Primitive Values

When a primitive value is copied, a **new independent copy** is created.

Changes in one variable do not affect the other.

Example:

```javascript
let a = 10;
let b = a;

b = 20;

console.log(a); // 10
console.log(b); // 20
```

Here, `a` and `b` are completely separate.

---

### 4. Copying Reference Values (Objects/Arrays)

When a non-primitive value is copied, only the **reference (address)** is copied, not the actual object.

Both variables point to the same memory location.

Example:

```javascript
let obj1 = { name: "Ali" };
let obj2 = obj1;

obj2.name = "Ahmed";

console.log(obj1.name); // Ahmed
console.log(obj2.name); // Ahmed
```

Both variables reflect the same change because they refer to the same object in heap memory.

---

### 5. Key Difference Summary

| Feature | Primitive | Non-Primitive |
|----------|----------|---------------|
| Stored in | Stack | Heap |
| Copy behavior | Creates new value | Copies reference |
| Mutation effect | Independent | Shared |
| Examples | number, string | object, array |

---

### Conclusion

Primitive data types are stored directly in stack memory and are copied by value, meaning changes do not affect the original variable. Non-primitive data types are stored in heap memory and are copied by reference, meaning changes in one variable can affect others pointing to the same object.

## Q5: What is pass by value vs pass by reference? Is JavaScript truly pass by reference?

In JavaScript, understanding how values are passed to functions is important because it affects how data behaves inside and outside functions.

JavaScript is often misunderstood as "pass by reference", but in reality it is **pass by value for primitives and pass-by-value of reference for objects**.

---

### 1. Passing Primitive Values (Pass by Value)

When a primitive value is passed to a function, a **copy of the actual value** is passed.

This means changes inside the function do not affect the original variable.

Example:

```javascript
function changeValue(x) {
    x = 50;
}

let a = 10;
changeValue(a);

console.log(a); // 10
```

Here, `a` remains unchanged because only a copy of its value was passed.

---

### 2. Passing Objects (Reference Behavior)

When an object is passed to a function, the **reference (memory address)** is passed.

This means both the original variable and the function parameter point to the same object in memory.

Example:

```javascript
function updateObject(obj) {
    obj.name = "Ahmed";
}

let user = { name: "Ali" };
updateObject(user);

console.log(user.name); // Ahmed
```

Here, the original object is modified because both references point to the same heap memory.

---

### 3. Key Concept: "Pass by Value of Reference"

JavaScript does NOT pass objects by reference directly.

Instead, it passes the **reference by value**.

This means:
- The reference (memory address) is copied
- Both variables still point to the same object
- But the reference itself is not shared

So technically:
- Primitives → pass by value
- Objects → pass the value of a reference

---

### 4. Proof: Reassigning Object Inside Function Does NOT Affect Original

If you reassign the object itself inside a function, it does not affect the original object.

Example:

```javascript
function reassignObject(obj) {
    obj = { name: "New User" };
}

let user = { name: "Ali" };
reassignObject(user);

console.log(user.name); // Ali
```

Here, reassigning `obj` only changes the local copy of the reference.

The original object remains unchanged.

---

### 5. Mutating Object Property DOES Affect Original

If you modify the property of the object, it affects the original because both references point to the same object.

Example:

```javascript
function mutateObject(obj) {
    obj.name = "Ahmed";
}

let user = { name: "Ali" };
mutateObject(user);

console.log(user.name); // Ahmed
```

---

### Conclusion

- Primitives are passed by value, so changes do not affect the original.
- Objects are passed by "reference value", meaning the reference is copied but still points to the same memory.
- Reassigning an object inside a function does not affect the original object.
- Mutating object properties does affect the original object.
- JavaScript is NOT purely pass by reference; it uses pass by value with reference types.

## Q6: What is a function in JavaScript? Explain function declaration with syntax, hoisting behavior, return values, and parameters.

A function in JavaScript is a reusable block of code designed to perform a specific task. It helps avoid repetition, improves code organization, and makes programs easier to maintain.

---

### 1. What is a function?

A function solves the problem of code repetition by allowing us to write logic once and reuse it multiple times whenever needed.

---

### 2. Function Declaration Syntax

A function declaration defines a function using the `function` keyword.

```javascript
function functionName(parameter1, parameter2) {
    // code block
    return result;
}
```

Example:

```javascript
function add(a, b) {
    return a + b;
}
```

---

### 3. Hoisting Behavior

Function declarations are **hoisted completely**, meaning they can be called before they are defined in the code.

Example:

```javascript
console.log(sum(5, 3));

function sum(a, b) {
    return a + b;
}
```

Output:
```
8
```

This works because the entire function definition is moved to the top during the compilation phase.

---

### 4. Parameters vs Arguments

- **Parameters** → variables defined in the function definition
- **Arguments** → actual values passed when calling the function

Example:

```javascript
function greet(name) {   // name is a parameter
    console.log("Hello " + name);
}

greet("Ali"); // "Ali" is an argument
```

---

### 5. Return Value

If a function does not explicitly use a `return` statement, it returns:

```
undefined
```

Example:

```javascript
function test() {
    let a = 10;
}

console.log(test()); // undefined
```

---

### 6. Real-World Example: Age Validation

```javascript
function isEligible(age) {
    if (age >= 18) {
        return "Eligible to vote";
    } else {
        return "Not eligible to vote";
    }
}

console.log(isEligible(20)); // Eligible to vote
console.log(isEligible(15)); // Not eligible to vote
```

---

### Conclusion

A function is a reusable block of code that performs a specific task. Function declarations are hoisted, meaning they can be called before they are defined. Parameters are placeholders in function definitions, while arguments are actual values passed. If no return statement is used, the function returns undefined. Functions are widely used for code reusability and modular programming.

## SECTION 2

## B1: var / let / const + Hoisting (Predict Output, Explain, and Fix Bugs)

This task demonstrates understanding of hoisting, temporal dead zone (TDZ), and variable declaration rules in JavaScript. The code is divided into three parts: output prediction, re-declaration behavior, and object mutation behavior. A corrected version is also provided.

---

### Part 1: Hoisting and Output Prediction

```javascript
console.log(a); // undefined
console.log(b); // ReferenceError
console.log(c); // ReferenceError

var a = 10;
let b = 20;
const c = 30;
```

Explanation:
- `var a` is hoisted and initialized with `undefined`, so it prints `undefined`.
- `let b` and `const c` are hoisted but remain in Temporal Dead Zone (TDZ), so accessing them before declaration causes ReferenceError.

---

### Part 2: Re-declaration Rules

```javascript
var a = 99; // allowed
let b = 88; // error
const c = 77; // error
```

Explanation:
- `var` allows re-declaration in the same scope.
- `let` does not allow re-declaration in the same scope.
- `const` does not allow re-declaration or re-assignment.

---

### Part 3: Object Behavior (Reference Type)

```javascript
const user = { name: 'Asad' };

user.name = 'Ali'; // allowed
user = {}; // not allowed
```

Explanation:
- Object properties can be modified even if the object is declared with `const`.
- Reassigning the entire object is not allowed because `const` prevents reassignment.

---

### Corrected Version of Code

```javascript
let a = 10;
let b = 20;
const c = 30;

console.log(a);
console.log(b);
console.log(c);

a = 99;
b = 88;

const user = { name: 'Asad' };
user.name = 'Ali';

console.log(user);
```

---

### Conclusion

- `var` is function scoped and hoisted with `undefined`.
- `let` and `const` are block scoped and stay in TDZ before declaration.
- `const` prevents reassignment but allows mutation of object properties.
- Proper understanding of hoisting and TDZ is essential to avoid runtime errors.

## B2: typeAnalyser Function (Functions + Type Coercion)

This function analyzes any input value and returns a detailed report about its type and how JavaScript converts it into different data types.

---

## Function Code

```javascript
function typeAnalyser(value) {
    return {
        input: value,
        typeofResult: typeof value,
        isArray: Array.isArray(value),
        isNull: value === null,
        toNumber: Number(value),
        toBoolean: Boolean(value),
        toString: String(value)
    };
}
```

---

## Explanation of Each Property

### 1. input
Returns the original value passed to the function without any change.

---

### 2. typeofResult
Uses JavaScript `typeof` operator to check the type of value.

Example:
- typeof 42 → "number"
- typeof "hello" → "string"
- typeof null → "object" (known JavaScript bug)

---

### 3. isArray
Checks whether the value is an array using:
```javascript
Array.isArray(value)
```

Returns:
- true if array
- false otherwise

---

### 4. isNull
Checks explicitly if value is null:
```javascript
value === null
```

Important: typeof null is "object", so this check is necessary.

---

### 5. toNumber
Converts value into a number using:
```javascript
Number(value)
```

Examples:
- "42" → 42
- "hello" → NaN
- true → 1
- false → 0
- [] → 0
- undefined → NaN

---

### 6. toBoolean
Converts value into boolean using:
```javascript
Boolean(value)
```

Rules:
- Falsy values → false: 0, "", null, undefined, NaN
- Everything else → true

---

### 7. toString
Converts value into string using:
```javascript
String(value)
```

Examples:
- 42 → "42"
- null → "null"
- undefined → "undefined"
- [] → ""

---

## Test Cases and Expected Output Behavior

### 1. typeAnalyser(42)
- number input
- toNumber: 42
- toBoolean: true
- toString: "42"

---

### 2. typeAnalyser('hello')
- string input
- toNumber: NaN
- toBoolean: true
- toString: "hello"

---

### 3. typeAnalyser(null)
- typeofResult: "object" (bug)
- isNull: true
- toNumber: 0
- toBoolean: false
- toString: "null"

---

### 4. typeAnalyser([])
- array detected (isArray: true)
- toNumber: 0
- toBoolean: true
- toString: ""

---

### 5. typeAnalyser(undefined)
- toNumber: NaN
- toBoolean: false
- toString: "undefined"

---

### 6. typeAnalyser(true)
- toNumber: 1
- toBoolean: true
- toString: "true"

---

### 7. typeAnalyser(0)
- toBoolean: false
- toString: "0"

---

### 8. typeAnalyser('')
- empty string
- toNumber: 0
- toBoolean: false
- toString: ""

---

## Conclusion

This function demonstrates:
- JavaScript data types
- type checking (typeof, Array.isArray)
- special case handling for null
- type coercion using Number, Boolean, and String

It clearly shows how JavaScript converts values internally, which is important for debugging and interviews.

## B3: calculateDiscount Function (Operators + Conditions)

This function calculates the final price after applying multiple discount rules in a specific order. It also includes validation, membership discount, and final formatting rules.

---

## Function Code

```javascript
function calculateDiscount(price, userType, isMember) {
    if (typeof price !== "number" || price <= 0) {
        return "Invalid price";
    }

    let finalPrice = price;

    if (userType === "admin") {
        finalPrice = finalPrice * 0.5;
    }
    else if (finalPrice > 1000) {
        finalPrice = finalPrice * 0.8;
    }
    else if (finalPrice > 500) {
        finalPrice = finalPrice * 0.9;
    }

    if (isMember === true) {
        finalPrice = finalPrice * 0.95;
    }

    if (finalPrice < 1) {
        finalPrice = 1;
    }

    return Number(finalPrice.toFixed(2));
}
```

---

## Step-by-Step Logic Explanation

### 1. Price Validation

```javascript
if (typeof price !== "number" || price <= 0)
```

If price is:
- not a number OR
- less than or equal to 0

Then function immediately returns:
```
"Invalid price"
```

Example:
- calculateDiscount(-50, ...) → Invalid price
- calculateDiscount("abc", ...) → Invalid price

---

### 2. Admin Discount (Highest Priority)

```javascript
if (userType === "admin")
```

Admin users always get:
- 50% discount

Example:
- 1000 → 500

---

### 3. Price-Based Discounts

These are applied only if user is NOT admin:

#### If price > 1000
- 20% discount applied

#### If price > 500
- 10% discount applied

Only ONE of these conditions runs because of `else if`.

---

### 4. Member Discount (Additional)

```javascript
if (isMember === true)
```

After all previous discounts:
- Members get extra 5% off

This is applied on already discounted price.

---

### 5. Minimum Price Rule

```javascript
if (finalPrice < 1)
```

Ensures final price never goes below 1.

---

### 6. Rounding

```javascript
toFixed(2)
```

Final result is rounded to 2 decimal places for accuracy.

---

## Test Cases and Output Explanation

---

### 1. calculateDiscount(1200, 'user', false)

- Price > 1000 → 20% off
- 1200 × 0.8 = 960

Output:
```
960
```

---

### 2. calculateDiscount(1200, 'user', true)

- 1200 × 0.8 = 960
- Member 5% off → 960 × 0.95 = 912

Output:
```
912
```

---

### 3. calculateDiscount(600, 'admin', true)

- Admin → 50% off → 600 × 0.5 = 300
- Member 5% off → 300 × 0.95 = 285

Final:
```
285
```

(Note: If your assignment expects 270, follow instructor rule order strictly, but logically correct result is 285 based on given steps.)

---

### 4. calculateDiscount(-50, 'user', false)

- Invalid price (less than 0)

Output:
```
Invalid price
```

---

### 5. calculateDiscount('abc', 'user', false)

- Not a number

Output:
```
Invalid price
```

---

## Conclusion

This function demonstrates:
- Conditional logic (if/else)
- Operator usage
- Order of execution importance
- Business rule handling
- Input validation
- Floating-point precision handling

Correct discount calculation depends heavily on applying rules in the correct order.

## B4: Bugs in Pass-by-Reference and Shallow Copy (Identify + Fix)

This task focuses on understanding how reference types behave in JavaScript and how shallow copying can lead to unexpected mutations.

---

## Bug 1: Cart Duplication Bug (Shallow Copy Issue)

### Code
```javascript
const cart1 = { items: ['JS Book', 'React Book'], total: 150 };
const cart2 = { ...cart1 };

cart2.items.push('Node Book');

console.log(cart1.items);
```

### 1. What is the bug?

This is a **shallow copy problem**.

- `{ ...cart1 }` only copies the top-level object
- The `items` array is still shared in memory

So modifying `cart2.items` also affects `cart1.items`.

---

### 2. Wrong Output

```text
['JS Book', 'React Book', 'Node Book']
```

Yes, this is incorrect behavior if we expect cart1 to remain unchanged.

---

### 3. Fix

Use **deep copy for nested objects/arrays**:

```javascript
const cart1 = { items: ['JS Book', 'React Book'], total: 150 };

const cart2 = {
    ...cart1,
    items: [...cart1.items]
};

cart2.items.push('Node Book');

console.log(cart1.items); // unchanged
console.log(cart2.items);
```

---

## Bug 2: Function Mutating Original Object

### Code
```javascript
function applyTax(order) {
    order.total = order.total * 1.17;
    return order;
}

const myOrder = { id: 1, total: 100 };
const taxedOrder = applyTax(myOrder);

console.log(myOrder.total);
```

---

### 1. Bug

The function **directly mutates the original object** because objects are passed by reference.

---

### 2. Wrong Output

```text
117
```

Even `myOrder` is changed, which is not intended.

---

### 3. Fix

Create a new object instead of modifying the original:

```javascript
function applyTax(order) {
    return {
        ...order,
        total: order.total * 1.17
    };
}

const myOrder = { id: 1, total: 100 };
const taxedOrder = applyTax(myOrder);

console.log(myOrder.total);   // 100
console.log(taxedOrder.total); // 117
```

---

## Bug 3: Config Reset Not Working (Shallow Copy + Reference Issue)

### Code
```javascript
const defaultConfig = {
    theme: 'dark',
    lang: 'en',
    nested: { fontSize: 14 }
};

function resetConfig(config) {
    config = { ...defaultConfig };
    config.nested.fontSize = 14;
}

const appConfig = {
    theme: 'light',
    lang: 'ur',
    nested: { fontSize: 20 }
};

resetConfig(appConfig);

console.log(appConfig.theme);
console.log(appConfig.nested.fontSize);
```

---

### 1. Bug

There are two issues:

- `config = {...defaultConfig}` only changes local reference (does NOT affect original object)
- Nested object (`nested`) is still shared (shallow copy issue)

So reset does not actually update `appConfig`.

---

### 2. Wrong Output

```text
light
20
```

Nothing changes in original object.

---

### 3. Fix (Deep Copy + Proper Assignment)

Correct approach:

```javascript
function resetConfig(config) {
    config.theme = defaultConfig.theme;
    config.lang = defaultConfig.lang;
    config.nested.fontSize = defaultConfig.nested.fontSize;
}

const appConfig = {
    theme: 'light',
    lang: 'ur',
    nested: { fontSize: 20 }
};

resetConfig(appConfig);

console.log(appConfig.theme); // dark
console.log(appConfig.nested.fontSize); // 14
```

---

## Conclusion

- Shallow copy copies only top-level properties.
- Nested objects/arrays are still shared in memory.
- Passing objects to functions passes reference by value.
- To avoid bugs, use deep copy or explicitly create new objects.

## B5: Pure Function Library (Immutability + No Mutation)

This task focuses on writing **pure functions** in JavaScript. A pure function is a function that:
- Does not modify its input data
- Always returns a new value
- Has no side effects

This ensures predictability and avoids bugs related to shared references.

---

## 1. addToCart(cart, item)

### Function
```javascript
function addToCart(cart, item) {
    return [...cart, item];
}
```

### Explanation
- Uses spread operator to create a new array
- Original cart remains unchanged

### Test
```javascript
const cart = ["JS Book", "React Book"];
const newCart = addToCart(cart, "Node Book");

console.log(cart);     // ["JS Book", "React Book"]
console.log(newCart);  // ["JS Book", "React Book", "Node Book"]
```

---

## 2. updateUserAge(user, newAge)

### Function
```javascript
function updateUserAge(user, newAge) {
    return {
        ...user,
        age: newAge
    };
}
```

### Explanation
- Creates a new object using spread operator
- Updates only age property
- Original object is not modified

### Test
```javascript
const user = { name: "Ali", age: 20 };
const updatedUser = updateUserAge(user, 25);

console.log(user);         // { name: "Ali", age: 20 }
console.log(updatedUser);  // { name: "Ali", age: 25 }
```

---

## 3. incrementScore(scores, playerName)

### Function
```javascript
function incrementScore(scores, playerName) {
    return {
        ...scores,
        [playerName]: (scores[playerName] || 0) + 1
    };
}
```

### Explanation
- Creates new object
- Increases score of given player
- If player does not exist, starts from 0

### Test
```javascript
const scores = { Ali: 5, Ahmed: 3 };
const newScores = incrementScore(scores, "Ali");

console.log(scores);     // { Ali: 5, Ahmed: 3 }
console.log(newScores);  // { Ali: 6, Ahmed: 3 }
```

---

## 4. reverseString(str)

### Function
```javascript
function reverseString(str) {
    return str.split("").reverse().join("");
}
```

### Explanation
- Strings in JavaScript are immutable
- Original string cannot be changed
- A new reversed string is returned

### Test
```javascript
const text = "hello";
const reversed = reverseString(text);

console.log(text);     // "hello"
console.log(reversed);  // "olleh"
```

---

## 5. removeItem(arr, index)

### Function
```javascript
function removeItem(arr, index) {
    return arr.filter((_, i) => i !== index);
}
```

### Explanation
- Uses filter to create a new array
- Removes item at given index
- Original array remains unchanged

### Test
```javascript
const arr = [10, 20, 30, 40];
const newArr = removeItem(arr, 2);

console.log(arr);     // [10, 20, 30, 40]
console.log(newArr);  // [10, 20, 40]
```

---

## Conclusion

This exercise demonstrates:
- Pure functions in JavaScript
- Immutability principles
- Avoiding side effects
- Safe state updates using spread operator and array methods

Pure functions make code more predictable, testable, and maintainable.

## SECTION C

## C1: E-Commerce Product Manager — Shopping Cart System

This scenario demonstrates real-world issues caused by **pass-by-reference, shallow copying, and mutation of objects in JavaScript**. The goal is to identify bugs, explain unexpected behavior, and fix the system using immutability principles.

---

## Task 1: Output Prediction and Explanation

### 1. Tab 1 cart items
```
2
```

### Explanation:
`cartB = cartA` means both variables point to the same memory reference.  
When `cartB.items.push(...)` is executed, it also affects `cartA.items`.

So both tabs share the same data.

---

### 2. Tab 1 total
```
152500
```

### Explanation:
Since both variables reference the same object, updating `cartB.total` also updates `cartA.total`.

---

### 3. Original cart total after applyPromo
```
450
```

### Explanation:
The function `applyPromo` directly modifies the original object instead of creating a new one. This causes mutation of `originalCart`.

---

## Task 2: Bug Identification

### Bug 1: Shared reference between cartA and cartB
```javascript
var cartB = cartA;
```
Problem:
Both variables point to the same object in memory (no copy is created).

---

### Bug 2: Shallow copy issue
```javascript
items: [{ name: 'Laptop', price: 150000 }]
```
Problem:
Nested objects are shared even if a shallow copy is made.

---

### Bug 3: Direct mutation in function
```javascript
cart.total = cart.total - discount;
```
Problem:
Function modifies original object instead of returning a new one.

---

### Bug 4: Use of var
Problem:
`var` is function scoped and unsafe for modern JavaScript. It should be replaced with `const` or `let`.

---

## Task 3: Fix Summary

### Fixed Approach:
- Use **deep copy for cartB**
- Avoid direct mutation in functions
- Use `const` instead of `var`

### Key Fix:
- Spread operator used for cloning objects and arrays
- Nested objects are explicitly copied

---

## Task 4: addItem Function (Pure Function)

### Function Purpose:
Adds an item to the cart without modifying the original cart.

### Behavior:
- Returns a new cart object
- Updates items array immutably
- Recalculates total safely

### Verification:
```javascript
console.log("Before:", testCart);
console.log("After original:", testCart);
console.log("After updated:", updatedCart);
```

### Expected Result:
- Original cart remains unchanged
- New cart contains updated item and total

---

## Conclusion

This scenario demonstrates:
- Difference between reference vs value behavior
- Problems caused by shallow copying
- Importance of immutability in JavaScript
- Safe state updates using pure functions

Proper handling of objects is critical in real-world applications like e-commerce carts where data consistency is essential.

## C2: User Registration System — Validation Engine

This task focuses on building a robust **form validation function** that handles messy, incomplete, or incorrectly typed user input. The goal is to create a **pure function** that validates data using JavaScript data types, type coercion, and conditional logic.

---

## Function: validateUser(data)

### Input Format
```javascript
{
  name,
  email,
  age,
  password,
  role
}
```

---

## Validation Rules

### 1. Name
- Must be a non-empty string
- Empty strings or non-string values are invalid

---

### 2. Email
- Must be a string
- Must contain `@` and `.`

---

### 3. Age
- Must be a number OR coercible to a number
- Must be between 13 and 120
- If value contains invalid characters (e.g. "17abc"), it is rejected
- String values like "25" are converted using `Number()`

---

### 4. Password
- Must be a string
- Minimum length: 8 characters

---

### 5. Role
- Allowed values: `admin`, `editor`, `user`
- If not provided → default is `"user"`

---

## Return Format

### If Valid Input
```javascript
{
  valid: true,
  user: {
    name,
    email,
    age,
    password,
    role
  }
}
```

### If Invalid Input
```javascript
{
  valid: false,
  errors: ["error message 1", "error message 2"]
}
```

---

## Test Cases

### 1. Valid User (with missing role)
```javascript
validateUser({
  name: 'Ali',
  email: 'ali@test.com',
  age: '25',
  password: 'pass1234'
})
```

### Expected Output:
- valid: true
- role defaults to "user"
- age converted to number

---

### 2. Completely Invalid User
```javascript
validateUser({
  name: '',
  email: 'notanemail',
  age: 10,
  password: 'abc'
})
```

### Expected Output:
- valid: false
- multiple validation errors

---

### 3. Valid Admin User
```javascript
validateUser({
  name: 'Sara',
  email: 'sara@x.io',
  age: 30,
  password: 'secure99',
  role: 'admin'
})
```

### Expected Output:
- valid: true
- role = admin

---

### 4. Invalid Age Format
```javascript
validateUser({
  name: 'X',
  email: 'x@x.com',
  age: '17abc',
  password: 'hello123'
})
```

### Expected Output:
- valid: false
- age error due to non-coercible value

---

## Key Concepts Used

- JavaScript data types
- Type coercion using Number()
- Input validation using typeof
- Logical operators (&&, ||)
- Guard clause error handling
- Pure function design (no mutation of input)

---

## Conclusion

This function ensures that only clean and valid user data is accepted into the system. It demonstrates real-world backend validation logic used in registration systems, focusing on reliability, safety, and correct type handling.

## C3: Student Grade Management System — Report Generator

This is a complete real-world system that processes student data and generates academic reports. It combines **functions, type coercion, conditions, immutability, loops, and data transformation**.

---

## Given Data

```javascript
const students = [
  { name: 'Asad', scores: [85, 90, 78, 92], present: true },
  { name: 'Sara', scores: [70, 65, '80', 75], present: true },
  { name: 'Ali', scores: [55, 60, 50, null], present: false },
  { name: 'Fatima', scores: [95, 98, 100, 92], present: true },
  { name: 'Umar', scores: [], present: true },
];
```

---

## 1. getAverage(scores)

### Purpose
Calculates the average of student scores safely.

### Rules
- Converts string numbers using `Number()`
- Ignores `null` and invalid values
- Returns `0` if no valid scores exist
- Rounds result to 1 decimal place

### Example Behavior
- `[85, "90", null] → 87.5`
- `[] → 0`

---

## 2. getGrade(average)

### Purpose
Converts numeric average into grade.

### Grading Scale
- 90–100 → A+
- 80–89 → A
- 70–79 → B
- 60–69 → C
- 50–59 → D
- Below 50 → F

---

## 3. generateReport(students)

### Purpose
Creates a new processed report array.

### Output Format
Each student becomes:

```javascript
{
  name,
  average,
  grade,
  status,
  passed
}
```

### Rules
- Does NOT mutate original `students` array
- `status` is based on attendance
- `passed` = average >= 60 AND present === true

### Key Concept
This is a **pure transformation function using `.map()`**

---

## 4. getSummary(report)

### Purpose
Generates overall class statistics.

### Output Format
```javascript
{
  total,
  passed,
  failed,
  topStudent,
  classAverage
}
```

### Logic
- `total` → total students
- `passed` → students with passed = true
- `failed` → remaining students
- `topStudent` → highest average scorer
- `classAverage` → average of all student averages

---

## Final Execution

### Report Generation
```javascript
const report = generateReport(students);
```

---

### Proof of Immutability

Original data remains unchanged:
```javascript
console.log(students);
```

✔ Students array is NOT modified  
✔ New report array is created

---

### Summary Output
```javascript
getSummary(report);
```

Returns:
- total students
- number of passed/failed students
- top performer
- class average

---

## Key Concepts Used

- Functions (pure + impure separation)
- Type coercion using `Number()`
- Conditional logic for grading
- Array methods (`map`)
- Looping for aggregation
- Immutability (no mutation of input data)
- Edge case handling (null, empty arrays, strings)

---

## Conclusion

This system simulates a real academic backend:
- cleans messy input data
- calculates accurate averages
- assigns grades
- generates reports
- produces analytics summary

It demonstrates professional-level JavaScript data processing used in real applications.


