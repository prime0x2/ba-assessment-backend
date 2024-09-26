import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware.js';
import { TaskController } from '../controller/task.controller.js';

const router = Router();

router.post('/', auth, TaskController.create);
router.get('/', auth, TaskController.getAll);
router.get('/:id', auth, TaskController.getById);
router.put('/:id', auth, TaskController.update);
router.delete('/', auth, TaskController.delete);

export default router;
