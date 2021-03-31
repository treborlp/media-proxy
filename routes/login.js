const { Router } = require('express');
const { check } = require('express-validator');
const { login, loginGoogle } = require('../controllers/login');

const { validarCampos } = require('../middleware/validar-campo');
const routes = Router();

routes.post('/login', [
    check('correo', 'No es un correo valido').isEmail(),
    check('password', 'Password no tiene el formato').isLength({ max: 30, min: 6 }),
    check('password', 'Se necesita password').not().isEmpty(),
    validarCampos
], login)

routes.post('/google', [
    check('id_token', 'Se necesita token de acceso').not().isEmpty(),
    validarCampos
], loginGoogle)

module.exports = routes