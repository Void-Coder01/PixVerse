import jwt from "jsonwebtoken";

const userAuth = async(req,res,next) => {
    const {token} = req.headers;
    
    if(!token){
        return res.status(404).json({
            success : false,
            msg : "Token not found"
        })
    }

    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        
        if(decodedToken.id){
            req.userID = decodedToken.id;
        }else{
            return res.status(401).json({
                success : false,
                msg : "Not Authorized. Login Again"
            })
        }

        //call next method
        next();
    } catch (error) {
        console.log(error.message)
        return res.status(501).json({
            success : false,
            msg : error.message
        })
    }
}

export default userAuth;