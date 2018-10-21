'use strict';

function print(arr = [], separator = '-') {
    console.log(arr.join(separator));
}

print([1, 2, 3], ',');
print([1, 2, 3]);
print();

function printMessage(message, date = new Date()) {
    console.log(date.toDateString() + ' ' + message);
}

function exclude(arr, ...exclude) {
    return arr.filter(function (el) {
        return !exclude.includes(el);
    })
}

console.log(exclude([1, 2, 3], 1));
console.log(exclude([1, 2, 3], 1, 2));
console.log(exclude([1, 2, 3], 1, 2, 3));

const user = {
    name: 'Ivan',
    age: 18
};

function printUser(user = {}) {
    let {name = 'Anon', age:years = 'Unknown age'} = user;
    console.log(name, years);
}

printUser(user);
printUser({ name: 'Ivan' });
printUser({ age: 19 });
printUser({});
printUser();