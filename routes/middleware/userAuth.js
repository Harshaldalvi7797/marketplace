let jwt = require("jsonwebtoken");
let config = require("config");

function UserAuth(req, res, next) {
    let token = req.header("x-auth-token");
    if (!token) { return res.status(404).send({ message: "invalid token" }) }
    try {

        const dcoded = jwt.verify(token, config.get("apitoken"));
        req.user = dcoded;
        next();

    }
    catch (ex) {
        res.status(402).send({ message: "access denied" })

    }


}
module.exports = UserAuth;



