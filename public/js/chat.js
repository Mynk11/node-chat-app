var socket = io();
//socket.emit() emit event for single connection
//io.emit emit() event for all connection
//broadcasting event is use to share message with all user expect specific one
socket.on('connect', function () {
    console.log("Socket is connected");
    let param = jQuery.deparam(window.location.search);
    socket.emit('join', param, function (err) {

        if (err) {
            console.log(`Param is ${param} & Error is ${err}`);
            alert(err);
            window.location.href = "/";
        } else {
            console.log(`Param is ${param} & NO Error`);
        }


    });

});




function scrollToBottom() {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}




socket.on('newMessage', (message) => {
    var template = jQuery('#message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        time: formattedTime,

    });

    jQuery('#messages').append(html);
    //scrollToBottom();
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

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {

    if (!navigator.geolocation) {
        return alert("Your browser Doesn't support geolocation.");

    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocatioMessage', {
            user: this.user,
            latitude: position.coords.latitude,
            longnitude: position.coords.longitude
        })
        //console.log("Position ::", Geoposition);
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        return alert('Unable to fetch location.');
    })


});

socket.on('newLocationMessage', function (message) {

    var template = jQuery('#location-message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        from: message.from,
        text: message.url,
        time: formattedTime,

    });

    jQuery('#messages').append(html);
    //scrollToBottom();

})

socket.on('updateUserList', function (users) {
    console.log(`Users list is:`, users);
    var ol = jQuery('<ol></ol>');
    users.forEach((user) => {
        var li = jQuery('<li></li>').text(user)
        ol.append(li);
    });
    jQuery('#users').append(ol);//or can use .html(ol)

})