import bcryptjs from 'bcryptjs';
import { issueJWT } from '../config/jwt.js';
import { UserModel } from '../schema/user.schema.js';
import { HttpException } from '../utility/http.exception.js';

export class UserController {
	static async register(req, res, next) {
		const { name, email, password } = req.body;

		try {
			const exist = await UserModel.findOne({ email });
			if (exist) {
				throw HttpException.conflict('Email already exists');
			}

			const salt = await bcryptjs.genSalt(10);
			const hashedPassword = await bcryptjs.hash(password, salt);

			const user = await UserModel.create({
				name,
				email,
				password: hashedPassword,
				authType: 'email',
			});

			const token = issueJWT({
				_id: user._id,
				name: user.name,
				email: user.email,
				authType: user.authType,
			});

			res.status(201).json({ token });
		} catch (error) {
			next(error);
		}
	}

	static async login(req, res, next) {
		const { email, password } = req.body;

		try {
			const user = await UserModel.findOne({ email });
			if (!user) {
				throw HttpException.notFound('User not found');
			}

			if (user.authType !== 'email') {
				throw HttpException.badRequest('This user is registered with Google');
			}

			const isMatch = await bcryptjs.compare(password, user.password);
			if (!isMatch) {
				throw HttpException.unauthorized('Invalid credentials');
			}

			const token = issueJWT({
				_id: user._id,
				name: user.name,
				email: user.email,
				authType: user.authType,
			});

			res.status(200).json({ token });
		} catch (error) {
			next(error);
		}
	}

	static async googleLogin(req, res, next) {
		const { name, email, googleId } = req.body;

		try {
			const user = await UserModel.findOne({ email });
			if (!user) {
				const newUser = await UserModel.create({
					name,
					email,
					authType: 'google',
					googleId,
				});

				const token = issueJWT({
					_id: newUser._id,
					name: newUser.name,
					email: newUser.email,
					authType: newUser.authType,
				});

				return res.status(201).json({ token });
			}

			if (user.authType !== 'google') {
				throw HttpException.badRequest(
					'This user is not registered with Google'
				);
			}

			if (user.googleId !== googleId) {
				throw HttpException.badRequest('Invalid Google ID');
			}

			const token = issueJWT({
				_id: user._id,
				name: user.name,
				email: user.email,
				authType: user.authType,
			});

			res.status(200).json({ token });
		} catch (error) {
			next(error);
		}
	}
}
