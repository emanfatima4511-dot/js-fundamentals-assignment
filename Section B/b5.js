// B5: Pure Function Library (Immutability + No Mutation)
// 1. addToCart(cart, item)
// Returns NEW array, original unchanged
function addToCart(cart, item) {
    return [...cart, item];
}

// Test
const cart = ["JS Book", "React Book"];
const newCart = addToCart(cart, "Node Book");
console.log(cart);     // ["JS Book", "React Book"]
console.log(newCart);  // ["JS Book", "React Book", "Node Book"]


// 2. updateUserAge(user, newAge)
// Returns NEW object, original unchanged
function updateUserAge(user, newAge) {
    return {
        ...user,
        age: newAge
    };
}

// Test
const user = { name: "Ali", age: 20 };
const updatedUser = updateUserAge(user, 25);
console.log(user);         // { name: "Ali", age: 20 }
console.log(updatedUser);  // { name: "Ali", age: 25 }


// 3. incrementScore(scores, playerName)
// Returns NEW object with updated score
function incrementScore(scores, playerName) {
    return {
        ...scores,
        [playerName]: (scores[playerName] || 0) + 1
    };
}

// Test
const scores = { Ali: 5, Ahmed: 3 };
const newScores = incrementScore(scores, "Ali");
console.log(scores);     // { Ali: 5, Ahmed: 3 }
console.log(newScores);  // { Ali: 6, Ahmed: 3 }


// 4. reverseString(str)
// Strings are immutable, so original is never changed
function reverseString(str) {
    return str.split("").reverse().join("");
}

// Test
const text = "hello";
const reversed = reverseString(text);
console.log(text);     // "hello"
console.log(reversed);  // "olleh"


// 5. removeItem(arr, index)
// Returns NEW array without mutating original
function removeItem(arr, index) {
    return arr.filter((_, i) => i !== index);
}

// Test
const arr = [10, 20, 30, 40];
const newArr = removeItem(arr, 2);

console.log(arr);     // [10, 20, 30, 40]
console.log(newArr);  // [10, 20, 40]