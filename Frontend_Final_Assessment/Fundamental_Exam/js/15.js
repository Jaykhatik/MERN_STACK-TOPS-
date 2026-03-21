//15)Program to Check Prime Number in javascript.
//A number that is divisible only by 1 and itself.
let num = Number(prompt("Enter a number:"));
let isPrime = true;

if (num <= 1) {
  isPrime = false;
} else {
  for (let i = 2; i <= num / 2; i++) {
    if (num % i === 0) {
      isPrime = false;
      break;
    }
  }
}

if (isPrime) {
  console.log("Prime Number");
} else {
  console.log("Not Prime Number");
}