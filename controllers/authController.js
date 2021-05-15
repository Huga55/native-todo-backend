const path = require("path");
const bcrypt = require("bcrypt");
const User = require(path.join(__dirname, "..", "models", "user"));
const randomstring = require("randomstring");
const { generalError } = require("./error");
const jwt = require("jsonwebtoken");
const config  = require("config");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

exports.check = async (req, res) => {
    try {
        const { email, limit } = req.dataUser;
        return res.send({success: true, data: {email, limit}});
    } catch(e) {
        generalError(e, res);
    }
}

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({success: false, error: "Неверные данные", detail: errors.array()});
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

        return res.status(201).send({success: true, data: {token, email, limit: isUserExist.limit}});
    } catch(e) {
        generalError(e, res);
    }
}

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({success: false, error: "Неверные данные", detail: errors.array()});
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

        return res.status(201).send({success: true, data:{email, token, limit: config.get("limit")}});
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

exports.remember = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).send({success: false, error: "Неверные данные", detail: errors.array()});
        }

        const { email } = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.status(409).send({success: false, error: "Пользователь с данным email не найден"});
        }

        const password = randomstring.generate(6);

        const hashPassword = await bcrypt.hash(password, 12);

        await User.updateOne({email}, {password: hashPassword});

        await main(email, password);

        return res.status(200).send({success: true, data: {message: "На Ваш email был выслан сгенерированный пароль"}});
    }catch(e) {
        generalError(e, res);
    }
}

const main = async (email, password) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: config.get("email"),
            pass: config.get("password")
        },
    });

    const mailOptions = {
        from: config.get("email"),
        to: email,
        subject: 'ВОССТАНОВЛЕНИЕ ПАРОЛЯ',
        text: `Ваше новый пароль: ${password}. С данного момента старый пароль больше не действителен. По возникшим вопросам можете воспользоваться формой обратной связи
                на сайте https://wimdev.com`
    };

    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}