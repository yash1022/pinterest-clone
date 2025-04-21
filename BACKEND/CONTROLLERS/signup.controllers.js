import mongoose from "mongoose";
import {User} from '../MODELS/user.models.js'


 export const Signup = async(name,username,email,password, profile_image)=>{
    try {

        const existingUser = await User.findOne({
            email:email
        })
        
        if(existingUser)
        {
             return {status:'failed', message:'User already exists'}
        }

        const user = new User({
            username:username,
            email:email,
            fullname:name,
            password:password,
            profileImage:profile_image
        })

        await user.save()

        return {status:'success', message:'User registered successfully'}



    }
    catch (error) {
        console.error(error)
        return {status:'failed', message:'Error registering user'}
    }



}


