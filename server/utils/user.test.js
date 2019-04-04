const expect = require('expect');

const { User } = require('../utils/users');


describe("#Users", () => {
    it("Should check for add users", () => {
        var user = new User();
        var newUser = user.addUser("#3214", "May", "Airtel")
        console.log("User::", user.users[0].id);
        expect(newUser.id).toEqual(user.users[0].id);
    })
})