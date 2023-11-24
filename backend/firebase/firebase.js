const { getStorage } = require("firebase-admin/storage");
const { initializeApp, cert } = require("firebase-admin/app");
require("dotenv").config();

initializeApp({
  credential: cert(
    {
        "type": "service_account",
        "project_id": "realestate-3c8d7",
        "private_key_id": "f7f98ba2a78804d88a3f25bbf3efe967a9922891",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDsk0EQNokpnDoP\nJAA/2TK2ujnqHD/0dLgXeYt/zRl2YvPtwpTbqfkBjPKNJeyJYVrZ5b1aApBzuOij\nOzCH0uBK20KhZcpUVb3JqcgTyaUd506viBXSbVw34E3pNgaCBFeq2KvCnrOsS+OP\nlAupNLgR7YfGW7LHJVP5sK3sqjBgt/8/aCd5M01LHrD4JSC3rg42sdfdXvKR+bD5\n8Ohqmq07L4E8AU7YcDWgIakqKdzyHG0kMIw1Lm6jcKH8KX0SD60jyGdRJhWVbfSg\n1wc4AdVXU2GNcZc9ZHIK0c/7A+hG75E/zNvfQXbgBZrlFl91gDDwXOWUebYJgtWW\ni8E1mWCLAgMBAAECggEABm1fvKWGp3M/no6vVQy9FHrNvP8Ee8s5/yVFtXSohu9c\nSi7ZpXgiNDkUk+IeYYMcGURlFw9vxj0VUO34PRBtGIuJbWIbE5x6ugJbVbJKQpw4\nposvcJaZBUmaREY7+gdNLG6TiAeQwRMUvR9cC75La+1EnY57Nm7cr7FtoDrlcpMv\nxFgCE5rUd8EnmiLeJI3dq5oAL0+jONUUWoiiFs+tpT9WnN03p5Jnr89Bc+BWF2sO\nj0LCySbz/dNrodfbpQ9lDNBjsUUGMfMUTOCJMofvYDVmn9m0o9kWX08pKWndiabr\nlQSkvUj+bu41J8rlAQw8arlhd9vJhg5NeQiYqPU/DQKBgQD2bGu0BoRgCEbfyp4T\nBnOBjqvvaiS3kr/aZRn9ZRz6mqO+xLVrIcVaCxK6fRZcZvj9XikUwGbhlRukCIGh\nHEKmowwk3CgBqGEIp6l+6BbNqwpMY8a0WSURhjV9KOV/E/3Y9rBRVlhoJQOKFm0C\naFDVpGIb3YQDsBUfqBrEysEUHwKBgQD1xNstaTUQHZYhXXuCz+ypDrqrg7c+BUsQ\npvUqghwT1T5asyIeZ/B7XNlDxlcC6kyh+ptD/th/Ebk2a1qUTDT2XpisU/bACMKy\nCU4EGNTUUqu9WVrfyujcnWhsVL0moF3hal00fipNW4Sa+st38lXlCyn98bqevvZM\nIgxiWXYGFQKBgBKqO64zICu19MhWrIp8XptdlyBXRdixwN5l8gYDdqJ0vBpjA+rN\ncAlV9WEywFLXadynGS19NU244ZMXIdp2LYY5q13PXyhg/JiPOoNmSPPjFLCcjhxy\n9B/TrpGAW4G4ne2lIc3HYILi6tW2xSL9i8Hi5Zt+t9UfrTnsnbpyMRW5AoGAeAlK\n55YQBav9rJQlBBIby8JW5/hwIkmhjSOOcNGVdxZa2x/M1T781LPXpeOUkebvwNlO\nxloNUZrNdEfguLez0nUHanuj880TkrM6uIOMR5uNJ/EhklZff4kd/HMy40/GKpex\nqDbK4HeHf85oXFAvJaxbOR28gVZRo4Opusto+rUCgYAMDQx6Aep8YuO1BwxHEaeF\nHQeX54jsdj7K64DYx9MEALTx3S0rQYUrPFKa4pM+B/al1Tso7cSR3uXnzp/PJxzF\nZW6+kBgLNPJEIP54mRdAiU5zNBtekxL0TPVJt97IAGpab9/VCg3H+EKUDpH3f+C9\nzAdocw2Sx3Xr8NOCCq+Mag==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-l3axl@realestate-3c8d7.iam.gserviceaccount.com",
        "client_id": "116252761668504986149",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l3axl%40realestate-3c8d7.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      }
  ),
 
  
  storageBucket: "realestate-3c8d7.appspot.com",
});

const storage = getStorage().bucket();

module.exports = storage;