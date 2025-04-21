import multer from "multer";

const storage = multer.diskStorage({

    destination: function(req,file,cb){

        // cb(null,"C:\\Users\\dyash\\OneDrive\\Desktop\\pinterest-clone\\public")
        // cb(null,"../public/")
        cb(null,"./public")
    },

    filename: function(req,file, cb){

        
        cb(null, file.originalname)
        
    }
  })

export const upload =multer({storage})