import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema({

    name:{
        type:String,
        required:true,

    },

    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    coverimage:{

        type:String,
        default:null




    },

    images:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post',
            default:[]

            
        }



    ],

    collaborators:[
        {
            type:Schema.Types.ObjectId,
            ref:'User',
            default:[]
        }
    ]







}, {timestamps:true})
export const Board = mongoose.model('Board',boardSchema)