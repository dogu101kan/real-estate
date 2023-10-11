const { isTokenIncluded, getAccessToken } = require("../../helpers/authorization/tokenHelper");
const customError = require("../../helpers/error/customError");
const jwt = require("jsonwebtoken"); 
const User = require("../../models/User");
const asyncErrorWrapper = require("express-async-handler");

const getAccess = asyncErrorWrapper(async (req, res, next)=>{

    const {JWT_SECRET_KEY} = process.env;

    
    if(!isTokenIncluded(req)) return next(customError(401, "You are not authorized"));

    const accessToken = getAccessToken(req);
    
    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded)=>{
        if(err) return next(customError(401, "You re not authorized. Token Expired" ));

        
        req.user = {
            id : decoded.id,
            username : decoded.username,
        }
        next();
    });
});

const getAdminAccess = asyncErrorWrapper(async (req, res, next)=>{

    const user = await User.findById(req.user.id);

    if(user.role !=="admin") return next(customError(401, "Only admin can access this route."));
        next();
});

const getSellerAccess = asyncErrorWrapper(async(req, res, next)=>{

    const user = await User.findById(req.user.id);

    if(user.role !=="seller" &&  user.role !=="admin") return next(customError(401, "Admin or seller can access this route."));
        next();
});

module.exports = {
    getAccess,
    getAdminAccess,
    getSellerAccess,
};