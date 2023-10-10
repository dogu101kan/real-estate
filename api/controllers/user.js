
const asyncErrorWrapper = require("express-async-handler");
const customError = require("../helpers/error/customError");
const User = require("../models/User");
const fileDelete = require("../helpers/file/fileDelete");
const path = require("path");

const test = 
    (req, res)=>{
        res.json({
            message:"asdasdads"
        })
    }


const updateUser = asyncErrorWrapper(async(req, res, next)=>{

    if(req.user.id !== req.params.id) return next(customError(401, "You can only update your own account."));

    const user = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username : req.body.username,
            }
    }, {new: true})

    if(req.body.password && req.body.password!=="") user.password = req.body.password;
    await user.save();

    const { password, ...rest} = user._doc;

    res.status(200).json({
        success:true,
        message:"User has been updated.",
        data:rest
    });

});

const deleteUser = asyncErrorWrapper(async(req, res, next)=>{

    if(req.user.id !== req.params.id) return next(customError(401, "You can only delete your own account."));

    const user = await User.findByIdAndDelete(req.params.id);
    
    const rootDir = path.dirname(require.main.filename);
    const file = path.join(rootDir, '/public/images/profileImages/');
    const filePath = path.join(file, user.avatar);

    fileDelete(filePath);

    const { password, ...rest} = user._doc;
    
    res.clearCookie("access_token", {path:'/'}).status(200).json({
        success:true,
        message:"User has been deleted.",
        data:rest
    });

});

//delete user cookie silinmiyor

module.exports = {
    test,
    updateUser,
    deleteUser,
};
