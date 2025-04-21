import mongoose from "mongoose";
import { Post } from "../MODELS/Post.models.js";
import { Likes } from "../MODELS/Likes.models.js";
import { User } from "../MODELS/user.models.js";



 export const fetchPosts = async(userId,Query)=>{

   console.log(typeof(Query));

    
   try{
    const userObjectId = userId ? new mongoose.Types.ObjectId(userId) : null;
   
    
    const pipeline=[];

    if(Query!='null')
    {

      const owner= await User.findOne({username:Query})
      if(owner)
      { const id = new mongoose.Types.ObjectId(owner.id)
        console.log(id);

        pipeline.push({
          $match:{owner:id}
        })
      }

      else
      {
        pipeline.push({
          $match:{tags:{$in:[Query]}}
        })
      }
      
     
    }

    pipeline.push(  
      {

      $lookup:{

        from:"users",
        localField:"owner",
        foreignField:"_id",
        as:"ownerInfo",
        pipeline:[{
            $lookup:{

                from:'followers',
                localField:'_id',
                foreignField:"followed",
                as:"followers",





            },
            
            


        },
        {

            $addFields:{
                total_followers:{$size:'$followers'},
               
            }
        
          

        },

       


        {
            $project:{
                _id:1,
                username:1,
                profileImage:1,
                total_followers:1




            }
        }
    
    ]
    }
},

    {
        $lookup:{
            from:'Likes',
            localField:'postId',
            foreignField:'_id',
            as:'likes'
        }




    },


    {
        $addFields: {
          total_likes: { $size: "$likes" },
          // Check if current user has liked the post
          isLiked: {
            $cond: {
              if: { $eq: [userId, null] },
              then: false,
              else: {
                $in: [
                  userObjectId,
                  {
                    $map: {
                      input: {
                        $filter: {
                          input: "$likes",
                          as: "like",
                          cond: { $eq: ["$$like.status", "Liked"] },
                        },
                      },
                      as: "like",
                      in: "$$like.userId",
                    },
                  },
                ],
              },
            },
          },
          // Get the user's like status if they've interacted with the post
          userLikeStatus: {
            $ifNull: [
              {
                $let: {
                  vars: {
                    userLike: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$likes",
                            as: "like",
                            cond: {
                              $eq: ["$$like.userId", userObjectId],
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                  in: "$$userLike.status",
                },
              },
              null,
            ],
          },
        },
      },

  


  
    
{
    $project:{

        picturefile:1,
        total_likes:1,
        captions:1,
        tags:1,
        ownerInfo:1,
        isLiked: 1,
        userLikeStatus: 1,
        createdAt:1
       



    }
    
    })
  

const data = await Post.aggregate(pipeline)
 return data;

}
   catch (error) {
    console.error('Error fetching posts', error)
    return []
   }





 }