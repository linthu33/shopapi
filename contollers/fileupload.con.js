const multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".epub") {
      return cb(res.status(400).end("only epub are allowed"), false);
    }
    cb(null, true);
  },
});
//multiple img upload
var upload = multer({ storage: storage }).array("file");
//=================================
//             Product
//=================================
exports.uploadepub = (req, res, next) => {
  console.log("upload epub");
  console.log(req.body.file);
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
    });
  });
};
