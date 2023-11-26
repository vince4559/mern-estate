const profileModels= require("../models/profile-models");
const {uploadImage }= require('../firebase/uploadImage');


exports.createProfile = async (req, res) => {
    let profile;
    try {
        // const files = []
       const files = req.files;

        // for(let i=0; i<req.files.length; i++){
        //     files.push(req.files[i])
        // }


        // if (!files[0]) {
        //   console.log("no file provided");
        //   throw Error("no file provided");
        // };
        

      const urls = await Promise.all(files.map(uploadImage));
        console.log({urls})
        res.json({urls})


        //  imgURL = await getUrlFromFirebaseStorag(files);
        // console.log(imgURL)

        // profile = await profileModels.create({...req.body, imgURL})
    
        // res.status(200).json({ url: Url });
      } catch (error) {
        // res.status(400).send(error.message);
      }

    //   if(!profile){
    //     return res.status(400).json({message:'Error occured '})
    //   }
    //   return res.status(200).json({profile})
}