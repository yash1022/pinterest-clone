import express, { Router } from 'express';
import bcrypt from 'bcryptjs/dist/bcrypt.js';
import jwt from 'jsonwebtoken'
import {User} from '../MODELS/user.models.js'
import {Signup} from '../CONTROLLERS/signup.controllers.js'
import { FindUser } from '../CONTROLLERS/login.controllers.js';
import { upload } from '../MIDDLEWARES/multer.middleware.js';
import fs from 'fs'
import { uploadCloudinary } from '../UTILS/cloudinary.utils.js';
import { privateEncrypt } from 'crypto';
import { generateAccessToken } from '../UTILS/generateAccessTokens.utils.js';
import { generateRefreshToken } from '../UTILS/generateRefreshTokens.utils.js';
import { authenticate } from '../MIDDLEWARES/authenticate.middleware.js';
import { console } from 'inspector';
import { validateRefreshToken    } from '../CONTROLLERS/refreshTokens.controllers.js';


export const router = express.Router();
const saltRounds=10;




router.post('/signup',upload.single('profileImage'),async(req,res)=>{
    console.log("signup called")
    const {name,username,email,password}= req.body;

    console.log(req.file);


    

    const existingUser = await User.findOne({username});

    if(existingUser)
    {
        return res.status(400).json({message:'User already exists'})
    }

    const hashedPassword = await bcrypt.hash(password,saltRounds);
    
    const profileImagePath = req.file? req.file.path : null;

    console.log(profileImagePath);
    
    

    // if(!profileImagePath)
    // {
    //     return res.status(500).json({message: 'Profile image is required'});
    // }



   
   


    try{

        if(profileImagePath)
        {
            var profile_image_url = (await uploadCloudinary(profileImagePath)).link;
        }

      
        

        await Signup(name,username,email,hashedPassword, profile_image_url || null);
        res.status(201).json({message: 'User created'});
     }
     catch(e)
    {
        res.status(410).json({error: e.message});

    }

})


router.post('/login', async(req, res)=>{
    console.log("login called")
    const {email,password}= req.body;
   

    try{

        const user = await FindUser(email);

        if(!user)
        {
            return res.status(404).json({message: 'User not found'});
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if(!isMatched)
        {
            return res.status(401).json({message: 'Incorrect password'});
        }


        const accessToken= await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        user.save();

        const options={
            httpOnly:true,
            secure:false,
            sameSite:"Lax",
            maxAge: 24 * 60 * 60 * 1000,
         
           
        }

        res.status(200).cookie("accessToken",accessToken,options).cookie( "refreshToken",refreshToken,options).json({message:"login success"})

    }
    catch(e)
    {
        res.status(500).json({error: e.message});
    }
  })


  router.get('/me',async(req,res)=>{
   const accessToken = req.cookies.accessToken;
   

   if(!accessToken)
   {
    return res.status(402).json({message: "Unauthorized"});
   }

   const decoded = jwt.verify(accessToken,process.env.SECRET_KEY);
   console.log(decoded);
   const user = await User.findById(decoded.id).select('-password -refreshToken');
   
   if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

 

  res.status(200).json(user);


  })


  router.post('/logout',authenticate, async (req, res) =>{
    const user = req.user;
    
    await User.findByIdAndUpdate(user.id,{
        refreshToken: null
    })

   

    res.clearCookie("accessToken").clearCookie("refreshToken").json({message: "Logged out successfully"});
    
})

router.post('/refresh-token', async (req, res) =>{
  const {refreshToken,id}= req.body;

  const isValidated = await validateRefreshToken(refreshToken);
  if(!isValidated)
  {
    return res.status(403).json({message: "Invalid refresh token"});
  }

  const newAccessToken = await generateAccessToken(id);
  const newRefreshToken = await generateRefreshToken(id);
  await User.findByIdAndUpdate(id, { refreshToken: newRefreshToken });


  const options={
    httpOnly: true,
    secure:true
}

res.status(200).cookie( "accessToken",newAccessToken).cookie( "refreshToken",newRefreshToken).json({message:"login success"})

})








  



