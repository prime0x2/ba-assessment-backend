import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: function () {
				return this.authType === 'email';
			},
		},
		authType: {
			type: String,
			enum: ['email', 'google'],
			required: true,
		},
		googleId: {
			type: String,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

export const UserModel = mongoose.model('User', userSchema);
