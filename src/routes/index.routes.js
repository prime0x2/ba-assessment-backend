import { Router } from 'express';

import userRoutes from './user.routes.js';

const router = Router();

/**
 * GET /
 * Default route that returns a status message.
 */
router.get('/', (req, res) => {
	res.json({
		status: 200,
		message: process.env.API_INDEX,
	});
});

router.use('/user', userRoutes);

export default router;
