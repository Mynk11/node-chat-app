var socket = io();
//socket.emit() emit event for single connection
//io.emit emit() event for all connection
//broadcasting event is use to share message with all user expect specific one
socket.on('connect', function () {
    console.log("Socket is connected");


    /* socket.emit('createMessage', {
        from: "W@z.com",
        text: "Message Created!!"

    }); */

});





socket.on('newMessage', (data) => {
    console.log(data);
});


socket.on('disconnect', function () {
    console.log("User is disconnected");
})