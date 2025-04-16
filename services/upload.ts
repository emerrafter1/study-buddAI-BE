import multer from 'multer';

 const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, 
    files:1
  },
  fileFilter: (req, file, cb) => {

    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Not a valid PDF file'))
    }

  }
});

export default upload;