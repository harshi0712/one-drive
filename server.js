

import express from 'express';
import fileRoutes from './routes/fileRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use file routes
app.use('/api', fileRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


