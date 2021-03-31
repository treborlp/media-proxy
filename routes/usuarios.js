const { Router } = require('express');
const { check } = require('express-validator');

const {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios,
    patchUsuarios
} = require('../controllers/usuarios');

const {
    validarRol,
    validarCorreo,
    validarExisteID
} = require('../helpers/db-validator');

const { validarCampos } = require('../middleware/validar-campo');
const validarJWT = require('../middleware/validar-jwt');
const verificarRol = require('../middleware/verificar-rol');

const routes = Router();

routes.get('/', getUsuarios)

routes.post('/', [
    check('nombre', 'El nombre no debe estar vacio').not().isEmpty(),
    // check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('password', 'Password no tiene el formato').isLength({ max: 30, min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(validarCorreo),
    check('rol').custom(validarRol), // Se obvia la forma (rol)=> validarRol(rol)
    validarCampos
], postUsuarios)

routes.put('/:id', [
    check('id', 'El identificador (id) no es una forma de mongo').isMongoId(),
    check('id').custom(validarExisteID),
    check('rol').custom(validarRol),
    validarCampos
], putUsuarios)

routes.delete('/:id', [
    validarJWT,
    verificarRol,
    check('id', 'El identificador (id) no es una forma de mongo').isMongoId(),
    check('id').custom(validarExisteID),
    validarCampos
], deleteUsuarios)

routes.patch('/', patchUsuarios)

module.exports = routes