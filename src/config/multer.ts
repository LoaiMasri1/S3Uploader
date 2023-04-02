import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads"),
  filename: (req, file, cb) => {
    const d = new Date();
    const fileName = `${d.getFullYear()}_${d.getMonth()}_${d.getDate()}_${d.getHours()}_${d.getMinutes()}`;
    cb(null, fileName + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });
