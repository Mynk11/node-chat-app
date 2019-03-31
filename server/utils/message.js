const moment = require('moment');
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };

};

var generateLocationMessage = (from, latitude, lognitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${lognitude}`,
        createdAt: moment().valueOf()
    };
};
console.log("Moment", moment().valueOf());
module.exports = {
    generateMessage,
    generateLocationMessage
};