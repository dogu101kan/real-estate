const customError = require("../../helpers/error/customError");

const errorHandler = (err, req, res, next)=>{
  

    res.status(err.status || 500)
    .json({
        success:false,
        message:err.message
    });
};

module.exports = errorHandler;