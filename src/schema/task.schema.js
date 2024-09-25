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
			enum: ['low', 'medium', 'high'],
			required: [true, 'Priority is required'],
		},
		status: {
			type: String,
			enum: ['pending', 'in-progress', 'completed'],
			default: 'pending',
		},
	},
	{ timestamps: true }
);

export const TaskModel = mongoose.model('Task', taskSchema);
