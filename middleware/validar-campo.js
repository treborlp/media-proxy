const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    next(); //La funcion next le indica al middleware que continue con el proceso
}

module.exports = { validarCampos }