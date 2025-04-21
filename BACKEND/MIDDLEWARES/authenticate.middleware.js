import jwt from 'jsonwebtoken'


export const authenticate = async(req,res,next)=>{

    const token = req.cookies.accessToken

    if(!token)
    {   console.log("No token provided")
        return res.status(401).json({message: "No token provided"})
    }

   

    try
    {

        const decoded = jwt.verify(token.replace("Bearer ",""), process.env.SECRET_KEY)
        if(!decoded)
        {
            console.log("Invalid token")
        }
        req.user = decoded


      
        next()





    }
    catch(e)
    {
        return res.status(401).json({message: "Invalid token"})
    }




}