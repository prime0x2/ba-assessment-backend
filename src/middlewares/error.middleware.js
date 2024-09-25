/**
 * Middleware function to handle errors in the application.
 * This function logs the error and sends a response to the client with the error status and message.
 * If the error is a validation error, it sets the status to 400 and uses the validation error message.
 * If the error does not have a status, it defaults to 500.
 * @param {Object} err - The error object.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the Express pipeline.
 */
export const errorHandler = (err, req, res, next) => {
	console.log('my error -> ', err);

	if (err.name === 'ValidationError') {
		err.status = 400;
		err.message = Object.values(err.errors).map((val) => val?.message)[0];
	}

	return res.status(err.status || 500).json({
		status: res.statusCode,
		success: false,
		message: err.message || 'Something went wrong',
	});
};

/**
 * Middleware function to handle 404 Not Found errors in the application.
 * This function sends a response to the client with the status 404 and a 'Not found' message.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the Express pipeline.
 */
export const notFoundHandler = (req, res, next) => {
	return res.status(404).json({
		status: res.statusCode,
		success: false,
		message: 'Not found',
	});
};
