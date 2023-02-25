import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import postRoutes from './routes/postRoutes';
import dalleRoutes from './routes/dalleRoutes';
import connectDB from './mongodb/connect';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

const startServer = async () => {
  try {
    if(!process.env.MONGODB_URL) throw new Error("The environment MONGODB_URL is null") 
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();
