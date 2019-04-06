const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const { User } = require('./utils/users');
var app = express();
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message');
const { isString } = require('./utils/validation');
const publicPath = path.join(__dirname + '/../public');
var server = http.createServer(app);
var port = process.env.PORT || 3000;
const user = new User();
var io = socketIO(server);
//console.log("io is ::", Object.keys(io).length);

app.use(express.static(publicPath));



io.on('connection', (socket) => {


    socket.on('join', (params, callback) => {
        if (!isString(params.name) || !isString(params.room)) {
            return callback("Name and Room are required.");
        } else {
            socket.join(params.room);
            //user.removeUser(socket.id);//it empties the user Array
            user.addUser(params.id, params.name, params.room);
            socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app!!"));
            socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `${params.name} has joined`));
            callback();
        }

        //Targeting rooms
        //socket.leave(params.name);
        //io.emit=>to broadcast a message for all(io.to("emittfr").emit)
        //socket.broadcast.emit=>except current user socket.broadcast.to("Office room").emit
        //socket.emit =>for specific user socket.to("Mayank").emit

        socket.on('createMessage', (message, callback) => {
            // console.log("Create Message :", message)
            socket.to(params.room).emit('newMessage', generateMessage(params.name, message.text));
            callback("This is from the server");
        });

        io.to(params.room).emit("updateUserList", user.getUserList(params.room));

        socket.on('createLocatioMessage', (coords) => {
            socket.to(params.room).emit('newLocationMessage', generateLocationMessage(params.name, coords.latitude, coords.longnitude));
        });
    });


    console.log(`New user is connected`);
    /* io.emit('newMessage', {
                from: message.from,
                text: message.text,
                createdAt: new Date().getTime()
            }); */




    socket.on('disconnect', () => {
        // console.log("User is disconnected from server");
        var user1 = user.removeUser(socket.id);
        console.log("User 1", user1[0].room);
        if (user1) {
            io.to(user1[0].room).emit('newMessage', generateMessage('Admin', `${user1[0].name} has left`));
            io.to(user1[0].room).emit('updateUserList', user.getUserList(user1[0].room))
        }

    });






});


server.listen(port, () => {
    //console.log(publicPath + '/index.html');
});