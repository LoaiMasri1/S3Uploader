import { Router } from "express";
import { upload } from "../config/multer";

import { uploadImage } from "../controllers/image.controller";

const router: Router = Router();

router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;
