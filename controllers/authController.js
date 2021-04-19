const path = require("path");
const bcrypt = require("bcrypt");
const User = require(path.join(__dirname, "..", "models", "user"));
const randomstring = require("randomstring");
const { generalError } = require("./error");
const jwt = require("jsonwebtoken");
const config  = require("config");
const { validationResult } = require("express-validator");

exports.check = async (req, res) => {
    try {
        const { email } = req.dataUser;
        return res.send({success: true, data: {email}});
    } catch(e) {
        generalError(e, res);
    }
}

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({success: true, error: "Неверные данные", detail: errors.array()});
        }

        const { email, password } = req.body;

        const isUserExist = await User.findOne({email});

        const userError = () => {
            return res.status(404).send({success: false, error: "Пользователь с данным логином и/или паролем не найден"});
        }

        if(!isUserExist) {
            return userError();
        }

        const isPasswordTrue = await bcrypt.compare(password, isUserExist.password);

        if(!isPasswordTrue) {
            return userError();
        }

        const token = await jwt.sign(
            {email: isUserExist.email},
            config.get("secret-string"),
            {expiresIn: "30 days"},
        );

        await User.findOneAndUpdate({_id: isUserExist._id}, {token});

        return res.status(201).send({success: true, data: {token, email}});
    } catch(e) {
        generalError(e, res);
    }
}

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({success: true, error: "Неверные данные", detail: errors.array()});
        }

        const { email, password } = req.body;

        const isUserExist = await User.findOne({email});

        if(isUserExist) {
            return res.status(409).send({success: false, error: "Пользователь с данным email уже существует"});
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const token = await jwt.sign(
            {email},
            config.get("secret-string"),
            {expiresIn: "30 days"},
        );

        const user = new User({email, password: hashPassword, token, limit: config.get("limit")});

        await user.save();

        return res.status(201).send({success: true, data:{email, token}});
    } catch(e) {
        generalError(e, res);
    }
}

exports.logout = async (req, res) => {
    try {
        const { _id } = req.dataUser;

        await User.updateOne({_id}, {token: null});
        
        res.status(200).send({success: true});
    } catch(e) {
        generalError(e, res);
    }
}