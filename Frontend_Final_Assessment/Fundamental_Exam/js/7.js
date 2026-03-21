//7)Largest of Three Numbers in C Using Nested if Else in javascript.
let a = Number(prompt("Enter first number:"));
let b = Number(prompt("Enter second number:"));
let c = Number(prompt("Enter third number:"));

if (a > b) {
    if (a > c) {
        console.log("Largest number is: " + a);
    } else {
        console.log("Largest number is: " + c);
    }
} else {
    if (b > c) {
        console.log("Largest number is: " + b);
    } else {
        console.log("Largest number is: " + c);
    }
}


// let max;

// if (a > b && a > c) {
//   max = a;
// } else if (b > c) {
//   max = b;
// } else {
//   max = c;
// }

// console.log("Largest:", max);