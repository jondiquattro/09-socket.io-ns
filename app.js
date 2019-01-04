`use strict`;
const io = require('socket.io-client');

// const socket = io .connect('http://localhost:3000');
const letters = io.connect('http://localhost:3000/letters');
const numbers = io.connect('http://localhost:3000/numbers');

numbers.on('connect', ()=> {
    setInterval(() => {
        console.log('🏈');
        numbers.emit('next-number');
    }, 1000);
});

letters.on('connect', ()=> {
    setInterval(() => {
        console.log('🇺🇸');
        letters.emit('next-letter');
    }, 1000);
});



