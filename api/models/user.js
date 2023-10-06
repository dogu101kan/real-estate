const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
  console.log("saveee");
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

module.exports = mongoose.model("User", userSchema);
