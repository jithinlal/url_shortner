import request from 'supertest';
import 'jest-extended';
import { main, getServer } from '../../app';
import { Server } from 'http';

let server: Server;
let url = '/api/1.0/test';

beforeAll(async () => {
	await main();
	server = getServer();
});

afterAll(async () => {
	server.close();
});
/**
 * Testing here is done by calling the API,
 * but this can obviosly be testing without
 * hitting the database by mocking the db call
 */
describe('POST /encode', () => {
	it('should return an encoded url', async () => {
		try {
			const shortUrlBase = process.env.SHORT_URL_BASE;
			const { error, body } = await request(server)
				.post(`${url}/url/encode`)
				.send({
					url: 'https://www.google.com',
				})
				.expect(201);

			if (error) {
				throw error;
			}

			expect(body).toBeObject();
			expect(body).toHaveProperty('url');
			expect(body.url).toBeString();
			expect(body.url).toContain(shortUrlBase);
		} catch (error) {
			console.log({ error });
			throw error;
		}
	});

	it('should return an error message if url is not valid', async () => {
		try {
			const { error } = await request(server)
				.post(`${url}/url/encode`)
				.send({
					url: 'www.example.com',
				})
				.expect(400);

			expect((error as any).text).toContain(
				'Please refer https://www.rfc-editor.org/rfc/rfc3986'
			);
		} catch (error) {
			console.log({ error });
			throw error;
		}
	});
});

describe('POST /decode', () => {
	let refUrl = 'https://www.google.com';
	let shortenedUrl: string;
	beforeEach(async () => {
		const { body } = await request(server).post(`${url}/url/encode`).send({
			url: refUrl,
		});

		shortenedUrl = body.url;
	});

	it('should return a decoded url', async () => {
		try {
			const { error, body } = await request(server)
				.post(`${url}/url/decode`)
				.send({
					url: shortenedUrl,
				})
				.expect(200);

			if (error) {
				throw error;
			}

			expect(body).toBeObject();
			expect(body).toHaveProperty('url');
			expect(body.url).toBeString();
			expect(body.url).toEqual(refUrl);
		} catch (error) {
			console.log({ error });
			throw error;
		}
	});

	it('should return an error message if shortened url is not stored before', async () => {
		try {
			const { error } = await request(server)
				.post(`${url}/url/decode`)
				.send({
					url: 'www.example.com',
				})
				.expect(404);

			expect((error as any).text).toContain('Could not find the URL');
		} catch (error) {
			console.log({ error });
			throw error;
		}
	});
});
