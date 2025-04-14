const { uploadFiles } = require("../controllers/files_controller")
  
  filesRouter
    .route("/upload")
    .post(uploadFiles);
  

  module.exports = filesRouter;
  