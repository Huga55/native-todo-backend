const { check }  = require("express-validator");

exports.loginValidate = [
    check("email", "Неверный формат email").isEmail(),
    check("password", "Пароль должен содержать не менее 6ти символов").isLength({min: 6}),
];