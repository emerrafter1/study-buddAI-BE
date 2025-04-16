import multer from 'multer';

//MEMORY STORAGE

 const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 1MB
    files:1
  },
  fileFilter: (req, file, cb) => {
    // Check extension and mimetype
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

export default upload;