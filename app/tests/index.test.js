import { add } from '../utils/util';

describe('test utils/util.js', () => {
	test('test add', () => {
		expect(add(1, 2)).toBe(3);
		expect(add(10, 20)).toBe(30);
	});
});
