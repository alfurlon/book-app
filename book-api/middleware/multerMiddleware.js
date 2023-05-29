const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/coverPhotos');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const multerMiddleware = () => {
  console.log('multer middleware')
  const upload = multer({ storage });

  return upload.single('coverPhoto');
};

module.exports = multerMiddleware;
