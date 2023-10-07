const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar:{
      type:String,
      default:"https://png2.cleanpng.com/sh/966a89f5aff7ab180212a8fa61be7dfe/L0KzQYm3U8E6N5Nmj5H0aYP2gLBuTfNwdaF6jNd7LXnmf7B6TgV0baMyiOR4ZnnvdX7qjPlxNZJ3jJ95ZYL2f7A0ifNwdl56i9d7LYDogsT2jr1uaZ8ygdV4bj24cbO3VPEza2JpftM6MD6zR4W4WcM2PmI6SqMAMEK6RoW4UsI5NqFzf3==/kisspng-computer-icons-user-profile-clip-art-person-icon-user-person-man-icon-5ab04a2c1dfa10.0741935615215027641228.png"
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) next();

  bcrypt.genSalt(10, (err, salt)=>{
    if (err) next(err);
    bcrypt.hash(this.password, salt, (err, hash)=>{
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});

userSchema.methods.generateJwt = function(){
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

  const payload = {
    id : this._id,
    username : this.username
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY,{
    expiresIn : JWT_EXPIRE
  });

  return token;
};

module.exports = mongoose.model("User", userSchema);
