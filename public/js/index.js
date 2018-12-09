var socket = io();

socket.on('connect', function () {
    console.log("Socket is connected");
    /*  socket.emit('createEmail', {
         from: "W@z.com",
         text: "Email Created!!"

     }); */

    socket.emit('createMessage', {
        from: "W@z.com",
        text: "Message Created!!",
        //createdAt: new Date().getTime()

    });

});

socket.on('newMessage', (data) => {
    console.log("New Message", data);
});



socket.on('newEmail', function (email) {
    console.log(`New Email is Created :`, email);
    //console.log("Nodemon working as expected");
});

socket.on('disconnect', function () {
    console.log("User is disconnected");
})