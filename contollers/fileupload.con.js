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
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});
//multiple img upload
var upload = multer({ storage: storage }).array("file");
//=================================
//             Product
//=================================
exports.uploadImage = (req, res, next) => {
  console.log("upload img");
  console.log(req.body.file);
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      //image: res.req.file.path,
      //fileName: res.req.file.filename,
    });
  });
};
