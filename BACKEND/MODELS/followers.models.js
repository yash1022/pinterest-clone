import mongoose, { Schema } from "mongoose";


const followerSchema = new Schema({

    followed:{

        type:Schema.Types.ObjectId,
        ref:'User',
        required:true

    },

    follower:{

        type:Schema.Types.ObjectId,
        ref:'User',
        required:true



    }




},{timestamps:true});

export const Followers = mongoose.model('Followers', followerSchema);