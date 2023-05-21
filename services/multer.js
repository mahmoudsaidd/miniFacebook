import multer from "multer";


export const validationType = {
  image: ["image/png", "image/jpg", "image/jpeg"],
  pdf: "application/pdf",
};

export const HM=(err, req, res, next)=>{
  if (err) {
    res.json({ message: "multer error", err });
  } else {
    next();
  }
}


export function myMulter(acceptType) {
  const storage = multer.diskStorage({

  });


  function fileFilter(req, file, cb) {
    if (acceptType.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.imageError = true;
      cb('Invalid', false);
    }
  }

  const uploads = multer({
  
    dest: "uploads",
    fileFilter,
      storage,
  });
  return uploads;
}
