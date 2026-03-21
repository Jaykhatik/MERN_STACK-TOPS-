//4)Find Percentage of 5 Subjects in javascript.
let s1 = Number(prompt("Enter marks of Subject 1:"));
let s2 = Number(prompt("Enter marks of Subject 2:"));
let s3 = Number(prompt("Enter marks of Subject 3:"));
let s4 = Number(prompt("Enter marks of Subject 4:"));
let s5 = Number(prompt("Enter marks of Subject 5:"));

let total = s1 + s2 + s3 + s4 + s5;

let percentage = (total / 500) * 100; // assuming each subject is out of 100

console.log("Total Marks: " + total);
console.log("Percentage: " + percentage + "%");