let mongoose = require("mongoose");
let joi = require("@hapi/joi");
let config = require("config");
let jwt = require("jsonwebtoken");
let userSchema = new mongoose.Schema({
  FirstName: { type: String, min: 3, max: 250, alphanum: true, trim: true },
  LastName: { type: String, min: 4, max: 250, alphanum: true, trim: true },
  UserLogin: {
    EmailId: { type: String, unique: true },
    password: { type: String, required: true }
  },
  newsletterCheck: { type: Boolean },
  isAdmin: { type: Boolean },
  recordDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
  resetpasswordtoken: { type: String },
  resetpasswordexpire: { type: Date }
});

userSchema.methods.UserToken = function () {
  let token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("apitoken")
  );
  return token;
};

//IEP information expert principle
function validationError(error) {
  let schema = joi.object({
    FirstName: joi
      .string()
      .min(3)
      .max(25)
      .required(),
    LastName: joi
      .string()
      .min(3)
      .max(25)
      .required(),
    // newsletterCheck: joi.required(),
    UserLogin: {
      EmailId: joi
        .string()
        .email()
        .required(),
      password: joi.string().required()
    }
    // isAdmin: joi.required()
  });
  return schema.validate(error);
}

let userModel = mongoose.model("users", userSchema);

module.exports = { userModel, validationError };
