const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const { hash } = require("bcryptjs");

const UserModel = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,
    select: false
  }
});

UserModel.pre("save", async function(next) {
  const hashed = await hash(this.password, 10);
  this.password = hashed;

  next();
});

UserModel.statics.generateToken = function(params, cb) {
  return cb(null, jwt.sign(params, "secret_token"));
};

module.exports = model("User", UserModel);
