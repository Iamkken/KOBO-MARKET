require('dotenv').config();
const express = require('express');
const connectMongoDB = require('./config/mongodb');
const db = require('./config/postgres');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "KOBO-MARKET API is running"
    });
});

const startServer = async () => {
    try {
        await connectMongoDB();
        await db.raw('SELECT 1');

        console.log('PostgreSQL connected successfully');

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Application startup failed:', error.message);
        process.exit(1);
    }
};

startServer();