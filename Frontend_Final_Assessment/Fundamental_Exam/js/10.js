//10)Insert an Element at a Specific Position in an Array in javascript.

// let arr=[1,2,4];
// arr.splice(2,0,8)
// console.log(arr)

let arr = [10, 20, 30, 40];

let element = Number(prompt("Enter element:"));
let position = Number(prompt("Enter position (index):"));

arr.splice(position, 0, element);

console.log(arr);