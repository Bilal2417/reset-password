// db.js
import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://bilalarsal24:OY8v8MY1xBQbt5vq@resetmail.spq85.mongodb.net/?retryWrites=true&w=majority&appName=resetMail';

let isConnected;

export async function connectDb() {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

// mongodb+srv://bilalarsal24:OY8v8MY1xBQbt5vq@resetmail.spq85.mongodb.net/?retryWrites=true&w=majority&appName=resetMail