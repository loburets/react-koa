'use strict';

const MAX_ANIMAL_ENERGY = 100;
const DEFAULT_CAT_ENERGY = 100;
const DEFAULT_DOG_ENERGY = 75;

class Animal {
    constructor(name, color) {
        this.energy = 0;
        this.name = name;
        this.color = color;
    }

    get nameAndColor() {
        return this.color + ' ' + this.name;
    }

    eat(energy) {
        this.energy += energy;
        if (this.energy > MAX_ANIMAL_ENERGY) {
            this.energy = MAX_ANIMAL_ENERGY;
        }
    }

    say(message = '') {
        console.log(message);
    }
}

class Cat extends Animal {
    constructor(name, color) {
        super(name, color);
        this.energy = DEFAULT_CAT_ENERGY;
    }

    say(message = '') {
        super.say('Meow ' +  message);
    }

    eat(energy) {
        super.eat(energy);
        if (this.energy < MAX_ANIMAL_ENERGY) {
            this.say('Not enough food')
        }
    }

    catchMouse() {
        const ENERGY_COST = 20;
        if (this.energy < ENERGY_COST) {
            this.say('Not enough energy to catch the mouse')
            return;
        }
        this.energy -= ENERGY_COST;
    }
}

class BritishShorthair extends Cat {
    catchMouse() {
        console.log(`${this.name} too good for it`);
    }
}

class Dog extends Animal {
    constructor(name, color) {
        super(name, color);
        this.energy = DEFAULT_DOG_ENERGY;
    }

    say(message = '') {
        super.say('Woof ' +  message);
    }

    eat(energy) {
        super.eat(energy);
        if (this.energy < MAX_ANIMAL_ENERGY) {
            this.say('Not enough food')
        }
    }

    guard() {
        const ENERGY_COST = 75;
        if (this.energy < ENERGY_COST) {
            this.say('Not enough energy to guard')
            return;
        }
        this.energy -= ENERGY_COST;
        this.say('You are guarded');
    }
}

class PitBull extends Dog {
    guard() {
        super.guard();
        this.say('As never before!');
    }
}

let cat = new Cat('Tom', 'Red');
console.log(cat.nameAndColor);
cat.catchMouse();
cat.catchMouse();
cat.catchMouse();
cat.catchMouse();
cat.catchMouse();
cat.catchMouse();
cat.eat(60);
cat.eat(40);

let britishCat = new BritishShorthair('British Tom', 'White');
britishCat.catchMouse();

let dog = new Dog('Jack', 'Black');
dog.eat(20);
dog.eat(20);
dog.guard();
dog.eat(75);

let pit = new PitBull('Angry Jack', 'Very black');
pit.guard();
