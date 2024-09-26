import { TaskModel } from '../schema/task.schema.js';
import { HttpException } from '../utility/http.exception.js';

export class TaskController {
	static async create(req, res, next) {
		const { title, description, dueDate, priority, status } = req.body;

		if (!title || !dueDate || !priority) {
			throw HttpException.badRequest('Please fill in all required fields');
		}

		try {
			const task = await TaskModel.create({
				author: req.user._id,
				title,
				description: description || '',
				dueDate,
				priority,
				status: status || 'pending',
			});

			res.status(201).json(task);
		} catch (error) {
			next(error);
		}
	}

	static async getAll(req, res, next) {
		try {
			const tasks = await TaskModel.find({ author: req.user._id });

			res.json(tasks);
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		const { id } = req.params;

		try {
			const task = await TaskModel.findOne({ _id: id, author: req.user._id });

			if (!task) {
				throw HttpException.notFound('Task not found');
			}

			res.json(task);
		} catch (error) {
			next(error);
		}
	}

	static async update(req, res, next) {
		const { id } = req.params;
		const { title, description, dueDate, priority, status } = req.body;

		try {
			const task = await TaskModel.findOne({ _id: id, author: req.user._id });

			if (!task) {
				throw HttpException.notFound('Task not found');
			}

			task.title = title || task.title;
			task.description = description;
			task.dueDate = dueDate || task.dueDate;
			task.priority = priority || task.priority;
			task.status = status || task.status;

			await task.save();

			res.json(task);
		} catch (error) {
			next(error);
		}
	}

	static async delete(req, res, next) {
		const { ids } = req.body;

		try {
			const task = await TaskModel.deleteMany({
				_id: { $in: ids },
				author: req.user._id,
			});

			if (!task.deletedCount) {
				throw HttpException.notFound('Task not found');
			}

			res.json({ message: 'Task deleted successfully' });
		} catch (error) {
			next(error);
		}
	}
}
