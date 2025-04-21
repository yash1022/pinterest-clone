import mongoose from "mongoose";
import {User} from '../MODELS/user.models.js'


 export const FindUser = async(email)=>{

    try{

      const user =  await User.findOne({email});
      return user;
    }
    catch(error){
      return {success:false, message:error.message};
    }




 }