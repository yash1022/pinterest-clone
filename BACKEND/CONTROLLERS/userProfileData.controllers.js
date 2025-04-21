import { User } from "../MODELS/user.models.js";
import { Followers } from "../MODELS/followers.models.js";
import mongoose from "mongoose";


export const userProfileData = async(id)=>{

    try{

  const userData= await User.aggregate([{

        $match:{_id: new mongoose.Types.ObjectId({id})}

    },

    {

       $lookup:{
        from:'posts',
        localField:'saved',
        foreignField:'_id',
        as:'savedPosts'
        




       }

    },

    {
        $lookup:{
            from:'followers',
            localField:'_id',
            foreignField:'followed',
            as:'followers'

        }
    },

    {
        $lookup:{
            from:'followers',
            localField:'_id',
            foreignField:'follower',
            as:'following'
        }
   },

   {

    $lookup:{
        from:'posts',
        localField:'_id',
        foreignField:'owner',
        as:'posts'
    }

   },






   {

    $addFields:{
        total_followers:{$size:'$followers'},
        total_following:{$size:'$following'}
    }


    },

    

    {

        $project:{
            fullname:1,
            username:1,
            posts:1,
            savedPosts:1,
            profileImage:1,
            total_followers:1,
            total_following:1
        }



    }
        

    ])

    

    // return {status:true,message:'data generated successfully',data:userData[0]}

    return userData[0];


}
catch(e){
    console.error(e)
    return {status:false,message:'failed to generate data'}
 
}




}