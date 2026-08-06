import formData from "express-form-data";
import os from "node:os";
//Node OS to access the file system temp dir

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

export const parseForm = formData.parse(options);
