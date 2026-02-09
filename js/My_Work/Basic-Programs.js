//p-1:Print “Hello World”
console.log("Hello World!!!")

//p-2 : Check Data Type

function checkDatatype(value) {
    return typeof value;
}
console.log(checkDatatype(21));//check type of datatype in js using function
console.log(typeof ("jay"));//check type of datatype in js using inbuilt method direct

/*p-3 : Even or Odd*/

//1


function evenOdd(num) {
    if (num % 2 === 0) {
        return "even";
    }
    else {
        return "odd";
    }
}
console.log(evenOdd(22));


//2
let arr = [10, 3, 20, 30, 33]
let result = arr.map(a => a % 2 === 0 ? "even" : "odd");
console.log(result)

//3
let arr2 = [1, 2, 30];

arr2.forEach(num => {
    console.log(num, num % 2 === 0 ? "Even" : "Odd");
});
//4
let arr3 = [10, 20, 3];

let result1 = arr3.map(num => ({
    value: num,
    type: ["Even", "Odd"][num % 2]
}));

console.log(result1);

//5 : Split Array into Even & Odd Arrays
let arr4 = [10, 21, 30, 45];

let even = [];
let odd = [];

arr4.forEach(num => {
    [even, odd][num % 2].push(num);
});

console.log("Even:", even);
console.log("Odd:", odd);



/*
p-4 : Largest of 3 Numbers
*/

//1
function largeNum(a, b, c) {
    let max = a;
    if (b > max) {
        max = b;
    }
    if (c > max) {
        max = c;
    }
    return max;
}
console.log(largeNum(10, 299, 3));

//2
function largeNum2(a, b, c) {
    return Math.max(a, b, c);
}

console.log(largeNum2(1, 20, 3));


/*
p-5 : Swap Two Numbers
*/

//1
let x = 5;
let y = 10;
console.log("Before Swap", x, y);

let temp = x;
x = y;
y = temp;
console.log("After Swap", x, y);

//2
let a = 50;
let b = 100;

a = a + b; // 15
b = a - b; // 5
a = a - b; // 10

console.log(a, b);

//3
let a1 = 10;
let b1 = 20;

[a1, b1] = [b1, a1];

console.log(a1, b1);


/*
p-6 : Reverse a Number
*/

//1
function reverseNumber(numrev) {
  let reversed = 0;

  while (numrev > 0) {
    reversed = reversed * 10 + (numrev % 10);
    numrev = Math.floor(numrev / 10);
  }

  return reversed;
}

console.log(reverseNumber(1234));

//2
function reverseNumber(num) {
    return Number(num.toString().split('').reverse().join(''));
}

console.log(reverseNumber(1203)); // 3021



/*
p-7 : Reverse a String
*/

//1
function reverseString(str) {
  let result = "";

  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }

  return result;
}

console.log(reverseString("AKSHAY"));

//2
function revString(str){
    return String(str.toString().split('').reverse().join(''));
}
console.log(revString("khatik jay vasantbhai"));


/*
p-8 : Palindrome Check
*/

//1
function isPalindrome(str) {
  let reversed = str.split("").reverse().join("");
  return str === reversed;
}

console.log(isPalindrome("madams"));

//2
function isPalindrome(str) {
  let start = 0;
  let end = str.length - 1;

  while (start < end) {
    if (str[start] !== str[end]) {
      return false;
    }
    start++;
    end--;
  }
  return true;
}

console.log(isPalindrome("level")); // true

//3
function isPalindrome(str) {
  let len = str.length;

  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }
  return true;
}

console.log(isPalindrome("madam")); // true


/*
p-9 : Count Vowels
*/

function countVowels(str) {
  let count = 0;
  let vowels = "aeiouAEIOU";

  for (let char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

console.log(countVowels("JavaScript"));

/*
p-10 : Factorial
*/
function factorial(n) {
  let result = 1;

  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorial(5));

/*
p-11 : Fibonacci Series
*/

function fibonacci(n) {
  let a = 0, b = 1;

  for (let i = 1; i <= n; i++) {
    console.log(a);
    let temp = a + b;
    a = b;
    b = temp;
  }
}

fibonacci(5);


/*
p-12: Multiplication Table
*/

function table(num) {
  for (let i = 1; i <= 10; i++) {
    console.log(num + " x " + i + " = " + num * i);
  }
}

table(5);

/*
p-13 : Sum of Array
*/

    function sumArray(arr) {
  let sum = 0;

  for (let num of arr) {
    sum += num;
  }

  return sum;
}

console.log(sumArray([1, 2, 3, 4]));

/*
p-14 : Find Duplicates
*/

function findDuplicates(arr) {
  let duplicates = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) !== i && !duplicates.includes(arr[i])) {
      duplicates.push(arr[i]);
    }
  }
  return duplicates;
}

console.log(findDuplicates([1, 2, 3, 2, 4, 1]));
