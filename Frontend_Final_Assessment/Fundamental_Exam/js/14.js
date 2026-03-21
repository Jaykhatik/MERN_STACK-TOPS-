//14)Pyramid Pattern Using Star * in javascript.
let n = 5;

for (let i = 1; i <= n; i++) {
  let spaces = " ".repeat(n - i);     // spaces
  let stars = "*".repeat(2 * i - 1);  // stars
  console.log(spaces + stars);
}