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
