var express = require("express");
var router = express.Router();

const {
    body,
    check
} = require("express-validator");

const {
    signup,
    signout,
    signin

} = require("../controller/auth");
router.post(
    "/signup",
    [
        check("name", "must be at least 5 chars long").isLength({
            min: 5
        }),
        check("email", "Email is required").isEmail(),
        check("password", "password is required is minimum 3").isLength({
            min: 3
        })
    ],
    signup
);
router.post(
    "/signin",
    [
        check("email", "Email is required").isEmail(),
        check("password", "password  is required ").isLength({
            min: 3
        })
    ],
    signin
);

router.get("/signout", signout);

module.exports = router;