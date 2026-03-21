//6)Find the Character Is Vowel or Not in javascript.
// let str = "javascript";
// let count = 0;

// for (let i of str) {
//     if ("aeiouAEIOU".includes(i)) {
//         console.log(i);
//         count++;
//     }
// }

// console.log("Total vowels:", count);


let ch = prompt("Enter a character:").toLowerCase();

if (ch === 'a' || ch === 'e' || ch === 'i' || ch === 'o' || ch === 'u') {
  console.log("Vowel");
} else {
  console.log("Not a Vowel");
}