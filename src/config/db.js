import { ENV } from './env.js';
import mongoose from 'mongoose';

/**
 * Function to establish a connection to the MongoDB database.
 * It uses the MONGO_URI from the environment variables to connect to the database.
 * If the MONGO_URI is not found, it logs an error message and returns.
 * If the connection is successful, it logs a success message.
 */
const connectDB = () => {
	// Check if the MONGO_URI is present
	if (!ENV.MONGO_URI) {
		console.error('❌ Database URI not found...!');
		return;
	}

	// Set the 'strictQuery' option to true to ensure that only existing paths can be used in a query
	mongoose.set('strictQuery', true);

	// Connect to the MongoDB database using the MONGO_URI
	return mongoose.connect(ENV.MONGO_URI).then(() => {
		console.log('🏭 Connected to MongoDB database');
	});
};

export default connectDB;
