'use strict';

console.log('Hi! This app is a tic-tac-toe!');

var readlineSync = require('readline-sync');

var playerName = readlineSync.question('Please, print your name: ');

function Game() {
    this.isFinished = function(battleField) {
        if (!battleField.isCompletelyFilled()) {
            return false;
        }

        console.log('The game is finished');

        return true;
    }
}

function BattleField() {
    var width = 3;
    var height = 3;
    var placedTicks = [];
    var placedToes = [];
    var that = this;

    this.render = function () {
        var result = '';
        for (var y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
                result += renderCoordinate(x, y);
            }
            result += '\n';
        }
        return result;
    };

    this.addFieldUnit = function(fieldUnit) {
        if (this.getFieldUnit(fieldUnit.x, fieldUnit.y) !== null) {
            throw new CellIsNotEmptyError(x, y);
        }
        if (fieldUnit.x >= width || fieldUnit.y >= height) {
            throw new CellOutOfRangeError(x, y);
        }
        this.placeFieldUnit(fieldUnit);
    };

    this.placeFieldUnit = function(fieldUnit) {
        if (fieldUnit.name === 'Tick') {
            placedTicks.push(fieldUnit);
        }
        if (fieldUnit.name === 'Toe') {
            placedToes.push(fieldUnit);
        }
    };

    this.getRandomFreeCoordinates = function () {
        do {
            var x = Math.floor(Math.random() * (width));
            var y = Math.floor(Math.random() * (height));
        } while (that.getFieldUnit(x,y) !== null);

        return [x, y];
    };

    this.getFieldUnit = function(x, y) {
        var result = null;

        placedTicks.every(function(placedTick) {
            if (placedTick.hasCoordinate(x, y)) {
                result = placedTick;
                return false;
            }
            return true;
        });

        if (result !== null) {
            return result;
        }

        placedToes.every(function(placedToe) {
            if (placedToe.hasCoordinate(x, y)) {
                result = placedToe;
                return false;
            }
            return true;
        });

        return result;
    };

    this.isCompletelyFilled = function () {
        for (y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
                if (that.getFieldUnit(x,y) === null) {
                    return false;
                }
            }
        }
        return true;
    };

    function renderCoordinate(x, y) {
        var fieldUnit = that.getFieldUnit(x, y);

        if (fieldUnit === null) {
            return ' . ';
        }

        if (fieldUnit.name === 'Tick') {
            return ' X ' ;
        }
        if (fieldUnit.name === 'Toe') {
            return ' 0 ';
        }

        return ' . ';
    }
}

function Player() {
    var name;
    this.getName = function () {
        return name;
    };
    this.setName = function (nameArg) {
        name = nameArg;
    };

    this.makeMove = function (x, y, battleField) {
        var tick = new Tick(x, y);
        battleField.addFieldUnit(tick);
    }
}
function AIPlayer() {
    this.makeMove = function (x, y, battleField) {
        var coordinates = battleField.getRandomFreeCoordinates();
        var tick = new Toe(coordinates[0], coordinates[1]);
        battleField.placeFieldUnit(tick);
    }
}
AIPlayer.prototype = Object.create(Player.prototype);

function FieldUnit(x, y) {
    this.x = x;
    this.y = y;
}

FieldUnit.prototype.hasCoordinate = function (x, y) {
    return this.x == x && this.y == y;
};

function Tick(x, y) {
    FieldUnit.call(this, x,y);
    this.name = 'Tick';
}
Tick.prototype = Object.create(FieldUnit.prototype);

function Toe(x, y) {
    FieldUnit.call(this, x,y);
    this.name = 'Toe';
}
Toe.prototype = Object.create(FieldUnit.prototype);

function CellIsNotEmptyError(x, y) {
    this.message = 'Cannot set value for cell ' + x + ' ' + y + '. Cell is not empty.';
}
CellIsNotEmptyError.prototype = Object.create(Error.prototype);

function CellOutOfRangeError(x, y) {
    this.message = 'Cannot set value for cell ' + x + ' ' + y + '. Cell is out of the field range.';
}
CellOutOfRangeError.prototype = Object.create(Error.prototype);

var game = new Game();
var battleField = new BattleField();
var player = new Player();
player.setName(playerName);
console.log('You name is: ', player.getName());
var aIplayer = new AIPlayer('AI');

while (!game.isFinished(battleField)) {
    try {
        var x = readlineSync.question('Please, print X coordinate: ');
        var y = readlineSync.question('Please, print Y coordinate: ');
        player.makeMove(x, y, battleField);
        if (game.isFinished(battleField)) {
            break;
        }
        aIplayer.makeMove(x, y, battleField);
        var output = battleField.render();
        console.log(output);
    } catch (e) {
        console.log(e.message);
    }
}