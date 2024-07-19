import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

// Configuration
cloudinary.config({ 
    cloud_name: 'diwmgtfzt', 
    api_key: '493842976619557', 
    api_secret: 'cVYSLOwqh-CcHmx3YYsgnrkCVIc' // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (local_file_path) => {
    try{
        if(!local_file_path) return null;
        const uploadResult = await cloudinary.uploader
       .upload(
           local_file_path, {
               resource_type: 'auto'
           }
       )
       fs.unlinkSync(local_file_path)
       console.log("file uploaded on cloudinary", uploadResult);
       return uploadResult;
    }catch(err){
        fs.unlinkSync(local_file_path)
        console.log("upload to clodinary falied", err);
        return null;
    }
}

export { uploadOnCloudinary }