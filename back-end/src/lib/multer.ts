export const multer = require("fastify-multer");

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "./uploads");
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

export const multerUpload = multer({ storage: storage });
