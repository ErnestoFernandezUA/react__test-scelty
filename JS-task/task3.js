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

console.log('biggerNumber:', biggerNumber(
  // 23
  // 624
  // 2018
  // 9
  // 111
  // 531
  12687261528
));
