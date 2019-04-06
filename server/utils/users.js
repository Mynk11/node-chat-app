class User {
    constructor() {
        this.users = [];

    }

    addUser(id, name, room) {
        id = name + room;
        var user = { id, name, room };
        //console.log("Added user is ", this.users);
        var mike = this.users.push(user);
        //console.log("Added users is", mike);
        return user;
    }
    removeUser(id) {
        //console.log("passed id is ", id, this.users);
        var index = this.users.map((user, index) => {
            if (user.id == id) {
                return index;
            }
        })
        //console.log("Users Array ", this.users);

        return this.users.splice(index, 1);
    }

    getUser(name) {
        var user = this.users.filter((user) => { return user.name == name });

        return user[0].id;
    }
    getUserList(room) {
        //return a list of person in particular room
        //console.log("Params is :", room);
        // console.log("Users is", this.users);
        var users = this.users.filter((user) => { return user.room == room });
        //console.log("Users is:: ", users);
        var nameArray = users.map((user) => {
            return user.name
        });
        //console.log("Name Array is:", nameArray);
        return nameArray;
    }
}


module.exports = { User };