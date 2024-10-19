import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Resolve the path to ensure absolute path
   // cb(null, path.join(__dirname, '../uploads'));  // Path to uploads folder
   cb(null, path.join(__dirname, '../../../userManagementFrontEnd/uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);  // Save file with a unique name
  }
});

// Filter to ensure only image files are uploaded
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

// Multer upload object
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }  // Limit file size to 5MB
});

export default upload;
