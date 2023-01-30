'use strict';

// task1-----------------------------------------------------------
// Task 1 - String sort
// Write a function that sorts string. Each word in the string will contain some digit.
// This number will mean the position that the word will take as a result. Numbers can be from 1 to 9. 1 will be the first word (not 0). If the tape is empty - return the empty tape. Words in the input stream will contain only valid values.
// Tests:
// sortString(‘g5et ski3lls on6 use1 your2 to4 7top’)
// Output: ‘use1 your2 ski3lls to4 g5et on6 7top’

// sortString(‘’)
// Output: ‘’

// sortString(‘practic3 h4rder yo1u 2hould’)
// Output: ‘yo1u 2hould practic3 h4rder’

const number = ['1','2','3','4','5','6','7','8','9','0']
// const str = '';
// const str = 'one1 to3 for2';
const str = 'practic3 h4rder yo1u 2hould';

function sortString(str) {
  if(!str) {
    return '';
  }

  return str
    .split(' ')
    .map(word => ({
      order: +word.split('').filter(el => number.includes(el)),
      word,
    }))
    .sort((el1, el2) => el1.order - el2.order)
    .map(el => el.word)
    .join(' ')
}

console.log('sortString:', sortString(str));