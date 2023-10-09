const { validateUserInput, comparePassword } = require("../helpers/input/inputHelper");
const customError = require("../helpers/error/customError");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelper");
const User = require("../models/User");
const asyncErrorWrapper = require("express-async-handler");
const fileDelete = require("../helpers/file/fileDelete");
const path = require("path");

const signUp = asyncErrorWrapper(async(req, res)=>{
    const { username, email, password } = req.body;

    const user = await User.create({
        username,
        email,
        password
    });

    const { password:passw, ...rest } = user._doc;

    res.status(201).json({
        success:true,
        data:rest
    })
});

const login =  asyncErrorWrapper(async(req, res, next)=>{
    const { email, password } = req.body;

    if(!validateUserInput(email, password)) return next(customError(400, "Please check your input"));

    const user = await User.findOne({email});
    
    if(!comparePassword(password, user.password)) return next(customError(400, "Please check your credential"));
    
    sendJwtToClient(user, res);
});

const googleSign = asyncErrorWrapper(async(req, res, next)=>{
    const user = await User.findOne({email : req.body.email});
    if(user) sendJwtToClient(user, res);
    else{
        const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const user = await User.create({
            username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
            email:  req.body.email,
            password: generatePassword,
            avatar: req.body.photo
        });
        sendJwtToClient(user, res)
    }
});

const imageUpload = asyncErrorWrapper(async(req, res, next)=>{
    
    const user = await User.findById(req.user.id);

    const rootDir = path.dirname(require.main.filename);
    const file = path.join(rootDir, '/public/images/profileImages/');
    const filePath = path.join(file, user.avatar);

    fileDelete(filePath);

    user.avatar = req.imageName;
    user.save()

    const {password, ...rest} = user._doc;
    res.status(200)
    .json({
        succes : true,
        message: "image uploaded",
        data : rest
    });
});

module.exports = {
    signUp,
    login,
    googleSign,
    imageUpload,
}