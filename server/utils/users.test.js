const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Binh',
			room: 'Lakers Fans'
		},
		{
			id: '2',
			name: 'Kevin',
			room: 'Fad Diet'
		},
		{
			id: '3',
			name: 'Steph',
			room: 'Lakers Fans'
		}];
	});

	// Test case for addUser method
	it('should find user', () => {
		var userId = '2';
		var user = users.getUser(userId);

		expect(user.id).toBe(userId);
	});

	it('should NOT find user', () => {
		var userId = '99';
    var user = users.getUser(userId);

    expect(user).toNotExist();
	});

	// Test case for removeUser method
	it('should remove a user', () => {
		var userId = '1';
		var user = users.removeUser(userId);

		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});

	it('should NOT remove a user', () => {
		var userId = '99';
		var user = users.removeUser(userId);

		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});

	// Test case for getUserList method
	it('should return names for Lakers Fans', () => {
		var userList = users.getUserList('Lakers Fans');

		expect(userList).toEqual(['Binh', 'Steph']);
	});

	it('should return names for Fad Diet', () => {
		var userList = users.getUserList('Fad Diet');

		expect(userList).toEqual(['Kevin']);
	});

	it('should add new user', () => {
		var users = new Users();
		var user = {
			id: 123,
			name: 'Binh',
			room: 'Lakers Fans'
		};

		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});
});