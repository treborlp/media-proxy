const { Router } = require('express');
const { check } = require('express-validator');
const {
    girarCamara,
    girarContinuo,
    takeSnapshot
} = require('../controllers/camera');
const { validarCampos } = require('../middleware');

const routes = Router();

routes.get('/', girarCamara)

routes.get('/:grados', [
    check("grados", "No es un numero").isNumeric(),
    validarCampos
], girarCamara)

routes.get('/continuo/:movimiento', [
    check("movimiento", "No es un movimiento valido").isString(),
    validarCampos
], girarContinuo)

routes.get('/snapshot/:channel', [
    check("channel", "No es un movimiento valido").isNumeric(),
    validarCampos
], takeSnapshot)


module.exports = routes