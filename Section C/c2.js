

// C2: User Registration System — Validation Engine


function validateUser(data) {
    const errors = [];

    const {
        name,
        email,
        age,
        password,
        role
    } = data;

    // -------------------------
    // NAME VALIDATION
    // -------------------------
    if (typeof name !== "string" || name.trim() === "") {
        errors.push("Name must be a non-empty string");
    }

    // -------------------------
    // EMAIL VALIDATION
    // -------------------------
    if (typeof email !== "string" || !email.includes("@") || !email.includes(".")) {
        errors.push("Email must be a valid email address");
    }

    // -------------------------
    // AGE VALIDATION (coercion required)
    // -------------------------
    const numericAge = Number(age);

    if (age === "" || age === null || age === undefined) {
        errors.push("Age is required");
    }
    else if (isNaN(numericAge) || age.toString().match(/[a-zA-Z]/)) {
        errors.push("Age must be a valid number");
    }
    else if (numericAge < 13 || numericAge > 120) {
        errors.push("Age must be between 13 and 120");
    }

    // -------------------------
    // PASSWORD VALIDATION
    // -------------------------
    if (typeof password !== "string" || password.length < 8) {
        errors.push("Password must be at least 8 characters long");
    }

    // -------------------------
    // ROLE VALIDATION (default = user)
    // -------------------------
    const validRoles = ["admin", "editor", "user"];
    const finalRole = role ?? "user";

    if (!validRoles.includes(finalRole)) {
        errors.push("Role must be admin, editor, or user");
    }

    // -------------------------
    // FINAL RESPONSE
    // -------------------------
    if (errors.length > 0) {
        return {
            valid: false,
            errors
        };
    }

    return {
        valid: true,
        user: {
            name: name.trim(),
            email: email.trim(),
            age: Number(age),
            password,
            role: finalRole
        }
    };
}

// TEST CASES

console.log(validateUser({
    name: 'Ali',
    email: 'ali@test.com',
    age: '25',
    password: 'pass1234'
}));

console.log(validateUser({
    name: '',
    email: 'notanemail',
    age: 10,
    password: 'abc'
}));

console.log(validateUser({
    name: 'Sara',
    email: 'sara@x.io',
    age: 30,
    password: 'secure99',
    role: 'admin'
}));

console.log(validateUser({
    name: 'X',
    email: 'x@x.com',
    age: '17abc',
    password: 'hello123'
}));