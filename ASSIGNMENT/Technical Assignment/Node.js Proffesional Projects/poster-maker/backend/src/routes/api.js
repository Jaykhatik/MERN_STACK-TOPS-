"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const apiController_1 = require("../controllers/apiController");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = (0, multer_1.default)({ storage });
router.get('/templates', apiController_1.getTemplates);
router.post('/design', apiController_1.createDesign);
router.get('/designs', apiController_1.getDesigns);
router.delete('/design/:id', apiController_1.deleteDesign);
router.post('/upload', upload.single('image'), apiController_1.uploadImage);
router.post('/background', apiController_1.setBackground);
exports.default = router;
//# sourceMappingURL=api.js.map