import mongoose from 'mongoose';

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully.');
})

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err.message}`);
})

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection lost.');
})

export const connectDB = async () => {
    try {
        const connectionString = process.env.MONGODB_URI;
        if (!connectionString) {
            throw new Error('MONGODB_CONNECTION_STRING is missing in environment variables.');
        }

        await mongoose.connect(`${connectionString}/icommandv2`);
    } catch (error) {
        console.error(`Initial database connection failed: ${error.message}`);
        process.exit(1);
    }
}