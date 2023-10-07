const sendJwtToClient = (user, res) =>{
    const token = user.generateJwt();

    const {JWT_COOKIE, NODE_ENV} = process.env;

    res.cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() +  1000 * 60),
        secure: NODE_ENV === "development" ? false:true
    }).status(200)
    .json({
        success : true,
        access_token : token,
        data : {
            username : user.username,
            email : user.email
        }
    });
};

module.exports = { sendJwtToClient };