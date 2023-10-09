const multer = require("multer");
const path = require("path");
const customError = require("../../../helpers/error/customError");
const { v4:uuidv4 } = require("uuid");

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, "./public/images/profileImages");
    },
    filename : function(req, file, cb){
        req.imageName = file.fieldname + "_" + +"_"+Math.random().toString(36).slice(-4)+"_"+Date.now()+file.originalname
        cb(null, req.imageName);
    }
});

const fileFilter = (req,file,cb) => {
    let allowedMimeTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png"];

    if(!allowedMimeTypes.includes(file.mimetype)){
        return cb(customError(400, "Please provide a valid image file"), false);
    };
    return cb(null, true);
};

const profileImageUpload = multer({storage, fileFilter});

module.exports = profileImageUpload;