/**
 * Defines a custom HttpException class extending the built-in Error class to handle HTTP errors.
 * This class provides static methods to generate specific HTTP error responses easily.
 */
export class HttpException extends Error {
	/**
	 * Creates an instance of the HttpException class.
	 * @param {number} status - The HTTP status code of the error.
	 * @param {string} message - The error message associated with the exception.
	 */
	constructor(status, message) {
		super(message); // Call the parent class constructor with the message
		this.status = status; // HTTP status code
		this.message = message; // Error message
	}

	/**
	 * Generates a 400 Bad Request error.
	 * @param {string} [message='Bad request'] - Custom error message (optional).
	 * @returns {HttpException} An instance of HttpException.
	 */
	static badRequest(message = 'Bad request') {
		return new HttpException(400, message);
	}

	/**
	 * Generates a 401 Unauthorized error.
	 * @param {string} [message='Unauthorized access'] - Custom error message (optional).
	 * @returns {HttpException} An instance of HttpException.
	 */
	static unauthorized(message = 'Unauthorized access') {
		return new HttpException(401, message);
	}

	/**
	 * Generates a 403 Forbidden error.
	 * @param {string} [message='Access forbidden'] - Custom error message (optional).
	 * @returns {HttpException} An instance of HttpException.
	 */
	static forbidden(message = 'Access forbidden') {
		return new HttpException(403, message);
	}

	/**
	 * Generates a 404 Not Found error.
	 * @param {string} [message='Not found'] - Custom error message (optional).
	 * @returns {HttpException} An instance of HttpException.
	 */
	static notFound(message = 'Not found') {
		return new HttpException(404, message);
	}

	/**
	 * Generates a 409 Conflict error.
	 * @param {string} [message='Conflict'] - Custom error message (optional).
	 * @returns {HttpException} An instance of HttpException.
	 */
	static conflict(message = 'Conflict') {
		return new HttpException(409, message);
	}

	/**
	 * Generates a 429 Too Many Requests error.
	 * @param {string} [message='Too many requests'] - Custom error message (optional).
	 * @returns {HttpException} An instance of HttpException.
	 */
	static tooManyRequests(message = 'Too many requests') {
		return new HttpException(429, message);
	}

	/**
	 * Generates a 500 Internal Server Error.
	 * @param {string} [message='Internal server error'] - Custom error message (optional).
	 * @returns {HttpException} An instance of HttpException.
	 */
	static internalServerError(message = 'Internal server error') {
		return new HttpException(500, message);
	}
}
