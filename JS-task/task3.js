'use strict';

// task3-----------------------------------------------------------
// Task 3 - Next bigger number

// Function that accepts a positive number and returns it the next larger number formed from the same digits.

// Tests:
// biggerNumber(23) // 32;
// biggerNumber(624) // 642;
// biggerNumber(2018) // 8210;
// If there is no greater number, return -1
// biggerNumber(9) = -1;
// biggerNumber(111) = -1;
// biggerNumber(531) = -1;

// const num = 23;
// const num = 624;
// const num = 2018;
// const num = 9;
// const num = 111;
// const num = 531;
const num = 12687261528;

function biggerNumber(num) {
  console.log('start num', num);

  const a = +String(num)
  .split('')
  .sort((a, b) => Number(b) - Number(a))
  .join('')

  console.log('max num', a);

  if (a > num) {
    return a;
  }

  return -1;
}

console.log('Task 3 -----------------------------------');
console.log('biggerNumber()', biggerNumber(num));
