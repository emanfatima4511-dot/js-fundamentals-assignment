// C1: E-Commerce Cart System (Bug Fix + Deep Copy + Immutability)

/*
TASK 1: Predict Output

console.log('Tab 1 cart items:', cartA.items.length);
// Output: 2
// Reason: cartA and cartB point to same object, so push affects both

console.log('Tab 1 total:', cartA.total);
// Output: 152500
// Reason: same reference, total updated via cartB

console.log('Original total:', originalCart.total);
// Output: 450
// Reason: applyPromo mutates originalCart directly
*/



// TASK 2: BUG IDENTIFICATION (COMMENTS)


// BUG 1: cartB is NOT a copy
// var cartB = cartA;
// Problem: both variables point to SAME memory reference (shallow copy issue)

// BUG 2: Nested object mutation risk
// cartB.items.push(...)
// Problem: items array is shared between cartA and cartB

// BUG 3: Direct mutation in function
// cart.total = cart.total - discount;
// Problem: function modifies original object instead of returning new one

// BUG 4: var usage
// Problem: var is function scoped and unsafe; should use const/let


// TASK 3: FIXED VERSION (IMMUTABLE + DEEP COPY)


const cartA = {
    owner: 'Asad',
    items: [{ name: 'Laptop', price: 150000 }],
    total: 150000
};

// Deep copy for independent cart
const cartB = {
    ...cartA,
    items: [...cartA.items.map(item => ({ ...item }))]
};

// Tab 2 user adds item safely
cartB.items.push({ name: 'Mouse', price: 2500 });
cartB.total = cartB.total + 2500;

console.log('Tab 1 cart items:', cartA.items.length); // 1
console.log('Tab 1 total:', cartA.total); // 150000


// FIXED applyPromo (NO mutation)
function applyPromo(cart, discount) {
    return {
        ...cart,
        total: cart.total - discount,
        promoApplied: true
    };
}

const originalCart = { owner: 'Sara', items: ['Book'], total: 500 };

const discountedCart = applyPromo(originalCart, 50);

console.log('Original total:', originalCart.total); // 500
console.log('Discounted total:', discountedCart.total); // 450


// TASK 4: addItem FUNCTION (PURE FUNCTION)


function addItem(cart, item) {
    const newItems = [...cart.items, item];

    const newTotal = newItems.reduce((sum, i) => sum + (i.price || 0), 0);

    return {
        ...cart,
        items: newItems,
        total: newTotal
    };
}

// Test proof of immutability
const testCart = {
    owner: "TestUser",
    items: [{ name: "Pen", price: 10 }],
    total: 10
};

console.log("Before:", testCart);

const updatedCart = addItem(testCart, { name: "Notebook", price: 50 });

console.log("After original:", testCart);     // unchanged
console.log("After updated:", updatedCart);   // updated cart