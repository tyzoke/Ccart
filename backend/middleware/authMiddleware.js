
import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userSchema.js'
import dotenv from 'dotenv'

dotenv.config()

//product routes
 const protect = asyncHandler(async (req, res, next) => {
    let token;

    //read the jwt token
    token=req.cookies.jwt;
if(token){
    console.log(process.env.JWT_SECRET)
    try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded.userId).select('-password');
    next();
    }
    catch(error){
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
}else{
    res.status(401);
    throw new Error("Not authorized, no token");
}
}
);
 const admin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
        } else {
            res.status(401)
            throw new Error('Not authorized as an admin')
            }
            }
            );

            export {protect,admin}

    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    //     token = req.headers.authorization.split(' ')[1]
    //     }
    //     if(!token){
    //         return next(new Error('Not authorized to access this route', 401))
    //         }
    //         try{
    //             const decoded = jwt.verify(token, process.env.JWT_SECRET)
    //             req.user = await User.findById(decoded.id).select('-password')
    //             next()
    //             }catch(error){
    //                 return next(new Error('Not authorized to access this route', 401))
    //                 }
                    