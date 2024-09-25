import cors from 'cors';
import express from 'express';
import * as http from 'http';
import { ENV } from './src/config/env.js';
import connectDB from './src/config/db.js';
import apiRoutes from './src/routes/index.routes.js';
import {
	errorHandler,
	notFoundHandler,
} from './src/middlewares/error.middleware.js';

const app = express();

/**
 * Middleware for handling CORS, JSON, and URL encoding.
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Middleware for handling API routes.
 * This associates all routes defined in 'apiRoutes' with the path '/api'.
 */
app.use('/api', apiRoutes);

/**
 * Middleware for handling errors.
 * This catches any errors that occur in the application and sends a response to the client.
 */
app.use(errorHandler);

/**
 * Middleware for handling 404 Not Found errors.
 * This catches any requests to routes that do not exist and sends a 404 response to the client.
 */
app.use(notFoundHandler);

/**
 * Create an HTTP server and start listening for requests.
 */
const server = http.createServer(app);

const startServer = async () => {
	try {
		connectDB()
			.then(() => {
				server.listen(ENV.PORT, () => {
					console.log(`🚀 Server is running on port ${ENV.PORT}`);
					console.log(`🚀 API is running on http://localhost:${ENV.PORT}/api`);
				});
			})
			.catch((error) => {
				console.log('🚨 Error connecting to MongoDB database\n', error);
			});
	} catch (error) {
		console.log(error);
	}
};

// Start the server
startServer();
