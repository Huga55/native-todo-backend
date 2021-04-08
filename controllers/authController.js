const path = require("path");
const crypto = require("crypto");
const User = require(path.join(__dirname, "..", "models", "user"));
const randomstring = require("randomstring");

exports.check = function(request, response) {

    const { id, email } = request.dataUser;

    return response.send({success: true, data: {id, email}});
}

exports.login = function(request, response) {
    if(!request.body || Object.keys(request.body).length === 0) return response.status(400).send({success: false, error: "Data not found"});

    const { email, password } = request.body;
    const hashPassword = crypto.createHash("md5").update(password).digest("hex");
    
    User.exists({email, password: hashPassword}, function(err, result) {
        if(err) throw err;
        console.log("result", result);
        if(result) {
            const { token, hashToken } = createToken();

            User.findOneAndUpdate({email, password: hashPassword}, {token: hashToken}, function(err) {
                if(err) throw err;

                return response.send({success: true, data: {token}});
            });
        }else {
            return response.status(400).send({success: false, error: "Login or password are incorrect"});
        }
    })
}

exports.register = function(request, response) {
    if(!request.body || Object.keys(request.body).length === 0) return response.status(400).send({success: false, error: "Data not found"});

    const { email, password } = request.body;
    const hashPassword = crypto.createHash("md5").update(password).digest("hex");

    User.findOne({email}, function(err, result) {
        if(err) throw err;

        if(result) {
            return response.status(400).send({success: false, error: "User with this email already exists"});
        }

        const { token, hashToken } = createToken();

        const user = new User({email, password: hashPassword, token: hashToken});
        user.save();

        return response.send({success: true, data: {email, token}});
    });
}

const createToken = () => {
    const token = randomstring.generate(25);
    const hashToken = crypto.createHash("md5").update(token).digest("hex");

    return {token, hashToken};
}