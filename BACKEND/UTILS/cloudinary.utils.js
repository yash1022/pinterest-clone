import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


export const uploadCloudinary = async(filepath)=>{
    cloudinary.config({ 
        cloud_name: 'dojiup4v9', 
        api_key:process.env.CLOUDINARY_API , 
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });

    if(!filepath)
    {
        return {status:false, message:'No file provided'}
    }

    

    try{

        const uploadResult = await cloudinary.uploader
        .upload(
            filepath, 
            {resource_type:"auto"}
        )
      
          
          fs.unlinkSync(filepath);
          return {status:true, message:'file successfully uploaded', link:uploadResult.url};



    }
    catch(e)
    {

        fs.unlinkSync(filepath);
        return {status:false, message:'failed to upload cloudinary'}

    }







}