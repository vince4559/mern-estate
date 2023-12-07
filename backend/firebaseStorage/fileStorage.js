require('dotenv').config();
const { getStorage } = require("firebase-admin/storage");
const {initializeApp, cert} = require("firebase-admin/app");

initializeApp({
    credential: cert({
        "type": "service_account",
        "project_id": "realestate-3c8d7",
        "private_key_id": process.env.PRIVATE_KEY_ID,
        "private_key": process.env.PRIVATE_KEY,
        "client_email": "firebase-adminsdk-l3axl@realestate-3c8d7.iam.gserviceaccount.com",
        "client_id": "116252761668504986149",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l3axl%40realestate-3c8d7.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      }
      ),

      storageBucket: process.env.BUCKET_URL
});

const storage = getStorage().bucket();

module.exports = storage;
