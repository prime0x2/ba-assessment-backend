import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import { HttpException } from '../utility/http.exception.js';

export const auth = (req, res, next) => {
	const token = req.header('Authorization')?.replace('Bearer ', '');

	if (!token) {
		return next(HttpException.unauthorized('Access denied'));
	}

	try {
		const decoded = jwt.verify(token, ENV.JWT_SECRET);

		req.user = decoded;
		next();
	} catch (error) {
		console.log(
			'🚀 prime0x2 | auth.middleware.js | toke & error -->\n',
			error,
			'\n',
			req.header('Authorization')
		);

		next(HttpException.unauthorized('Invalid token'));
	}
};
