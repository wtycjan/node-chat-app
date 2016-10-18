[{
	id: 'a;lskdjf',
	name: 'Binh',
	room: 'CSGO'
}]


class Users {
	constructor() {
		this.users = [];
	}

	addUser(id, name, room) {
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}

	removeUser(id) {
		// return user that was removed
		var user = this.getUser(id);

		if (user) {
			this.users = this.users.filter((user) => user.id !== id);
		}

		return user;
	}

	getUser(id) {
		// Filter for specific user; only one user should be in this list
		return this.users.filter((user) => user.id === id)[0]
	}

	getUserList(room) {
		var users = this.users.filter((user) => user.room === room);
		var namesArray = users.map((user) => user.name);

		return namesArray;
	}
}

module.exports = {
	Users
}

// removeUser(id)
// getUser(id)
// getUserList(room)

// ES6 classes
// class Person {
// 	// Initialize the instance of the class
// 	constructor(name, age) {
// 		this.name = name;
// 		this.age = age;
// 	}

// 	getUserDescription() {
// 		return `${this.name} is ${this.age} year(s) old`;
// 	}
// }

// var me = new Person('Binh', 27);
// var description = me.getUserDescription();
// console.log(description);