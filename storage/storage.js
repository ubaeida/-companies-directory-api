const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext[ext.length - 1]);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 1_000_000 } });

module.exports = {
  upload,
};
