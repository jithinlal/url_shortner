require('dotenv-safe').config({
	allowEmptyValues: true,
});
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import { __PROD__ } from '~/constants';
import Route from '~/routes';
import errorMiddleware from '~/middleware/error.middleware';
import validateEnv from '~/utils/validateEnv';
import { Server } from 'http';

validateEnv();

let app: express.Application;
let port: string | number;
let env: boolean;
let server: Server;

const main = async () => {
	console.log('Server: ', process.env.NODE_ENV);
	app = express();

	port = process.env.PORT || 3000;
	env = __PROD__;

	await initializeMiddlewares();
	await initializeRoutes();
	await initializeErrorHandling();
	await listen();
};

function initializeMiddlewares() {
	app.use(express.json());
	app.use(
		express.urlencoded({
			extended: true,
		})
	);
	app.use(cookieParser());
	if (env) {
		app.use(hpp());
		app.use(helmet());
		app.use(morgan('combined'));
		app.use(
			cors({
				// origin: process.env.DOMAIN,
				origin: true,
				credentials: true,
			})
		);
	} else {
		app.use(morgan('dev'));
		app.use(
			cors({
				origin: true,
				credentials: true,
			})
		);
	}
}

function initializeRoutes() {
	const { API_VERSION, NODE_ENV } = process.env;
	console.log(`/api/${API_VERSION}/${NODE_ENV}`);
	app.use(`/api/${API_VERSION}/${NODE_ENV}`, Route);
}

function initializeErrorHandling() {
	app.use(errorMiddleware);
}

function listen() {
	server = app.listen(port, () => {
		console.log(`Server running on PORT: ${port}`);
	});
}

function getServer() {
	return server;
}

export { main, getServer };
