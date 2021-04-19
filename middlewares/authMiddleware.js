const path = require("path");
const User = require(path.join(__dirname, "..", "models", "user"));
const bcrypt = require("bcrypt");
const { generalError } = require(path.join(__dirname, "..", "controllers", "error"));

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers["Authorization"];

        if(!token) return res.status(401).send({success: false, error: "Неверный токен"});

        const hashToken = await bcrypt.hash(token.split(" ")[1], 12);

        const user = await User.findOne({token: hashToken});

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