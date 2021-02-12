let express = require("express");
let router = express.Router();
let Joi = require("@hapi/joi");
let User = require("../../models/user");
let bcrypt = require("bcrypt");

let jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    let user = await User.userModel.findOne({
        "UserLogin.EmailId": req.body.UserLogin.EmailId
    });
    if (user) {
        return res.status(403).send({ message: "User Already Exist" });
    }

    const newuser = new User.userModel(req.body);
    let salt = await bcryt.genSalt(10);
    // @ts-ignore
    newuser.UserLogin.password = await bcryt.hash(
        // @ts-ignore
        newuser.UserLogin.password,
        salt
    );
    let data = await newuser.save();
    res.send({ message: "Thank You", d: data });
});
router.post("/login", async (req, res) => {
    let { error } = AuthValidation(req.body);
    if (error) {
        return res.send(error.details[0].message);
    }

    let user = await User.userModel.findOne({
        "UserLogin.EmailId": req.body.UserLogin.EmailId
    });

    if (!user) {
        return res.status(403).send({ message: "Invalid UserId" });
    }

    //after password bcrypt
    // @ts-ignore
    let password = await bcrypt.compare(
        req.body.UserLogin.password,
        // @ts-ignore
        user.UserLogin.password
    );
    if (!password) {
        return res.status(403).send({ message: "Invalid password" });
    }


    // @ts-ignore
    let token = user.UserToken();
    res
        .header("x-auth-token", token)
        .send({ message: "Login Successfull", token: token });

});



function AuthValidation(error) {
    let Schaema = Joi.object({
        UserLogin: {
            EmailId: Joi.string().required(),
            password: Joi.string().required()
        }
    });
    return Schaema.validate(error);
}









module.exports = router;