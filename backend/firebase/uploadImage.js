
// const bucket = require('./initializeApp');
const bucket = require("../firebaseStorage/fileStorage")



exports.uploadImage = async(file) => {
    try {
      if (!file) {
        return res.status(400).json({ error: "No file provided" });
      }
      const fileName = `${Date.now()}` + file.originalname;
  
      // this buffer is image file converted to Unit8Array
      // if you use multer({ storage: multer.memoryStorage() }) to config
      // there is no file path will be stored in file
      var buffer = new Uint8Array(file.buffer);
      const url = await bucket
        .file(fileName)
        .getSignedUrl({ action: "read", expires: "03-01-2500" });
       bucket.file(fileName).save(buffer, { resumable: true });
      return url;
    } catch (error) {
      return error.message;
    }
  }


