var socket = io();
//socket.emit() emit event for single connection
//io.emit emit() event for all connection
//broadcasting event is use to share message with all user expect specific one
socket.on('connect', function () {
    console.log("Socket is connected");


    socket.emit('createMessage', {
        from: "Frank",
        text: "Message Created"

    }, function (data) {
        console.log("Got it " + data);
    });

});





socket.on('newMessage', (data) => {
    console.log(data);
    var li = jQuery('<li></li>')
    li.text(`${data.from} : ${data.text}`);
    jQuery('#messages').append(li);
});


socket.on('disconnect', function () {
    console.log("User is disconnected");
})


jQuery('#message-form').on('submit', function (e) {
    console.log("e.preventDefault is:" + e.preventDefault(), e);
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name="message"]').val()
    }, function () {
        console.log("Message is send");
    });
});