const { v4: uuidv4 } = require("uuid");
const {uploadFileToFirebaseStorage} = require('./storage');

exports.getUrlFromStorage = async (file) => {
    try {
        // create new filename
        const fileName = `${uuidv4()}${new Date().toISOString().replace(/:/g, "_") + file[0].originalname}`;

        // getting mimetype from file
        let fileMimeType = file.mimetype;

        // getting buffer from file
        let fileBuffer = file[0].buffer;

        const uploadFileData = await uploadFileToFirebaseStorage(
            fileName,
            fileMimeType,
            fileBuffer
        );

        const publicUrl  = `https://firebasestorage.googleapis.com/v0/b/${uploadFileData}/0/${fileName}?alt=media`;

        return publicUrl;
    } catch (error) {
        throw error;
    }
};