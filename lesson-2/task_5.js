'use strict';

const readline = require('readline');

function ask(minValue = null) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        rl.question('Enter some number ', (answer) => {
            if (answer.length === 0) {
                reject('Empty input');
            }
            if (!answer.match(/\d+/g)) {
                reject(`The ${answer} is not a number`);
            }
            if (minValue !== null) {
                resolve(Math.min(answer, minValue));
            } else {
                resolve(answer);
            }
            rl.close();
        });
    });
}

ask()
    .then(result => {
        return ask(result);
    })
    .then(result => {
        return ask(result);
    })
    .then(result => {
        return ask(result);
    })
    .then(result => {
        return ask(result);
    })
    .then(result => {
        console.log(`Min value is ${result}`);
    })
    .catch(error => {
        console.log(error)
    });