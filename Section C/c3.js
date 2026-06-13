
// C3: Student Grade Management System — Report Generator


const students = [
    { name: 'Asad', scores: [85, 90, 78, 92], present: true },
    { name: 'Sara', scores: [70, 65, '80', 75], present: true },
    { name: 'Ali', scores: [55, 60, 50, null], present: false },
    { name: 'Fatima', scores: [95, 98, 100, 92], present: true },
    { name: 'Umar', scores: [], present: true },
];

// 1. getAverage(scores) — PURE FUNCTION


function getAverage(scores) {
    let sum = 0;
    let count = 0;

    for (let i = 0; i < scores.length; i++) {
        const value = scores[i];

        if (value === null || value === undefined) continue;

        const num = Number(value);

        if (isNaN(num)) continue;

        sum += num;
        count++;
    }

    if (count === 0) return 0;

    return Number((sum / count).toFixed(1));
}


// 2. getGrade(average) — PURE FUNCTION


function getGrade(average) {
    if (average >= 90 && average <= 100) return "A+";
    if (average >= 80) return "A";
    if (average >= 70) return "B";
    if (average >= 60) return "C";
    if (average >= 50) return "D";
    return "F";
}


// 3. generateReport(students) — IMMUTABLE FUNCTION

function generateReport(students) {
    return students.map(student => {
        const average = getAverage(student.scores);
        const grade = getGrade(average);

        return {
            name: student.name,
            average,
            grade,
            status: student.present ? "present" : "absent",
            passed: average >= 60 && student.present
        };
    });
}


// 4. getSummary(report)


function getSummary(report) {
    let total = report.length;
    let passed = 0;
    let failed = 0;
    let topStudent = "";
    let highest = -Infinity;
    let sum = 0;

    for (let i = 0; i < report.length; i++) {
        const r = report[i];

        sum += r.average;

        if (r.passed) passed++;
        else failed++;

        if (r.average > highest) {
            highest = r.average;
            topStudent = r.name;
        }
    }

    return {
        total,
        passed,
        failed,
        topStudent,
        classAverage: Number((sum / total).toFixed(1))
    };
}

// RUN & PROVE IMMUTABILITY

const report = generateReport(students);

console.log("Generated Report:", report);

// Proof students is unchanged
console.log("Original Students:", students);

console.log("Summary:", getSummary(report));