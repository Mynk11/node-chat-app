var expect = require('expect');
const { isString } = require('./validation');

describe("Checking for String", () => {
    it("it should return false", () => {
        var res = isString('        ')
        expect(res).toBe(false);
    })
    it("it should return false", () => {
        var res = isString(74520)
        expect(res).toBe(false);
    })
    it("it should return true", () => {
        var res = isString('Mayank');
        expect(res).toBe(true);
    })
})