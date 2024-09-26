import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			trim: true,
			required: [true, 'Title is required'],
		},
		description: {
			type: String,
			trim: true,
			default: '',
		},
		dueDate: {
			type: Date,
			required: [true, 'Due date is required'],
		},
		priority: {
			type: String,
			enum: {
				values: ['low', 'medium', 'high'],
				message: 'Invalid task priority',
			},
			required: [true, 'Priority is required'],
		},
		status: {
			type: String,
			enum: {
				values: ['pending', 'in-progress', 'completed'],
				message: 'Invalid task status',
			},
			default: 'pending',
		},
	},
	{ timestamps: true }
);

export const TaskModel = mongoose.model('Task', taskSchema);
