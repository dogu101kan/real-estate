const { isTokenIncluded, getAccessToken } = require("../../helpers/authorization/tokenHelper");
const customError = require("../../helpers/error/customError");
const jwt = require("jsonwebtoken"); 

const getAccess = (req, res, next)=>{

    const {JWT_SECRET_KEY} = process.env;

    
    if(!isTokenIncluded(req)) return next(customError(401, "You are not authorized"));

    const accessToken = getAccessToken(req);

    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded)=>{
        if(err){
            return next(customError(401, "You re not authorized. Token Expired" ));
        }
        
        req.user = {
            id : decoded.id,
            username : decoded.username,
        }
        next();
    });
};

module.exports = {
    getAccess,
};