import express from 'express';
import connectDB from './database/db.js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    connectDB(process.env.MONGO_URI);
    console.log(`Server is running on http://localhost:${PORT}`);
    
});