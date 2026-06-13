function calculateDiscount(price, userType, isMember) {
    // 1. Validate price
    if (typeof price !== "number" || price <= 0) {
        return "Invalid price";
    }

    let finalPrice = price;

    // 2. Admin discount (50%)
    if (userType === "admin") {
        finalPrice = finalPrice * 0.5;
    }
    // 3. Price > 1000 → 20% off
    else if (finalPrice > 1000) {
        finalPrice = finalPrice * 0.8;
    }
    // 4. Price > 500 → 10% off
    else if (finalPrice > 500) {
        finalPrice = finalPrice * 0.9;
    }

    // 5. Member discount (additional 5%)
    if (isMember === true) {
        finalPrice = finalPrice * 0.95;
    }

    // 6. Minimum price rule
    if (finalPrice < 1) {
        finalPrice = 1;
    }

    // 7. Round to 2 decimal places
    return Number(finalPrice.toFixed(2));
}

// Test cases
console.log(calculateDiscount(1200, 'user', false)); // 960
console.log(calculateDiscount(1200, 'user', true));  // 912
console.log(calculateDiscount(600, 'admin', true));  // 270
console.log(calculateDiscount(-50, 'user', false));  // Invalid price
console.log(calculateDiscount('abc', 'user', false)); // Invalid price