import mongoose, { mongo, Schema } from "mongoose";

const LikeSchema = new Schema({

    postId:{
        type:Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },

    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },

    status:{

        type:String,
        enum:["Liked","Disliked"],
        default:"Disliked"




    }
},{timestamps:true})

export const Likes = mongoose.model('Like',LikeSchema)
