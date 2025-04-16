import express from 'express';
import upload from '../services/upload';
import uploadFiles from '../controllers/files_controller';
const filesRouter = express.Router();
import multerErrorHandler from '../middleware/multerErrorHandler';

filesRouter.get('/test', (req, res) => {
  res.json({ message: "Router is working!" });
});

filesRouter.post('/upload', 
  upload.single('file'), 
  uploadFiles, 
  multerErrorHandler)
 

export default filesRouter;