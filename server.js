// // server.js
// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { router } from './routes/fileRoute.js';
// import cors from 'cors';

// // Handle __dirname in ES6 modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = 3000;

// // Serve the downloads folder
// app.use('/downloads', express.static(path.join(__dirname, 'downloads')));
// app.use(cors())
// // Middleware to parse JSON bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Use file routes
// app.use('/api', router);

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


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
