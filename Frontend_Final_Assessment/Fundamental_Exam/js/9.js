//9)Sort an Array in Ascending And Descending Order in javascript.
let arr = [5, 2, 9, 1, 7];

let asc = [...arr].sort((a, b) => a - b);
let desc = [...arr].sort((a, b) => b - a);

console.log("Original:", arr);
console.log("Ascending:", asc);
console.log("Descending:", desc);