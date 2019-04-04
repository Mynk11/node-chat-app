const expect = require('expect');

const { User } = require('../utils/users');


describe("#Users", () => {
    beforeEach(() => {
        var user = new User();
        user.users = [{
            id: '1',
            name: 'Mike',
            room: 'node',
        }, {
            id: '1',
            name: 'jin',
            room: 'React',
        }, {
            id: '1',
            name: 'Jack',
            room: 'node',
        }];
        console.log("Before Each", user);
    })
    it("Should check for add users", () => {
        var user = new User();
        var newUser = user.addUser("#3214", "May", "Airtel")
        console.log("User::", user.users[0].id);
        expect(newUser.id).toEqual(user.users[0].id);
    });

    it("Should return list of users", () => {
        console.log("Before Each from getuser list", user);
        var name = user.getUserList('node');
        console.log("name:", name);
        expect(name).toInclude(['Jack']);

    });
})