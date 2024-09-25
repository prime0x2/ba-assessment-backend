import { ENV } from './env.js';
import jwt from 'jsonwebtoken';

/**
 * Function to issue a JSON Web Token (JWT) for a given payload.
 * @param {Object} payload - The payload to be included in the JWT.
 * @returns {string} The issued JWT.
 */
export const issueJWT = (payload) => {
	const token = jwt.sign(payload, ENV.JWT_SECRET, {
		expiresIn: ENV.JWT_EXPIRY,
		algorithm: ENV.JWT_ALGORITHM,
	});

	return token;
};
