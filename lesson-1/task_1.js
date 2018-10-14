'use strict';

console.log('Hi! This app is a tic-tac-toe!');

var readlineSync = require('readline-sync');

var playerName = readlineSync.question('Please, print your name: ');
console.log('You name is: ', playerName);

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
    var row;

    this.render = function () {
        for (y = 0; y < height; y++) {
            row = '';
            for (x = 0; x < width; x++) {
                row += renderCoordinate(x, y);
            }
            console.log(row);
        }
    };

    function renderCoordinate(x, y) {
        return '.';
    }
}

function Player() {

}

function AIPlayer() {
    Player.apply(this, arguments);
}

function FieldUnit() {

}

function Tick() {
    FieldUnit.apply(this, arguments);
}

function Toe() {
    FieldUnit.apply(this, arguments);
}

var game = new Game();
var battleField = new BattleField();
var player = new Player();
var AIplayer = new AIPlayer();

while (!game.isFinished(battleField)) {
    var x = readlineSync.question('Please, print X coordinate: ');
    var y = readlineSync.question('Please, print Y coordinate: ');
    battleField.render();
}