import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 3001;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(cors());
app.use(express.json());
app.use(limiter);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend API is running!',
    project: 'project580',
    type: 'backend'
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'project580-backend'
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    project: 'project580',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    backend: true
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});