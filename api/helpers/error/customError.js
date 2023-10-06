const customError = (status, message)=>{
    const err = new Error();

    err.statusCode = status;
    err.message = message;

    throw err;
}

module.exports = customError;