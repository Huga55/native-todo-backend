const { check }  = require("express-validator");

exports.createValidation = [
    check("name", "Обязательно к заполнению").isString(),
    check("description", "Обязательно к заполнению").isString(),
];

exports.changeValidation = [
    check("id", "Обязательно к заполнению").isString(),
    check("name", "Обязательно к заполнению").isString(),
    check("description", "Обязательно к заполнению").isString(),
];