import * as dotenv from 'dotenv';

dotenv.config();

/**
 * An object containing the environment variables for the application.
 * Each property of the object corresponds to an environment variable.
 * Default values are provided for each environment variable, to be used if the environment variable is not set.
 */
export const ENV = {
	PORT: process.env.PORT || 8080,
	MONGO_URI: process.env.MONGO_URI || '',
	JWT_EXPIRY: process.env.JWT_EXPIRY || '365d',
	JWT_ALGORITHM: process.env.JWT_ALGORITHM || 'HS256',
	JWT_SECRET: process.env.JWT_SECRET || 'secret',
};
