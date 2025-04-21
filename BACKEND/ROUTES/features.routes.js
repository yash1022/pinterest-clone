import { authenticate } from '../MIDDLEWARES/authenticate.middleware.js';
import { upload } from '../MIDDLEWARES/multer.middleware.js';
import { uploadCloudinary } from '../UTILS/cloudinary.utils.js';
import {createPost,savePost,sendReq, unsave, checkUsername, createBoard, getBoards, addCollaborator,saveToBoard, deletePost,likePost} from '../CONTROLLERS/features.controllers.js'
import express, { urlencoded } from 'express';
import { userProfileData } from '../CONTROLLERS/userProfileData.controllers.js';
import { fetchPosts } from '../CONTROLLERS/fetchPostsPipeline.controllers.js';
import path from "path";
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import fs from 'fs';



export const router2 = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



router2.post('/post',authenticate,upload.single('pictureFile'),async(req,res)=>{

    const{captions,boardId,tags}= req.body;
    const user = req.user;
    const picturePath = req.file? req.file.path:null;
    console.log(boardId)
     
    if(!picturePath)
    {    
        return res.status(400).json({message: "No picture uploaded"})

    }

   

    try{

        const image_url =(await uploadCloudinary(picturePath)).link

        await createPost(user.id,captions,image_url,boardId,tags);

        res.status(201).json({message: "Post created successfully"})



    }
    catch(e)
    {

        res.status(500).json({message: "Failed to create post"})
    }
})


router2.post('/follow', authenticate, async(req, res)=>{
    const {userIdToFollow} = req.body;
    const user = req.user;
    console.log(user.id)

    try{

        await sendReq(user.id,userIdToFollow);

        res.status(200).json({message: "User followed successfully"})



    }

    catch(e)
    {

        res.status(500).json({message: "Failed to follow user"})
    }





})


router2.get('/profile',authenticate, async(req, res)=>{

      const user = req.user

     try{

        const profiledata =  await userProfileData(user.id);
         

        res.status(200).json(profiledata);
       }
     catch(e)
     {

         res.status(500).json({message: "Failed to fetch user data"})

     }



})

router2.post('/save',authenticate, async(req, res)=>{
    const {id} = req.body;
    const user = req.user;

    if(!user)
    {
        return res.status(401).json({message: "Unauthorized"})
    }

    try{

     const response=  await savePost(user.id,id);
    

     if(response.success)
     {
        res.status(200).json({message: "Post saved successfully"})
     }
     else{
        res.status(400).json({message:response.message})
     }
    
    
    }
    catch(e)
    {

        res.status(500).json({message: "Failed to save post"})
    }


})

router2.post('/saveToBoard',authenticate,async(req,res)=>{

    const {postId,boardId} = req.body;
    const user = req.user;

    console.log(postId,boardId)

    if(!user)
    {
        return res.status(401).json({message: "Unauthorized"})
    }
    try{


        const response = await saveToBoard(postId,boardId)

        if(response.success)
        {
            res.status(200).json({message: "Post saved to board successfully"})
        }
        else{
            res.status(400).json({message:response.message})
        }

   }
   catch(e)
    {
        res.status(500).json({message: "Failed to save post to board"})
    }







})


router2.delete('/unsave/:postId',authenticate, async(req, res)=>{

    const {postId}=req.params;
    const user=req.user;

    try{
        const response = await unsave(user.id,postId);
       

        if(response.success)
        {
           return res.status(200).json({message: "Post unsaved successfully"})
        }
        else{
           return res.status(400).json({message: "Failed to unsave post"})
        }






    }

    catch(e)
    {
        res.status(500).json({message: "Failed to unsave post"})
    }
})


router2.delete('/delete/:postId',authenticate,async(req,res)=>{

    const {postId}= req.params;
    

    try{

        const response = await deletePost(postId);
        if(response.success) 
        {

            return res.status(200).json({message:"post deleted successfully"})
        }
        return res.status(400).json({message:"failed to delete message"});



    }
    catch(e)
    {
        return res.status(500).json({message:"failed to delete"});
    }

})

router2.get('/getposts/:Query',authenticate, async(req,res)=>{
     const user = req.user
     const {Query}= req.params;


    try{

      

        const response = await fetchPosts(user.id,Query);

        console.log(response);  
        

        

        res.status(200).json(response);





    }
    catch(e)
    {
        res.status(500).json({message: "Failed to fetch posts"})
    }




})


router2.get('/getCollaborator/:name',authenticate, async(req,res)=>{
    const {name}=req.params;
    const user = req.user;

   


    const response = await checkUsername(name);

    if(response.exists)
    {   
        res.status(200).json({exists:true,user:response.user});
    }
    else{
        res.status(200).json({exists:false});
    }


})

router2.post('/saveBoard',authenticate,upload.single('picture'), async(req,res)=>{

    const {Title,collaborator} = req.body;
    const user = req.user;
    

   const jsonData = JSON.parse(collaborator)
   


    const userIds = jsonData.map(user=>user._id)
    console.log(userIds)
 
    

   

     let coverImagePath = req.file? req.file.path:null;
  

    try{

        if(coverImagePath)
        {
           const url  =(await uploadCloudinary(coverImagePath)).link
           coverImagePath = url;
        }


        const response = await createBoard(user.id,Title,coverImagePath,userIds);
         if(response.success)
         {
            console.log(response.message);
            res.status(200).json({message: "Board created successfully"});
         }
         else{
            res.status(400).json({message: "Failed to create board"})
         }


       




    }
    catch(e)
    {    console.log("error creating board")
        console.log(e)
        res.status(500).json({message: "Failed to create board"})
    }

    






})

router2.get('/getBoards',authenticate, async(req,res)=>{

    const user = req.user;

    try{

        const response = await getBoards(user.id);

      

        res.status(200).json(response);








    }
    catch(e)
    {
        res.status(500).json({message: "Failed to fetch boards"})
    }





})

router2.post('/addCollaborator/:id',authenticate,async(req,res)=>{
    const { id } = req.params;
    const user = req.user;

    try{
       


        const response = await addCollaborator(user.id,id);
      
        
        if(response.success)
        {   
            res.status(200).json({collaborators:response.data,message: "Collaborator added successfully"})
        }
        else{
            res.status(400).json({message: "Failed to add collaborator"})
        }





    }
    catch(e)
    {
        res.status(500).json({message: "Failed to add collaborator"})
    }
})

router2.post("/like/:postId", authenticate, async(req,res)=>{
    const user = req.user;
    const {postId} = req.params;

    console.log(postId)
    

    try
    {

        const response = await likePost(user.id, postId);
        console.log(response)

        if(response.success)
        {
             res.status(200).json({message:response.message})
        }

        else
        {
            res.status(400).json({message:response.message})
        }




    }
    catch(e)
    {
        res.status(500).json({message:"Failed"})
    }




})

router2.post('/generateTags',authenticate,upload.single('image'),async(req,res)=>{
    
    const user=req.user;
    const picturePath = req.file? req.file.path:null;
    const imagePath = path.resolve(__dirname, '..',picturePath);
    console.log(imagePath)

    if(!picturePath)
    {
        console.log("no image")
       return  res.status(400).json({message:"No file uploaded"})
    }

    try
    {
        
        const scriptPath = path.join(__dirname, '..','ML','tagPridiction.py');
        console.log(scriptPath)
      
      
           
            const python = spawn('python',[scriptPath, imagePath]);
             
            console.log("Python process started with PID:", python.pid);

     

        console.log("running")

        let result = '';
        let errorData = '';

      


    python.stdout.on('data', (data) => {
        console.log('Python stdout:', data.toString());
        result += data.toString();
        

          });
    
          
          if(!result)
          {
            console.log("empty")
          }


   
 
   

          python.stderr.on('data', (data) => {
            console.error('Python stderr:', data.toString());
            errorData += data.toString();
            
        });
        if(!errorData)
        {
            console.log("empty")
        }
        console.log(errorData)

        
        await new Promise((resolve, reject) => {
            python.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`Python process exited with code ${code}: ${errorData}`));
                }
            });
            
            python.on('error', (err) => {
                reject(err);
            });
        });

        try {
            fs.unlinkSync(picturePath);
        } catch (unlinkError) {
            console.error("Failed to delete temporary file:", unlinkError);
        }


        const tags = JSON.parse(result);
        
        if (tags.error) {
            throw new Error(tags.error);
        }
        
        console.log("Generated tags:", tags);
        res.status(200).json({message: "Tags generated", tags});
        

        
     }
    catch(e)
    {
        res.status(500).json({message:"Error generating tags"}) 
    }




})

