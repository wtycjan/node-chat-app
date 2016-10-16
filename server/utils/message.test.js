const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
	it('should genereate correct message object', () => {
		const from = 'Binh';
		const text = 'Some message';

		// Using ES6 destructuring
		const message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({ from, text });
	});
});