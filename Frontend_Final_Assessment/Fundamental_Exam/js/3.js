//3)Calculate a Simple Interest in javascript.
let P = Number(prompt("Enter Principal amount:"));
let R = Number(prompt("Enter Rate of interest:"));
let T = Number(prompt("Enter Time (in years):"));

let SI = (P * R * T) / 100;

document.writeln("Simple Interest is: " + SI);