import 'jest-extended';
import { isValidHttpUrl } from '../validateURL';

describe('isValidHttpUrl', () => {
	it('should return true for a valid http URL', () => {
		const url = 'http://www.example.com';
		const result = isValidHttpUrl(url);

		expect(result).toBeTrue();
	});

	it('should return false for a invalid http URL', () => {
		const url = 'www.example.com';
		const result = isValidHttpUrl(url);

		expect(result).toBeFalse();
	});
});
