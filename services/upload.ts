import multer from 'multer';

//MEMORY STORAGE
 const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, 
    files:1
  },
  fileFilter: (req, file, cb) => {

    if (file.mimetype === 'application/pdf') {
      console.log(file, "<<<<<<file in Multer")
      cb(null, true);
    } else {
      console.log("not a pdf")
      cb(new Error('Not a valid PDF file'))
    }

  }
});

export default upload;