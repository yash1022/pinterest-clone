import { User } from "../MODELS/user.models.js"



export const validateRefreshToken = async(token)=>
{
    try{

      const user=  await User.findOne({token});
        if(user)
        {
           return true;
        }

        return false;




    }
    catch(error){

        console.error(error.message);
        return false;
    }
}