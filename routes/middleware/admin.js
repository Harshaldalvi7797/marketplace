function Admin(req, res, next) {
    if (!req.user.isAdmin) {
        return res.status(402).send({ message: "access denied admin" })
    }
    next();


}

module.exports = Admin;