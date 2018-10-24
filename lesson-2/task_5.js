'use strict';

const readline = require('readline');

function ask() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        rl.question('Enter some number ', (answer) => {
            if (!answer.match(/\d+/g)) {
                reject(`The ${answer} is not a number`);
            }
            resolve(answer);
            rl.close();
        });
    });
}

let answers = [];

ask()
    .then(result => {
        answers.push(result);
        return ask();
    })
    .then(result => {
        answers.push(result);
        return ask();
    })
    .then(result => {
        answers.push(result);
        return ask();
    })
    .then(result => {
        answers.push(result);
        return ask();
    })
    .then(result => {
        answers.push(result);
        let min = answers.sort((a,b) => b - a).pop();
        console.log(`Min value is ${min}`);
    })
    .catch(error => {
        console.log(error)
    });