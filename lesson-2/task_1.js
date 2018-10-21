'use strict';

const userData = ['Male', 'Ivan', 'Ivanov', 'Omsk', 'Russia', 19, 'Batman', 'Iron Man', 'Scrubs'];

let [, fistName, lastName, , , age = null, ...films] = userData;

console.log(fistName, lastName, age, films);