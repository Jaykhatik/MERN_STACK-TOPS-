//2)Convert a Person's Name in Abbreviated Form in javascript.
//Abbreviated form means the short way of writing code
let myName = prompt("Enter full name:");

let parts = myName.split(" ");
console.log(parts);
let result = "";

for (let i = 0; i < parts.length - 1; i++) {
  result += parts[i][0].toUpperCase() + ". ";
}

result += parts[parts.length - 1]; // last name add

document.writeln(result);