// storage bucket

const { getStorage } = require("firebase-admin/storage");
const { initializeApp, cert } = require("firebase-admin/app");
const serviceAccount = require('./admin.json')
require("dotenv").config();


initializeApp({
  credential: cert(serviceAccount ),
 
  
  storageBucket: process.env.BUCKET_URL,
});

const storage = getStorage().bucket();

module.exports = storage;