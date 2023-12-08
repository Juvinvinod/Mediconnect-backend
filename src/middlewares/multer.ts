import multer from 'multer';

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + file.mimetype.split('/')[1]);
  },
  destination: function (req, file, cb) {
    const uploadDir = './src/uploads';
    cb(null, uploadDir);
  },
});

const upload = multer({ storage: storage });
export { upload };
