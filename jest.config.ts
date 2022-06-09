/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'~/(.*)': '<rootDir>/src/$1',
	},
	setupFilesAfterEnv: ['jest-extended/all'],
	testTimeout: 30000,
	testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
	coveragePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
	collectCoverage: true,
};
