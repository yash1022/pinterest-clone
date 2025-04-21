import { Followers } from '../MODELS/followers.models.js';
import { Post } from '../MODELS/Post.models.js'
import { User } from '../MODELS/user.models.js'
import { Board } from '../MODELS/Board.models.js'
import { Likes } from '../MODELS/Likes.models.js';

export const createPost = async (id, caption, url, boardId,tags) => {

     if(tags)
     {
        var newTags= tags.split(',');
     }

    try {

        const post = new Post({
            picturefile: url,
            captions: caption,
            owner: id,
            tags:newTags


        })

        const Savedpost = await post.save();
        const postId = Savedpost._id;


        if (boardId) {
            const board = await Board.find({ _id: boardId });
            console.log(board)
            if (!board) {
                return { success: false, message: 'Board not found' };
            }

            if (board[0].images === null) {
                board[0].images = [];
            }
            board[0].images.push(postId);
            await board[0].save();
            return { success: true, message: 'Post created successfully' };
        }

        return { success: true, message: 'Post created successfully' };






    }
    catch (error) {
        console.log(error);
    }




}


export const sendReq = async (currentUserId, userFollowedId) => {

    console.log(currentUserId)
    console.log(userFollowedId)

    try {


        const data = new Followers({
            followed: userFollowedId,
            follower: currentUserId



        })

        await data.save();
    }
    catch (error) {
        console.log(error);

    }

}


export const savePost = async (userId, postId) => {

    try {

        const user = await User.findById(userId);
        const post = await Post.findById(postId)
        const postExists = user.saved.some(savedId => savedId.toString() === postId.toString());
        console.log(postExists)
        if (postExists) {
            return { success: false, message: 'Post already saved' };
        }

        if (!user || !post) {
            return { success: false, message: 'User or Post not found' };
        }


        user.saved.push(post._id);
        await user.save();

        return { success: true, message: 'Post saved successfully' };




    }

    catch (error) {
        console.log(error);
        return { success: false, message: 'Error saving post' };
    }
}

export const saveToBoard = async (postId, boardId) => {
    try {
        const board = await Board.findById(boardId);
        const post = await Post.findById(postId);

        if (!board || !post) {
            return { success: false, message: 'Board or Post not found' };
        }

        const findExistingPost = board.images.some(imageId => imageId.toString() === postId.toString());
        if (findExistingPost) {
            return { success: false, message: 'Post already exists in board' };
        }

        board.images.push(postId);
        await board.save();

        return { success: true, message: "Saved to board successfully" }






    }
    catch (error) {
        console.log(error);
        return { success: false, message: 'Error saving post to board' };
    }
}

export const unsave = async (userId, postId) => {

    try {

        const user = await User.findById(userId);

        if (!user) {
            return { success: false, message: 'User not found' };
        }

        const temp = user.saved.filter(id => id.toString() !== postId)
        user.saved=temp;

        await user.save();

        return { success: true, message: 'Post unsaved successfully' };








    }
    catch(e) {
        console.log(e);
        return { success: false, message: 'Error unsaving post' };
    }




}

export const deletePost=async(postId)=>{

    try{
        await  Post.findByIdAndDelete(postId);
         await Post.save();

         return {success:true,message:"deleted"};

    }
    catch(e){
        return {status:false,message:"failed"}


    }

}

export const checkUsername = async (username) => {
    try {

        const user = await User.findOne({ username }).select('username profileImage _id');

        if (user) {
            return { success: true, exists: true, user: user };
        }

        else {
            return { success: true, exists: false };
        }



    }
    catch (error) {
        console.log(error);
        return { success: false, exists: false, message: 'Error checking username' };
    }





}

export const createBoard = async (userId, title, coverimage, collaborators) => {
    try {


        const board = new Board({
            name: title,
            owner: userId,
            coverimage: coverimage,
          
            collaborators: collaborators
        })
        board.collaborators.push(userId);
        await board.save();



        return { success: true, message: 'Board created successfully' };






    }
    catch (error) {
        console.log(error);
        return { success: false, message: 'Error creating board' };
    }






}

export const getBoards = async (userId) => {

    try {

        const boards = await Board.find({
            collaborators: userId
        })
            .populate('owner', 'username')
            .populate('images', 'picturefile captions owner likes')
            .populate('collaborators', 'username profileImage');

        if (!boards || boards.length === 0) {
            return { success: false, message: 'No boards found' };
        }
        return { success: true, boards: boards };








    }
    catch (error) {
        console.log(error);
        return { success: false, message: 'Error fetching boards' };
    }



}

export const addCollaborator = async (userId, collaboratorId) => {
    console.log(collaboratorId)
    try {


        const board = await Board.findOne({ owner: userId });
        if (!board) {
            return { success: false, message: 'Board not found' };
        }
        board.collaborators.push(collaboratorId);
        await board.save();

        const populatedArray = await Board.find({ owner: userId }).select('collaborators').populate('collaborators', 'username profileImage')




        return { success: true, message: 'Collaborator added successfully', data: populatedArray[0].collaborators };









    }
    catch (error) {
        console.log(error);
        return { success: false, message: 'Error adding collaborator' };
    }
}

export const likePost = async (userId, postId) => {
    console.log("in likepost")
    try {
     
      const existingLike = await Likes.findOne({ userId, postId });
  
      if (existingLike) {
       
        existingLike.status = existingLike.status === 'Liked' ? 'Disliked' : 'Liked';
        await existingLike.save();
      } else {
       
        const newLike = new Likes({
          userId,
          postId,
          status: 'Liked'
        });
        await newLike.save();
      }
  
      return { success: true, message: "Operation done" };
    } catch (e) {
      console.error("Error in likePost:", e);
      return { success: false, message: "Failed to like/dislike" };
    }
  };

