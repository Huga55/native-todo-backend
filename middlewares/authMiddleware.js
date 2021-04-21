const path = require("path");
const User = require(path.join(__dirname, "..", "models", "user"));
const { generalError } = require(path.join(__dirname, "..", "controllers", "error"));
const jwt = require("jsonwebtoken");
const config = require("config");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if(!token) return res.status(401).send({success: false, error: "Неверный токен"});

        const { email } = jwt.verify(token.split(" ")[1], config.get("secret-string"));

        const user = await User.findOne({email});

        if(!user) {
            return res.status(401).send({success: false, error: "Неверный токен"});
        }

        req.dataUser = user;
        next();
    } catch(e) {
        generalError(e, res);
    }
}

module.exports = authMiddleware;