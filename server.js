'use strict';

const io = require('socket.io')(3000);

const lettersArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
let count = 0;

// namespace
const numbers = io.of('/numbers');
const letters = io.of('/letters');

// for numbers connection
numbers.on('connection',(socket)=>{
     // connects to room inside of numbers
     socket.on('join', (room, cb)=>{
        socket.join(room);
        cb && cb(`joined ${room}`);
    });

    console.log('connected to numbers', socket.id);
    socket.on('next-number', ()=>{
        socket.broadcast.emit('number', count);
        socket.to('negative').broadcast.emit('_number', -count);
        count++
    });
});

letters.on('connection',(socket)=>{
    // connects to room inside of numbers
    socket.on('join', (room, cb)=>{
       socket.join(room);
       cb && cb(`joined ${room}`);
   });

   console.log('connected to letters', socket.id);
   socket.on('next-letter', ()=>{
       socket.broadcast.emit('letter', lettersArr[Math.floor(Math.random() * 22)].toUpperCase());
       socket.in('lowercase').broadcast.emit('_letter', lettersArr[Math.floor(Math.random() * 22)]);
       count++
   });
});



