// B4: FIXED CODE (Pass-by-Reference + Shallow Copy Bugs)

// -------------------------
// Bug 1: Cart duplication fix
// -------------------------
const cart1 = { items: ['JS Book', 'React Book'], total: 150 };

const cart2 = {
    ...cart1,
    items: [...cart1.items] // deep copy of array
};

cart2.items.push('Node Book');

console.log("Cart1:", cart1.items);
console.log("Cart2:", cart2.items);


// -------------------------
// Bug 2: Function mutation fix
// -------------------------
function applyTax(order) {
    return {
        ...order,
        total: order.total * 1.17
    };
}

const myOrder = { id: 1, total: 100 };
const taxedOrder = applyTax(myOrder);

console.log("Original Order:", myOrder.total);
console.log("Taxed Order:", taxedOrder.total);


// -------------------------
// Bug 3: Config reset fix
// -------------------------
const defaultConfig = {
    theme: 'dark',
    lang: 'en',
    nested: { fontSize: 14 }
};

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

console.log("Theme:", appConfig.theme);
console.log("Font Size:", appConfig.nested.fontSize);