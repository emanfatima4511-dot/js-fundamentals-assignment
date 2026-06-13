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

// Tests
console.log(typeAnalyser(42));
console.log(typeAnalyser('hello'));
console.log(typeAnalyser(null));
console.log(typeAnalyser([]));
console.log(typeAnalyser(undefined));
console.log(typeAnalyser(true));
console.log(typeAnalyser(0));
console.log(typeAnalyser(''));