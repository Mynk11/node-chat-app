const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
var app = express();
const {
    generateMessage
} = require('./utils/message');
const publicPath = path.join(__dirname + '/../public');
var server = http.createServer(app);
var port = process.env.PORT || 3000;

var io = socketIO(server);
console.log("io is ::", Object.keys(io).length);

app.use(express.static(publicPath));



io.on('connection', (socket) => {
    console.log(`New user is connected`);
    /* io.emit('newMessage', {
                from: message.from,
                text: message.text,
                createdAt: new Date().getTime()
            }); */
    socket.on('createMessage', (message, callback) => {
        console.log("Create Message :", message)
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback("This is from the server");
    });

    socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app!!"));
    socket.broadcast.emit('newMessage', generateMessage("Admin", "New User joined!!"));

    socket.on('disconnect', () => {
        console.log("User is disconnected from server");
    });




});


server.listen(port, () => {
    console.log(publicPath + '/index.html');
});