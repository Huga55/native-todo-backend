module.exports = {
    generalError: (error, res) => {
        console.log(error);
        res.status(500).send({success: false, error: "Что-то пошло не так... Повторите позже"});
    }
}