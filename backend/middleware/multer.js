const multer = require('multer');
const { diskStorage } = require('multer');
const { basename, extname } = require('path');

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${basename(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = extname(file.originalname).toLowerCase();
  if (ext !== '.xls' && ext !== '.xlsx') {
    return cb(new Error('Only Excel files are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

module.exports = {
  single: upload.single.bind(upload)
}; 
