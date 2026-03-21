//8) Armstrong Number in in javascript Using For Loop & While Loop .
//definition :- A number where the sum of its digits raised to the power of total digits is equal to the number itself.

//Using While Loop:
// let num = Number(prompt("Enter a number:"));
// let temp = num;
// let sum = 0;

// while (temp > 0) {
//     let digit = temp % 10;
//     sum += digit * digit * digit;
//     temp = Math.floor(temp / 10);
// }

// if (sum === num) {
//     console.log("Armstrong Number");
// } else {
//     console.log("Not Armstrong Number");
// }


//for loop
let num1 = Number(prompt("Enter a number:"));
let sum1 = 0;

for (let temp1 = num1; temp1 > 0; temp1 = Math.floor(temp1 / 10)) {
    let digit1 = temp1 % 10;
    sum1 += digit1 * digit1 * digit1;
}

if (sum1 === num1) {
    console.log("Armstrong Number");
} else {
    console.log("Not Armstrong Number");
}