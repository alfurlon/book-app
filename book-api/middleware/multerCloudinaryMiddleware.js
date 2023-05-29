const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  
const cloudinaryStorage = new CloudinaryStorage({
cloudinary: cloudinary,
params: {
    // folder: 'book-app',
    allowed_formats: ['jpg', 'jpeg', 'png'], // Specify the allowed file formats
}
});

const uploadCloudinary = multer({ storage: cloudinaryStorage });

module.exports = { uploadCloudinary };
