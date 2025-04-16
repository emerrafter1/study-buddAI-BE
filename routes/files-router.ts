import express from 'express';
import upload from '../services/upload';
import uploadFiles from '../controllers/files_controller';
const filesRouter = express.Router();


filesRouter.get('/test', (req, res) => {
  res.json({ message: "Router is working!" });
});
// Debug endpoint - COMPLETELY remove Multer
filesRouter.post('/debug', (req, res) => {
  console.log('Raw headers:', req.headers);
  
  // Manually parse the body if needed
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    res.json({
      received: {
        headers: req.headers,
        rawBody: body // Shows unprocessed form data
      }
    });
  });
});

filesRouter.post('/upload', 
  upload.single('file'), 
  uploadFiles)
 

export default filesRouter;