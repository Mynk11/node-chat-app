class User {
    constructor() {
        this.users = [];

    }

    addUser(id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        //return removed user
    }

    getUser(id) {

    }
    getUserList(room) {
        //return a list of person in particular room
        var users = this.users.filter((user) => { return user.room == room });
        var nameArray = users.map((user) => user.name);
        console.log("Name Array is:", nameArray);
        return nameArray;
    }
}


module.exports = { User };