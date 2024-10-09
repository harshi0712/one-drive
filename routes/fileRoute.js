// routes/fileRoutes.js
import express from 'express';
import { downloadFile } from '../controllers/fileController.js';

export const router = express.Router();

// Define route for downloading file
router.post('/download', downloadFile);

export default router;
