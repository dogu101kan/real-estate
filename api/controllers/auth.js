const User = require("../models/User");
const asyncErrorWrapper = require("express-async-handler");

const signUp = asyncErrorWrapper(async(req, res)=>{
    const { username, email, password } = req.body;

    const user = await User.create({
        username,
        email,
        password
    });

    res.status(201).json({
        succes:true,
        data:user
    })
})

module.exports = {
    signUp
}