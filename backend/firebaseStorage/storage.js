const storage = require("./fileStorage");

const uploadFileToFirebaseStorage = async (fileName, fileMimeType, fileBuffer) => {

    try {
        const blob = storage.file(fileName);
        const blobStream = await blob.createWriteStream({
            resumable: false,
            metadata: {contentType: fileMimeType},
        });

        blobStream.on('finish', () => {
            console.log("image uploaded successfully")
        });

        blobStream.end(fileBuffer);
        return storage.name;

    } catch (error) {
        throw error(error)
    }
}

module.exports = {uploadFileToFirebaseStorage}