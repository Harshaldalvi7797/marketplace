const express = require("express");
const User = require("../models/user");
const {
    validationResult
} = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
require("dotenv").config();


exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "user signout"
    });
};
exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "Email Already exist"
            });
        }
        res.json(user);
        console.log(user);
    });
};
exports.signin = (req, res) => {
    const {
        email,
        password
    } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({
        email
    }, (err, user) => {
        if (err || !user) {
            res.status(400).json({
                error: "USER email does not exists"
            });
        }

        if (!user.autheticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            });
        }

        //create token
        const token = jwt.sign({
            _id: user._id
        }, process.env.SECRET);
        //put token in cookie
        res.cookie("token", token, {
            expire: new Date() + 9999
        });

        //send response to front end
        const {
            _id,
            name,
            email,
            role
        } = user;
        return res.json({
            token,
            user: {
                _id,
                name,
                email,
                role,
                message: "successfully signin"
            }
        });
    });
};

