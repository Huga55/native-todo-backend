const path = require("path");
const User = require(path.join(__dirname, "..", "models", "user"));
const bcrypt = require("bcrypt");
const { generalError } = require(path.join(__dirname, "..", "controllers", "error"));

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers["Authorization"];
        console.log(req.headers)
        if(!token) return res.status(400).send({success: false, error: "Токен не найден"});

        const hashToken = await bcrypt.hash(token.split(" ")[1], 12);

        const user = await User.findOne({token: hashToken});

        if(!user) {
            return res.status(403).send({success: false, error: "Неверный токен"});
        }

        req.dataUser = user;
        next();
    } catch(e) {
        generalError(e, res);
    }
}

module.exports = authMiddleware;