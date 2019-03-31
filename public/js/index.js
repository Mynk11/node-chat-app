var socket = io();
//socket.emit() emit event for single connection
//io.emit emit() event for all connection
//broadcasting event is use to share message with all user expect specific one
socket.on('connect', function () {
    console.log("Socket is connected");


    // socket.emit('createMessage', {
    //     from: "Frank",
    //     text: "Message Created"

    // }, function (data) {
    //     console.log("Got it " + data);
    // });

});





socket.on('newMessage', (message) => {
    var template = jQuery('#message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        time: formattedTime,

    });

    jQuery('#messages').append(html);

    // 
    // console.log("NewMessage", formattedTime);
    // var li = jQuery('<li></li>')
    // li.text(`${data.from} ${formattedTime} : ${data.text}`);
    // jQuery('#messages').append(li);
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
    //var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>'); //target=blank is used to open the url in new tab not on the existing tab
    // var a = jQuery('<a target="_blank">My Current Location</a>');
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // console.log('a is :', a);
    // li.append(a);
    // jQuery('#messages').append(li);

    var template = jQuery('#location-message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        from: message.from,
        text: message.url,
        time: formattedTime,

    });

    jQuery('#messages').append(html);

})