import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { 
  getProducts, getProductById, addProduct, deleteProduct, 
  searchProducts, getCategories, getRecent, uploadImage 
} from '../controllers/productController';

const router = express.Router();

// ---------------------------------------------------------
// MULTER SECURITY IMPROVEMENTS
// ---------------------------------------------------------

// 1. Storage Configuration with Unique Filenames
// We generate a UUID for each file to completely prevent filename collisions
// and mitigate directory traversal attacks via originalname.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});

// 2. MIME Type Validation
// We strictly validate the mimetype to ensure only images are uploaded.
// This prevents users from uploading malicious scripts (like .php, .js)
// disguised as other file types.
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed.'));
  }
};

// 3. File Size Limit
// We enforce a hard limit of 5MB per file to prevent Denial of Service (DoS) 
// attacks via massive file uploads consuming server storage and bandwidth.
const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB Limit
  }
});

// ---------------------------------------------------------

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/add-product', addProduct);
router.delete('/products/:id', deleteProduct);
router.get('/search', searchProducts);
router.get('/categories', getCategories);
router.get('/recent', getRecent);

// Use multer middleware on this specific route
router.post('/upload', upload.single('image'), uploadImage);

export default router;
