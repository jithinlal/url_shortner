import { cleanEnv, port, str } from 'envalid';

function validateEnv() {
	cleanEnv(process.env, {
		DOMAIN: str(),
		PORT: port(),
		NODE_ENV: str(),
		API_VERSION: str(),
	});
}

export default validateEnv;
