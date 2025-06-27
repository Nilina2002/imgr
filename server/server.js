import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import imageRouter from './routes/imageRoute.js';
import paymentRouter from './routes/paymentRoute.js';

const PORT = process.env.PORT || 4000;
const app = express();

// Configure CORS
app.use(cors());

// Parse JSON for all routes except webhook
app.use((req, res, next) => {
    if (req.originalUrl === '/api/payment/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});

await connectDB();

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);
app.use('/api/payment', paymentRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

