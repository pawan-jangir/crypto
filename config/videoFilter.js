const videoFilter = function (req, files, cb) {
  // Accept video only
  if (files.fieldname == "video") {
    if (!files.originalname.match(/\.(mp4)$/)) {
      req.fileValidationError = "Only video file are allowed!";
      return cb(new Error("Only video file are allowed!"), false);
    }
  }
  // Accept image only
  if (files.fieldname == "image") {
    if (!files.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
      req.fileValidationError = "Only image file are allowed!";
      return cb(new Error("Only image file are allowed!"), false);
    }
  }
  cb(null, true);
};
module.exports = videoFilter;
