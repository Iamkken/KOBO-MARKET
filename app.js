require('dotenv').config();
const express = require('express');
const connectMongoDB = require('./config/mongodb');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "KOBO-MARKET API is running"
    });
});

const startServer = async () => {
    await connectMongoDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();