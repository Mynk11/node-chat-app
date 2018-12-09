const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
var app = express();

const publicPath = path.join(__dirname + '/../public');
var server = http.createServer(app);
var port = process.env.PORT || 3000;

var io = socketIO(server);
console.log("io is ::", Object.keys(io).length);

app.use(express.static(publicPath));



io.on('connection', (socket) => {

    console.log(`New user is connected`);

    /* socket.on('createEmail', (newEmail) => {
        console.log("Create email :", newEmail)
    }); */

    /*  socket.emit('newMessage', {
         from: "Mg@GT.com",
         text: "ty@ty.com",
         createdAt: new Date().getTime()

     }) */

    /* socket.emit('newEmail', {
        from: 'a@y.com',
        text: "What's up",
        createdAt: new Date().getTime()
    }); */

    socket.on('createMessage', (message) => {
        console.log("Create Message :", message)
        io.emit('newMessage', {
            from: message.text,
            text: message.text,
            createdAt: new Date().getTime()
        })

    });

    socket.on('disconnect', () => {
        console.log("User is disconnected from server");
    });


});
server.listen(port, () => {
    console.log(publicPath + '/index.html')


})