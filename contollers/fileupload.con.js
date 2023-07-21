const multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
 /*  fileFilter: (req, file, cb) => {
    console.log(file.mimetype)
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/gif'];
     const ext = path.extname(file.originalname);
  
    console.log(req.file.mimetype)
    if (allowedMimes.includes(file.mimetype)) {
      return cb(res.status(400).end("only epub are allowed"), false);
    }
    cb(null, true);
  }, */
});
//file filter for extention
let fileFilter = function (req, file, cb) {
  console.log(file.mimetype)
  const allowedMimes = ['application/epub+zip'];

  if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
      return cb(new Error('Only epub format allowed!'));
  }
};
//multiple img upload
var upload = multer({ 
  storage: storage,
  // fileFilter: fileFilter
 }).array("file");
//=================================
//             Product
//=================================
exports.uploadepub = (req, res, next) => {
  console.log("upload epub");
 
  upload(req, res, (err) => {
    if (err) {
      return res.json({ status: false, err });
    }
    else{
      return res.json({
        status: true,
        file:req.file
      });
    }
   
  });
};