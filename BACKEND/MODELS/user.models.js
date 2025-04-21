import mongoose, { Schema } from "mongoose";


const userSchema= new Schema({

   username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true

    },

    email:{

        type:String,
        required:true,
        unique:true,
    
    },

    fullname:{

        type:String,
        required:true,
       
    },

    profileImage:{
        type:String,
        default:null,


    },

    saved:[
        {

            type:Schema.Types.ObjectId,
            ref:'Post',
            default:[]



        }


    ],

    boards:[

        {
            type:Schema.Types.ObjectId,
            ref:'Board',
            default:[]
        }
    ],

    collaborated:[
        {
            type:Schema.Types.ObjectId,
            ref:'Board',
            default:[]
        }


    ],

   password:{
        type:String,
        required:true,
        

    },

    refreshToken:{
        type:String 
    }

},{timestamps:true})

export const User = mongoose.model('User',userSchema);