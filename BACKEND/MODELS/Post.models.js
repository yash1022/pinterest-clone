
import mongoose, { Schema } from "mongoose";


const postSchema = new Schema({

    picturefile:{
        type:String, //cloudinary url
        required:true
    },

    captions:{

        type:String
    },

    owner:{

        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    tags:[{
        type:String,
        default:[]
        
        



    }]


  

},{timestamps:true})

export const Post = mongoose.model('Post',postSchema);