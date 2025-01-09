import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import OpenAI from 'openai';
import storyRoutes from './routes/storyRoutes';
import userRoutes from './routes/userRoutes';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Check if OPENAI_API_KEY exists
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not defined in environment variables');
  process.exit(1);
}

// Initialize OpenAI
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Story App API' });
});

app.use('/api/users', userRoutes);
app.use('/api/stories', storyRoutes);

// Check if MONGODB_URI exists
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});