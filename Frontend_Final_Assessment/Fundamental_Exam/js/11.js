//11) Program to Convert Lowercase to Uppercase And Vice Versa in javascript.
let str = prompt("Enter a string:");
let result = "";

for (let ch of str) {
  if (ch === ch.toUpperCase()) {
    result += ch.toLowerCase(); // Upper → Lower
  } else {
    result += ch.toUpperCase(); // Lower → Upper
  }
}

console.log("Converted String:", result);