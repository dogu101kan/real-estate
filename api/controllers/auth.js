const { validateUserInput, comparePassword } = require("../helpers/input/inputHelper");
const customError = require("../helpers/error/customError");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelper");
const User = require("../models/User");
const asyncErrorWrapper = require("express-async-handler");

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

module.exports = {
    signUp,
    login
}