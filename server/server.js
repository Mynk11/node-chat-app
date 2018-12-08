const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
var app = express();

const publicPath = path.join(__dirname + '/../public');
var server = http.createServer(app);
var port = process.env.PORT || 3000;

var io = socketIO(server);
console.log("io is ::", io);

app.use(express.static(publicPath));
app.post('/index.html', () => {
    console.log(publicPath + '/index.html')
});


io.on('connection', (socket) => {

    console.log(`New user is connected`);


    socket.on('disconnect', () => {
        console.log("User is disconnected from server");
    })

});

server.listen(port, () => {
    console.log(publicPath + '/index.html')


})