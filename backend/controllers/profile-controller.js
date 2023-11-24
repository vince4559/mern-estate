const profileModels= require("../models/profile-models");
const {getUrlFromFirebaseStorag} = require('../firebase/getUrlFromFirebaseStorag')


exports.createProfile = async (req, res) => {
    let profile;
    try {
        // const file = req.files;
        let files = [];
      

        for(let i=0; i<req.files.length; i++){
            files.push(req.files[i])
        }

        // console.log(files[0])
        // console.log('hello')
        // console.log(files[1])

        // if (!files[0]) {
        //   console.log("no file provided");
        //   throw Error("no file provided");
        // };
        
      const photo = files.map(file => file)

         imgURL = await getUrlFromFirebaseStorag(photo);
        console.log(imgURL)

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