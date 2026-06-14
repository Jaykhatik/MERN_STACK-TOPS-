import express from 'express';
import multer from 'multer';
import path from 'path';
import { getTemplates, createDesign, getDesigns, deleteDesign, uploadImage, setBackground } from '../controllers/apiController';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.get('/templates', getTemplates);
router.post('/design', createDesign);
router.get('/designs', getDesigns);
router.delete('/design/:id', deleteDesign);
router.post('/upload', upload.single('image'), uploadImage);
router.post('/background', setBackground);

export default router;
