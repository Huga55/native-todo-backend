const path = require("path");
const User = require(path.join(__dirname, "..", "models", "user"));
const crypto = require("crypto");

const authMiddleware = function(request, response, next) {
    const token = request.headers["authorization"];
    if(!token) return response.status(403).send({success: false, error: "Token not found"});

    const hashToken = crypto.createHash("md5").update(token).digest("hex");
    User.findOne({token: hashToken}, function(error, result) {
        if(error) throw error;

        if(result) {
            request.dataUser = result;
			next();
        }else {
            return response.status(403).send({success: false, error: "Token is not correct"});
        }
    })
}

module.exports = authMiddleware;