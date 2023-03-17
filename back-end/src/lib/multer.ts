export const multer = require("fastify-multer");

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, `${__dirname}/uploads`);
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, `${file.fieldname}-${Date.now()}.png`);
  },
});

export const multerUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB
  },
});
