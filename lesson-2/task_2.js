'use strict';

const userProfile = {
    gender: 'Male',
    firstName: 'Ivan',
    lastName: 'Ivanov',
    location: {
        city: 'Omsk',
        country: 'Russia'
    },
    age: 19,
    films: ['Batman', 'Iron Man', 'Scrubs']
};

let {firstName:name, lastName:secondName, age = null, films = [], location:{city:currentCity = 'Unknown City'}} = userProfile;

console.log(name, secondName, age, films, currentCity);