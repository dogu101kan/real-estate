const sendJwtToClient = (user, res) =>{
    const token = user.generateJwt();

    const {JWT_COOKIE, NODE_ENV} = process.env;

    res.cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
        secure: NODE_ENV === "development" ? false:true
    }).status(200)
    .json({
        success : true,
        access_token : token,
        data : {
            id : user.id,
            username : user.username,
            email : user.email,
            avatar: user.avatar
        }
    });
};

const isTokenIncluded = req => {
    return req.headers.authorization && req.headers.authorization.startsWith("Bearer");
};
const getAccessToken = req => {
    const authorization = req.headers.authorization;
    const access_token = authorization.split(" ")[1];
    return access_token
}

module.exports = {
    sendJwtToClient,
    isTokenIncluded,
    getAccessToken,
};
