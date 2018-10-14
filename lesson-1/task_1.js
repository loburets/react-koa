'use strict';

console.log('Hi! This app is a tic-tac-toe!');

var readlineSync = require('readline-sync');

var playerName = readlineSync.question('Please, print your name: ');


function Game() {
    this.isFinished = function(battleField) {
        return false;
    }
}

function BattleField() {
    var width = 3;
    var height = 3;
    var placedTicks = [];
    var placedToes = [];

    this.render = function () {
        var result = '';
        for (y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
                result += renderCoordinate(x, y);
            }
            result += '\n';
        }
        return result;
    };

    this.addFieldUnit = function(fieldUnit) {
        if (fieldUnit.constructor.name === 'Tick') {
            placedTicks.push(fieldUnit);
        }
        if (fieldUnit.constructor.name === 'Toe') {
            placedToes.push(fieldUnit);
        }
    };

    function getFieldUnit(x, y) {
        var result = null;

        placedTicks.forEach(function(placedTick) {
            if (placedTick.hasCoordinate(x, y)) {
                result = placedTick;
            }
        });

        placedToes.forEach(function(placedToe) {
            if (placedToe.hasCoordinate(x, y)) {
                result = placedTick;
            }
        });

        return result;
    }

    function renderCoordinate(x, y) {
        var fieldUnit = getFieldUnit(x, y);

        if (fieldUnit === null) {
            return '.';
        }

        if (fieldUnit.constructor.name === 'Tick') {
            return 'X';
        }
        if (fieldUnit.constructor.name === 'Toe') {
            return '0';
        }

        return '.';
    }
}

function Player() {
    var name;
    this.getName = function () {
        return name;
    }
    this.setName = function (nameArg) {
        name = nameArg;
    }
}
function AIPlayer() {}
AIPlayer.prototype = Object.create(Player.prototype);

function FieldUnit(x, y) {
    this.x = x;
    this.y = y;

    this.hasCoordinate = function (x, y) {
        return this.x == x && this.y == y;
    }
}

function Tick() {
    // used instead of prototype to save constructor name
    FieldUnit.apply(this, arguments);
}

function Toe() {
    // used instead of prototype to save constructor name
    FieldUnit.apply(this, arguments);
}

var game = new Game();
var battleField = new BattleField();
var player = new Player();
player.setName(playerName);
console.log('You name is: ', player.getName());
var AIplayer = new AIPlayer();

while (!game.isFinished(battleField)) {
    var x = readlineSync.question('Please, print X coordinate: ');
    var y = readlineSync.question('Please, print Y coordinate: ');
    var tick = new Tick(x, y);
    battleField.addFieldUnit(tick);
    var output = battleField.render();
    console.log(output);
}