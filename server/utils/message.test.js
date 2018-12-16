var expect = require('expect');

var {
    generateMessage,
    generateLocationMessage
} = require('./message');
describe("generateMessage", () => {
    it("should generate correct message object", () => {
        var from = "john";
        var text = "i am john";
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({
            from,
            text
        })
    });
});

describe('generateLocationMessage', () => {
    it("should generate correct location object", () => {
        var from = "Admin";
        var latitude = 14;
        var lognitude = 15;
        var url = "https://www.google.com/maps?q=14,15";
        var message = generateLocationMessage(from, latitude, lognitude);
        expect(message.url).toBeA('string');
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            url
        })

    });
});