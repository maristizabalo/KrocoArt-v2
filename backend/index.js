//packages
import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//Utilies
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cookieParser());

// Configuracion CORS
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Orgin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Acces-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)

app.listen(port, () => console.log(`Server running on port: ${port}`))

